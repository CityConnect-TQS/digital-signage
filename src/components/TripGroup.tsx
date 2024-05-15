import { Trip } from "@/types/trip";
import TripCard from "./TripCard";
import { Config } from "@/types/config.ts";
import { useQuery } from "@tanstack/react-query";
import { getTrips } from "@/services/tripService.ts";
import { CircularProgress } from "@nextui-org/react";

export default function TripGroup() {
  const config = JSON.parse(localStorage.getItem("config")!) as Config;

  const { data, isPending } = useQuery<Trip[]>({
    queryKey: ["trips", config.city],
    queryFn: () =>
      getTrips({ departure: config.city }).then((res) => res.slice(0, 6)),
    initialData: [],
  });

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
