import React from 'react';
import classNames from 'classnames';
import { BchatButton, BchatButtonColor } from '../basic/BchatButton';
import { BchatToggle } from '../basic/BchatToggle';
import { SessionConfirmDialogProps } from '../dialog/SessionConfirm';

type ButtonSettingsProps = {
  title?: string;
  description?: string;
  buttonColor: BchatButtonColor;
  buttonText: string;
  dataTestId?: string;
  onClick: () => void;
};

const SettingsTitleAndDescription = (props: { title?: string; description?: string }) => {
  return (
    <div className="session-settings-item__info">
      <div className="session-settings-item__title">{props.title}</div>

      {props.description && (
        <div className="session-settings-item__description">{props.description}</div>
      )}
    </div>
  );
};

const SessionSettingsContent = (props: { children: React.ReactNode }) => {
  return <div className="session-settings-item__content">{props.children}</div>;
};

export const BchatSettingsItemWrapper = (props: {
  inline: boolean;
  title?: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={classNames('session-settings-item', props.inline && 'inline')}>
      <SettingsTitleAndDescription title={props.title} description={props.description} />
      <SessionSettingsContent>{props.children}</SessionSettingsContent>
    </div>
  );
};

export const SessionToggleWithDescription = (props: {
  title?: string;
  description?: string;
  active: boolean;
  onClickToggle: () => void;
  confirmationDialogParams?: SessionConfirmDialogProps;
}) => {
  const { title, description, active, onClickToggle, confirmationDialogParams } = props;

  return (
    <BchatSettingsItemWrapper title={title} description={description} inline={true}>
      <BchatToggle
        active={active}
        onClick={onClickToggle}
        confirmationDialogParams={confirmationDialogParams}
      />
    </BchatSettingsItemWrapper>
  );
};

export const SessionSettingButtonItem = (props: ButtonSettingsProps) => {
  const { title, description, buttonColor, buttonText, dataTestId, onClick } = props;

  return (
    <BchatSettingsItemWrapper title={title} description={description} inline={true}>
      <BchatButton
        dataTestId={dataTestId}
        text={buttonText}
        buttonColor={buttonColor}
        onClick={onClick}
      />
    </BchatSettingsItemWrapper>
  );
};
