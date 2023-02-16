import { request, gql } from 'graphql-request';
import { getAccessToken } from '../auth.js';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export const createJob = async (input) => {
  const query = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;

  const variables = { input };
  const requestHeaders = { 'Authorization': `Bearer ${getAccessToken()}` };
  const { job } = await request(GRAPHQL_URL, query, variables, requestHeaders);

  return job;
};

export const fetchJobs = async () => {
  const query = gql`
    query {
      jobs {
        id
        title
        description
        company {
          name
        }
      }
    }
  `;

  const { jobs } = await request(GRAPHQL_URL, query);

  return jobs;
};

export const fetchJob = async (id) => {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;

  const variables = { id };
  const { job } = await request(GRAPHQL_URL, query, variables);

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
  const { company } = await request(GRAPHQL_URL, query, variables);

  return company;
};
