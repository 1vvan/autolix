import { Layout } from "@/app/layout/Layout";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { serviceDashboardPages } from "./pages";
import Appointments from "./components/Appointments/Appointments";

export const ServiceDashboard = () => {
    const [selectedPage, setSelectedPage] = useState(serviceDashboardPages[0].id);

    return(
        <Layout>
            <section className="w-full dark:bg-dark-bg flex pt-4 relative">
                <Sidebar
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                />
                <div className="w-full overflow-y-auto" style={{paddingLeft: '20%'}}>
                    {selectedPage === serviceDashboardPages[0].id ? (
                        <Appointments/>
                    ) : ''}
                </div>
            </section>
        </Layout>
    )
}