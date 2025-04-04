import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./PlanModal.module.css";
import { format } from "date-fns";

Modal.setAppElement("#root");

const PlanModal = ({ isOpen, onRequestClose, selectedDate, addPlan }) => {
  const [planList, setPlanList] = useState([]);
  const [newPlan, setNewPlan] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  // Завантажити з localStorage (тільки для перегляду планів на дату)
  useEffect(() => {
    if (dateKey) {
      const storedPlans = JSON.parse(localStorage.getItem("plans")) || {};
      setPlanList(storedPlans[dateKey] || []);
    }
  }, [dateKey, isOpen]);

  // Зберегти зміни локально у сховище при оновленні
  const updatePlans = (updated) => {
    const allPlans = JSON.parse(localStorage.getItem("plans")) || {};
    allPlans[dateKey] = updated;
    localStorage.setItem("plans", JSON.stringify(allPlans));
    setPlanList(updated);
  };

  const handleAdd = () => {
    if (!newPlan.trim()) return;
    const trimmed = newPlan.trim();

    // Викликати глобальний метод додавання
    addPlan(dateKey, trimmed);

    const updated = [...planList, trimmed];
    updatePlans(updated);

    setNewPlan("");
  };

  const handleDelete = (index) => {
    const updated = planList.filter((_, i) => i !== index);
    updatePlans(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewPlan(planList[index]);
  };

  const handleSaveEdit = () => {
    const updated = [...planList];
    updated[editIndex] = newPlan.trim();
    updatePlans(updated);
    setEditIndex(null);
    setNewPlan("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.title}>
        Plans for {selectedDate ? format(selectedDate, "dd MMMM yyyy") : ""}
      </h2>

      <div className={styles.inputRow}>
        <input
          type="text"
          value={newPlan}
          onChange={(e) => setNewPlan(e.target.value)}
          placeholder="Enter your plan..."
          className={styles.input}
        />
        {editIndex !== null ? (
          <button onClick={handleSaveEdit} className={styles.buttonEdit}>
            Save
          </button>
        ) : (
          <button onClick={handleAdd} className={styles.buttonAdd}>
            Add
          </button>
        )}
      </div>

      <ul className={styles.planList}>
        {planList.length === 0 && (
          <li className={styles.empty}>No plans yet.</li>
        )}
        {planList.map((plan, index) => (
          <li key={index} className={styles.planItem}>
            <span>{plan}</span>
            <div className={styles.actions}>
              <button
                onClick={() => handleEdit(index)}
                className={styles.smallBtn}
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(index)}
                className={styles.smallBtn}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={onRequestClose} className={styles.closeButton}>
        Close
      </button>
    </Modal>
  );
};

export default PlanModal;
