import React from "react";
import { v4 } from "uuid";

import Ticket from "../Ticket/Ticket";
import Buttons from "../Buttons/Buttons";
import { useAppSelector } from "../../hooks/hooks";
import InfoMessage from "../InfoMessage/InfoMessage";
import type { TicketsType } from "../../types";

import style from "./TicketList.module.scss";

const TicketList = () => {
  const stopSearch = useAppSelector((state) => state.tickets.stopSearch);
  const tickets: Array<TicketsType> = useAppSelector((state) => state.tickets.filterTickets.slice(0, 5));

  const newTickets = tickets.map((el) => {
    return (
      <li key={v4()}>
        <Ticket {...el} />
      </li>
    );
  });

  return (
    <ul className={style.list}>
      <Buttons />
      {!newTickets.length && stopSearch && <InfoMessage />}
      {newTickets}
    </ul>
  );
};

export default TicketList;
