import type { ShellyRelayNetworkState } from 'src/types';
import styled from 'styled-components';

interface Props {
  state: ShellyRelayNetworkState;
}

export const Device = styled.div<Props>`
  display: grid;
  grid-template-rows: min-content auto;
  grid-template-columns: 0 auto;
  grid-gap: 10px;

  position: relative;
  margin: 5px;
  padding: 15px 25px;

  background: ${(props) => {
    if (props.state === 'on') {
      return `linear-gradient(
        81deg,
        rgba(250, 250, 250, 1) 0%,
        rgba(242, 242, 242, 1) 100%);
      `;
    } else {
      return `linear-gradient(
        81deg,
        rgba(230,230,230,1) 0%,
        rgba(208,208,208,1) 100%);
      `;
    }
  }};

  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
`;
