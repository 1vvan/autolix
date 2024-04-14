import * as yup from "yup";

export const buySchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().min(10, "Address must be at least 10 characters"),
  payment_method: yup.number().required("Payment Method is required"),
  phone: yup.string()
    .test('phone-length', 'Phone number must be between 10 and 15 digits', val => {
      if (!val) return true; 
      const phoneLength = val.replace(/\D/g, '').length;
      return phoneLength >= 10 && phoneLength <= 15;
    })
    .test('phone-prefix', 'Phone number must start with a "+" or a digit', val => {
      if (!val) return true;
      return val.startsWith('+') || /^\d/.test(val);
    })
    .required("Phone number is required"),
});
