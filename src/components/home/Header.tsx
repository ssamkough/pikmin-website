import React from 'react';
import styled from 'styled-components';
import Text from '../library/Text';

const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Heading = styled.h1`
  padding: 0px;
  margin: 0px;
  font-size: inherit;
`;

/**
 * Header of the home page
 */
const Header = (): React.ReactElement => (
  <Container>
    <Heading>
      <Text variant="h0" font="Pikmin" color="white">
        pikmin
      </Text>{' '}
      <Text variant="h0" font="Pikmin" color="pink">
        decomp
      </Text>
    </Heading>
  </Container>
);

export default Header;
