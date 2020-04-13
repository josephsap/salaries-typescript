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

  // even out the flex items
  let flexItemWidth;
  let itemWidthStyle;

  if (descriptions.length > 0) {
    flexItemWidth = 100 / descriptions.length;
  }

  if (window.innerWidth >= 768) {
    itemWidthStyle = {
      flex: '0 0' + flexItemWidth + '%',
      width: flexItemWidth + '%'
    };
  } else {
    itemWidthStyle = {
      flex: '0 0 auto'
    };
  }


  const jobDetailItems = descriptions.map((jobItem: { jobLevel: string; jobDescription: string }, index) => {
    return (
      <li
        key={jobItem.jobLevel}
        className={`${activeIndex === index ? `${styles.active} ${styles.jobItem}` : `${styles.jobItem}`}`}
        onClick={() => handleJobLevelSelect(jobItem, index)}
        style={itemWidthStyle}
      >
        <h3>{jobItem.jobLevel}</h3>
        <p>{jobItem.jobDescription}</p>
      </li>
    );
  },
  );

  return (
    <ul className={styles.jobDetailItems}>
      {jobDetailItems}
    </ul>
  );
};

export default JobDetails;
