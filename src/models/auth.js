import { Fetch } from '../utils/fetch';

export class Auth {
  static async createAnonymous() {
    const res = await Fetch.post('/auth/anonymous');

    if (res.status >= 300) {
      const e = await res.json();
      throw (e.message || e.errors[0].description);
    }

    return res.json();
  }

  static async login(username, password) {
    const res = await Fetch.post('/auth/login', { username, password });
    if (res.status >= 300) {
      const e = await res.json();
      throw (e.message || e.errors[0].description);
    }

    return res.json();
  }

  static async fetch() {
    const res = await Fetch.get(`/auth/jwt`);

    if (res.status >= 300) {
      const e = await res.json();
      throw (e.message || e.errors[0].description);
    }

    return res.json();
  }
}