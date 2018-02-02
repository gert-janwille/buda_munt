import React from 'react';
import {string, func} from 'prop-types';

const Reaction = ({articleID, username, account, insertNewComment}) => {
  const handleSubmitComment = e => {
    e.preventDefault();
    insertNewComment(e, username, account, articleID);
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
  articleID: string.isRequired
};

export default Reaction;
