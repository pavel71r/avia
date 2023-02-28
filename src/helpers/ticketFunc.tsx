import { format, parseISO, add } from "date-fns";

export const durationMin = (value: number) => {
  return ((Math.floor(value / 5) * 5) % 60).toString().padStart(2, "0");
};

export const timeUpMin = (value: string) => {
  return (Math.floor(Number(format(parseISO(value), "mm")) / 5) * 5).toString().padStart(2, "0");
};

export const timeDownMin = (time: number, date: string) => {
  return (
    Math.floor(
      Number(
        format(
          add(parseISO(date), {
            minutes: time,
          }),
          "mm"
        )
      ) / 5
    ) * 5
  )
    .toString()
    .padStart(2, "0");
};
