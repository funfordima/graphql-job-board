import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth.js';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetails on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetails
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export const createJob = async (input) => {
  const mutation = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetails
      }
    }
    ${JOB_DETAIL_FRAGMENT}
  `;

  const variables = { input };
  const context = {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  };
  const { data: { job } } = await client.mutate({
    mutation,
    variables,
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
};

export const fetchJobs = async () => {
  const query = gql`
    query JobsQuery {
      jobs {
       ...JobDetails
      }
    }
    ${JOB_DETAIL_FRAGMENT}
  `;

  const { data: { jobs } } = await client.query({ query, fetchPolicy: 'network-only' });

  return jobs;
};

export const fetchJob = async (id) => {
  const variables = { id };
  const { data: { job } } = await client.query({ query: JOB_QUERY, variables });

  return job;
};

export const fetchCompany = async (id) => {
  const query = gql`
    query CompanyQuery($id: ID!){
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;

  const variables = { id };
  const { data: { company } } = await client.query({ query, variables });

  return company;
};
