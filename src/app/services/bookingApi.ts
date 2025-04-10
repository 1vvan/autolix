import { IBookBusySlot, IBooking, IBookingService } from "@/shared/types/book-api-types";
import { api } from "./api";

export const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookingServices: builder.query<IBookingService[], void>({
          query: () => ({ url: `/bookings/services` }),
          providesTags: result => ['BookingServices']
      }),
    createBooking: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/bookings/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Cars']
    }),
    getBusyBookingSlots: builder.query<IBookBusySlot[], string>({
      query: (date) => ({
        url: `/bookings/busy-slots`,
        params: { date },
      }),
    }),
    getClientAppointments: builder.query<IBooking[], string>({
      query: (phone) => ({ url: `/bookings/${phone}/appointments` }),
    })    
  }),
});

export const {
  useGetAllBookingServicesQuery,
  useCreateBookingMutation,
  useGetBusyBookingSlotsQuery,
  useGetClientAppointmentsQuery
} = bookingApi;
