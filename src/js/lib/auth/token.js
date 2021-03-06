import jwt from 'jsonwebtoken';

export const get = () => localStorage.getItem(`token`);
export const set = t => localStorage.setItem(`token`, t);

export const content = () => jwt.decode(get());
export const read = token => jwt.decode(token);

export const timestamp = () => Math.floor(Date.now() / 1000);

export const isValid = () => {

  let valid = true;
  const t = content();

  if (t) {
    if (t.exp && (t.exp - timestamp()) < 0) {
      valid = false;
    }
    if (t.nbf && (timestamp() - t.nbf) > 0) {
      valid = false;
    }
  } else {
    valid = false;
  }

  if (!valid) clear();

  return valid;

};

export const clear = () => {
  localStorage.removeItem(`token`);
  return !localStorage.getItem(`token`);
};

export default {
  get,
  set,
  content,
  isValid,
  clear,
  read
};
