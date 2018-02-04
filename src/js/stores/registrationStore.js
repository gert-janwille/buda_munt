import {observable, action} from 'mobx';
import serialize from '../lib/serialize';
import {isEmpty} from 'lodash';

import usersAPI from '../lib/api/users';
import authAPI from '../lib/api/auth';

import {set, content} from '../lib/auth/token';

class Store {
  @observable email = ``
  @observable password = ``

  @observable currentUser = {e: `d`}

  @observable subscriptionType = ``

  @observable errors = {}
  @observable data = {
    name: ``,
    firstName: ``,
    password: ``,
    email: ``,
    phone: ``,
    street: ``,
    houseNumber: ``,
    bus: ``,
    zip: ``,
    dealer: ``,
    description: ``,
    file: ``,
    fileURL: `../../assets/img/default-profile.jpg`
  }

  @observable emptyData = {}

  init = () => {
    this.currentUser = content();
    this.emptyData = this.data;
  }

  constructor() {
    this.init();
  }

  @action changeInput = e => {
    if (e.currentTarget.name === `file`) return this.getFiles(e);
    this.data[e.currentTarget.name] = e.currentTarget.value;
  }

  @action submitForm = (e, history) => {
    const data = serialize(e.currentTarget);
    const errors = this.validate(data);
    if (!isEmpty(errors)) return this.errors = errors;
    if (data.pinRepeat !== data.pin) return this.errors = {pinRepeat: `Pin did not match`};

    const fullError = this.validate(this.data);
    if (fullError.file) delete this.data[`file`];
    if (fullError.bus) delete this.data[`bus`];

    if (this.subscriptionType.includes(`bewoner`)) {
      if (fullError.dealer) delete this.data[`dealer`];
      if (fullError.description) delete this.data[`description`];
    }

    this.data[`username`] = `${this.data.firstName.toLowerCase()}${this.data.name.toLowerCase()}`;

    usersAPI.insert(this.data)
      .then(user => {
        authAPI.login({login: user.email, password: this.data.password})
          .then(({token}) => {
            if (token === undefined) throw new Error(`Something went wrong`);
            set(token);
            this.currentUser = content();
          });
      })
      .then(() => {
        this.data = this.emptyData;
      })
      .then(() => history.push(`/dashboard`));
  }

  @action login = e => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = serialize(form);
    const error = this.validate(data);

    if (!isEmpty(error)) return this.errors = error;

    this.errors = {email: ``, password: ``};

    return authAPI.login(this.renameKey(data, `login`, `email`))
      .then(({token}) => {
        if (token === undefined) throw new Error(`Something went wrong`);
        set(token);
        this.currentUser = content();
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

  @action validateForm = form => {
    const data = serialize(form);
    const errors = this.validate(data);
    if (errors.bus) delete errors[`bus`];
    return isEmpty(errors) ? 200 : this.errors = errors;
  }

  getFiles = e => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.data.file = file;
      this.data.fileURL = reader.result;
    };

    reader.readAsDataURL(file);
  }

  validate = data => {
    const errorStrings = [`Oeps, je gaf geen`, `Vergeet niet je`];
    const error = {};
    for (const key in data) {
      if (data[key] === `` || data[key] === ` `) error[key] = `${errorStrings[Math.floor(Math.random() * errorStrings.length)]} ${key}`;
    }
    return error;
  }

  @action setSubscriptionType  = type => this.subscriptionType = type;
}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
