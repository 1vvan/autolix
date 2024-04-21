import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { DeleteConfirmModal } from "@/shared/modals/deleteConfirmModal";
import { EditBrandsModal } from "@/shared/modals/editBrandsModal";
import { IBrands } from "@/shared/types/api-types";
import React, { useState } from "react";

interface AddCarBrandProps {
    brands: IBrands[];
    handleAddBrand: () => void;
    showModal: boolean;
    setShowModal: (boolean) => void;
    onChange: (e: any) => void;
    isDisabled: boolean;
    handleDeleteBrand: (brandId: number, brandName: string) => void;
}

export const AddCarBrand: React.FC<AddCarBrandProps> = ({ brands, handleAddBrand, showModal, setShowModal, onChange, isDisabled, handleDeleteBrand }) => {
    const [showDeleteModal, setShowDeleteModal] = useState({});

    const handleShowDeleteModal = (id) => {
        setShowDeleteModal(prev => ({
            ...prev,
            [id]: true
        }));
    };

    const handleCloseDeleteModal = (id) => {
        setShowDeleteModal(prev => ({
            ...prev,
            [id]: false
        }));
    };

    return (
        <div className="w-96 pt-6 border p-4 rounded-lg border-gray-400 dark:border-gray-700 h-full">
            <h6 className="text-gray-600 dark:text-gray-200 text-lg font-medium pb-6 text-center">Cars Brands</h6>
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
                <thead>
                    <tr className="bg-gray-400 dark:bg-gray-200">
                        <th className="px-4 py-2" style={{ width: '3%' }}>ID</th>
                        <th className="px-4 py-2 w-2/12">Name</th>
                        <th className="px-4 py-2" style={{ width: '1%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((item) => (
                        <tr key={item.id} className="border-b border-gray-300 text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-transparent">
                            <td className="px-4 py-2 text-center">{item.id}</td>
                            <td className="px-4 py-2 text-center">{item.name}</td>
                            <td className="px-4 py-2 text-center">
                                <button
                                    className="p-0.5 rounded-lg bg-white dark:bg-dark-bg flex items-center justify-center"
                                    onClick={() => handleShowDeleteModal(item.id)}>
                                    <Icon icon={ICON_COLLECTION.trash} iconSize="24px" iconColor="#ff0000" />
                                </button>
                                <DeleteConfirmModal showModal={showDeleteModal[item.id]} setShowModal={() => handleCloseDeleteModal(item.id)} title={`Delete brand '${item.name}'`} onSave={() => {handleDeleteBrand(item.id, item.name); handleCloseDeleteModal(item.id) }}>
                                    <p className="text-gray-700 dark:text-gray-200">Are you sure want to delete this brand?</p>
                                </DeleteConfirmModal>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => setShowModal(true)}
                type="button"
                className="mt-6 w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            >Add Brand</button>
            <EditBrandsModal showModal={showModal} setShowModal={setShowModal} title="Add Brand" onSave={() => handleAddBrand()} isDisabled={isDisabled}>
                <div className="relative z-0 w-full pb-5 group">
                    <input
                        onChange={onChange}
                        type='string'
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-500 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-500 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Brand Name</label>
                </div>
            </EditBrandsModal>
        </div>
    )
}