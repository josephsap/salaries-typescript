import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/app.module.scss';
import { Titles, Locations, Descriptions } from '../interfaces/interfaces';
import JobDetails from './jobDetails';
import JobSelectForm from './JobSelectForm';
import SalaryResults from './salaryResults';
import SVGS from './svgs';

type JobItem = {
  jobLevel: string;
  jobDescription: string;
}


const App: React.FC = () => {
  const [titles, setTitles] = useState<Titles[]>([]);
  const [locations, setLocations] = useState<Locations[]>([]);
  const [descriptions, setDescriptions] = useState<Descriptions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeJobItem, setActiveJobItem] = useState<Descriptions>();
  const [handleSubmitLoading, setHandleSubmitLoading] = useState<boolean>(false);

  const handleDescriptionChange = (newDescriptions: Descriptions[]) => {
    setDescriptions(newDescriptions);
  };

  function submitLoading(loadingState: boolean): void {
    setHandleSubmitLoading(loadingState);
  }

  const handleJobLevelSelect = (jobItem: JobItem, index: number) => {
    const clickedJobLevel = descriptions.find((selectedJob) => {
      return selectedJob.jobLevel === jobItem.jobLevel;
    });

    setActiveIndex(index);
    setActiveJobItem(clickedJobLevel);
  }

  const sortJobsLowToHigh = (descs: Descriptions[]) => {
    const sortedBySalaryLow = descs.sort((a, b) => parseFloat(a.salaryLow) - parseFloat(b.salaryLow));
    setDescriptions(sortedBySalaryLow);
  };

  useEffect(() => {
    function getTitles(): Promise<any> {
      return axios.get<Titles[]>('https://events.thesupply.com/api/salaries/titles');
    }

    function getLocations(): Promise<any> {
      return axios.get<Locations[]>('https://events.thesupply.com/api/salaries/locations');
    }

    function getDefaultDescriptions(): Promise<any> {
      return axios.get<Descriptions[]>('https://events.thesupply.com/api/salaries/digital-producer');
    }

    Promise.all([getTitles(), getLocations(), getDefaultDescriptions()])
    .then(([titles, locations, descriptions]) => {
      setTitles(titles.data);
      setLocations(locations.data);
      sortJobsLowToHigh(descriptions.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.app}>
      <div className="topBar">
        <div className="container">
          <SVGS />
        </div>
      </div>
      <JobSelectForm
        titles={titles}
        locations={locations}
        onDescChange={handleDescriptionChange}
        descriptions={descriptions}
        onSubmitLoading={submitLoading}
        sortJobs={sortJobsLowToHigh}
      />
      <div className={`${styles.jobContainer} ${styles.contain}`}>
        <SalaryResults
          activeJob={activeJobItem}
          handleSubmitLoading={handleSubmitLoading}
          loading={loading}
          // posVal={selectedPositionValue}
          // locVal={selectedLocationValue}
        />
        <JobDetails
          descriptions={descriptions}
          activeIndex={activeIndex}
          handleJobLevelSelect={handleJobLevelSelect}
        />
      </div>
    </div>
  );
};

export default App;
