'use client'
import { useEffect } from 'react'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/system/Stack';
import {alpha, createTheme, Tabs, Tab,ThemeProvider, Typography} from "@mui/material";
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
import {CheckCircle, CheckCircleOutline, Circle, CircleOutlined} from "@mui/icons-material";
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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
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
    form_template.personal_and_medical,
    form_template.other_clinic_questions,]

export default function customize_Form() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [templateId, setTemplateId] = React.useState(0);
    const handleTemplateChange = (event: React.SyntheticEvent, newValue: number) => {
        setTemplateId(newValue);
        handleChange(event, 0);
    };

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
                    {['Basic Information', 'Family & Others', 'Personal Medical', 'Other A', 'Other B'].map((text, index) => (
                        < >
                            <ListItem key={text}  templateId={templateId} disablePadding
                                      onClick={(ev:React.SyntheticEvent)=>{handleTemplateChange(ev,index);;}}>
                                <ListItemButton sx={{
                                    borderRadius: '100px',
                                    backgroundColor: index === templateId ? primary90: "white",
                                    width:'93px',
                                }}>
                                    <ListItemIcon sx={{
                                        width:'20px',
                                        height:'20px',
                                    }}>
                                        {/* {index === templateId ? < CheckCircleOutline sx={{color:'primary.main'}}/> : <Circle sx={{color:primary90}}/>} */}
                                        <Circle sx={{color:primary90}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={text}   sx={{
                                        ml:'-20px',
                                        color:'black',
                                    }}/>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </>
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
                        <Typography variant="h6" sx={{

                        }}>
                            Create the question you want to ask
                        </Typography>
                    </ListItem>
                    <ListItem disablePadding>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Item One" {...a11yProps(0)} />
                                    <Tab label="Item Two" {...a11yProps(1)} />
                                    <Tab label="Item Three" {...a11yProps(2)} />
                                </Tabs> */}
                                <Tabs value={value} onChange={handleChange} >
                                    {(templateList[templateId]as any).content.map((template, index) => (
                                        <Tab label={template.title} {...a11yProps(index)} />
                                    ))}
                                </Tabs>
                            </Box>

                            {templateList[templateId].content.map((section_list, index) => (
                                <CustomTabPanel value={value} index={index}>

                                    tab id {value}
                                    <br/>
                                    {(section_list.fields as any).map((item, index) => (
                                        <>
                                            {JSON.stringify(item.id)}
                                            {JSON.stringify(item.label)}
                                            <br/>
                                        </>
                                    ))}
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