import React from 'react';
import styled from 'styled-components';
import App from '../components/core/App';
import Body from '../components/home/Body';
import Footer from '../components/home/Footer';
import Header from '../components/home/Header';

const Outer = styled.div`
  max-width: 800px;
  height: 100%;
  padding: 20px;
`;

const Inner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

/**
 * Renders home page that displays information about projects
 */
const Home = (): React.ReactElement => (
  <App>
    <Outer>
      <Inner>
        <Header />
        <Body />
        <Footer />
      </Inner>
    </Outer>
  </App>
);

export default Home;
