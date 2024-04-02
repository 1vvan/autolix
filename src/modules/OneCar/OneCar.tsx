import { Layout } from "@/app/layout/Layout";
import React from "react";
import { useParams } from 'react-router-dom';

import { useOneCar } from "./useOneCar";
import { OneCarCard } from "./components/OneCarCard";

export const OneCar = () => {
    const { id } = useParams();
    const {models} = useOneCar(id);

    return(
        <Layout>
            <section className="w-full dark:bg-dark-bg py-3 md:py-8 px-4 md:px-16">
                <OneCarCard car={models.oneCar} types={models.types}/>
            </section>
        </Layout>
    )

}