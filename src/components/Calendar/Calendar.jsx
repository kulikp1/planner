import React, { useState } from "react";
import styles from "./Calendar.module.css";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  subMonths,
  addMonths,
  isToday,
} from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Получаем диапазон дней для текущего месяца
  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          ◀
        </button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          ▶
        </button>
      </div>

      <div className={styles.calendar}>
        {days.map((day) => (
          <div
            key={day}
            className={`${styles.day} ${isToday(day) ? styles.today : ""}`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
