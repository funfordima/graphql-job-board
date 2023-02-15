import JobList from './JobList';
import { fetchJobs } from '../graphql/queries.js';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [err, setError] = useState(null);

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch((err) => setError(err));
  }, []);

  if (err) {
    return (
      <p>Something went wrong...</p>
    );
  }

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
