import { ContentWrapper } from '../../common/ContentWrapper';
import styled from 'styled-components';

export const Devices = styled(ContentWrapper)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-auto-rows: 1fr;
`;
