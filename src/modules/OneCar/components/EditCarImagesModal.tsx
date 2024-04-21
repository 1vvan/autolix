import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { Modal } from "@/shared/UI/modal/modal";
import { DeleteConfirmModal } from "@/shared/modals/deleteConfirmModal";
import { useTheme } from "@/shared/theme-context/theme-context";
import React, { useState } from "react";

export const EditCarImagesModal = ({ title, car, handleDeleteCarImage, onChangeNewImages, handleUploadNewImages, isDisabledSaveCarImages }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { theme } = useTheme()

    const onSave = () => {
        setShowModal(false);
        handleUploadNewImages(car.id);
    }

    return (
        <>
            <button
                className='border border-violet-500 pt-1 px-2 rounded-lg bg-white dark:bg-dark-bg hover:border-violet-300 duration-300'
                onClick={() => setShowModal(!showModal)}
            >
                <Icon
                    icon={ICON_COLLECTION.image}
                    iconColor={theme === "dark" ? "#fff" : "#000"}
                />
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} title={title} onSave={onSave} bodyClassNames={'flex flex-col gap-2'} isDisabledSave={isDisabledSaveCarImages}>
                <div className="grid grid-cols-3 gap-3">
                    {car.images.map((item) => (
                        <div key={item.id} className="w-96 relative">
                            <div>
                                <button
                                    className="absolute top-2 right-2 p-0.5 rounded-lg bg-white dark:bg-dark-bg flex items-center justify-center"
                                    onClick={() => setShowDeleteModal(true)}>
                                    <Icon icon={ICON_COLLECTION.trash} iconSize="24px" iconColor="#ff0000" />
                                </button>
                                <DeleteConfirmModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} title="Delete Car" onSave={() => { handleDeleteCarImage(item.id); setShowDeleteModal(false) }}>
                                    <p className="text-gray-700 dark:text-gray-200">Are you sure want to delete car image?</p>
                                </DeleteConfirmModal>
                            </div>
                            <img src={item.path} alt="" className="rounded-lg" />
                        </div>
                    ))}
                </div>
                <div className="w-full flex gap-6 pt-8 pb-2 items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-xl font-medium text-nowrap">Add photos:</span>
                    <input 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                        id="multiple_files" type="file" multiple onChange={onChangeNewImages}/>
                </div>
            </Modal>
        </>
    )
}