'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { Tabs, Tab, Typography, Button, TableContainer, TableRow, TableCell, Input, IconButton, Collapse } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { Add, Check, CheckCircle, CheckCircleOutline, Circle, CircleOutlined, HomeOutlined, Scale, TableRows } from "@mui/icons-material";
import theme from "@/components/ThemeRegistry/theme";
import { primary90, neutral96 } from "@/components/ThemeRegistry/theme_consts";
import * as form_const from "@/utils/form/consts";
import * as form_template from "@/utils/form/template";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Clear from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useForm, Controller, SubmitHandler, set } from "react-hook-form";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormTitlesUI from '@/components/form_titles_ui';
import ListIcon from '@mui/icons-material/List';
import { cookies } from 'next/headers';
import { on } from 'events';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

// const field_element_list = ["id", "label", "type", "length", "required", "options", "sub"]
const field_element_list = ["id", "label", "type", "length", "required",]
const field_type_list = ["text", "number", "date", "multi-select", "yes/no", "checkbox"]
const field_length_list = ["short", "medium", "long"]

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    tabId: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, tabId, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={tabId !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {tabId === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const templateList = [form_template.basic_info,
form_template.physical_personal_trait,
form_template.education_occupation,
form_template.background_history,
form_template.family_partner,
form_template.personal_and_medical,]

// to be deleted
function showTable_backup(dataset: table_definition[], depth: number = 1) {
    //const [openSubStatus, setOpenSubStatus] = React.useState(false);        
    function showRow(row: table_definition, index: number, depth: number) {
        //console.log("displayRow row", row);
        if (row.sub) {
            // console.log("displaySub from a row", row.sub)
            // displayTable(row.sub);
            return (
                <ListItem key={index} disablePadding sx={{ width: '600px' }}>
                    <List>
                        <ListItem disablePadding sx={{ width: '600px' }}>
                            {/* <Table>
                                <TableBody>
                                    <TableRow hover>
                                        <TableCell sx={{ border: 1, width: '20px' }}>
                                            {row.sub && <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => setOpen(!open)}
                                            >
                                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>}
                                        </TableCell>
                                        <TableCell sx={{ width: '100px', border: 1 }}>
                                            <Typography>{JSON.stringify(row['label'])}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: '60px', border: 1 }}>
                                            <Typography>{JSON.stringify(row['type'])}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: 1 }}>
                                            <div>
                                                {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ border: 1 }}>
                                            <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                                onClick={(ev: React.SyntheticEvent) => {
                                                    openEditField();
                                                    console.log("The index of the editing field index is ", { index });
                                                    updateIndexNoFieldNewValue(index);
                                                }}>
                                            </Button>
                                            <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table> */}
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ width: `calc(${depth}*20px)` }}>
                                    <Typography>
                                        {depth}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: '40px' }}>
                                    {row.sub && <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setOpen(!open)}
                                    >
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>}
                                </Box>
                                <Box sx={{ width: '250px' }}>
                                    <Typography>
                                        {row['label']}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: '120px' }}>
                                    <Typography>
                                        {row['type']}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: '40px' }}>
                                    {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                                </Box>
                                <Box sx={{ width: '200px' }}>
                                    <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                        onClick={(ev: React.SyntheticEvent) => {
                                            openEditField();
                                            console.log("The index of the editing field index is ", { index });
                                            updateIndexNoFieldNewValue(index);
                                        }}>
                                    </Button>
                                    <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                                </Box>
                            </Box>
                        </ListItem>
                        <ListItem disablePadding sx={{ width: '600px' }}>
                            <Collapse in={open} timeout="auto" unmountOnExit sx={{ display: 'flex', flexDirection: 'column' }}>
                                {showTable(row.sub, depth + 1)}
                            </Collapse>
                        </ListItem>
                    </List>
                </ListItem>
            )
        }
        else return (
            <ListItem key={index} disablePadding sx={{ width: '600px' }}>
                {/* <Table sx={{
                    '& .MuiTable-root': {
                        padding: 0, // Override default padding styles
                    },
                }}>
                    <TableBody>
                        <TableRow hover sx={{
                            '& .MuiTable-root': {
                                padding: 0, // Override default padding styles
                            },
                        }}>
                            <TableCell sx={{ border: 1, width: '20px' }}>
                                {<IconButton
                                    aria-label="expand row"
                                    size="small"
                                >
                                    <ListIcon />
                                </IconButton>}
                            </TableCell>
                            <TableCell sx={{ width: '100px', border: 1 }}>
                                <Typography>{JSON.stringify(row['label'])}</Typography>
                            </TableCell>
                            <TableCell sx={{ width: '60px', border: 1 }}>
                                <Typography>{JSON.stringify(row['type'])}</Typography>
                            </TableCell>
                            <TableCell sx={{ border: 1 }}>
                                <div>
                                    {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                                </div>
                            </TableCell>
                            <TableCell sx={{ border: 1 }}>                                    
                                <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                    onClick={(ev: React.SyntheticEvent) => {
                                        openEditField();
                                        console.log("The index of the editing field index is ", { index });
                                        updateIndexNoFieldNewValue(index);
                                    }}>
                                </Button>
                                <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table> */}
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: `calc(${depth}*20px)` }}>
                        <Typography>
                            {depth}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '40px' }}>
                        {<IconButton
                            aria-label="expand row"
                            size="small"
                        >
                            <ListIcon />
                        </IconButton>}
                    </Box>
                    <Box sx={{ width: '250px' }}>
                        <Typography>
                            {row['label']}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '120px' }}>
                        <Typography>
                            {row['type']}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '40px' }}>
                        {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                    </Box>
                    <Box sx={{ width: '200px' }}>
                        <Button variant="solid" startIcon={<EditIcon color='primary' />}
                            onClick={(ev: React.SyntheticEvent) => {
                                openEditField();
                                console.log("The index of the editing field index is ", { index });
                                updateIndexNoFieldNewValue(index);
                            }}>
                        </Button>
                        <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                    </Box>
                </Box>
            </ListItem>
        )
    }

    return (
        <List>
            {dataset.map((row, index) => (
                showRow(row, index, depth)
            ))}
        </List>
    )
    //console.log("displayTable dataset", dataset);
}

