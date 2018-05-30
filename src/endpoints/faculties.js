import axios from 'axios'
import config from '../config'

const URL = config.apiUrl + "/faculties"

export function list() {
  return axios.get(URL);
}
export function del(id) {
  return axios.delete(URL + "/" + id)
}
export function create(faculty) {
  return axios.post(URL, faculty)
}

export function edit(faculty) {
  return axios.put(URL + "/" + faculty.id, faculty)
}