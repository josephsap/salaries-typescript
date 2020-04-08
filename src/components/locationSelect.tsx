import React from 'react';
// import styles from '../styles/app.module.scss';

import { Locations } from '../interfaces/interfaces';

interface Props {
  locations: Locations[];
  onLocationChange: () => any;
  selectedLocationValue: string;
}

const LocationSelect: React.FC<Props> = ({ locations, onLocationChange, selectedLocationValue }) => {
  // const { locations, controlFunction, selectedLocationValue } = props;
  const locationSelectOptions = locations.map((loc) => <option key={loc.locationSlug} value={loc.locationSlug}>{loc.location}</option>);

  return (
    <>
      <p>Should make in</p>
      <div>
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
