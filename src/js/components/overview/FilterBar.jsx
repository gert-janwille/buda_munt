import React from 'react';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';

const FilterBar = ({filterSearch}) => {
  const handleFilterResults = e => {
    e.preventDefault();
    filterSearch(e);
  };

  const handleChangeFilterResults = e => filterSearch(e);

  return (
    <form method='GET' className='overzicht-filter' onSubmit={handleFilterResults} onChange={handleChangeFilterResults}>
      <article className='overzicht-filter-options'>
        <select name='categorie' className='overzicht-select'>
          <option value=''>Categorie</option>
          <option value='zorg'>Zorg</option>
        </select>

        <div className='overzicht-radio-select'>
          <input type='checkbox' id='aanbieding' name='aanbieding' value='O' />
          <label htmlFor='aanbieding'>Aanbieding</label>

          <input type='checkbox' id='aanvraag' name='aanvraag' value='R' />
          <label htmlFor='aanvraag'>Aanvraag</label>
        </div>
      </article>

      <input type='submit' value='Filter' />

    </form>
  );
};

FilterBar.propTypes = {
  filterSearch: func.isRequired
};

export default inject(
  ({activityStore}) => ({
    filterSearch: activityStore.filterSearch
  })
)(
  observer(FilterBar)
);
