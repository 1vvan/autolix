import { Layout } from "@/app/layout/Layout";
import React from "react";
import { useUserPurchases } from "./useUserPurchases";
import { UserPurchasesList } from "./components/UserPurchasesList";

export const UserPurchases = () => {
    const {models, commands} = useUserPurchases();

    return (
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16">
                <UserPurchasesList purchases={models.purchases} isLoading={models.isLoading} navigateToBuyedCar={commands.navigateToBuyedCar}/>
            </section>
        </Layout>
    )
}