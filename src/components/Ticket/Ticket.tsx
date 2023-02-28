import { format, parseISO, add } from "date-fns";

import type { TicketsType } from "../../types";
import { durationMin, timeUpMin, timeDownMin } from "../../helpers/ticketFunc";

import style from "./Ticket.module.scss";

const Ticket = ({ carrier, price, segments }: TicketsType) => {
  function numberWithSpaces(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const straightTimeUp = `${format(parseISO(segments[0].date), "HH")}:${timeUpMin(segments[0].date)}`;

  const straightTimeDown = `${format(
    add(parseISO(segments[0].date), {
      minutes: segments[0].duration,
    }),
    "HH"
  )}:${timeDownMin(segments[0].duration, segments[0].date)}`;

  const returnTimeUp = `${format(parseISO(segments[1].date), "HH")}:${timeUpMin(segments[1].date)}`;

  const returnTimeDown = `${format(
    add(parseISO(segments[1].date), {
      minutes: segments[1].duration,
    }),
    "HH"
  )}:${timeDownMin(segments[1].duration, segments[1].date)}`;

  const straightEndingText = segments[0].stops.length === 1 ? "a" : "и";
  const straightStops = `${segments[0].stops.length} пересадк${straightEndingText}`;

  const returnEndingText = segments[1].stops.length === 1 ? "a" : "и";
  const returnStops = `${segments[1].stops.length} пересадк${returnEndingText}`;

  return (
    <div className={style.ticket}>
      <div className={style.col}>
        <span className={style.price}>{`${numberWithSpaces(price)} P`}</span>
        <div className={style.row}>
          <span className={style.title}>{`${segments[0].origin} - ${segments[0].destination}`}</span>
          <span className={style.text}>{`${straightTimeUp} - ${straightTimeDown}`}</span>
          <span className={style.date}>{format(parseISO(segments[0].date), "P")}</span>
        </div>
        <div className={style.row}>
          <span className={style.title}>{`${segments[1].origin} - ${segments[1].destination}`}</span>
          <span className={style.text}>{`${returnTimeUp} - ${returnTimeDown}`}</span>
          <span className={style.date}>{format(parseISO(segments[1].date), "P")}</span>
        </div>
      </div>
      <div className={style.col}>
        <div className={style.row}>
          <span className={style.title}>В пути</span>
          <span className={style.text}>{`${Math.trunc(segments[0].duration / 60)}ч ${durationMin(
            segments[0].duration
          )}м`}</span>
        </div>
        <div className={style.row}>
          <span className={style.title}>В пути</span>
          <span className={style.text}>{`${Math.trunc(segments[1].duration / 60)}ч ${durationMin(
            segments[1].duration
          )}м`}</span>
        </div>
      </div>
      <div className={style.col}>
        <div className={style.logo}>
          <img alt="poster" src={`https://pics.avs.io/99/36/${carrier}.png`} />
        </div>
        <div className={style.row}>
          <span className={style.title}>{segments[0].stops.length > 0 && straightStops}</span>
          <span className={style.text}>{segments[0].stops.length > 0 && segments[0].stops.join(", ")}</span>
        </div>
        <div className={style.row}>
          <span className={style.title}>{segments[1].stops.length > 0 && returnStops}</span>
          <span className={style.text}>{segments[1].stops.length > 0 && segments[1].stops.join(", ")}</span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
