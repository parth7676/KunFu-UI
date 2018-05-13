import axios from 'axios'
import config from '../config'

const URL = config.apiUrl+"/auth";

export function authenticate (credentials) {
  return axios.post(URL, credentials);
}