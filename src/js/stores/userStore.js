import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';

import AuthAPI from '../lib/api/auth';
import serialize from '../lib/serialize';

import {set, content} from '../lib/auth/token';

class Store {

  @observable email = ``
  @observable password = ``
  @observable errors = {
    email: ``,
    password: ``
  }

  @action changeInput = (key, value) => {
    switch (key) {
    case `email`:
      this.email = value;
      break;
    case `password`:
      this.password = value;
      break;
    }
  }

  @action login = e => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = serialize(form);
    const error = this.validate(data);

    if (!isEmpty(error)) return this.errors = error;

    this.errors = {email: ``, password: ``};

    return AuthAPI.login(this.renameKey(data, `login`, `email`))
      .then(({token}) => {
        if (token === undefined) throw new Error(`Something went wrong`);
        set(token);
      })
      .then(() => {
        this.email = ``;
        this.password = ``;
        form.reset();
        return 200;
      })
      .catch(() => {
        this.errors.password = `Er werd een verkeerde combinatie ingegeven.`;
      });
  }

  @action hasAccess = username => {
    const token = content();
    return token ? (token.username === username) ? true : false : false;
  }

  @action renameKey = (data, i, o) => {
    data[i] = data[o];
    delete data[o];
    return data;
  }

  @action validate = data => {
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
