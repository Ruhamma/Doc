import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { createDocApi } from "@/app/services/create_api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [createDocApi.reducerPath]: createDocApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, createDocApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
