import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {object, func} from 'prop-types';

const NewActivity = ({history, data, insertActivity, changeInput, errors}) => {

  const handleSubmitLogin  = e => {
    e.preventDefault();
    insertActivity(e, history);
  };

  const handleChangeInput = e => {
    e.preventDefault();
    changeInput(e.currentTarget.name, e.currentTarget.value);
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
                <input onChange={handleChangeInput} className='radio-option-request' type='radio' name='type' id='R' value='R' checked />
                <label htmlFor='R' className='radio-request grey-color'><br />aanvraag</label>

                <input onChange={handleChangeInput} className='radio-option-offer'  type='radio' name='type' id='O' value='O' />
                <label htmlFor='O' className='radio-offer grey-color'><br />aanbieding</label>
              </div>
              <p className='error'>{errors.type}</p>
            </div>
          </section>

          <section className='new-section'>
            <label htmlFor='categorie' className='lato-bol light-grey-color'>Welke categorie verkiest u?</label>
            <div className='input-field'>
              <select onChange={handleChangeInput} value={data.categorie} className='green-color' name='categorie' id='categorie'>
                <option value=''>Categorie</option>
                <option value='zorg'>Zorg</option>
              </select>
              <p className='error'>{errors.categorie}</p>
            </div>
          </section>

          <section className='new-section'>
            <label htmlFor='title' className='lato-bol light-grey-color'>Wat biedt u aan / wat zoekt u?</label>
            <div className='input-field'>
              <input onChange={handleChangeInput} className='grey-color' id='title' name='title' type='text' placeholder='Geef een korte titel in' value={data.title} />
              <p className='error'>{errors.title}</p>
            </div>
          </section>

          <section className='new-section'>
            <label htmlFor='amount' className='lato-bol light-grey-color'>Hoeveel vraagt u / wilt u betalen?</label>
            <div className='input-field'>
              <span className='grey-color lato-bol'>
                <input onChange={handleChangeInput} className='grey-color' id='amount' name='price' type='number' value={data.price} />
                 <span> BDA</span>
              </span>
              <p className='error'>{errors.price}</p>
            </div>
          </section>

          <section className='new-section long-section'>
            <label htmlFor='description' className='lato-bol light-grey-color'>Extra uitleg</label>
            <div className='input-field more-submit'>
              <textarea onChange={handleChangeInput} value={data.description} name='description' id='description' placeholder='Geef een uitgebreide beschrijving'></textarea>
              <p className='error'>{errors.description}</p>
              <input className='grey-color' type='submit' value='Plaats' />
            </div>
          </section>

        </form>

      </main>
  );
};

NewActivity.propTypes = {
  errors: object.isRequired,
  insertActivity: func.isRequired,
  changeInput: func.isRequired,
  data: object.isRequired,
  history: object.isRequired
};

export default inject(
  ({activityStore}) => ({
    errors: activityStore.errors,
    insertActivity: activityStore.insertActivity,
    changeInput: activityStore.changeInput,
    data: activityStore.data
  })
)(
  observer(NewActivity)
);
