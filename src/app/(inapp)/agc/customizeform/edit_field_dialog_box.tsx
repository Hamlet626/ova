
import { Tabs, Tab, Typography, Button, TableContainer, TableRow, TableCell, Input, IconButton, Collapse, PaperProps, Paper } from "@mui/material";
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
import { useState } from "react";
import Draggable from "react-draggable";
import { FormField } from "@/utils/form/types";

const field_type_list = ['text', 'multi-select', 'date', 'address', 'name', "yes/no", "checkbox", "number", 'populate']
const field_length_list = ["short", "medium", "long"]


export function EditFieldDialogBox({ editField, open_status, onCloseDialogBox, onSubmitDialogBox }: { editField: FormField, open_status: boolean, onCloseDialogBox: () => void, onSubmitDialogBox: (field: FormField) => void }) {
    const { handleSubmit, register, control } = useForm(
    );

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

    const onSubmit = (data:any) => {
        onSubmitDialogBox(data);
    };

    return (
        <Dialog open={open_status} onClose={onCloseDialogBox} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Edit the field</DialogTitle>
            <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TableContainer >
                        <Table>
                            <TableBody>
                                {
                                    Object.entries(editField ?? {}).map((field_name, index) => {
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
                                                                defaultValue={field_name[1]}
                                                                {...register(field_name[0])}
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
                                                            <TextField {...register(field_name[0])}
                                                                defaultValue={field_name[1]}
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
                                                            <Select
                                                                defaultValue={field_name[1]}
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
                                                                defaultValue={field_name[1]}
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
                    <Button onClick={onCloseDialogBox}>Cancel</Button>
                </form>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}