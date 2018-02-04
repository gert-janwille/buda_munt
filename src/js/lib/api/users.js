const url = `/api/users`;
import fetch from 'isomorphic-fetch';

import buildBody from '../buildBody';
import token from '../auth/token';

export default {
  read: email => {
    const method = `GET`;
    const headers = new Headers({
      'Content-Type': `application/json`,
      authorization: token.get()
    });

    return fetch(`${url}?email=${email}`, {method, headers, mode: `cors`})
      .then(r => r.json())
      .catch(er => console.log(er));
  },

  insert: data => {
    const body = buildBody(data, [`username`, `name`, `firstName`, `password`, `email`, `phone`, `street`, `houseNumber`, `bus`, `zip`, `dealer`, `description`, `pin`]);
    const method = `POST`;
    const headers = new Headers({
      'Content-Type': `application/json`
    });

    return fetch(`${url}`, {body, method, headers, mode: `cors`})
      .then(r => r.json())
      .catch(er => console.log(er));
  }

};
