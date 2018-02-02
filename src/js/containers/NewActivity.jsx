import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {object} from 'prop-types';

const NewActivity = ({errors}) => {

  const handleSubmitLogin  = e => {
    e.preventDefault();
    console.log(`hello world`);
  };

  const handleChangeInput = e => {
    e.preventDefault();
    console.log(`hello world`);
  };

  return (
      <main className='new-container'>

        <section className='breadcrumbs'>
          <p className='lato-bol green-color'><Link to={`/overzicht`} className='blue-link'>Overzicht</Link> / Nieuwe Oproep</p>
        </section>

        <form method='POST' onSubmit={handleSubmitLogin} className='new-activity-form'>

          <section className='new-section'>
            <label className='lato-bol light-grey-color'>Aanbieding of aanvraag?</label>

            <div className='input-field'>
              <div className='radio-select'>
                <input className='radio-option-request' type='radio' name='type' id='R' value='R' checked />
                <label htmlFor='R' className='radio-request grey-color'><br />aanvraag</label>

                <input className='radio-option-offer'  type='radio' name='type' id='O' value='O' />
                <label htmlFor='O' className='radio-offer grey-color'><br />aanbieding</label>
              </div>
              <p className='error'></p>
            </div>
          </section>

          <section className='new-section'>
            <label htmlFor='categorie' className='lato-bol light-grey-color'>Welke categorie verkiest u?</label>
            <div className='input-field'>
              <select className='green-color' name='categorie' id='categorie'>
                <option value=''>Categorie</option>
              </select>
              <p className='error'></p>
            </div>
          </section>

          <section className='new-section'>
            <label htmlFor='title' className='lato-bol light-grey-color'>Wat biedt u aan / wat zoekt u?</label>
            <div className='input-field'>
              <input className='grey-color' id='title' name='title' onChange={handleChangeInput} type='text' placeholder='Geef een korte titel in' />
              <p className='error'></p>
            </div>
          </section>

          <section className='new-section'>
            <label htmlFor='amount' className='lato-bol light-grey-color'>Hoeveel vraagt u / wilt u betalen?</label>
            <div className='input-field'>
              <span className='grey-color lato-bol'>
                <input className='grey-color' id='amount' name='price' onChange={handleChangeInput} type='number' />
                 <span> BDA</span>
              </span>
              <p className='error'></p>
            </div>
          </section>

          <section className='new-section long-section'>
            <label htmlFor='description' className='lato-bol light-grey-color'>Extra uitleg</label>
            <div className='input-field more-submit'>
              <textarea name='description' id='description' placeholder='Geef een uitgebreide beschrijving'></textarea>
              <p className='error'></p>
              <input className='grey-color' type='submit' value='Plaats' />
            </div>
          </section>


          <section className='new-btn-section'>

          </section>

        </form>

      </main>
  );
};

NewActivity.propTypes = {
  errors: object.isRequired
};

export default inject(
  ({activityStore}) => ({
    errors: activityStore.errors
  })
)(
  observer(NewActivity)
);
