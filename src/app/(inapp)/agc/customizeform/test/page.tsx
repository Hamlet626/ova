'use client'
import { useEffect } from 'react'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/system/Stack';
import {alpha, createTheme, Tabs, Tab,ThemeProvider, Typography, Button, TableContainer, TableRow,TableCell, Input} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import {Toolbar} from "@mui/material";
import {Add, Check, CheckCircle, CheckCircleOutline, Circle, CircleOutlined, Scale, TableRows} from "@mui/icons-material";
import theme from "@/components/ThemeRegistry/theme";
import {primary90,neutral96} from "@/components/ThemeRegistry/theme_consts";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from "@mui/system";
import * as form_const from "@/utils/form/consts";
import * as form_template from "@/utils/form/template";
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';import { reverse } from 'dns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import CheckIcon from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';

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

const templateList=[form_template.basic_info,
    form_template.physical_personal_trait,
    form_template.education_occupation,
    form_template.background_history,
    form_template.family_partner,
    form_template.personal_and_medical,]

// function updateObjectList(objectList:any, index:number, updatedObject:any) {
//     const updatedObjectList = [...objectList];
//     updatedObjectList[index] = updatedObject;
//     return updatedObjectList;
// }

// function deleteObjectList(objectList:any, index:number) {
//     const updatedObjectList = [...objectList];
//     updatedObjectList.splice(index, 1);
//     return updatedObjectList;
// }

// function insertObjectList(objectList:any, index:number, updatedObject:any) {
//     const updatedObjectList = [...objectList];
//     updatedObjectList.splice(index, 0, updatedObject);
//     return updatedObjectList;
// }

// function updateObjectKeyValue(object:any, key:string, value:any) {
//     const updatedObject = {...object};
//     updatedObject[key] = value;
//     return updatedObject;
// }

// function deleteObjectKeyValue(object:any, key:string) {
//     const updatedObject = {...object};
//     delete updatedObject[key];
//     return updatedObject;
// }

// function insertObjectKeyValue(object:any, key:string, value:any) {
//     const updatedObject = {...object};
//     updatedObject[key] = value;
//     return updatedObject;
// }

// let testlist=[1,2,3,4,5,{"name":"test name"}]

// console.log(updateObjectList(testlist, 2, {name: "update object name"}));
// console.log(deleteObjectList(testlist, 2));
// console.log(insertObjectList(testlist, testlist.length, {name: "insert object"}));
//console.log(testlist)
// console.log(updateObjectKeyValue(testlist[5], "name", "update object key value"))
// console.log(updateObjectList(testlist, 5, updateObjectKeyValue(testlist[5], "name", "update object key value")))
// console.log(updateObjectKeyValue(testlist[5], "name2", "2update object key value"))
// console.log(updateObjectList(testlist, 5, updateObjectKeyValue(testlist[5], "name2", "2update object key value")))


