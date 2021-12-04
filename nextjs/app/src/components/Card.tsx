import React from 'react';
import styled from 'styled-components';
import { Card as MuiCard } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const StyledCard = styled(MuiCard)<{ disabled?: boolean }>`
  display: grid;
  grid-template-rows: min-content auto;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  position: relative;
  margin: 5px;
  padding: 15px 25px;

  background: ${(props) =>
    props.disabled
      ? 'linear-gradient(81deg,rgba(230, 230, 230, 1) 0%,rgba(208, 208, 208, 1) 100%)'
      : 'white'};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export default StyledCard;
