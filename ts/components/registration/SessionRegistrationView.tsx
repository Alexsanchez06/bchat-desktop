import React from 'react';
// import { AccentText } from './AccentText';

import { RegistrationStages } from './RegistrationStages';
// import { SessionIcon } from '../icon';
import { SessionToastContainer } from '../SessionToastContainer';
import { SessionTheme } from '../../state/ducks/SessionTheme';
import { Flex } from '../basic/Flex';
import { setSignInByLinking } from '../../util/storage';

export const SessionRegistrationView = () => {
  React.useEffect(() => {
    void setSignInByLinking(false);
  }, []);
  return (
    <div className="session-fullscreen">
      <div className="session-full-screen-flow session-fullscreen">
        <SessionTheme>
          <div style={{background:"url(images/bchat/doodle_white.svg)",width:"100%",height:"100%"}}>
          <Flex
            flexDirection="row"
            container={true}
            height="100%"
            width='100%'
          >
            <Flex 
            className="session-content-left"
            alignItems="center"
            flexDirection="row"
            container={true}
            height="100%"
            width='40%'
            justifyContent="center"
            >
              <div className="session-content-logo" 
              style={{backgroundImage:"url(images/bchat/BChat_black_logo.gif)",width:400,height:370}} />
           </Flex>
          
          <Flex
            className="session-content"
            alignItems="center"
            flexDirection="column"
            container={true}
            height="100%"
            width='60%'
          >
            <Flex container={true} margin="auto" alignItems="center" flexDirection="column">
              <SessionToastContainer />
              {/* <SessionIcon iconSize={150} iconType="brand" /> */}

              {/* <AccentText /> */}
              <RegistrationStages />
            </Flex>
          </Flex>
          </Flex>
          </div>
        </SessionTheme>
      </div>
    </div>
  );
};
