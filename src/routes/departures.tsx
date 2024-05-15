import { createFileRoute, Navigate } from "@tanstack/react-router";
import TripGroup from "@/components/TripGroup.tsx";
import Navbar from "@/components/Navbar.tsx";

export const Route = createFileRoute("/departures")({
  component: Departures,
  errorComponent: () => <Navigate search={{}} to={"/"} />,
  beforeLoad: () => {
    if (localStorage.getItem("config") === null) {
      throw new Error("Config isn't set");
    }
  },
});

function Departures() {
  return (
    <div className="flex flex-col p-8 h-dvh gap-8">
      <TripGroup />
      <Navbar />
    </div>
  );
}
