import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

interface Props {
  urlString: string;
  children?: React.ComponentProps<'div'>['children'];
}

const Hyper = styled.a`
  color: ${theme.colors.black};

  &:hover {
    color: ${theme.colors.white};
  }
`;

/**
 * renders component used for links
 */
const Link = ({ urlString, children }: Props): React.ReactElement => (
  <Hyper href={urlString} target="_blank" rel="noopener">
    {children || urlString}
  </Hyper>
);

export default Link;
