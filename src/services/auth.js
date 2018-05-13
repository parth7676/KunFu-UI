import axios from 'axios'
import * as Cookies from 'js-cookie'

const cookieKey = 'kung-fu-key';
const token = Cookies.get(cookieKey);
const isAuthenticated = typeof token === 'string'

if (isAuthenticated) {
  axios.defaults.headers['Authorization'] = 'Bearer '+token;
}

export default {
  authenticated: isAuthenticated,
  login(token) {
    this.authenticated = true;
    window.location.href = "/";
    axios.defaults.headers['Authorization'] = token;
    Cookies.set(cookieKey, token, {expires: 1})
  },
  logout() {
    this.authenticated = false;
    window.location.href = "/login";
    axios.defaults.headers['Authorization'] = null;
    Cookies.remove(cookieKey);
  }
}
