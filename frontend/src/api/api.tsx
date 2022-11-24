import axios from 'axios'

export const axiosHttpClient = axios.create({baseURL: 'http://localhost:5600/api/v1'}) ;