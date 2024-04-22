import { hpToKw } from "@/shared/helpers/hpToKw";
import { ICar } from "@/shared/types/api-types";
import React, { useState } from "react";
import { clsx } from 'clsx';
import { AVAILABLE_TYPE, ELECTRIC_FUEL_TYPE, RESERVED_TYPE, SOLD_TYPE } from "@/shared/constants/types";
import Moment from "react-moment";
import { ImageSlider } from "@/shared/UI/slider/slider";
import { moneyFormatter } from "@/shared/helpers/formatters";
import { DeleteConfirmModal } from "@/shared/modals/deleteConfirmModal";
import { EditCarModal } from "./EditCarModal";
import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { EditCarImagesModal } from "./EditCarImagesModal";
import { Loader } from "@/shared/UI/loader/loader";

interface OneCarCardProps {
    car: ICar | undefined
    types: any
    buyCar: (id: number) => void
    isAdmin: boolean
    handleDeleteCar: (carId: number) => void;
    handleDeleteCarImage: (imgId: number) => void;
    editOptions: any;
    onSaveEditedCar: () => void;
    changeParam: (key: keyof ICar, value: number | string) => void;
    onChangeNewImages: (any) => void;
    handleUploadNewImages: (carId: number) => void;
    isDisabledSaveCarImages: boolean
    isLoadingEditImage: boolean
    isLoadingCars: boolean
}

export const OneCarCard: React.FC<OneCarCardProps> = ({ car, types, buyCar, isAdmin, handleDeleteCar, handleDeleteCarImage, editOptions, onSaveEditedCar, changeParam, onChangeNewImages, handleUploadNewImages, isDisabledSaveCarImages, isLoadingEditImage, isLoadingCars }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if(isLoadingCars){
        return <Loader isFull/>
    }

    return (
        <div className=" max-w-fit mx-auto">
            {car &&
                <>
                    <div className="overflow-hidden rounded-lg relative">
                        {car.images.length > 1 ? (
                            <ImageSlider images={car.images} />
                        ) : car.images.length === 1 ? (
                            <img src={car.images[0].path} alt="" className="w-full" />
                        ) : (
                            <div className="text-gray-700 dark:text-gray-200 text-center p-24">No images</div>
                        )}
                        <div className={clsx("absolute py-1 px-2 border-2 rounded-md font-bold", {
                            'border-green-600 bg-green-500 text-green-900': car.status_id === AVAILABLE_TYPE,
                            'border-red-600 bg-red-500 text-red-900': car.status_id === SOLD_TYPE,
                            'border-yellow-600 bg-yellow-500 text-yellow-900': car.status_id === RESERVED_TYPE,
                            'right-2 top-2': !isAdmin,
                            'right-52 top-4': isAdmin
                        })}>
                            {types.statusType}
                            {car.status_id === (SOLD_TYPE || RESERVED_TYPE) && ` at: `}
                            {car.status_id === (SOLD_TYPE || RESERVED_TYPE) && <Moment date={car.status_changed_at} format="YYYY-MM-DD HH:MM" />}
                        </div>
                        {isAdmin && (
                            <div className="w-full flex gap-3 items-center justify-end pb-3 absolute top-2 right-2">
                                <EditCarModal title={`Edit ${car.brand} ${car.model} (VIN: ${car.vin})`} editOptions={editOptions} onSaveCar={onSaveEditedCar} car={car} changeParam={changeParam} />
                                <EditCarImagesModal 
                                    title={`Edit ${car.brand} ${car.model} (VIN: ${car.vin}) images.`} 
                                    car={car} 
                                    handleDeleteCarImage={handleDeleteCarImage} 
                                    onChangeNewImages={onChangeNewImages} 
                                    handleUploadNewImages={handleUploadNewImages} 
                                    isDisabledSaveCarImages={isDisabledSaveCarImages} 
                                    isLoadingEditImage={isLoadingEditImage} />
                                <div>
                                    <button
                                        className='border border-violet-500 pt-1 px-2 rounded-lg bg-white dark:bg-dark-bg hover:border-violet-300 duration-300'
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        <Icon
                                            icon={ICON_COLLECTION.trash}
                                            iconColor={'#ff0000'}
                                        />
                                    </button>
                                    <DeleteConfirmModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} title="Delete Car" onSave={() => handleDeleteCar(car.id)}>
                                        <p className="text-gray-700 dark:text-gray-200">Are you sure want to delete car?</p>
                                    </DeleteConfirmModal>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-4 px-3">
                        <h2 className="text-4xl text-gray-700 dark:text-gray-200">{car.brand + ' ' + car.model} <span className="ml-3 text-3xl text-gray-900 dark:text-gray-600">{car.year}</span></h2>
                        <span className="text-3xl font-medium text-gray-900 dark:text-gray-600">{moneyFormatter(car.price)}</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-8 rounded-lg border-2 border-slate-600 p-3 text-gray-700 dark:text-gray-200 text-xl">
                        <span className="flex items-center">Color: <span className="ml-4 rounded-lg border border-white dark:border-gray-700 w-6 h-6 inline-block" style={{ backgroundColor: car.color }}></span></span>
                        <span className="flex items-center">Engine: <span className="ml-4 text-gray-900 dark:text-gray-600">{types.engineType} {car.fuel_id !== ELECTRIC_FUEL_TYPE && car.engine_capacity + 'L'} ({car.horse_power}HP/{hpToKw(car.horse_power)}KW)</span></span>
                        <span className="flex items-center">Drive Unit: <span className="ml-4 text-gray-900 dark:text-gray-600">{types.driveUnitType}</span></span>
                        <span className="flex items-center">Gearbox: <span className="ml-4 text-gray-900 dark:text-gray-600">{types.gearboxType}</span></span>
                        <span className="flex items-center">Fuel: <span className="ml-4 text-gray-900 dark:text-gray-600">{types.fuelType}</span></span>
                        <span className="flex items-center">VIN: <span className="ml-4 text-gray-900 dark:text-gray-600">{car.vin}</span></span>
                    </div>
                    {car.status_id === AVAILABLE_TYPE && !isAdmin && (
                        <div className="text-gray-900 dark:text-gray-600 text-2xl py-8 text-center">
                            Are you want to buy this car? <button className="border-none text-purple-400 hover:text-purple-500 duration-200" onClick={() => buyCar(car.id)}>Go to buy form</button>
                        </div>
                    )}
                </>
            }
        </div>
    )
}