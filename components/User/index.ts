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
              rating
              review
            }
            color_applies
            color
            sizes
            formats
            pages
            images {
              image {
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
