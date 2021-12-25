import styled, { css } from 'styled-components';
import { Switch, Typography } from '@mui/material';
import { WbIncandescentTwoTone, Error } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '~/components/Card';

export const Relays = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
`;

export const RelayCard = styled(Card)<{ disabled?: boolean }>`
  display: grid;
  grid-template-rows: 38px auto;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  background: ${(props) => (props.disabled ? '#f0f0f0' : 'white')};

  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: grid;
  align-items: center;
`;

export const StyledCommonIcon = css``;

export const BulbIcon = styled(WbIncandescentTwoTone)`
  ${StyledCommonIcon}
`;

export const ErrorIcon = styled(Error)`
  ${StyledCommonIcon}
`;

export const LoadingIcon = styled(CircularProgress)`
  ${StyledCommonIcon}
`;

export const P = styled(Typography)`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  grid-column: 1 / -1;
`;

export const StyledSwitch = styled(Switch)`
  margin-left: auto;
`;
