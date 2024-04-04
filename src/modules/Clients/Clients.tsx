import { Layout } from "@/app/layout/Layout";
import React from "react";
import { useClients } from "./useClients";
import { ClientsTable } from "./components/ClientsTable";

export const Clients = () => {
    const {models} = useClients();

    return(
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16">
                <ClientsTable clients={models.clients} isLoading={models.isLoading}/>
            </section>
        </Layout>
    )
}