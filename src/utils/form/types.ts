
export interface FormTemp{
    name:string,
    content:FormSection[],
    // algo?:AlgoMapping[]
}
export interface FormSection{
    title:string,
    fields:FormField[]
}

export interface FormField{
    id?:string,
    label:string,
    subLabel?:string,
    type:'text'|'multi-select'|'date'|'address'|'name'|'height'|"yes/no"|"checkbox"|"number"|'populate' | 'phone' | 'ssn',
    required?:boolean,
    default?:any,
    length?:'long'|'medium'|'short',
    group?:FormField[],
    options?: string[] | 'languages' | 'eyeColors' | 'hairColors' | 'ethnicities' | 'nationalities' | 'countryList';
    sub?:FormField[],
    condition?:any[],
    exCondition?:any[],
}

export interface AlgoMapping{
    fdid:string|string[],

    /// key stored in algolia
    label?:string,

    /// uiLabel -> convertFilter -> field label -> label
    uiLabel?:string,
    handler?:any,
    extra?:string,
    tag:boolean, //default:false
    filter:boolean, //default:true
    convertFilter?:'age'
    // type:AlgoAttrType,
};


export interface HeightValue{
    iscm:boolean,
    inch?:{feet?:number,inch?:number},
    cm?:number
};