import { bookingApi } from "@/app/services/bookingApi";
import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { Modal } from "@/shared/UI/modal/modal";
import { useTheme } from "@/shared/theme-context/theme-context";
import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

export const EditBookingDateModal = ({ title, booking, handleChangeDate, isLoading, withComment = false }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [comment, setComment] = useState<string>('');
    const { theme } = useTheme()

    const onSave = () => {
        if (withComment && !comment) {
            toast.error('Reason field is required');
            return;
        }

        if (!selectedDate) {
            toast.error('Date Time field is required');
            return;
        }

        handleChangeDate(booking.id, selectedDate);
        setShowModal(false);
    }

    useEffect(() => {
        if (showModal && booking?.booking_date && booking?.booking_time) {
            const localDate = new Date(booking.booking_date);

            const [hours, minutes, seconds] = booking.booking_time.split(":").map(Number);

            localDate.setHours(hours);
            localDate.setMinutes(minutes);
            localDate.setSeconds(seconds || 0);
            localDate.setMilliseconds(0);

            setSelectedDate(localDate);
        }
    }, [showModal, booking]);

    const bookingDateOnly = useMemo(() => {
        if (!selectedDate) return null;
        return selectedDate.toLocaleDateString('en-CA');;
    }, [selectedDate]);

    const { data: bookingBusySlots } = bookingApi.useGetBusyBookingSlotsQuery(bookingDateOnly!, {
        skip: !bookingDateOnly
    });

    const getExcludeTimes = (busySlots: Array<{ booking_date: string, booking_time: string }> | undefined) => {
        if (!busySlots) return [];
    
        return busySlots.map(slot => {
            const [hours, minutes] = slot.booking_time.split(':');
            const date = new Date(slot.booking_date);
            date.setHours(Number(hours), Number(minutes), 0, 0);
            return date;
        });
    };
    
    const excludeTimes = getExcludeTimes(bookingBusySlots);

    return (
        <>
            <button
                onClick={() => setShowModal(!showModal)}
            >
                <Icon
                    icon={ICON_COLLECTION.edit}
                    iconSize={'18px'}
                    iconColor={theme === "dark" ? "#fff" : "#000"}
                />
            </button>
            <Modal isLoading={isLoading} showModal={showModal} setShowModal={setShowModal} title={title} onSave={onSave} bodyClassNames={'flex flex-col gap-2'}>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date) => setSelectedDate(date)}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd HH:mm"
                    timeFormat="HH:mm"
                    minDate={new Date()}
                    timeIntervals={30}
                    excludeTimes={excludeTimes}
                    className="w-full block py-2.5 px-0 mb-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer"
                />

                {withComment && (
                    <div className="relative z-0 w-full pb-5 group">
                        <textarea
                            onChange={(e) => setComment(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer"
                            rows={3}
                            placeholder=" "
                            required
                            disabled={isLoading}
                        />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Reason</label>
                    </div>
                )}
            </Modal>
        </>
    )
}