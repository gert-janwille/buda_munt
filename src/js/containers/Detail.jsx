import React from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';
import {Link} from 'react-router-dom';
import {object, func, string} from 'prop-types';

import timeConverter from '../lib/timeConverter';
import Reaction from '../components/detail/Reaction';

const Detail = ({match, findOne, detailActivity, imgFile, hasAccess}) => {
  const {_id, title} = match.params;
  findOne(_id, title);
  const {username, price, created, type, description, comments} = detailActivity;

  // if (content()) {
  //   const {username: tUser} = content();
  //   const hasAccess =
  // }

  return (
      <main className='detail-container'>

      <section className='breadcrumbs'>
        <p className='lato-bol green-color'><Link to={`/overzicht`} className='blue-link'>Overzicht</Link> / {title}</p>
        <div className='button'>
          <a href='#' className='lato-bol'>Reageer</a>
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
        {!isEmpty(comments) ? comments.map(comment => <Reaction key={comment._id} mayControl={hasAccess(username)} {...comment} />) : `Er zijn nog geen reacties op dit klusje.`}
      </section>


      </main>
  );
};

Detail.propTypes = {
  match: object.isRequired,
  findOne: func.isRequired,
  detailActivity: object.isRequired,
  imgFile: string.isRequired,
  hasAccess: func.isRequired
};

export default inject(
  ({activityStore, userStore}) => ({
    allChores: activityStore.allChores,
    findOne: activityStore.findOne,
    detailActivity: activityStore.detailActivity,
    imgFile: activityStore.imgFile,
    hasAccess: userStore.hasAccess
  })
)(
  observer(Detail)
);
