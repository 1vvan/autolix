import { Layout } from "@/app/layout/Layout";
import React from "react";
import { AvailableCarsList } from "./components/AvailableCarsList";
import { useAvailableCars } from "./useAvailbaleCars";

export const AvailableCars = () => {
    const {models} = useAvailableCars();

    return(
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16">
                <AvailableCarsList cars={models.availableCars}/>
            </section>
        </Layout>
    )

}