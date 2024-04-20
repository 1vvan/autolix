import React, { useState } from "react";
import { useTheme } from "@/shared/theme-context/theme-context";
import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { Modal } from "@/shared/UI/modal/modal";
import { editCarFormInputs, editCarFormSelects } from "@/shared/constants/fields";
import { checkNumberInput } from "@/shared/helpers/checkNumberInput";

export const EditCarModal = ({ editOptions, onSaveCar, title, car, changeParam }) => {
    const [showModal, setShowModal] = useState(false);
    const { theme } = useTheme()

    const onSave = () => {
        setShowModal(false);
        onSaveCar()
    }
    return (
        <>
            <button
                className='border border-violet-500 pt-1 px-2 rounded-lg bg-white dark:bg-dark-bg hover:border-violet-300 duration-300'
                onClick={() => setShowModal(!showModal)}
            >
                <Icon
                    icon={ICON_COLLECTION.edit}
                    iconColor={theme === "dark" ? "#fff" : "#000"}
                />
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} title={title} onSave={onSave} bodyClassNames={'flex flex-col gap-2'}>
                <form>
                    {editCarFormInputs.map((input) => (
                        <div className="relative z-0 w-full pb-5 group" key={input.key}>
                            <input
                                onChange={(e) => changeParam(input.key, input.onKeyDown ? parseInt(e.target.value) : e.target.value)}
                                type='string'
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer"
                                placeholder=" "
                                required
                                defaultValue={car[input.key]}
                                maxLength={input.maxLength}
                                max={input.max ? input.max : ''}
                                onKeyDown={(e) => input.onKeyDown ? checkNumberInput(e, input.step) : ''}
                            />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >{input.label}</label>
                        </div>
                    ))}
                    {editCarFormSelects.map((select) => (
                        <div className="pb-5 group z-0 w-full" key={select.key}>
                            <select
                                onChange={(e) => changeParam(select.key, parseInt(e.target.value))}
                                id="underline_select"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer"
                                defaultValue={car[select.key]}
                            >
                                {editOptions[select.key].map((item) => (
                                    <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="relative z-0 pb-5 w-full group">
                        <label htmlFor="hs-color-input" className="block text-sm font-medium mb-2 ml-1 text-gray-500 dark:text-gray-400">Color</label>
                        <input
                            type="color"
                            className="w-full p-1 h-10 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                            id="hs-color-input"
                            defaultValue={car['color']}
                            onChange={(e) => changeParam('color', e.target.value)}
                        />
                    </div>
                </form>
            </Modal>
        </>
    )
}