import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import typesReducer from "./reducers/TypesSlice";
import carsReducer from "./reducers/CarsSlice";
import { api } from "@/app/services/api";
import bookingServicesReducer from "./reducers/BookingSlice";

const rootReducer = combineReducers({
  userReducer,
  typesReducer,
  carsReducer,
  bookingServicesReducer,
  [api.reducerPath]: api.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
