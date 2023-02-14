import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchCompany } from '../graphql/queries.js';
import JobList from './JobList.js';

function CompanyDetail() {
  const [company, setCompany] = useState(null);

  const { companyId } = useParams();

  useEffect(() => {
    fetchCompany(companyId).then(setCompany);
  }, [companyId]);

  if (!company) {
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
