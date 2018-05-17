import axios from 'axios'
import config from '../config'

const URL = config.apiUrl+"/sales"

export function list() {
    return axios.get(URL);
  }
  export function del (id) {
    return axios.delete(URL+"/"+id)
  }
  export function create (sale) {
    return axios.post(URL,sale)
  }