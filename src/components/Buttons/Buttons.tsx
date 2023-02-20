import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { onCheap, onFast } from "../../store/ticketsSlice";

import style from "./Buttons.module.scss";

const Buttons = () => {
  const dispatch = useAppDispatch();
  const { sort, tickets, filter, stopSearch } = useAppSelector((state) => state.tickets);

  useEffect(() => {
    if (sort.cheap) {
      dispatch(onCheap());
    } else {
      dispatch(onFast());
    }
  }, [tickets, dispatch, sort, filter, stopSearch]);

  let btnCheapClass = [style.btn, style.default];
  let btnFastClass = [style.btn, style.active];

  if (sort.fast) {
    btnFastClass.push(style.active);
    btnCheapClass = [style.btn, style.default];
  } else {
    btnCheapClass.push(style.active);
    btnFastClass = [style.btn, style.default];
  }

  return (
    <div className={style.wrapper}>
      <button
        className={btnCheapClass.join(" ")}
        onClick={() => {
          dispatch(onCheap());
        }}
      >
        Самый дешевый
      </button>
      <button
        className={btnFastClass.join(" ")}
        onClick={() => {
          dispatch(onFast());
        }}
      >
        Самый быстрый
      </button>
    </div>
  );
};

export default Buttons;
