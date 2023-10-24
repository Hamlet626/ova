import { FormField, FormSection, formTemplates } from "@/utils/form/template";
import { Add, Clear } from "@mui/icons-material";
import { Box, Button, Input, LinearProgress, List, ListItem, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Row } from "./row";
import TabContext from '@mui/lab/TabContext';
import { EditFieldDialogBox } from "./edit_field_dialog_box";

//todo: decide remove or not
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export function CustomTabPanel({ index, ...other }: { index: number; }) {
    const [tabId, setTabId] = useState(0);
    //??
    const [formData, setformData] = useState(JSON.parse(localStorage.getItem(`formData${index}`) ??
        JSON.stringify(formTemplates[index].content)) as FormSection[]);

    const [editDialogBox, setEditDialogBox] = useState(false);

    const addTableSection = (event: React.SyntheticEvent) => {
        setformData([...formData, { "title": "section_title1", "fields": [] }]);
    };
    const editTableSectionTitle = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        // Edit the title of a section
        formData[index].title = event.target.value;
        // Set customized sectionlist and render the page
        setformData([...formData]);
        //console.log(customizedformlist[templateid].content[tabId]);
    };

    const deleteTableSection = (event: React.SyntheticEvent, index: number) => {
        formData.splice(index, 1);
        setformData([...formData]);
        setTabId(0);
    };

    const addTableField = (newValue:FormField) => {
        //To do : initialField should be a unique field id
        //formData[tabId].fields.splice(0, 0, { "id": "table_field_id1", "label": "table_field_label1", "type": "text", "required": false, "length": 'short', "options": [] });
        formData[tabId].fields.splice(0, 0,newValue);
        setformData([...formData]);
    };

    return (
        <Box sx={{ width: '100%', }}>
            <List sx={{
                mt: "81px",
                ml: "85px",
                width: 'auto',
                height: 'auto',
                gap: '12px',
            }}>
                <ListItem disablePadding>
                    <LinearProgress value={100} sx={{
                        width: '869px',
                        height: '4px',
                    }} />
                </ListItem>
                <ListItem disablePadding>
                    <Box sx={{ width: '100%' }}>
                        <TabContext value={`${tabId}`}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
                                <TabList
                                    onChange={(ev: React.SyntheticEvent, value: number) => { setTabId(value); }} >
                                    {formData.map((template, index) => (
                                        <Tab key={index} label={template.title} value={`${index}`}
                                            {...a11yProps(index)} />
                                    ))}
                                </TabList>
                                <Button variant="solid" color="primary" startIcon={<Add />}
                                    onClick={(ev: React.SyntheticEvent) => { addTableSection(ev); }}>
                                </Button>
                            </Box>
                            {formData.map((section, index: number) => {
                                return <TabPanel value={`${index}`} key={index}>
                                    {(
                                        <Box sx={{ p: 3 }}>
                                            <Input name="section_title" placeholder={section.title}
                                                defaultValue={section.title}
                                                sx={{ width: '200px' }}
                                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { editTableSectionTitle(ev, index); }} />
                                            <Button variant="solid" startIcon={<Clear />} onClick={(ev: React.SyntheticEvent) => { deleteTableSection(ev, index); }}> </Button>
                                            <br />
                                            <Button variant="solid" color="primary" startIcon={<Add />}
                                                onClick={(ev: React.SyntheticEvent) => {
                                                    //addTableField(ev);
                                                    setEditDialogBox(!editDialogBox);
                                                }}>Add a field
                                            </Button>
                                            <br />
                                            <List>
                                                {section.fields.map((row, index) => (
                                                    <Row key={JSON.stringify(row.id)} data={row} depth={0}
                                                        editRow={(newValue) => {
                                                            if (newValue == null) {
                                                                formData[tabId].fields.splice(index, 1);
                                                            } else {
                                                                formData[tabId].fields[index] = newValue;
                                                            }
                                                            setformData([...formData]);
                                                        }}
                                                    //deleteRow={(index) => { dataset.splice(index, 1); }}
                                                    // updateRow={(index, newValue) => { dataset[index] = newValue }} 
                                                    />
                                                ))}
                                            </List>
                                            {editDialogBox && <EditFieldDialogBox
                                                editField={{ "id": "table_field_id1", "label": "table_field_label1", "type": "text", "required": false, "length": 'short', "options": [] }}
                                                open_status={editDialogBox}
                                                onCloseDialogBox={() => setEditDialogBox(!editDialogBox)}
                                                //onSubmitDialogBox={(newValue) => { setEditDialogBox(!editDialogBox); editRow(newValue) }}
                                                onSubmitDialogBox={(newValue) => {
                                                    setEditDialogBox(!editDialogBox);
                                                    // if (edtiFieldType) { // edit field itself
                                                    //     const result = JSON.parse(JSON.stringify(newValue));
                                                    //     result.sub = JSON.parse(JSON.stringify(data.sub || []));
                                                    //     editRow(result);
                                                    // }
                                                    // else { // add subfield
                                                    //     const result = JSON.parse(JSON.stringify(data));
                                                    //     result.sub = result.sub || [];
                                                    //     result.sub.push(newValue);
                                                    //     editRow(result);
                                                    // }
                                                    addTableField(newValue);
                                                    console.log("add a field to a section");
                                                }}
                                            />}

                                        </Box>
                                    )}
                                </TabPanel>
                            })}
                        </TabContext>
                    </Box>
                </ListItem>
            </List>
        </Box>
    );
}