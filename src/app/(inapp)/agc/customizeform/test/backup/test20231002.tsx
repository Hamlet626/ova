"use client";
import React from 'react';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    Typography,
    Table,
    Stack,
} from '@mui/material';

const NestedTable = ({ data }) => {
    return (
        <Paper elevation={3}>
            <List>
                {data.map((item, index) => (
                    <ListItem key={index} sx={{
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            cursor: 'pointer',
                        },
                    }}>
                        <ListItemText>
                            <Typography variant="h6">{item.name}</Typography>
                            <div>
                                <Typography variant="body1">{item.address.street}</Typography>
                                <Typography variant="body2">
                                    {item.address.city}, {item.address.zipcode}
                                </Typography>
                                <div>
                                    <Typography>    test</Typography>
                                </div>
                                <Typography variant="body2">{item.email}</Typography>
                            </div>
                            <Table>
                                <Stack direction="row" spacing={2}>
                                    <Typography>    test</Typography>
                                    <Typography>    test</Typography>
                                    <Typography>    test</Typography>
                                    <Typography>    test</Typography>
                                </Stack>
                            </Table>
                        </ListItemText>
                    </ListItem>
                ))}

            </List>
        </Paper>
    );
};

const App = () => {
    const data = [
        {
            name: 'John',
            address: {
                street: '123 Main St',
                city: 'Anytown',
                zipcode: '12345',
            },
            email: 'john@example.com',
        },
        // Add more data items as needed
        {
            name: 'John',
            address: {
                street: '123 Main St',
                city: 'Anytown',
                zipcode: '12345',
            },
            email: 'john@example.com',
        },
        {
            name: 'John',
            address: {
                street: '123 Main St',
                city: 'Anytown',
                zipcode: '12345',
            },
            email: 'john@example.com',
        },
    ];

    return (
        <div>
            <NestedTable data={data} />
        </div>
    );
};

export default App;