'use client'
import { useState } from "react";
import FormTitlesUI from "../../../../../../../components/form_titles_ui";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase/firebase_client";
import { formTemplates } from "@/utils/form/template";
import { formFinished } from "@/utils/form/utils";

export default function EDFormTitles({pathPrefix,formid,edid,data}:{pathPrefix:string,formid:string,edid:string,data:any[]}) {
    
    const [selectedInd,setSelectedInd]=useState(Number(formid));

    let titles=formTemplates.map((v,i)=>({title:v.name,selected:selectedInd===i,
    check:formFinished(data[i],v),
    dot:(localStorage.getItem(`form${formid}`)??'{}')==='{}'}));

    // [{title:'Basic Information'},
    // {title:'physical & personal trait'},
    // {title:'education & occupation'},
    // {title:'background history'},
    // {title:'family & partner'},
    // {title:'personal & medical'}];

    // titles[selectedInd].selected=true;
    // titles=titles.map((v,i)=>({...v,href:`${pathPrefix}/${i}`}));

    return(
            <FormTitlesUI titles={titles} 
            onClick={(t,i)=>{
                if(selectedInd===i)return;
                        // await onClick(titles[index],index); 
                        const formData=localStorage.getItem(`form${selectedInd}`);
                        if(formData)
                        setDoc(doc(getFirestore(app),`user groups/ed/users/${edid}/form data/${i}`),JSON.parse(formData),{merge:true});
                        setSelectedInd(i);
            }}/>
    );
}