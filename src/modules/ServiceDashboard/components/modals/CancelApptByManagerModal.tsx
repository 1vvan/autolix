import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { Modal } from "@/shared/UI/modal/modal";
import { useTheme } from "@/shared/theme-context/theme-context";
import clsx from "clsx";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const CancelApptByManagerModal = ({ title, booking, handleCancel, handleClientDidNotCome }) => {
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState<string>('');
    const [type, setType] = useState<'cancel' | 'did_not_come'>('cancel');
    const { theme } = useTheme()

    const onSave = () => {
        if (!comment) {
            toast.error('Reason is required!')
            return;
        }

        type === 'cancel' ? handleCancel(booking.id, comment) : handleClientDidNotCome(booking.id, comment);
        setShowModal(false);
    }

    return (
        <>
            <button
            className="ml-2"
                onClick={() => setShowModal(!showModal)}
            >
                <Icon
                    icon={ICON_COLLECTION.cross}
                    iconSize={'18px'}
                    iconColor={theme === "dark" ? "#fff" : "#000"}
                />
            </button>
            <Modal isLoading={false} showModal={showModal} setShowModal={setShowModal} title={title} onSave={onSave} bodyClassNames={'flex flex-col gap-2'}>
                <div className="w-full pb-5 flex items-center justify-between gap-5">
                    <button
                        className={clsx("font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 border border-emerald-600", {
                            'bg-emerald-500 text-white': type === 'cancel',
                            'bg-transparent text-emerald-500': type !== 'cancel',
                        })}
                        type="button"
                        onClick={() => setType('cancel')}
                    >
                        Cancel
                    </button>
                    <button
                        className={clsx("font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 border border-emerald-600", {
                            'bg-emerald-500 text-white': type === 'did_not_come',
                            'bg-transparent text-emerald-500': type !== 'did_not_come',
                        })}
                        type="button"
                        onClick={() => setType('did_not_come')}
                    >
                        Client did not come
                    </button>
                </div>
                <div className="relative z-0 w-full pb-5 group">
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer"
                        rows={3}
                        placeholder=" "
                        required
                    />
                    <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Reason</label>
                </div>
            </Modal>
        </>
    )
}