import { clientsApi } from "@/app/services/clientsApi"
import { ROUTES } from "@/shared/constants/routes";
import { useNavigate } from "react-router-dom";

export const useUserPurchases = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const { data: purchases, isLoading} = clientsApi.useGetCLientPurchasesQuery(userId ? parseInt(userId) : 0);

    const navigateToBuyedCar = (carId) => {
        navigate(ROUTES.one_car.path + '/' + carId)
    }
    
    return {
        models: {
            purchases,
            isLoading
        },
        commands: {
            navigateToBuyedCar
        }
    }
}