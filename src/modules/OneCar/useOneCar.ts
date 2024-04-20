import { carsApi } from "@/app/services/carsApi";
import { modelsApi } from "@/app/services/modelsApi";
import { selectAllTypes } from "@/app/store/reducers/TypesSlice";
import { selectIsAdmin } from "@/app/store/reducers/UserSlice";
import { showLoginToast } from "@/shared/UI/customToasts/loginRequireToast";
import { ROUTES } from "@/shared/constants/routes";
import { isAuthenticated } from "@/shared/helpers/authHelpers";
import { mapOptions } from "@/shared/helpers/mapDropdownOptions";
import { ICar, ICarUpdateRequest } from "@/shared/types/api-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useOneCar = () => {
    const { id } = useParams();
    const { data: oneCar, isLoading: isLoadingCar } = carsApi.useGetOneCarQuery(id);
    const {data: carsModels, isLoading: isLoadingModels} = modelsApi.useGetCarsAllModelsQuery();
    const [deleteCar] = carsApi.useDeleteCarMutation();
    const [editCar] = carsApi.useUpdateCarMutation();
    
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

    const [tempEditData, setTempEditData] = useState<Partial<ICar> | undefined>();
    const [filteredModels, setFilteredModels] = useState(mapOptions(carsModels?.models))
    
    const [editOptions, setEditOptions] = useState({
        brand_id: mapOptions(carsModels?.brands),
        model_id: filteredModels,
        status_id: mapOptions(types.statusTypes),
        gearbox_type_id: mapOptions(types.gearboxTypes),
        engine_type_id: mapOptions(types.engineTypes),
        fuel_id: mapOptions(types.fuelTypes),
        drive_unit_id: mapOptions(types.driveUnitTypes),
    })

    const changeParam = (key: keyof ICar, value: any) => {
        setTempEditData(prevState => ({
            ...prevState,
            [key]: value,
        }));
        if(key === 'brand_id'){
            const brandModels = carsModels?.models && mapOptions(carsModels?.models.filter(item => item.brand_id === value))
            setEditOptions(prevState => ({
                ...prevState,
                model_id: brandModels
            }))
        }
    };

    useEffect(() => {
        if (oneCar) {
            const { images, brand, brand_id, model, status_changed_at, created_at, ...filteredCarData } = oneCar;
          setTempEditData(filteredCarData);
        }
      }, [oneCar]);

    useEffect(() => {
        if(tempEditData && carsModels){
            setFilteredModels(carsModels.models && mapOptions(carsModels?.models.filter(item => item.brand_id === tempEditData.brand_id)))
        }
        // eslint-disable-next-line
    }, [tempEditData])


    //handles------
    const handleEditCar = () => {
        editCar(tempEditData as ICarUpdateRequest).then(() => {
            toast.success(`Car ${oneCar?.brand} ${oneCar?.model} (VIN: ${tempEditData?.vin}) was updated successfully!`)
        })
    }

    const handleDeleteCar = (carId) => {
        deleteCar(carId)
            .unwrap()
            .then(() => {
                navigate(ROUTES.cars.path)
                toast.success('Car deleted successfully');
            })
            .catch((error) => {
                console.error('Failed to delete car:', error);
                toast.error('Failed to delete car. Please try again.');
            });
    }

    const navigateToBuyForm = (id) => {
        if (isAuthenticated()) {
            navigate(ROUTES.buy_car.path + `/${id}`)
        } else {
            showLoginToast();
        }
    }

    const isLoading = isLoadingCar || isLoadingModels;

    return {
        models: {
            oneCar,
            types: getCarTypesNames(),
            isLoading,
            isAdmin,
            editOptions,
        },
        commands: {
            navigateToBuyForm,
            handleDeleteCar,
            handleEditCar,
            changeParam
        },
    };
}