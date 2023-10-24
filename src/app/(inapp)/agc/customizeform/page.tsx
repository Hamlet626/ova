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
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import AddIcon from '@mui/icons-material/Add';
import { FormTemp, FormSection, FormField } from '@/utils/form/template';
import { CustomTabPanel } from './custom_tab_panel';
import { useRef } from 'react';
const formTemplates = form_template.formTemplates;

export default function customize_Form() {
    const [templateid, setTemplateId] = React.useState(0); 
    const saveFormRef=useRef(null);

    // To do : check status
    const [formStates, setformStates] = React.useState(Array.from({length:6},
        (v,i)=>localStorage.getItem(`formTemp${i}`)!=null));
    const table_name_list = formTemplates.map((section: FormTemp, index: number) => (
        { title: section.name, selected: index === templateid, check:formStates[index], icon: <HomeOutlined /> }
    ));

    const nextUnfinished=formStates.slice(templateid+1).findIndex((v,i,l)=>!v);
    const unfinished=formStates.findIndex((v,i,l)=>!v);
    
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
                        (t, i) => setTemplateId(i)
                    } />
                </Box>
            </Box>
            <CustomTabPanel index={templateid} key={templateid}
            saveRef={saveFormRef}
            next={nextUnfinished===-1?unfinished===-1?undefined:unfinished:nextUnfinished} 
            setFinished={()=>{formStates[templateid]=true;setformStates([...formStates])}}/>
        </Box>
    );

}