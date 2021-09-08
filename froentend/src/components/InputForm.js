import React from "react";

const InputForm = ({ name, value, onChange }) => {
  return (
    <div>
      {name}
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default InputForm;
