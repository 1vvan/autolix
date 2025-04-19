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
    getAllAppointments: builder.query<IBooking[], void>({
      query: () => ({ url: `/bookings` }),
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
    updateBookingStatus: builder.mutation<any, { id: number, status_id: number, comment?: string }>({
      query: ({ id, status_id, comment }) => ({
        url: `/bookings/${id}/status`,
        method: 'PATCH',
        body: { status_id, comment }
      }),
    }),    
  }),
});

export const {
  useGetAllBookingServicesQuery,
  useCreateBookingMutation,
  useGetBusyBookingSlotsQuery,
  useGetAllAppointmentsQuery,
  useGetClientAppointmentsQuery,
  useUpdateBookingDateTimeMutation,
  useUpdateBookingStatusMutation
} = bookingApi;
