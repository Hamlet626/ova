export const processCldUrl=(url:string,customName?:string):
{filetype:string,folders?:string,fileName:string,version:number,publicId:string,downloadUrl:string}=>{
    const match = url.match(/(.+?)\/pc-ova\/([^/]+)\/upload\/(.*)\/([^/]+)$/)!;
    
    const cldFileName=match[4].split('.')[0];
    const v_folder=match[3].split('/');
    const version=Number.parseInt(v_folder[0].substring(1));
    const folders=v_folder.length>1?v_folder.slice(1).join('/'):undefined;

    if(customName!=null)customName=customName.split('.')[0];
    const fileName=customName==null?match[4]:(customName+'.'+match[4].split('.')[1]);

    return {
        filetype:match[2],
        fileName,version,
        publicId:(folders==null?'':(folders+'/'))+cldFileName,
        folders,
        downloadUrl:`${match[1]}/pc-ova/${match[2]}/upload/fl_attachment${customName==null?'':`:${customName}`}/${match[3]}/${match[4]}`
    };
}
