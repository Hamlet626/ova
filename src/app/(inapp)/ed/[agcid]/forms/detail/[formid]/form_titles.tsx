'use client'
import { useEffect, useState } from "react";
import FormTitlesUI from "../../../../../../../components/form_titles_ui";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase/firebase_client";
import { formTemplates } from "@/utils/form/template";
import { formFinished } from "@/utils/form/utils";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function EDFormTitles({pathPrefix,formid,edid,data}:{pathPrefix:string,formid:string,edid:string,data:any[]}) {

    let titles=formTemplates.map((v,i)=>({
        title:v.name,selected:Number(formid)===i,
        href:`${pathPrefix}/${i}`,
        check:formFinished(data[i],v),
        dot: Object.keys(data[i]??{}).length===0 }));

    return (<FormTitlesUI titles={titles}/>);
}