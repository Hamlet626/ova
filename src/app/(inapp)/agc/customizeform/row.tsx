
import { Tabs, Tab, Typography, Button, TableContainer, TableRow, TableCell, Input, IconButton, Collapse, ListItem, Box, List } from "@mui/material";

import ListIcon from '@mui/icons-material/List';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Add, ClearOutlined, Edit } from "@mui/icons-material";
import { FormField } from "@/utils/form/template";
import { useState } from "react";
import { EditFieldDialogBox } from "./edit_field_dialog_box";
import { set } from "react-hook-form";

export function Row({ data, depth,
    editRow,
}:
    {
        data: FormField,
        depth: number,
        editRow: (newValue?: FormField) => void,
    }) {

    const [openStatus, setOpenStatus] = useState(false);
    const [editDialogBox, setEditDialogBox] = useState(false);
    const [editingField, setEditingField] = useState<FormField>(data);
    const [edtiFieldType, setEditFieldType] = useState(true); // true: edit field itself, false: add subfield

    function addSubField(index: number, newValue: any) {
        // {/*use setState add a subfield*/ }
        // {/*callback update a row*/ }
        // data.sub ? data.sub.push(newValue) : data.sub = [newValue];
        // setRow(row);
        // updateRow(index, row);// call back to update a row  
    }

    return (
        <ListItem disablePadding sx={{ width: '600px' }}>
            <List>
                <ListItem disablePadding sx={{ width: '600px' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: `calc(${depth}*20px + 20px)` }}>
                            <Typography>
                                {depth}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '40px' }}>
                            {data.sub && (data.sub.length > 0) ? <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => { setOpenStatus(!openStatus); }}
                            >
                                {openStatus ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                                :
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                >
                                    <ListIcon />
                                </IconButton>}
                        </Box>
                        <Box sx={{ width: '50px' }}>
                            <Typography>
                                {data.id}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '250px' }}>
                            <Typography>
                                {data.label}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '120px' }}>
                            <Typography>
                                {data.type}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '40px' }}>
                            {/* {data.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />} */}
                            {data.required && "*"}
                        </Box>
                        <Box sx={{ width: '200px' }}>
                            <Button variant="solid" startIcon={<Edit color='primary' />}
                                onClick={(e: React.SyntheticEvent) => {
                                    setEditingField(data);// set editingField
                                    setEditFieldType(true);// set edit field itself
                                    setEditDialogBox(!editDialogBox);
                                }}
                            >
                            </Button>
                            <Button variant="solid"
                                startIcon={<ClearOutlined color='primary' />}
                                onClick={(ev: React.SyntheticEvent) => {
                                    editRow();
                                }}>
                            </Button>
                            <Button variant="solid"
                                startIcon={<Add color='primary' />}
                                onClick={(ev: React.SyntheticEvent) => {
                                    setEditingField({ "id": "id", "label": "new sub label", "type": "text", "required": false, "length": "short", "options": [] });
                                    setEditFieldType(false);// set edit subfield
                                    //data.sub ? data.sub.push({ "id": "id", "label": "new label1", "type": "text", "required": false, "length": "short", "options": [] }) : data.sub = [{ "id": "field_id1", "label": "field_label1", "type": "text", "required": false, "length": "short", "options": [] }];
                                    setOpenStatus(true);
                                    setEditDialogBox(!editDialogBox);
                                }}>
                            </Button>
                        </Box>
                    </Box>
                </ListItem>
                {data.sub && <ListItem disablePadding sx={{ width: '600px' }}>
                    <Collapse in={openStatus} timeout="auto" unmountOnExit sx={{ display: 'flex', flexDirection: 'column' }}>
                        <List>
                            {data.sub.map((subRow, index) =>
                            (< Row key={index}
                                data={subRow}
                                depth={depth + 1}
                                editRow={(newValue) => {
                                    if (newValue == null) {
                                        data.sub!.splice(index, 1);
                                    } else {
                                        data.sub![index] = newValue;
                                    }
                                    editRow(data);
                                }}
                            />)
                            )
                            }
                        </List>
                    </Collapse>
                </ListItem>
                }
            </List>
            {/* conditional rendering // static rendering */}
            {editDialogBox && <EditFieldDialogBox
                editField={editingField}
                open_status={editDialogBox}
                onCloseDialogBox={() => setEditDialogBox(!editDialogBox)}
                //onSubmitDialogBox={(newValue) => { setEditDialogBox(!editDialogBox); editRow(newValue) }}
                onSubmitDialogBox={(newValue) => { 
                    setEditDialogBox(!editDialogBox); 
                    // to do 
                    if(edtiFieldType){
                        const subdata:any = {"sub":data.sub} || [];
                        //data.sub ? editRow({...newValue,subdata}) : editRow(newValue);
                        console.log("edit field itself is  ", data);
                        console.log("edit field itself new value is  ", newValue);
                        newValue.sub = data.sub;
                        editRow(newValue);
                    }
                    else {
                        data.sub = data.sub || [];
                        data.sub.push(newValue);
                        editRow(data);
                        console.log("add and edit subfield");
                    }
                }}
            />}
        </ListItem>
    )
}

