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
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormTitlesUI from '@/components/form_titles_ui';
import ListIcon from '@mui/icons-material/List';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

// const field_element_list = ["id", "label", "type", "length", "required", "options", "sub"]
const field_element_list = ["id", "label", "type", "length", "required",]
const field_type_list = ["text", "number", "date", "multi-select", "yes/no", "checkbox", "address"]
const field_length_list = ["short", "medium", "long"]

type field_definition = { id: string, label: string, type: string, length: number, required: boolean, options: string[], sub: [] }
type section_definition = { name: string, content: [] }

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

function ShowTable({ dataset, depth, onEditField }: { dataset: field_definition[], depth: number, onEditField: (index: number, dataset: field_definition[]) => void }) {
    const [editDialogBox, setEditDialogBox] = React.useState(false);
    const [editField, setEditField] = React.useState({});
    const [editFieldIndex, setEditFieldIndex] = React.useState(0);
    const [openSubStatus, setOpenSubStatus] = React.useState(false);
    // const { control, handleSubmit, reset } = useForm();
    const [openSubStatusList, setOpenSubStatusList] = React.useState(Array(dataset.length).fill(false));
    const changeOpenSubStatusList = (index: number) => {
        openSubStatusList[index] = !openSubStatusList[index];
        setOpenSubStatusList([...openSubStatusList]);
    }
   
    const [editDialogBoxList, setEditDialogBoxList] = React.useState(Array(dataset.length).fill(false));
    const changeEditDialogBoxList = (index: number) => {
        let newlist=Array(dataset.length).fill(false);
        newlist[index] = true;      
        //editDialogBoxList[index] = !editDialogBoxList[index];
        setEditDialogBoxList([...newlist]);
    }

    // Rerender the page after editing the field
    const [renderFlag, setRenderFlag] = React.useState(false);
    const closeFieldEditDialogBox = () => {
        setEditDialogBox(!editDialogBox);
        setRenderFlag(!renderFlag);
    }
    function deleteField(event: React.SyntheticEvent, index: number) {
        console.log("deleteTableField", index);
        dataset.splice(index, 1);
        console.log("deleteTableField", dataset);
        setRenderFlag(!renderFlag);
    }

    function showRow(row: field_definition, index: number, depth: number) {
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
                                    onClick={() => { setOpenSubStatus(!openSubStatus); changeOpenSubStatusList(index);changeEditDialogBoxList(index);setEditFieldIndex(index); console.log("selected field index",editFieldIndex)}}
                                >
                                    {/* {openSubStatus ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
                                    {openSubStatusList[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                                    {row['id']}
                                </Typography>
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
                                    onClick={(e: React.SyntheticEvent) => {
                                        onEditField(index, dataset);                                   
                                        setEditField(dataset[index]);
                                        setEditFieldIndex(index);
                                        changeEditDialogBoxList(index);               
                                    }}
                                >
                                </Button>
                                <Button variant="solid" startIcon={<ClearOutlinedIcon color='primary' />} onClick={(ev: React.SyntheticEvent) => { deleteField(ev, index); }}> </Button>
                            </Box>
                        </Box>
                    </ListItem>
                    {row.sub && <ListItem disablePadding sx={{ width: '600px' }}>
                        <Collapse in={openSubStatusList[index]} timeout="auto" unmountOnExit sx={{ display: 'flex', flexDirection: 'column' }}>
                            {/* <Collapse in={openSubStatus} timeout="auto" unmountOnExit sx={{ display: 'flex', flexDirection: 'column' }}> */}
                            <ShowTable dataset={row.sub}
                                depth={depth + 1}
                                onEditField={(index, dataset) => {
                                    console.log("call onEditField in collpased item layer >0", index, dataset, dataset[index]);
                                    console.log("The editing field dataset is ", { dataset });
                                    setEditField(dataset[index]);
                                    setEditFieldIndex(index);
                                    setEditDialogBox(!editDialogBox);
                                    changeEditDialogBoxList(index);
                                }} />
                                { editDialogBox? <EditFieldDialogBox fieldlist={row.sub} index={editFieldIndex}  field_definition={row.sub[editFieldIndex]} open_status={editDialogBox} closeDialogBox={closeFieldEditDialogBox} /> :<div/>}
                            {/* <EditFieldDialogBox field_definition={editField} open_status={editDialogBox} closeDialogBox={closeFieldEditDialogBox} /> */}
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
            { (editDialogBox) ? <EditFieldDialogBox fieldlist={dataset} index={editFieldIndex} field_definition={editField} open_status={editDialogBox} closeDialogBox={closeFieldEditDialogBox} /> :<div/>}
            {/* <EditFieldDialogBox field_definition={editField} open_status={editDialogBox} closeDialogBox={closeFieldEditDialogBox} /> */}
        </>
    )
}


