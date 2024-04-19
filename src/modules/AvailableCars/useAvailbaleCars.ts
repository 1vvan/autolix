import { carsApi } from "@/app/services/carsApi";
import { removeEmptyFields } from '../../shared/helpers/removeEmptyFields';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllTypes, selectDriveUnitTypes, selectEngineTypes, selectFuelTypes, selectGearboxTypes, selectStatusTypes } from "@/app/store/reducers/TypesSlice";
import { ICar } from "@/shared/types/api-types";
import { selectAllCarsModels } from "@/app/store/reducers/CarsSlice";
import { mapOptions } from "@/shared/helpers/mapDropdownOptions";

const initCarsRequestData = {
    brand_id: null,
    model_id: null,
    year_min: null,
    year_max: null,
    gearbox_type_id: null,
    engine_type_id: null,
    fuel_id: null,
    drive_unit_id: null,
}

const sortOptions = [
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Year: New to Old', value: 'year_desc' },
    { label: 'Year: Old to New', value: 'year_asc' },
    { label: 'Status', value: 'status' },
];

export const useAvailableCars = () => {
    const [carsRequestData, setCarsRequestData] = useState(initCarsRequestData);
    const [tempFiltersData, setTempFiltersData] = useState(carsRequestData);
    const { data: availableCars = [], isLoading: carsLoading } =
    carsApi.useGetAvailableCarsQuery(removeEmptyFields(carsRequestData));

    const types = useSelector(selectAllTypes);
    const [enhancedCars, setEnhancedCars] = useState<ICar[]>([]);
    const [sortOption, setSortOption] = useState('');

    const carsModels = useSelector(selectAllCarsModels);
    const statusOptions = useSelector(selectStatusTypes)
    const gearboxOptions = useSelector(selectGearboxTypes)
    const engineOptions = useSelector(selectEngineTypes)
    const fuelOptions = useSelector(selectFuelTypes)
    const driveUnitOptions = useSelector(selectDriveUnitTypes)

    const [dropdownsOptions, setDropdownsOptions] = useState({
        brandsOptions: mapOptions(carsModels.brands),
        modelsOptions: [],
        statusOptions: mapOptions(statusOptions),
        gearboxOptions: mapOptions(gearboxOptions),
        engineOptions: mapOptions(engineOptions),
        fuelOptions: mapOptions(fuelOptions),
        driveUnitOptions: mapOptions(driveUnitOptions),
    })

    const changeParam = (key, value) => {
        setTempFiltersData(prevState => ({
            ...prevState,
            [key]: value,
        }));
        if(key === 'brand_id'){
            const brandModels = carsModels.models && mapOptions(carsModels.models.filter(item => item.brand_id === value))
            setDropdownsOptions(prevState => ({
                ...prevState,
                modelsOptions: brandModels
            }))
        }
    }

    const applySorting = (cars) => {
        switch (sortOption) {
            case 'price_asc':
                return [...cars].sort((a, b) => a.price - b.price);
            case 'price_desc':
                return [...cars].sort((a, b) => b.price - a.price);
            case 'year_desc':
                return [...cars].sort((a, b) => b.year - a.year);
            case 'year_asc':
                return [...cars].sort((a, b) => a.year - b.year);
            case 'status':
                return [...cars].sort((a, b) => a.status_name.localeCompare(b.status_name));
            default:
                return cars;
        }
    };

    const onSaveFilters = () => {
        setCarsRequestData(tempFiltersData);
    }

    const clearFilters = () => {
        setTempFiltersData(initCarsRequestData);
        setCarsRequestData(initCarsRequestData)
        setSortOption('')
    }

    useEffect(() => {
        const addStatusForCar = () => {
            const updatedCars = availableCars.map(item => {
                return {
                    ...item,
                    status_name: types.statusTypes.find(type => type.id === item.status_id)?.name || ''
                };
            });
            setEnhancedCars(updatedCars);
        };

        if (availableCars && types) {
            addStatusForCar();
        }
    }, [availableCars, types]);

    useEffect(() => {
        const sortedCars = applySorting(enhancedCars);
        setEnhancedCars(sortedCars);

        if (sortOption === '') {
            const updatedCars = availableCars.map(item => ({
                ...item,
                status_name: types.statusTypes.find(type => type.id === item.status_id)?.name || ''
            }));
            setEnhancedCars(updatedCars);
        } else {
            const sortedCars = applySorting(enhancedCars);
            setEnhancedCars(sortedCars);
        }
        // eslint-disable-next-line
    }, [sortOption, availableCars]);

    return {
        models: {
            availableCars: enhancedCars,
            carsLoading,
            dropdownsOptions,
            filtersData: tempFiltersData,
            sortOptions,
            selectedSort: sortOption,
        },
        commands: {
            changeParam,
            clearFilters,
            setSortOption,
            onSaveFilters
        },
    };
}