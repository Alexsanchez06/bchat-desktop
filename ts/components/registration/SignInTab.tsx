import React, { useContext, useState } from 'react';
import { sanitizeSessionUsername } from '../../session/utils/String';
import { Flex } from '../basic/Flex';
import { SessionButton, SessionButtonColor, SessionButtonType } from '../basic/SessionButton';
import { SessionSpinner } from '../basic/SessionSpinner';
import { SpacerLG } from '../basic/Text';
import {
  MAX_USERNAME_LENGTH,
  RegistrationContext,
  RegistrationPhase,
  signInWithLinking,
  signInWithRecovery,
} from './RegistrationStages';
// import { RegistrationUserDetails } from './RegistrationUserDetails';
// import { RestoreSeedInput } from './RestoreFromSeed';
import { GoBackMainMenuButton } from './SignUpTab';
// import { TermsAndConditions } from './TermsAndConditions';
import { SessionInput } from '../basic/SessionInput';
import { DisplaySeed } from './DisplaySeed';
// import { SessionIconButton } from '../icon/SessionIconButton';
const { clipboard } = require('electron')

export enum SignInMode {
  Default,
  UsingRecoveryPhrase,
  LinkDevice,
}
// tslint:disable: use-simple-attributes
// tslint:disable: react-unused-props-and-state

// const LinkDeviceButton = (props: { onLinkDeviceButtonClicked: () => any }) => {
//   return (
//     <SessionButton
//       onClick={props.onLinkDeviceButtonClicked}
//       buttonType={SessionButtonType.BrandOutline}
//       buttonColor={SessionButtonColor.Green}
//       text={window.i18n('linkDevice')}
//       dataTestId="link-device"
//     />
//   );
// };

const RestoreUsingRecoveryPhraseButton = (props: { onRecoveryButtonClicked: () => any }) => {
  return (
    <SessionButton
      onClick={props.onRecoveryButtonClicked}
      buttonType={SessionButtonType.BrandOutline}
      buttonColor={SessionButtonColor.Green}
      text={window.i18n('signIn')}
      dataTestId="restore-using-recovery"
    />
  );
};

const ContinueYourSessionButton = (props: {
  handleContinueYourSessionClick: () => any;
  disabled: boolean;
}) => {
  return (
    <SessionButton
      onClick={props.handleContinueYourSessionClick}
      buttonType={SessionButtonType.Brand}
      buttonColor={SessionButtonColor.Green}
      text={window.i18n('restore')}
      disabled={props.disabled}
      dataTestId="continue-session-button"
    />
  );
};

const SignInContinueButton = (props: {
  signInMode: SignInMode;
  disabled: boolean;
  handleContinueYourSessionClick: () => any;
}) => {
  if (props.signInMode === SignInMode.Default) {
    return null;
  }
  return (
    <ContinueYourSessionButton
      handleContinueYourSessionClick={props.handleContinueYourSessionClick}
      disabled={props.disabled}
    />
  );
};

const SignInButtons = (props: {
  signInMode: SignInMode;
  onRecoveryButtonClicked: () => any;
  onLinkDeviceButtonClicked: () => any;
}) => {
  if (props.signInMode !== SignInMode.Default) {
    return null;
  }
  return (
    <div>
      <RestoreUsingRecoveryPhraseButton onRecoveryButtonClicked={props.onRecoveryButtonClicked} />
      <SpacerLG />
      {/* <LinkDeviceButton onLinkDeviceButtonClicked={props.onLinkDeviceButtonClicked} /> */}
    </div>
  );
};

