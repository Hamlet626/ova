import {
    educationLevels,
    eyeColors,
    hairColors,
    languages,
    maritalStatuses, relationships,
    sexualOrientations,
    skinColors, usStatuses, race,
    languageFluency, drugs
} from "@/utils/form/consts";



const basic_info={
    name:"basic info",
    content:[
        {
            title:"basic info",
            fields:[
                {id:"s0",label:"First Name",type:"text",length:"short",required:true},
                {id:"s1",label:"Middle Name",type:"text",length:"short",required:false},
                {id:"s2",label:"Last Name",type:"text",length:"short",required:true},
                {
                    id: "s3",
                    label: "Address",
                    type: "address",
                    required: true
                },
                {
                    id: "s4",
                    label: "Email",
                    type: "text",
                    length: "medium",
                    required: true
                },
                {
                    id: "s5",
                    label: "Phone",
                    type: "text",
                    length: "short",
                    required: true
                },
                {
                    id: "s6",
                    label: "Birthday",
                    type: "date",
                    required: true
                }
            ]
        },
        {
            title: "Nationality and Legal Status",
            fields: [
                {
                    id: "s13",
                    label: "Nationality",
                    type: "text",
                    length: "short",
                    required: true,
                    sub: [
                        {
                            id: "s0",
                            exCondition: ["US"],
                            label: "Are you in US?",
                            type: "yes/no",
                            required: true,
                            sub:[
                                {
                                    id: "s0",
                                    condition:["yes"],
                                    label: "Status in the US",
                                    type: "multi-select",
                                    options: usStatuses,
                                    required: true
                                },
                                {
                                    id: "s1",
                                    condition:["yes"],
                                    label: "Last 4 digits of SSN",
                                    type: "number",
                                    required: true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: "Ethnicity",
            fields: [
                {
                    id: "s15",
                    label: "Ethnicity",
                    type: "multi-select",
                    options: ["Native American"],
                    required: true,
                    sub:[
                        {
                            id: "s16",
                            condition:["Native American"],
                            label: "Native American",
                            type: "yes/no",
                            length: "short",
                            required: false
                        }
                    ]
                },
            ]
        },
        {
            title: "Language",
            fields: [
                {
                    id: "s17",
                    label: "Languages Spoken",
                    type: "populate",
                    group: [
                        {
                            id: "s0",
                            label: "Languages Spoken",
                            type: "multi-select",
                            options: languages,
                            required: true
                        },
                        {
                            id: "s1",
                            label: "Fluency",
                            type: "multi-select",
                            options: languageFluency, //todo: complete
                            default: "Fluent",
                            required: true
                        }
                    ],
                    required: true
                }
            ]
        }
    ]
};

const physical_personal_trait={
    name:"physical & personal trait",
    content:[
        {
            title: "physical characteristics",
            fields: [
                {
                    id: "s0",
                    label: "Blood Type",
                    type: "text",
                    length: "short",
                    required: true
                },
                {
                    id: "s4",
                    label: "Eye Color",
                    type: "text",
                    length: "short",
                    required: true
                },
                {
                    id: "s5",
                    label: "Hair Color",
                    type: "multi-select",
                    options: hairColors,
                    required: true
                },
                {
                    id: "s6",
                    label: "Skin Color",
                    type: "multi-select",
                    options: skinColors,
                    required: true
                },
                {//todo
                    id: "s7",
                    label: "Height (in Inches)",
                    type: "text",
                    length: "short",
                    required: true
                },
                {//todo
                    id: "s8",
                    label: "Weight (in lbs)",
                    type: "number",
                    required: true
                },
                {
                    id: "s9",
                    label: "Eyes Condition",
                    type: "multi-select",
                    options: eyeColors,
                    required: false
                },
                {
                    id: "s10",
                    label: "Double Eyelid",
                    type: "yes/no",
                    length: "short",
                    required: false
                }
            ]
        },
        {
            title: "Personal Information",
            fields: [
                {
                    id: "s11",
                    label: "Sexual Orientation",
                    type: "multi-select",
                    options: sexualOrientations,
                    required: true
                },

            ]
        },
    ]
};

const education_occupation={
    name:"education & occupation",
    content:[
        {
            title:"Education",
            fields:[
                {
                    id: "s0",
                    label: "What's your highest level of education?",
                    type: "multi-select",
                    options: educationLevels,
                    required: true,
                    sub:[//todo:
                        {
                            id: "s0",
                            condition: race,
                            label: "School Name",
                            type: "text",
                            length: "medium",
                            required: true
                        },
                        {
                            id: "s1",
                            condition: race,
                            label: "GPA",
                            type: "number",
                            required: true
                        },
                        {
                            id: "s2",
                            condition: race,
                            label: "Major",
                            type: "test",
                            length: "medium",
                            required: true
                        },
                        {
                            id: "s3",
                            condition: race,
                            label: "Are you currently in this school",
                            type: "yes/no",
                            required: true
                        },
                    ]
                }
            ]
        }
    ]
};

const background_history={
    name:"background history",
    content: [
        {
            fields: [

                {
                    id: "s0",
                    label: "Please fill in your background history if any",
                    type: "text",
                    length: "long",
                    required: false
                },
                personal_and_medical
            ],

        }
    ]
};

const family_partner={
    name:"family & partner",
    content:[
        {
            id: "s0",
            label: "Marital Status",
            type: "multi-select",
            options: maritalStatuses,
            required: true,
            sub: personData("partner",
                {
                    addDobAddr:true,
                    addProp:{condition:["Married", "Separated"]}})
        },
        {
            id: "s1",
            label: "Emergency Contacts",
            type: "populate",
            group:[
                ...personData("Emergency Contacts",{
                    addRelation:true
                })
            ]
        }
    ]
};

function assign_IDs(content) {
    let count = 0;
    const copyContent = JSON.parse(JSON.stringify(content));
    const assign = (fields) => {
        for (let field of fields) {
            field.id = "s" + count++;
            if (field.sub) {
                assign(field.sub);
            }
        }
    };
    assign(copyContent);
    return copyContent;
}




const personal_and_medical = {
    name: "personal & medical",
    content: [
        {
            title: "Maternal and Reproductive",
            fields: [
                {
                    id: "s",
                    label: "Have both ovaries",
                    type: "yes/no",
                    length: "short",
                    require: true
                },
                {
                    id: "s",
                    label: "Currently on menstruation?",
                    type: "yes/no",
                    length: "short",
                    require: true,
                    sub: [
                        {
                            id: "s",
                            condition: ["no"],
                            label: "When was your last menstruation?",
                            type: "date",
                            require: true
                        }
                    ]
                },
                {
                    id: "s",
                    label: "Sexual intercourse",
                    type: "date",
                    require: true
                },
                {
                    id: "s",
                    label: "Ever been turned down to be a blood donor",
                    type: "yes/no",
                    length: "short",
                    require: true,
                    sub: [
                        {
                            id: "s",
                            condition: ["yes"],
                            label: "Please describe the reason for been turned down",
                            type: "text",
                            length: "long",
                            require: true
                        }
                    ]
                },
                {//todo: optimize logic, discuss with Hamlet
                    id: "s",
                    label: "Have you ever applied or been screened (Previous Egg Donation?)",
                    type: "yes/no",
                    length: "short",
                    require: true,
                    sub: [
                        {
                            id: "s",
                            label: "Number of times you donated",
                            condition: ["yes"],
                            type: "number",
                            require: true
                        },
                        {
                            id: "s",
                            label: "Where did you apply? Did you have any testing or complete a donation?",
                            type: "text",
                            length: "long",
                            condition: ["yes"],
                            require: true
                        },
                        {
                            id: "s",
                            label: "Number of completed egg donation cycles that have resulted in a pregnancy?",
                            condition: ["yes"],
                            type: "number",
                            require: true
                        }
                    ]
                },
                {
                    id: "s",
                    label: "Pregnancy?",
                    type: "yes/no",
                    length: "short",
                    require: true,
                    sub: [
                        {
                            id: "s",
                            label: "Please selection the following that applies to your previous pregnancy(ies)",
                            require: true,
                            condition: ["yes"],
                            type: "multi-select",
                            options: [
                                "Miscarriage",
                                "Abortion",
                                "Gestational sac (GS)",
                                "Vaginal delivery",
                                "C-section",
                                "Have children",
                                "Currently Pregnant or breast feeding"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: "qs1",
            fields: [
                {
                    id: "s",
                    label: "Have you had any birth control before?",
                    type: "yes/no",
                    length: "short",
                    require: true,
                    sub: [
                        {
                            id: 's',
                            label: "please list type (i.e. IUD (which type), Birth Control Pills, Depo Provera",
                            type: "text",
                            length: "long",
                            condition: ["yes"],
                            require: true
                        }
                    ]
                },
                {
                    id: "s",
                    label: "Please select the following options if any of which applied to you.",
                    require: false,
                    type: "multi-select",
                    options: [
                        "Tattoo",
                        "Piercing",
                        "Adopted"
                    ]
                }
            ]
        },
        {
            title: "Medical Symptom",
            fields: [
                {
                    id: "s",
                    label: "Have you taken Depo Provera in the last 6 months",
                    require: true,
                    type: "yes/no",
                    length: "short"
                },
                {
                    id: "s",
                    label: "Do you have Implanon/Nexplanon implants?",
                    require: true,
                    type: "yes/no",
                    length: "short"
                },
                {
                    id: "s",
                    label: "Please select any recreational or illicit drugs you have used for non-medical reasons",
                    require: false,
                    type: "multi-select",
                    options: drugs,
                    return: options_selected,
                    sub: [
                        {
                            id: "s",
                            condition: options_selected,
                            label: `When did you last use ${options_selected}?`
                        }
                    ]
                },
                {
                    id: "s",
                    label: "Have you injected drugs for a non-medical reason in the preceding five years, including intravenous, intramuscular, or subcutaneous injections?",
                    require: true,
                    type: "yes/no",
                    length: "short"
                },
                {
                    id: "s",
                    label: "Have you ever been told by a medical doctor that you were infertile and /or conceived with fertility treatments?",
                    require: true,
                    type: "yes/no",
                    length: "short"
                },
                {
                    id: "s",
                    label: "Please lists your allergies",
                    require: false,
                    type: "text",
                    length: "long"
                },
                {
                    id: "s",
                    label: "Do you have irregular period?",
                    require: true,
                    type: "yes/no",
                    length: "short"
                },
                {
                    id: "s",
                    label: "Do you have abnormal pap?",
                    require: true,
                    type: "yes/no",
                    length: "short"
                },
                {
                    id: "s",
                    label: "Do you have any cancer?",
                    require: true,
                    type: "yes/no",
                    length: "short",
                    sub: [
                        {
                            id: "s",
                            condition: "yes",
                            label: "Please describe your cancer symptom.",
                            type: "text",
                            length: "medium",
                            require: true
                        }
                    ]
                },
                {
                    id: "s",
                    label: "Have you had any other medical problems?",
                    require: true,
                    type: "yes/no",
                    length: "short",
                    sub: [
                        {
                            id: "s",
                            label: "Please elaborate on your medical problems.",
                            condition: "yes",
                            type: "text",
                            length: "long",
                            require: true
                        }
                    ]
                },
                {
                    id: "s",
                    label: "Have you ever used medications such as anti-anxiety or anti-depressants to treat an emotional or psychological problem?",
                    require: true,
                    type: "yes/no",
                    length: "short",
                    sub: [
                        {
                            id: "s",
                            label: "When did you use those drugs?",
                            condition: "yes",
                            require: true,
                            type: "multi-select",
                            options: [
                                "Currently Using",
                                "Past 6 months",
                                "7-12 months",
                                "1-2 years",
                                ">2 years"
                            ]

                        },
                        {
                            id: "s",
                            label: "Recent Doctor Visits",
                            sub: [
                                {
                                    id: "s",
                                    label: "Have you ever been seen by psychiatrist, psychologist, social worker, counselor or any other medical health professional?",
                                    require: true,
                                    type: "yes/no",
                                    length: "short",
                                    sub: [
                                        {
                                            id: "s",
                                            require: true,
                                            condition: "yes",
                                            label: "Please elaborate the reasons of your doctor visit(s)",
                                            type: "text",
                                            length: "long"
                                        }
                                    ]
                                }
                            ]
                        },

                    ]
                }
            ]
        }
    ]
}

let modified_content = assign_IDs(personal_and_medical.content);
console.log(modified_content)


const other_clinic_questions={
    name:"other clinic questions"
};


const personData=(name,{addRelation,addDobAddr,addProp})=>{
    const r = [
        {id:"s0",label:`${name}'s First Name`,type:"text",length:"short",required:true},
        {id:"s1",label:`${name}'s Middle Name`,type:"text",length:"short",required:false},
        {id:"s2",label:`${name}'s Last Name`,type:"text",length:"short",required:true},
        {
            id: "s4",
            label: `${name}'s Email`,
            type: "text",
            length: "medium",
            required: true
        },
        {
            id: "s5",
            label: `${name}'s Phone`,
            type: "text",
            length: "short",
            required: true
        },
        ...(addDobAddr?[
            {
                id: "s3",
                label: "Address",
                type: "address",
                required: true
            },
            {
                id: "s6",
                label: `${name}'s Birthday`,
                type: "date",
                required: true
            },]:[]),
        ...(addRelation?[{
            id: "s6",
            label: `Relationship to ${name}`,
            type: "multi-select",
            options: relationships,
            required: true
        }]:[]),
    ];

    return addProp?r.map((v)=>({...v,...addProp})):r;
}