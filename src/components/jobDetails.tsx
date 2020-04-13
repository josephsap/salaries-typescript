import React from 'react';
import styles from '../styles/main.module.scss';
// import loadingStyles from '../styles/loading.module.scss';

import { Descriptions } from '../interfaces/interfaces';

type JobItem = {
  jobLevel: string;
  jobDescription: string;
}

interface Props {
  descriptions: Descriptions[];
  activeIndex: number;
  // void: don't care if it returns anything. this fn doesn't, it sets state.
  handleJobLevelSelect: (jobItem: JobItem, index: number) => void;
}

const JobDetails: React.FC<Props> = ({ descriptions, activeIndex, handleJobLevelSelect }) => {
  const jobDetailItems = descriptions.map((jobItem: { jobLevel: string; jobDescription: string }, index) => {
    return (
      <li
        key={jobItem.jobLevel}
        className={`${activeIndex === index ? `${styles.active} ${styles.jobItem}` : `${styles.jobItem}`}`}
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onClick={() => handleJobLevelSelect(jobItem, index)}
      >
        <h3>{jobItem.jobLevel}</h3>
        <p>{jobItem.jobDescription}</p>
      </li>
    );
  },
  );

  return (
    <ul>
      {jobDetailItems}
    </ul>
  );
};

export default JobDetails;
