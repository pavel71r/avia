import React from "react";
import { format, parseISO, add } from "date-fns";

import type { TicketsType } from "../../types";

import style from "./Ticket.module.scss";

const Ticket = (props: TicketsType) => {
  let count = 0;
  const price: Array<string> = [];

  props.price
    .toString()
    .split("")
    .forEach((el) => {
      if (count === 2 && props.price.toString().length === 5) {
        price.push(" ");
      }
      if (count === 3 && props.price.toString().length === 6) {
        price.push(" ");
      }
      price.push(el);
      if (count === props.price.toString().length - 1) {
        price.push(" ");
        price.push("P");
      }
      count++;
    });

  const straightFly = `${props.segments[0].origin} - ${props.segments[0].destination}`;
  const returnFly = `${props.segments[1].origin} - ${props.segments[1].destination}`;

  const straightDuration = `${Math.trunc(props.segments[0].duration / 60)}ч ${(
    (Math.floor(props.segments[0].duration / 5) * 5) %
    60
  )
    .toString()
    .padStart(2, "0")}м`;

  const returnDuration = `${Math.trunc(props.segments[1].duration / 60)}ч ${(
    (Math.floor(props.segments[1].duration / 5) * 5) %
    60
  )
    .toString()
    .padStart(2, "0")}м`;

  const straightDate = format(parseISO(props.segments[0].date), "P");
  const straightTimeUp = `${format(parseISO(props.segments[0].date), "HH")}:${(
    Math.floor(Number(format(parseISO(props.segments[0].date), "mm")) / 5) * 5
  )
    .toString()
    .padStart(2, "0")}`;

  const straightTimeDown = `${format(
    add(parseISO(props.segments[0].date), {
      minutes: props.segments[0].duration,
    }),
    "HH"
  )}:${(
    Math.floor(
      Number(
        format(
          add(parseISO(props.segments[0].date), {
            minutes: props.segments[0].duration,
          }),
          "mm"
        )
      ) / 5
    ) * 5
  )
    .toString()
    .padStart(2, "0")}`;

  const returnDate = format(parseISO(props.segments[1].date), "P");
  const returnTimeUp = `${format(parseISO(props.segments[1].date), "HH")}:${(
    Math.floor(Number(format(parseISO(props.segments[1].date), "mm")) / 5) * 5
  )
    .toString()
    .padStart(2, "0")}`;

  const returnTimeDown = `${format(
    add(parseISO(props.segments[1].date), {
      minutes: props.segments[1].duration,
    }),
    "HH"
  )}:${(
    Math.floor(
      Number(
        format(
          add(parseISO(props.segments[1].date), {
            minutes: props.segments[1].duration,
          }),
          "mm"
        )
      ) / 5
    ) * 5
  )
    .toString()
    .padStart(2, "0")}`;

  const straightEndingText = props.segments[0].stops.length === 1 ? "a" : "и";
  const straightStops = `${props.segments[0].stops.length} пересадк${straightEndingText}`;
  const straightStopsCity = props.segments[0].stops.join(", ");

  const returnEndingText = props.segments[1].stops.length === 1 ? "a" : "и";
  const returnStops = `${props.segments[1].stops.length} пересадк${returnEndingText}`;
  const returnStopsCity = props.segments[1].stops.join(", ");

  return (
    <div className={style.ticket}>
      <div className={style.col}>
        <span className={style.price}>{price.join("")}</span>
        <div className={style.row}>
          <span className={style.title}>{straightFly}</span>
          <span className={style.text}>{`${straightTimeUp} - ${straightTimeDown}`}</span>
          <span className={style.date}>{straightDate}</span>
        </div>
        <div className={style.row}>
          <span className={style.title}>{returnFly}</span>
          <span className={style.text}>{`${returnTimeUp} - ${returnTimeDown}`}</span>
          <span className={style.date}>{returnDate}</span>
        </div>
      </div>
      <div className={style.col}>
        <div className={style.row}>
          <span className={style.title}>В пути</span>
          <span className={style.text}>{straightDuration}</span>
        </div>
        <div className={style.row}>
          <span className={style.title}>В пути</span>
          <span className={style.text}>{returnDuration}</span>
        </div>
      </div>
      <div className={style.col}>
        <div className={style.logo}>
          <img alt="poster" src={`https://pics.avs.io/99/36/${props.carrier}.png`} />
        </div>
        <div className={style.row}>
          <span className={style.title}>{props.segments[0].stops.length > 0 && straightStops}</span>
          <span className={style.text}>{props.segments[0].stops.length > 0 && straightStopsCity}</span>
        </div>
        <div className={style.row}>
          <span className={style.title}>{props.segments[1].stops.length > 0 && returnStops}</span>
          <span className={style.text}>{props.segments[1].stops.length > 0 && returnStopsCity}</span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
