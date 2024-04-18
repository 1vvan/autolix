import { Loader } from "@/shared/UI/loader/loader";
import React from "react";
import Moment from "react-moment";

interface UserPurchasesListProps {
    purchases: any;
    isLoading: boolean;
    navigateToBuyedCar: (carId: number) => void;
}

export const UserPurchasesList: React.FC<UserPurchasesListProps> = ({purchases, isLoading, navigateToBuyedCar}) => {

    if(isLoading){
        return <Loader/>
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
                <thead>
                    <tr className="bg-gray-400 dark:bg-gray-200">
                        <th className="px-4 py-2 w-2/12">Car</th>
                        <th className="px-4 py-2 w-2/12">Car VIN</th>
                        <th className="px-4 py-2 w-2/12">Car Color</th>
                        <th className="px-4 py-2 w-2/12">Buying Price</th>
                        <th className="px-4 py-2 w-2/12">Payment Method</th>
                        <th className="px-4 py-2 w-2/12">Purchase At</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((item) => (
                        <tr 
                            key={item.sale_id}
                            className="border-b border-gray-300 text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-transparent cursor-pointer hover:opacity-70 duration-300"
                            onClick={() => navigateToBuyedCar(item.car.id)}
                        >
                            <td className="px-4 py-2 text-center">{item.car.brand} {item.car.model}</td>
                            <td className="px-4 py-2 text-center">{item.car.vin}</td>
                            <td className="px-4 py-2 text-center"><span className="rounded-lg border border-white dark:border-gray-700 w-16 h-8 inline-block" style={{backgroundColor: item.car.color}}></span></td>
                            <td className="px-4 py-2 text-center">${item.sale_price}</td>
                            <td className="px-4 py-2 text-center">{item.payment_method}</td>
                            <td className="px-4 py-2 text-center"><Moment date={item.sale_date} format="dddd YYYY-MM-DD" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!purchases.length && <div className="text-gray-600 dark:text-gray-200 text-center text-nowrap pt-2">Nothing found</div>}
        </div>
    )
}
