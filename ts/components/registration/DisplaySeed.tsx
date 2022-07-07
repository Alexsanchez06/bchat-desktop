import React from 'react';
import { SessionButton, SessionButtonColor, SessionButtonType } from '../basic/SessionButton';

export const Icons = (props:any)=>
<div onClick={()=>props.iconfunc()} style={{background:`url(images/bchat/${props.icon}.svg) no-repeat`,
     width: "30px",
    height: "48px",
    position: 'absolute',
    top: (props.icon=='paste')?'327px':"380px",
    right: (props.icon=='paste')?'106px':'126px',
    cursor:'pointer'  
}}></div>

export const ClearIcon = (props:any)=>(
        <div onClick={()=> props.removeRecoveryPhrase()} style={{
         background:`url(images/bchat/clear.svg) no-repeat`,
          width: "10px",
         height: "10px",
         position: 'absolute',
         top:"290px",
         right:'180px',
         cursor:'pointer',
         backgroundSize:'cover'
         }}></div>
)

const handlePaste = (event:any) => {
    console.log("EVENT_TEXT:",event.clipboardData.getData('text'));
  };

export const DisplaySeed = (props: any) => (
    <div className={"session-id-And-Address-container ,display-seed"}  style={{    width: "100%",
       margin: '0 auto',
       textAlign:"center" }}  >
        {/* <h1 className={"session-head"} style={{ textAlign: 'center', color: "white" }}></h1> */}
        <div className='id-And-Address-Sub-container'>
            <h4 style= {{ textAlign: "center", color: "white", fontSize: '24px', margin: 0, padding: "0px 0px 25px",fontWeight:"600",fontFamily:'poppins'}}>Restore from store</h4>
            <div style={{
                backgroundColor: "#353543",
                width: "100%",
                minHeight: '60px',
                borderRadius: "13px",
                textAlign: "center",
                // display: "flex",
                // alignItems: "center",
                color: "#0BB70F",
                marginBottom:"45px"
                }}>
                <ClearIcon removeRecoveryPhrase={()=>props.assignRecoveryPhase("")}></ClearIcon> 
                {/* <input type='text' placeholder='Enter your recovery seed to restore your account'  style={{width:"100%",height:"100%",outline:'ˀne',border:"none",wordWrap: "break-word"}}  /> */}
                <textarea rows={4} cols={60} name="text" onPaste={handlePaste} value={props.recoveryPhrase} placeholder="Enter your recovery seed to restore your account" onChange={(e)=>props.assignRecoveryPhase(e.target.value)} style={{outline:'none',border:"none",resize:"none",textAlign: "center", paddingTop: "20px"}}></textarea>
                {/* {props.assignRecoveryPhase && */}
                {/* //  } */}
            </div>
            <div>{<Icons icon={"paste"} iconfunc={props.iconfunc} /> }</div>            

            {/* {props.assignRecoveryPhase && <button style={{width: "100%",height: "40px",border: "none",borderRadius: "10px",color: 'red',margin: "20px 0 30px",background: "#282833"}} onClick={()=>props.assignRecoveryPhase("")} >clear</button>} */}

        </div>
        

        <SessionButton
            onClick={props.recoveryPhrase? props.onNext:null}
            buttonType={SessionButtonType.Brand}
            buttonColor={SessionButtonColor.Green}
            // text={window.i18n('getStarted')}
            text="Next"
        // disabled={!enableCompleteSignUp}
        />
    </div>
);