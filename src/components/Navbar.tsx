import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";

export default function Navbar() {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setDate(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-4 items-center">
        <img
          src="/logo.svg"
          alt="CityConnect"
          className="h-14 w-14 rounded-lg"
        />
        <div>
          <p className="font-bold text-3xl">{date.format("HH:mm:ss")}</p>
          <p>{date.format("dddd, MMMM DD YYYY")}</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col items-end">
          <p className="text-sm">Hi! It&apos;s 10ºC here in</p>
          <p className="font-semibold text-xl">Malmö 🇸🇪</p>
        </div>
        <MaterialSymbol icon="sunny" size={48} />
      </div>
    </div>
  );
}
