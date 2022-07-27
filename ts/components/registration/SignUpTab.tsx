import React, { useContext, useEffect, useState } from 'react';
import { sanitizeBchatUsername } from '../../bchat/utils/String';
import { Flex } from '../basic/Flex';
import { BchatButton, BchatButtonColor, BchatButtonType } from '../basic/BchatButton';
// import { BchatIdEditable } from '../basic/BchatIdEditable';
import { BchatIconButton } from '../icon';
import { RegistrationContext, RegistrationPhase, signUp } from './RegistrationStages';
import { RegistrationUserDetails } from './RegistrationUserDetails';
import { SignInMode } from './SignInTab';
// import { TermsAndConditions } from './TermsAndConditions';
import {DisplayIdAndAddress ,ShowRecoveryPhase} from "./ShowIdAndAddress";
import { ToastUtils } from '../../bchat/utils';
// import { DisplaySeed } from './DisplaySeed';
const { clipboard } = require('electron')

export enum SignUpMode {
  Default,
  SessionIDShown,
  EnterDetails,
  
}

const CreateBchatIdButton = ({ createSessionID }: { createSessionID: any }) => {
  return (
    <BchatButton
      onClick={createSessionID}
      buttonType={BchatButtonType.BrandOutline}
      buttonColor={BchatButtonColor.Green}
      text={window.i18n('createAccount')}
    />
  );
};

// const ContinueSignUpButton = ({ continueSignUp }: { continueSignUp: any }) => {
//   return (
//     <BchatButton
//       onClick={continueSignUp}
//       buttonType={BchatButtonType.Brand}
//       buttonColor={BchatButtonColor.Green}
//       text={window.i18n('continue')}
//     />
//   );
// };

const SignUpDefault = (props: { createSessionID: () => void }) => {
  return (
    <div className="bchat-registration__content">
      <CreateBchatIdButton createSessionID={props.createSessionID} />
    </div>
  );
};

export const GoBackMainMenuButton = (props:any) => {
  const { setRegistrationPhase, setSignInMode, setSignUpMode } = useContext(RegistrationContext);
  return (
    <BchatIconButton
      iconSize="huge"
      iconType="chevron"
      iconRotation={90}
      iconPadding="5px"
      onClick={() => {
        setRegistrationPhase(RegistrationPhase.Start);
        setSignInMode(SignInMode.Default);
        setSignUpMode(SignUpMode.Default);
        props.assent? props.assent() :'';  
        props.goBack? props.goBack():'';
      }}
    />
  );
};
// const SignUpSessionIDShown = (props: { continueSignUp: () => void }) => {
//   return (
//     <div className="bchat-registration__content">
//       <Flex flexDirection="row" container={true} alignItems="center">
//         <GoBackMainMenuButton />

//         <div className="bchat-registration__unique-bchat-id">
//           {window.i18n('yourUniqueBchatID')}
//         </div>
//       </Flex>
//       <BchatIdEditable editable={false} placeholder={undefined} dataTestId="session-id-signup" />
//       <div className="bchat-description-long">{window.i18n('allUsersAreRandomly...')}</div>
//       <ContinueSignUpButton continueSignUp={props.continueSignUp} />
//     </div>
//   );
// };

