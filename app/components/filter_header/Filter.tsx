"use client";
import React from "react";
import { useState } from "react";
import Button from "./addButton/Button";
import Modal from "./modal/Modal";
const Filter = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      Filter
      <Button onClick={openModal} />
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default Filter;
