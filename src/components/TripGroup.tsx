import { Trip } from "@/types/trip";
import TripCard from "./TripCard";
import { Config } from "@/types/config.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTrips } from "@/services/tripService.ts";
import { CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";
import { BASE_API_URL } from "@/services/config.ts";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function TripGroup() {
  const config = JSON.parse(localStorage.getItem("config")!) as Config;

  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<Trip[]>({
    queryKey: ["trips", config.city, config.type],
    queryFn: () =>
      getTrips(
        config.type === "departure"
          ? { departure: config.city }
          : { arrival: config.city },
      ).then((res) => res.slice(0, 6)),
    initialData: [],
  });

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
            queryClient.setQueryData(
              ["trips", config.city, config.type],
              () => {
                return parsedData.map((trip) => {
                  return {
                    ...trip,
                    departureTime: new Date(trip.departureTime),
                    arrivalTime: new Date(trip.arrivalTime),
                  };
                });
              },
            );
          },
        );
      },
      (e) => {
        console.error("WebSocket connection failed", e);
      },
    );
  }, [config.city, config.type, queryClient]);

  return (
    <div className="flex-1">
      <p className="text-6xl font-extrabold text-center mb-12">
        {config.type === "departure" ? "Departures" : "Arrivals"}
      </p>
      {!isPending ? (
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {data.map((trip) => (
            <TripCard key={trip.id} trip={trip} type={config.type} />
          ))}
        </div>
      ) : (
        <div className={"flex flex-row gap-4 items-center"}>
          <CircularProgress />
          <p>Fetching trips...</p>
        </div>
      )}
    </div>
  );
}
