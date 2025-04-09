import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import Events from "../Events/Events";
import styles from "./App.module.css";
import Home from "../../components/Home/Home";
import Notes from "../Notes/Notes";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
