/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from '@chakra-ui/layout';
import React from 'react';
import serialize from './serialize';

const RichText: React.FC<{ content: any }> = ({ content }) => {
  if (!content) {
    return null;
  }

  return <Text noOfLines={2}>{serialize(content)}</Text>;
};

export default RichText;
