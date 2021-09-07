import React, { useEffect, useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { useQuery, gql } from '@apollo/client';
import { addApolloState, initializeApollo } from '../with-apollo/apolloClient';

const USERS_QUERY = gql`
  query USERS_QUERY {
    Products {
      docs {
        id
      }
    }
  }
`;

const Hello: React.FC = () => {
  const { data, error, loading } = useQuery(USERS_QUERY);
  console.log(data);
  console.log(loading);

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [
        {
          text: 'Hello',
          bold: true,
        },
      ],
    },
  ]);

  return (
    <div>
      Hello
      <form>
        <label htmlFor="product-name">Product Name</label>
        <input type="text" id="product-name" />
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <Editable
            onKeyDown={(event) => {
              if (event.key === '&') {
                // Prevent the ampersand character from being inserted.
                event.preventDefault();
                // Execute the `insertText` method when the event occurs.
                editor.insertText('and');
              }
            }}
          />
        </Slate>
      </form>
    </div>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: USERS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Hello;
