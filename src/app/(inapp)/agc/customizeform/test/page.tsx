"use client"
import { useState } from 'react';
import { NextPage } from 'next';

const MyComponent: NextPage = () => {
  // Define the list in state
  const [myList, setMyList] = useState<number[]>([1, 2, 3, 4, 5]);

  // Function to change the value of an item by index
  const changeValueAtIndex = (index: number, newValue: number) => {
    if (index >= 0 && index < myList.length) {
      const updatedList = [...myList]; // Create a copy of the original list
      updatedList[index] = newValue; // Update the value at the specified index
      setMyList(updatedList); // Update the state with the updated list
    }
  };

  return (
    <div>
      <h1>My Component</h1>
      <ul>
        {myList.map((item, index) => (
          <li key={index}>
            Item {index + 1}: {item}
            <button
              onClick={() => changeValueAtIndex(index, item * 2)} // Example: Double the value
            >
              Change Value
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
