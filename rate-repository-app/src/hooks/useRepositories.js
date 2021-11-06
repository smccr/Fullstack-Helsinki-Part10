import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  const fetch = ({ orderBy, orderDirection, searchKeyword }) => {
    refetch({
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: searchKeyword
    });
  };

  return { repositories: data?.repositories, loading, error, fetch };
};

export default useRepositories;