import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/app.module.scss';
import { Titles, Locations, Descriptions } from '../interfaces/interfaces';
import JobDetails from './jobDetails';
import JobSelectForm from './JobSelectForm';
import SalaryResults from './salaryResults';
import SVGS from './svgs';


const App: React.FC = () => {
  const [titles, setTitles] = useState<Titles[]>([]);
  const [locations, setLocations] = useState<Locations[]>([]);
  const [descriptions, setDescriptions] = useState<Descriptions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeJobItem, setActiveJobItem] = useState<Descriptions>();
  const [handleSubmitLoading, setHandleSubmitLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleDescriptionChange = (newDescriptions: Descriptions[]) => {
    console.log(newDescriptions, '------')
    setDescriptions(newDescriptions);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function submitLoading(loadingState: boolean): void {
    setHandleSubmitLoading(loadingState);
  }

  // const handleJobLevelSelect = (activeIndex) => {
  //   const selectedJobItem = descriptions.filter((jobItem, index) => {
  //     if (index === activeIndex) {
  //       return jobItem;
  //     };
  //   });

  //   if (activeJobItem && selectedPositionValue !== 'position' && selectedLocationValue !== 'location') {
  //     setActiveIndex(activeIndex);
  //     setActiveJobItem(selectedJobItem[0]);
  //   }
  // }

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
      setDescriptions(descriptions.data);
      setLoading(false);
    })

    if (!loading) {
      const sortedBySalaryLow = descriptions.sort((a, b) => parseFloat(a.salaryLow) - parseFloat(b.salaryLow));
      setDescriptions(sortedBySalaryLow);
    }
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
        />
      </div>
    </div>
  );
};

export default App;
