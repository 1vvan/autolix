import { Layout } from "@/app/layout/Layout";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { clientServicePages } from "./pages";
import BookingForm from "./components/BookingForm/BookingForm";
import ClientAppointments from "./components/ClientAppointments/ClientAppointments";

export const ClientService = () => {
    const [selectedPage, setSelectedPage] = useState(clientServicePages[0].id);

    return(
        <Layout>
            <section className="w-full dark:bg-dark-bg flex pt-4 relative">
                <Sidebar
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                />
                <div className="w-full overflow-y-auto" style={{paddingLeft: '20%'}}>
                    {selectedPage === clientServicePages[0].id ? (
                        <BookingForm/>
                    ) : ''}
                    {selectedPage === clientServicePages[1].id ? (
                        <ClientAppointments/>
                    ) : ''}
                </div>
            </section>
        </Layout>
    )
}