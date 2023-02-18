import { useParams } from 'react-router';
import JobList from './JobList.js';
import { useCompany } from '../graphql/hooks.js';

function CompanyDetail() {
  const { companyId } = useParams();
  const { company, loading } = useCompany(companyId);

  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>

      <h5 className='title is-5'>Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
