import Navbar from "@/components/Navbar";
import TripGroup from "@/components/TripGroup";
import { arrivals, departures } from "@/dummy/trips";
import { Divider } from "@nextui-org/react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col p-8 h-dvh gap-8">
      <div className="flex-1 flex gap-8 flex-row">
        <TripGroup trips={departures} type="departure" />
        <Divider orientation="vertical" />
        <TripGroup trips={arrivals} type="arrival" />
      </div>
      <Navbar />
    </div>
  );
}
