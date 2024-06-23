"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DataItem {
  id: number;
  name: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-scroll   outline-none focus:outline-none">
      <div className="relative">
        <div className="bg-red-200 w-96 max-w-96 rounded-lg shadow-lg outline-none focus:outline-none max-w">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-green-900">
              Add Data
            </h3>
          </div>
          <form>
            <input placeholder="weight" />
            <div className="h-48 w-1/2 bg-orange-700">
              <h3>foods</h3>
              <button>+</button>
            </div>
            <button>v taken?</button>
            <button>w taken?</button>
            <button>fb taken?</button>
            <p>Protein</p>
            <p>Calories</p>
            <p>Fat</p>
            <p>Carbohydrates</p>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              submit
            </button>
          </form>

          <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300 rounded-b">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
