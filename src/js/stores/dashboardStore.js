import {observable, action} from 'mobx';
import SocketIOClient from 'socket.io-client';
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
    usersAPI.read(`email`, read(token).email)
      .then(({account, user}) => {
        this.account = account;
        this.user = user;

        this.initSockets(user.account);
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

  @action logout = () => clear();

  initSockets = account => {
    this.socket = SocketIOClient(`/`, {query: `account=${account}`});
    this.socket.on(`message`, e => this.handleWSmessage(e));
  }

  updateUser = () => {
    const token = get();
    usersAPI.read(read(token).email)
      .then(({account, user}) => {
        this.account = account;
        this.user = user;
      })
      .catch(e => console.log(e));
  }

  handleWSmessage = data => {
    const {action} = data;
    switch (action) {
    case `transaction`:
      this.updateUser();
      break;
    }
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
