export const processCldUrl=(url:string,customName?:string):
{filetype:string,folders?:string,fileName:string,downloadUrl:string}=>{
    const match = url.match(/(.+?)\/pc-ova\/([^/]+)\/upload\/(.*)\/([^/]+)$/)!;
    
    if(customName!=null)customName=customName.split('.')[0];
    const fileName=customName==null?match[4]:(customName+'.'+match[4].split('.')[1]);

    return {
        filetype:match[2],
        fileName,
        folders:match[3],
        downloadUrl:`${match[1]}/pc-ova/${match[2]}/upload/fl_attachment${customName==null?'':`:${customName}`}/${match[3]}/${match[4]}`
    };
}
