"use client";
import React from "react";
const NoteModal = (note: any) => {
  return (
    <div>
      <div>
        <h1 className="text-center">Date: {note.notes.date}</h1>
        <h3 className="text-center">Version: {note.notes.title}</h3>
        <p>{note.notes.details ? note.notes.details : ''}</p>
        <div>
          {note.notes.features ? (
            <h3 className="text-2xl border-b-4 border-orange-400">New Feautures:</h3>
          ) : (
            ""
          )}
          <ul>
            {note.notes.features
              ? note.notes.features.map((feature: any, index: any) => (
                  <li key={index} className="list-disc">
                    {feature ? feature : ""}
                  </li>
                ))
              : ""}
          </ul>
        </div>

        <div>
          {note.notes.bugs ? (
            <h3 className="text-2xl border-b-4 border-orange-400">Bug Fixes coming soon...</h3>
          ) : (
            ""
          )}
          <ul>
            {note.notes.bugs
              ? note.notes.bugs.map((bug: any, index: any) => (
                  <li key={index} className="list-disc">
                    {bug}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
