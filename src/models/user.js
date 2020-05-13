import { Fetch } from '../utils/fetch';

export class User {
  static async fetch(limit, offset) {
    const res = await Fetch.get(`/users?limit=${limit}&offset=${offset}`)

    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res.json();
  }

  static async create(params) {

    const res = await Fetch.post(`/user`, params)

    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res;
  }

  static async update(id, status) {
    const res = await Fetch.put('/user/me', { id, status });

    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res;
  }
}