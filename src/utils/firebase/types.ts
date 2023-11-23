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
    files:FileData[]
}
export interface FileData{
    url:string,
    by?:DocumentReference,
}

export const FileColConverter = {
    toFirestore(fCol: FileCol): DocumentData {
      return fCol;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): FileCol {
      const data = snapshot.data(options)!;
      return {...data,files:data.files??[]} as FileCol;
    }
  };