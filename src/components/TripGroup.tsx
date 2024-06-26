import { Trip } from "@/types/trip";
import TripCard from "./TripCard";
import { Config } from "@/types/config.ts";
import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { WS_API_URL } from "@/services/config.ts";

export default function TripGroup() {
  const config = JSON.parse(localStorage.getItem("config")!) as Config;
  const [trips, setTrips] = useState<Trip[]>();

  useEffect(() => {
    const ws = new WebSocket(WS_API_URL);

    ws.onopen = () => {
      console.log("WebSocket open");
      ws.send(
        "CONNECT\n" +
          "accept-version:1.2,1.1,1.0\n" +
          "heart-beat:10000,10000\n" +
          "\n\0",
      );
      ws.send(
        "SUBSCRIBE\n" +
          "id:sub-0\n" +
          `destination:/signage/cities/${config.city}/${config.type}\n` +
          "\n\0",
      );
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      if (event.data.startsWith("CONNECTED")) {
        return;
      }

      const data = JSON.parse(
        event.data.split("\n").pop()!.slice(0, -1),
      ) as Trip[];

      const content: Trip[] = data.map((trip) => {
        return {
          ...trip,
          departureTime: new Date(trip.departureTime),
          arrivalTime: new Date(trip.arrivalTime),
        };
      });

      setTrips(content);
    };

    ws.onclose = () => console.log("WebSocket closed");
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
          <div className={"flex flex-col justify-center items-center"}>
            <p>Waiting for trips to arrive...</p>
            <p className={"text-default-400"}>
              This can take up to 10 seconds.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
