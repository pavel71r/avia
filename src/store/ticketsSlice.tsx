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
  stopSearch: false,
  searchId: "",
  reloadSearch: true,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserId.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId;
      })

      .addCase(getTickets.fulfilled, (state, action) => {
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

export default ticketsSlice.reducer;
