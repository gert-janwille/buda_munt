import React from 'react';
import {string, bool} from 'prop-types';

import timeConverter from '../../lib/timeConverter';

const Reaction = ({username, description, date, mayControl}) => (
    <article className='reaction'>

      <div className='body-row table-row'>
        <span className='column-o'>{username}</span>

        <span className='column-b'>
          <p>{timeConverter(date)}</p>

          <div className={mayControl ? `control-buttons lato-reg` : `noAccess`}>
            <a href='#' className='accept'>&gt;</a>
            <a href='#' className='deny'>&#43;</a>
          </div>
        </span>

      </div>

      <div className='detail-more-info'>
        <img width='50%' src='../../assets/img/default-profile.jpg' />
        <p>{description}</p>
      </div>

    </article>
  );

Reaction.propTypes = {
  username: string.isRequired,
  description: string.isRequired,
  date: string.isRequired,
  mayControl: bool.isRequired
};

export default Reaction;
