const url = `/api/contact`;
import fetch from 'isomorphic-fetch';

import buildBody from '../buildBody';

export default {

  insert: data => {
    const body = buildBody(data, [`name`, `firstName`, `email`, `question`]);
    const method = `POST`;
    const headers = new Headers({
      'Content-Type': `application/json`
    });

    return fetch(`${url}`, {body, method, headers, mode: `cors`})
      .then(r => r.json())
      .catch(er => console.error(er));
  }

};
