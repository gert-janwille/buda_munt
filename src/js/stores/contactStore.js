import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';

import {content} from '../lib/auth/token';
import serialize from '../lib/serialize';
import contactAPI from '../lib/api/contact';

class Store {
  @observable success = false
  @observable errors = {}
  @observable data = {
    name: ``,
    firstName: ``,
    email: ``,
    question: ``,
  }

  init = () => {
    try {
      this.data.email = content().email;
    } catch (e) {
      this.data.email = ``;
    }
  }

  constructor() {
    this.init();
  }

  @action sendMessage = e => {
    const data = serialize(e.currentTarget);
    const errors = this.validate(data);
    if (!isEmpty(errors)) return this.errors = errors;

    contactAPI.insert(data)
      .then(({status}) => {
        if (status === `success`) return this.success = true;
      })
      .then(() => {
        this.data = {
          name: ``,
          firstName: ``,
          email: ``,
          question: ``,
        };
      })
      .catch(() => this.errors.question = `Er liep iets mis. Probeer opnieuw.`);
  }

  @action changeInput = e => this.data[e.currentTarget.name] = e.currentTarget.value;

  validate = data => {
    const errorStrings = [`Oeps, je gaf geen`, `Vergeet niet je`];
    const error = {};
    for (const key in data) {
      if (data[key] === `` || data[key] === ` `) error[key] = `${errorStrings[Math.floor(Math.random() * errorStrings.length)]} ${key}`;
    }
    return error;
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
