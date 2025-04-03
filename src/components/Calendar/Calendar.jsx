import React, { useState } from "react";
import styles from "./Calendar.module.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
} from "date-fns";

const Calendar = () => {
  const [_selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  return (
    <div className={styles.calendar}>
      {daysInMonth.map((day) => (
        <div
          key={day.toString()}
          className={`${styles.day} ${isToday(day) ? styles.today : ""}`}
          onClick={() => setSelectedDate(day)}
        >
          {format(day, "d")}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
