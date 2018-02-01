const url = `/api/activities`;
import fetch from 'isomorphic-fetch';

import buildBody from '../buildBody';
import token from '../auth/token';

export default {

  read: query => {
    const method = `GET`;
    const headers = new Headers({
      'Content-Type': `application/json`
    });

    return fetch(query ? `${url}?${query}` : url, {method, headers, mode: `cors`})
      .then(r => r.json())
      .catch(er => console.error(er));
  },

  update: (data, id) => {
    const method = `PUT`;
    const body = buildBody(data, [`stock`, `price`, `rating`, `badge`, `isActive`]);
    const headers = new Headers({
      'Content-Type': `application/json`,
      authorization: token.get()
    });

    return fetch(`${url}/${id}`, {body, method, headers, mode: `cors`})
      .then(r => r.json())
      .catch(er => console.error(er));
  },

  insert: data => {

    const body = buildBody(data, [`title`, `description`, `type`, `price`, `badge`, `rating`, `collect`, `width`, `height`, `stock`, `isActive`]);
    const method = `POST`;
    const headers = new Headers({
      'Content-Type': `application/json`,
      authorization: token.get()
    });

    return fetch(`${url}`, {body, method, headers, mode: `cors`})
      .then(r => r.json())
      .catch(er => console.error(er));
  }

};
