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
  getDay,
} from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });

  // Определяем сдвиг для первого дня месяца (начинаем с Воскресенья)
  const firstDayOffset = getDay(firstDay);

  return (
    <div className={styles.container}>
      {/* Блок выбранной даты */}
      {selectedDate && (
        <div className={styles.selectedDateBlock}>
          <h2>Выбранная дата</h2>
          <p>{format(selectedDate, "dd MMMM yyyy")}</p>
          <button onClick={() => setSelectedDate(null)}>Закрыть</button>
        </div>
      )}

      {/* Основной календарь */}
      <div className={styles.calendarContainer}>
        <div className={styles.header}>
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            ◀
          </button>
          <h2>{format(currentDate, "MMMM yyyy").toUpperCase()}</h2>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            ▶
          </button>
        </div>

        {/* Дни недели */}
        <div className={styles.weekDays}>
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        {/* Сетка дней */}
        <div className={styles.calendar}>
          {/* Пустые клетки перед первым днём месяца */}
          {Array(firstDayOffset)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} className={styles.emptyDay}></div>
            ))}

          {/* Дни месяца */}
          {days.map((day) => (
            <div
              key={day}
              className={`${styles.day} ${isToday(day) ? styles.today : ""}`}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
