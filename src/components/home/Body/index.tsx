import React from 'react';
import styled from 'styled-components';
import Charts from './Charts';
import Description from './Description';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/**
 * Renders the description and chart data of the pikmin 2 decompilation progress
 */
const Body = (): React.ReactElement => (
  <Container>
    <Description />
    <Charts />
  </Container>
);

export default Body;
