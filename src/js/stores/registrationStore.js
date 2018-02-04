import {observable, action} from 'mobx';
import serialize from '../lib/serialize';
import {isEmpty} from 'lodash';

class Store {

  @observable subscriptionType = ``

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

  @observable errors = {}

  @action changeInput = e => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (key === `file`) return this.getFiles(e);
    this.data[key] = value;

  }

  @action submitForm = () => {
    // const data = serialize(this.data);
    this.data[`username`] = `${this.data.firstName.toLowerCase()}${this.data.name.toLowerCase()}`;
    console.log(this.data);
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
