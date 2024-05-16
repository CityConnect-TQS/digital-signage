import { City } from "@/types/city";
import { BASE_API_URL } from "./config";

export const getCities = async (): Promise<City[]> =>
  fetch(BASE_API_URL + "city", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json() as Promise<City[]>);

export const getCity = async (id: number): Promise<City> =>
  fetch(BASE_API_URL + "city/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json() as Promise<City>);
