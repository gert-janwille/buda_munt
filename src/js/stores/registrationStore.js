import {observable, action} from 'mobx';

class Store {

  @observable subscriptionType = ``

  @action setSubscriptionType  = type => this.subscriptionType = type;
}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
