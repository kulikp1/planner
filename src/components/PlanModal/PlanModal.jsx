import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./PlanModal.module.css";
import { format } from "date-fns";
import {
  getPlansFromStorage,
  savePlansToStorage,
} from "../../utils/localStorage";

Modal.setAppElement("#root");

const PlanModal = ({
  isOpen,
  onRequestClose,
  selectedDate,
  addPlan,
  updatePlans,
  planList,
}) => {
  const [internalList, setInternalList] = useState([]);
  const [newPlan, setNewPlan] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  useEffect(() => {
    setInternalList(planList || []);
    setNewPlan("");
    setEditIndex(null);
  }, [planList, selectedDate]);

  const savePlans = (updatedList) => {
    const allPlans = getPlansFromStorage();

    if (updatedList.length > 0) {
      allPlans[dateKey] = updatedList;
    } else {
      delete allPlans[dateKey];
    }

    savePlansToStorage(allPlans);
    updatePlans(allPlans);
  };

  const handleAdd = () => {
    if (!newPlan.trim()) return;
    const trimmed = newPlan.trim();
    const updated = [...internalList, trimmed];

    addPlan(dateKey, trimmed);
    savePlans(updated);
    setNewPlan("");
  };

  const handleDelete = (index) => {
    const updated = internalList.filter((_, i) => i !== index);
    savePlans(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewPlan(internalList[index]);
  };

  const handleSaveEdit = () => {
    if (!newPlan.trim()) return;
    const updated = [...internalList];
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
        {internalList.length === 0 && (
          <li className={styles.empty}>No plans yet.</li>
        )}
        {internalList.map((plan, index) => (
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
