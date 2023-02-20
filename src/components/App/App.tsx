import React, { useEffect } from "react";

import Filter from "../Filter/Filter";
import TicketList from "../TicketList/TicketList";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getUserId, getTickets } from "../../store/ticketsSlice";

import style from "./App.module.scss";

const App = () => {
  const dispatch = useAppDispatch();
  const { searchId, reloadSearch, stopSearch, tickets } = useAppSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(getUserId());
  }, [dispatch]);

  useEffect(() => {
    if (!stopSearch) {
      dispatch(getTickets(searchId));
    }
  }, [reloadSearch, stopSearch, dispatch, searchId, tickets]);

  return (
    <div className={style.app}>
      <div className={style.logo}></div>
      <div className={style.container}>
        <Filter />
        <TicketList />
      </div>
    </div>
  );
};

export default App;
