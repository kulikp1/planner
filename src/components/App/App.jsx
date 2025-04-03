import React from "react";
import Calendar from "../Calendar/Calendar";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Планировщик задач</h1>
      <Calendar />
    </div>
  );
};

export default App;
