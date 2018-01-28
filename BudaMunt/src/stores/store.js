import {observable} from 'mobx';

let index = 0

class Store {

  @observable name = `BudaMunt`
  
}

const store = new Store();
export default store;
