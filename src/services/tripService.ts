import { Trip, TripSearchParameters } from "@/types/trip";
import { BASE_API_URL } from "./config";

export const getTrips = async (
  params?: TripSearchParameters,
): Promise<Trip[]> => {
  const res = await fetch(
    BASE_API_URL +
      "trip?" +
      new URLSearchParams(params as Record<string, string>).toString(),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data: Trip[] = (await res.json()) as Trip[];
  data.forEach((trip: Trip) => {
    trip.departureTime = new Date(trip.departureTime);
    trip.arrivalTime = new Date(trip.arrivalTime);
  });

  return data;
};
