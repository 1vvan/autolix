import { Loader } from "@/shared/UI/loader/loader";
import { ISale } from "@/shared/types/api-types";
import React from "react";
import Moment from "react-moment";

interface SalesTableProps {
    sales: ISale[];
    isLoading: boolean;
    changeParam: (key: string, value: string | number) => void;
}

export const SalesTable: React.FC<SalesTableProps> = ({sales, isLoading, changeParam}) => {

    if(isLoading){
        return <Loader/>
    }

    return(
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
                <thead>
                <tr className="bg-gray-400 dark:bg-gray-200">
                    <th className="px-4 py-2" style={{width: '3%'}}>ID</th>
                    <th className="px-4 py-2 w-2/12">Client</th>
                    <th className="px-4 py-2 w-2/12">Buying Price</th>
                    <th className="px-4 py-2 w-2/12">Car</th>
                    <th className="px-4 py-2 w-2/12">Car VIN</th>
                    <th className="px-4 py-2 w-2/12">Payment Method</th>
                    <th className="px-4 py-2 w-2/12">Sale At</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((client) => (
                    <tr key={client.id} className="border-b border-gray-300 text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-transparent">
                        <td className="px-4 py-2 text-center">{client.id}</td>
                        <td className="px-4 py-2 text-center">{client.client_full_name}</td>
                        <td className="px-4 py-2 text-center">${client.sale_price}</td>
                        <td className="px-4 py-2 text-center">{client.car_details.brand} {client.car_details.model}</td>
                        <td className="px-4 py-2 text-center">{client.car_details.vin}</td>
                        <td className="px-4 py-2 text-center">{client.payment_method}</td>
                        <td className="px-4 py-2 text-center"><Moment date={client.sale_date} format="dddd YYYY-MM-DD"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {!sales.length && <div className="text-gray-600 dark:text-gray-200 text-center text-nowrap pt-2">Nothing found</div>}
        </div>
    )
}