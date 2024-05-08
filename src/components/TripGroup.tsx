import { Trip } from "@/types/trip";
import TripCard from "./TripCard";

interface TripGroupProps {
  trips: Trip[];
  type: "departure" | "arrival";
}

export default function TripGroup({ trips, type }: TripGroupProps) {
  return (
    <div className="flex-1">
      <p className="text-4xl font-bold text-center mb-8">
        {type === "departure" ? "Departures" : "Arrivals"}
      </p>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} type={type} />
        ))}
      </div>
    </div>
  );
}
