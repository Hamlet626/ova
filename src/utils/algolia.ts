import algoliasearch from 'algoliasearch'
import recommend from '@algolia/recommend';
import { EDStatus, RcpStatus } from './types/status'

export const algo_client = algoliasearch('...', '...',)
export const recommend_client = recommend('...', '...');
///search only key: '5c91ec05f463ae523add2e1500ea20c6'

export const agc_facet='agency_ids';
export const click_ED_event='ED Clicked';

export interface AgcRec{
    name:string, 
    createTime:number,
}
  
export interface EDRec{
    [key: string]: unknown;
    name:string, 
    createTime:number,
    agencies:{[clinicId in string]:{status?:EDStatus}},
    [agc_facet]:string[],
    tags?:string[]
}
  
export interface RcpRec{
    [key: string]: unknown;
    name:string, 
    createTime:number,
    agencies:{[clinicId in string]:{status?:RcpStatus}},
    [agc_facet]:string[],
}
