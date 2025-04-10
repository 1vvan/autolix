import { bookingApi } from "@/app/services/bookingApi";

export const useClientAppoitnments = () => {
    const phone = localStorage.getItem('userPhone');

    const { data: appointments, isLoading } = phone 
        ? bookingApi.useGetClientAppointmentsQuery(phone) 
        : { data: [], isLoading: false };

    return {
        models: {
            appointments,
            isLoading
        },
        commands: {
        },
      };
}