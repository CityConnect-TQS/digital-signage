import { Trip, TripStatus } from "@/types/trip";
import { Card, CardBody, Chip } from "@nextui-org/react";
import TripProp from "./TripProp";
import { DisplayType } from "@/types/config.ts";

interface TripCardProps {
  trip: Trip;
  type: DisplayType;
}

export default function TripCard({ trip, type }: Readonly<TripCardProps>) {
  const colors: Record<
    TripStatus,
    "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  > = {
    ONTIME: "primary",
    DELAYED: "danger",
    DEPARTED: "warning",
    ONBOARDING: "success",
  };

  return (
    <Card className="p-4">
      <CardBody className="flex flex-row gap-2 justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-4xl">
            {type === "departure" ? trip.arrival.name : trip.departure.name}
          </p>
          <p className="text-3xl">
            {(type === "departure"
              ? trip.departureTime
              : trip.arrivalTime
            ).toLocaleString("pt-PT", {
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>
        <div className={"flex flex-row gap-8"}>
          <TripProp icon="directions_bus" title={"Company"}>
            {trip.bus.company}
          </TripProp>
          <TripProp icon="timer" title={"Status"} isText={false}>
            <Chip color={colors[trip.status]} variant={"flat"}>
              {trip.status}
            </Chip>
          </TripProp>
          {type === "departure" && (
            <TripProp icon="airline_seat_recline_normal" title={"Seats left"}>
              {trip.freeSeats}
              <span className={"font-normal"}>/{trip.bus.capacity}</span>
            </TripProp>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
