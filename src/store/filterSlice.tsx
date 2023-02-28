import { createSlice } from "@reduxjs/toolkit";

import type { FilterType } from "../types";

const initialState: FilterType = {
  isAll: true,
  withoutTransfers: true,
  oneTransfer: true,
  twoTransfer: true,
  threeTransfer: true,
  sort: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeSort(state) {
      state.sort = !state.sort;
    },

    changeAll: (state) => {
      state.isAll = !state.isAll;
      if (state.isAll) {
        state.withoutTransfers = true;
        state.oneTransfer = true;
        state.twoTransfer = true;
        state.threeTransfer = true;
      } else {
        state.withoutTransfers = false;
        state.oneTransfer = false;
        state.twoTransfer = false;
        state.threeTransfer = false;
      }
    },

    withoutTransfer(state) {
      if (!state.withoutTransfers) {
        state.withoutTransfers = true;
        if (state.oneTransfer && state.twoTransfer && state.threeTransfer) {
          state.isAll = true;
        }
      } else {
        state.withoutTransfers = false;
        state.isAll = false;
      }
    },

    oneTransfer(state) {
      if (!state.oneTransfer) {
        state.oneTransfer = true;
        if (state.withoutTransfers && state.twoTransfer && state.threeTransfer) {
          state.isAll = true;
        }
      } else {
        state.oneTransfer = false;
        state.isAll = false;
      }
    },

    twoTransfer(state) {
      if (!state.twoTransfer) {
        state.twoTransfer = true;
        if (state.withoutTransfers && state.oneTransfer && state.threeTransfer) {
          state.isAll = true;
        }
      } else {
        state.twoTransfer = false;
        state.isAll = false;
      }
    },

    threeTransfer(state) {
      if (!state.threeTransfer) {
        state.threeTransfer = true;
        if (state.withoutTransfers && state.twoTransfer && state.oneTransfer) {
          state.isAll = true;
        }
      } else {
        state.threeTransfer = false;
        state.isAll = false;
      }
    },
  },
});

export const { changeSort, changeAll, withoutTransfer, oneTransfer, twoTransfer, threeTransfer } = filterSlice.actions;

export default filterSlice.reducer;
