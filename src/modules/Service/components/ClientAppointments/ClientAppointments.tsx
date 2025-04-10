import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useClientAppoitnments } from './useClientAppointments';
import Moment from 'react-moment';

const ClientAppointments = () => {
    const {models, commands} = useClientAppoitnments();

    return (
        <div className="overflow-x-auto m-5">
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
                <thead>
                    <tr className="bg-gray-400 dark:bg-gray-200">
                        <th className="px-4 py-2 w-2/12">Car</th>
                        <th className="px-4 py-2 w-1/12">Car Year</th>
                        <th className="px-4 py-2 w-1/12">Capacity</th>
                        <th className="px-4 py-2 w-1/12">Engine Fuel</th>
                        <th className="px-4 py-2 w-2/12">Services</th>
                        <th className="px-4 py-2 w-2/12">Booking Date Time</th>
                        <th className="px-4 py-2 w-1/12">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {models.appointments && models.appointments.map((item) => (
                        <tr 
                            key={item.id}
                            className="border-b border-gray-300 text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-transparent"
                        >
                            <td className="px-4 py-2 text-center">{item.brand_name} {item.model_name}</td>
                            <td className="px-4 py-2 text-center">{item.car_year}</td>
                            <td className="px-4 py-2 text-center">{item.engine_capacity}</td>
                            <td className="px-4 py-2 text-center">{item.fuel_type}</td>
                            <td className="px-4 py-2 text-center">
                                {item.services?.map(service => service.name).join(', ')}
                            </td>
                            <td className="px-4 py-2 text-center">
                                <Moment date={item.booking_date} format="dddd YYYY-MM-DD" /> {item.booking_time}
                            </td>
                            <td className="px-4 py-2 text-center">{item.status_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!models.appointments || !models.appointments.length ? <div className="text-gray-600 dark:text-gray-200 text-center text-nowrap pt-2">Nothing found</div> : ''}
        </div>
    );
}

export default ClientAppointments;
