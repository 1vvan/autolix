import { useState } from "react";
import { regSchema } from "../../../shared/schemas/regSchema";
import { useFetchRegisterMutation } from "@/app/services/userApi";
import { LoginResponce, RegisterDTO } from "@/shared/types/api-types";
import { setUser } from "@/app/store/reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTES } from "@/shared/constants/routes";
import { saveLoginData } from "@/shared/helpers/authHelpers";

const initRegData = {
  email: "",
  password: "",
  full_name: "",
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterDTO>({
    email: "",
    password: "",
    full_name: "",
  });

  const [regErrors, setRegErrors] = useState<RegisterDTO>({
    email: "",
    password: "",
    full_name: "",
  });
  const [register, { isLoading, error }] = useFetchRegisterMutation();

  const handleChangeRegData = (key, value) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleRegValidation = async () => {
    try {
      await regSchema.validate(registerData, { abortEarly: false });
      setRegErrors({
        email: "",
        password: "",
        full_name: "",
      });
      return true;
    } catch (error: any) {
      const validationErrors: Partial<RegisterDTO> = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setRegErrors(validationErrors as RegisterDTO);
      return false;
    }
  };

  const handleSubmitReg = async (e) => {
    e.preventDefault();
    if (await handleRegValidation()) {
      register(registerData).then((res) => {
        const response = res as { data: LoginResponce };
        if (response.data && !error) {
          dispatch(setUser(response.data.user));
          saveLoginData(response.data.token, response.data.user.id)
          setRegisterData(initRegData);
          setRegErrors(initRegData);
          navigate(ROUTES.cars.path);
        }
      });
    }
  };
  return {
    models: {
      registerData,
      regErrors,
      isLoading,
    },
    commands: {
      handleSubmitReg,
      handleChangeRegData,
    },
  };
};
