import JobList from './JobList';
import { fetchJobs } from '../graphql/queries.js';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
