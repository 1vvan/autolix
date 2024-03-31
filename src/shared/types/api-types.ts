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