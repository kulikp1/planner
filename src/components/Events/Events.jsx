import { useState } from "react";
import { events } from "../../utils/events";
import styles from "./Events.module.css";
import Navbar from "../Navbar/Navbar";

const EVENTS_PER_PAGE = 3;

const UpcomingEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const visibleEvents = events.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Події у Чернігові</h1>

        <div className={styles.eventsList}>
          {visibleEvents.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <h2 className={styles.eventTitle}>{event.title}</h2>
              <p className={styles.eventDate}>{event.date}</p>
              <p className={styles.eventLocation}>{event.location}</p>
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
