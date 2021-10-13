import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    meUser {
      user {
        id
        email
        products {
          id
          name
          description
          status
          discount {
            id
            name
            percentage
          }
          variants {
            id
            name
            price
            status
            reviews {
              id
              user {
                id
                email
              }
              review
              rating
            }
            color_applies
            color
            sizes
            format
            pages
            images {
              id
              image {
                id
                cloudinaryURL
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.meUser.user;
}
