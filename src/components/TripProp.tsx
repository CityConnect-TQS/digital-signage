import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";
import { ReactNode } from "react";

interface TripPropProps {
  children: ReactNode;
  icon: MaterialSymbolProps["icon"];
  title: string;
  isText?: boolean;
}

export default function TripProp({
  children,
  icon,
  title,
  isText = true,
}: Readonly<TripPropProps>) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className={"flex flex-row gap-1 items-center"}>
        <MaterialSymbol icon={icon} size={20} className="text-default-500" />
        <p className="text-default-500">{title}</p>
      </div>
      <div className="flex items-center h-8">
        {isText ? (
          <p className="text-2xl font-semibold">{children}</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
