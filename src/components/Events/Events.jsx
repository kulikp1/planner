import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { events } from "../../utils/events";
import styles from "./Events.module.css";
import Navbar from "../Navbar/Navbar";
import { parse, format } from "date-fns";
import { uk } from "date-fns/locale";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EVENTS_PER_PAGE = 3;

const UpcomingEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [addedEvents, setAddedEvents] = useState({});
  const navigate = useNavigate();

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const visibleEvents = events.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleAddToCalendar = (event) => {
    try {
      const parsedDate = parse(event.date, "d MMMM yyyy", new Date(), {
        locale: uk,
      });
      const key = format(parsedDate, "yyyy-MM-dd");

      const stored = JSON.parse(localStorage.getItem("plans")) || {};
      const dayPlans = stored[key] || [];

      if (!dayPlans.includes(event.title)) {
        const updatedPlans = {
          ...stored,
          [key]: [...dayPlans, event.title],
        };

        localStorage.setItem("plans", JSON.stringify(updatedPlans));
        toast.success(`"${event.title}" додано до календаря!`);
        setAddedEvents((prev) => ({ ...prev, [event.id]: true }));

        // Переходимо на сторінку календаря через 1.5 сек
        setTimeout(() => {
          navigate("/calendar");
        }, 1500);
      } else {
        toast.info("Ця подія вже є у календарі.");
        setAddedEvents((prev) => ({ ...prev, [event.id]: true }));
      }
    } catch (err) {
      toast.error("Помилка при додаванні події.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="bottom-center" autoClose={1500} />
      <Navbar />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Події у Чернігові</h1>

        <div className={styles.eventsList}>
          {visibleEvents.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <h2 className={styles.eventTitle}>{event.title}</h2>
              <p className={styles.eventDate}>{event.date}</p>
              <p className={styles.eventLocation}>{event.location}</p>
              <button
                onClick={() => handleAddToCalendar(event)}
                className={styles.addButton}
                disabled={!!addedEvents[event.id]}
              >
                {addedEvents[event.id] ? "✅ Додано" : "➕ Додати в календар"}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Назад
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Вперед
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
