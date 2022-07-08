import React, { useState } from 'react';
import { SessionButton, SessionButtonColor, SessionButtonType } from '../basic/SessionButton';
import { Icons } from './DisplaySeed';
import { GoBackMainMenuButton } from './SignUpTab';


export const DisplayIdAndAddress= (props:any) => (
    <div className={"session-id-And-Address-container"}
     style={{
      width: "50%",
        margin: '0 auto',
        textAlign:"center"
      }}  >
        <div style={{ position: 'relative', color: 'white', top: '32px',width:'30px',height:"30px" }}>
        <GoBackMainMenuButton assent={()=>{props.assentAndGoBack()}} />
        </div>
      <h1 className={"session-head"} 
        style={{
        color:"white"
        }}>{window.i18n('welcome')}</h1>
      <div className='id-And-Address-Sub-container'
       style={{
        padding:'20PX',
        backgroundColor:"#282833"
        ,borderRadius: "10px"
        ,margin: "10px 0 37px",
        height:'375px'
        }}>
        <h6 style={{
          color: "white",
          fontSize: '18px',
          margin: 0,
          padding: "10px 0 6px 0px",
          fontFamily:'poppin-semibold'
          }}>{window.i18n('chatId')}</h6>
        <div style={{backgroundColor:"#353543",
          width: "100%",
          height: '60px',
          borderRadius: "13px",
          display: "flex",
          alignItems: "center",
          color: "#0BB70F"}}>
              
          <p style={{
            display: 'flex',
            justifyItems: "center"
            ,padding: "0 20px",
            fontSize:'12px',
            fontFamily:"poppin-medium"
            }}>{props.pubKey}</p>
        </div>
        <p style={{width: "75%",
            display: "flex",
            fontSize: "10px",
            color: "#82828D",
            margin: '10px auto'
            }}>{window.i18n('yourBchatName')}</p>
        <h6 style={{
          color: "white",
          fontSize: '18px',
          margin: 0,
          padding: "20px 0 10px 0px",
          fontFamily:"poppin-semibold"
          }}>{window.i18n('beldexAddress')}</h6>
        <div style={{
          backgroundColor:"#353543",
          width: "100%",
          padding:"0px 20px",
          borderRadius: "13px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          color: "#1782FF",
          fontFamily:"poppin-medium"
          }}>
        
            <p>{props.walletAddress}</p>
        </div>
        <p style={{width: "75%",
           display: "flex",
          //  textAlign: "center",
           fontSize: "10px",
           color: "#82828D",
           margin: '10px auto'}}>
            {window.i18n('beldexAddressConnection')}</p>
      </div>
      <SessionButton
        onClick={props.nextFunc}
        buttonType={SessionButtonType.Brand}
        buttonColor={SessionButtonColor.Green}
        text="Next"
      />
      </div>

);

export const ShowRecoveryPhase= (props:any) => {
  const [seedCopied,setSeedCopied] = useState(false);
  return(
      <div className={"session-id-And-Address-container"}
        style={{
        width: "50%",
        margin: '0 auto',
        textAlign:"center"
      }}>
      <div style={{ position: 'relative', color: 'white', top: '34px',width:'30px',height:"30px"}}>
        <GoBackMainMenuButton assent={()=>{props.assentAndGoBack()}} />
      </div>
        <h1 
        className={"session-head"} 
        style={{
        color:"white"
        }}>{window.i18n('recoveryPhrase')}</h1>
        <h5 style={{color:"white",fontFamily:"poppin-regular"}}><span style={{color:"#F23333"}}>Note :</span> {window.i18n('saveYourRecoveryPhrase')}
        <br/><span style={{fontFamily:"poppin-semibold"}}>{window.i18n('copyToContinueRecovery')}</span></h5>
        <div className='id-And-Address-Sub-container'>

        
        {/* style={{
        padding:"5px 20px",
        backgroundColor:"#353543"
        ,borderRadius: "12px"
        ,margin: "10px 0 25px",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        fontSize: "12px",
        color: "#0BB70F",
        alignItems: "center" */}
        {/* }} */}
        {/* <div style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          color: "#0BB70F",
          fontFamily:"poppin-medium"
          }}> */}
            {/* <p>{props.mnemonic}</p> */}
            {/* <textarea 
                rows={4} 
                cols={60} 
                name="text"
                 onPaste={handlePaste} 
                 value={props.mnemonic} 
                 placeholder={"Enter your recovery seed to restore your account" } */}
                 {/* onChange={(e)=>props.assignRecoveryPhase(e.target.value)}  */}
               {/* ></textarea> */}

        <div style={{
          // backgroundColor: "#353543",
          // width: "100%",
          // minHeight: '60px',
          // borderRadius: "13px",
          // textAlign: "center",
          // color: "#0BB70F"

          padding:"5px 20px",
        backgroundColor:"#353543"
        ,borderRadius: "12px"
        ,margin: "10px 0 25px",
        display: "flex",
        width: "100%",
        height:"100px",
        justifyContent: "center",
        fontSize: "12px",
        color: "#0BB70F",
        alignItems: "center"
          }}>
          {/* <input type='text' placeholder='Enter your recovery seed to restore your account'  style={{width:"100%",height:"100%",outline:'ˀne',border:"none",wordWrap: "break-word"}}  /> */}
          <textarea rows={4} cols={60} name="text" value={props.mnemonic} placeholder="Enter your recovery seed to restore your account" style={{outline:'none',border:"none",resize:"none",textAlign: "center"}}></textarea>

      </div> </div>
        {/* </div> */}

        <div>
          {<Icons icon={"copy_icon"} iconfunc={()=>{props.copySeed(props.mnemonic),setSeedCopied(true)}}/> }
        </div >            
       <SessionButton 
        onClick={props.nextFunc}
        buttonType={SessionButtonType.Brand}
        buttonColor={SessionButtonColor.Green}
        text={window.i18n('continue')}
        disabled={!seedCopied}/>
      </div>
  );
}