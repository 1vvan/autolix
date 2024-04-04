import { clientsApi } from "@/app/services/clientsApi";

export const useClients = () => {
    const {data: clients = [], isLoading} = clientsApi.useGetCLientsQuery();


    return {
        models: {
            clients,
            isLoading
        },
        commands: {
        },
      };
}