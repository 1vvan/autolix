import { useSelector } from "react-redux";
import { ROUTES } from "../constants/routes";
import { selectIsAdmin } from "@/app/store/reducers/UserSlice";

export const openEndpoints = [
    'fetchLogin', 
    'fetchRegister', 
    'getUser', 
    'getOneCar', 
    'getAvailableCars', 
    'getTypes', 
    'getCarsAllModels',
    'getAllBookingServices',
    'createBooking',
    'getBusyBookingSlots',
    'getClientAppointments',
    'updateBookingDateTime',
    'cancelBooking',
];

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem("token");
    return !!accessToken;
}

export const logout = () => {
    localStorage.setItem('theme', 'dark');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    localStorage.removeItem("userId");
    window.location.href = ROUTES.login.path;
};

export const useIsAdmin = () => {
    const isAdmin = useSelector(selectIsAdmin);
    return isAdmin
}

export const saveLoginData = (token, userId) => {
    const now = new Date();
    localStorage.setItem('token', token);
    localStorage.setItem('tokenTimestamp', now.getTime().toString());
    localStorage.setItem("userId", userId.toString());
}

export const isTokenExpired = () => {
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    if (!tokenTimestamp) {
        return true;
    }

    const now = new Date();
    const expiryTime = new Date(parseInt(tokenTimestamp, 10) + 86400000);

    return now > expiryTime;
}