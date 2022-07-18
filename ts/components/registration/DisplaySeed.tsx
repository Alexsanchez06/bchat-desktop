import React from 'react';
import { SessionButton, SessionButtonColor, SessionButtonType } from '../basic/SessionButton';

export const Icons = (props:any)=>
<div onClick={()=>props.iconfunc()} style={{
    background:`url(images/bchat/${props.icon}.svg) no-repeat`,
     width: "40px",
    height: "40px",
    position: 'absolute',
    backgroundColor:"#353543",
    backgroundSize:"16px",
    borderRadius:"35px",
    backgroundPosition:"center",
    top: (props.icon=='paste')?'327px':"365px",  //377
    right: (props.icon=='paste')?'106px':'135px',
    cursor:'pointer'  
}}></div>

export const ClearIcon = (props:any)=>(
        <div onClick={()=> props.removeRecoveryPhrase()} 
        style={{
         background:`url(images/bchat/clear.svg) no-repeat`,
          width: "10px",
         height: "10px",
         position: 'absolute',
         top:"290px",        //350
         right:'180px',
         cursor:'pointer',
         backgroundSize:'cover'
         }}
         ></div>
)

const handlePaste = (event:any) => {
    console.log("EVENT_TEXT:",event.clipboardData.getData('text'));
  };

export const DisplaySeed = (props: any) => (
    <div className="session-restore-seed__address-container" >
        <>
            <div className='session-registration-header'>{window.i18n('restoreFromSeed')}</div>
            <div className='session-restore-seed-text-box'>
                <ClearIcon removeRecoveryPhrase={()=>props.assignRecoveryPhase("")}></ClearIcon> 
                {/* <input type='text' placeholder='Enter your recovery seed to restore your account'  style={{width:"100%",height:"100%",outline:'ˀne',border:"none",wordWrap: "break-word"}}  /> */}
                <textarea className='session-restore-seed-text-area' rows={4} cols={60} name="text" onPaste={handlePaste} value={props.recoveryPhrase} placeholder="Enter your recovery seed to restore your account" 
                onChange={(e)=>props.assignRecoveryPhase(e.target.value)}
                 ></textarea>
                {/* {props.assignRecoveryPhase && */}
            </div>
            <div>{<Icons icon={"paste"} iconfunc={props.iconfunc} /> }</div>            

            {/* {props.assignRecoveryPhase && <button style={{width: "100%",height: "40px",border: "none",borderRadius: "10px",color: 'red',margin: "20px 0 30px",background: "#282833"}} onClick={()=>props.assignRecoveryPhase("")} >clear</button>} */}
        </>
        

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