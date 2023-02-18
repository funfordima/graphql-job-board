import { useQuery, useMutation } from '@apollo/client';
import { COMPANY_QUERY, JOB_QUERY, JOBS_QUERY, CREATE_JOB_MUTATION } from '../graphql/queries.js';
import { getAccessToken } from '../auth.js';

export function useJob(id) {
  const { data, error, loading } = useQuery(JOB_QUERY, {
    variables: { id },
  });

  return {
    job: data?.job,
    loading,
    error: Boolean(error),
  };
}

export function useJobs() {
  const { data, error, loading } = useQuery(JOBS_QUERY, { fetchPolicy: 'network-only' });

  return {
    jobs: data?.jobs,
    loading,
    error: Boolean(error),
  };
}

export function useCompany(id) {
  const { data, error, loading } = useQuery(COMPANY_QUERY, { variables: { id } });

  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
}

export function useCreateJob() {
  const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);

  return {
    createJob: async (title, description) => {
      const context = {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      };
      const { data: { job } } = await mutate({
        variables: {
          input: { title, description },
        },
        context,
        update: (cache, { data: { job } }) => {
          cache.writeQuery({
            query: JOB_QUERY,
            variables: { id: job.id },
            data: { job },
          });
        },
      });

      return job;
    },
    loading,
    error: Boolean(error),
  };
}