import { salesApi } from "@/app/services/salesApi";
import { useState } from "react";

const initSalesRequestData = {
    saleDateStart: null,
    saleDateEnd: null,
    salePriceMin: null,
    salePriceMax: null,
    paymentMethodId: null
}

export const useSales = () => {
    const [salesRequestData, setSalesRequestData] = useState(initSalesRequestData);
    const {data: sales = [], isLoading} = salesApi.useGetSalesQuery(salesRequestData)

    const changeParam = (key, value) => {
        setSalesRequestData(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }

    return {
        models: {
            sales,
            isLoading
        },
        commands: {
            changeParam
        },
    };
}