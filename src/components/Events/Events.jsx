import { events } from "../../utils/events";
import styles from "./Events.module.css";

const UpcomingEvents = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Події у Чернігові</h1>

      <div className={styles.eventsList}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <h2 className={styles.eventTitle}>{event.title}</h2>
            <p className={styles.eventDate}>{event.date}</p>
            <p className={styles.eventLocation}>{event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
