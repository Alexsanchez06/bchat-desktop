import styled from 'styled-components';

export const LeftPaneSectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction:row;
  align-items: center;
  border-right: var(--border-session);
  overflow-y: auto;
  background-color:#128B17;

  .session-icon-button {
    padding: 30px 34px;
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
