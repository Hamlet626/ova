
import { Typography, Button, IconButton, Collapse, ListItem, Box, List } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Add, ClearOutlined, Edit } from "@mui/icons-material";
import { FormField } from "@/utils/form/types";
import { useState } from "react";
import { EditFieldDialogBox } from "./edit_field_dialog_box";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "./use_raised_shadow";


export function Row({ data, depth,
    onEditRow,
}:
    {
        data: FormField,
        depth: number,
        onEditRow: (newValue?: FormField) => void,
    }) {

    const [openStatus, setOpenStatus] = useState(false);
    const [editDialogBox, setEditDialogBox] = useState(false);
    const [editingField, setEditingField] = useState<FormField>(data);
    const [edtiFieldType, setEditFieldType] = useState(true); // true: edit field itself, false: add a subfield
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    //uncomment if want only specific part on the field tile to be draggable
    //const dragControls = useDragControls();

    return (
        <Reorder.Item
      value={data.id}
      id={data.id}
      style={{ boxShadow, y }}
    //   dragListener={false}
    //   dragControls={dragControls}
    >
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
                                    onEditRow();
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
                        <Reorder.Group axis="y" layoutScroll values={data.sub.map(v=>v.id)}
                        onReorder={(v)=>{
                            const newfields=Array.from(v,(id,i)=>data.sub!.find(f=>f.id==id)!);
                            data.sub=newfields;
                            onEditRow(data);
                        }}>
                            {data.sub.map((subRow, index) =>
                            (< Row key={subRow.id}
                                data={subRow}
                                depth={depth + 1}
                                onEditRow={(newValue) => {
                                    if (newValue == null) {
                                        data.sub!.splice(index, 1);
                                    } else {
                                        data.sub![index] = newValue;
                                    }
                                    onEditRow(data);
                                }}
                            />)
                            )
                            }
                        </Reorder.Group>
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
                    if (edtiFieldType) { // edit field itself
                        const result = JSON.parse(JSON.stringify(newValue));
                        result.sub = JSON.parse(JSON.stringify(data.sub || []));
                        onEditRow(result);
                    }
                    else { // add subfield
                        const result=JSON.parse(JSON.stringify(data));
                        result.sub=result.sub||[];
                        result.sub.push(newValue);
                        onEditRow(result);
                    }
                }}
            />}
        </ListItem>
        </Reorder.Item>
    )
}

