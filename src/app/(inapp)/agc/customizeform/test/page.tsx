"use client";
import React, { useState } from 'react';

const InputComponent: React.FC = () => {
  // Create a state variable to hold the input value
  const [inputValue, setInputValue] = useState<string>('');

  // Event handler to update the input value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Access the input value using e.target.value
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  // Function to handle submission (you can use it to access the input value)
  const handleSubmit = () => {
    // Access the input value from the 'inputValue' state variable
    alert('Input value: ' + inputValue);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter something"
        value={inputValue} // Set the value from the state variable
        onChange={handleInputChange} // Update the state when input changes
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default InputComponent;
