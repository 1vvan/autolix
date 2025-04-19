import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { Modal } from "@/shared/UI/modal/modal";
import { useTheme } from "@/shared/theme-context/theme-context";
import React, { useState } from "react";

export const ViewReceiptModal = ({ booking }) => {
    const [showModal, setShowModal] = useState(false);
    const { theme } = useTheme();

    const serviceDetails = booking?.services?.map(service => {
        const pricing = booking.service_prices?.find(price => price.service_id === service.id);
        return {
            ...service,
            final_price: pricing?.final_price ?? 0
        };
    }) || [];

    const totalPrice = serviceDetails.reduce((sum, service) => sum + service.final_price, 0);

    return (
        <>
            <button onClick={() => setShowModal(!showModal)}>
                <Icon
                    icon={ICON_COLLECTION.receipt}
                    iconSize={'18px'}
                    iconColor={theme === "dark" ? "#fff" : "#000"}
                />
            </button>

            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                title={'Appointment Receipt'}
                isShowSave={false}
                bodyClassNames={'flex flex-col gap-2'}
            >
                <div className="w-full flex flex-col gap-2">
                    {serviceDetails.length > 0 ? (
                        <div className='w-full flex flex-col gap-2 mb-5'>
                            {serviceDetails.map(service => (
                                <div key={service.id} className='dark:text-white flex justify-between'>
                                    <span>{service.name}</span>
                                    <span>${service.final_price}</span>
                                </div>
                            ))}
                            <div className='h-px bg-gray-300 dark:bg-gray-600 my-2'></div>
                            <strong className='dark:text-white flex justify-between'>
                                <span>Total price:</span>
                                <span>${totalPrice}</span>
                            </strong>
                        </div>
                    ) : (
                        <div className='dark:text-white'>No service details available</div>
                    )}
                </div>
            </Modal>
        </>
    );
};
