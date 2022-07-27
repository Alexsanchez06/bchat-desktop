import styled from 'styled-components';

export const LeftPaneSectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction:row;
  align-items: center;
  border-right: var(--border-bchat);
  overflow-y: auto;
  background-color:#128B17; 

  .bchat-icon-button {
      padding: 9px 9px;
	    margin: 5px 25px;
	    border-radius: 25px;
  }

  .module-avatar {
    height: 80px;
    display: flex;
    align-items: center;
  }

  // this is not ideal but it seems that nth-0last-child does not work
  #onion-path-indicator-led-id {
    margin: auto auto 0px auto;
    opacity: 1;
  }
`;
