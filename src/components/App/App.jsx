import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import Events from "../Events/Events";
import styles from "./App.module.css";
import Home from "../../components/Home/Home";

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Routes>
          {/* <Route path="/" element={<Calendar />} /> */}
          <Route path="/" element={<Home />} />

          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
