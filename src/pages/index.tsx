import React from 'react';
import styled from 'styled-components';
import App from '../components/App';
import Image from '../components/Image';
import Link from '../components/Link';
import Text from '../components/Text';

const Container = styled.div`
  max-width: 800px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const Body = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  padding: 10px;
`;

const Flex = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  max-width: 800px;
  max-height: 100px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
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
        </Text>
        <Text variant="h0" font="Pikmin" color="pink">
          decomp
        </Text>
      </Header>
      <Body>
        <Text variant="h2" font="Pikmin" color="pink">
          this website is home to the pikmin decompilation projects
        </Text>
        <Flex>
          <Text variant="h2" font="Pikmin" color="pink">
            the pikmin decompilation projects are ongoing projects to reverse-engineer the
            sourcecode for{' '}
            <Link urlString="https://github.com/projectPiki/pikmin" reverseColors>
              pikmin 1
            </Link>{' '}
            and{' '}
            <Link urlString="https://github.com/projectPiki/pikmin2" reverseColors>
              pikmin 2
            </Link>
          </Text>
        </Flex>
        <Text variant="h2" font="Pikmin" color="white">
          pikmin 1 progress: ???
        </Text>
        <Text variant="h2" font="Pikmin" color="white">
          pikmin 2 progress: ???
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
