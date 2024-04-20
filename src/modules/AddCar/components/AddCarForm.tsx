import { addCarFormSelects } from "@/shared/constants/fields";
import { checkNumberInput } from "@/shared/helpers/checkNumberInput";
import clsx from "clsx";
import React from "react";
import { Oval } from "react-loader-spinner";

export const AddCarForm = ({ disabledSelects, isLoading, handleAddCar, changeParam, handleFileChange, options, errors }) => {
    return (
        <form className="max-w-md mx-auto py-6" action="#" method="POST" noValidate>
            <div className="flex items-center justify-center relative mb-6">
                <h6 className="text-black dark:text-white text-center text-3xl">Add Car</h6>
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
                <input
                    onChange={(e) => changeParam('year', parseInt(e.target.value))}
                    type='string'
                    className={clsx("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                        'border-red-500 dark:border-red-500': errors['year'],
                    })}
                    placeholder=" "
                    required
                    disabled={isLoading}
                    max={new Date().getFullYear()}
                    maxLength={4}
                    onKeyDown={(e) => checkNumberInput(e, 1)}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Year</label>
            </div>
            <div className="relative z-0 w-full pb-5 group">
                <input
                    onChange={(e) => changeParam('engine_capacity', parseInt(e.target.value))}
                    type='string'
                    className={clsx("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                        'border-red-500 dark:border-red-500': errors['engine_capacity'],
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
            <div className="relative z-0 w-full pb-5 group">
                <input
                    onChange={(e) => changeParam('vin', e.target.value)}
                    type='string'
                    className={clsx("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                        'border-red-500 dark:border-red-500': errors['vin'],
                    })}
                    placeholder=" "
                    required
                    disabled={isLoading}
                    maxLength={17}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >VIN</label>
            </div>
            <div className="relative z-0 w-full pb-5 group">
                <input
                    onChange={(e) => changeParam('price', parseInt(e.target.value))}
                    type='string'
                    className={clsx("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                        'border-red-500 dark:border-red-500': errors['price'],
                    })}
                    placeholder=" "
                    required
                    disabled={isLoading}
                    maxLength={7}
                    onKeyDown={(e) => checkNumberInput(e, 1)}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Price</label>
            </div>
            <div className="relative z-0 w-full pb-5 group">
                <input
                    onChange={(e) => changeParam('horse_power', parseInt(e.target.value))}
                    type='string'
                    className={clsx("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                        'border-red-500 dark:border-red-500': errors['horse_power'],
                    })}
                    placeholder=" "
                    required
                    disabled={isLoading}
                    maxLength={4}
                    onKeyDown={(e) => checkNumberInput(e, 1)}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Horse Power</label>
            </div>
            {addCarFormSelects.map((item) => (
                <div className="pb-5 group z-0 w-full" key={item.key}>
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select
                        onChange={(e) => changeParam(item.key, parseInt(e.target.value))}
                        id="underline_select"
                        className={clsx("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-gray-400 dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer", {
                            'border-red-500 dark:border-red-500': errors[item.key],
                        })}
                        defaultValue={0}
                        disabled={(disabledSelects[item.key] && disabledSelects[item.key]) || isLoading}
                    >
                        <option value={0}>{item.label}</option>
                        {options[item.key].map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </div>
            ))}
            <div className="relative z-0 pb-5 w-full group">
                <label htmlFor="hs-color-input" className="block text-sm font-medium mb-2 ml-1 text-gray-500 dark:text-gray-400">Color</label>
                <input
                    type="color"
                    className={clsx("w-full p-1 h-10 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700", {
                        'border-red-500 dark:border-red-500': errors['color'],
                    })}
                    id="hs-color-input"
                    onChange={(e) => changeParam('color', e.target.value)}
                    disabled={isLoading}
                />
            </div>
            <div className="relative z-0 pb-5 w-full group">
                <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400" htmlFor="multiple_files">Upload multiple files</label>
                <input 
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    id="multiple_files" type="file" multiple onChange={handleFileChange}/>
            </div>
            <button
                type="submit"
                onClick={handleAddCar}
                className="text-white bg-violet-500 hover:bg-violet-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >Submit</button>
        </form>
    )
}