import { bookingApi } from "@/app/services/bookingApi";
import { BOOK_CANCELLED_BY_MANAGER_STATUS_ID, BOOK_CLIENT_DO_NOT_COME_STATUS_ID, BOOK_DONE_STATUS_ID } from "@/shared/constants/types";
import { toast } from "react-toastify";

export const useAppoitnments = () => {
    const { data: appointments, isLoading, refetch } = bookingApi.useGetAllAppointmentsQuery();

    const [updateBookingDate, {isLoading: isLoadingUpdateBookingDate}] = bookingApi.useUpdateBookingDateTimeMutation();
    const [updateBookStatus, {isLoading: isLoadingCompleteBooking}] = bookingApi.useUpdateBookingStatusMutation();

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

    const handleCompleteAppt = async (bookingId: number, comment: string) => {
        await updateBookStatus({
            id: bookingId, 
            comment,
            status_id: BOOK_DONE_STATUS_ID
        }).then(() => {
            toast.success("Appointment completed successfully");
            refetch();
        })
    };

    const handleClientDidNotCome = (bookingId: number, comment: string) => {
        cancelAppt(bookingId, comment, BOOK_CLIENT_DO_NOT_COME_STATUS_ID);
    }

    const handleCancelByManager = (bookingId: number, comment: string) => {
        cancelAppt(bookingId, comment, BOOK_CANCELLED_BY_MANAGER_STATUS_ID);
    }

    const cancelAppt = async (bookingId: number, comment: string, status_id: number) => {
        await updateBookStatus({
            id: bookingId, 
            comment,
            status_id
        }).then(() => {
            toast.success("Appointment completed successfully");
            refetch();
        })
    };

    return {
        models: {
            appointments,
            isLoading,
            isLoadingUpdateBookingDate,
            isLoadingCompleteBooking
        },
        commands: {
            handleEditBookDate,
            handleCompleteAppt,
            handleCancelByManager,
            handleClientDidNotCome
        },
      };
}