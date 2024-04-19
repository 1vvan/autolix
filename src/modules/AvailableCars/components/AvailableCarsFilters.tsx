import React, { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@/shared/theme-context/theme-context";
import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { Modal } from "@/shared/UI/modal/modal";
import RangeDropdown from "@/shared/UI/range-dropdown/range-dropdown";
import { Dropdown } from "@/shared/UI/dropdown/dropdown";

export const AvailableCarsFilters = ({ filtersData, dropdownsOptions, changeParam, onSaveFilters }) => {
    const [showModal, setShowModal] = useState(false);
    const { theme } = useTheme()

    const onSave = () => {
        setShowModal(false);
        onSaveFilters()
    }
    return (
        <>
            <button
                className={clsx(
                    "flex gap-3 p-3 border rounded-xl relative items-center",
                    {
                        "dark:bg-dark-border dark:border-dark-border border-violet400": showModal,
                        "border-gray-200 dark:border-gray-700": !showModal,
                    }
                )}
                onClick={() => setShowModal(!showModal)}
            >
                <span className="text-black dark:text-gray-300 text-l">
                    Filters
                </span>
                <Icon
                    icon={ICON_COLLECTION.chevronDown}
                    iconColor={theme === "dark" ? "#fff" : "#000"}
                    className={showModal ? "rotate-180" : ''}
                />
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} title="Cars Filters" onSave={onSave} bodyClassNames={'flex flex-col gap-2 w-96'}>
                <Dropdown value={filtersData.brand_id} id="brand_id" options={dropdownsOptions.brandsOptions} onChange={changeParam} placeholder="Brand" />
                <Dropdown isDisabled={!filtersData.brand_id} value={filtersData.model_id} id="model_id" options={dropdownsOptions.modelsOptions} onChange={changeParam} placeholder="Model" />
                <Dropdown value={filtersData.gearbox_type_id} id="gearbox_type_id" options={dropdownsOptions.gearboxOptions} onChange={changeParam} placeholder="Select Gearbox" />
                <Dropdown value={filtersData.engine_type_id} id="engine_type_id" options={dropdownsOptions.engineOptions} onChange={changeParam} placeholder="Select Engine" />
                <Dropdown value={filtersData.fuel_id} id="fuel_id" options={dropdownsOptions.fuelOptions} onChange={changeParam} placeholder="Select Fuel" />
                <Dropdown value={filtersData.drive_unit_id} id="drive_unit_id" options={dropdownsOptions.driveUnitOptions} onChange={changeParam} placeholder="Select Drive Unit" />
                <RangeDropdown
                    fromKey='year_min' toKey="year_max"
                    placeholder="Select Year"
                    min={2000} max={new Date().getFullYear()}
                    setValue={changeParam}
                />
            </Modal>
        </>
    )
}