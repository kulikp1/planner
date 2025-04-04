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
import PlanModal from "../PlanModal/PlanModal";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });

  const firstDayOffset = getDay(firstDay);

  return (
    <div className={styles.container}>
      {/* Модалка */}
      <PlanModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
      />

      {/* Основний календар */}
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

        {/* Назви днів тижня */}
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

        {/* Сітка днів місяця */}
        <div className={styles.calendar}>
          {/* Порожні клітинки перед першим днем */}
          {Array(firstDayOffset)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} className={styles.emptyDay}></div>
            ))}

          {/* Дні місяця */}
          {days.map((day) => (
            <div
              key={day}
              className={`${styles.day} ${isToday(day) ? styles.today : ""}`}
              onClick={() => {
                setSelectedDate(day);
                setModalOpen(true);
              }}
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
