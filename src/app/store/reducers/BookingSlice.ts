import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IBookingService } from "@/shared/types/book-api-types";

interface BookingTypesState {
  services: IBookingService[];
}

const initialState: BookingTypesState = {
  services: [],
};

export const bookingServicesSlice = createSlice({
  name: 'bookingServices',
  initialState,
  reducers: {
    setBookingServicesState: (state, action: PayloadAction<IBookingService[]>) => {
      state.services = action.payload;
    },
  },
});

export const { setBookingServicesState } = bookingServicesSlice.actions;

export const selectAllBookingServices = (state: RootState) => state.bookingServicesReducer;

export default bookingServicesSlice.reducer;
