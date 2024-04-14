import { Layout } from "@/app/layout/Layout";
import React from "react";
import { BuyCarForm } from "./components/BuyCarForm";
import { useBuyCar } from "./useBuyCar";

export const BuyCar = () => {
    const {models, commands} = useBuyCar();
    return(
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16">
                <BuyCarForm isLoading={models.isLoading} paymentMethodsOptions={models.paymentMethodsOptions} changeParam={commands.changeParam} errors={models.buyErrors} handleBuyCar={commands.handleBuyCar}/>
            </section>
        </Layout>
    )
}