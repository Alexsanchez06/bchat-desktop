import React, { useState } from 'react';
import { BchatButton, BchatButtonColor, BchatButtonType } from '../basic/BchatButton';
import { Flex } from '../basic/Flex';
import { GoBackMainMenuButton } from './SignUpTab';


export const DisplayIdAndAddress= (props:any) => (
    <div className='session-registration-welcome-screen-container'>
        <div className='session-registration-welcome-screen-goback'>
          <GoBackMainMenuButton assent={()=>{props.assentAndGoBack()}} />
        </div>
        <h1 className="session-head">{window.i18n('welcome')}</h1>
        <div className='session-registration-welcome-screen-back'>
        <h6 className='session-registration-welcome-screen-chat'>{window.i18n('chatId')}</h6>
        <div className='session-registration-welcome-screen-chat-value'>
              <p style={{color: "#0BB70F"}}>{props.pubKey}</p>
        </div>
        <p className='session-registration-welcome-screen-chat-content'>{window.i18n('yourBchatName')}</p>
        <h6 className='session-registration-welcome-screen-chat'>{window.i18n('beldexAddress')}</h6>
        <div className='session-registration-welcome-screen-chat-value' > 
          <p style={{color:"#1782FF"}}>{props.walletAddress}</p>
        </div>
        <p className='session-registration-welcome-screen-chat-content'>{window.i18n('beldexAddressConnection')}</p>
       </div>
       <BchatButton
        onClick={props.nextFunc}
        buttonType={BchatButtonType.Brand}
        buttonColor={BchatButtonColor.Green}
        text="Next"/>
     </div>

);

export const Icons = (props:any)=>
<div onClick={()=>props.iconfunc()} style={{
    background:`url(images/bchat/${props.icon}.svg) no-repeat`,
     width: "40px",
    height: "40px",
    backgroundColor:"#353543",
    backgroundSize:"16px",
    borderRadius:"35px",
    backgroundPosition:"center",
    // top: (props.icon=='paste')?'327px':"365px",  //377
    // right: (props.icon=='paste')?'106px':'135px',
    cursor:'pointer',
    marginTop:'207px',
    marginLeft:'50px'
}}></div>


export const ShowRecoveryPhase= (props:any) => {
  const [seedCopied,setSeedCopied] = useState(false);
  // return(
  //     <div className='session-registration-welcome-screen-container'>
  //      <div className='session-registration-welcome-screen-goback'>
  //       <GoBackMainMenuButton assent={()=>{props.assentAndGoBack()}} />
  //      </div>
  //       <h1 className="session-head">{window.i18n('recoveryPhrase')}</h1>
  //       <h5 style={{color:"white",fontFamily:"poppin-regular"}}><span style={{color:"#F23333"}}>Note :</span> {window.i18n('saveYourRecoveryPhrase')}
  //       <br/><span style={{fontFamily:"poppin-semibold"}}>{window.i18n('copyToContinueRecovery')}</span></h5>
  //       <div className='session-registration-recovery-phrase'>
  //         <textarea className='session-registration-recovery-phrase-textarea' rows={4} cols={60} name="text" value={props.mnemonic} placeholder="Enter your recovery seed to restore your account" ></textarea>
  //         {<Icons icon={"copy_icon"} iconfunc={()=>{props.copySeed(props.mnemonic),setSeedCopied(true)}}/> }
  //        </div> 
  //       {/* <div>
  //       </div >             */}
  //      <BchatButton 
  //       onClick={props.nextFunc}
  //       buttonType={BchatButtonType.Brand}
  //       buttonColor={BchatButtonColor.Green}
  //       text={window.i18n('continue')}
  //       disabled={!seedCopied}/>
  //     </div>
  // );
  return(
     <div className='session-registration-welcome-screen-container' style={{width:'80%',marginLeft:'160px'}}>
      <Flex  flexDirection="row" container={true} height="100%">
      <Flex 
        alignItems="center"
        flexDirection="row"
        height="100%"
        width='60%'
        justifyContent="center"
        >
        <div className='session-registration-welcome-screen-goback'>
         <GoBackMainMenuButton assent={()=>{props.assentAndGoBack()}} />
         </div>
         <h1 className="session-head">{window.i18n('recoveryPhrase')}</h1>
         <h5 style={{color:"white",fontFamily:"poppin-regular"}}><span style={{color:"#F23333"}}>Note :</span> {window.i18n('saveYourRecoveryPhrase')}
         <br/><span style={{fontFamily:"poppin-semibold"}}>{window.i18n('copyToContinueRecovery')}</span></h5>
         <div className='session-registration-recovery-phrase'>
           <textarea className='session-registration-recovery-phrase-textarea' rows={4} cols={60} name="text" value={props.mnemonic} placeholder="Enter your recovery seed to restore your account" ></textarea>
          </div> 
        <BchatButton 
         onClick={props.nextFunc}
         buttonType={BchatButtonType.Brand}
         buttonColor={BchatButtonColor.Green}
         text={window.i18n('continue')}
         disabled={!seedCopied}/>
        </Flex>
        <Flex 
            alignItems="center"
            flexDirection="row"
            height="100%"
            width='10%'>
          <Icons icon={"copy_icon"} iconfunc={()=>{props.copySeed(props.mnemonic),setSeedCopied(true)}}/>
        </Flex> 
      </Flex>
      </div>


  )
}