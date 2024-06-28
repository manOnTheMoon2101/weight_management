"use client";
import React from "react";
import { useState } from "react";

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
    </div>
  );
};

export default Filter;
