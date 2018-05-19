import axios from 'axios'
import config from '../config'

const URL = config.apiUrl+"/attendance"

export function list() {
    return axios.get(URL);
  }
  export function del (id) {
    return axios.delete(URL+"/"+id)
  }
  export function create (attendance) {
    return axios.post(URL,attendance)
  }