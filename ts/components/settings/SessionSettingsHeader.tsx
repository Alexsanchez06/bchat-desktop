import React from 'react';
import { SettingsViewProps } from './SessionSettings';
import { Avatar, AvatarSize } from '../avatar/Avatar';
import { editProfileModal,} from '../../state/ducks/modalDialog';
import { useDispatch ,useSelector} from 'react-redux';
import { getOurNumber } from '../../state/selectors/user';

type Props = Pick<SettingsViewProps, 'category'> & {
  categoryTitle: string;
};

export const SettingsHeader = (props: Props) => {
  const { categoryTitle } = props;
  const dispatch = useDispatch();
  const ourNumber = useSelector(getOurNumber);
  return (
    <div className="session-settings-header">
      <div style={{paddingLeft:'15px'}}>
      <Avatar
        size={AvatarSize.M}
        onAvatarClick={()=>dispatch(editProfileModal({}))}
        pubkey={ourNumber}
        dataTestId="leftpane-primary-avatar"
      />
      </div>
      <div className="session-settings-header-title">{categoryTitle}</div>  
    </div>
  );
};
