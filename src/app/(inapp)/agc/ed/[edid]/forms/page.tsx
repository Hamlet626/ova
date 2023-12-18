import { FormStatsTiles } from "@/app/_shared/_forms/form_tiles";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getFinishStatus } from "@/utils/form/form_utils/status";
import { RoleNum } from "@/utils/roles";
import { getFormTemplate, getFormData } from "@/utils/server_data_getter/utils";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";

export default async function AgcForm({params}:{params: { edid: string }}){
    const [formTemplate,formData]=await Promise.all([
        getServerSession(authOptions).then((s)=>getFormTemplate(s?.user?.id!)),
        getFormData(params.edid,RoleNum.ED)
    ]);

    const formsStatus=getFinishStatus(formTemplate,formData);
    
    return <FormStatsTiles formsStatus={formsStatus} prePath={`/agc/ed/${params.edid}/forms`}/>;
}