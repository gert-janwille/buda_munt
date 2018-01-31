import React from 'react';
import {string} from 'prop-types';

const Marker = ({text}) => (
  <div className='google-marker' >
    <p>{text}</p>
    <div className='marker'></div>
  </div>
);

Marker.propTypes = {
  text: string.isRequired
};

export default Marker;
