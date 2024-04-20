import { useAddCarMutation } from "@/app/services/carsApi";
import { selectAllCarsModels } from "@/app/store/reducers/CarsSlice";
import { selectDriveUnitTypes, selectEngineTypes, selectFuelTypes, selectGearboxTypes } from "@/app/store/reducers/TypesSlice";
import { showAddCarToast } from "@/shared/UI/customToasts/addCarToast";
import { mapOptions } from "@/shared/helpers/mapDropdownOptions";
import { addSchema } from "@/shared/schemas/addSchema";
import { IAddCarRequest, IAddCarRequestErrors } from "@/shared/types/api-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initAddCarData = {
    year: 0,
    color: '',
    engine_type_id:0,
	engine_capacity: 0,
	fuel_id: 0,
	gearbox_type_id: 0,
	drive_unit_id: 0,
	vin: '',
	price: 0,
	horse_power: 0,
    brand_id: 0,
	model_id: 0
}

const initAddCarErrors = {
    year: '',
    color: '',
    engine_type_id: '',
	engine_capacity: '',
	fuel_id: '',
	gearbox_type_id: '',
	drive_unit_id: '',
	vin: '',
	price: '',
	horse_power: '',
    brand_id: '',
	model_id: ''
}

export const useAddCar = () => {
    const [addCar, { isLoading }] = useAddCarMutation();
    const [addCarData, setAddCarData] = useState<IAddCarRequest>(initAddCarData)
    const [addErrors, setAddErrors] = useState(initAddCarErrors);
    const [selectedFiles, setSelectedFiles] = useState<any>([]);

    const carsModels = useSelector(selectAllCarsModels);
    const gearboxOptions = useSelector(selectGearboxTypes)
    const engineOptions = useSelector(selectEngineTypes)
    const fuelOptions = useSelector(selectFuelTypes)
    const driveUnitOptions = useSelector(selectDriveUnitTypes)

    const [dropdownsOptions, setDropdownsOptions] = useState({
        brand_id: mapOptions(carsModels.brands),
        model_id: [],
        gearbox_type_id: mapOptions(gearboxOptions),
        engine_type_id: mapOptions(engineOptions),
        fuel_id: mapOptions(fuelOptions),
        drive_unit_id: mapOptions(driveUnitOptions),
    })

    const changeParam = (key, value) => {
        setAddCarData(prevState => ({
            ...prevState,
            [key]: value,
        }));
        if(key === 'brand_id'){
            const brandModels = carsModels.models && mapOptions(carsModels.models.filter(item => item.brand_id === value))
            setDropdownsOptions(prevState => ({
                ...prevState,
                model_id: brandModels
            }))
        }
    }

    const handleFileChange = (e) => {
        setSelectedFiles([...e.target.files]);
    };
    
    const disabledSelects = {model_id: !addCarData.brand_id}

    const handleAddValidation = async () => {
        try {
            await addSchema.validate(addCarData, { abortEarly: false });
            setAddErrors(initAddCarErrors);
            return true;
        } catch (error: any) {
            const validationErrors = {};
            error.inner.forEach((e) => {
                validationErrors[e.path] = e.message;
            });
            setAddErrors(validationErrors as IAddCarRequestErrors);
            return false;
        }
    }

    const handleAddCar = async (e) => {
        e.preventDefault();
        if (await handleAddValidation()) {
            const formData = new FormData();
            Object.keys(addCarData).forEach(key => {
                formData.append(key, addCarData[key]);
            });
            selectedFiles.forEach(file => {
                formData.append('carImages', file);
            });

            addCar(formData)
                .unwrap()
                .then((response) => {
                    const carId = response.carId;
                    showAddCarToast(carId);
                })
        } else {
            toast.error('Error in one of the fields');
        }
    }

    return {
        models: {
            isLoading,
            addErrors,
            dropdownsOptions,
            addCarData,
            disabledSelects
        },
        commands: {
            changeParam,
            handleFileChange,
            handleAddCar
        },
    };
}
