import {
    educationLevels,
    maritalStatuses,
    relationships,
    sexualOrientations,
    skinColors,
    usStatuses,
    languageFluency,
    drugs,
    bloodTypes,
    dominantHands,
    eyeVisions,
    eyeVisionsLenses,
    hairTypes,
    hairTextures,
    hairFullness,
    familyTrait,
    fBaldness,
    familySide,
    physicalTraits,
    bodyBuilds,
    activity,
    personalities, skills, skillTypes, medicalHistory, physicalHistory, legalHistory, countryList, inUK3m, covidVacc, travelHistory, refusedBlood, receivedBlood, alcohol, alcoholFreq, smoke, smokeFreq, socialHabits, marijuana, period, papSmearRes, yes, no, birthControl, DepoProvera, gynecologic, sexualPartner, pregType, sex, deliveryType
} from "@/utils/form/consts";
import { AlgoMapping, FormField, FormTemp, HeightValue } from "./types";
import { inch2cm } from "./form_utils/internal";

export const basic_info: FormTemp = {
    name: "Basic info",
    content: [
        {
            title: "Basic info",
            fields: [
                //{label:"Name",type:"name",required:true},
                {
                    id: "s0",
                    label: "Full Legal Name",
                    subLabel: "Last, First, MI",
                    type: "name",
                    required: true
                },
                {
                    id: "s6",
                    label: "Date of Birth",
                    type: "date",
                    required: true
                },
                {
                    id: "s5",
                    label: "Contact Number",
                    type: "phone",
                    required: true
                },
                {
                    id: "s0",
                    label: "Marital Status",
                    type: "multi-select",
                    options: maritalStatuses,
                    required: true,
                    /*sub: personData("partner",
                        {
                            addDobAddr:true,
                            addProp:{condition:["Married", "Separated"]}})*/
                },
            ]
        },
        {
            title: "Nationality and Legal Status",
            fields: [
                {
                    id: "s13",
                    label: "Country of Citizenship",
                    type: "multi-select",
                    options: 'nationalities',
                    required: true,
                    sub: [
                        {
                            id: "s0",
                            exCondition: ["American"],
                            label: "Do you hold permanent or temporary resident immigration status?",
                            type: "yes/no",
                            required: true,
                        },
                        {
                            id: "s2",
                            condition: ["American"],
                            label: "Social Security Number (SSN)",
                            type: "number",
                            // required: true

                        }
                    ]
                },
                {
                    id: "s3",
                    label: "Mailing Address",
                    type: "address",
                    required: true
                }
            ]
        },
        {
            title: "Ethnicity",
            fields: [
                {
                    id: "s15",
                    label: "Ethnicity",
                    type: "checkbox",
                    options: 'ethnicities',
                    required: true,
                    sub: [
                        {
                            id: "s16",
                            condition: ["Native American", "Alaska Native"],
                            label: "Please go into more detail about your ethnicity. Are you a member of a tribe?",
                            // type: "yes/no",
                            type: "text",
                            length: "short",
                            required: true
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
                            options: 'languages',
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
    ],
};

export const physical_personal_trait: FormTemp = {
    name: "physical & personal trait",
    content: [
        {
            title: "physical characteristics",
            fields: [

                {//todo
                    id: "s7",
                    label: "Height (in Inches)",
                    type: "text",
                    required: true
                },
                {//todo
                    id: "s8",
                    label: "Weight (in lbs)",
                    type: "number",
                    length: "short",
                    required: true
                },
                {
                    id: "s6",
                    label: "Body Builds",
                    type: "multi-select",
                    options: bodyBuilds,
                    required: true
                },
                {
                    id: "s0",
                    label: "Blood Type",
                    type: "multi-select",
                    options: bloodTypes,
                    required: true
                },
                {
                    id: "s4",
                    label: "Eye Color",
                    type: "multi-select",
                    options: 'eyeColors',
                    required: true
                },
                {
                    id: "s5",
                    label: "Hair Color",
                    type: "multi-select",
                    options: 'hairColors',
                    required: true
                },
                {
                    id: "s5",
                    label: "What is your natural hair type?",
                    type: "multi-select",
                    options: hairTypes,
                    required: true
                },
                {
                    id: "s5",
                    label: "What is your natural hair texture?",
                    type: "multi-select",
                    options: hairTextures,
                    required: true
                },
                {
                    id: "s5",
                    label: "What is your natural hair fullness? ",
                    type: "multi-select",
                    options: hairFullness,
                    required: true
                },
                {
                    id: "s6",
                    label: "Skin Color",
                    type: "multi-select",
                    options: skinColors,
                    required: true
                },
                {
                    id: "s9",
                    label: "How's your Vision?",
                    type: "multi-select",
                    options: eyeVisions,
                    required: true,
                    sub: [
                        {
                            id: "s16",
                            condition: ["Fair(need corrective lenses)", "Poor(need corrective lenses)"],
                            label: "Does any of the following apply?",
                            type: "checkbox",
                            options: eyeVisionsLenses,
                            required: false
                        }
                    ]
                },
                {
                    id: "s10",
                    label: "Does any of the following apply to you?",
                    type: "checkbox",
                    options: physicalTraits,
                    required: false,
                    sub: [
                        {
                            id: "s",
                            condition: ["Baldness"],
                            label: "Please Explain, e.g. how serious, since what age?",
                            required: false,
                            type: "text",
                        }
                    ]
                },
                {
                    id: "s11",
                    label: "Which is your dominant hand?",
                    type: "multi-select",
                    options: dominantHands,
                    required: true
                },
                {
                    id: "s",
                    label: "Please select the following options if any of which applied to you.",
                    required: false,
                    type: "checkbox",
                    options: [
                        "Tattoo",
                        "Piercing",
                        "Adopted"
                    ]
                },
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
                {
                    id: "s11",
                    label: "What best describes you?",
                    type: "multi-select",
                    options: activity,
                    required: true
                },
                {
                    id: "s11",
                    label: "What best describes your personality?",
                    type: "multi-select",
                    options: personalities,
                    required: true
                },
                ...favoritesX(["Food", "Color", "Sport", "Type of Music", "Animal", "Hobby"]),
                ...optQuestions([
                    "What do you like most about yourself and why?",
                    "What do you like least about yourself and why?",
                    "Who is your role model and why?",
                    "What attributes do you most value in a friend?",
                    "What is your ambition in life?",
                    "Is there anything special that you would like us to know about you?"
                ]),
            ]
        },
    ],
};

export const education_occupation: FormTemp = {
    name: "education & occupation",
    content: [
        {
            title: "Education",
            fields: [
                {
                    id: "s0",
                    label: "What's your highest level of education?",
                    type: "multi-select",
                    options: educationLevels,
                    required: true,
                    sub: [//todo:
                        {
                            id: "s0",
                            exCondition: ["No Formal Education"],
                            label: "School Name",
                            type: "text",
                            length: "medium",
                            required: true
                        },
                        {
                            id: "s1",
                            exCondition: ["No Formal Education"],
                            label: "GPA",
                            type: "number",
                            required: true
                        },
                        {
                            id: "s2",
                            condition: ["Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate Degree", "Postdoctoral"],
                            label: "Major",
                            type: "multi-select",
                            length: "medium",
                            required: true
                        },
                        {
                            id: "s3",
                            condition: ["Bachelor's Degree", "Master's Degree", "Doctorate Degree", "Postdoctoral"],
                            label: "Are you currently in this school",
                            type: "yes/no",
                            required: true,
                            sub: [
                                {
                                    id: "s4",
                                    label: "Expected time of graduation1",
                                    type: "date",
                                    required: false,
                                    sub: [
                                        {
                                            id: "s8",
                                            label: "Expected time of graduation testing2",
                                            type: "date",
                                            sub: [
                                                {
                                                    id: "s5",
                                                    label: "Expected time of graduation testing3",
                                                    type: "date",
                                                    required: false,
                                                },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                optQuestion("Do you belong to any academic or professional societies?"),
            ]
        },
        {
            title: "Skill Talent",
            fields: [
                {
                    id: "s0",
                    label: "Do you consider yourself technically or mechanically skilled?",
                    type: "checkbox",
                    options: skillTypes,
                    required: false
                },
                {
                    id: "s1",
                    label: "Please select the following fields which you are skillful on",
                    type: "checkbox",
                    options: skills,
                    required: false,
                    sub: skills.map((v) => ({
                        label: `Please rate your ${v} skill(talent)`,
                        type: "multi-select",
                        options: ["Excellent", "Good", "Above than Average"],
                        required: true,
                    }))
                }
            ]
        },
        {
            title: "Occupation",
            fields: [
                {
                    id: "s0",
                    label: "Job History",
                    type: "populate",
                    group: [
                        {
                            id: "s0",
                            label: "Position",
                            type: "text",
                            length: "short",
                            required: true
                        },
                        {
                            id: "s1",
                            label: "Company/Organization Name",
                            type: "text",
                            length: "short",
                            required: false
                        },
                        {
                            id: "s1",
                            label: "Start Date",
                            type: "date",
                            required: false
                        },
                        {
                            id: "s1",
                            label: "End Date",
                            type: "date",
                            required: false
                        },
                    ],
                    required: true
                },
            ]
        }
    ],
};

///todo
export const background_history: FormTemp = {
    name: "background history",
    content: [
        {
            title: 'medical',
            fields: [
                {
                    label: 'Does any of the following apply to you?',
                    type: 'checkbox', options: medicalHistory,
                    required: false,
                },
                {
                    label: 'Does any of the following apply to you?',
                    type: 'checkbox', options: physicalHistory,
                    required: false,
                    sub: [
                        {
                            condition: [refusedBlood],
                            type: "text", length: 'medium',
                            label: 'Why were you refused as a blood donor?',
                            required: false
                        },
                        {
                            condition: [receivedBlood],
                            type: 'date',
                            label: 'When and where did you receive a blood transfusion?',
                            required: false
                        }
                    ]
                },
                {
                    label: 'Have you been vaccinated for COVID-19?',
                    type: 'yes/no', required: true,
                    sub: [
                        {
                            condition: ['no'],
                            label: 'would you consider getting vaccinated?',
                            type: 'multi-select',
                            options: covidVacc,
                            required: true
                        },
                        {
                            condition: ['yes'],
                            label: 'Which vaccine did you receive? And what were the date(s) of your vaccination?',
                            type: 'text',
                            length: 'medium',
                            required: false
                        }
                    ]
                }
            ]
        },
        {
            title: 'crime & history',
            fields: [
                {
                    label: 'Does any of the following apply to you?',
                    type: 'checkbox', options: travelHistory,
                    required: false,
                    sub: [
                        {
                            condition: [inUK3m],
                            type: 'text',
                            label: 'Where have you live in the UK, and for how long?',
                            required: false
                        }
                    ]
                },
                {
                    label: 'Does any of the following apply to you?',
                    type: 'checkbox', options: legalHistory,
                    required: false,
                    sub: [

                    ]
                },
                {
                    label: 'Have you traveled outside of the continental U.S. in the last 6 months?',
                    type: 'populate',
                    required: false,
                    group: [
                        { label: 'Country', type: 'multi-select', options: 'countryList', required: true },
                        { label: 'Start Date', type: 'date', required: false },
                        { label: 'End Date', type: 'date', required: false }
                    ]
                }
            ]
        },
        {
            title: 'social habits',
            fields: [
                {
                    label: 'Do you drink alcohol?',
                    type: 'multi-select',
                    options: alcohol, required: true,
                    sub: [
                        {
                            type: 'multi-select',
                            options: alcoholFreq, required: true,
                            label: 'What best describes your alcohol consumption?'
                        },
                        {
                            type: 'text', required: true,
                            length: 'long',
                            label: 'Please explain. E.g. How many alcoholic drinks per week or per time?'
                        },
                    ].map(v => ({ ...v, condition: ['Used to', 'Yes'] } as FormField))
                },
                {
                    label: 'Do you smoke?',
                    type: 'checkbox',
                    options: smoke,
                    sub: smoke.map(v => ({
                        condition: [v],
                        label: 'How often do you smoke it?',
                        type: 'multi-select', required: true,
                        options: smokeFreq,
                    }))
                },
                {
                    label: 'Does any of the following apply to you?',
                    type: 'checkbox', options: socialHabits,
                    required: false,
                    sub: [
                        {
                            condition: [marijuana],
                            type: 'text', length: 'medium',
                            required: true,
                            label: 'Please Explain. E.g. when is the last time you had marijuana?'
                        }
                    ]
                },
            ]
        },
        {
            title: 'maternal',
            fields: [
                {
                    label: 'Does any of the following apply to you?',
                    type: 'checkbox', options: gynecologic,
                    required: false,
                    sub: [

                    ]
                },
                {
                    label: 'What was your age at the onset of menses?',
                    type: 'number', required: true,
                },
                {
                    label: 'When was the date of your last menstrual period?',
                    type: 'date', required: true,
                },
                {
                    label: 'What is the average length of time your period lasts?',
                    type: 'text', length: 'short', required: true
                },
                {
                    label: 'What is the average length of time from the start of one period until the start of the next?',
                    type: 'text', length: 'short', required: true
                },
                {
                    label: 'Does any of the following apply to you?',
                    type: 'checkbox', options: period,
                    required: false,
                    sub: [

                    ]
                },
                // {
                //     label:'Do you have both ovaries?',
                //     type:'yes/no',required:true,
                // },
                {
                    label: 'Have any of your pap smears been abnormal?',
                    type: 'multi-select', options: papSmearRes,
                    required: true,
                    sub: [
                        {
                            condition: [yes],
                            type: 'text', required: true,
                            label: 'Please explain more detail about the abonormal Pap Smear? E.g. date, result,...'
                        },
                        {
                            condition: [yes, no],
                            type: 'date', required: true,
                            label: 'When was your last Pap Smear?'
                        },
                        {
                            condition: [yes],
                            type: 'text', required: true,
                            label: 'What was the result of your last Pap Smear?'
                        }
                    ]
                },

            ]
        },
        {
            title: 'sexual history',
            fields: [
                {
                    label: 'Please list all the birth control methods currently being used or used in the past, if any.',
                    type: 'populate', required: false,
                    group: [
                        {
                            label: 'Birth control Type',
                            type: 'multi-select', required: true,
                            options: birthControl,
                            sub: [
                                {
                                    condition: [DepoProvera],
                                    type: 'date', required: true,
                                    label: 'When was your last injection?'
                                }
                            ],
                        },
                        {
                            label: 'Birth control start time',
                            type: 'date', required: true,
                        },
                        {
                            label: 'Birth control end time',
                            type: 'date', required: false,
                        },
                    ]

                },
                {
                    label: 'What is the total number of sexual partners you have had?',
                    type: 'number', required: false
                },
                {
                    label: 'How many sexual partners have you had during the last 6 months?',
                    type: 'number', required: false
                },
                {
                    label: 'How many current sexual partners do you have?',
                    type: 'number', required: false
                },
                {
                    label: 'In the last 6 months have you had unprotected sex (intercourse without a condom) with a new partner?',
                    type: 'yes/no', required: true
                },
                {
                    label: 'To your knowledge, have you been personally tested positive or been treated for any of the following?',
                    type: 'checkbox', required: false,
                    options: sexualPartner,
                    sub: sexualPartner.flatMap(v => ([
                        {
                            condition: [v],
                            label: 'Date of Diagnosis',
                            type: 'date', required: false
                        },
                        {
                            condition: [v],
                            label: 'Additional Details',
                            type: 'text', required: false
                        }
                    ]))
                },
                {
                    label: 'To your knowledge, have you or any of your sexual partners been in contact with anyone tested positive or been treated for any of the following?',
                    type: 'checkbox', required: false,
                    options: sexualPartner,
                    sub: sexualPartner.flatMap(v => ([
                        {
                            condition: [v],
                            label: 'Date of Diagnosis',
                            type: 'date', required: false
                        },
                        {
                            condition: [v],
                            label: 'Additional Details',
                            type: 'text', required: false
                        }
                    ]))
                },
                {
                    label: 'Have any of the following happened to you?',
                    type: 'multi-select', required: true,
                    options: pregType,
                    sub: pregType.map(v => ({
                        condition: [v],
                        label: 'How many times did it happen to you?',
                        type: 'number', required: true,
                    }))
                },
                {
                    label: 'Please provide the following information regarding each pregnancy you have had.',
                    type: 'populate', required: false,
                    group: [
                        {
                            label: 'Vaginal or C-section', type: 'multi-select',
                            options: deliveryType, required: true
                        },
                        {
                            label: 'Complication', type: 'yes/no',
                            required: false
                        },
                        {
                            label: 'Delivery Date', type: 'date',
                            required: true
                        },
                        {
                            label: 'Weeks to Delivery', type: 'number',
                            required: true
                        },
                        {
                            label: 'Baby', type: 'populate', required: true,
                            group: [
                                {
                                    label: 'Sex', type: 'multi-select',
                                    options: sex, required: true
                                },
                                {
                                    label: 'Length/Weight', type: 'text',
                                    required: false
                                },
                                {
                                    label: 'Length/Weight', type: 'text',
                                    required: false
                                },
                                {
                                    label: "Eye Color",
                                    type: "multi-select",
                                    options: 'eyeColors',
                                    required: true
                                },
                                {
                                    label: "Hair Color",
                                    type: "multi-select",
                                    options: 'hairColors',
                                    required: true
                                },
                            ]
                        }
                    ]
                }
            ]
        }
        // {
        //     fields: [
        //
        //         {
        //             id: "s0",
        //             label: "Please fill in your background history if any",
        //             type: "text",
        //             length: "long",
        //             required: false
        //         },
        //         personal_and_medical
        //     ],
        //
        // }
    ]
};


export const personal_and_medical = {
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
                    /*return: options_selected,
                    sub: [
                        {
                            id: "s",
                            condition: options_selected,
                            label: `When did you last use ${options_selected}?`
                        }
                    ]*/
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

//todo
export const family_partner: FormTemp = {
    name: "family & partner",
    content: [
        {
            title: "title1",
            fields: [
                {
                    id: "s0",
                    label: "Marital Status",
                    type: "multi-select",
                    options: maritalStatuses,
                    required: true,
                    /*sub: personData("partner",
                        {
                            addDobAddr:true,
                            addProp:{condition:["Married", "Separated"]}})*/
                },
                {
                    id: "s1",
                    label: "Emergency Contacts",
                    type: "populate",
                    /*group:[
                        ...personData("Emergency Contacts",{
                            addRelation:true
                        })
                    ]*/
                },
                {
                    id: "s",
                    label: "Please select the following that applied to your partner, family member, or close contact",
                    type: "checkbox",
                    options: familyTrait,
                    sub: [
                        {
                            id: "s",
                            condition: [fBaldness],
                            label: "Which side of the Family?",
                            required: true,
                            type: "checkbox",
                            options: familySide
                        }
                    ]
                },
            ]
        },
        {
            title: "title2",
            fields: [
                {
                    id: "s",
                    label: "PLease list your family history of inheritable diseases if any",
                    type: "text",
                    length: "long",
                    required: false
                },
                {
                    id: "s",
                    label: "Do you have a family history of mental illness",
                    required: true,
                    type: "yes/no",
                    length: "short"
                },
                {
                    id: "s",
                    label: "Please select the following that applied to your partner, family member, or close contact",
                    required: true,
                    type: "checkbox",
                    options: [
                        "Been to Africa",
                        "Been to Europe more than 3 months",
                        "Been to Europe between 1980-1996",
                        "Have sexually transmitted disease(s)",
                        "Drug abuse or injected drugs",
                        "Jail/Prison ore than 3 days"
                    ]
                },
                {
                    id: "s",
                    label: "Please provide detailed medical information about your immediate family",
                    required: true,
                    type: "text",
                    length: "long"
                },
            ]
        },
        {
            title: "title3",
            fields: [
                {
                    id: "s",
                    label: "How many siblings do you have?",
                    required: true,
                    type: "text",
                    length: "short"
                },
                {
                    id: "s",
                    label: "Please select your family history of multiple birth",
                    required: true,
                    type: "checkbox",
                    options: [
                        "Twins",
                        "Triplets",
                        "Other"
                    ],
                    sub: [
                        {
                            id: "s",
                            required: true,
                            label: "Please enter they number of children in multiple birth",
                            condition: ["Other"],
                            type: "text",
                            length: "medium"
                        }
                    ]
                },
            ]
        },

        {
            title: "title4",
            fields: [
                {
                    id: "s",
                    label: "Does your partner support your decision to become an egg donor and understand the need for temporary abstinence??",
                    required: true,
                    type: "text",
                    length: "long"
                },
                {
                    id: "s",
                    label: "Do your family and/or those important to you support your decision to become an egg donor?",
                    required: true,
                    type: "yes/no",
                    length: "short",
                    sub: [
                        {
                            id: "s",
                            condition: ["no"],
                            type: "text",
                            label: "Please explain",
                            length: "long",
                            required: true
                        }
                    ]
                },
                {
                    id: "s",
                    label: "Do you understand that the ultimate goal of your donation is the birth of a healthy child with whom you will not have a parental relationship?",
                    required: true,
                    type: "yes/no",
                    length: "short"
                }
            ]
        }
    ]
};

//todo Waitlist
export const other_clinic_questions: FormTemp = {
    name: "other clinic questions",
    content: []
};




/////////////////////////////////////////////////
function assign_IDs(content: FormTemp) {
    const copyContent = JSON.parse(JSON.stringify(content));
    const assign = (field: FormField) => {
        let count = 0;
        if (field.sub)
            for (let sub of field.sub) {
                sub.id = "s" + count++;
                assign(sub);
            }
        if (field.group)
            for (let sub of field.group) {
                sub.id = "s" + count++;
                assign(sub);
            }
    };

    let count = 0;
    for (let sec of copyContent.content) {
        for (let field of sec.fields) {
            field.id = "s" + count++;
            assign(field);
        }
    }

    return copyContent;
}

export const modified_content = assign_IDs(basic_info);


const personData = (name: string, { addRelation, addDobAddr, addProp }: { addRelation: boolean, addDobAddr: boolean, addProp: any }): FormField[] => {
    const r = [
        { id: "s0", label: `${name}'s Name`, type: "name", required: true },
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
        ...(addDobAddr ? [
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
            },] : []),
        ...(addRelation ? [{
            id: "s6",
            label: `Relationship to ${name}`,
            type: "multi-select",
            options: relationships,
            required: true
        }] : []),
    ];

    return addProp ? r.map((v) => ({ ...v, ...addProp })) : r;
}

function tagOnlyAlgo(qs: AlgoMapping[]): AlgoMapping[] {
    return qs.map((v, i, l) => ({ ...v, tag: true, filter: false }));
}

function favoritesX(cate: string[]): FormField[] {
    return cate.map((v, i, l) => ({
        id: "s6",
        label: `What's your favourite ${v}`,
        type: "text",
        length: "short",
        required: false
    }));
}

function optQuestions(qs: string[]): FormField[] {
    return qs.map((v, i, l) => optQuestion(v));
}

function optQuestion(question: string): FormField {
    return {
        id: "s6",
        label: question,
        type: "text",
        length: "long",
        required: false
    };
}


export const formTemplates: FormTemp[] = [basic_info, physical_personal_trait, education_occupation,
    background_history, family_partner, other_clinic_questions]
    .map(v => assign_IDs(v));

export const AlgoTemplates: AlgoMapping[][] = [
    [
        { fdid: 's2', label: 'Birthday', convertFilter: 'age' },
        { fdid: 's3', label: 'Nationality', tag: true },
        { fdid: ['s3', 's0'], label: 'in US' },
        { fdid: 's4', label: 'Ethnicity' },
    ],
    [
        { fdid: 's0', label: 'Height', handler: (h: HeightValue) => inch2cm(h) },
        { fdid: 's1', label: 'Weight' },
        { extra: 'bmi' },

        ...tagOnlyAlgo([{
            fdid: "s6",
            label: "Body Builds",
        },
        {
            fdid: "s0",
            label: "Blood Type",
        },
        {
            fdid: "s4",
            label: "Eye Color",
        },
        {
            fdid: "s5",
            label: "Hair Color",
        },
        {
            fdid: "s5",
            label: "What is your natural hair type?"
        },
        {
            fdid: "s5",
            label: "What is your natural hair texture?"
        },
        {
            fdid: "s5",
            label: "What is your natural hair fullness? "
        },
        {
            fdid: "s6",
            label: "Skin Color",
        },
        {
            fdid: "s9",
            label: "How's your Vision?"
        },
        {
            fdid: "s10",
            label: "Does any of the following apply to you?"
        },
        {
            fdid: "s11",
            label: "Which is your dominant hand?"
        },
        {
            fdid: "s",
            label: "Please select the following options if any of which applied to you."
        },
        {
            fdid: "s11",
            label: "Sexual Orientation",
        },
        {
            fdid: "s11",
            label: "What best describes you?",
        },
        {
            fdid: "s11",
            label: "What best describes your personality?",
        }
        ]),
    ],
    [
        { fdid: 's0', label: 'highest level of education' },
        ...tagOnlyAlgo([
            { fdid: 's1', label: '' }, { fdid: 's2' },
        ])
    ],

    [],
    [],
    []
]