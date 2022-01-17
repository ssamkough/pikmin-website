import React from 'react';
import styled, { css, CSSObject } from 'styled-components';
import { ColorVariant } from '../styles/theme';

type TextVariant = 'h0' | 'h1' | 'h2' | 'h3';

type FontVariant = 'Pikmin';

interface Props {
  children: React.ComponentProps<'div'>['children'];
  variant: TextVariant;
  font?: FontVariant;
  color?: ColorVariant;
}

const variants: Record<TextVariant, CSSObject> = {
  h0: {
    'font-size': '48px',
    'font-weight': 'bolder',
    'line-height': '2.5rem',
  },
  h1: {
    'font-size': '32px',
    'font-weight': 'bolder',
    'line-height': '2.5rem',
  },
  h2: {
    'font-size': '24px',
    'font-weight': 'bolder',
    'line-height': '2.5rem',
  },
  h3: {
    'font-size': '18px',
    'font-weight': 'bolder',
    'line-height': '2.5rem',
  },
};

const StyledText = styled.span<{ variant: TextVariant; font?: FontVariant; color?: ColorVariant }>`
  ${({ variant }) =>
    variant &&
    css`
      ${variants[variant]}
    `};
  font-family: ${({ font }) => font && font};
  color: ${({ color }) => color && color};

  @media only screen and (max-width: 768px) {
    font-size: 1.5em;
  }
`;

/**
 * renders component used for displaying text
 */
const Text = ({ children, variant, font, color }: Props) => (
  <StyledText variant={variant} font={font} color={color}>
    {children}
  </StyledText>
);

export default Text;
