import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AnyAction } from "@reduxjs/toolkit";

import type { InitialType, GetTicketsType } from "../types";

const URL = "https://aviasales-test-api.kata.academy";

export const getUserId = createAsyncThunk("filter/getUserId", async function () {
  return await (await fetch(`${URL}/search`)).json();
});

export const getTickets = createAsyncThunk<GetTicketsType, string>(
  "filter/getTickets",
  async function (value, { rejectWithValue }) {
    const responseTicket = await fetch(`${URL}/tickets?searchId=${value}`);

    if (!responseTicket.ok) {
      return rejectWithValue("error");
    }
    return await responseTicket.json();
  }
);

const initialState: InitialType = {
  tickets: [],
  filterTickets: [],
  stopSearch: false,
  searchId: "",
  reloadSearch: true,
  sort: { fast: false, cheap: true },
  filter: {
    isAll: false,
    withoutTransfers: true,
    oneTransfer: false,
    twoTransfer: false,
    threeTransfer: false,
  },
  firstPartTicket: false,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    onFast(state) {
      state.sort.fast = true;
      state.sort.cheap = false;
      state.filterTickets = state.filterTickets.sort((a, b) => {
        return a.segments[0].duration - b.segments[0].duration;
      });
    },

    onCheap(state) {
      state.sort.cheap = true;
      state.sort.fast = false;
      state.filterTickets = state.filterTickets.sort((a, b) => {
        return a.price - b.price;
      });
    },

    changeAll: (state) => {
      state.filter.isAll = !state.filter.isAll;
      if (state.filter.isAll) {
        state.filter.withoutTransfers = true;
        state.filter.oneTransfer = true;
        state.filter.twoTransfer = true;
        state.filter.threeTransfer = true;
      } else {
        state.filter.withoutTransfers = false;
        state.filter.oneTransfer = false;
        state.filter.twoTransfer = false;
        state.filter.threeTransfer = false;
      }
    },

    withoutTransfer(state) {
      if (!state.filter.withoutTransfers) {
        state.filter.withoutTransfers = true;
        if (state.filter.oneTransfer && state.filter.twoTransfer && state.filter.threeTransfer) {
          state.filter.isAll = true;
        }
      } else {
        state.filter.withoutTransfers = false;
        state.filter.isAll = false;
      }
    },

    oneTransfer(state) {
      if (!state.filter.oneTransfer) {
        state.filter.oneTransfer = true;
        if (state.filter.withoutTransfers && state.filter.twoTransfer && state.filter.threeTransfer) {
          state.filter.isAll = true;
        }
      } else {
        state.filter.oneTransfer = false;
        state.filter.isAll = false;
      }
    },

    twoTransfer(state) {
      if (!state.filter.twoTransfer) {
        state.filter.twoTransfer = true;
        if (state.filter.withoutTransfers && state.filter.oneTransfer && state.filter.threeTransfer) {
          state.filter.isAll = true;
        }
      } else {
        state.filter.twoTransfer = false;
        state.filter.isAll = false;
      }
    },

    threeTransfer(state) {
      if (!state.filter.threeTransfer) {
        state.filter.threeTransfer = true;
        if (state.filter.withoutTransfers && state.filter.twoTransfer && state.filter.oneTransfer) {
          state.filter.isAll = true;
        }
      } else {
        state.filter.threeTransfer = false;
        state.filter.isAll = false;
      }
    },

    filters(state) {
      if (!state.filter.isAll) {
        state.filterTickets = [];
      }
      if (state.filter.withoutTransfers) {
        const newTickets = state.tickets.filter((el) => {
          return el.segments[0].stops.length === 0;
        });
        state.filterTickets = [...state.filterTickets, ...newTickets];
      }
      if (state.filter.oneTransfer) {
        const newTickets = state.tickets.filter((el) => {
          return el.segments[0].stops.length === 1;
        });
        state.filterTickets = [...state.filterTickets, ...newTickets];
      }
      if (state.filter.twoTransfer) {
        const newTickets = state.tickets.filter((el) => {
          return el.segments[0].stops.length === 2;
        });
        state.filterTickets = [...state.filterTickets, ...newTickets];
      }
      if (state.filter.threeTransfer) {
        const newTickets = state.tickets.filter((el) => {
          return el.segments[0].stops.length === 3;
        });
        state.filterTickets = [...state.filterTickets, ...newTickets];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserId.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId;
      })

      .addCase(getTickets.fulfilled, (state, action) => {
        state.firstPartTicket = true;
        if (!action.payload.stop) {
          state.tickets = [...state.tickets, ...action.payload.tickets];
        }
        state.stopSearch = action.payload.stop;
      })

      .addMatcher(isError, (state) => {
        state.reloadSearch = !state.reloadSearch;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export const { filters, onCheap, onFast, changeAll, withoutTransfer, oneTransfer, twoTransfer, threeTransfer } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
