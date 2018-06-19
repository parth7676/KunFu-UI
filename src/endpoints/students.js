import axios from 'axios'
import config from '../config'

const URL = config.apiUrl + "/students"

export function list() {
  return axios.get(URL);
}
export function del(id) {
  return axios.delete(URL + "/" + id)
}
export function create(student) {
  return axios.post(URL, student)
}
export function getStudentDetails(id) {
  return axios.get(`${URL}/${id}`)
}

export function update(data) {
  return axios.put(`${URL}/${data.id}`, data);
}
