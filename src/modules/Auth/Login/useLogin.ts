import { useFetchLoginMutation } from "@/app/services/userApi";
import { setUser } from "@/app/store/reducers/UserSlice";
import { ROUTES } from "@/shared/constants/routes";
import { saveLoginData } from "@/shared/helpers/authHelpers";
import { loginSchema } from "@/shared/schemas/loginSchema";
import { LoginDTO, LoginResponce } from "@/shared/types/api-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initLoginData = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginDTO>({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<LoginDTO>({
    email: "",
    password: "",
  });
  const [login, { isLoading, error }] = useFetchLoginMutation();

  const handleChangeLoginData = (key, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleLoginValidation = async () => {
    try {
      await loginSchema.validate(loginData, { abortEarly: false });
      setLoginErrors({ email: "", password: "" });
      return true;
    } catch (error: any) {
      const validationErrors: Partial<LoginDTO> = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setLoginErrors(validationErrors as LoginDTO);
      return false;
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (await handleLoginValidation()) {
      login(loginData).then((response) => {
        const responseData = response as { data: LoginResponce };
        if (responseData.data && !error) {
          dispatch(setUser(responseData.data.user));
          saveLoginData(responseData.data.token, responseData.data.user.id)
          navigate(ROUTES.cars.path);
          setLoginData(initLoginData);
          setLoginErrors(initLoginData);
        }
      });
    }
  };

  return {
    models: {
      loginData,
      loginErrors,
      isLoading,
    },
    commands: {
      handleChangeLoginData,
      handleSubmitLogin,
    },
  };
};
