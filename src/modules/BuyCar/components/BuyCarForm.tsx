import { buyCarFormFields } from "@/shared/constants/fields";
import InputMask from 'react-input-mask';
import React from "react";
import { Oval } from "react-loader-spinner";

interface BuyCarFormProps {
    paymentMethodsOptions: any;
    errors: any;
    isLoading: boolean;
    changeParam: (key: string, value: string | number) => void;
    handleBuyCar: (e) => void;
}

export const BuyCarForm: React.FC<BuyCarFormProps> = ({ paymentMethodsOptions, isLoading, errors, changeParam, handleBuyCar }) => {
    return (
        <form className="max-w-md mx-auto py-6" action="#" method="POST" noValidate>
            <div className="flex items-center justify-center relative mb-6">
                <h6 className="text-black dark:text-white text-center text-3xl">Buy Car</h6>
                {isLoading && 
                    <Oval
                        wrapperClass="absolute top-1/2 right-3 -translate-y-1/2"
                        height="24"
                        width="24"
                        color="purple"
                    />
                }
            </div>
            {buyCarFormFields.map((field) => (
                <div key={field.key} className="relative z-0 w-full pb-8 group">
                    {field.key === 'phone' ? (
                        <InputMask
                            mask="+999 999 999 9999"
                            onChange={(e) => changeParam(field.key, e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer"
                            placeholder=" "
                            required
                            disabled={isLoading}
                        />
                    ) : (
                        <input
                            onChange={(e) => changeParam(field.key, e.target.value)}
                            type={field.type}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer"
                            placeholder=" "
                            required
                            disabled={isLoading}
                        />
                    )}
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{field.label}</label>
                    {errors[field.key] && <span className="text-red-500 absolute bottom-1.5">{errors[field.key]}</span>}
                </div>
            ))}
            <div className="pb-5 group z-0 w-full">
                <label htmlFor="underline_select" className="sr-only">Underline select</label>
                <select
                    onChange={(e) => changeParam('payment_method', parseInt(e.target.value))}
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-gray-400 dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer"
                    disabled={isLoading}
                >
                    {paymentMethodsOptions.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
                {errors['payment_method'] && <span className="text-red-500">{errors['payment_method']}</span>}
            </div>
            <button
                type="submit"
                onClick={handleBuyCar}
                className="text-white bg-violet-500 hover:bg-violet-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >Submit</button>
        </form>
    )
}