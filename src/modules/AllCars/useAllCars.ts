import { useEffect, useState } from "react";
import { carsApi } from "@/app/services/carsApi";
import { selectAllTypes, selectDriveUnitTypes, selectEngineTypes, selectFuelTypes, selectGearboxTypes, selectStatusTypes } from "@/app/store/reducers/TypesSlice";
import { useSelector } from "react-redux";
import { ICar } from "@/shared/types/api-types";
import { removeEmptyFields } from "@/shared/helpers/removeEmptyFields";

const initAllCarsRequestData = {
    status_id: null,
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

export const useAllCars = () => {
    const [carsRequestData, setCarsRequestData] = useState(initAllCarsRequestData);
    const { data: cars = [], isLoading } = carsApi.useGetAllCarsQuery(removeEmptyFields(carsRequestData));
    const types = useSelector(selectAllTypes);
    const [enhancedCars, setEnhancedCars] = useState<ICar[]>([]);
    const [sortOption, setSortOption] = useState('');

    const statusOptions = useSelector(selectStatusTypes)
    const gearboxOptions = useSelector(selectGearboxTypes)
    const engineOptions = useSelector(selectEngineTypes)
    const fuelOptions = useSelector(selectFuelTypes)
    const driveUnitOptions = useSelector(selectDriveUnitTypes)

    const mapOptions = (options) => options.map(item => ({
        label: item.name,
        value: item.id
    }));

    const dropdownsOptions = {
        statusOptions: mapOptions(statusOptions),
        gearboxOptions: mapOptions(gearboxOptions),
        engineOptions: mapOptions(engineOptions),
        fuelOptions: mapOptions(fuelOptions),
        driveUnitOptions: mapOptions(driveUnitOptions),
    };

    const changeParam = (key, value) => {
        setCarsRequestData(prevState => ({
            ...prevState,
            [key]: value,
        }));
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

    useEffect(() => {
        const sortedCars = applySorting(enhancedCars);
        setEnhancedCars(sortedCars);
        // eslint-disable-next-line 
    }, [sortOption, cars]);

    useEffect(() => {
        const addStatusForCar = () => {
            const updatedCars = cars.map(item => {
                return {
                    ...item,
                    status_name: types.statusTypes.find(type => type.id === item.status_id)?.name || ''
                };
            });
            setEnhancedCars(updatedCars);
        };

        if (cars && types) {
            addStatusForCar();
        }
    }, [cars, types]);

    const clearFilters = () => {
        setCarsRequestData(initAllCarsRequestData)
        setSortOption('')
    }

    useEffect(() => {
        if (sortOption === '') {
            const updatedCars = cars.map(item => ({
                ...item,
                status_name: types.statusTypes.find(type => type.id === item.status_id)?.name || ''
            }));
            setEnhancedCars(updatedCars);
        } else {
            const sortedCars = applySorting(enhancedCars);
            setEnhancedCars(sortedCars);
        }
        // eslint-disable-next-line
    }, [sortOption, cars]);


    return {
        models: {
            cars: enhancedCars,
            isLoading,
            dropdownsOptions,
            filtersData: carsRequestData,
            sortOptions,
            selectedSort: sortOption
        },
        commands: {
            changeParam,
            clearFilters,
            setSortOption
        },
    };
}
