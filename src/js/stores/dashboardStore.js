import {observable, action} from 'mobx';
// import {isEmpty} from 'lodash';

import {get, read, clear} from '../lib/auth/token';
import usersAPI from '../lib/api/users';

class Store {

  @observable user = {}
  @observable account = {}

  init = () => {
    const token = get();
    if (token) this.getUserFromToken(token);
  }

  getUserFromToken = token => {
    usersAPI.read(read(token).email)
      .then(({account, user}) => {
        this.account = account;
        this.user = user;
      })
      .catch(e => console.log(e));
  }

  constructor() {
    this.init();
  }

  @action getToken = () => {
    const token = get();
    if (token) this.getUserFromToken(token);
  };

  @action logout = () => {
    return clear();
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
