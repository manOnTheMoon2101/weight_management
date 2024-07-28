import React from "react";

const NoteModal = (note: any) => {
  return (
    <div>
      <div>
        <h1>{note.notes.title}</h1>

        <div>
          <h3>New Feautues</h3>
          <ul>
            {note.notes.features.map((feature: any, index: any) => (
              <li key={index} className="list-disc">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Bug Fixes</h3>
          <ul>
            {note.notes.bugs.map((bug: any, index: any) => (
              <li key={index} className="list-disc">
                {bug}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;