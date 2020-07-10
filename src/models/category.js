import { Fetch } from '../utils/fetch';

export class Category {
  static async list(limit, offset) {
    const res = await Fetch.get(`/category?limit=${limit}&offset=${offset}`)
    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res.json();
  }
}