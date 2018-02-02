import React from 'react';
import {string, bool, func} from 'prop-types';

import timeConverter from '../../lib/timeConverter';
import NewReaction from './NewReaction';

const Reaction = ({articleID, username, account, description, date, mayControl, newComment = false, insertNewComment}) => {

  return (
      <article className='reaction'>

        <div className='body-row table-row'>
          <span className='column-o'>{username}</span>

          <span className='column-b'>
            <p>{date ? timeConverter(date) : ``}</p>

            <div className={mayControl ? `control-buttons lato-reg` : `noAccess`}>
              <a href='#' className='accept'>&gt;</a>
              <a href='#' className='deny'>&#43;</a>
            </div>
          </span>

        </div>

        <div className='detail-more-info'>
          <img width='50%' src='../../assets/img/default-profile.jpg' />
          {!newComment ? <p>{description}</p> : <NewReaction articleID={articleID} username={username} account={account} insertNewComment={insertNewComment} />}
        </div>

      </article>
  );

};
Reaction.propTypes = {
  username: string.isRequired,
  description: string.isRequired,
  date: string.isRequired,
  mayControl: bool.isRequired,
  newComment: bool.isRequired,
  account: string.isRequired,
  insertNewComment: func.isRequired,
  articleID: string.isRequired
};

export default Reaction;