export const SignInTab = (props:any) => {
  const { setRegistrationPhase, signInMode, setSignInMode } = useContext(RegistrationContext);

  const [recoveryPhrase, setRecoveryPhrase] = useState('');
  const [recoveryPhraseError, setRecoveryPhraseError] = useState(undefined as string | undefined);
  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState<string | undefined>('');
  const [loading, setIsLoading] = useState(false);
  // const [seedInputScreen,setSeedInputScreen] = useState(false);

  const isRecovery = signInMode === SignInMode.UsingRecoveryPhrase;
  const isLinking = signInMode === SignInMode.LinkDevice;
  // const showTermsAndConditions = signInMode !== SignInMode.Default;
  const [screenName, setScreenName] = useState(false)
  const [blockheight, setBlockheight] = useState('');
  const [restoreDate, setRestoreDate] = useState('');

  // show display name input only if we are trying to recover from seed.
  // We don't need a display name when we link a device, as the display name
  // from the configuration message will be used.
  // const showDisplayNameField = isRecovery;

  // Display name is required only on isRecoveryMode
  const displayNameOK = (isRecovery && !displayNameError && !!displayName) || isLinking;

  // Seed is mandatory no matter which mode
  const seedOK = recoveryPhrase && !recoveryPhraseError;

  const activateContinueButton = seedOK && displayNameOK && !loading;

  const continueYourSession = async () => {
    if (isRecovery) {
      await signInWithRecovery({
        displayName,
        userRecoveryPhrase: recoveryPhrase,
      });
    } else if (isLinking) {
      setIsLoading(true);
      await signInWithLinking({
        userRecoveryPhrase: recoveryPhrase,
      });
      setIsLoading(false);
    }
  };

  const clickGoBack = () => {
    setScreenName(false)
  
    }

  async function assignSeed()
  {
   const recoverySeed = clipboard.readText();
   setRecoveryPhrase(recoverySeed);  
  }

  if (signInMode !== SignInMode.Default && !screenName) {

    return <>
      <div 
      style={{ position: 'relative', color: 'white', top: '33px',left:"8px",width:"30px",height:"30px" }}>
        <GoBackMainMenuButton assent={()=>props.assent(true)} />
      </div>
      <DisplaySeed
      iconfunc={()=>assignSeed()}
      assignRecoveryPhase={(seed: string) => {
              setRecoveryPhrase(seed);
              setRecoveryPhraseError(!seed ? window.i18n('recoveryPhraseEmpty') : undefined);}}  
      onNext={() => setScreenName(true)} 
      recoveryPhrase={recoveryPhrase} 
      />

    </>

  }
  
  // console.log("see:",seedInputScreen)
  // console.log("seed:",signInMode ,SignInMode.Default,SignInMode.UsingRecoveryPhrase)
  // if(signInMode == SignInMode.UsingRecoveryPhrase){
  //  return( <div className="session-registration__content">

  //   <>
  //     <GoBackMainMenuButton />
  //     <RestoreSeedInput nextScreen={(value:boolean)=>{setSeedInputScreen(value)}} ></RestoreSeedInput>
  //    </>
  //   </div>
  //  )
  // }
  // console.log("ssed:",seedInputScreen)
  
  return (
    
    <div className="session-registration__content">

      {screenName && (

        <>

          {/* <div style={{color:'white'}}>
            <SessionIconButton style={{top:"33px"}}
              iconSize="huge"
              iconType="chevron"
              iconRotation={90}
              iconPadding="5px"
              onClick={() => {
                setScreenName(false),
                  props.onShow()
              }}
            />
          </div> */}
          <div style={{ position: 'relative', color: 'white', top: '33px',width:"30px",height:"30px" }}>
          <GoBackMainMenuButton assent={()=>{
            props.assent(true);
            clickGoBack()}}
             />
          </div>
          <div style={{
            color: "white",
            fontFamily:"poppins",
            fontWeight: "600",
            fontSize: "24px",
            textAlign: 'center',
            paddingBottom: "30px"
          }}>Restore from Seed</div>
          {/* user Name */}
          <SessionInput
            autoFocus={true}
            label={window.i18n('displayName')}
            type="text"
            placeholder={window.i18n('enterDisplayName')}
            value={props.displayName}
            maxLength={MAX_USERNAME_LENGTH}
            onValueChanged={(name: string) => {
              const sanitizedName = sanitizeSessionUsername(name);
              const trimName = sanitizedName.trim();
              setDisplayName(sanitizedName);
              setDisplayNameError(!trimName ? window.i18n('displayNameEmpty') : undefined);}}
            onEnterPressed={props.handlePressEnter}
            inputDataTestId="display-name-input"
          />
          {/* block height */}
          <div>
            <hr style={{'width': '75%','color': '#353543','marginTop':"37px"}}></hr>
            <p style={{ color: "#82828D",paddingTop:"10px",fontSize:"13px" }}>If you dont know the restore blockheight, you can skip it.</p>

            <SessionInput
              autoFocus={true}
              // label={window.i18n('displayName')}

              type="text"
              placeholder={'Restore from Blockheight'}
              value={blockheight}
              maxLength={MAX_USERNAME_LENGTH}
              onValueChanged={(e) => setBlockheight(e)}
              onEnterPressed={props.handlePressEnter}
              inputDataTestId="display-name-input"
            />

          </div>

          <div style={{
              color: 'white',
              marginTop: "40px",
              textAlign: 'center'
            }}>
              OR
            </div>

          {/* restore from date */}

          <div style={{marginBottom:"56px"}} >
            
            <p style={{ color: "#82828D" ,fontSize:"13px"}}>If you dont know the restore Date, you can skip it.</p>

            <SessionInput
              autoFocus={true}
              // label={window.i18n('displayName')}
              type="text"
              placeholder={'Restore from Date'}
              value={restoreDate}
              maxLength={MAX_USERNAME_LENGTH}
              onValueChanged={(e) => setRestoreDate(e)}
              onEnterPressed={props.handlePressEnter}
              inputDataTestId="display-name-input"
            />

          </div>

          <SignInContinueButton
            signInMode={signInMode}
            handleContinueYourSessionClick={continueYourSession}
            disabled={!activateContinueButton}
          />
          {/* <RegistrationUserDetails
            showDisplayNameField={showDisplayNameField}
            showSeedField={true}
            displayName={displayName}
            handlePressEnter={continueYourSession}
            onDisplayNameChanged={(name: string) => {
              const sanitizedName = sanitizeSessionUsername(name);
              const trimName = sanitizedName.trim();
              setDisplayName(sanitizedName);
              setDisplayNameError(!trimName ? window.i18n('displayNameEmpty') : undefined);
            }}
            onSeedChanged={(seed: string) => {
              setRecoveryPhrase(seed);
              setRecoveryPhraseError(!seed ? window.i18n('recoveryPhraseEmpty') : undefined);
            }}
            recoveryPhrase={recoveryPhrase}
            stealAutoFocus={true}
          /> 
 */}

        </>
      )}

      <SignInButtons
        signInMode={signInMode}
        onRecoveryButtonClicked={() => {
          setRegistrationPhase(RegistrationPhase.SignIn);
          setSignInMode(SignInMode.UsingRecoveryPhrase);
          setRecoveryPhrase('');
          setDisplayName('');
          setIsLoading(false);
          props.assent(false);
        }}

        onLinkDeviceButtonClicked={() => {
          setRegistrationPhase(RegistrationPhase.SignIn);
          setSignInMode(SignInMode.LinkDevice);
          setRecoveryPhrase('');
          setDisplayName('');
          setIsLoading(false);
        }}

      />

      {loading && (
        <Flex
          container={true}
          justifyContent="center"
          alignItems="center"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            pointerEvents: 'all',
            backgroundColor: '#00000088',
          }}
        >
          <SessionSpinner loading={true} />
        </Flex>
      )}

      {/* {showTermsAndConditions && <TermsAndConditions />} */}
    </div>
  );
 
};
