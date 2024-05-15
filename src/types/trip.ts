import { Bus } from "./bus";
import { City } from "./city";
import { CurrencyParams } from "@/types/currency.ts";

export interface Trip {
  id: number;
  bus: Bus;
  departure: City;
  departureTime: Date;
  arrival: City;
  arrivalTime: Date;
  price: number;
  freeSeats: number;
}

export type TripSearchParameters = CurrencyParams & {
  departure?: number;
  arrival?: number;
  departureTime?: string;
  seats?: number;
};
