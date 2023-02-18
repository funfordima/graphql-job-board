import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useJob } from '../graphql/hooks.js';

function JobDetail() {
  const { jobId } = useParams();
  const { job, loading } = useJob(jobId);

  if (loading) {
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
