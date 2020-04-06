import React from 'react';
// import styles from '../styles/main.module.scss';
// import loadingStyles from '../styles/loading.module.scss';

// render the job descriptions on the bottom
import { DescriptionsArray } from './App';

const JobDetails: React.FC<DescriptionsArray> = () => {
  // const jobDetailItems = props.sortedJobs.map((jobItem: { jobLevel: string; jobDescription: string }) => {
  //   return (<li key={jobItem.jobLevel}>
  //     <h3>{jobItem.jobLevel}</h3>
  //     <p>{jobItem.jobDescription}</p>
  //   </li>);
  // },
  // );

  return (
    <ul>
      {/* {jobDetailItems}
       */}
       <li>hello</li>
    </ul>
  );
};

// JobDetails.defaultProps = {
//   jobLevel: 'hi',
//   jobDescription: 'hi',
//   jobTitle: 'hi',
//   salaryHigh: 'hi',
//   salaryLow: 'hi',
//   slug: 'hi'
// }

export default JobDetails;
