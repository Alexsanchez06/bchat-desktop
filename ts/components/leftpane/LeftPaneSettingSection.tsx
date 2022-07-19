import React from 'react';
import classNames from 'classnames';


import { LeftPaneSectionHeader } from './LeftPaneSectionHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
  // SectionType,
  // setOverlayMode,
  // showLeftPaneSection,
  showSettingsSection,
} from '../../state/ducks/section';
import { getFocusedSettingsSection } from '../../state/selectors/section';
import { recoveryPhraseModal, updateDeleteAccountModal } from '../../state/ducks/modalDialog';
import { SessionButton, SessionButtonColor, SessionButtonType } from '../basic/SessionButton';
import { SessionIcon } from '../icon';
import { SessionSettingCategory } from '../settings/SessionSettings';
// import { resetConversationExternal } from '../../state/ducks/conversations';
// import { SessionIconType } from '../icon';

 import { ActionPanelOnionStatusLight } from '../dialog/OnionStatusPathDialog';
 import {  onionPathModal,} from '../../state/ducks/modalDialog';

const getCategories = () => {
  return [
    {
      id: SessionSettingCategory.Appearance,
      title: window.i18n('appearanceSettingsTitle'),
      icon:"appearance.svg",
      
    },
    {
      id: SessionSettingCategory.Privacy,
      title: window.i18n('privacySettingsTitle'),
      icon:"privacy.svg",
    },
    {
      id: SessionSettingCategory.Blocked,
      title: window.i18n('blockedSettingsTitle'),
      icon:"blocked_contact.svg"
    },
    {
      id: SessionSettingCategory.RecoverySeed,
      // title: window.i18n('blockedSettingsTitle'),
      title: "Recovery Seed",
      icon:"recovery_seed.svg"
    },
    {
      id: SessionSettingCategory.RecoveryKey,
      // title: window.i18n('notificationsSettingsTitle'),
      title: "Recovery Key",
      icon:"key.svg"
     
    },
    {
      id: SessionSettingCategory.MessageRequests,
      title:"View Message Request",
      // title: window.i18n('openMessageRequestInbox'),
      icon:"request.svg"
    },
    {
      id: SessionSettingCategory.Hops,
      // title: window.i18n('openMessageRequestInbox'),
      title: "Hops",
      icon:"Hops"
    },
  ];
};

const LeftPaneSettingsCategoryRow = (props: {
  item: { id: SessionSettingCategory; title: string; icon:string };
}) => {
  const { item } = props;
  const { id, title,icon} = item;
  const dispatch = useDispatch();
  const focusedSettingsSection = useSelector(getFocusedSettingsSection);

  // const isMessageRequestSetting = id === SessionSettingCategory.MessageRequests;

  const dataTestId = `${title.toLowerCase()}-settings-menu-item`;

  return (
    <div
      data-testid={dataTestId}
      key={id}
      className={classNames(
        'left-pane-setting-category-list-item',
        id === focusedSettingsSection ? 'active' : ''
      )}
      role="link"
      onClick={() => {
        // if (isMessageRequestSetting) {
        //   dispatch(showLeftPaneSection(SectionType.Message));
        //   dispatch(setOverlayMode('message-requests'));
        //   dispatch(resetConversationExternal());
        // } else {
          dispatch(showSettingsSection(id));
        // }
      }}
      style={{marginTop:'15px'}}
    >
      <div style={{display:"flex",}}>
        {icon==="Hops"? <span style={{paddingRight:"10px"}}> <ActionPanelOnionStatusLight
          dataTestId="onion-status-section"
           handleClick={()=> dispatch(onionPathModal({}))}
           isSelected={false}
          
           id={'onion-path-indicator-led-id'}
         /></span>:
         <i className="left-pane-setting-category-list-item-icons" style={{backgroundImage:`url(images/bchat/${icon})`}}></i>
         }
         
       {/* <i className="left-pane-setting-category-list-item-icons" style={{backgroundImage:`url(images/bchat/${icon})`}}></i> */}
     
        <span  className="left-pane-setting-category-list-item-span">{title}</span>
      </div>


      <div>
        {id === focusedSettingsSection && (
          <SessionIcon iconSize="medium" iconType="chevron" iconRotation={270} />
        )}
      </div>
    </div>
  );
};

const LeftPaneSettingsCategories = () => {
  const categories = getCategories();

  return (
    <div className="module-left-pane__list" key={0}>
      <div className="left-pane-setting-category-list">
        {categories.map(item => {
          return <LeftPaneSettingsCategoryRow key={item.id} item={item}   />;
        })}
      </div>
    </div>
  );
};

const LeftPaneBottomButtons = () => {
  const dangerButtonText = window.i18n('clearAllData');
  const showRecoveryPhrase = window.i18n('showRecoveryPhrase');

  const dispatch = useDispatch();

  return (
    <div className="left-pane-setting-bottom-buttons" key={1}>
      <SessionButton
        text={dangerButtonText}
        buttonType={SessionButtonType.SquareOutline}
        buttonColor={SessionButtonColor.Danger}
        onClick={() => {
          dispatch(updateDeleteAccountModal({}));
        }}
      />

      <SessionButton
        text={showRecoveryPhrase}
        buttonType={SessionButtonType.SquareOutline}
        buttonColor={SessionButtonColor.White}
        onClick={() => {
          dispatch(recoveryPhraseModal({}));
        }}
      />
    </div>
  );
};

export const LeftPaneSettingSection = () => {
  return (
    <div className="left-pane-setting-section">
      <LeftPaneSectionHeader />
      <div className="left-pane-setting-content">
        <LeftPaneSettingsCategories />
        <LeftPaneBottomButtons />
      </div>
    </div>
  );
};
