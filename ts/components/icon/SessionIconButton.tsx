import React from 'react';
import classNames from 'classnames';
import { SessionIcon, SessionIconProps } from '../icon';
import _ from 'lodash';
import { BchatNotificationCount } from './BchatNotificationCount';

interface SProps extends SessionIconProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  notificationCount?: number;
  isSelected?: boolean;
  isHidden?: boolean;
  margin?: string;
  dataTestId?: string;
  id?: string;
  style?: any;
}

const SessionIconButtonInner = React.forwardRef<HTMLDivElement, SProps>((props, ref) => {
  const {
    iconType,
    iconSize,
    iconColor,
    iconRotation,
    isSelected,
    notificationCount,
    glowDuration,
    glowStartDelay,
    noScale,
    isHidden,
    backgroundColor,
    borderRadius,
    iconPadding,
    margin,
    id,
    dataTestId,
    // style
  } = props;
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) {
      e.stopPropagation();
      props.onClick(e);
    }
  };

  return (
    <div
      className={classNames('session-icon-button', iconSize, isSelected ? 'no-opacity' : '')}
      // className={classNames('session-icon-button', iconSize,)}
     
      role="button"
      ref={ref}
      id={id}
      onClick={clickHandler}
      style={{ display: isHidden ? 'none' : 'flex', margin: margin ? margin : '',alignItems:"center" }}
      data-testid={dataTestId}
    >
      <SessionIcon
        iconType={iconType}
        iconSize={iconSize}
        iconColor={iconColor}
        iconRotation={iconRotation}
        glowDuration={glowDuration}
        glowStartDelay={glowStartDelay}
        noScale={noScale}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        iconPadding={iconPadding}
      />
      {Boolean(notificationCount) && <BchatNotificationCount count={notificationCount} />}
    </div>
  );
});

export const SessionIconButton = React.memo(SessionIconButtonInner, _.isEqual);
