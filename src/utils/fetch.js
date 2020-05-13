import { isArray, each } from 'lodash';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
import { COOKIE_USER, COOKIE_ANONYMOUS } from '../constants/session';

const API = process.env.REACT_APP_API_URL;
const getSessionId = () => Cookies.get(COOKIE_USER) || Cookies.get(COOKIE_ANONYMOUS);

export class Fetch {
  static async fetch(url, method, body = null, headers = {}) {
    const fullUrl = `${API}${url}`;

    return fetch(fullUrl, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });
  }

  static async ajax(url, method, body, headers) {
    const token = getSessionId();
    
    return Fetch.fetch(url, method, body, {
      ...headers,
      authorization: `Bearer ${token}`,
    });
  }

  static get(url, headers = {}) {
    return Fetch.ajax(url, 'GET', null, headers);
  }

  static put(url, body, headers = {}) {
    return Fetch.ajax(url, 'PUT', body, headers);
  }

  static post(url, body, headers = {}) {
    return Fetch.ajax(url, 'POST', body, headers);
  }

  static delete(url, body = {}, headers = {}) {
    return Fetch.ajax(url, 'DELETE', body, headers);
  }

  static upload(url, key, value) {
    const token = getSessionId();

    return new Promise((resolve) => {
      const body = new FormData();

      if (!isArray(value)) {
        value = [value];
      }

      each(value, (entity) => {
        body.append(key, entity);
      });

      const xhr = new XMLHttpRequest();

      xhr.timeout = 120000;

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
        // return reject('Oops...');
      };

      xhr.open('POST', `${API}${url}`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(body);
    });
  }
}