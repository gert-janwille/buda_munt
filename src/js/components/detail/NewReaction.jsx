import React from 'react';
import {string, func, object} from 'prop-types';

const Reaction = ({articleID, username, account, insertNewComment, currentUser}) => {
  const handleSubmitComment = e => {
    e.preventDefault();
    insertNewComment(e, username, account, articleID, currentUser);
  };

  return (
      <form method='POST' onSubmit={handleSubmitComment}>
        <textarea name='description' placeholder='Schrijf hier je reactie...' autoFocus></textarea>
        <input type='submit' />
      </form>
  );

};
Reaction.propTypes = {
  username: string.isRequired,
  account: string.isRequired,
  insertNewComment: func.isRequired,
  articleID: string.isRequired,
  currentUser: object.isRequired
};

export default Reaction;
