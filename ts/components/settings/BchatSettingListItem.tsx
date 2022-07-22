import React from 'react';
import classNames from 'classnames';
import { BchatButton, BchatButtonColor } from '../basic/BchatButton';
import { BchatToggle } from '../basic/BchatToggle';
import { BchatConfirmDialogProps } from '../dialog/BchatConfirm';

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

const BchatSettingsContent = (props: { children: React.ReactNode }) => {
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
      <BchatSettingsContent>{props.children}</BchatSettingsContent>
    </div>
  );
};

export const BchatToggleWithDescription = (props: {
  title?: string;
  description?: string;
  active: boolean;
  onClickToggle: () => void;
  confirmationDialogParams?: BchatConfirmDialogProps;
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

export const BchatSettingButtonItem = (props: ButtonSettingsProps) => {
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
