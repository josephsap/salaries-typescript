import React from 'react';
import styles from '../styles/main.module.scss';
// import loadingStyles from '../styles/loading.module.scss';

import { Descriptions } from '../interfaces/interfaces';

interface Props {
  descriptions: Descriptions[];
  activeIndex: number;
}

const JobDetails: React.FC<Props> = ({ descriptions, activeIndex }) => {
  const jobDetailItems = descriptions.map((jobItem: { jobLevel: string; jobDescription: string }, index) => {
    return (<li key={jobItem.jobLevel} className={`${activeIndex === index ? `${styles.active} ${styles.jobItem}` : `${styles.jobItem}`}`}>
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
