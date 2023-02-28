import { v4 } from "uuid";
import { useState, useEffect } from "react";

import Ticket from "../Ticket/Ticket";
import Buttons from "../Buttons/Buttons";
import { useAppSelector } from "../../hooks/hooks";
import InfoMessage from "../InfoMessage/InfoMessage";
import { TicketsType } from "../../types";

import style from "./TicketList.module.scss";

const TicketList = () => {
  const [lengthList, setLengthList] = useState(5);
  const { sort, withoutTransfers, oneTransfer, twoTransfer, threeTransfer } = useAppSelector((state) => state.filter);
  const { tickets, stopSearch } = useAppSelector((state) => state.tickets);
  const [list, setList] = useState<Array<TicketsType>>([]);

  useEffect(() => {
    const none = tickets.filter((el) => withoutTransfers && el.segments[0].stops.length === 0);
    const one = tickets.filter((el) => oneTransfer && el.segments[0].stops.length === 1);
    const two = tickets.filter((el) => twoTransfer && el.segments[0].stops.length === 2);
    const three = tickets.filter((el) => threeTransfer && el.segments[0].stops.length === 3);

    if (sort) {
      setList(
        [...none, ...one, ...two, ...three].sort((a, b) => {
          return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration);
        })
      );
    } else {
      setList([...none, ...one, ...two, ...three].sort((a, b) => a.price - b.price));
    }
  }, [tickets, withoutTransfers, oneTransfer, twoTransfer, threeTransfer, sort]);

  const elements = list.map((el) => {
    return (
      <li key={v4()}>
        <Ticket {...el} />
      </li>
    );
  });

  return (
    <ul className={style.list}>
      <Buttons />
      {!elements.length && stopSearch && <InfoMessage />}
      {elements.slice(0, lengthList)}
      {elements.length > 0 && (
        <button
          className={style.btn}
          onClick={() => {
            window.scrollTo(0, window.pageYOffset - 125);
            setLengthList(lengthList + 5);
          }}
        >
          Показать еще 5 билетов
        </button>
      )}
    </ul>
  );
};

export default TicketList;
