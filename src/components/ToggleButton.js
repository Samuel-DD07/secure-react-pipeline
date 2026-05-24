import React from "react";

const ToggleButton = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-200"
      } p-2 rounded`}
    >
      {darkMode ? "Dark" : "Light"}
    </button>
  );
};

export default ToggleButton;
