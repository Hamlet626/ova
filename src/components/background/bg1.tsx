import logo from "@/assets/ova_logo.svg";
import Image from "next/image";

const circle='#004ADA';
export const Bg1=()=>{

    return(
        <div style={{position:'relative',width:'100%',height:'100vh', overflow: 'hidden'}}>
            <div style={{position:'absolute',
                bottom:0,left:0,width:454,height:454,
                backgroundColor: 'transparent',
                border: `100px solid ${circle}`,
                borderRadius: '50%',
                opacity: '12%',
                transform: 'translate(-39%, 38%)'
            }}/>
            <div style={{position:'absolute',
                top:0,right:0,width:1044,height:1044,
                backgroundColor: 'transparent',
                border: `250px solid ${circle}`,
                borderRadius: '50%',
                opacity: '12%',
                transform: 'translate(60%, -53%)'
            }}/>
            <Image src={logo} alt="Logo" style={{
                position: 'absolute',
                top: '54px',
                left: '90px',
            }}/>
        </div>
    );
}
