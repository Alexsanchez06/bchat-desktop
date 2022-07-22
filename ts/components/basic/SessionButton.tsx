import React, { ReactNode } from 'react';
import classNames from 'classnames';

export enum BchatButtonType {
  Brand = 'brand',
  BrandOutline = 'brand-outline',
  Default = 'default',
  DefaultOutline = 'default-outline',
  Square = 'square',
  SquareOutline = 'square-outline',
  Simple = 'simple',
}

export enum SessionButtonColor {
  Green = 'green',
  White = 'white',
  Primary = 'primary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  None = '',
}

type Props = {
  text?: string;
  disabled?: boolean;
  buttonType: BchatButtonType;
  buttonColor: SessionButtonColor;
  onClick: any;
  children?: ReactNode;
  dataTestId?: string;
  icon?: boolean;
  style?:any;
};

export const SessionButton = (props: Props) => {
  const { buttonType, dataTestId, buttonColor, text, disabled, onClick } = props;

  const clickHandler = (e: any) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const buttonTypes = [];
  const onClickFn = disabled ? () => null : clickHandler;

  buttonTypes.push(buttonType);
  if (buttonType.includes('-outline')) {
    buttonTypes.push(buttonType.replace('-outline', ''));
  }

  return (
    <>   
     {props.icon ? <div
      style={props.style}
     
      onClick={onClickFn}
      data-testid={dataTestId}
    >
      {props.children || text}
    </div>
  : <div
  className={classNames('session-button', ...buttonTypes, buttonColor, disabled && 'disabled')}
  role="button"
  onClick={onClickFn}
  data-testid={dataTestId}
>
  {props.children || text}
</div>}
</>

  );
};

SessionButton.defaultProps = {
  disabled: false,
  buttonType: BchatButtonType.Default,
  buttonColor: SessionButtonColor.Primary,
  onClick: null,
} as Partial<Props>;
