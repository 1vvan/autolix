import React, { useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import './range-dropdown.scss'
import clsx from "clsx";
import { usePopper } from "react-popper";
import FocusTrap from "focus-trap-react";
import { useTheme } from "@/shared/theme-context/theme-context";
import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";

interface RangeDropdownProps {
  placeholder: string;
  setValue: (key: string, value: string | number) => void;
  fromKey: string;
  toKey: string;
  min: number;
  max: number;
}

const RangeDropdown: React.FC<RangeDropdownProps> = ({
  placeholder,
  setValue,
  min,
  max,
  fromKey,
  toKey,
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [rangeValue, setRangeValue] = useState([min, max])

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-end",
  });

  const handleRangeChange = (value) => {
    setRangeValue(value);
  };

  const handleAfterChange = (value) => {
    setValue(fromKey, value[0]);
    setValue(toKey, value[1]);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    buttonRef?.current?.focus();
  };

  return (
    <div>
      <div ref={popperRef} onClick={handleOpen}>
        <button
          className={clsx(
            "flex gap-3 px-3 py-2.5 justify-between border rounded-xl relative items-center w-full dark:bg-dark-bg",
            {
              "dark:bg-dark-border border-violet400": isOpen,
              "border-gray-200 dark:border-gray-700": !isOpen,
            }
          )}
          ref={buttonRef}
          onClick={handleOpen}
        >
          <span className="text-black dark:text-gray-300 text-l">
            {placeholder}
          </span>
            <Icon
              icon={ICON_COLLECTION.chevronDown}
              iconColor={theme === "dark" ? "#fff" : "#000"}
              className={isOpen ? "rotate-180" : ''}
            />
        </button>
      </div>
      {isOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            onActivate: handleOpen,
            onDeactivate: handleClose,
            fallbackFocus: buttonRef.current!,
          }}
        >
          <div
            style={popper.styles.popper}
            className="dialog-sheet p-12px mt-1 z-30 bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-300	dark:shadow-gray-800 dark:bg-gray-950 dark:border-gray-950"
            ref={setPopperElement}
            {...popper.attributes.popper}
            role="dialog"
            aria-label="Dropdown"
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-black dark:text-white">From:</span>
                  <div className="relative py-3 px-4 border border-gray-200 rounded-lg w-28 dark:bg-gray-800 dark:border-gray-800">
                    <input
                      type="number"
                      value={rangeValue[0]}
                      className="bg-transparent text-gray-800 font-medium dark:text-white appearance-none"
                      onChange={(e) =>
                        handleRangeChange([+e.target.value, rangeValue[1]])
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-black dark:text-white">To:</span>
                  <div className="relative py-3 px-4 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-800 w-28">
                    <input
                      type="number"
                      value={rangeValue[1]}
                      className="bg-transparent text-gray-800 font-medium dark:text-white appearance-none"
                      onChange={(e) =>
                        handleRangeChange([rangeValue[0], +e.target.value])
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="px-3">
                <Slider
                  range
                  min={min}
                  max={max}
                  value={rangeValue}
                  onChange={handleRangeChange}
                  onAfterChange={handleAfterChange}
                  className="range-slider mb-3"
                />
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </div>
  );
};

export default RangeDropdown;