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
    }),
    updateBookingDateTime: builder.mutation<any, { id: number, booking_date: string, booking_time: string }>({
      query: ({ id, booking_date, booking_time }) => ({
        url: `/bookings/${id}/date`,
        method: 'PUT',
        body: { booking_date, booking_time }
      }),
    }),
    cancelBooking: builder.mutation<any, { id: number, comment: string }>({
      query: ({ id, comment }) => ({
        url: `/bookings/${id}/cancel`,
        method: 'PUT',
        body: { comment }
      }),
    }),
  }),
});

export const {
  useGetAllBookingServicesQuery,
  useCreateBookingMutation,
  useGetBusyBookingSlotsQuery,
  useGetClientAppointmentsQuery,
  useUpdateBookingDateTimeMutation,
  useCancelBookingMutation
} = bookingApi;
