import React from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';
import {Link} from 'react-router-dom';
import {object, func, string, bool} from 'prop-types';

import timeConverter from '../lib/timeConverter';
import Reaction from '../components/detail/Reaction';

const Detail = ({match, findOne, detailActivity, imgFile, hasAccess, newComment, setNewComment, currentUser, insertNewComment, acceptOrDenyProposal}) => {
  const {_id, title} = match.params;
  findOne(_id, title);
  const {username, price, created, type, description, comments, doneBy} = detailActivity;

  const handleAddComment = e => {
    e.preventDefault();
    setNewComment(true, currentUser);
  };

  return (
      <main className='detail-container'>

      <section className='breadcrumbs'>
        <p className='lato-bol green-color'><Link to={`/overzicht`} className='blue-link'>Overzicht</Link> / {title}</p>
        <div className='button'>
          {currentUser && isEmpty(doneBy) ? <a href='#' onClick={handleAddComment} className='lato-bol'>Reageer</a> : ``}
        </div>
      </section>

      <section className='advertiment'>
        <article className='body-row table-row'>
          <span className='column-o'><img width='50%' src={`../../assets/svg/${type === `O` ? `offer` : `request`}.svg`} alt='Aanbieding' /></span>
          <span className='column-m'><p>{title}</p></span>
          <span className='column-o'>{username}</span>
          <span className='column-o'> {comments ? comments.length : `0`} Reacties</span>
          <span className='column-f'>{price} BDA</span>
          <span className='column-f'>{created ? timeConverter(created) : ``}</span>
        </article>

        <article className='detail-more-info'>
          <img width='50%' src={imgFile} />
          <p>{description}</p>
        </article>
      </section>

      <section className='reactions'>
        <h2 className='heading3 lato-bol light-grey-color'>Reacties:</h2>
        {newComment ? <Reaction setNewComment={setNewComment} articleID={_id} newComment {...currentUser} currentUser={currentUser} insertNewComment={insertNewComment} /> : ``}
        {!isEmpty(comments) ? comments.map(comment => <Reaction key={comment._id} doneBy={doneBy} articleID={_id} mayControl={hasAccess(username)} acceptOrDenyProposal={acceptOrDenyProposal} {...comment} />) : `Er zijn nog geen reacties op dit klusje.`}
      </section>


      </main>
  );
};

Detail.propTypes = {
  match: object.isRequired,
  findOne: func.isRequired,
  detailActivity: object.isRequired,
  imgFile: string.isRequired,
  hasAccess: func.isRequired,
  newComment: bool.isRequired,
  setNewComment: func.isRequired,
  currentUser: object.isRequired,
  insertNewComment: func.isRequired,
  acceptOrDenyProposal: func.isRequired
};

export default inject(
  ({activityStore, userStore}) => ({
    allChores: activityStore.allChores,
    findOne: activityStore.findOne,
    detailActivity: activityStore.detailActivity,
    imgFile: activityStore.imgFile,
    hasAccess: userStore.hasAccess,
    newComment: activityStore.newComment,
    setNewComment: activityStore.setNewComment,
    insertNewComment: activityStore.insertNewComment,
    acceptOrDenyProposal: activityStore.acceptOrDenyProposal,
    currentUser: userStore.currentUser
  })
)(
  observer(Detail)
);
