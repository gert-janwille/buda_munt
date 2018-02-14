import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';

import serialize from '../lib/serialize';

import {activities} from '../../assets/data/activities.json';
import activityAPI from '../lib/api/activities';
import usersAPI from '../lib/api/users';

class Store {
  @observable newComment = false

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


  @observable errors = {}

  @observable data = {
    type: ``,
    categorie: ``,
    title: ``,
    price: ``,
    description: ``
  }

  init = () => {
    activityAPI.read()
      .then(chores => {
        chores.map(c => {
          c.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
          this.chores.push(c);
        });
        this.promo = chores[Math.floor(Math.random() * chores.length)];
      })
      .then(() => {
        this.allChores = this.chores;
      });

  }

  constructor() {
    console.error = function() {};
    console.warn = function() {};
    this.init();
  }

  @action changeInput = (key, value) => {
    switch (key) {
    case `type`:
      this.data.type = value;
      break;
    case `categorie`:
      this.data.categorie = value;
      break;
    case `title`:
      this.data.title = value;
      break;
    case `price`:
      this.data.price = value;
      break;
    case `description`:
      this.data.description = value;
      break;
    }
  }

  @action insertActivity = (e, history) => {
    const formData = serialize(e.currentTarget);

    this.data.type = formData.O ? `O` : `R`;

    const error = this.validate(this.data);
    if (!isEmpty(error)) return this.errors = error;
    this.error = {};

    activityAPI.insert(this.data)
      .then(a => {
        this.chores.splice(0, 0, a);
        this.allChores = this.chores;
      }).then(() => {
        this.data.categorie = ``;
        this.data.title = ``;
        this.data.price = ``;
        this.data.description = ``;

        history.push(`/overzicht`);
      })
      .catch(() => {
        this.errors.description = `Er liep iets verkeerd.`;
      });
  }

  @action insertNewComment = (e, username, account, id, currentUser) => {
    let data = serialize(e.currentTarget);
    data[`username`] = username;
    data[`account`] = account;
    data[`date`] = Date.now();

    data = {
      description: data.description,
      username: data.username,
      account: data.account,
      date: data.date,
    };

    activityAPI.update({comment: String(JSON.stringify(data))}, `comment`, id)
      .then(a => {
        this.setNewComment(false, currentUser);
        a.comments = a.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.chores.map(c => (c._id === a._id) ? c.comments = a.comments : null);
      });
  }

  @action setNewComment = (bool, user) => {
    if (user) this.newComment = bool;
  };

  @action acceptOrDenyProposal = (e, data) => {
    const target = e.currentTarget.classList;

    if (target.contains(`accept`)) {
      usersAPI.read(`username`, data.username)
        .then(({email}) => {
          data[`email`] = email;
          activityAPI.update({doneby: String(JSON.stringify(data))}, `doneby`, data.id)
            .then(a => {
              a.comments = a.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
              this.chores.map(c => {
                if (c._id === a._id) {
                  c[`doneBy`] = a.doneBy;
                  c.comments = a.comments;
                }
              });
            });
        })
        .catch(e => console.log(e));

    } else {
      console.log(`deny`);
    }
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
