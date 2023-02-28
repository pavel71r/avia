import { configureStore } from "@reduxjs/toolkit";

import ticketsSlice from "./ticketsSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    tickets: ticketsSlice,
    filter: filterSlice,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
