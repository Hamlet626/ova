import { Box } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default async function Forms({params}:{params: { agcid: string }}) {
    const formTemplate=await getDocs(collection(getFirestore(),`user groups/agc/users/${params.agcid}/forms`));
    return <Box pt={30} pl={32} pr={80}>

    </Box>
}