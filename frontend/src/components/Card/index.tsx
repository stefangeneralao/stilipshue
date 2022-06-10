import React, { ComponentPropsWithRef } from 'react';
import { Card as StyledCard } from './style';

type StyledCardProps = ComponentPropsWithRef<typeof StyledCard>;
interface Props {
  children: React.ReactNode;
}

const Card = ({ children, ...props }: Props & StyledCardProps) => (
  <StyledCard {...props}>{children}</StyledCard>
);

export default Card;
