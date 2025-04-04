import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./PlanModal.module.css";
import { format } from "date-fns";

Modal.setAppElement("#root");

const PlanModal = ({
  isOpen,
  onRequestClose,
  selectedDate,
  addPlan,
  updatePlans,
}) => {
  const [planList, setPlanList] = useState([]);
  const [newPlan, setNewPlan] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  useEffect(() => {
    if (dateKey) {
      const stored = JSON.parse(localStorage.getItem("plans")) || {};
      setPlanList(stored[dateKey] || []);
    }
  }, [dateKey, isOpen]);

  const savePlans = (updatedList) => {
    const allPlans = JSON.parse(localStorage.getItem("plans")) || {};

    if (updatedList.length > 0) {
      allPlans[dateKey] = updatedList;
    } else {
      delete allPlans[dateKey];
    }

    localStorage.setItem("plans", JSON.stringify(allPlans));
    setPlanList(updatedList);
    updatePlans(allPlans);
  };

  const handleAdd = () => {
    if (!newPlan.trim()) return;

    const trimmed = newPlan.trim();
    const updated = [...planList, trimmed];

    addPlan(dateKey, trimmed); // глобально
    savePlans(updated); // локально

    setNewPlan("");
  };

  const handleDelete = (index) => {
    const updated = planList.filter((_, i) => i !== index);
    savePlans(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewPlan(planList[index]);
  };

  const handleSaveEdit = () => {
    if (!newPlan.trim()) return;
    const updated = [...planList];
    updated[editIndex] = newPlan.trim();
    savePlans(updated);
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
