import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { documentsApi } from "@/services/documentsApi";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, documentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
