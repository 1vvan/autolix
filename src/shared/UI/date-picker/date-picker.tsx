import React, { ChangeEventHandler, useRef, useState } from "react";

import { format, isValid, parse, isAfter, isBefore } from "date-fns";
import FocusTrap from "focus-trap-react";
import {
    DateRange,
    DayPicker,
    SelectRangeEventHandler,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import clsx from "clsx";
import styles from "./date-picker.module.scss";
import './date-picker.scss'
import { useTheme } from "@/shared/theme-context/theme-context";
import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { usePopper } from 'react-popper';

interface IDatePickerDialogProps {
    hasDateInputs?: boolean
    onDateRangeSelect?: (range: { startDate: string | null, endDate: string | null }) => void;
}

export const DatePickerDialog: React.FC<IDatePickerDialogProps> = ({
    hasDateInputs,
    onDateRangeSelect
}) => {
    const { theme } = useTheme();
    const [selectedRange, setSelectedRange] = useState<DateRange>();
    const [fromValue, setFromValue] = useState<string>();
    const [toValue, setToValue] = useState<string>();
    const [isPopperOpen, setIsPopperOpen] = useState(false);

    const popperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
        null
    );

    const popper = usePopper(popperRef.current, popperElement, {
        placement: "bottom-start",
    });

    const handleFromChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFromValue(e.target.value);
        const date = parse(e.target.value, "y/MM/dd", new Date());
        if (!isValid(date)) {
            return setSelectedRange({ from: undefined, to: undefined });
        }
        if (selectedRange?.to && isAfter(date, selectedRange.to)) {
            setSelectedRange({ from: selectedRange.to, to: date });
        } else {
            setSelectedRange({ from: date, to: selectedRange?.to });
        }
    };

    const handleToChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setToValue(e.target.value);
        const date = parse(e.target.value, "y/MM/dd", new Date());

        if (!isValid(date)) {
            return setSelectedRange({ from: selectedRange?.from, to: undefined });
        }
        if (selectedRange?.from && isBefore(date, selectedRange.from)) {
            setSelectedRange({ from: date, to: selectedRange.from });
        } else {
            setSelectedRange({ from: selectedRange?.from, to: date });
        }
    };

    const handleRangeSelect: SelectRangeEventHandler = (
        range: DateRange | undefined
    ) => {
        setSelectedRange(range);
        if (range?.from) {
            setFromValue(format(range.from, "dd MMM, yyyy"));
        } else {
            setFromValue("");
        }
        if (range?.to) {
            setToValue(format(range.to, "dd MMM, yyyy"));
        } else {
            setToValue("");
        }
    };

    const handleButtonClick = () => {
        setIsPopperOpen(true);
    };

    const handleCancelClick = () => {
        setIsPopperOpen(!isPopperOpen);
        buttonRef?.current?.focus();
    };

    const isDayDisabled = (day: Date) => {
        const today = new Date();
        return isAfter(day, today);
    };

    const handleApply = () => {
        if (onDateRangeSelect) {
            const startDate = selectedRange?.from ? format(selectedRange.from, "yyyy-MM-dd") : null;
            const endDate = selectedRange?.to ? format(selectedRange.to, "yyyy-MM-dd") : null;
            onDateRangeSelect({ startDate, endDate });
        }
        setIsPopperOpen(false);
    };

    return (
        <div>
            <div
                className={clsx(
                    "dark:bg-gray-900 dark:text-white border h-full relative",
                    styles["input-wrapper"]
                )}
                ref={popperRef}
                onClick={handleButtonClick}
                style={{
                    border: isPopperOpen
                        ? theme === "dark"
                            ? "1px solid #1F2937"
                            : "1px solid #A78BFA"
                        : theme === "dark"
                            ? "1px solid #374151"
                            : "1px solid #E5E7EB",
                    backgroundColor: isPopperOpen
                        ? theme === "dark"
                            ? "#1F2937"
                            : "transparent"
                        : "transparent",
                }}
            >
                {!hasDateInputs ? (
                    <span
                        className="font-sf-pro text-gray500 dark:text-gray-300 text-l font-medium pr-2"
                        onClick={handleButtonClick}
                    >
                        {(fromValue || toValue) ? (
                            <div className="flex items-center justify-center gap-1">
                                <p>
                                    <span>From: </span> {fromValue}{" "}
                                </p>
                                {toValue ? <p>-</p> : ""}
                                <p>
                                    <span>{toValue ? "To: " : ""}</span> {toValue}
                                </p>
                            </div>
                        ) : 'Select Date'}

                    </span>
                ) : (
                    <div className="d-flex overflow-hidden">
                        <input
                            size={toValue === undefined ? 4 : 11}
                            placeholder="Date"
                            value={fromValue}
                            onChange={handleFromChange}
                            className={`${styles.input} font-sf-pro text-gray500 dark:text-gray-300 placeholder:text-gray500 placeholder:dark:text-white`}
                            disabled={true}
                        />
                        <input
                            size={toValue === undefined || toValue === "" ? 1 : 13}
                            value={
                                toValue !== undefined && toValue !== "" ? `-  ${toValue}` : ""
                            }
                            onChange={handleToChange}
                            className={`${styles.input} mx-2 font-sf-pro text-gray500 dark:text-gray-300 placeholder:text-gray500 placeholder:dark:text-white`}
                            disabled={true}
                        />
                    </div>
                )}
                <button
                    ref={buttonRef}
                    type="button"
                    aria-label="Pick a date"
                    onClick={handleButtonClick}
                    className={styles.button}
                    style={{
                        transform: isPopperOpen ? "rotate(180deg)" : "",
                    }}
                >
                    <Icon icon={ICON_COLLECTION.chevronDown} className="height-24" />
                </button>
            </div>
            {isPopperOpen && (
                <FocusTrap
                    active
                    focusTrapOptions={{
                        initialFocus: false,
                        allowOutsideClick: true,
                        clickOutsideDeactivates: true,
                        onActivate: handleButtonClick,
                        onDeactivate: handleCancelClick,
                        fallbackFocus: buttonRef.current!,
                    }}
                >
                    <div
                        tabIndex={-1}
                        style={popper.styles.popper}
                        className={clsx(
                            "dialog-sheet bg-white dark:bg-gray-950 mt-2 rounded-xl shadow-lg shadow-gray-300 dark:shadow-gray-800",
                            styles.calendar
                        )}
                        {...popper.attributes.popper}
                        ref={setPopperElement}
                        role="dialog"
                        aria-label="DayPicker calendar"
                    >
                        <DayPicker
                            showOutsideDays
                            numberOfMonths={2}
                            mode="range"
                            selected={selectedRange}
                            onSelect={handleRangeSelect}
                            modifiers={{ disabled: isDayDisabled }}
                            modifiersClassNames={{
                                selected: styles.selected,
                                today: theme === "dark" ? styles.today_dark : styles.today,
                            }}
                            className={`${styles.head} text-gray-800 dark:text-gray-300`}
                            classNames={{
                                nav_icon:
                                    theme === "dark" ? styles.nav_icon_dark : styles.nav_icon,
                                day_range_start:
                                    theme === "dark"
                                        ? styles.day_range_start_dark
                                        : styles.day_range_start,
                                day_range_end:
                                    theme === "dark"
                                        ? !fromValue || !toValue || fromValue === toValue ? styles.day_range_end_only_dark : styles.day_range_end_dark
                                        : !fromValue || !toValue || fromValue === toValue ? styles.day_range_end_only : styles.day_range_end,
                                day_range_middle:
                                    theme === "dark"
                                        ? styles.day_range_middle_dark
                                        : styles.day_range_middle,
                                month: theme === "dark" ? styles.month_dark : styles.month,
                                caption: styles.caption,
                                caption_label:
                                    theme === "dark"
                                        ? styles.caption__label_dark
                                        : styles.caption__label,
                            }}
                        />
                        <div className={`${styles.footer}`}>
                            <p
                                className={`${styles.footer__days} dark:text-white text-gray-800 text-m md:text-l bg-gray-200 dark:bg-gray-800`}
                            >
                                {(fromValue || toValue) && (
                                    <div className="flex items-center justify-center gap-10 w-full py-8px px-32px">
                                        <p>
                                            <span>From: </span> {fromValue}{" "}
                                        </p>
                                        {toValue ? <p>-</p> : ""}
                                        <p>
                                            <span>{toValue ? "To: " : ""}</span> {toValue}
                                        </p>
                                    </div>
                                )}
                            </p>
                            <div className="flex items-center justify-end gap-12px mt-4 w-full">
                                <button
                                    className={`${styles.cancel_btn} font-semibold bg-violet-600 text-white hover:bg-violet-800 transition-all duration-300`}
                                    onClick={handleApply}
                                >
                                    Apply
                                </button>
                                <button
                                    className={`${styles.cancel_btn} font-semibold bg-violet-200 text-violet-600 dark:bg-gray-800 dark:text-white hover:bg-violet-500 hover:text-white hover:dark:bg-gray-600 transition-all duration-300`}
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </FocusTrap>
            )}
        </div>
    );
};
