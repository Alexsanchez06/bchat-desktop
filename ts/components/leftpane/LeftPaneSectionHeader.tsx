import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { disableRecoveryPhrasePrompt } from '../../state/ducks/userConfig';
// import { getShowRecoveryPhrasePrompt } from '../../state/selectors/userConfig';
import { recoveryPhraseModal } from '../../state/ducks/modalDialog';
import { Flex } from '../basic/Flex';
import { getFocusedSection, getOverlayMode } from '../../state/selectors/section';
import { SectionType, setOverlayMode } from '../../state/ducks/section';
import { BchatButton, BchatButtonType } from '../basic/BchatButton';
import { BchatIcon, BchatIconButton } from '../icon';
import { isSignWithRecoveryPhrase } from '../../util/storage';

import { Avatar, AvatarSize } from '../avatar/Avatar';
import { getOurNumber } from '../../state/selectors/user';
import {  editProfileModal} from '../../state/ducks/modalDialog';

// import { switchHtmlToDarkTheme, switchHtmlToLightTheme } from '../../state/ducks/SessionTheme';



const SectionTitle = styled.h1`
  padding: 0 var(--margins-sm);
  flex-grow: 1;
  color: var(--color-text);
  font-family:$bchat-font-poppin-semibold;
`;

export const LeftPaneSectionHeader = (props: { buttonClicked?: any }) => {
  // const showRecoveryPhrasePrompt = useSelector(getShowRecoveryPhrasePrompt);
  const focusedSection = useSelector(getFocusedSection);
  const overlayMode = useSelector(getOverlayMode);
  const bChatId=useSelector(getOurNumber)
  const dispatch = useDispatch();

  let label: string | undefined;

  const isMessageSection = focusedSection === SectionType.Message;
  const isMessageRequestOverlay = overlayMode === 'message-requests';

  const showBackButton = isMessageRequestOverlay && isMessageSection;

  switch (focusedSection) {
    case SectionType.Contact:
      label = window.i18n('contactsHeader');
      break;
    case SectionType.Settings:
      label = window.i18n('settingsHeader');
      break;
    case SectionType.Message:
      
      label = isMessageRequestOverlay
        ? window.i18n('messageRequests')
        // : window.i18n('messagesHeader');
        : "BChat";


      break;
    default:
  }

  // function handleClick()
  // {
  //   const themeFromSettings = window.Events.getThemeSetting();
  //     const updatedTheme = themeFromSettings === 'dark' ? 'light' : 'dark';
  //     window.setTheme(updatedTheme);
  //     if (updatedTheme === 'dark') {
  //       switchHtmlToDarkTheme();
  //     } else {
  //       switchHtmlToLightTheme();
  //     }
  // }

  function verifyScreens() {
    if (SectionType.Settings!==focusedSection) {
      return  <Avatar
        size={AvatarSize.M}
      
      onAvatarClick={()=>dispatch(editProfileModal({}))}
        pubkey={bChatId}
        dataTestId="leftpane-primary-avatar"
      />

    }
    else{
      return <div style={{marginLeft:"20px",color:"white"}}>
         <BchatIcon  
         iconType={"gear"}
         iconColor={"#fff"}
         iconSize={"large"}
         />
     </div>
       
    }
    
  }

// function moon ()
// {
//   if (SectionType.Settings ===focusedSection) {
//     return<BchatIconButton
//   iconSize="large"
//   iconType={'moon'}
//   dataTestId="theme-section"
//   iconColor={undefined}
//   onClick={handleClick}
 
// />
//   }
// }

  return (
    <Flex flexDirection="column">
      <div className="module-left-pane__header"> 
        {showBackButton && (
          <BchatIconButton
            onClick={() => {
              dispatch(setOverlayMode(undefined));
            }}
            iconType="chevron"
            iconRotation={90}
            iconSize="medium"
            margin="0 0 var(--margins-xs) var(--margins-xs)"
          />
        )}
       
        {verifyScreens()}
       
        <SectionTitle>{label}</SectionTitle>

          {/* {moon()} */}
        {isMessageSection && !isMessageRequestOverlay && (
          <BchatButton onClick={props.buttonClicked} dataTestId="new-conversation-button">
            <BchatIcon iconType="plus" iconSize="small" iconColor="white" />
          </BchatButton>
        )}
      </div>
      {/* {showRecoveryPhrasePrompt && <LeftPaneBanner />} */}
    </Flex>
  );
};

const BannerInner = () => {
  const dispatch = useDispatch();

  const showRecoveryPhraseModal = () => {
    dispatch(disableRecoveryPhrasePrompt());
    dispatch(recoveryPhraseModal({}));
  };

  return (
    <StyledBannerInner>
      <p>{window.i18n('recoveryPhraseRevealMessage')}</p>
      <BchatButton
        buttonType={BchatButtonType.Default}
        text={window.i18n('recoveryPhraseRevealButtonText')}
        onClick={showRecoveryPhraseModal}
        dataTestId="reveal-recovery-phrase"
      />
    </StyledBannerInner>
  );
};

export const LeftPaneBanner = () => {
  const section = useSelector(getFocusedSection);
  const isSignInWithRecoveryPhrase = isSignWithRecoveryPhrase();

  if (section !== SectionType.Message || isSignInWithRecoveryPhrase) {
    return null;
  }

  return (
    <StyledLeftPaneBanner>
      <StyledProgressBarContainer>
        <StyledProgressBarInner />
      </StyledProgressBarContainer>
      <StyledBannerTitle>
        {window.i18n('recoveryPhraseSecureTitle')} <span>90%</span>
      </StyledBannerTitle>
      <Flex flexDirection="column" justifyContent="space-between" padding={'var(--margins-sm)'}>
        <BannerInner />
      </Flex>
    </StyledLeftPaneBanner>
  );
};

const StyledProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  flex-direction: row;
  background: var(--color-session-border);
`;

const StyledProgressBarInner = styled.div`
  background: var(--color-accent);
  width: 90%;
  transition: width 0.5s ease-in;
  height: 100%;
`;

export const StyledBannerTitle = styled.div`
  line-height: 1.3;
  font-size: var(--font-size-md);
  font-weight: bold;
  margin: var(--margins-sm) var(--margins-sm) 0 var(--margins-sm);

  span {
    color: var(--color-text-accent);
  }
`;

export const StyledLeftPaneBanner = styled.div`
  background: var(--color-recovery-phrase-banner-background);
  display: flex;
  flex-direction: column;
  border-bottom: var(--session-border);
`;

const StyledBannerInner = styled.div`
  p {
    margin: 0;
  }

  .left-pane-banner___phrase {
    margin-top: var(--margins-md);
  }

  .bchat-button {
    margin-top: var(--margins-sm);
  }
`;
