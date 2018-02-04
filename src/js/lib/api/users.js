const url = `/api/users`;
import fetch from 'isomorphic-fetch';

import buildBody from '../buildBody';

export default {

  insert: data => {
    const body = buildBody(data, [`username`, `name`, `firstName`, `password`, `email`, `phone`, `street`, `houseNumber`, `bus`, `zip`, `dealer`, `description`, `pin`]);
    const method = `POST`;
    const headers = new Headers({
      'Content-Type': `application/json`
    });

    return fetch(`${url}`, {body, method, headers, mode: `cors`})
      .then(r => r.json())
      .catch(er => console.error(er));
  }

};
