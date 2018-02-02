import React from 'react';
import {string, bool, func, object} from 'prop-types';
import {isEmpty} from 'lodash';

import timeConverter from '../../lib/timeConverter';
import NewReaction from './NewReaction';

const Reaction = ({_id, currentUser, articleID, doneBy, username, account, description, date, mayControl, newComment = false, insertNewComment, acceptOrDenyProposal, setNewComment}) => {
  const handleSelectProposition = e => {
    e.preventDefault();
    acceptOrDenyProposal(e, {id: articleID, username, account, _id});
  };

  const handleCloseReaction = e => {
    e.preventDefault();
    setNewComment(false, currentUser);
  };

  return (
      <article className='reaction'>

        <div className='body-row table-row'>
          <span className='column-o'>{username}</span>

          <span className='column-b'>
            <p>{date ? timeConverter(date) : ``}</p>
            {!isEmpty(doneBy) ? doneBy.account === account ? <div>U heeft dit verzoek aanvaard! Deze persoon heeft een mail ontvangen.</div> : null : null}
            {newComment ?  <a href='#' onClick={handleCloseReaction}>close</a> : null}
            <div className={(mayControl && isEmpty(doneBy)) ? `control-buttons lato-reg` : `noAccess`}>
              <a href='#' onClick={handleSelectProposition} className='accept'>&gt;</a>
              <a href='#' onClick={handleSelectProposition} className='deny'>&#43;</a>
            </div>
          </span>

        </div>

        <div className='detail-more-info'>
          <img width='50%' src='../../assets/img/default-profile.jpg' />
          {!newComment ? <p>{description}</p> : <NewReaction currentUser={currentUser} articleID={articleID} username={username} account={account} insertNewComment={insertNewComment} />}
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
  articleID: string.isRequired,
  _id: string.isRequired,
  acceptOrDenyProposal: func.isRequired,
  doneBy: object.isRequired,
  currentUser: object.isRequired,
  setNewComment: func.isRequired
};

export default Reaction;
