'use client'
import { useState } from "react";
import FormTitlesUI from "../../../../../../../components/form_titles_ui";

export default function EDFormTitles() {
    const primary90='#FFDBCE';
    const [selectedInd,setSelectedInd]=useState(0);

    const titles=[{title:'test0',selected:true},{title:'test1',check:true}];

    return(
            <FormTitlesUI titles={titles} onClick={(t,i)=>{
                if(selectedInd===i)return;
                        // await onClick(titles[index],index); 
                        setSelectedInd(i);
            }}/>
    );
}