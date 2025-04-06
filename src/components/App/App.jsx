import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import Events from "../Events/Events";
import styles from "./App.module.css";

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
