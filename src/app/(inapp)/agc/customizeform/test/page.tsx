"use client";
import React, { useState } from 'react';
import { Tab, Tabs,  Button, Typography } from '@mui/material';
import {TabList,TabPanel,TabContext} from '@mui/lab';


function TabsWithAddButton() {
  const [value, setValue] = useState(0);
  const [tabLabels, setTabLabels] = useState(['Tab 1', 'Tab 2']);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddTab = () => {
    // Clone the current tab labels array and add a new tab label
    const newTabLabels = [...tabLabels, `Tab ${tabLabels.length + 1}`];
    setTabLabels(newTabLabels);
    // Switch to the newly added tab
    setValue(newTabLabels.length - 1);
  };

  return (
  
      <TabContext value={value}>
      <Tabs value={value} onChange={handleChange}>
        <TabList>
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
          <Button variant="outlined" color="primary" onClick={handleAddTab}>
            Add
          </Button>
        </TabList>
        {tabLabels.map((_, index) => (
          <TabPanel key={index} value={value} index={index}>
            <Typography variant="h6">Content for {tabLabels[index]}</Typography>
          </TabPanel>
        ))}
      </Tabs>
      </TabContext>
  );
}



function MyApp() {
  return (
    <div>
      <h1>My App</h1>
      <TabsWithAddButton />
    </div>
  );
}

export default MyApp;

