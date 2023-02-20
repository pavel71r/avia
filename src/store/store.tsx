import { configureStore } from "@reduxjs/toolkit";

import ticketsSlice from "./ticketsSlice";

const store = configureStore({
  reducer: {
    tickets: ticketsSlice,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
