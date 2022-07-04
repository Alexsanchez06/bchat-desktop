import React, { useState } from 'react';
// tslint:disable: use-simple-attributes no-submodule-imports

import { useDispatch ,useSelector} from 'react-redux';
// import { SessionButton, SessionButtonColor, SessionButtonType } from '../../basic/SessionButton';
import { SessionIdEditable } from '../../basic/SessionIdEditable';
import { SessionSpinner } from '../../basic/SessionSpinner';
// import { OverlayHeader } from './OverlayHeader';
import { setOverlayMode } from '../../../state/ducks/section';
import { PubKey } from '../../../session/types';
import { ConversationTypeEnum } from '../../../models/conversation';
import { SNodeAPI } from '../../../session/apis/snode_api';
import { onsNameRegex } from '../../../session/apis/snode_api/SNodeAPI';
import { getConversationController } from '../../../session/conversations';
import { ToastUtils } from '../../../session/utils';
import { openConversationWithMessages } from '../../../state/ducks/conversations';
import useKey from 'react-use/lib/useKey';

import { getOurNumber } from '../../../state/selectors/user';

export const OverlayMessage = () => {
  const dispatch = useDispatch();

  function closeOverlay() {
    dispatch(setOverlayMode(undefined));
  }

  useKey('Escape', closeOverlay);
  const [pubkeyOrOns, setPubkeyOrOns] = useState('');
  const [loading, setLoading] = useState(false);
const ourNumber = useSelector(getOurNumber);


  // const title = window.i18n('newSession');
  const buttonText = window.i18n('next');
  // const descriptionLong = window.i18n('usersCanShareTheir...');
  const descriptionLong = "Share your BChat ID with your friends. You can find your BChat ID below."

  // const subtitle = window.i18n('enterSessionIDOrONSName');
  // const placeholder = window.i18n('enterSessionIDOfRecipient');
  const placeholder = "Enter BChat ID";

  async function handleMessageButtonClick() {
    if ((!pubkeyOrOns && !pubkeyOrOns.length) || !pubkeyOrOns.trim().length) {
      ToastUtils.pushToastError('invalidPubKey', window.i18n('invalidNumberError')); // or ons name
      return;
    }
    const pubkeyorOnsTrimmed = pubkeyOrOns.trim();

    if (!PubKey.validateWithError(pubkeyorOnsTrimmed)) {
      // this is a pubkey
      await getConversationController().getOrCreateAndWait(
        pubkeyorOnsTrimmed,
        ConversationTypeEnum.PRIVATE
      );

      await openConversationWithMessages({ conversationKey: pubkeyorOnsTrimmed, messageId: null });
      closeOverlay();
    } else {
      // this might be an ONS, validate the regex first
      const mightBeOnsName = new RegExp(onsNameRegex, 'g').test(pubkeyorOnsTrimmed);
      if (!mightBeOnsName) {
        ToastUtils.pushToastError('invalidPubKey', window.i18n('invalidNumberError'));
        return;
      }
      setLoading(true);
      try {
        const resolvedSessionID = await SNodeAPI.getSessionIDForOnsName(pubkeyorOnsTrimmed);
        if (PubKey.validateWithError(resolvedSessionID)) {
          throw new Error('Got a resolved ONS but the returned entry is not a vlaid SessionID');
        }
        // this is a pubkey
        await getConversationController().getOrCreateAndWait(
          resolvedSessionID,
          ConversationTypeEnum.PRIVATE
        );

        await openConversationWithMessages({ conversationKey: resolvedSessionID, messageId: null });

        closeOverlay();
      } catch (e) {
        window?.log?.warn('failed to resolve ons name', pubkeyorOnsTrimmed, e);
        ToastUtils.pushToastError('invalidPubKey', window.i18n('failedResolveOns'));
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="module-left-pane-overlay">
      {/* <OverlayHeader  subtitle={"Enter the Bchat"} /> */}
      <p className="module-left-pane__subHeader" >Enter BChat ID</p>
      <SessionIdEditable
        editable={!loading}
        placeholder={placeholder}
        onChange={setPubkeyOrOns}
        dataTestId="new-session-conversation"
      />

      <SessionSpinner loading={loading} />

      <div className="session-description-long">{descriptionLong}</div>

      <p className="module-left-pane__subHeader">BChat ID</p>
      <SessionIdEditable
        // editable={!loading}
        value={ourNumber}
        // onChange={setPubkeyOrOns}
        dataTestId="new-session-conversation"
      />

     <button className='nextButton'  onClick={handleMessageButtonClick}>{buttonText}</button>
      {/* <SessionButton
        buttonColor={SessionButtonColor.Green}
        buttonType={SessionButtonType.BrandOutline}
        text={buttonText}
        disabled={false}
        onClick={handleMessageButtonClick}
      /> */}
    </div>
  );
};
