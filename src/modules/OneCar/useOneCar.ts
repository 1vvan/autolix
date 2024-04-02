import { carsApi } from "@/app/services/carsApi";
import { typesApi } from "@/app/services/typesApi";

export const useOneCar = (carId) => {
    const { data: oneCar, isLoading } =
    carsApi.useGetOneCarQuery(carId);
    const {data: types} = typesApi.useGetTypesQuery();

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

    return {
        models: {
            oneCar,
            types: getCarTypesNames(),
            isLoading
        },
        commands: {
        },
      };
}