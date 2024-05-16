import { Trip } from "@/types/trip";
import TripCard from "./TripCard";
import { Config } from "@/types/config.ts";
import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "@/services/config.ts";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function TripGroup() {
  const config = JSON.parse(localStorage.getItem("config")!) as Config;
  const [trips, setTrips] = useState<Trip[]>();

  useEffect(() => {
    const ws = new SockJS(`${BASE_API_URL}ws`);
    const client = Stomp.over(ws);

    client.connect(
      {},
      () => {
        client.subscribe(
          `/signage/cities/${config.city}/${config.type}`,
          (new_data) => {
            const parsedData = JSON.parse(new_data.body) as Trip[];
            setTrips(
              parsedData.map((trip) => {
                return {
                  ...trip,
                  departureTime: new Date(trip.departureTime),
                  arrivalTime: new Date(trip.arrivalTime),
                };
              }),
            );
          },
        );
      },
      (e) => {
        console.error("WebSocket connection failed", e);
      },
    );
  }, [config.city, config.type]);

  return (
    <div className="flex-1 flex flex-col gap-12">
      <p className="text-6xl font-extrabold text-center">
        {config.type === "departure" ? "Departures" : "Arrivals"}
      </p>
      {trips !== undefined ? (
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} type={config.type} />
          ))}
        </div>
      ) : (
        <div
          className={"flex flex-col gap-4 items-center flex-1 justify-center"}
        >
          <CircularProgress />
          <p>Waiting for trips to arrive...</p>
        </div>
      )}
    </div>
  );
}
