import React, { useContext, useEffect, useState } from 'react';
import { sanitizeSessionUsername } from '../../session/utils/String';
import { Flex } from '../basic/Flex';
import { SessionButton, SessionButtonColor, SessionButtonType } from '../basic/SessionButton';
// import { SessionIdEditable } from '../basic/SessionIdEditable';
import { SessionIconButton } from '../icon';
import { RegistrationContext, RegistrationPhase, signUp } from './RegistrationStages';
import { RegistrationUserDetails } from './RegistrationUserDetails';
import { SignInMode } from './SignInTab';
// import { TermsAndConditions } from './TermsAndConditions';
import {DisplayIdAndAddress ,ShowRecoveryPhase} from "./ShowIdAndAddress";
// import { DisplaySeed } from './DisplaySeed';

export enum SignUpMode {
  Default,
  SessionIDShown,
  EnterDetails,
  
}

const CreateSessionIdButton = ({ createSessionID }: { createSessionID: any }) => {
  return (
    <SessionButton
      onClick={createSessionID}
      buttonType={SessionButtonType.BrandOutline}
      buttonColor={SessionButtonColor.Green}
      text={window.i18n('createAccount')}
    />
  );
};

// const ContinueSignUpButton = ({ continueSignUp }: { continueSignUp: any }) => {
//   return (
//     <SessionButton
//       onClick={continueSignUp}
//       buttonType={SessionButtonType.Brand}
//       buttonColor={SessionButtonColor.Green}
//       text={window.i18n('continue')}
//     />
//   );
// };

const SignUpDefault = (props: { createSessionID: () => void }) => {
  return (
    <div className="session-registration__content">
      <CreateSessionIdButton createSessionID={props.createSessionID} />
    </div>
  );
};

export const GoBackMainMenuButton = (props:any) => {
  console.log("goback:",props.assent)
  console.log("goback:",props.assent? true :false)
  const { setRegistrationPhase, setSignInMode, setSignUpMode } = useContext(RegistrationContext);
  return (
    <SessionIconButton
      iconSize="huge"
      iconType="arrow"
      iconPadding="5px"
      onClick={() => {
        setRegistrationPhase(RegistrationPhase.Start);
        setSignInMode(SignInMode.Default);
        setSignUpMode(SignUpMode.Default);
        props.assent? props.assent() :'';
        props.seedScreen? props.seedScreen() :'';
      }}
    />
  );
};

// const SignUpSessionIDShown = (props: { continueSignUp: () => void }) => {
//   return (
//     <div className="session-registration__content">
//       <Flex flexDirection="row" container={true} alignItems="center">
//         <GoBackMainMenuButton />

//         <div className="session-registration__unique-session-id">
//           {window.i18n('yourUniqueSessionID')}
//         </div>
//       </Flex>
//       <SessionIdEditable editable={false} placeholder={undefined} dataTestId="session-id-signup" />
//       <div className="session-description-long">{window.i18n('allUsersAreRandomly...')}</div>
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
  const [displayScreenHide,setDisplayScreenHide]=useState(true);
  const [displayAddressScreen,setAddressScreen] = useState(true);

  useEffect(() => {
    if (signUpMode === SignUpMode.SessionIDShown) {
      window.Session.setNewSessionID(hexGeneratedPubKey);
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
    return<div style={{background: '#101010ad',position: "absolute",width: "60%",height: "100%",top: "0px",right: "0px",display: 'flex',
    alignItems: "center"}} className="session-registration-loadingGif">
    <div  style={{background:"url(images/bchat/Load_animation.gif) no-repeat",width: "151px",height: "128px",margin: "0 auto"}}>
    </div>
    </div>
  }
  if(displayScreenHide)
  {
    return (
    <div className="session-registration__content" style={{width: '325px',color:'#353543'}}>
      <Flex flexDirection="row" container={true} alignItems="center">
        {/* <GoBackMainMenuButton assent={()=>props.assent(true)} /> */}
        <div style={{ position: 'relative', color: 'white', top: '-35px',left:"0px" }}>
        <GoBackMainMenuButton assent={()=>props.assent(true)} />
      </div>
        <Flex className="session-registration__welcome-session" padding="20px">
          {window.i18n('welcomeToYourSession')}
        </Flex>
      </Flex>
      <RegistrationUserDetails
        showDisplayNameField={true}
        showSeedField={false}
        displayName={displayName}
        handlePressEnter={signUpWithDetails}
        onDisplayNameChanged={(name: string) => {
          const sanitizedName = sanitizeSessionUsername(name);
          const trimName = sanitizedName.trim();
          setDisplayName(sanitizedName);
          setDisplayNameError(!trimName ? window.i18n('displayNameEmpty') : undefined);
        }}
        stealAutoFocus={true}
      />
      <SessionButton
        onClick={()=> {setDisplayScreenHide(false)
          // ,setShowRecoveryphase(true)
        }}
        buttonType={SessionButtonType.Brand}
        buttonColor={SessionButtonColor.Green}
        text={window.i18n('getStarted')}
        disabled={!enableCompleteSignUp}
      />
    </div>
    );
  }
  if(displayAddressScreen){
    console.log("displayAddressScreen:",displayAddressScreen)
   return (
    <>
        {!window.WalletAddress && <LoaderGif /> } 
       <DisplayIdAndAddress nextFunc={()=>{setAddressScreen(false)}} pubKey={hexGeneratedPubKey} walletAddress={window.WalletAddress} />
    </>
  );
  }
  console.log("displayAddressScreen123:",displayAddressScreen,props)
  // console.log("generatedRecoveryPhrase:",window.WalletAddress)
  // console.log("generatedRecoveryPhrase:",generatedRecoveryPhrase)
 
  // if(showRecoveryphase)
  // {
  //   console.log("showRecoveryphase:",showRecoveryphase,window.WalletAddress)
  //   return (
  //     <>
  //         {!window.WalletAddress && <LoaderGif /> } 

  //        <DisplayIdAndAddress nextFunc={()=>setShowRecoveryphase(false)} pubKey={hexGeneratedPubKey} walletAddress={window.WalletAddress} />
  //     </>
  //   );
  // }
  return (
  <>
  <ShowRecoveryPhase mnemonic={generatedRecoveryPhrase} nextFunc={signUpWithDetails} enableCompleteSignUp={enableCompleteSignUp}></ShowRecoveryPhase>
  </>
  
)
};
