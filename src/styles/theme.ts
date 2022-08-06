export type ColorVariant = 'black' | 'white' | 'lightPink' | 'pink';

type Color = {
  [key in ColorVariant]: string;
};

type Theme = {
  colors: Color;
};

const theme: Theme = {
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    lightPink: '#FFC0CB',
    pink: '#F40F89',
  },
};

export default theme;
