import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Titles, Locations, Descriptions } from './interfaces/interfaces';
import Cars from './Cars';
import JobDetails from './jobDetails';


const App: React.FC = () => {
  const [titles, setTitles] = useState<Titles[]>([]);
  const [locations, setLocations] = useState<Locations[]>([]);
  const [descriptions, setDescriptions] = useState<Descriptions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [sortedJobs, setSortedJobs] = useState<any>([]);

  useEffect(() => {
    function getTitles() {
      return axios.get<Titles[]>('https://events.thesupply.com/api/salaries/titles');
    }

    function getLocations() {
      return axios.get<Locations[]>('https://events.thesupply.com/api/salaries/locations');
    }

    function getDefaultDescriptions() {
      return axios.get<Descriptions[]>('https://events.thesupply.com/api/salaries/digital-producer');
    }

    Promise.all([getTitles(), getLocations(), getDefaultDescriptions()])
    .then(([titles, locations, descriptions]) => {
      setTitles(titles.data);
      setLocations(locations.data);
      setDescriptions(descriptions.data);
      setLoading(false);
    })

    // axios.all([getTitles(), getLocations(), getDefaultDescriptions()])
    //   .then(axios.spread(function (titles, locations, descriptions) {
    //     setTitles(titles.data);
    //     setLocations(locations.data);
    //     setDescriptions(descriptions.data);
    //     setLoading(false);
    //   })
    // );

    if (!loading) {
      const sortedBySalaryLow = descriptions.sort((a, b) => parseFloat(a.salaryLow) - parseFloat(b.salaryLow));
      setDescriptions(sortedBySalaryLow);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>testing stufff</h1>
        <Cars
          make="Tesla"
          model="Three"
          year={2012}
        />
        {!loading &&
          <JobDetails descriptions={descriptions} />
        }
      </header>
    </div>
  );
};

export default App;
