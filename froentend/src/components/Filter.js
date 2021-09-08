import React from "react";

const Filter = ({ text, search, updateSearch }) => {
  return (
    <div>
      {text} <input value={search} onChange={updateSearch} />
    </div>
  );
};

export default Filter;