function ShowTable({ dataset, depth, onEditField }: { dataset: table_definition[], depth: number, field:{},onEditField: (index: number, dataset: table_definition[]) => void }) {
    //const [openSubStatus, setOpenSubStatus] = React.useState(false);
    //const [openEditFieldStatus, setOpenEditFieldStatus] = React.useState(false);
    
    const handleEditField = (index: number, dataset: table_definition[]) => {
        // console.log("handleEditField dataset and index", dataset,index);
        // console.log("dataset[index]",dataset[index]); 
        editField.current = dataset[index];
        console.log("editField.current", editField.current);
        //editFieldContent = editField.current;
    }

    const [editDialogBox, setEditDialogBox] = React.useState(false);
    const [editField, setEditField] = React.useState({});
    const [rendercount, setRenderCount] = React.useState(0);
    // to be revised
    const [openSubStatus, setOpenSubStatus] = React.useState(false);
    const closeEditField = () => {
        setEditDialogBox(false);
    }
    const { control, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        closeEditField();
    };


    function showRow(row: table_definition, index: number, depth: number) {
        return (
            <ListItem key={index} disablePadding sx={{ width: '600px' }}>
                <List>
                    <ListItem disablePadding sx={{ width: '600px' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: `calc(${depth}*20px + 20px)` }}>
                                <Typography>
                                    {depth}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '40px' }}>
                                {row.sub ? <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => { setOpenSubStatus(!openSubStatus) }}
                                >
                                    {openSubStatus ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                                    :
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                    >
                                        <ListIcon />
                                    </IconButton>}
                            </Box>
                            <Box sx={{ width: '250px' }}>
                                <Typography>
                                    {row['label']}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '120px' }}>
                                <Typography>
                                    {row['type']}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '40px' }}>
                                {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                            </Box>
                            <Box sx={{ width: '200px' }}>
                                <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                    // onClick={(ev: React.SyntheticEvent) => {
                                    //     console.log("The index of the editing field index is ", { index });
                                    //     console.log("The field is ", JSON.stringify(row));
                                    //     setOpenEditFieldStatus(true);
                                    //     console.log("The openEditFieldStatus is ", { openEditFieldStatus });
                                    //     setEditField(row);
                                    // }}
                                    onClick={(ev: React.SyntheticEvent) => {
                                        //console.log(dataset,dataset[index],row,index);
                                        onEditField(index, dataset);
                                        handleEditField(index, dataset)
                                    }}
                                >
                                </Button>
                                <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                            </Box>
                        </Box>
                    </ListItem>
                    {row.sub && <ListItem disablePadding sx={{ width: '600px' }}>
                        <Collapse in={openSubStatus} timeout="auto" unmountOnExit sx={{ display: 'flex', flexDirection: 'column' }}>
                            {<ShowTable dataset={row.sub}
                                depth={depth + 1}
                                onEditField={(index, dataset) => {
                                    console.log("call onEditField", index, dataset, dataset[index]);
                                }} />}
                        </Collapse>
                    </ListItem>
                    }
                </List>
            </ListItem>
        )
    }

    return (
        <>
            <List>
                {dataset.map((row, index) => (
                    showRow(row, index, depth,)
                ))}

            </List>
            <Dialog open={editDialogBox} onClose={closeEditField} PaperProps={{ sx: { borderRadius: '1px' } }}>
                <DialogTitle>Edit the field</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the field
                        {JSON.stringify(editField)}
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {
                                        Object.entries(editField ?? {}).map((field_name, index) => {
                                            return (
                                                <TableRow key={index} hover >
                                                    <Controller
                                                        name={field_name[0]}
                                                        control={control}
                                                        defaultValue={String(field_name[1])}
                                                        render={({ field }) => (
                                                            <>
                                                                {(field_name[0] === "id") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <TextField
                                                                                {...field}
                                                                            />
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                                {(field_name[0] === "label") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <TextField
                                                                                {...field}
                                                                            />
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                                {(field_name[0] === "type") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Select {...field} >
                                                                                {field_type_list.map((field_type, index) => {
                                                                                    return (
                                                                                        <MenuItem key={index} value={field_type}>{field_type}</MenuItem>
                                                                                    )
                                                                                })
                                                                                }
                                                                            </Select>
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                                {(field_name[0] === "length") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Select {...field}>
                                                                                {field_length_list.map((field_type, index) => {
                                                                                    return (
                                                                                        <MenuItem key={index} value={field_type}>{field_type}</MenuItem>
                                                                                    )
                                                                                })
                                                                                }
                                                                            </Select>
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                                {(field_name[0] === "required") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Checkbox
                                                                                {...field}
                                                                                defaultChecked={field_name[1] == true ? true : false}
                                                                            />
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                            </>
                                                        )}
                                                    />
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button type="submit">Submit</Button>
                        <Button onClick={closeEditField}>Cancel</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

            {/* <EditFieldDialogBox field_definition={editField} open_status={openEditFieldStatus} /> */}
        </>
    )
}

function ShowTree({ dataset, depth, onEditField, onDeleteField }: { dataset: table_definition[], depth: number, onEditFieldCallback: (index: number) => void }) {
    const [openSubStatus, setOpenSubStatus] = React.useState(false);
    const [openEditFieldStatus, setOpenEditFieldStatus] = React.useState(false);
    const [editField, setEditField] = React.useState({});
    function showRow(row: table_definition, index: number, depth: number) {
        return (
            <TreeItem nodeId={((depth + 1) * 100 + index).toString} key={index} disablePadding sx={{ width: '600px' }} label={
                <List>
                    <ListItem disablePadding sx={{ width: '600px' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: `calc(${depth}*20px + 20px)` }}>
                                <Typography>
                                    {depth}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '40px' }}>
                                {row.sub ? <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => { setOpenSubStatus(!openSubStatus), setEditField(row) }}
                                >
                                    {openSubStatus ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                                    :
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                    >
                                        <ListIcon />
                                    </IconButton>}
                            </Box>
                            <Box sx={{ width: '250px' }}>
                                <Typography>
                                    {row['label']}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '120px' }}>
                                <Typography>
                                    {row['type']}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '40px' }}>
                                {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                            </Box>
                            <Box sx={{ width: '200px' }}>
                                <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                >
                                </Button>
                                <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                            </Box>
                        </Box>
                    </ListItem>
                    {row.sub && <ListItem disablePadding sx={{ width: '600px' }}>
                        <Collapse in={openSubStatus} timeout="auto" unmountOnExit sx={{ display: 'flex', flexDirection: 'column' }}>
                            {<ShowTree dataset={row.sub} depth={depth + 1} />}
                        </Collapse>
                    </ListItem>
                    }
                </List>}>
                {console.log("The depth is ", (depth + 1) * 100 + index)}
                {/* <List>
                <ListItem disablePadding sx={{ width: '600px' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: `calc(${depth}*20px + 20px)` }}>
                                <Typography>
                                    {depth}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '40px' }}>
                                {row.sub ? <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => { setOpenSubStatus(true), setEditField(row) }}
                                >
                                    {openSubStatus ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                                    :
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                    >
                                        <ListIcon />
                                    </IconButton>}
                            </Box>
                            <Box sx={{ width: '250px' }}>
                                <Typography>
                                    {row['label']}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '120px' }}>
                                <Typography>
                                    {row['type']}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '40px' }}>
                                {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                            </Box>
                            <Box sx={{ width: '200px' }}>
                                <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                >
                                </Button>
                                <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                            </Box>
                        </Box>
                    </ListItem>
                {row.sub && <ListItem disablePadding sx={{ width: '600px' }}>
                        <Collapse in={openSubStatus} timeout="auto" unmountOnExit sx={{ display: 'flex', flexDirection: 'column' }}>
                            {<ShowTree dataset={row.sub} depth={depth + 1} />}
                        </Collapse>
                    </ListItem>
                    }                
                </List> */}

            </TreeItem>
        )
    }

    return (
        <>
            <TreeView>
                {console.log("Display TreeView")}
                {dataset.map((row, index) => (
                    showRow(row, index, depth,)
                ))}
            </TreeView>
            {/* <EditFieldDialogBox field_definition={editField} open_status={openEditFieldStatus} /> */}
        </>
    )
}

function EditFieldDialogBox({ field_definition, open_status }: { field_definition: {}, open_status: boolean }) {
    const [open, setOpen] = React.useState(open_status);
    const handleClose = (event: React.SyntheticEvent) => {
        setOpen(false);
    };
    const { control, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit the field</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Selfdefined DialogBox
                    {JSON.stringify(field_definition)}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );

}

// using table to display the form
function FormTemplateEditor({ dataset }: { dataset: table_definition[] }) {
    const [editDialogBox, setEditDialogBox] = React.useState(false);
    const [editField, setEditField] = React.useState({});
    const [rendercount, setRenderCount] = React.useState(0);
    // to be revised
    const [openSubStatus, setOpenSubStatus] = React.useState(false);
    const closeEditField = () => {
        setEditDialogBox(false);
    }
    const { control, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        closeEditField();
    };

    return (
        <>
            <ShowTable
                dataset={dataset}
                depth={0}
                onEditField={(index, dataset) => {
                    console.log("call onEditField", index, dataset, dataset[index]);
                    setEditDialogBox(true);
                    setEditField(dataset[index]);
                    setRenderCount(rendercount + 1);
                    reset()
                }
                } />
            {/* <EditFieldDialogBox field_definition={editField} open_status={editDialogBox} /> */}
            <Dialog open={editDialogBox} onClose={closeEditField} PaperProps={{ sx: { borderRadius: '1px' } }}>
                <DialogTitle>Edit the field</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the field
                        {JSON.stringify(editField)}
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {
                                        Object.entries(editField ?? {}).map((field_name, index) => {
                                            return (
                                                <TableRow key={index} hover >
                                                    <Controller
                                                        name={field_name[0]}
                                                        control={control}
                                                        defaultValue={String(field_name[1])}
                                                        render={({ field }) => (
                                                            <>
                                                                {(field_name[0] === "id") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <TextField
                                                                                {...field}
                                                                            />
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                                {(field_name[0] === "label") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <TextField
                                                                                {...field}
                                                                            />
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                                {(field_name[0] === "type") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Select {...field} >
                                                                                {field_type_list.map((field_type, index) => {
                                                                                    return (
                                                                                        <MenuItem key={index} value={field_type}>{field_type}</MenuItem>
                                                                                    )
                                                                                })
                                                                                }
                                                                            </Select>
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                                {(field_name[0] === "length") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Select {...field}>
                                                                                {field_length_list.map((field_type, index) => {
                                                                                    return (
                                                                                        <MenuItem key={index} value={field_type}>{field_type}</MenuItem>
                                                                                    )
                                                                                })
                                                                                }
                                                                            </Select>
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                                {(field_name[0] === "required") &&
                                                                    <>
                                                                        <TableCell>
                                                                            {field_name[0]}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Checkbox
                                                                                {...field}
                                                                                defaultChecked={field_name[1] == true ? true : false}
                                                                            />
                                                                        </TableCell>
                                                                    </>
                                                                }
                                                            </>
                                                        )}
                                                    />
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button type="submit">Submit</Button>
                        <Button onClick={closeEditField}>Cancel</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
    )
}



export default function customize_Form() {
    // tabId is the index of the current section in a specific table template (Click the tab to change the section)
    const [tabId, setTabId] = React.useState(0);

    // used only for sefl-defined button list(can be deleted)
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabId(newValue);
    };
    // used for importted button list commponent
    const changeTab = (index: number) => {
        setTabId(index);
    }

    // templateid is the index of the current table template (Click the left side bar to change the template)
    const [templateid, setTemplateId] = React.useState(0);

    // used only for sefl-defined button list(can be deleted)
    const handleTemplateChange = (event: React.SyntheticEvent, newValue: number) => {
        setTemplateId(newValue);
        handleTabChange(event, 0);
    };

    const changeTemplate = (index: number) => {
        setTemplateId(index);
        changeTab(0);
    }

    // Default value of a new section
    const initialSection = { "title": "section_title1", "fields": [] };

    // Default value of a new field
    const initialField = { "id": "field_id1", "label": "field_label1", "type": "text", "required": false, "length": 0, "options": [] };

    // Initial customized form list using deep copy
    const [customizedformlist, setCustomizedFormList] = React.useState(JSON.parse(JSON.stringify(templateList)));//React.useState([...templateList]);

    // The index_no_field of field in the customized sectionlist
    const [index_no_field, setIndexNoField] = React.useState(0);
    const updateIndexNoFieldNewValue = (newValue: number) => {
        setIndexNoField(newValue);
    }

    // used for self-defined button list(can be deleted)
    const [section_no, setSectionNo] = React.useState(0);
    const updateSectionNoNewValue = (newValue: number) => {
        setSectionNo(newValue);
    }

    // The initial value of the form data
    const [formData, setFormData] = React.useState({});


    // define the form of edit a field
    const [editFieldState, setEditFieldState] = React.useState(false);
    const openEditField = () => {
        console.log("0 editFieldState is changed to ", { editFieldState });

        reset();
        setEditFieldState(true);
        console.log("1 editFieldState is changed to ", { editFieldState });
    };
    const closeEditField = () => {
        setEditFieldState(false);
    };


    const addTableSection = (event: React.SyntheticEvent, newValue: any) => {
        // Add a new section to customized sectionlist
        customizedformlist[templateid].content = [...customizedformlist[templateid].content, newValue]
        // Set customized sectionlist and render the page
        setCustomizedFormList([...customizedformlist]);
        //console.log('add section',customizedformlist[templateid]);
    };

    const deleteTableSection = (event: React.SyntheticEvent, index: number) => {
        // Delete a section from customized sectionlist
        customizedformlist[templateid].content.splice(index, 1);
        // If customized sectionlist is empty, add a new section to customized sectionlist
        // if (customizedformlist[templateid].content.length === 0) {
        //     customizedformlist[templateid].content.push(initialSection);
        // }
        // Set customized sectionlist and render the page
        setCustomizedFormList([...customizedformlist]);
        // console.log("display deleteTableSection afeter delete",customizedformlist[templateid]);

    };

    const editTableSectionTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Edit the title of a section
        customizedformlist[templateid].content[tabId].title = event.target.value;
        // Set customized sectionlist and render the page
        setCustomizedFormList([...customizedformlist]);
        //console.log(customizedformlist[templateid].content[tabId]);
    };

    const addTableField = (event: React.SyntheticEvent, index: number, newValue: any) => {
        // Add a new field to customized sectionlist
        customizedformlist[templateid].content[tabId].fields.splice(index, 0, newValue);
        // Set customized sectionlist and render the page
        setCustomizedFormList([...customizedformlist]);
        //console.log(customizedformlist[templateid].content[tabId]);
    };

    const deleteTableField = (event: React.SyntheticEvent, index: number) => {
        // Delete a field from customized sectionlist
        customizedformlist[templateid].content[tabId].fields.splice(index, 1);
        // Set customized sectionlist and render the page
        setCustomizedFormList([...customizedformlist]);
        //console.log(customizedformlist[templateid].content[tabId]);
    }

    const editTableField = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        // Edit the label of a field
        customizedformlist[templateid].content[tabId].fields[index].label = event.target.value;
        // Set customized sectionlist and render the page
        setCustomizedFormList([...customizedformlist]);
        //console.log(customizedformlist[templateid].content[tabId]);
    }

    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        closeEditField();
    };

    const table_name_list = customizedformlist.map((section, index) => (
        { title: section.name.toUpperCase(), selected: index === templateid, icon: <HomeOutlined /> }
    ));

    // Testing collapse row
    const [open, setOpen] = React.useState(false);

    function showTable1(dataset: table_definition[], depth: number = 1) {
        //const [openSubStatus, setOpenSubStatus] = React.useState(false);        
        function showRow(row: table_definition, index: number, depth: number) {
            //console.log("displayRow row", row);
            if (row.sub) {
                // console.log("displaySub from a row", row.sub)
                // displayTable(row.sub);
                return (
                    <ListItem key={index} disablePadding sx={{ width: '600px' }}>
                        <List>
                            <ListItem disablePadding sx={{ width: '600px' }}>
                                {/* <Table>
                                    <TableBody>
                                        <TableRow hover>
                                            <TableCell sx={{ border: 1, width: '20px' }}>
                                                {row.sub && <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => setOpen(!open)}
                                                >
                                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>}
                                            </TableCell>
                                            <TableCell sx={{ width: '100px', border: 1 }}>
                                                <Typography>{JSON.stringify(row['label'])}</Typography>
                                            </TableCell>
                                            <TableCell sx={{ width: '60px', border: 1 }}>
                                                <Typography>{JSON.stringify(row['type'])}</Typography>
                                            </TableCell>
                                            <TableCell sx={{ border: 1 }}>
                                                <div>
                                                    {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                                                </div>
                                            </TableCell>
                                            <TableCell sx={{ border: 1 }}>
                                                <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                                    onClick={(ev: React.SyntheticEvent) => {
                                                        openEditField();
                                                        console.log("The index of the editing field index is ", { index });
                                                        updateIndexNoFieldNewValue(index);
                                                    }}>
                                                </Button>
                                                <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table> */}
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ width: `calc(${depth}*20px)` }}>
                                        <Typography>
                                            {depth}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '40px' }}>
                                        {row.sub && <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => setOpen(!open)}
                                        >
                                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>}
                                    </Box>
                                    <Box sx={{ width: '250px' }}>
                                        <Typography>
                                            {row['label']}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '120px' }}>
                                        <Typography>
                                            {row['type']}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '40px' }}>
                                        {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                                    </Box>
                                    <Box sx={{ width: '200px' }}>
                                        <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                            onClick={(ev: React.SyntheticEvent) => {
                                                openEditField();
                                                console.log("The index of the editing field index is ", { index });
                                                updateIndexNoFieldNewValue(index);
                                            }}>
                                        </Button>
                                        <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                                    </Box>
                                </Box>
                            </ListItem>
                            <ListItem disablePadding sx={{ width: '600px' }}>
                                <Collapse in={open} timeout="auto" unmountOnExit sx={{ display: 'flex', flexDirection: 'column' }}>
                                    {showTable(row.sub, depth + 1)}
                                </Collapse>
                            </ListItem>
                        </List>
                    </ListItem>
                )
            }
            else return (
                <ListItem key={index} disablePadding sx={{ width: '600px' }}>
                    {/* <Table sx={{
                        '& .MuiTable-root': {
                            padding: 0, // Override default padding styles
                        },
                    }}>
                        <TableBody>
                            <TableRow hover sx={{
                                '& .MuiTable-root': {
                                    padding: 0, // Override default padding styles
                                },
                            }}>
                                <TableCell sx={{ border: 1, width: '20px' }}>
                                    {<IconButton
                                        aria-label="expand row"
                                        size="small"
                                    >
                                        <ListIcon />
                                    </IconButton>}
                                </TableCell>
                                <TableCell sx={{ width: '100px', border: 1 }}>
                                    <Typography>{JSON.stringify(row['label'])}</Typography>
                                </TableCell>
                                <TableCell sx={{ width: '60px', border: 1 }}>
                                    <Typography>{JSON.stringify(row['type'])}</Typography>
                                </TableCell>
                                <TableCell sx={{ border: 1 }}>
                                    <div>
                                        {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                                    </div>
                                </TableCell>
                                <TableCell sx={{ border: 1 }}>                                    
                                    <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                        onClick={(ev: React.SyntheticEvent) => {
                                            openEditField();
                                            console.log("The index of the editing field index is ", { index });
                                            updateIndexNoFieldNewValue(index);
                                        }}>
                                    </Button>
                                    <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> */}
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: `calc(${depth}*20px)` }}>
                            <Typography>
                                {depth}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '40px' }}>
                            {<IconButton
                                aria-label="expand row"
                                size="small"
                            >
                                <ListIcon />
                            </IconButton>}
                        </Box>
                        <Box sx={{ width: '250px' }}>
                            <Typography>
                                {row['label']}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '120px' }}>
                            <Typography>
                                {row['type']}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '40px' }}>
                            {row.required ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='secondary' />}
                        </Box>
                        <Box sx={{ width: '200px' }}>
                            <Button variant="solid" startIcon={<EditIcon color='primary' />}
                                onClick={(ev: React.SyntheticEvent) => {
                                    openEditField();
                                    console.log("The index of the editing field index is ", { index });
                                    updateIndexNoFieldNewValue(index);
                                }}>
                            </Button>
                            <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteTableField(ev, index); }}> </Button>
                        </Box>
                    </Box>
                </ListItem>
            )
        }

        return (
            <List>
                {dataset.map((row, index) => (
                    showRow(row, index, depth)
                ))}
            </List>
        )
        //console.log("displayTable dataset", dataset);
    }



    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{
                width: '297px',
                height: '941px',
                backgroundColor: 'white',
                mt: '-25px',
                boxShadow: '8px,22px,75px,2px,rgba(92, 104, 126, 0.12)',
            }}>
                <Typography variant="h4" sx={{
                    fontFamily: 'roboto.style.fontFamily',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    letterSpacing: '0.15',
                    mt: '71px',
                    ml: '80px',
                    width: '57px',
                    height: '24px',
                }}>
                    Sign Up
                </Typography>
                <Typography sx={{
                    fontFamily: 'roboto.style.fontFamily',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '32px',
                    mt: '38px',
                    ml: '80px',
                    width: '169px',
                    height: '32px',
                }}>
                    Create Form
                </Typography>
                <Box sx={{
                    mt: "16px",
                    ml: "80px",
                    width: '197px',
                    height: 'auto',
                    gap: '12px',
                }}>
                    <FormTitlesUI titles={table_name_list} onClick={
                        (t, i) => {
                            console.log("The index of the selected template index is ", { i });
                            console.log("The selected template is ", t);
                            changeTemplate(i);
                            changeTab(0);
                        }
                    } />
                </Box>
            </Box>
            <Box sx={{ width: '100%', }}>
                <List sx={{
                    mt: "81px",
                    ml: "85px",
                    width: 'auto',
                    height: 'auto',
                    gap: '12px',
                }}>
                    <ListItem disablePadding>
                        <LinearProgress sx={{
                            width: '869px',
                            height: '4px',
                        }} />
                    </ListItem>
                    <ListItem disablePadding>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
                                <Tabs value={tabId}
                                    onChange={(ev: React.SyntheticEvent, value) => { console.log("change tab"); changeTab(value); console.log(value); setTabId(value) }} >
                                    {(customizedformlist[templateid] ?? {} as any).content.map((template, index) => (
                                        <Tab key={index} label={template.title} {...a11yProps(index)} />
                                    ))}
                                </Tabs>
                                <Button variant="solid" color="primary" startIcon={<Add />}
                                    onClick={(ev: React.SyntheticEvent) => { addTableSection(ev, initialSection); }}>
                                </Button>
                            </Box>
                            {customizedformlist[templateid].content.map((section_list, index) => (
                                <CustomTabPanel tabId={tabId} index={index} key={index} >
                                    <Input placeholder={section_list.title}
                                        defaultValue={section_list.title}
                                        sx={{ width: '200px' }}
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { editTableSectionTitle(ev); console.log({ tabId }) }} />
                                    <Button variant="solid" startIcon={<Clear />} onClick={(ev: React.SyntheticEvent) => { deleteTableSection(ev, 0); changeTab(0) }}> </Button>
                                    <br />
                                    <Button variant="solid" color="primary" startIcon={<Add />}
                                        onClick={(ev: React.SyntheticEvent) => { addTableField(ev, 0, initialField); }}>Add a field
                                    </Button>
                                    <br />
                                    {/* <ShowTable dataset={customizedformlist[templateid].content[tabId].fields}
                                        depth={0}
                                        onEditField={(index, dataset) => {
                                            console.log("call onEditField", index, dataset, dataset[index]);
                                        }
                                        }
                                    >
                                    </ShowTable> */}
                                    {/* <EditFieldDialogBox field_definition={editingFieldContent} open_status={true} /> */}
                                    {/* <Dialog open={editFieldState} onClose={closeEditField} PaperProps={{ sx: { borderRadius: '1px' } }}>
                                        <DialogTitle>Edit the field</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Edit the field
                                                {templateid}
                                                {tabId}
                                                {index_no_field}
                                            </DialogContentText>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <TableContainer >
                                                    <Table>
                                                        <TableBody>
                                                            {
                                                                Object.entries(customizedformlist[templateid].content[tabId].fields[index_no_field] ?? {}).map((field_name, index) => {
                                                                    return (
                                                                        <TableRow key={index} hover >
                                                                            <Controller
                                                                                name={field_name[0]}
                                                                                control={control}
                                                                                defaultValue={String(field_name[1])}
                                                                                render={({ field }) => (
                                                                                    <>
                                                                                        {(field_name[0] === "id") &&
                                                                                            <>
                                                                                                <TableCell>
                                                                                                    {field_name[0]}
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <TextField
                                                                                                        {...field}
                                                                                                    />
                                                                                                </TableCell>
                                                                                            </>
                                                                                        }
                                                                                        {(field_name[0] === "label") &&
                                                                                            <>
                                                                                                <TableCell>
                                                                                                    {field_name[0]}
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <TextField
                                                                                                        {...field}
                                                                                                    />
                                                                                                </TableCell>
                                                                                            </>
                                                                                        }
                                                                                        {(field_name[0] === "type") &&
                                                                                            <>
                                                                                                <TableCell>
                                                                                                    {field_name[0]}
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <Select {...field} >
                                                                                                        {field_type_list.map((field_type, index) => {
                                                                                                            return (
                                                                                                                <MenuItem key={index} value={field_type}>{field_type}</MenuItem>
                                                                                                            )
                                                                                                        })
                                                                                                        }
                                                                                                    </Select>
                                                                                                </TableCell>
                                                                                            </>
                                                                                        }
                                                                                        {(field_name[0] === "length") &&
                                                                                            <>
                                                                                                <TableCell>
                                                                                                    {field_name[0]}
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <Select {...field}>
                                                                                                        {field_length_list.map((field_type, index) => {
                                                                                                            return (
                                                                                                                <MenuItem key={index} value={field_type}>{field_type}</MenuItem>
                                                                                                            )
                                                                                                        })
                                                                                                        }
                                                                                                    </Select>
                                                                                                </TableCell>
                                                                                            </>
                                                                                        }
                                                                                        {(field_name[0] === "required") &&
                                                                                            <>
                                                                                                <TableCell>
                                                                                                    {field_name[0]}
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <Checkbox
                                                                                                        {...field}
                                                                                                        defaultChecked={field_name[1] == true ? true : false}
                                                                                                    />
                                                                                                </TableCell>
                                                                                            </>
                                                                                        }
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </TableRow>
                                                                    )
                                                                })
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <Button type="submit">Submit</Button>
                                                <Button onClick={closeEditField}>Cancel</Button>
                                            </form>
                                        </DialogContent>
                                        <DialogActions>
                                        </DialogActions>
                                    </Dialog> */}
                                    {/* <FormTemplateEditor dataset={customizedformlist[templateid].content[tabId].fields} /> */}
                                    <ShowTree dataset={customizedformlist[templateid].content[tabId].fields} depth={0} onEditFieldCallback={(index) => { console.log("call onEditField", index); }} />
                                </CustomTabPanel>
                            ))}
                        </Box>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

}