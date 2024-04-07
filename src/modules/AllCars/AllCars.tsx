import { Layout } from "@/app/layout/Layout";
import React from "react";
import { AllCarsList } from "./components/AllCarsList";
import { useAllCars } from "./useAllCars";
import { Dropdown } from "@/shared/UI/dropdown/dropdown";
import RangeDropdown from "@/shared/UI/range-dropdown/range-dropdown";
import { ClearFilters } from "@/shared/UI/clear-filters/clear-filters";

export const AllCars = () => {
    const {models, commands} = useAllCars()

    return(
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16">
                <div className="w-full flex items-center gap-3">
                    <Dropdown value={models.filtersData.status_id} id="status_id" options={models.dropdownsOptions.statusOptions} onChange={commands.changeParam} placeholder="Select Status" />
                    <Dropdown value={models.filtersData.gearbox_type_id} id="gearbox_type_id" options={models.dropdownsOptions.gearboxOptions} onChange={commands.changeParam} placeholder="Select Gearbox" />
                    <Dropdown value={models.filtersData.engine_type_id} id="engine_type_id" options={models.dropdownsOptions.engineOptions} onChange={commands.changeParam} placeholder="Select Engine" />
                    <Dropdown value={models.filtersData.fuel_id} id="fuel_id" options={models.dropdownsOptions.fuelOptions} onChange={commands.changeParam} placeholder="Select Fuel" />
                    <Dropdown value={models.filtersData.drive_unit_id} id="drive_unit_id" options={models.dropdownsOptions.driveUnitOptions} onChange={commands.changeParam} placeholder="Select Drive Unit" />
                    <RangeDropdown
                        fromKey='year_min' toKey="year_max"
                        placeholder="Select Year"
                        min={2000} max={new Date().getFullYear()} 
                        setValue={commands.changeParam}
                    />
                    <Dropdown
                        id="sort"
                        options={models.sortOptions}
                        onChange={(key, value) => commands.setSortOption(value)}
                        placeholder="Sort by"
                        value={models.selectedSort}
                    />

                    <ClearFilters onClearFilters={commands.clearFilters}/>
                </div>
                <AllCarsList cars={models.cars} />
            </section>
        </Layout>
    )
}