import * as yup from "yup";

export const addSchema = yup.object().shape({
  year: yup.number().required("Year is required").min(1970).max(new Date().getFullYear()),
  color: yup.string().required("Color is required").min(4),
  engine_type_id: yup.number().required("Engine Type is required").min(1),
  engine_capacity: yup.number().required("Engine Capacity is required").min(1).max(7),
  fuel_id: yup.number().required("Fule Type is required").min(1),
  gearbox_type_id: yup.number().required("Gearbox Type is required").min(1),
  drive_unit_id: yup.number().required("Drive Unit is required").min(1),
  vin: yup.string().required("VIN is required").min(17).max(17),
  price: yup.number().required("Price is required").max(1000000).min(1000),
  horse_power: yup.number().required("Horse Power is required").min(100).max(1000),
  brand_id: yup.number().required("Model is required").min(1),
  model_id: yup.number().required("Model is required").min(1),
  files: yup.array()
});
