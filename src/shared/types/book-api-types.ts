export interface IBookingService {
  id: number;
  name: string;
}

export interface IBookBusySlot {
    booking_date: string;
    booking_time: string;
}

export interface IBookingComment {
  id: number;
  booking_id: number;
  comment: string;
  comment_type: 'client' | 'manager';
  created_at: string;
  updated_at: string;
}

export interface IBooking {
  id: number;
  phone: string;
  model_id: number;
  car_year: number;
  engine_capacity: number;
  fuel_id: number;
  comment: string | null;
  booking_date: string;
  booking_time: string;
  status_id: number;
  status_changed_at: string | null;
  created_at: string;
  brand_name: string;
  model_name: string;
  fuel_type: string;
  status_name: string;
  services: IBookingService[];
  comments: IBookingComment[];
}