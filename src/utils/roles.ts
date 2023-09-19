


export enum RoleNum {
    ED = 0,
    Rcp = 1,
    Agc = 2,
  }

/// the infomation for each roles corresponding to role number in user's info
// id: collection id used in firebase + algolia
// name: name displaying on UI
export const roles:{id:string,name:string,path:string}[]=
    [{id:"ed",name:"Egg Donor",path:"ed"},
    {id:"recipient",name:"Recipient",path:"rcp"},
    {id:"agency",name:"Clinics",path:"agc"}];

