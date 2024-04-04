import { Layout } from "@/app/layout/Layout";
import React from "react";
import { SalesTable } from "./components/SalesTable";
import { useSales } from "./useSales";

export const Sales = () => {
    const {models, commands} = useSales();

    return(
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16">
                <SalesTable sales={models.sales} isLoading={models.isLoading} changeParam={commands.changeParam}/>
            </section>
        </Layout>
    )
}