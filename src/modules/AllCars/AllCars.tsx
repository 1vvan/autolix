import { Layout } from "@/app/layout/Layout";
import React from "react";
import { AllCarsList } from "./components/AllCarsList";
import { useAllCars } from "./useAllCars";
import { Dropdown } from "@/shared/UI/dropdown/dropdown";
import { ClearFilters } from "@/shared/UI/clear-filters/clear-filters";
import { AllCarsFilters } from "./components/AllCarsFilters";

export const AllCars = () => {
    const { models, commands } = useAllCars()

    return (
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8">
                <div className="w-full flex items-center gap-3 px-6 pb-6">
                    <AllCarsFilters filtersData={models.filtersData} dropdownsOptions={models.dropdownsOptions} changeParam={commands.changeParam} onSaveFilters={commands.onSaveFilters} />
                    <Dropdown
                        id="sort"
                        options={models.sortOptions}
                        onChange={(key, value) => commands.setSortOption(value)}
                        placeholder="Sort by"
                        value={models.selectedSort}
                    />
                    <ClearFilters onClearFilters={commands.clearFilters} />
                </div>
                <AllCarsList cars={models.cars} />
            </section>
        </Layout>
    )
}