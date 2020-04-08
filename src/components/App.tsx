import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';
import { Titles, Locations, Descriptions } from '../interfaces/interfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import JobDetails from './jobDetails';
import LocationSelect from './locationSelect';


const App: React.FC = () => {
  const [titles, setTitles] = useState<Titles[]>([]);
  const [locations, setLocations] = useState<Locations[]>([]);
  const [descriptions, setDescriptions] = useState<Descriptions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLocationValue, setSelectedLocationValue] = useState<string>('location');

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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleLocationChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedLocationValue(e.currentTarget.value);
  }

  return (
    <div className="App">
      <JobDetails descriptions={descriptions} />
      <LocationSelect
        locations={locations}
        onLocationChange={handleLocationChange}
        selectedLocationValue={selectedLocationValue}
      />
    </div>
  );
};

export default App;
