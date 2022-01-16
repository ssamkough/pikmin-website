import React from 'react';
import styled from 'styled-components';

type ImageSize = 'small' | 'medium' | 'large';

interface Props {
  src: string;
  alt: string;
  link: string;
  size?: ImageSize;
}

const sizes: Record<ImageSize, string> = {
  small: '15px',
  medium: '45px',
  large: '75px',
};

const StyledImage = styled.img<{ size: ImageSize }>`
  width: ${({ size }) => size && sizes[size]};
  height: ${({ size }) => size && sizes[size]}px;
`;

/**
 * renders components used for images
 */
const Image = ({ src, alt, link, size = 'medium' }: Props): React.ReactElement => (
  <a href={link} target="_blank" rel="noreferrer">
    <StyledImage src={src} alt={alt} size={size} />
  </a>
);

export default Image;