export const SignUpTab = (props:any) => {
  const {
    signUpMode,
    setRegistrationPhase,
    generatedRecoveryPhrase,
    hexGeneratedPubKey,
    setSignUpMode,
  } = useContext(RegistrationContext);
  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState<undefined | string>('');
  const [displayNameScreen,setDisplayNameScreen]=useState(true);
  const [displayAddressScreen,setAddressScreen] = useState(true);

  useEffect(() => {
    if (signUpMode === SignUpMode.SessionIDShown) {
      window.bchat.setNewSessionID(hexGeneratedPubKey);
    }
  }, [signUpMode]);

  if (signUpMode === SignUpMode.Default) {
    return (
      <SignUpDefault
        createSessionID={() => {
          // setSignUpMode(SignUpMode.SessionIDShown);
          setRegistrationPhase(RegistrationPhase.SignUp);
          setSignUpMode(SignUpMode.EnterDetails);
          props.assent(false)
        }}
      />
    );
  }

  // if (signUpMode === SignUpMode.SessionIDShown) {
  //   return (
  //     <SignUpSessionIDShown
  //       continueSignUp={() => {
  //         setSignUpMode(SignUpMode.EnterDetails);
  //       }}
  //     />
  //   );
  // }

  // can only be the EnterDetails step

  // Display name is required
  const displayNameOK = !displayNameError && !!displayName;

  const enableCompleteSignUp = displayNameOK;
  const signUpWithDetails = async () => {
    await signUp({
      displayName,
      generatedRecoveryPhrase: generatedRecoveryPhrase,
    });
  };
  const LoaderGif = () => {
    return<div  className="bchat-registration-loadingGif">
    <div  style={{background:"url(images/bchat/Load_animation.gif) no-repeat",width: "151px",height: "128px",margin: "0 auto"}}>
    </div>
    </div>
  }
 const clickGoBack = () => {
  console.log("goback")
    setDisplayName('')
    setDisplayNameScreen(true);
    setAddressScreen(true);

  }
  const verifyUserName = () => {
   if (!displayName) {
    window?.log?.warn('invalid trimmed name for registration');
    ToastUtils.pushToastError('invalidDisplayName', window.i18n('displayNameEmpty'));
   }else{
    setDisplayNameScreen(false);
   }
  }

  if(displayNameScreen)
  {
    return (
    <div className="bchat-registration__content" style={{paddingTop:'0px'}}>
      <Flex flexDirection="row" container={true} alignItems="center" padding="14px 0px" margin='0px 0px 0px 65px'>
        <div className='bchat-registration-goback-icon'>
        {/* style={{ position: 'relative', color: 'white', top: '0px',left:"0px" }} */}
        <GoBackMainMenuButton assent={()=>{props.assent(true);clickGoBack()}} />
        </div>
        <Flex className="bchat-registration__welcome-bchat">
          {window.i18n('welcomeToYourSession')}
        </Flex>
      </Flex>
      <RegistrationUserDetails
        showDisplayNameField={true}
        showSeedField={false}
        displayName={displayName}
        handlePressEnter={()=>{verifyUserName()}}
        onDisplayNameChanged={(name: string) => {
          const sanitizedName = sanitizeBchatUsername(name);
          const trimName = sanitizedName.trim();
          setDisplayName(sanitizedName);
          setDisplayNameError(!trimName ? window.i18n('displayNameEmpty') : undefined);
        }}
        stealAutoFocus={true}
      />
      <div style={{width:'76%',marginLeft:'55px'}}>
      <BchatButton
        onClick={()=> {verifyUserName()}}
        buttonType={BchatButtonType.Brand}
        buttonColor={BchatButtonColor.Green}
        text={window.i18n('getStarted')}
        // disabled={!enableCompleteSignUp}
      />
      </div>
    </div>
    );
  }
  
  const handlePaste = () => {
    clipboard.writeText(generatedRecoveryPhrase,'clipboard');
  };
  if(displayAddressScreen){
   return (
    <>
        {!localStorage.getItem("userAddress") && <LoaderGif /> } 
       <DisplayIdAndAddress nextFunc={()=>{setAddressScreen(false)}} pubKey={hexGeneratedPubKey} walletAddress={localStorage.getItem("userAddress")} assentAndGoBack={()=>{props.assent(true);clickGoBack()}} />
    </>
  );
  }
  return (
    
  <>
    <ShowRecoveryPhase
     assentAndGoBack={()=>{props.assent(true);clickGoBack()}}
     mnemonic={generatedRecoveryPhrase}  
     nextFunc={signUpWithDetails} 
     enableCompleteSignUp={enableCompleteSignUp}
     copySeed = {handlePaste}
     ></ShowRecoveryPhase>
  </>
  
)
};