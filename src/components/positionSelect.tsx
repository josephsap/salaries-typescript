import React from 'react';
import styles from '../styles/app.module.scss';
import { Titles } from '../interfaces/interfaces';

interface Props {
  titles: Titles[];
  onPositionChange(event: React.FormEvent<HTMLSelectElement>): void;
  selectedPositionValue: string;
}

const PositionSelect: React.FC<Props> = ({ titles, onPositionChange, selectedPositionValue }) => {
  
  const makePositionSelectOptions = titles.map((title: { id: string; slug: string; jobTitle: string }) => {
    return (
      <option key={title.id} value={title.slug}>{title.jobTitle}</option>
    );
  });

  return (
    <>
      <p className={`${styles.inlineBlock} ${styles.dropdownCopy}`}>I'm curious what a</p>
      <div className={`${styles.selectWrapper} ${styles.posWrapper}`}>
        <select onChange={onPositionChange} value={selectedPositionValue}>
          <option value="position" key="pos1">Choose a job</option>
          {makePositionSelectOptions}
        </select>
      </div>
    </>
  );
};

export default PositionSelect;
