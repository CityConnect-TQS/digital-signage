import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Config } from "@/types/config.ts";
import { useQuery } from "@tanstack/react-query";
import { City } from "@/types/city.ts";
import { getCity } from "@/services/cityService.ts";

export default function Navbar() {
  const config = JSON.parse(localStorage.getItem("config")!) as Config;
  const [date, setDate] = useState(dayjs());

  const { data } = useQuery<City>({
    queryKey: ["city", config.city],
    queryFn: () => getCity(config.city),
  });

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
          <p className={"text-lg"}>{date.format("dddd, MMMM DD YYYY")}</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col items-end">
          <p className="text-lg">Hi! It&apos;s 10ºC here in</p>
          <p className="font-semibold text-2xl">{data?.name}</p>
        </div>
        <MaterialSymbol icon="sunny" size={48} />
      </div>
    </div>
  );
}
