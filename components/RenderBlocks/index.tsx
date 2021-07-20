/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import { Layout } from '../../collections/Page';
import { components } from '../../blocks';

type Props = {
  layout: any;
  className?: string;
};

const RenderBlocks: React.FC<Props> = ({ layout }) => (
  <div>
    {layout.map((block, i) => {
      const Block: React.FC<any> = components[block.blockType];

      if (Block) {
        return (
          <section
            key={i}
            // className={classes.block}
          >
            <Block {...block} />
          </section>
        );
      }

      return null;
    })}
  </div>
);

export default RenderBlocks;
