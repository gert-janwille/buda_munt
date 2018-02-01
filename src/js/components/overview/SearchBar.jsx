import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';

const SearchBar = ({filterSearch}) => {
  const handleSearch = e => {
    e.preventDefault();
    filterSearch(e);
  };

  return (
    <section className='overzicht-search'>
      <form className='overzicht-search-bar' method='GET' onSubmit={handleSearch} onChange={handleSearch}>
        <input type='text' name='title' placeholder='Zoekterm' />
        <input className='lato-bol' type='submit' value='Zoek' />
      </form>

      <div className='button'>
        <Link className='lato-bol' to={`/`}>Plaats nieuw</Link>
      </div>
    </section>
  );
};

SearchBar.propTypes = {
  filterSearch: func.isRequired
};

export default inject(
  ({activityStore}) => ({
    filterSearch: activityStore.filterSearch
  })
)(
  observer(SearchBar)
);
