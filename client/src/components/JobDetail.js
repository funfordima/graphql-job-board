import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchJob } from '../graphql/queries.js';

function JobDetail() {
  const [job, setJob] = useState(null);

  const { jobId } = useParams();

  useEffect(() => {
    fetchJob(jobId).then(setJob);
  }, [jobId]);

  if (!job) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <div>
      <h1 className="title">
        {job.title}
      </h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>
          {job.company.name}
        </Link>
      </h2>
      <div className="box">
        {job.description}
      </div>
    </div>
  );
}

export default JobDetail;
