import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changeSort } from "../../store/filterSlice";

import style from "./Buttons.module.scss";

const Buttons = () => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.filter);

  let btnCheapClass = [style.btn, style.default];
  let btnFastClass = [style.btn, style.active];

  if (sort) {
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
          dispatch(changeSort());
        }}
      >
        Самый дешевый
      </button>
      <button
        className={btnFastClass.join(" ")}
        onClick={() => {
          dispatch(changeSort());
        }}
      >
        Самый быстрый
      </button>
    </div>
  );
};

export default Buttons;
