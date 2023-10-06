'use client'
import { useState } from "react";
import FormTitlesUI from "../../../../../../../components/form_titles_ui";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export default function EDFormTitles({pathPrefix,formid}:{pathPrefix:string,formid:string}) {
    const primary90='#FFDBCE';
    const [selectedInd,setSelectedInd]=useState(0);

    let titles=[{title:'Basic Information'},
    {title:'physical & personal trait'},
    {title:'education & occupation'},
    {title:'background history'},
    {title:'family & partner'},
    {title:'personal & medical'}];

    titles[Number(formid)].selected=true;
    titles=titles.map((v,i)=>({...v,href:`${pathPrefix}/${i}`}));

    return(
            <FormTitlesUI titles={titles} 
            onClick={(t,i)=>{
                if(selectedInd===i)return;
                        // await onClick(titles[index],index); 
                        const formData=localStorage.getItem(`${selectedInd}`);
                        if(formData)
                        setDoc(doc(getFirestore(),`${pathPrefix}/${i}`),JSON.parse(formData),{merge:true});
                        setSelectedInd(i);
            }}/>
    );
}