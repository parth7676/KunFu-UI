import axios from 'axios'
import config from '../config'

const URL = config.apiUrl + "/levels";

export function list() {
  return axios.get(URL);
}

export function del(id) {
  return axios.delete(URL + "/" + id)
}

export function create(data) {
  return axios.post(URL, data)
}

export function update(id, data) {
  return axios.put(URL + "/" + id, data)
}