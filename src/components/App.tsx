import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ComponentProps<'div'>['children'];
}

const TITLE = 'pikmin';
const BACKGROUND_OPACITY = 0.4;
const WALLPAPER_PATH = '/assets/wallpaper.png';
const FAVICON_PATH = '/favicon.ico';
const DESCRIPTION = 'website that talks about decompilation projects going on for pikmin';

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, ${BACKGROUND_OPACITY}),
      rgba(255, 255, 255, ${BACKGROUND_OPACITY})
    ),
    url('${WALLPAPER_PATH}');
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * renders base layout for every page
 */
const App = ({ children }: Props): React.ReactElement => (
  <>
    <Head>
      <title>{TITLE}</title>
      <link rel="icon" type="image/png" href={FAVICON_PATH} />
      <meta name="description" content={DESCRIPTION} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Body>
      <Container>{children}</Container>
    </Body>
  </>
);

export default App;
