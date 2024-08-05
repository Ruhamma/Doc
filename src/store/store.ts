import { configureStore } from "@reduxjs/toolkit";

import { createDocApi } from "@/app/services/create_api";
import { api } from "./api";

const store = configureStore({
  reducer: {
    // [api.reducerPath]: api.reducer,
    [createDocApi.reducerPath]: createDocApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createDocApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
