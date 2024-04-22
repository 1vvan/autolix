import { Layout } from "@/app/layout/Layout";
import React from "react";
import { AvailableCarsList } from "./components/AvailableCarsList";
import { useAvailableCars } from "./useAvailbaleCars";
import { ClearFilters } from "@/shared/UI/clear-filters/clear-filters";
import { Dropdown } from "@/shared/UI/dropdown/dropdown";
import { AvailableCarsFilters } from "./components/AvailableCarsFilters";

export const AvailableCars = () => {
    const { models, commands } = useAvailableCars();

    return (
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8">
                <div className="w-full flex items-center gap-3 px-6 pb-6">
                    <AvailableCarsFilters filtersData={models.filtersData} dropdownsOptions={models.dropdownsOptions} changeParam={commands.changeParam} onSaveFilters={commands.onSaveFilters} />
                    <Dropdown
                        id="sort"
                        options={models.sortOptions}
                        onChange={(key, value) => commands.setSortOption(value)}
                        placeholder="Sort by"
                        value={models.selectedSort}
                    />
                    <ClearFilters onClearFilters={commands.clearFilters} />
                </div>
                <AvailableCarsList cars={models.availableCars} isLoading={models.carsLoading}/>
            </section>
        </Layout>
    )

}