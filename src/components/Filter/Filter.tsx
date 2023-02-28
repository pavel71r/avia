import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Spinner from "../Spinner/Spinner";
import { changeAll, withoutTransfer, oneTransfer, twoTransfer, threeTransfer } from "../../store/filterSlice";

import style from "./Filter.module.scss";

const Filter = () => {
  const dispatch = useAppDispatch();
  const { stopSearch } = useAppSelector((state) => state.tickets);
  const { filter } = useAppSelector((state) => state);

  return (
    <div className={style.filter}>
      <div className={style.spinner}>{!stopSearch && <Spinner />}</div>
      <span className={style.title}>Количество пересадок</span>
      <label className={style.label}>
        <input
          className={style.checkbox}
          type="checkbox"
          checked={filter.isAll}
          onChange={() => {
            dispatch(changeAll());
          }}
        />
        <span className={style.text}>Все</span>
      </label>
      <label className={style.label}>
        <input
          className={style.checkbox}
          type="checkbox"
          checked={filter.withoutTransfers}
          onChange={() => {
            dispatch(withoutTransfer());
          }}
        />
        <span className={style.text}>Без пересадок</span>
      </label>
      <label className={style.label}>
        <input
          className={style.checkbox}
          type="checkbox"
          checked={filter.oneTransfer}
          onChange={() => {
            dispatch(oneTransfer());
          }}
        />
        <span className={style.text}>1 пересадка</span>
      </label>
      <label className={style.label}>
        <input
          className={style.checkbox}
          type="checkbox"
          checked={filter.twoTransfer}
          onChange={() => {
            dispatch(twoTransfer());
          }}
        />
        <span className={style.text}>2 пересадки</span>
      </label>
      <label className={style.label}>
        <input
          className={style.checkbox}
          type="checkbox"
          checked={filter.threeTransfer}
          onChange={() => {
            dispatch(threeTransfer());
          }}
        />
        <span className={style.text}>3 пересадки</span>
      </label>
    </div>
  );
};

export default Filter;
