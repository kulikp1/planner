import React, { useState, useEffect } from "react";
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
  const [plans, setPlans] = useState({});

  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });
  const firstDayOffset = getDay(firstDay);

  const dateKey = (date) => format(date, "yyyy-MM-dd");

  // Завантажити плани з localStorage при старті
  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem("plans")) || {};
    console.log("Завантажені плани з localStorage:", storedPlans);

    setPlans(storedPlans);
  }, []);

  // Зберігати плани в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  }, [plans]);

  // Додати новий план
  const addPlan = (key, newPlan) => {
    setPlans((prev) => {
      const updated = {
        ...prev,
        [key]: [...(prev[key] || []), newPlan],
      };
      return updated;
    });
  };

  // Оновити всі плани (редагування/видалення)
  const updatePlans = (updated) => {
    setPlans(updated);
  };

  return (
    <div className={styles.container}>
      <PlanModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
        addPlan={addPlan}
        updatePlans={updatePlans}
      />

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

          {days.map((day) => {
            const key = dateKey(day);
            const dayPlans = plans[key] || [];
            const displayedPlans = dayPlans.slice(0, 2);
            const remaining = dayPlans.length - displayedPlans.length;

            return (
              <div
                key={key}
                className={`${styles.day} ${isToday(day) ? styles.today : ""}`}
                onClick={() => {
                  setSelectedDate(day);
                  setModalOpen(true);
                }}
              >
                <div className={styles.dayNumber}>{format(day, "d")}</div>
                <div className={styles.planList}>
                  {displayedPlans.map((plan, idx) => (
                    <div
                      key={idx}
                      className={styles.planItem}
                      style={{
                        backgroundColor: `hsl(${(idx * 90) % 360}, 70%, 40%)`,
                      }}
                    >
                      {plan}
                    </div>
                  ))}
                  {remaining > 0 && (
                    <div className={styles.morePlans}>+{remaining} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
