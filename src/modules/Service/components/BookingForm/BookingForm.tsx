import React from 'react';
import { useBookingForm } from './useBookingForm';
import { Oval } from 'react-loader-spinner';
import clsx from 'clsx';
import InputMask from 'react-input-mask';
import { checkNumberInput } from '@/shared/helpers/checkNumberInput';
import { Dropdown } from '@/shared/UI/dropdown/dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
    const {models, commands} = useBookingForm();
    var isLoading = models.isLoading;

    return (
        <form className="max-w-md mx-auto py-6 md:px-0 px-3" action="#" method="POST" noValidate>
            <div className="flex items-center justify-center relative mb-6">
                <h6 className="text-black dark:text-white text-center text-3xl">Make an appointment</h6>
                {isLoading &&
                    <Oval
                        wrapperClass="absolute top-1/2 right-3 -translate-y-1/2"
                        height="24"
                        width="24"
                        color="purple"
                    />
                }
            </div>

            <div className="relative z-0 w-full pb-5 group">
                <InputMask
                    mask="+999 99 999 9999"
                    onChange={(e) => commands.changeParam('phone', e.target.value)}
                    value={models.bookingData.phone} 
                    className={clsx("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                        'border-red-500 dark:border-red-500': !!models.bookErrors['phone'],
                    })}
                    placeholder=" "
                    required
                    disabled={isLoading}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Phone</label>
            </div>

            <Dropdown 
                id="brand_id" 
                value={models.selectedCarBrand} 
                options={models.brandsOptions} 
                onChange={commands.changeSelectedCarBrand} 
                placeholder="Car brand" 
                forForm
                error={!!models.bookErrors['model_id']}
            />

            {models.selectedCarBrand ? (
                <Dropdown 
                    id="model_id" 
                    value={models.bookingData.model_id} 
                    options={models.modelsOptions} 
                    onChange={commands.changeParam} 
                    placeholder="Car model" 
                    forForm
                    error={!!models.bookErrors['model_id']}
                />
            ) : ''}

            <DatePicker
                selected={models.bookingData.car_year ? new Date(models.bookingData.car_year, 0) : null}
                onChange={(date: Date) => {
                    if (date) {
                        commands.changeParam('car_year', date.getFullYear());
                    }
                }}
                showYearPicker
                dateFormat="yyyy"
                minDate={new Date(1970, 0)}
                maxDate={new Date()}
                placeholderText="Select the year"
                className={clsx("w-full block py-2.5 px-0 mb-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                    'border-red-500 dark:border-red-500': !!models.bookErrors['car_year'],
                })}
            />

            <div className="relative z-0 w-full pb-5 group">
                <input
                    onChange={(e) => commands.changeParam('engine_capacity', parseInt(e.target.value))}
                    value={models.bookingData.engine_capacity} 
                    type='string'
                    className={clsx("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                        'border-red-500 dark:border-red-500': !!models.bookErrors['engine_capacity'],
                    })}
                    placeholder=" "
                    required
                    disabled={isLoading}
                    max={7}
                    maxLength={3}
                    onKeyDown={(e) => checkNumberInput(e, 0.1)}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Engine Capacity</label>
            </div>
            
            <Dropdown 
                id="fuel_id" 
                value={models.bookingData.fuel_id} 
                options={models.fuelOptions} 
                onChange={commands.changeParam} 
                placeholder="Fuel Type" 
                forForm
                error={!!models.bookErrors['fuel_id']}
            />

            <Dropdown 
                id="services" 
                value={models.bookingData.services} 
                options={models.servicesOptions} 
                isMulti
                onChange={commands.changeMultiParam} 
                placeholder="Select services" 
                forForm
                error={!!models.bookErrors['services']}
            />

            <DatePicker
                selected={models.bookingData.bookingDateTime}
                onChange={(date: Date) => commands.changeParam('bookingDateTime', date)}
                showTimeSelect
                dateFormat="yyyy-MM-dd HH:mm"
                timeFormat="HH:mm"
                minDate={new Date()}
                timeIntervals={30}
                excludeTimes={models.excludeTimes}
                placeholderText="Select the date and time"
                className={clsx("w-full block py-2.5 px-0 mb-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                    'border-red-500 dark:border-red-500': !!models.bookErrors['booking_date'],
                })}
            />

            <div className="relative z-0 w-full pb-5 group">
                <textarea
                    onChange={(e) => commands.changeParam('comment', e.target.value)}
                    value={models.bookingData.comment} 
                    className={clsx("resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                        'border-red-500 dark:border-red-500': !!models.bookErrors['comment'],
                    })}
                    rows={3}
                    placeholder=" "
                    required
                    disabled={isLoading}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Comment</label>
            </div>

            {models.servicePrices && models.totalPrice && (
                <div className='flex flex-col gap-2 mb-5'>
                    {models.servicePrices.map(service => (
                        <div key={service.id} className='dark:text-white'>
                            {service.name}: ${service.finalPrice}
                        </div>
                    ))}

                    <strong className='dark:text-white'>Total price: ${models.totalPrice}</strong>
                </div>
            )}


            <button
                type="submit"
                onClick={commands.handleCreateBooking}
                className="text-white bg-violet-500 hover:bg-violet-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >Submit</button>
        </form>
    );
}

export default BookingForm;
