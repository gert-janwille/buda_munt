const url = `/api/adds`;
import fetch from 'isomorphic-fetch';

import token from '../../auth/token';

export default {

  read: _amount => {
    const selectOne = _amount ? `/${_amount}` : ``;
    return fetch(`${url}${selectOne}`)
      .then(r => r.json());

  },

  delete: _id => {
    const method = `DELETE`;
    const headers = new Headers({authorization: token.get()});

    return fetch(`${url}/${_id}`, {method, headers});

  }

};
