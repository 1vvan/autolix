import { Loader } from "@/shared/UI/loader/loader";
import { IClient } from "@/shared/types/api-types";
import React from "react";
import Moment from 'react-moment';

interface ClientsTableProps {
    clients: IClient[]
    isLoading: boolean
}

export const ClientsTable: React.FC<ClientsTableProps> = ({clients, isLoading}) => {

    if(isLoading){
        return <Loader/>
      }

    return(
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
                <thead>
                <tr className="bg-gray-400 dark:bg-gray-200">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Buying Price</th>
                    <th className="px-4 py-2">Car VIN</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Created At</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id} className="border-b border-gray-300 text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-transparent">
                        <td className="px-4 py-2 text-center">{client.id}</td>
                        <td className="px-4 py-2 text-center">{client.full_name}</td>
                        <td className="px-4 py-2 text-center">${client.buying_price}</td>
                        <td className="px-4 py-2 text-center">{client.car.vin}</td>
                        <td className="px-4 py-2 text-center">{client.phone}</td>
                        <td className="px-4 py-2 text-center">{client.email}</td>
                        <td className="px-4 py-2 text-center">{client.address}</td>
                        <td className="px-4 py-2 text-center"><Moment date={client.created_at} format="dddd YYYY-MM-DD"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}