import { Trip } from "@/types/trip";
import { Card, CardBody, Chip } from "@nextui-org/react";
import TripProp from "./TripProp";
import { DisplayType } from "@/types/config.ts";
import { colors, names } from "@/utils/status.ts";
import { cn } from "@/utils/cn.ts";

interface TripCardProps {
  trip: Trip;
  type: DisplayType;
}

export default function TripCard({ trip, type }: Readonly<TripCardProps>) {
  const delayTimeComputed = new Date(
    (type === "departure" ? trip.departureTime : trip.arrivalTime).getTime() +
      trip.delay * 60000,
  );
  return (
    <Card className="p-4">
      <CardBody className="flex flex-row gap-2 justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-4xl">
            {type === "departure" ? trip.arrival.name : trip.departure.name}
          </p>
          <div className={"flex flex-row items-center gap-2"}>
            {trip.status === "DELAYED" && (
              <p className="text-3xl">
                {delayTimeComputed.toLocaleString("pt-PT", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            )}
            <p
              className={cn(
                "text-3xl",
                trip.delay > 0 &&
                  "text-default-400 font-extralight line-through",
              )}
            >
              {(type === "departure"
                ? trip.departureTime
                : trip.arrivalTime
              ).toLocaleString("pt-PT", {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className={"flex flex-row gap-8"}>
          <TripProp icon="directions_bus" title={"Company"}>
            {trip.bus.company}
          </TripProp>
          <TripProp icon="timer" title={"Status"} isText={false}>
            <Chip color={colors[trip.status]} variant={"flat"}>
              {names[trip.status]}
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
