import { FormField, FormSection } from "@/utils/form/types";
import { Add, Check, Clear } from "@mui/icons-material";
import { Box, Button, Input, LinearProgress, Link, List, ListItem, Tab, Tabs, Typography } from "@mui/material";
import { MutableRefObject, Ref, useEffect, useImperativeHandle, useState } from "react";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Row } from "./row";
import TabContext from '@mui/lab/TabContext';
import { EditFieldDialogBox } from "./edit_field_dialog_box";
import LoadingButton from "@mui/lab/LoadingButton";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase/firebase_client";
import { RoleNum, roles } from "@/utils/roles";
import { useSession } from "next-auth/react";
import { formTemplates } from "@/utils/form/template";
import { Reorder } from "framer-motion";
import { FormTempDoc } from "@/utils/firebase/database_consts";

//todo: decide remove or not
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function CustomTabPanel({ index, next, setFinished, ...other }:
     { index: number, next?:number, setFinished:Function }) {
    const [tabId, setTabId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setformData] = useState<FormSection[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log("here");
            console.log(JSON.parse(localStorage.getItem(`formTemp${index}`) ??
            JSON.stringify(formTemplates[index].content)));
            setformData(JSON.parse(localStorage.getItem(`formTemp${index}`) ??
            JSON.stringify(formTemplates[index].content)) as FormSection[]);
        }
    }, [index]);
    const [editDialogBox, setEditDialogBox] = useState(false);
    const uid=useSession({required:true}).data?.user?.id!;

    const addTableSection = (event: React.SyntheticEvent) => {
        setformData([...formData, { "title": "section_title1", "fields": [] }]);
    };
    const editTableSectionTitle = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        formData[index].title = event.target.value;
        setformData([...formData]);
    };
    
    const deleteTableSection = (event: React.SyntheticEvent, index: number) => {
        formData.splice(index, 1);
        setformData([...formData]);
        setTabId(0);
    };

    const addTableField = (newValue: FormField) => {
        //To do : initialField should be a unique field id
        //formData[tabId].fields.splice(0, 0, { "id": "table_field_id1", "label": "table_field_label1", "type": "text", "required": false, "length": 'short', "options": [] });
        formData[tabId].fields.splice(0, 0, newValue);
        setformData([...formData]);
    };

    const onSave=()=>{
        localStorage.setItem(`formTemp${index}`,JSON.stringify(formData));
        setFinished();
        if(next==null)saveAllToDB();
    }
    const saveAllToDB=async()=>{
        if(loading)return;
        setLoading(true);
        await Promise.all(Array.from({length:6},(v,i)=>{
            const data=localStorage.getItem(`formTemp${i}`);
            if(data==null)return;
            return setDoc(doc(getFirestore(app),FormTempDoc(uid,i)),
            {...formTemplates[index],content:JSON.parse(data)});
        }));
        setLoading(false);
    }

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
                                console.log(section);
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
                                                    setEditDialogBox(!editDialogBox);
                                                }}>Add a field
                                            </Button>
                                            <br />
                                            <Reorder.Group axis="y" layoutScroll values={section.fields.map(v=>v.id)}
                                            onReorder={(v)=>{
                                                const newfields=Array.from(v,(id,i)=>section.fields.find(f=>f.id==id)!);
                                                formData.splice(index,1,{title:section.title,fields:newfields});
                                                setformData([...formData]);
                                            }}>
                                                {section.fields.map((row, index) => (
                                                    <Row key={JSON.stringify(row.id)} data={row} depth={0}
                                                        onEditRow={(newValue) => {
                                                            if (newValue == null) {
                                                                formData[tabId].fields.splice(index, 1);
                                                            } else {
                                                                formData[tabId].fields[index] = newValue;
                                                            }
                                                            setformData([...formData]);
                                                        }}
                                                    />
                                                ))}
                                            </Reorder.Group>
                                            {editDialogBox && <EditFieldDialogBox
                                                editField={{ "id": "table_field_id1", "label": "table_field_label1", "type": "text", "required": false, "length": 'short', "options": [] }}
                                                open_status={editDialogBox}
                                                onCloseDialogBox={() => setEditDialogBox(!editDialogBox)}                                                
                                                onSubmitDialogBox={(newValue) => {
                                                    setEditDialogBox(!editDialogBox);
                                                    addTableField(newValue);

                                                }}
                                            />}
                                        </Box>
                                    )}
                                </TabPanel>
                            })}
                        </TabContext>
                    </Box>
                </ListItem>
                <ListItem>
                    <Box display={'flex'}>
                        <Box flexGrow={1}/>
                        <LoadingButton loading={loading} variant="contained" startIcon={<Check/>}
                        onClick={onSave}
                        >{`Save ${formTemplates[index].name}`}</LoadingButton>

                        <Box width={24}/>
                        <Link component="button" variant="subtitle2" onClick={saveAllToDB}>
                            Do it later
                        </Link>
                    </Box>
                </ListItem>
            </List>
        </Box>
    );
}