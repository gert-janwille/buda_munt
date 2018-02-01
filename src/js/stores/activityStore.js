import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';

import serialize from '../lib/serialize';

import {activities} from '../../assets/data/activities.json';
import activityAPI from '../lib/api/activities';

class Store {

  @observable activities = activities;
  @observable activityLimit = activities.length - 1;
  @observable isPopUpOpen = false
  @observable popUpData = {}
  @observable currentId = 0

  @observable chores = []
  @observable allChores = []
  @observable promo = {}

  @observable detailActivity = {}
  @observable imgFile = `../../assets/img/default-profile.jpg`

  init = () => {
    activityAPI.read()
      .then(chores => {
        chores.map(c => this.chores.push(c));
        this.promo = chores[Math.floor(Math.random() * chores.length)];
      })
      .then(() => {
        this.allChores = this.chores;
      });
  }

  constructor() {
    console.error = function() {};
    this.init();
  }

  @action findOne = (_id, title) => {
    if (isEmpty(this.allChores)) return;

    title = title.split(`-`).join(` `);
    this.detailActivity = this.allChores.filter(c => c.title.toLowerCase() === title && c._id.toLowerCase() === _id)[0];

    // this.doesFileExist(`../../uploads/${this.detailActivity.username.toLowerCase().split(` `).join(`-`)}.jpg`, `../../assets/img/default-profile.jpg`)
    //     .then(url => this.imgFile = url);
  }

  @action filterSearch = e => {
    const data = serialize(e.currentTarget);

    if (data.title === ``) return this.chores = this.allChores;
    if (data.categorie === ``) delete data[`categorie`];

    if (data.aanvraag && !data.aanbieding) {
      delete data[`aanvraag`];
      delete data[`aanbieding`];
      data[`type`] = `R`;
    } else if (!data.aanvraag && data.aanbieding) {
      delete data[`aanvraag`];
      delete data[`aanbieding`];
      data[`type`] = `O`;
    } else if (data.aanvraag && data.aanbieding && !data.title || !data.aanvraag && !data.aanbieding && !data.title) {
      return this.chores = this.allChores;
    }

    this.chores = this.findMatching(this.allChores, data);
  }

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

  @action findMatching = (arr, data) => {
    const results = [];
    arr.map(obj => {
      for (const key in data) {
        if (obj[key].toLowerCase().indexOf(data[key].toLowerCase()) !== - 1) results.push(obj);
      }
    });
    return results;
  }

  @action toQueryString = obj => {
    const str = [];
    for (const p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(`${encodeURIComponent(p)  }=${encodeURIComponent(obj[p])}`);
      }
    return str.join(`&`);
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;