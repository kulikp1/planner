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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });

  const firstDayOffset = getDay(firstDay);

  const openModal = (day) => {
    setSelectedDate(day);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className={styles.container}>
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

        <div className={styles.calendar}>
          {Array(firstDayOffset)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} className={styles.emptyDay}></div>
            ))}

          {days.map((day) => (
            <div
              key={day}
              className={`${styles.day} ${isToday(day) ? styles.today : ""}`}
              onClick={() => openModal(day)}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>

      <PlanModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;
