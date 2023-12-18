
const circle='#004ADA';
export const Bg2=({children})=>{

    return(
        <div style={{position:'relative',width:'100%',height:'100vh', overflow:'hidden'}}>
            <div style={{position:'absolute',
                bottom:0,right:0,width:1163,height:1163,
                backgroundColor: 'transparent',
                border: `250px solid ${circle}`,
                borderRadius: '50%',
                opacity: '12%',
                transform: 'translate(30%, 52%)'
            }}/>
            {children}

        </div>
    );
}
