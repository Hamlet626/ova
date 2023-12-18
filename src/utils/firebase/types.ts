import { DocumentData, DocumentReference, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { EDStatus, RcpStatus } from "../types/status";

export interface BasicInfoDoc{
    uid:string,
    name:string, 
    email:string,
    avatar?:string,
    lastLogin?:number,
    createTime:number,
}

// export interface RcpBsInfoDoc extends BasicInfoDoc{
//     agcs:string[],
// }

export interface GCAgcInfoDoc{
    agcid:string,
    price:number,
    status:EDStatus,
}

export interface RcpAgcInfoDoc{
    agcid:string,
    status:RcpStatus,
    recommends?:string[]
}



export interface FileCol{
  id?:string
    name:string,
    description?:string,
    by?:DocumentReference,
    files:{[url in string]:FileData},
    selfEditable?:boolean,
}
export interface FileData{
    url?:string,
    name?:string,
    by?:DocumentReference,
    selfVisible:boolean
}

export const FileColConverter = {
    toFirestore(fCol: FileCol): DocumentData {
      if(fCol.files!=null)fCol.files=
      Object.fromEntries(Object.entries(fCol.files).map(et=>[urlToFieldKey(et[0]),et[1]]))
      return fCol;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): FileCol {
      const data = snapshot.data(options)!;
      return {...data,
        files:Object.fromEntries(Object.entries(data.files??{}).map(et=>[fieldKeyToUrl(et[0]),et[1]]))
      } as FileCol;
    }
  };


export const urlToFieldKey=(url:string)=>{
  return encodeURIComponent(url).replace(/\./g, '%2E');
}
export const fieldKeyToUrl=(key:string)=>{
  return decodeURIComponent(key.replace('%2E','.'));
}