import * as yup from "yup";

export const updateBookSchema = yup.object().shape({
    model_id: yup
        .number()
        .required("Model is required")
        .typeError("Model is required")
        .min(1, "Model is required"),

    car_year: yup
        .number()
        .required("Year is required")
        .typeError("Year is required")
        .min(1970, "Year must be from 1970")
        .max(new Date().getFullYear(), "Year can't be in the future"),

    engine_capacity: yup
        .number()
        .required("Engine Capacity is required")
        .typeError("Engine Capacity is required")
        .min(0.5, "Min engine size is 0.5L")
        .max(8, "Max engine size is 8L"),

    fuel_id: yup
        .number()
        .required("Fuel Type is required")
        .typeError("Fuel Type is required")
        .min(1, "Fuel Type is required"),

    services: yup
        .array()
        .of(yup.number())
        .min(1, "Select at least one service"),

    comment: yup
        .string()
        .required("Comment is required")
        .max(1000, "Comment is too long"),
});
