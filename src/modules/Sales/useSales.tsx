import { salesApi } from "@/app/services/salesApi";
import { removeEmptyFields } from "@/shared/helpers/removeEmptyFields";
import { useState } from "react";

const initSalesRequestData = {
    sale_date_start: null,
    sale_date_end: null,
    sale_price_min: null,
    sale_price_max: null,
    payment_method_id: null
}

export const useSales = () => {
    const [salesRequestData, setSalesRequestData] = useState(initSalesRequestData);
    const {data: sales = [], isLoading} = salesApi.useGetSalesQuery(removeEmptyFields(salesRequestData))

    const changeParam = (key, value) => {
        setSalesRequestData(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }

    const handleDateRangeSelect = ({ startDate, endDate }) => {
        changeParam('sale_date_start', startDate);
        changeParam('sale_date_end', endDate);
    };

    return {
        models: {
            sales,
            isLoading
        },
        commands: {
            changeParam,
            handleDateRangeSelect
        },
    };
}