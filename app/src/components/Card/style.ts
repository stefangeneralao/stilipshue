import styled from 'styled-components';
import { Card as MuiCard } from '@mui/material';

export const Card = styled(MuiCard)`
  margin: 5px;
  padding: 15px 25px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.2);
  }
`;
