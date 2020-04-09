import React from 'react';
import Fade from 'react-reveal/Fade';
import styles from '../styles/salaryResults.module.scss';

import { Descriptions } from '../interfaces/interfaces';

interface Props {
  handleSubmitLoading: boolean;
  loading: boolean;
  activeJob: Descriptions;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const SalaryResults = ({ handleSubmitLoading, loading, activeJob }) => {
  // const { handleSubmitLoading, activeJob, posVal, locVal, loading } = props;
  console.log(handleSubmitLoading, loading, activeJob, '000')
  if (activeJob) {
    return (
      <Fade when={!handleSubmitLoading} duration={1500} wait={100}>
        <div className={`${styles.resultsContainer} ${styles.salaryArea}`}>
          <div className={styles.numberContainer}>
            <h3 className={`${styles.salaryResultText} ${styles.firstNumber}`}>${activeJob.salaryLow}</h3>
            <p className={styles.rangeDesc}>{activeJob.salaryRangeLowDesc}</p>
          </div>
          <p className={`${styles.salaryResultText} ${styles.salaryDash}`}>&ndash;</p>
          <div className={styles.numberContainer}>
            <h3 className={styles.salaryResultText}>${activeJob.salaryHigh}</h3>
            <p className={styles.rangeDesc}>{activeJob.salaryRangeHighDesc}</p>
          </div>
        </div>
      </Fade>
    );
  } else {
    return (
      <div className={!loading ? `${styles.textFocusIn} ${styles.salaryArea}` : `${styles.salaryArea}`}>
        <h4 className={styles.introText}>Select both a Job and a Location to see the estimated salary rages.</h4>
      </div>
    );
  }
};

export default SalaryResults;
