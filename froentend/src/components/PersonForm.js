import React from "react";
import InputForm from "./InputForm";

const PersonForm = ({
  newName,
  newNumber,
  handlenewName,
  handlenewNumber,
  addName,
  name,
  number,
}) => {
  return (
    <form onSubmit={addName}>
      <InputForm name={name} value={newName} onChange={handlenewName} />
      <InputForm name={number} value={newNumber} onChange={handlenewNumber} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
