import { IUser } from "./IUser";

export interface ICar {
    id: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    engine_type_id: number;
    engine_capacity: number | string;
    fuel_id: number;
    gearbox_type_id: number;
    drive_unit_id: number;
    vin: string;
    price: number | string;
    status_id: number;
    status_name?: string;
    created_at: string;
    images: string[];
    horse_power: number | string;
    status_changed_at: string;
}

export interface IBrands {
  id: number;
  name: string;
}

export interface IModels {
  id: number;
  name: string;
  brand_id: number;
}

export interface IAllCarsModels {
  models: IModels[];
  brands: IBrands[];
}

export interface IGetAllCarsRequest {
  brand_id?: number| null;
  model_id?: number | null;
  status_id?: number | null;
  year_min?: number | null;
  year_max?: number | null;
  gearbox_type_id?: number | null;
  engine_type_id?: number | null;
  fuel_id?: number | null;
  drive_unit_id?: number | null;
}

export interface IBuyCarRequest {
  user_id: number;
  buying_price: string | number;
  buying_car_id: number;
  payment_method: number;
  phone: string | null;
  email: string;
  address: string;
}

export interface IClient {
  id: number;
  full_name: string;
  buying_price: string | number;
  car: ICar;
  phone: string;
  email: string;
  address: string;
  created_at: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponce {
  token: string;
  user: IUser;
}

export interface RegisterDTO {
  email: string;
  password: string;
  full_name: string;
}

export interface RegisterResponce {
  email: string;
  password: string;
  full_name: string;
}

export interface IAccountSettings {
  nickname: string;
}

export interface RequestUpdateUserData {
  userId: number;
  data: IAccountSettings;
}

interface Timestamped {
  created_at: string;
}

interface FuelType extends Timestamped {
  id: number;
  name: string;
}

interface EngineType extends Timestamped {
  id: number;
  name: string;
}

interface StatusType extends Timestamped {
  id: number;
  name: string;
}

interface GearboxType extends Timestamped {
  id: number;
  name: string;
}

interface DriveUnitType extends Timestamped {
  id: number;
  name: string;
}

interface PaymentMethod extends Timestamped {
  id: number;
  name: string;
}

export interface AllTypes {
  fuelTypes: FuelType[];
  engineTypes: EngineType[];
  statusTypes: StatusType[];
  gearboxTypes: GearboxType[];
  driveUnitTypes: DriveUnitType[];
  paymentMethods: PaymentMethod[];
}

export interface ISale {
  id: number;
  client_full_name: string;
  car_details: ICar;
  sale_date: string;
  sale_price: number | string;
  payment_method: string;
}

export interface IGetSalesRequest {
  sale_date_start?: string | null;
  sale_date_end?: string | null;
  sale_price_min?: number | string | null;
  sale_price_max?: number | string | null;
  payment_method_id?: number | null;
}
