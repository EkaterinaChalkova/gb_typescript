export interface Place {
  id: number;
  name: string;
  description: string;
  image: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}

export interface searchCallback {
  (error?: string, places?: Place[]): void;
}

export interface SearchFormData {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  maxPrice: number;
}
