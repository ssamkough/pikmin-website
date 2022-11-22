import React from 'react';
import BodyContainer from '../../library/BodyContainer';
import Link from '../../library/Link';
import Text from '../../library/Text';

const Description = (): React.ReactElement => (
  <BodyContainer>
    <Text variant="h2" color="pink">
      this website is home to the pikmin decompilation projects
    </Text>
    <Text variant="h2" color="pink">
      the pikmin decompilation projects are ongoing projects to reverse-engineer the sourcecode for{' '}
      <Link urlString="https://github.com/projectPiki/pikmin" reverseColors>
        pikmin 1
      </Link>{' '}
      and{' '}
      <Link urlString="https://github.com/projectPiki/pikmin2" reverseColors>
        pikmin 2
      </Link>
    </Text>
  </BodyContainer>
);

export default Description;
