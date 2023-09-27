"use client"
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

function BasicForm() {
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset(); // Clear the form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <Controller
          name="namet"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BasicForm;



