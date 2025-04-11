import React from 'react';
import { useAppoitnments } from './useAppointments';
import Moment from 'react-moment';

const Appointments = () => {
    const {models, commands} = useAppoitnments();

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
                        <th className="px-4 py-2 w-1/12">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {models.appointments && models.appointments.map((item) => (
                        <>
                            <tr 
                                key={item.id}
                                className="border-b border-gray-300 text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-transparent"
                            >
                                <td className="px-4 py-2 text-center">{item.brand_name} {item.model_name}</td>
                                <td className="px-4 py-2 text-center">{item.car_year}</td>
                                <td className="px-4 py-2 text-center">{item.engine_capacity}</td>
                                <td className="px-4 py-2 text-center">{item.fuel_type}</td>
                                <td className="px-4 py-2 text-center text-balance">
                                    {item.services?.map(service => service.name).join(', ')}
                                </td>
                                <td className="px-4 py-2 text-center flex gap-2 justify-between">
                                    <div className='flex flex-col gap-2'>
                                        <Moment date={item.booking_date} format="dddd YYYY-MM-DD" /> {item.booking_time}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-center">{item.status_name}</td>
                                <td className="px-4 py-2 text-center">
                                    
                                </td>
                            </tr>

                            {item.comments && (
                                <tr key={`comments-${item.id}`} className="border-b border-gray-300 text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-transparent w-full">
                                    <td colSpan={3} className="px-4 py-2 text-left text-gray-600 w-full">
                                        {item.comments.filter(comment => comment.comment_type === 'client').length > 0 && (
                                            <>
                                                <strong className='mb-2 inline-block'>Client Comments:</strong>
                                                <ul>
                                                    {item.comments.filter(comment => comment.comment_type === 'client').map(comment => (
                                                        <li key={comment.id} className="text-gray-600 dark:text-gray-200">
                                                            {comment.comment} <br />
                                                            <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </td>
                                    <td colSpan={4} className="px-4 py-2 text-left text-gray-600">
                                        {item.comments.filter(comment => comment.comment_type === 'manager').length > 0 && (
                                            <>
                                                <strong className='mb-2 inline-block'>Manager Comments:</strong>
                                                <ul>
                                                    {item.comments.filter(comment => comment.comment_type === 'manager').map(comment => (
                                                        <li key={comment.id} className="text-gray-600 dark:text-gray-200">
                                                            {comment.comment} <br />
                                                            <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            )}

                        </>
                    ))}
                </tbody>
            </table>
            {!models.appointments || !models.appointments.length ? <div className="text-gray-600 dark:text-gray-200 text-center text-nowrap pt-2">Nothing found</div> : ''}
        </div>
    );
}

export default Appointments;
