import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {

  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: {
      id: id
    }
  });

  return { repository: data?.repository, loading, error };
};

export default useRepository;