import { carsApi } from "@/app/services/carsApi";
import { selectAllTypes } from "@/app/store/reducers/TypesSlice";
import { selectIsAdmin } from "@/app/store/reducers/UserSlice";
import { showLoginToast } from "@/shared/UI/customToasts/loginRequireToast";
import { ROUTES } from "@/shared/constants/routes";
import { isAuthenticated } from "@/shared/helpers/authHelpers";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const useOneCar = () => {
    const { id } = useParams();
    const { data: oneCar, isLoading } =
    carsApi.useGetOneCarQuery(id);
    const types = useSelector(selectAllTypes)
    const navigate = useNavigate()

    const isAdmin = useSelector(selectIsAdmin)

    const getCarTypesNames = () => {
        if (!oneCar || !types) return {};
    
        const structuredTypes = {
            fuelTypes: types.fuelTypes.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {}),
            gearboxTypes: types.gearboxTypes.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {}),
            engineTypes: types.engineTypes.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {}),
            driveUnitTypes: types.driveUnitTypes.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {}),
            statusTypes: types.statusTypes.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {}),
        };
    
        return {
            fuelType: structuredTypes.fuelTypes[oneCar.fuel_id] || 'Unknown',
            gearboxType: structuredTypes.gearboxTypes[oneCar.gearbox_type_id] || 'Unknown',
            engineType: structuredTypes.engineTypes[oneCar.engine_type_id] || 'Unknown',
            driveUnitType: structuredTypes.driveUnitTypes[oneCar.drive_unit_id] || 'Unknown',
            statusType: structuredTypes.statusTypes[oneCar.status_id] || 'Unknown',
        };
    }

    const navigateToBuyForm = (id) => {
        if(isAuthenticated()){
            navigate(ROUTES.buy_car.path + `/${id}`)
        } else {
            showLoginToast();
        }
    }

    return {
        models: {
            oneCar,
            types: getCarTypesNames(),
            isLoading,
            isAdmin
        },
        commands: {
            navigateToBuyForm
        },
      };
}