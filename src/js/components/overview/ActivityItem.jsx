import React from 'react';
import {Link} from 'react-router-dom';
import {object, string, number} from 'prop-types';

const FilterBar = ({_id, type, title, username, comments, price}) => {

  return (
    <Link to={`/overzicht/${title.toLowerCase().split(` `).join(`-`)}/${_id.toLowerCase().split(` `).join(`-`)}`} className='body-row table-row'>
      <span className='column-o'><img width='50%' src={`../assets/svg/${type === `O` ? `offer` : `request`}.svg`} alt='Aanbieding' /></span>
      <span className='column-m'><p>{title}</p></span>
      <span className='column-o'>{username}</span>
      <span className='column-o'>{comments.length} Reacties</span>
      <span className='column-f'>{price} BDA</span>
    </Link>
  );
};

FilterBar.propTypes = {
  type: string.isRequired,
  title: string.isRequired,
  username: string.isRequired,
  comments: object.isRequired,
  price: number.isRequired,
  _id: string.isRequired
};

export default FilterBar;
