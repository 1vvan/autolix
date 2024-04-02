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
    created_at: string;
    image_path: string;
    horse_power: number | string;
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
  name: string;
  nickname: string;
  lang: string;
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
