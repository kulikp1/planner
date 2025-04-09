import { useState, useEffect } from "react";
import styles from "./Notes.module.css";
import clsx from "clsx";
import NavBar from "../Navbar/Navbar";

const LOCAL_STORAGE_KEY = "diaryNotes";

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Помилка при читанні з localStorage", e);
      return [];
    }
  });

  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    const text = newNote.trim();
    if (!text) return;

    const newEntry = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
    };

    setNotes([newEntry, ...notes]);
    setNewNote("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className={clsx(styles.page)}>
      <NavBar />
      <div className={styles.container}>
        <h2 className={styles.title}>📓 Мій Щоденник</h2>

        <textarea
          placeholder="Поділись своїми думками..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className={styles.textarea}
        />
        <button onClick={handleAddNote} className={styles.button}>
          ➕ Додати нотатку
        </button>

        <div className={styles.notesList}>
          {notes.length === 0 ? (
            <p className={styles.empty}>Поки що нотаток немає.</p>
          ) : (
            notes.map(({ id, text, date }) => (
              <div key={id} className={styles.noteCard}>
                <div className={styles.noteHeader}>
                  <span className={styles.noteDate}>{date}</span>
                  <button
                    onClick={() => handleDeleteNote(id)}
                    className={styles.deleteBtn}
                  >
                    🗑️
                  </button>
                </div>
                <p className={styles.noteText}>{text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
