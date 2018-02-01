import React from 'react';
import {string} from 'prop-types';

const DealerItem = ({name}) => (
    <div className='local-store-item grey-color'>
      <img src='' alt='' />
      <p>{name}</p>
    </div>
  );

DealerItem.propTypes = {
  name: string.isRequired
};

export default DealerItem;
