
import {RoleNum, roles } from "../roles";

export const UserDoc=(role:RoleNum,id:string)=>{
    const roleKey=roles[role].id;
    return `user groups/${roleKey}/users/${id}`;
}

// export const AgencyPath=(id:string)=>UserPath(RoleNum.Agc,id);

export const UsersAgcDataDoc=(role:RoleNum,id:string,agcId:string)=>
`${UserDoc(role,id)}/agc data/${agcId}`;

export const FormTempCol=(agcid:string)=>
`user groups/agc/users/${agcid}/forms`;

export const FormDataCol=(role:RoleNum,uid:string)=>
`user groups/${roles[role].id}/users/${uid}/form data`;

export const FormTempDoc=(agcid:string,formid:number)=>
`${FormTempCol(agcid)}/${formid}`;

export const FormDataDoc=(role:RoleNum,uid:string,formid:number)=>
`${FormDataCol(role,uid)}/${formid}`



export const FilesCol=(role:RoleNum,uid:string)=>
`user groups/${roles[role].id}/users/${uid}/files`;

export const FileDoc=(role:RoleNum,uid:string,fileColid:string)=>
`${FilesCol(role,uid)}/${fileColid}`;

