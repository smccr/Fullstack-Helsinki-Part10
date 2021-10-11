import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

  const signIn = async ({ username, password }) => {
    const token = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(token);
    apolloClient.resetStore();
    return token;
  };

  return [signIn, result];
};

export default useSignIn;