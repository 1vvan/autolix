/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { Modal } from "@/shared/UI/modal/modal";
import { useTheme } from "@/shared/theme-context/theme-context";
import React, { useEffect, useMemo, useState } from "react";
import { Oval } from 'react-loader-spinner';
import clsx from 'clsx';
import { checkNumberInput } from '@/shared/helpers/checkNumberInput';
import { Dropdown } from '@/shared/UI/dropdown/dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { selectAllCarsModels } from "@/app/store/reducers/CarsSlice";
import { bookingApi, useUpdateBookingMutation } from "@/app/services/bookingApi";
import { selectFuelTypes } from "@/app/store/reducers/TypesSlice";
import { mapOptions } from "@/shared/helpers/mapDropdownOptions";
import { toast } from "react-toastify";
import { calculateServicePrice } from "@/shared/helpers/calculateHelpers";
import { updateBookSchema } from "@/shared/schemas/updateBookSchema";

const initBookData = {
    model_id: null,
    car_year: null,
    engine_capacity: "",
    fuel_id: null,
    services: [] as number[],
    comment: ''
}

const initBookErrors = {
    model_id: "",
    car_year: "",
    engine_capacity: "",
    fuel_id: "",
    services: "",
    comment: ''
}

export const EditApptModal = ({booking, refetchAppts}) => {
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState(initBookData)
    const [bookErrors, setBookErrors] = useState(initBookErrors);
    const { theme } = useTheme();
    const [updateBooking, { isLoading }] = useUpdateBookingMutation();
    const {data: bookingServices} = bookingApi.useGetAllBookingServicesQuery();
    const [selectedCarBrand, setSelectedCarBrand] = useState<number | null>();

    const carsModels = useSelector(selectAllCarsModels);
    const fuelTypes = useSelector(selectFuelTypes);

    const initData = () => {
        if (!booking || !carsModels.models.length) return;
    
        const brand = carsModels.models.find(m => m.id === booking.model_id)?.brand_id;
        setSelectedCarBrand(brand ?? null);
    
        setBookingData({
            model_id: booking.model_id,
            car_year: booking.car_year,
            engine_capacity: booking.engine_capacity,
            fuel_id: booking.fuel_id,
            services: booking.services.map((el) => el.id),
            comment: ''
        });
    };

    useEffect(() => {
        initData();
    }, [showModal])

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
            await updateBookSchema.validate(bookingData, { abortEarly: false });
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

    const onSave = async (e) => {
        e.preventDefault();
    
        if (await validate()) {
            updateBooking({ id: booking.id, data: bookingData })
                .then(() => {
                    toast.success("Appointment updated successfully");
                    setBookingData(initBookData);
                    setBookErrors(initBookErrors);
                    setShowModal(false);
                    refetchAppts();
                })
                .catch(() => {
                    toast.error("Something went wrong while updating booking");
                });
        } else {
            toast.error("Error in one of the fields");
        }
    };       

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

    return (
        <>
            <button
            className="ml-2"
                onClick={() => setShowModal(!showModal)}
            >
                <Icon
                    icon={ICON_COLLECTION.edit}
                    iconSize={'18px'}
                    iconColor={theme === "dark" ? "#fff" : "#000"}
                />
            </button>
            <Modal isLoading={isLoading} width="w-1/2" showModal={showModal} setShowModal={setShowModal} title="Edit appointment" onSave={onSave} bodyClassNames={'flex flex-col gap-2'}>
                <form className="py-6 px-3 dark:bg-dark-bg rounded-2xl overflow-hidden" action="#" method="POST" noValidate>
                    <div className="flex items-center justify-center relative mb-6">
                        {isLoading &&
                            <Oval
                                wrapperClass="absolute top-1/2 right-3 -translate-y-1/2"
                                height="24"
                                width="24"
                                color="purple"
                            />
                        }
                    </div>
        
                    <Dropdown
                        id="brand_id" 
                        value={selectedCarBrand} 
                        options={brandsOptions} 
                        onChange={changeSelectedCarBrand} 
                        placeholder="Car brand" 
                        forForm
                        error={!!bookErrors['model_id']}
                    />
        
                    {selectedCarBrand ? (
                        <Dropdown
                            id="model_id" 
                            value={bookingData.model_id} 
                            options={modelsOptions} 
                            onChange={changeParam} 
                            placeholder="Car model" 
                            forForm
                            error={!!bookErrors['model_id']}
                        />
                    ) : ''}
        
                    <DatePicker
                        selected={bookingData.car_year ? new Date(bookingData.car_year, 0) : null}
                        onChange={(date: Date) => {
                            if (date) {
                                changeParam('car_year', date.getFullYear());
                            }
                        }}
                        showYearPicker
                        dateFormat="yyyy"
                        minDate={new Date(1970, 0)}
                        maxDate={new Date()}
                        placeholderText="Select the year"
                        className={clsx("w-full block py-2.5 px-0 mb-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                            'border-red-500 dark:border-red-500': !!bookErrors['car_year'],
                        })}
                    />
        
                    <div className="relative z-0 w-full pb-5 group">
                        <input
                            onChange={(e) => changeParam('engine_capacity', parseInt(e.target.value))}
                            type='string'
                            className={clsx("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                                'border-red-500 dark:border-red-500': !!bookErrors['engine_capacity'],
                            })}
                            value={bookingData.engine_capacity}
                            placeholder=" "
                            required
                            disabled={isLoading}
                            max={7}
                            maxLength={3}
                            onKeyDown={(e) => checkNumberInput(e, 0.1)}
                        />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Engine Capacity</label>
                    </div>
                    
                    <Dropdown 
                        id="fuel_id" 
                        value={bookingData.fuel_id} 
                        options={fuelOptions} 
                        onChange={changeParam} 
                        placeholder="Fuel Type" 
                        forForm
                        error={!!bookErrors['fuel_id']}
                    />
        
                    <Dropdown 
                        id="services" 
                        value={bookingData.services} 
                        options={servicesOptions} 
                        isMulti
                        onChange={changeMultiParam} 
                        placeholder="Select services" 
                        forForm
                        error={!!bookErrors['services']}
                    />

                    <div className="relative z-0 w-full pb-5 group">
                        <textarea
                            onChange={(e) => changeParam('comment', e.target.value)}
                            value={bookingData.comment} 
                            className={clsx("resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                                'border-red-500 dark:border-red-500': !!bookErrors['comment'],
                            })}
                            rows={3}
                            placeholder=" "
                            required
                            disabled={isLoading}
                        />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Comment</label>
                    </div>
        
                    {servicePrices && totalPrice && (
                        <div className='flex flex-col gap-2 mb-5'>
                            {servicePrices.map(service => (
                                <div key={service.id} className='dark:text-white'>
                                    {service.name}: ${service.finalPrice}
                                </div>
                            ))}
        
                            <strong className='dark:text-white'>Total price: ${totalPrice}</strong>
                        </div>
                    )}
                </form>
            </Modal>
        </>
    )
}