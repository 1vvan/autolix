import { modelsApi } from "@/app/services/modelsApi";
import { selectAllCarsModels } from "@/app/store/reducers/CarsSlice";
import { mapOptions } from "@/shared/helpers/mapDropdownOptions";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useEditModels = () => {
    const allModels = useSelector(selectAllCarsModels)

    const [showAddBrandModal, setShowAddBrandModal] = useState(false)
    const [addBrandName, setAddBrandName] = useState('')
    const [addBrand] = modelsApi.useAddBrandMutation();
    const [deleteBrand] = modelsApi.useDeleteBrandMutation();

    const [showAddModelModal, setShowAddModelModal] = useState(false)
    const [addModelName, setAddModelName] = useState('')
    const [addModelSelectedBrand, setAddModelSelectedBrand] = useState()
    const [addModel] = modelsApi.useAddModelMutation();
    const [deleteModel] = modelsApi.useDeleteModelMutation();

    const enrichModelsWithBrandName = () => {
        const modelsWithBrandName = allModels.models.map(model => {
            const brand = allModels.brands.find(brand => brand.id === model.brand_id);
            return { ...model, brand_name: brand ? brand.name : '-' };
        });

        return modelsWithBrandName.sort((a, b) => a.brand_id - b.brand_id);
    };

    // Models
    const brandsOptions = mapOptions(allModels.brands);
    const handleChangeBrandForModel = (e) => {
        setAddModelSelectedBrand(e.target.value)
    }
    const handleChangeModelName = (e) => {
        setAddModelName(e.target.value)
    }
    const handleAddModel = async () => {
        try {
            if(addModelName && addModelSelectedBrand){
                await addModel({brand_id: addModelSelectedBrand, name: addModelName}).then(() => {
                    toast.success(`Model ${addModelName} was added successfully`);
                    setShowAddModelModal(false)
                });
            }
        } catch (error) {
            console.error('Failed to add brand:', error);
            toast.error('Failed to add brand. Please try again.');
        }
    };

    const handleDeleteModel = (modelId, modelName) => {
        deleteModel(modelId)
            .then(() => {
                toast.success(`Model ${modelName} was deleted successfully!`)
            })
    }

    // Brands
    const handleChangeBrandName = (e) => {
        setAddBrandName(e.target.value)
    }

    const handleAddBrand = async () => {
        try {
            await addBrand(addBrandName).then(() => {
                toast.success(`Brand ${addBrandName} was added successfully`);
                setShowAddBrandModal(false)
            });
        } catch (error) {
            console.error('Failed to add brand:', error);
            toast.error('Failed to add brand. Please try again.');
        }
    };

    const handleDeleteBrand = (brandId, brandName) => {
        deleteBrand(brandId)
            .then(() => {
                toast.success(`Brand ${brandName} and his models was deleted successfully!`)
            })
    }

    return {
        models: {
            brands: allModels.brands,
            models: enrichModelsWithBrandName(),
            showAddBrandModal,
            isAddBrandDisabled: !addBrandName || addBrandName.length < 3,
            showAddModelModal,
            brandsOptions,
            isAddModelDisabled: !addModelName || addModelName.length < 3 || !addModelSelectedBrand
        },
        commands: {
            handleAddBrand,
            setShowAddBrandModal,
            handleChangeBrandName,
            setShowAddModelModal,
            handleChangeBrandForModel,
            handleChangeModelName,
            handleAddModel,
            handleDeleteBrand,
            handleDeleteModel
        },
    };
}