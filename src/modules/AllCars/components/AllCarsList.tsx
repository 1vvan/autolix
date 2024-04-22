import { Loader } from "@/shared/UI/loader/loader";
import { ImageSlider } from "@/shared/UI/slider/slider";
import { ROUTES } from "@/shared/constants/routes";
import { AVAILABLE_TYPE, RESERVED_TYPE, SOLD_TYPE } from "@/shared/constants/types";
import { moneyFormatter } from "@/shared/helpers/formatters";
import { ICar } from "@/shared/types/api-types";
import clsx from "clsx";
import React from "react";

interface AllCarsListProps {
    cars: ICar[]
    isLoading: boolean
}

export const AllCarsList: React.FC<AllCarsListProps> = ({
    cars,
    isLoading
}) => {

    if(isLoading){
        return <Loader isFull/>
    }

    return (
        <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 border-t border-gray-700 dark:border-gray-200">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-8">
                {cars && cars.map((car) => (
                    <a key={car.id} href={ROUTES.one_car.path + '/' + car.id} className="cursor-pointer duration-300 hover:scale-102">
                        <div className="w-full overflow-hidden rounded-lg relative">
                            {car.images.length > 1 ? (
                                <ImageSlider images={car.images} />
                            ) : car.images.length === 1 ? (
                                <img src={car.images[0].path} alt="" className="w-full" />
                            ) : (
                                <div className="text-gray-700 dark:text-gray-200 text-center p-12">No images</div>
                            )}
                            <div className={clsx("absolute top-2 right-2 py-1 px-2 border-2 rounded-md font-bold", {
                                'border-green-600 bg-green-500 text-green-900': car.status_id === AVAILABLE_TYPE,
                                'border-red-600 bg-red-500 text-red-900': car.status_id === SOLD_TYPE,
                                'border-yellow-600 bg-yellow-500 text-yellow-900': car.status_id === RESERVED_TYPE,
                            })}>
                                {car.status_name}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h3 className="mt-4 text-lg text-gray-700 dark:text-gray-200">{car.brand + ' ' + car.model}</h3>
                                <p className="mt-1 text-base font-medium text-gray-900 dark:text-gray-600">{moneyFormatter(car.price)}</p>
                            </div>
                            <h3 className="mt-4 text-lg text-gray-700 dark:text-gray-200"><span className="text-gray-900 dark:text-gray-600">VIN:</span> {car.vin}</h3>
                        </div>
                    </a>
                ))}
            </div>
            {!cars.length && <div className="text-gray-600 dark:text-gray-200 text-center text-nowrap pt-2">Nothing found</div>}
        </div>
    )
}