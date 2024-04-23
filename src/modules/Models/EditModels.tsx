import { Layout } from "@/app/layout/Layout";
import React from "react";
import { useEditModels } from "./useEditModels";
import { AddCarBrand } from "./components/AddCarBrand";
import { AddCarModels } from "./components/AddCarModels";

export const EditModels = () => {
    const { models, commands } = useEditModels()

    return (
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16 flex justify-center gap-3 md:flex-row flex-col">
                <AddCarBrand
                    brands={models.brands}
                    handleAddBrand={commands.handleAddBrand}
                    showModal={models.showAddBrandModal}
                    setShowModal={commands.setShowAddBrandModal}
                    onChange={commands.handleChangeBrandName} 
                    isDisabled={models.isAddBrandDisabled}
                    handleDeleteBrand={commands.handleDeleteBrand}/>
                <AddCarModels 
                    models={models.models} 
                    handleAddModel={commands.handleAddModel}
                    showModal={models.showAddModelModal}
                    setShowModal={commands.setShowAddModelModal}
                    onChangeModel={commands.handleChangeModelName} 
                    onChangeBrand={commands.handleChangeBrandForModel} 
                    options={models.brandsOptions}
                    isDisabled={models.isAddModelDisabled}
                    handleDeleteModel={commands.handleDeleteModel}/>
            </section>
        </Layout>
    )
}