import React from 'react';
import styles from '../styles/app.module.scss';

import { Locations } from '../interfaces/interfaces';

interface Props {
  locations: Locations[];
  onLocationChange(event: React.FormEvent<HTMLSelectElement>): void;
  selectedLocationValue: string;
}

const LocationSelect: React.FC<Props> = ({ locations, onLocationChange, selectedLocationValue }) => {

  const locationSelectOptions = locations.map((loc: { locationSlug: string; location: string }) => {
    return <option key={loc.locationSlug} value={loc.locationSlug}>{loc.location}</option>;
  });

  return (
    <>
      <p className={`${styles.inlineBlock} ${styles.dropdownCopy}`}>Should make in</p>
      <div className={`${styles.selectWrapper} ${styles.locWrapper}`}>
        <select onChange={onLocationChange} value={selectedLocationValue}>
          <option value="location" defaultValue="location" key="location">
            location
          </option>
          {locationSelectOptions}
        </select>
      </div>
    </>
  );
};

export default LocationSelect;
