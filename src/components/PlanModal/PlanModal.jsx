import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const PlanModal = ({ isOpen, onRequestClose, selectedDate }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Day Details"
      style={{
        content: {
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          borderRadius: "12px",
        },
      }}
    >
      <h2>Day Info</h2>
      <p>Selected Date: {selectedDate?.toDateString()}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default PlanModal;
