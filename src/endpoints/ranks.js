import axios from 'axios'
import config from '../config'

const URL = config.apiUrl + "/ranks"

export function list() {
  return axios.get(URL);
}
export function del(id) {
  return axios.delete(URL + "/" + id)
}
export function create(rank) {
  return axios.post(URL, rank)
}

export function edit(rank) {
  return axios.put(URL + "/" + rank.id, rank);
}