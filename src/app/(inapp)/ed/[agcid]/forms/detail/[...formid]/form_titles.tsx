import { Circle } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

export default function FormTitles(params:type) {
    return(
        <Box sx={{
            width: '297px',
            height:'941px',
            backgroundColor: 'white',
            mt:'-25px',
            boxShadow:'8px,22px,75px,2px,rgba(92, 104, 126, 0.12)',
        }}>
            <Typography variant="h4" sx={{fontFamily: 'roboto.style.fontFamily',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '24px',
                letterSpacing: '0.15',
                mt:'71px',
                ml:'80px',
                width:'57px',
                height:'24px',
            }}>
                Sign Up
            </Typography>
            <Typography sx={{fontFamily: 'roboto.style.fontFamily',
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: '32px',
                mt:'38px',
                ml:'80px',
                width:'169px',
                height:'32px',
            }}>
                Create Form
            </Typography>
            <List sx={{
                mt:"16px",
                ml:"80px",
                width:'197px',
                height:'auto',
                gap:'12px',
            }}>
                {customizedformlist.map((template, index) => (
                < div key={index} >
                    <ListItem disablePadding
                              onClick={(ev:React.SyntheticEvent)=>{handleTemplateChange(ev,index);;}}>
                        <ListItemButton sx={{
                            borderRadius: '100px',
                            backgroundColor: index === templateid ? primary90: "white",
                            width:'93px',
                        }}>
                            <ListItemIcon sx={{
                                width:'20px',
                                height:'20px',
                            }}>
                                <Circle sx={{color:primary90}}/>
                            </ListItemIcon>
                            <ListItemText primary={template.name}   sx={{
                                ml:'-20px',
                                color:'black',
                            }}/>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </div>
                ))}
            </List>
        </Box>
    );
}