import React from 'react';
import {string, number} from 'prop-types';

const ActivityItem = ({title, img, short, width}) => (
  <a className='home-activities-item'>
    <img width='100%' src={`../assets/img/activities/${img}`} alt={`illustratie over ${title}`} />
    <div className='cont'>
      <h3 style={{width: `${width}%`}} className='poppins-bol green-color heading3'>{title}</h3>
      <p>{short}</p>
    </div>
  </a>
);

ActivityItem.propTypes = {
  title: string.isRequired,
  img: string.isRequired,
  short: string.isRequired,
  width: number.isRequired
};

export default ActivityItem;
