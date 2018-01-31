import React from 'react';
import {inject, observer} from 'mobx-react';
import {object, func} from 'prop-types';

import GoogleMap from '../google/GoogleMap';


const PopUpActivity = ({popUpData, closePopUp, getNextItem}) => {
  const {title, location, width, description} = popUpData;

  const handlePopupClose = e => {
    e.preventDefault();
    closePopUp();
  };

  const handleNextPre = e => {
    e.preventDefault();
    getNextItem(e.currentTarget.classList.contains(`activity-next`));
  };


  const markers = [
    {
      id: 0,
      text: title,
      location: location
    }
  ];

  return (
  <article className='home-activities-popup'>
    <div className='home-popup'>

      <div className='content'>
        <div className='activity-header poppins-bol green-color heading3'>
          <h3>
            <img src='./assets/svg/fiets.svg' className='icon' />
            {title}
          </h3>
          <div className='activity-title-underline' style={{width: `${width / 5}%`}}></div>
        </div>

        <p className='grey-color activity-description'>{description}</p>

        <h4 className='heading4 poppins-bol grey-color'>Waar?</h4>
        <GoogleMap name={title} markers={markers} center={location} />
      </div>

      <a href='#' onClick={handleNextPre} className='roud-btn overlay-button activity-previous'>&lt;</a>
      <a href='#' onClick={handleNextPre} className='roud-btn overlay-button activity-next'>&gt;</a>
      <a href='#' onClick={handlePopupClose} className='roud-btn overlay-button activity-close'>&#43;</a>

    </div>
  </article>
  );
};

PopUpActivity.propTypes = {
  popUpData: object.isRequired,
  closePopUp: func.isRequired,
  getNextItem: func.isRequired
};

export default inject(
    ({activityStore}) => ({
      popUpData: activityStore.popUpData,
      closePopUp: activityStore.closePopUp,
      getNextItem: activityStore.getNextItem
    })
  )(
    observer(PopUpActivity)
  );
