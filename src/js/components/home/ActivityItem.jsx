import React from 'react';
import {inject, observer} from 'mobx-react';
import {string, number, func} from 'prop-types';

const ActivityItem = ({id, title, img, short, width, handlePopup}) => {

  const handleShowActivityDetail = e => {
    e.preventDefault();
    handlePopup(id);
  };

  return (
  <a href='#' className='home-activities-item nohover' onClick={handleShowActivityDetail}>
    <img width='100%' src={`../assets/img/activities/${img}`} alt={`illustratie over ${title}`} />
    <div className='activities-container'>
      <h3 style={{width: `${width}%`}} className='poppins-bol green-color heading3'>{title}</h3>
      <p className='short-text'>{short}</p>
      <p className='read-more'>Lees meer &gt;</p>
    </div>
  </a>
  );
};

ActivityItem.propTypes = {
  id: number.isRequired,
  title: string.isRequired,
  img: string.isRequired,
  short: string.isRequired,
  width: number.isRequired,
  handlePopup: func.isRequired
};

export default inject(
  ({activityStore}) => ({
    handlePopup: activityStore.handlePopup
  })
)(
  observer(ActivityItem)
);
