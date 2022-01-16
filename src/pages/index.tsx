import React from 'react';
import styled, { css } from 'styled-components';
import App from '../components/App';
import Image from '../components/Image';
import Text from '../components/Text';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px;
`;

const commonCSS = css`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  display: flex;
`;

const Header = styled.div``;

const Body = styled.div`
  max-width: 800px;
  max-height: 400px;
  ${commonCSS};
  padding: 10px;
`;

const Footer = styled.div`
  max-width: 800px;
  max-height: 100px;
  ${commonCSS};
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

/**
 * renders home page that displays information about projects
 */
const Home = (): React.ReactElement => (
  <App>
    <Container>
      <Header>
        <Text variant="h0" font="Pikmin" color="white">
          pikmin
        </Text>{' '}
        <Text variant="h0" font="Pikmin" color="pink">
          decomp
        </Text>
      </Header>
      <Body>
        <Text variant="h2" color="pink">
          the pikmin decompilation projects are managed by a bunch of clever folks
        </Text>
      </Body>
      <Footer>
        <Image
          src="/assets/github.png"
          alt="github logo"
          link="https://github.com/projectPiki"
          size="large"
        />
        <Image
          src="/assets/discord.png"
          alt="discord logo"
          link="https://github.com/projectPiki"
          size="large"
        />
      </Footer>
    </Container>
  </App>
);

export default Home;
