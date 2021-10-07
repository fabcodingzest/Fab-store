/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@chakra-ui/layout';
import React from 'react';
import serialize from './serialize';

const RichText: React.FC<{ content: any; fontSize?: any }> = ({
  content,
  fontSize,
}) => {
  if (!content) {
    return null;
  }

  return <Box fontSize={fontSize}>{serialize(content)}</Box>;
};

export default RichText;
