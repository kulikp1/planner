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
  const [editId, setEditId] = useState(null);
  const [editedText, setEditedText] = useState("");

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

  const handleSaveEdit = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editId ? { ...note, text: editedText } : note
      )
    );
    setEditId(null);
    setEditedText("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditedText("");
  };

  const openEditModal = (id, currentText) => {
    setEditId(id);
    setEditedText(currentText);
  };

  return (
    <div>
      <NavBar />
      <div className={clsx(styles.page)}>
        <div className={styles.container}>
          <h2 className={styles.title}>📓 Мій Щоденник</h2>

          <div className={styles.form}>
            <textarea
              placeholder="Поділись своїми думками..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className={styles.textarea}
            />
            <button onClick={handleAddNote} className={styles.button}>
              ➕ Додати нотатку
            </button>
          </div>

          {notes.length === 0 ? (
            <p className={styles.empty}>Поки що нотаток немає.</p>
          ) : (
            <div className={styles.notesList}>
              {notes.map(({ id, text, date }) => (
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
                  <p
                    className={styles.noteText}
                    onClick={() => openEditModal(id, text)}
                    title="Натисніть для редагування"
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editId !== null && (
        <div className={styles.modalOverlay} onClick={handleCancelEdit}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Редагувати нотатку</h3>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className={styles.textarea}
              rows={5}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleSaveEdit} className={styles.button}>
                💾 Зберегти
              </button>
              <button
                onClick={handleCancelEdit}
                className={styles.cancelButton}
              >
                ❌ Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
