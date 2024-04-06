import { Layout } from "@/app/layout/Layout";
import React from "react";
import { SalesTable } from "./components/SalesTable";
import { useSales } from "./useSales";
import { DatePickerDialog } from "@/shared/UI/date-picker/date-picker";

export const Sales = () => {
    const {models, commands} = useSales();

    return(
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16">
                <div className="w-full flex items-center gap-3 pb-4">
                    <DatePickerDialog onDateRangeSelect={commands.handleDateRangeSelect}/>
                </div>
                <SalesTable sales={models.sales} isLoading={models.isLoading} changeParam={commands.changeParam}/>
            </section>
        </Layout>
    )
}