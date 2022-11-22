import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ComponentProps<'div'>['children'];
}

const Container = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  padding: 10px;
`;

const BodyContainer = ({ children }: Props) => <Container>{children}</Container>;

export default BodyContainer;
