import { useState, useEffect } from "react";
import styles from "./Notes.module.css";
import clsx from "clsx";
import NavBar from "../Navbar/Navbar";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem("diaryNotes");
    const storedTheme = localStorage.getItem("darkMode") === "true";
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
    setIsDarkMode(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("diaryNotes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    const newEntry = {
      id: Date.now(),
      text: newNote,
      date: new Date().toLocaleString(),
    };
    setNotes([newEntry, ...notes]);
    setNewNote("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className={clsx(styles.page, isDarkMode && styles.dark)}>
      <NavBar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>📓 Мій Щоденник</h2>
        </div>

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
            notes.map((note) => (
              <div key={note.id} className={styles.noteCard}>
                <div className={styles.noteHeader}>
                  <span className={styles.noteDate}>{note.date}</span>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className={styles.deleteBtn}
                  >
                    🗑️
                  </button>
                </div>
                <p className={styles.noteText}>{note.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
