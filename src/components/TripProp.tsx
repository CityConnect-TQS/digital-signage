import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";

interface TripPropProps {
  children: React.ReactNode;
  icon: MaterialSymbolProps["icon"];
}

export default function TripProp({ children, icon }: TripPropProps) {
  return (
    <div className="flex flex-row gap-1 items-center">
      <MaterialSymbol icon={icon} size={20} className="text-default-500" />
      <p className="text-default-500">{children}</p>
    </div>
  );
}
