import axios from 'axios'
const URL = 'http://localhost:5000'

export default (strBase64) => axios.post(`${URL}/tx`, {tx: strBase64});