export default function customize_Form() {
    const [tabId, setTabId] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabId(newValue);
    };
    const [templateid, setTemplateId] = React.useState(0);
    const handleTemplateChange = (event: React.SyntheticEvent, newValue: number) => {
        setTemplateId(newValue);
        handleChange(event, 0);
    };

    // Default value of a new section
    const initialSection = {"title": "section_title1", "fields": []};

    // Default value of a new field
    const initialField = {"id": "field_id1", "label": "field_label1", "type": "text", "required": false, "length": 0, "options": [], "sub": []};

    // Initial customized form list using deep copy
    const [customizedformlist, setCustomizedFormList] = React.useState(JSON.parse(JSON.stringify(templateList)));//React.useState([...templateList]);


    const addTableSection = (event: React.SyntheticEvent, newValue:any) => { 
        // Add a new section to customized sectionlist
        customizedformlist[templateid].content=[...customizedformlist[templateid].content,newValue]
        // Set customized sectionlist and render the page
        setCustomizedFormList([...customizedformlist]);
        //console.log('add section',customizedformlist[templateid]);
    };

    const deleteTableSection = (event: React.SyntheticEvent, index:number) => {
        // Delete a section from customized sectionlist
        customizedformlist[templateid].content.splice(index, 1);
        // If customized sectionlist is empty, add a new section to customized sectionlist
        if (customizedformlist[templateid].content.length === 0) {
            customizedformlist[templateid].content.push(initialSection);
        }
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

    const addTableField = (event: React.SyntheticEvent, index:number, newValue:any) => {
        // Add a new field to customized sectionlist
        customizedformlist[templateid].content[tabId].fields.splice(index, 0, newValue);
        // Set customized sectionlist and render the page
        setCustomizedFormList([...customizedformlist]);
        //console.log(customizedformlist[templateid].content[tabId]);
    };

    const deleteTableField = (event: React.SyntheticEvent, index:number) => {       
        // Delete a field from customized sectionlist
        customizedformlist[templateid].content[tabId].fields.splice(index, 1);
        // Set customized sectionlist and render the page
        setCustomizedFormList([...customizedformlist]);
        //console.log(customizedformlist[templateid].content[tabId]);
    }

    const editTableField = (event: React.ChangeEvent<HTMLInputElement>, index:number) => {
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
                height:'941px',
                backgroundColor: 'white',
                mt:'-25px',
                boxShadow:'8px,22px,75px,2px,rgba(92, 104, 126, 0.12)',
            }}>
                <Typography variant="h4" sx={{fontFamily: 'roboto.style.fontFamily',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    letterSpacing: '0.15',
                    mt:'71px',
                    ml:'80px',
                    width:'57px',
                    height:'24px',
                }}>
                    Sign Up
                </Typography>
                <Typography sx={{fontFamily: 'roboto.style.fontFamily',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '32px',
                    mt:'38px',
                    ml:'80px',
                    width:'169px',
                    height:'32px',
                }}>
                    Create Form
                </Typography>
                <List sx={{
                    mt:"16px",
                    ml:"80px",
                    width:'197px',
                    height:'auto',
                    gap:'12px',
                }}>
                    {customizedformlist.map((template, index) => (
                    < div key={index} >
                        <ListItem disablePadding
                                  onClick={(ev:React.SyntheticEvent)=>{handleTemplateChange(ev,index);;}}>
                            <ListItemButton sx={{
                                borderRadius: '100px',
                                backgroundColor: index === templateid ? primary90: "white",
                                width:'93px',
                            }}>
                                <ListItemIcon sx={{
                                    width:'20px',
                                    height:'20px',
                                }}>
                                    <Circle sx={{color:primary90}}/>
                                </ListItemIcon>
                                <ListItemText primary={template.name}   sx={{
                                    ml:'-20px',
                                    color:'black',
                                }}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </div>
                    ))}

                </List>
            </Box>
            <Box sx={{ width: '100%',}}>
                <List sx={{
                    mt:"81px",
                    ml:"85px",
                    width:'auto',
                    height:'auto',
                    gap:'12px',
                }}>
                    <ListItem disablePadding>
                        <LinearProgress sx={{
                            width:'869px',
                            height:'4px',
                        }}/>
                    </ListItem>
                    <ListItem disablePadding>
                        <Typography variant="h5" sx={{color:'#926F63',
                            width:'206px',
                            height:'36px'
                        }}>
                            Customize Form
                        </Typography>
                    </ListItem>
                    <ListItem disablePadding>
                        <Typography variant="h6">
                            Create the question you want to ask
                        </Typography>                       
                    </ListItem>
                    {/* <ListItem disablePadding>
                        <Box sx={{display:'flex',
                            width:'896px',
                            alignItems:'center',
                            justifyContent:'space-between',
                            borderRadius:'28px',
                            backgroundColor:neutral96,
                            }}>
                            <Box sx={{display:'flex',
                            alignItems:'center',
                            justifyContent:'left',                        
                            }}>
                                <ReceiptLongSharpIcon sx={{color:primary90,justifySelf:'left',gap:'10px',margin:'10px'}}/>
                                <Typography sx={{justifySelf:'left'}}>
                                    {templateList[templateid].name}
                                </Typography>
                            </Box>
                            <Button startIcon ={<Add sx={{width:'18px',height:'18px'}}/>} 
                                    onClick={(ev:React.SyntheticEvent)=>{handleCustomizedFormChange(ev,initialSection);}}
                                    sx={{justifySelf:'right',
                                    border:'solid 1px',
                                    gap:'8px',
                                    margin:'10px', 
                                    borderRadius:'100px',
                                    color:'#926F63',}} >
                                Add a new section
                            </Button>
                        </Box>
                    </ListItem> */}
                    <ListItem disablePadding>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex'}}>
                                <Tabs value={tabId} 
                                    onChange={(ev:React.SyntheticEvent,value)=>{console.log("change tab");handleChange(ev,value);console.log(value)}} >
                                    {(customizedformlist[templateid]as any).content.map((template, index) => (
                                        <Tab key={index} label={template.title} {...a11yProps(index)} />
                                    ))}
                                </Tabs>
                                <Button variant="solid" color="primary" startIcon={<Add/>}
                                    onClick={(ev:React.SyntheticEvent)=>{addTableSection(ev,initialSection);}}>
                                </Button>
                            </Box>
                            {customizedformlist[templateid].content.map((section_list, index) => (
                                <CustomTabPanel tabId={tabId} index={index} key={index} >
                                    <Input placeholder={section_list.title} 
                                        defaultValue={section_list.title} 
                                        sx={{width:'200px'}} 
                                        onChange={(ev:React.ChangeEvent<HTMLInputElement>)=>{editTableSectionTitle(ev);console.log({tabId})}}/>
                                    <Button variant="solid" startIcon={<Clear/>} onClick={(ev:React.SyntheticEvent)=>{deleteTableSection(ev,0);handleTemplateChange(ev,0)}}> </Button>
                                    {/* <Button variant="solid" startIcon={<Check/>}  > </Button> */}
                                    <br/>
                                    <br/>
                                    <Button variant="solid" color="primary" startIcon={<Add/>}
                                        onClick={(ev:React.SyntheticEvent)=>{addTableField(ev,0,initialField);}}>Add a field
                                    </Button>
                                    <TableContainer>
                                        <Table>
                                            <TableBody>
                                                {(section_list.fields as any).map((field, index) => (                                        
                                                    <TableRow key={index} hover>
                                                        <TableCell>{JSON.stringify(field.id)}</TableCell>
                                                        <TableCell>{JSON.stringify(field.label)}</TableCell>
                                                        <TableCell>{JSON.stringify(field.type)}</TableCell>
                                                        <TableCell>{JSON.stringify(field.required)}</TableCell>
                                                        <TableCell>{JSON.stringify(field.length)}</TableCell>
                                                        <TableCell>{JSON.stringify(field.options)}</TableCell>
                                                        <TableCell>{JSON.stringify(field.sub)}</TableCell> 
                                                        {/* <TableCell>
                                                            <Input placeholder={field.label} 
                                                                defaultValue={field.label} 
                                                                sx={{width:'200px'}} 
                                                                onChange={(ev:React.ChangeEvent<HTMLInputElement>)=>{editTableField(ev,index);console.log({tabId})}}/>
                                                        </TableCell>    */}
                                                        <TableCell>
                                                            <Button variant="solid" startIcon={<DeleteRoundedIcon/>} onClick={(ev:React.SyntheticEvent)=>{deleteTableField(ev,index);}}> </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <br/>
                                    
                                </CustomTabPanel>
                            ))}
                        </Box>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

}