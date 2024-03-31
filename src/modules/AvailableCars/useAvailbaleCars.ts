import { carsApi } from "@/app/services/carsApi";

export const useAvailableCars = () => {
    const { data: availableCars, isLoading } =
    carsApi.useGetAvailableCarsQuery("");
    return {
        models: {
            availableCars,
            isLoading
        },
        commands: {
        },
      };
}