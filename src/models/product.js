import { Fetch } from '../utils/fetch';
import { isNumber, isEmpty } from 'lodash';

export class Product {
  static async list({ limit, offset, query, category }) {
    let queryParams = ``;
    if (query && !isEmpty(query)) {
      queryParams = `${queryParams}&q=${query}`
    }
    if (isNumber(limit)) {
      queryParams = `${queryParams}&limit=${limit}`
    } else {
      queryParams = `${queryParams}&limit=${25}`
    }

    if (isNumber(offset)) {
      queryParams = `${queryParams}&offset=${offset}`
    } else {
      queryParams = `${queryParams}&offset=${0}`
    }

    if (category) {
      queryParams = `${queryParams}&category=${category}`
    }
    
    const res = await Fetch.get(`/product?${queryParams}`)
    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res.json();
  }

  static async create(body) {
    const res = await Fetch.post('/product', body)
    
    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res;
  }

  static async edit(body, id) {
    const res = await Fetch.put(`/product/${id}`, body)
    
    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res;
  }

  static async delete(id) {
    const res = await Fetch.delete(`/product/${id}`, {})

    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res;
  }

  static async countView(id) {
    const res = await Fetch.put(`/view/product/${id}`)

    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res.json();
  }
}