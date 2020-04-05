import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosPromise } from 'axios';
import './App.css';
import { Titles, Locations, Descriptions, SortedJobsInterface } from './interfaces/interfaces';
import Cars from './Cars';
import JobDetails from './jobDetails';

type DescriptionsArray = Descriptions[];

type Props = {
  descriptions: DescriptionsArray;
}

const App: React.FunctionComponent<Props> = () => {
  const [titles, setTitles] = useState<Titles[]>([]);
  const [locations, setLocations] = useState<Locations[]>([]);
  const [descriptions, setDescriptions] = useState<Descriptions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [sortedJobs, setSortedJobs] = useState<any>([]);

  useEffect(() => {
    function getTitles(): AxiosPromise<Titles[]> {
      return axios.get('https://events.thesupply.com/api/salaries/titles');
    }

    function getLocations(): AxiosPromise<Locations[]> {
      return axios.get('https://events.thesupply.com/api/salaries/locations');
    }

    function getDefaultDescriptions(): AxiosPromise<any> {
      return axios.get('https://events.thesupply.com/api/salaries/digital-producer');
    }

    axios.all([getTitles(), getLocations(), getDefaultDescriptions()])
      .then(axios.spread(function (titles, locations, descriptions) {
        setTitles(titles.data);
        setLocations(locations.data);
        setDescriptions(descriptions.data);
        setLoading(false);
      })
    );

    if (!loading) {
      const sortedBySalaryLow: DescriptionsArray = descriptions.sort((a, b) => parseFloat(a.salaryLow) - parseFloat(b.salaryLow));
      setDescriptions(sortedBySalaryLow);
    }
  }, [loading, descriptions]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>testing stufff</h1>
        <Cars
          make="Tesla"
          model="Three"
          year={2012}
        />
        <JobDetails
          descriptions={descriptions}
        />
      </header>
    </div>
  );
};

export default App;