function EditFieldDialogBox({ fieldlist,index, field_definition,open_status, closeDialogBox }: { fieldlist:field_definition[],index:number, field_definition:field_definition,open_status: boolean, closeDialogBox: () => void }) {
    console.log("open dialog box 1, fieldlist", fieldlist, " index ",index, " fieldlist[index] ",fieldlist[index]);
    console.log("open dialog box 2, field_definition", field_definition);
    console.log("open dialog box 3, index", index);
    const { handleSubmit, register, control } = useForm(
        {
            // defaultValues:
            // {
            //     "id": fieldlist[index].id??"",
            //     //"id": "testid",
            //     //"label": "test_label", 
            //     "label": fieldlist[index].label??"",
            //     "type": fieldlist[index].type??"",
            //     "length": fieldlist[index].length??"",
            //     "required": fieldlist[index].required??false,
            // }
        }
    );

    console.log("open dialog box, field_definition", field_definition);
    console.log("open dialog box, fieldlist ", fieldlist," index ",index," fieldlist[index] ",fieldlist[index]);

    const [currentEditField, setCurrentEditField] = React.useState(fieldlist[index]);
    const updateCurrentEditField = (data: any) => {
        setCurrentEditField(data);
        fieldlist[index] = data;
        console.log(" 2 updateCurrentEditField", data, currentEditField, fieldlist[index]);
    }
    function PaperComponent(props: PaperProps) {
        return (
          <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
          >
            <Paper {...props} />
          </Draggable>
        );
      }
   
    const onSubmit = (data: any) => {
        console.log(" 1 Form submit ",data);
        // field_definition = data;
        //setCurrentEditField(data);
        updateCurrentEditField(data);
        closeDialogBox();
        console.log(" 3 onSubmit currentEditField is changed to ", currentEditField);
    };
    return (
        <Dialog open={open_status} onClose={closeDialogBox} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Edit the field</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {JSON.stringify(field_definition)}
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TableContainer >
                        <Table>
                            <TableBody>
                                {
                                    Object.entries(fieldlist[index] ?? {}).map((field_name, index) => {
                                        return (
                                            <TableRow key={index} hover >
                                                {/* <Controller
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
                                                                            value={field_name[1]}
                                                                        />
                                                                    </TableCell>
                                                                </>
                                                            }
                                                        </>
                                                    )}
                                                /> */}
                                                {(field_name[0] === "id") &&
                                                    <>
                                                        <TableCell>
                                                            {field_name[0]}
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                //defaultValue={field_name[1]}
                                                                {...register(field_name[0])}
                                                            />
                                                            <Typography>
                                                                {field_name[1]}
                                                            </Typography>
                                                        </TableCell>
                                                    </>
                                                }
                                                {(field_name[0] === "label") &&
                                                    <>
                                                        <TableCell>
                                                            {field_name[0]}
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField {...register(field_name[0])}
                                                                //defaultValue={field_name[1]}
                                                            />
                                                            <Typography>
                                                                {field_name[1]}
                                                            </Typography>
                                                        </TableCell>
                                                    </>
                                                }
                                                {(field_name[0] === "type") &&
                                                    <>
                                                        <TableCell>
                                                            {field_name[0]}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Select
                                                                //defaultValue={field_name[1]}
                                                                {...register(field_name[0])}>
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
                                                            <Select
                                                                //defaultValue={field_name[1]}
                                                                {...register(field_name[0])}>
                                                                {field_length_list.map((field_length, index) => {
                                                                    return (
                                                                        <MenuItem key={index} value={field_length}>{field_length}</MenuItem>
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
                                                            <Checkbox   {...register(field_name[0])}
                                                                defaultChecked={field_name[1] == true ? true : false}
                                                            />
                                                        </TableCell>
                                                    </>
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button type="submit">Submit</Button>
                    <Button onClick={closeDialogBox}>Cancel</Button>
                </form>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}

// using table to display the form, display table definition content, and edit the selected field
function FormTemplateEditor({ dataset, updateDataset }: { dataset: field_definition[], updateDataset: (dataset: any) => void }) {
    const [editDialogBox, setEditDialogBox] = React.useState(false);
    const [editField, setEditField] = React.useState({});
    const [editFieldIndex, setEditFieldIndex] = React.useState(0);
    const closeEditField = () => {
        setEditDialogBox(!editDialogBox);
    }
    return (
        <>
            <ShowTable
                dataset={dataset}
                depth={0}
                onEditField={(index, dataset) => {
                    console.log("Call onEditField layer 0", index, dataset, dataset[index]);
                    setEditDialogBox(!editDialogBox);
                    setEditField(dataset[index]);
                    setEditFieldIndex(index);
                    //reset();
                }
                } />
            { editDialogBox ? <EditFieldDialogBox fieldlist={dataset} index={editFieldIndex} field_definition={editField} open_status={editDialogBox} closeDialogBox={closeEditField} /> :<div/>}
        </>
    )
}

export default function customize_Form() {
    // tabId is the index of the current section in a specific table template (Click the tab to change the section)
    const [tabId, setTabId] = React.useState(0);

    // used for importted button list commponent
    const changeTab = (index: number) => {
        setTabId(index);
    }

    // templateid is the index of the current table template (Click the left side bar to change the template)
    const [templateid, setTemplateId] = React.useState(0);

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
    const table_name_list = customizedformlist.map((section: section_definition, index: number) => (
        { title: section.name, selected: index === templateid, icon: <HomeOutlined /> }
    ));

    const updateCustomizedFormList = (dataset: any) => {
        setCustomizedFormList(dataset);
        console.log("updateCustomizedFormList", dataset);
    }


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
                                    onChange={(ev: React.SyntheticEvent, value: number) => { console.log("change tab"); changeTab(value); console.log(value); setTabId(value) }} >
                                    {(customizedformlist[templateid] ?? {} as any).content.map((template, index) => (
                                        <Tab key={index} label={template.title} {...a11yProps(index)} />
                                    ))}
                                </Tabs>
                                <Button variant="solid" color="primary" startIcon={<Add />}
                                    onClick={(ev: React.SyntheticEvent) => { addTableSection(ev, initialSection); }}>
                                </Button>
                            </Box>
                            {customizedformlist[templateid].content.map((section_list, index: number) => (
                                <CustomTabPanel tabId={tabId} index={index} key={index} >
                                    <Input name="section_title" placeholder={section_list.title}
                                        defaultValue={section_list.title}
                                        sx={{ width: '200px' }}
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { editTableSectionTitle(ev); console.log({ tabId }) }} />
                                    <Button variant="solid" startIcon={<Clear />} onClick={(ev: React.SyntheticEvent) => { deleteTableSection(ev, 0); changeTab(0) }}> </Button>
                                    <br />
                                    <Button variant="solid" color="primary" startIcon={<Add />}
                                        onClick={(ev: React.SyntheticEvent) => { addTableField(ev, 0, initialField); }}>Add a field
                                    </Button>
                                    <br />
                                    <FormTemplateEditor dataset={customizedformlist[templateid].content[tabId].fields} updateDataset={updateCustomizedFormList} />
                                    {/* <ShowTree dataset={customizedformlist[templateid].content[tabId].fields} depth={0} onEditFieldCallback={(index) => { console.log("call onEditField", index); }} /> */}
                                </CustomTabPanel>
                            ))}
                        </Box>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

}