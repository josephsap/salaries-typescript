import React, { FunctionComponent } from 'react';
// import styles from '../styles/main.module.scss';
// import loadingStyles from '../styles/loading.module.scss';

// render the job descriptions on the bottom
import { Descriptions } from './interfaces/interfaces';

const JobDetails: React.FC = (props: Descriptions): JSX.Element => {
  const jobDetailItems = props.sortedJobs.map((jobItem: { jobLevel: string; jobDescription: string }) => {
    return (<li key={jobItem.jobLevel}>
      <h3>{jobItem.jobLevel}</h3>
      <p>{jobItem.jobDescription}</p>
    </li>);
  },
  );

  return (
    <ul>
      {jobDetailItems}
    </ul>
  );
};

export default JobDetails;
