import { Layout } from "@/app/layout/Layout";
import React from "react";
import { useOneCar } from "./useOneCar";
import { OneCarCard } from "./components/OneCarCard";

export const OneCar = () => {
    const { models, commands } = useOneCar();

    return (
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16">
                <OneCarCard
                    editOptions={models.editOptions}
                    car={models.oneCar}
                    types={models.types}
                    buyCar={commands.navigateToBuyForm}
                    isAdmin={models.isAdmin}
                    handleDeleteCar={commands.handleDeleteCar} 
                    handleDeleteCarImage={commands.handleDeleteCarImage}
                    onSaveEditedCar={commands.handleEditCar}
                    changeParam={commands.changeParam}
                    onChangeNewImages={commands.onChangeNewImages}
                    handleUploadNewImages={commands.handleUploadNewImages}
                    isDisabledSaveCarImages={models.isDisabledSaveCarImages}
                    isLoadingEditImage={models.isLoadingEditImage}
                    isLoadingCars={models.isLoading}
                    />
            </section>
        </Layout>
    )

}