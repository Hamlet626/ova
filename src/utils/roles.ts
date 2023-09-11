


export enum RoleNum {
    ED = 0,
    Rcp = 1,
    Agc = 2,
  }

/// the infomation for each roles corresponding to role number in user's info
// id: collection id used in firebase + algolia
// name: name displaying on UI
export const roles:{id:string,name:string}[]=
    [{id:"ed",name:"Egg Donor"},{id:"recipient",name:"Recipient"},{id:"agency",name:"Clinics"}];

