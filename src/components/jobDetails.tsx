import React from 'react';
// import styles from '../styles/main.module.scss';
// import loadingStyles from '../styles/loading.module.scss';

// render the job descriptions on the bottom
import { Descriptions } from '../interfaces/interfaces';

interface Props {
  descriptions: Descriptions[];
}

const JobDetails: React.FC<Props> = ({ descriptions }) => {
  const jobDetailItems = descriptions.map((jobItem: { jobLevel: string; jobDescription: string }) => {
    return (<li key={jobItem.jobLevel}>
      <h3>{jobItem.jobLevel}</h3>
      <p>{jobItem.jobDescription}</p>
    </li>);
  },
  );

  console.log(descriptions)

  return (
    <ul>
      {jobDetailItems}
    </ul>
  );
};

export default JobDetails;
