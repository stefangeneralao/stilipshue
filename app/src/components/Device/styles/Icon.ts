import styled from 'styled-components';
import WbIncandescentTwoToneIcon from '@material-ui/icons/WbIncandescentTwoTone';

export const IconWrapper = styled.div``;

export const Icon = styled(WbIncandescentTwoToneIcon)`
  && {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
  }
`;
