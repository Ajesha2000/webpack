import { useState } from "react";
import styles from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import donut from "@/assets/пончик.png";
import Logo from "@/assets/logo.svg";

export function App() {
  const [state, setState] = useState(0);

  return (
    <div data-testid='papa'>
      Hello <br />
      <img width={100} src={donut} alt="" />
      <Logo color='green' width={200} height={200} />
      <span className={styles.value}>{state}</span>
      <button
        className={styles.button}
        onClick={() => setState((prev) => ++prev)}
      >
        asdasd
      </button>
      <Link to={"/about"}>about</Link>
      <Link to={"/store"}>atore</Link>
      <Outlet />
    </div>
  );
}
