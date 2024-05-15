import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Select, SelectItem, Skeleton } from "@nextui-org/react";
import { getCities } from "@/services/cityService.ts";
import { City } from "@/types/city.ts";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Config } from "@/types/config.ts";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const config =
    localStorage.getItem("config") !== null
      ? (JSON.parse(localStorage.getItem("config")!) as Config)
      : null;

  const { data, isPending } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: getCities,
    initialData: [],
  });

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: config ?? {
      type: "",
      city: -1,
    },
    validatorAdapter: zodValidator,
    validators: {
      onSubmit: z.object({
        type: z.enum(["departure", "arrival"]),
        city: z.number().min(0),
      }),
    },
    onSubmit: async ({ value }) => {
      localStorage.setItem("config", JSON.stringify(value));
      await navigate({
        to: value.type === "departure" ? "/departures" : "/arrivals",
      });
    },
  });

  return (
    <div className="flex flex-col justify-center items-center p-8 min-h-dvh gap-8">
      <img src="/logo.svg" alt="CityConnect" className="h-16 w-16 rounded-lg" />
      <div className="flex flex-col gap-4 items-center">
        <p className={"font-bold text-3xl"}>Hi there!</p>
        <p>A few settings here and there, and it will be ready to show info.</p>
      </div>

      <form className={"w-72 flex flex-col gap-2 items-center"}>
        <Field
          name="type"
          validatorAdapter={zodValidator}
          validators={{
            onChange: z.enum(["departure", "arrival"]),
          }}
        >
          {({ state, handleChange, handleBlur }) => (
            <Select
              label="Select the display type"
              className="w-72"
              id={"type"}
              onBlur={handleBlur}
              onSelectionChange={([e]) => {
                handleChange(e.toString());
              }}
              defaultSelectedKeys={config ? [config.type] : []}
              isInvalid={state.meta.errors.length > 0}
              errorMessage={state.meta.errors}
            >
              <SelectItem key={"departure"} value={"departure"}>
                Departures
              </SelectItem>
              <SelectItem key={"arrival"} value={"arrival"}>
                Arrivals
              </SelectItem>
            </Select>
          )}
        </Field>
        <Field
          name="city"
          validatorAdapter={zodValidator}
          validators={{
            onChange: z.number().min(0),
          }}
        >
          {({ state, handleChange, handleBlur }) => (
            <Skeleton isLoaded={!isPending} className="rounded-lg">
              <Select
                label="City"
                id="city"
                className="w-72"
                defaultSelectedKeys={config ? [config.city.toString()] : []}
                isInvalid={state.meta.errors.length > 0}
                errorMessage={state.meta.errors}
                onBlur={handleBlur}
                onSelectionChange={([e]) => {
                  handleChange(parseInt(e as string));
                }}
              >
                {data
                  ? data.map((city: City) => (
                      <SelectItem
                        key={city.id}
                        value={city.name}
                        id={"city" + city.id}
                      >
                        {city.name}
                      </SelectItem>
                    ))
                  : []}
              </Select>
            </Skeleton>
          )}
        </Field>
        <Subscribe>
          {({ canSubmit }) => (
            <Button
              color={"primary"}
              isDisabled={!canSubmit}
              id={"submit"}
              onClick={handleSubmit}
            >
              Get started
            </Button>
          )}
        </Subscribe>
      </form>
    </div>
  );
}
