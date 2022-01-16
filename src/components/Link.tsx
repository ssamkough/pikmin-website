import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

interface Props {
  urlString: string;
  children?: React.ComponentProps<'div'>['children'];
  reverseColors?: boolean;
}

const Hyper = styled.a<{ reverseColors?: boolean }>`
  font-family: Pikmin;
  color: ${({ reverseColors }) => (reverseColors ? theme.colors.white : theme.colors.black)};

  &:hover {
    color: ${({ reverseColors }) => (reverseColors ? theme.colors.black : theme.colors.white)};
  }
`;

/**
 * renders component used for links
 */
const Link = ({ urlString, children, reverseColors }: Props): React.ReactElement => (
  <Hyper href={urlString} target="_blank" rel="noopener" reverseColors={reverseColors}>
    {children || urlString}
  </Hyper>
);

export default Link;
