import Cookies from 'js-cookie';
import { Auth } from '../models/auth';
import { COOKIE_USER, COOKIE_ANONYMOUS } from '../constants/session';

export class SessionUtils {
  static initSession = async () => {
    const cookie = Cookies.get(COOKIE_USER) || Cookies.get(COOKIE_ANONYMOUS);
    let session = null;
    try {
      if (!cookie) {
        throw Error('No existing cookie');
      }

      session = await Auth.fetch();
    } catch (e) {
      session = await Auth.createAnonymous();
      Cookies.remove(COOKIE_USER);
      Cookies.set(COOKIE_ANONYMOUS, session.token);
    }

    return Promise.resolve(session);
  };

  static setSessionCookie = (session) => {
    if (session.user) {
      Cookies.set(COOKIE_USER, session.token);
    } else {
      Cookies.remove(COOKIE_USER);
      Cookies.set(COOKIE_ANONYMOUS, session.token);
    }
  };

  static removeSessionCookie = () => {
    Cookies.remove(COOKIE_USER);
  };
}