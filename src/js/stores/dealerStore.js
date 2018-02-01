import {observable} from 'mobx';
import dealersAPI from '../lib/api/dealers';

class Store {

  @observable dealers = []

  init = () => {
    dealersAPI.read()
      .then(dealers => dealers.map(c => this.dealers.push(c)));
  }

  constructor() {
    this.init();
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
