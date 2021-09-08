import React from "react";

const Person = ({ name, number, onClick }) => {
  return (
    <div>
      <li>
      {name} {number} <button onClick={onClick}>delete</button>
      </li>
    </div>
  );
};

export default Person;
