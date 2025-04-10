import { bookingApi } from "@/app/services/bookingApi";
import { toast } from "react-toastify";

export const useClientAppoitnments = () => {
    const phone = localStorage.getItem('userPhone');

    const { data: appointments, isLoading, refetch } = phone 
        ? bookingApi.useGetClientAppointmentsQuery(phone) 
        : { data: [], isLoading: false, refetch: () => console.log('refetch') };

    const [updateBookingDate, {isLoading: isLoadingUpdateBookingDate}] = bookingApi.useUpdateBookingDateTimeMutation();
    const [cancelBooking, {isLoading: isLoadingCancelBooking}] = bookingApi.useCancelBookingMutation();

    const handleEditBookDate = async (bookingId: number, newDate: Date | null) => {
        if (!newDate) return;

        const datePart = newDate.toISOString().slice(0, 10);
        const timePart = newDate.toTimeString().slice(0, 5);

        try {
            await updateBookingDate({
                id: bookingId,
                booking_date: datePart,
                booking_time: timePart,
            }).unwrap().then(() => {
                toast.success("Appointment date updated successfully");
                refetch();
            });
        } catch (error) {
            console.error("Ошибка при обновлении даты бронирования", error);
        }
    };

    const handleCancelAppt = async (bookingId: number, comment: string) => {
        await cancelBooking({
            id: bookingId, 
            comment
        }).then(() => {
            toast.success("Appointment cancelled successfully");
            refetch();
        })
    }

    return {
        models: {
            appointments,
            isLoading,
            isLoadingUpdateBookingDate,
            isLoadingCancelBooking
        },
        commands: {
            handleEditBookDate,
            handleCancelAppt
        },
      };
}