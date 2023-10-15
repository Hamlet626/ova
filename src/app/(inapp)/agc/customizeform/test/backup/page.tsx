'use client'
import React from 'react';

function CustomComponent({ onClickCallback }) {
  const handleClick = () => {
    onClickCallback("call back message Custom component button clicked!");
   
  };

  return (
    <button onClick={handleClick}>
      Click me to trigger the callback
    </button>
  );
}

function YourPage() {
  const handleButtonClick = (message) => {
    console.log(`Received message from custom component: ${message}`);
  };

  return (
    <div>
      <h1>Your Page</h1>
      <CustomComponent onClickCallback={handleButtonClick} />
    </div>
  );
}

export default YourPage;
