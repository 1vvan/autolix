import { carsApi, useBuyCarMutation } from "@/app/services/carsApi";
import { selectPaymentMethods } from "@/app/store/reducers/TypesSlice";
import { selectCurrentUser } from "@/app/store/reducers/UserSlice";
import { buySchema } from "@/shared/schemas/buySchema";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const initBuyCarData = {
    user_id: 0,
    buying_price: 0,
    buying_car_id: 0,
    payment_method: 1,
    phone: '',
    email: '',
    address: ''
}

export const useBuyCar = () => {
    const [buyCar, { isLoading }] = useBuyCarMutation();
    const [buyCarData, setBuyCarData] = useState(initBuyCarData)
    const curUser = useSelector(selectCurrentUser)
    const [buyErrors, setBuyErrors] = useState({
        payment_method: '',
        phone: '',
        email: '',
        address: ''
    });
    let { carId } = useParams();
    const { data: curCar } =
    carsApi.useGetOneCarQuery(carId);

    const paymentMethods = useSelector(selectPaymentMethods)
    const paymentMethodsOptions = paymentMethods.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })

    const changeParam = (key, value) => {
        setBuyCarData(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }

    useEffect(() => {
        if (curUser && carId && curCar) {
            setBuyCarData(prevState => ({
                ...prevState,
                user_id: curUser.id,
                buying_car_id: carId ? parseInt(carId) : 0,
                buying_price: curCar ? parseFloat(typeof curCar.price === 'number' ? curCar.price.toString() : curCar.price) : 0
            }));
        }
    }, [curUser, carId, curCar]);

    const handleBuyValidation = async () => {
        try {
            await buySchema.validate(buyCarData, { abortEarly: false });
            setBuyErrors({
                payment_method: '',
                phone: '',
                email: '',
                address: ''
            });
            return true;
        } catch (error: any) {
            const validationErrors = {};
            error.inner.forEach((e) => {
                validationErrors[e.path] = e.message;
            });
            setBuyErrors(validationErrors as { payment_method: string; phone: string; email: string; address: string; });
            return false;
        }
    }

    const handleBuyCar = async (e) => {
        e.preventDefault();
        if (await handleBuyValidation()) {
            buyCar(buyCarData)
                .then(() => {
                    toast.success('Car bought successfully');
                })
                .catch((error) => {
                    console.error('Failed to buy car:', error);
                    toast.error('Failed to buy car. Please try again.');
                });
        }
    }

    return {
        models: {
            paymentMethodsOptions,
            buyErrors,
            isLoading
        },
        commands: {
            changeParam,
            handleBuyCar
        }
    }
}