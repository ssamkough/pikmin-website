import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';

const _app = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <Component {...pageProps} />
);

export default _app;
