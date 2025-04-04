import React from "react";
import Calendar from "../Calendar/Calendar";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <Calendar />
    </div>
  );
};

export default App;
