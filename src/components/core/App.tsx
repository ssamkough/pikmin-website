import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ComponentProps<'div'>['children'];
}

const TITLE = 'pikmin decomp';
const BACKGROUND_OPACITY = 0.4;
const DESCRIPTION = 'website that talks about decompilation projects going on for pikmin';
const WALLPAPER_PATH = '/assets/wallpaper.png';
const WALLPAPER_ALT = "pikmins playin' together";
const FAVICON_PATH = '/favicon.ico';
const PAGE_URL = 'https://pikmin.dev/';

const Body = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(255, 255, 255, ${BACKGROUND_OPACITY}),
      rgba(255, 255, 255, ${BACKGROUND_OPACITY})
    ),
    url('${WALLPAPER_PATH}');
  background-size: 100% 100%;
  overflow: scroll;
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

      <meta property="og:type" content="website" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={WALLPAPER_PATH} />
      <meta property="og:image:secure_url" content={WALLPAPER_PATH} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:alt" content={WALLPAPER_ALT} />
      <meta property="og:url" content={PAGE_URL} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@ssamkough" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={WALLPAPER_PATH} />
      <meta name="twitter:image:alt" content={WALLPAPER_ALT} />
      <meta name="twitter:url" content={PAGE_URL} />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Body>
      <Container>{children}</Container>
    </Body>
  </>
);

export default App;
