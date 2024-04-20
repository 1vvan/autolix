import { Layout } from "@/app/layout/Layout";
import React from "react";
import { AddCarForm } from "./components/AddCarForm";
import { useAddCar } from "./useAddCar";

export const AddCar = () => {
    const {models, commands} = useAddCar();

    return (
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8">
                <AddCarForm disabledSelects={models.disabledSelects} isLoading={models.isLoading} handleAddCar={commands.handleAddCar} changeParam={commands.changeParam} handleFileChange={commands.handleFileChange} options={models.dropdownsOptions} errors={models.addErrors}/>
            </section>
        </Layout>
    )
}