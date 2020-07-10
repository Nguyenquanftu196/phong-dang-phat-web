import { Fetch } from '../utils/fetch';

export class UploadImage {
  static async uploadImage(listImg) {
    const res = await Fetch.upload(`/file/upload/AD_IMAGES?type=AD_IMAGES`, 'AD_IMAGES', listImg)
    if (res.status >= 300) {
      throw Error('Bad Request');
    }

    return res;
  }
}