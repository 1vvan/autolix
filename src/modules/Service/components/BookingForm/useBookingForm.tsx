import { bookingApi, useCreateBookingMutation } from "@/app/services/bookingApi";
import { selectAllCarsModels } from "@/app/store/reducers/CarsSlice";
import { selectFuelTypes } from "@/app/store/reducers/TypesSlice";
import { calculateServicePrice } from "@/shared/helpers/calculateHelpers";
import { mapOptions } from "@/shared/helpers/mapDropdownOptions";
import { createBookSchema } from "@/shared/schemas/createBookSchema";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initBookData = {
    phone: "",
    model_id: null,
    car_year: null,
    engine_capacity: "",
    fuel_id: null,
    comment: "",
    bookingDateTime: null as Date | null,
    services: [] as number[]
}

const initBookErrors = {
    phone: "",
    model_id: "",
    car_year: "",
    engine_capacity: "",
    fuel_id: "",
    comment: "",
    bookingDateTime: "",
    services: ""
}

export const useBookingForm = () => {
    const {data: bookingServices} = bookingApi.useGetAllBookingServicesQuery();
    const [createBooking, { isLoading }] = useCreateBookingMutation();
    const [bookingData, setBookingData] = useState(initBookData)
    const [bookErrors, setBookErrors] = useState(initBookErrors);
    const [selectedCarBrand, setSelectedCarBrand] = useState(null);

    const carsModels = useSelector(selectAllCarsModels);
    const fuelTypes = useSelector(selectFuelTypes);

    const brandsOptions = mapOptions(carsModels.brands);
    const modelsOptions = selectedCarBrand ? 
        mapOptions(carsModels.models.filter((el) => el.brand_id === selectedCarBrand)) : [];
    const fuelOptions = mapOptions(fuelTypes);
    const servicesOptions = mapOptions(bookingServices);

    const changeSelectedCarBrand = (key, value) => {
        setSelectedCarBrand(value);
    }

    const changeParam = (key, value) => {
        setBookingData(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const changeMultiParam = (key, values) => {
        setBookingData(prevState => ({
            ...prevState,
            [key]: values
        }));
    };    

    const validate = async () => {
        try {
            await createBookSchema.validate(bookingData, { abortEarly: false });
            setBookErrors(initBookErrors);
            return true;
        } catch (error: any) {
            const validationErrors = {};
            error.inner.forEach((e) => {
                validationErrors[e.path] = e.message;
            });
            setBookErrors(validationErrors as any);
            return false;
        }
    }

    const handleCreateBooking = async (e) => {
        e.preventDefault();
    
        const phoneWithoutSpaces = bookingData.phone.replace(/\s+/g, '');

        if (await validate()) {
            if (!bookingData.bookingDateTime) {
                toast.error("Please select date and time");
                return;
            }

            const booking_date = bookingData.bookingDateTime.toISOString().slice(0, 10);
            const booking_time = bookingData.bookingDateTime.toTimeString().slice(0, 5);

            const payload = {
                ...bookingData,
                phone: phoneWithoutSpaces,
                booking_date,
                booking_time,
            };

            delete (payload as any).bookingDateTime;

            createBooking(payload)
                .then(() => {
                    toast.success("Appointment created successfully");
                    localStorage.setItem('userPhone', phoneWithoutSpaces);
                    setBookingData(initBookData);
                    setBookErrors(initBookErrors);
                })
                .catch(() => {
                    toast.error("Something went wrong while creating booking");
                });
        } else {
            toast.error("Error in one of the fields");
        }
    }        

    const bookingDateOnly = useMemo(() => {
        if (!bookingData.bookingDateTime) return null;
        return bookingData.bookingDateTime.toLocaleDateString('en-CA');;
    }, [bookingData.bookingDateTime]);

    const { data: bookingBusySlots } = bookingApi.useGetBusyBookingSlotsQuery(bookingDateOnly!, {
        skip: !bookingDateOnly
    });

    const getExcludeTimes = (busySlots: Array<{ booking_date: string, booking_time: string }> | undefined) => {
        if (!busySlots) return [];
    
        return busySlots.map(slot => {
            const [hours, minutes] = slot.booking_time.split(':');
            const date = new Date(slot.booking_date);
            date.setHours(Number(hours), Number(minutes), 0, 0);
            return date;
        });
    };
    
    const excludeTimes = getExcludeTimes(bookingBusySlots);

    const servicePrices = useMemo(() => {
        if (!bookingServices || !bookingData.car_year) return [];
    
        return bookingServices
            .filter(service => bookingData.services.includes(service.id))
            .map(service => {
                const finalPrice = calculateServicePrice(parseFloat(service.base_price), bookingData.car_year || 0);
                return {
                    id: service.id,
                    name: service.name,
                    basePrice: parseFloat(service.base_price),
                    finalPrice
                };
            });
    }, [bookingServices, bookingData.services, bookingData.car_year]);

    const totalPrice = useMemo(() => {
        if (!bookingServices || !bookingData.car_year) return null;

        return servicePrices.reduce((acc, curr) => acc + curr.finalPrice, 0);
    }, [servicePrices, bookingServices, bookingData]);    
    console.log(servicePrices, totalPrice);
    

    return {
        models: {
            excludeTimes,
            bookingData,
            bookErrors,
            carsModels,
            brandsOptions,
            modelsOptions,
            fuelOptions,
            selectedCarBrand,
            servicesOptions,
            isLoading,
            servicePrices,
            totalPrice
        },
        commands: {
            changeParam,
            changeMultiParam,
            changeSelectedCarBrand,
            handleCreateBooking
        },
      };
}