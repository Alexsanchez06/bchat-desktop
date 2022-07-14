// import Slider from 'rc-slider';
import React from 'react';
// tslint:disable-next-line: no-submodule-imports

import useUpdate from 'react-use/lib/useUpdate';
import { SessionSettingsItemWrapper } from './SessionSettingListItem';
import { SessionIconButton } from '../icon';

export const ZoomingSessionSlider = (props: { onSliderChange?: (value: number) => void }) => {
  const forceUpdate = useUpdate();
  const handleSlider = (valueToForward: number) => {
    props?.onSliderChange?.(valueToForward);
    window.setSettingValue('zoom-factor-setting', valueToForward);
    window.updateZoomFactor();
    forceUpdate();
  };
  // const currentValueFromSettings = window.getSettingValue('zoom-factor-setting') || 100;
  
  
  return (
    <SessionSettingsItemWrapper title={window.i18n('zoomFactorSettingTitle')} inline={true}>
      {/* <div className="slider-wrapper">
        <Slider
          dots={true}
          step={20}
          min={60}
          max={200}
          defaultValue={currentValueFromSettings}
          onAfterChange={handleSlider}  
        /> 

        <div className="slider-info">
          <p>{currentValueFromSettings}%</p>
        </div>
      </div> */}
      <div className="session-settings-item__selection">
      <div className='session-settings-item__dropdownValue' >100%  <SessionIconButton
        iconType="chevron"
        iconSize="medium"
        // iconRotation={270}
        onClick={() => {
         
        }}
        dataTestId="back-button-conversation-options"
      /></div>
      <div className='session-settings-item__dropdownValue__box'>

      </div>
    </div>
    </SessionSettingsItemWrapper>
  );
};
