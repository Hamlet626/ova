'use client'
import { useState } from "react";
import FormTitlesUI from "../../../../../../../components/form_titles_ui";

export default function EDFormTitles() {
    const primary90='#FFDBCE';
    const [selectedInd,setSelectedInd]=useState(0);

    const titles=[{title:'Basic Information',selected:true},
    {title:'physical & personal trait',check:true},
    {title:'education & occupation',selected:true},
    {title:'background history',check:true},
    {title:'family & partner',selected:true},
    {title:'personal & medical',check:true},
];

    return(
            <FormTitlesUI titles={titles} onClick={(t,i)=>{
                if(selectedInd===i)return;
                        // await onClick(titles[index],index); 
                        setSelectedInd(i);
            }}/>
    );
}