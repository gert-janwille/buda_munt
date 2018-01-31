import {observable, action} from 'mobx';

import {activities} from '../../assets/data/activities.json';

class Store {

  @observable activities = activities;
  @observable activityLimit = activities.length - 1;
  @observable isPopUpOpen = false
  @observable popUpData = {}
  @observable currentId = 0


  @action closePopUp = () => this.isPopUpOpen = false;

  @action handlePopup = id => {
    this.currentId = id;
    this.popUpData = this.activities.filter(obj => obj.id === id)[0];
    this.isPopUpOpen = true;
  }

  @action getNextItem = bool => {
    let nextId = this.currentId;
    switch (bool) {
    case true:
      nextId = nextId > this.activityLimit - 1 ? 0 : this.currentId + 1;
      break;
    case false:
      nextId = nextId <= 0 ? this.activityLimit : this.currentId - 1;
      break;
    }
    this.handlePopup(nextId);
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
