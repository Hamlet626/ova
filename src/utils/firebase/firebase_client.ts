// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";
import { EDListDoc, EDListsCol, FileDoc, FilesCol, FormDataDoc, FormTempDoc, UserDoc, UsersAgcDataDoc } from "./path";
import { RoleNum } from "../roles";
import { FileColConverter } from "./types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "..",
    authDomain: "...firebaseapp.com",
    projectId: "..",
    storageBucket: "...appspot.com",
    messagingSenderId: "..",
    appId: "..",
    measurementId: "G-.."
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth as cliAuth }


export const UserRef=(role:RoleNum,id:string)=>{
    return doc(getFirestore(app),UserDoc(role,id));
}

export const AgencyRef=(id:string)=>UserRef(RoleNum.Agc,id);

export const UsersAgcDataRef=(role:RoleNum,id:string,agcId:string)=>doc(getFirestore(app),UsersAgcDataDoc(role,id,agcId));

export const FormTempRef=(uid:string,i:number)=>doc(getFirestore(app),FormTempDoc(uid,i));

export const FormDataRef=(role:RoleNum,uid:string,formid:number)=>doc(getFirestore(app),FormDataDoc(role,uid,formid));

export const FilesRef=(role:RoleNum,uid:string)=>collection(getFirestore(app),FilesCol(role,uid)).withConverter(FileColConverter);
export const FileRef=(role:RoleNum,uid:string,fileColId:string)=>doc(getFirestore(app),FileDoc(role,uid,fileColId)).withConverter(FileColConverter);

export const EDListsRef=(uid:string)=>collection(getFirestore(app),EDListsCol(uid));
export const EDListRef=(uid:string,listid:string)=>doc(getFirestore(app),EDListDoc(uid,listid));
