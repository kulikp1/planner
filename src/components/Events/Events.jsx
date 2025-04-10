import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { events } from "../../utils/events";
import styles from "./Events.module.css";
import Navbar from "../Navbar/Navbar";
import { parse, format } from "date-fns";
import { uk } from "date-fns/locale";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeContext"; // імпорт контексту теми
import { IoAddOutline } from "react-icons/io5";

const EVENTS_PER_PAGE = 3;

const UpcomingEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [addedEvents, setAddedEvents] = useState({});
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // використовуємо тему

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

        setTimeout(() => {
          navigate("/calendar");
        }, 2000);
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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        toastClassName={styles.customToast}
      />

      <Navbar />
      <div className={styles.wrapper}>
        <h1 className={` ${isDarkMode ? styles.title : styles.light}`}>
          Події у Чернігові
        </h1>

        <div className={styles.eventsList}>
          {visibleEvents.map((event) => (
            <div
              key={event.id}
              className={` ${
                isDarkMode ? styles.eventCard : styles.eventCardLight
              }`}
            >
              <h2
                className={` ${
                  isDarkMode ? styles.eventTitle : styles.eventLightTitle
                }`}
              >
                {event.title}
              </h2>
              <p className={styles.eventDate}>{event.date}</p>
              <p className={styles.eventLocation}>{event.location}</p>
              <button
                onClick={() => handleAddToCalendar(event)}
                className={` ${
                  isDarkMode ? styles.iconButton : styles.LightIconButton
                }`}
                disabled={!!addedEvents[event.id]}
                title={
                  addedEvents[event.id] ? "Вже додано" : "Додати до календаря"
                }
              >
                {addedEvents[event.id] ? "✔" : <IoAddOutline />}
              </button>
            </div>
          ))}
        </div>

        <div
          className={` ${
            isDarkMode ? styles.pagination : styles.Lightpagination
          }`}
        >
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
