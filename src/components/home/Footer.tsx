import React from 'react';
import styled from 'styled-components';
import Image from '../library/Image';

const GITHUB_ORGANIZATION_URL = 'https://github.com/projectPiki';
const DISCORD_INVITATION_URL = 'https://discord.gg/CWKqYMePX8';

const Container = styled.footer`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

/**
 * Footer of the home page
 */
const Footer = (): React.ReactElement => (
  <Container>
    <Image src="/assets/github.png" alt="github logo" link={GITHUB_ORGANIZATION_URL} size="large" />
    <Image
      src="/assets/discord.png"
      alt="discord logo"
      link={DISCORD_INVITATION_URL}
      size="large"
    />
  </Container>
);

export default Footer;
