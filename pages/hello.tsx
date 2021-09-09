import React, { useEffect, useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { useQuery, gql } from '@apollo/client';
import { Flex } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { addApolloState, initializeApollo } from '../with-apollo/apolloClient';

const USERS_QUERY = gql`
  query USERS_QUERY {
    Users {
      docs {
        id
        email
        firstname
      }
    }
  }
`;

const Hello: React.FC = () => {
  const { data, error, loading } = useQuery(USERS_QUERY);

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
  if (error) {
    return <h4>{error.message}</h4>;
  }
  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      Hello
      <Flex>{JSON.stringify(data, null, 2)}</Flex>
      <FormControl id="email">
        <FormLabel htmlFor="product-name">Product Name</FormLabel>
        <Input type="text" id="product-name" />
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
      </FormControl>
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
