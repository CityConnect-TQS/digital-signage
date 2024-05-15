import { createLazyFileRoute } from "@tanstack/react-router";
import TripGroup from "@/components/TripGroup.tsx";
import { departures } from "@/dummy/trips.ts";
import Navbar from "@/components/Navbar.tsx";

export const Route = createLazyFileRoute("/arrivals")({
  component: Arrivals,
});

function Arrivals() {
  return (
    <div className="flex flex-col p-8 h-dvh gap-8">
      <div className="flex-1">
        <TripGroup trips={departures} type="arrival" />
      </div>
      <Navbar />
    </div>
  );
}
