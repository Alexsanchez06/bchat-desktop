import React from 'react';
import { useSelector } from 'react-redux';
import {
  getOnionPathDialog,
} from '../../state/selectors/modal';

import { OnionPathModal } from '../dialog/OnionStatusPathDialog';

export const SessionOnionPathScreen = () => {
  
  const onionPathModalState = useSelector(getOnionPathDialog);
 

  return (
    <>
      <OnionPathModal {...onionPathModalState} />

    </>
  );
};
