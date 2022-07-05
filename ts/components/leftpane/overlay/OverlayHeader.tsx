import React from 'react';
import { useDispatch } from 'react-redux';
import { setOverlayMode } from '../../../state/ducks/section';
import { SpacerMD } from '../../basic/Text';
import { SessionIconButton } from '../../icon';

export const OverlayHeader = ({ subtitle, title,hideExit }: { title: string; subtitle: string;hideExit:any}) => {
  const dispatch = useDispatch();

  return (
    <>
     {hideExit ?"":
     <div className="exit">
     <SessionIconButton
       iconSize="small"
       iconType="chevron"
       iconRotation={90}
       onClick={() => {
         dispatch(setOverlayMode(undefined));
       }}
     />
   </div>
}
      
      <SpacerMD />

      <h2>{title}</h2>

      <h3>
        {subtitle}
        <hr className="green-border" />
      </h3>
      <hr className="white-border" />
    </>
  );
};
