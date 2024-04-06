import { salesApi } from "@/app/services/salesApi";
import { selectPaymentMethods } from "@/app/store/reducers/TypesSlice";
import { removeEmptyFields } from "@/shared/helpers/removeEmptyFields";
import { useState } from "react";
import { useSelector } from "react-redux";

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
    
    const paymentMethods = useSelector(selectPaymentMethods)
    const paymentMethodsOptions = paymentMethods.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })

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
            isLoading,
            paymentMethodsOptions,
            salesRequestData
        },
        commands: {
            changeParam,
            handleDateRangeSelect
        },
    };
}