import { ImageSlider } from "@/shared/UI/slider/slider";
import { ROUTES } from "@/shared/constants/routes";
import { ICar } from "@/shared/types/api-types";
import React from "react";

interface AvailableCarsListProps {
    cars: ICar[] | undefined
}

export const AvailableCarsList: React.FC<AvailableCarsListProps> = ({
    cars
}) => {
    return (
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-8">
                {cars && cars.map((car) => (
                    <a key={car.id} href={ROUTES.one_car.path + '/' + car.id} className="cursor-pointer duration-300 hover:scale-102">
                        <div className="w-full overflow-hidden rounded-lg">
                            {car.images.length > 1 ? (
                                <ImageSlider images={car.images} />
                            ) : (
                                <img src={car.images[0]} alt="" className="w-full" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="mt-4 text-lg text-gray-700 dark:text-gray-200">{car.brand + ' ' + car.model}</h3>
                            <p className="mt-1 text-base font-medium text-gray-900 dark:text-gray-600">{car.price}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}