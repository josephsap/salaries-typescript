import React, { useState } from 'react';
import styles from '../styles/app.module.scss';
import axios from 'axios';
import LocationSelect from './locationSelect';
import PositionSelect from './positionSelect';
import { Locations, Titles, Descriptions } from '../interfaces/interfaces';

interface Props {
  locations: Locations[];
  titles: Titles[];
  descriptions: Descriptions[];
  onDescChange: ((newDescriptions: Descriptions[]) => void);
  onSubmitLoading: ((loadingState: boolean) => void);
  sortJobs: (descs: Descriptions[]) => void;
}


const JobSelectForm: React.FC<Props> = ({ titles, locations, onDescChange, onSubmitLoading, sortJobs }) => {
  const [selectedLocationValue, setSelectedLocationValue] = useState<string>('location');
  const [selectedPositionValue, setSelectedPositionValue] = useState<string>('position');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleLocationChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedLocationValue(e.currentTarget.value);
  }

  const handlePositionChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedPositionValue(e.currentTarget.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitLoading(true);
    axios.get(`https://events.thesupply.com/api/salaries/${selectedPositionValue}/${selectedLocationValue}`)
      .then(response => {
        onDescChange(response.data);
        setActiveIndex(activeIndex || 0);
        setSelectedPositionValue(selectedPositionValue);
        setSelectedLocationValue(selectedLocationValue);
        sortJobs(response.data);
        onSubmitLoading(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} noValidate={true} className={`${styles.textCenter} ${styles.contain}`}>
      <PositionSelect
        titles={titles}
        onPositionChange={handlePositionChange}
        selectedPositionValue={selectedPositionValue}
      />
      <LocationSelect
        locations={locations}
        onLocationChange={handleLocationChange}
        selectedLocationValue={selectedLocationValue}
      />
      {selectedPositionValue !== 'position' && selectedLocationValue !== 'location' ? (
        <button type="submit" value="submit" className={styles.submitBtn}><span>Submit</span></button>
      ) : (
          <button type="submit" disabled value="submit" className={`${styles.submitBtn} ${styles.disabledButton}`}><span>Submit</span></button>
        )
      }
    </form>
  );
};

export default JobSelectForm;
