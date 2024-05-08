import { Trip } from "@/types/trip";
import { Card, CardBody } from "@nextui-org/react";
import TripProp from "./TripProp";

interface TripCardProps {
  trip: Trip;
  type: "departure" | "arrival";
}

export default function TripCard({ trip, type }: TripCardProps) {
  return (
    <Card className="p-4">
      <CardBody className="gap-2">
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold text-3xl">
            {type === "departure" ? trip.arrival.name : trip.departure.name}
          </p>
          <p className="text-xl">
            {(type === "departure"
              ? trip.departureTime
              : trip.arrivalTime
            ).toLocaleString("pt-PT", {
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>
        <div>
          <TripProp icon="directions_bus">{trip.bus.company}</TripProp>
          <TripProp icon="schedule">
            {type === "departure" ? "Arrival" : "Departure"} at{" "}
            {(type === "departure"
              ? trip.arrivalTime
              : trip.departureTime
            ).toLocaleString("pt-PT", {
              hour: "numeric",
              minute: "numeric",
            })}
          </TripProp>
          <TripProp icon="airline_seat_recline_normal">
            {trip.freeSeats} seats left of {trip.bus.capacity}
          </TripProp>
        </div>
      </CardBody>
    </Card>
  );
}
