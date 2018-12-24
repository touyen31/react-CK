import axios from 'axios'
import makeTransaction from '../makeTransaction'
import sendTx from './sendTx'
const URL = 'http://localhost:5000'
export const getSequence = async (address) => {
    let request = await axios.get(`${URL}/account/${address}/sequence`);
    let sequence = request.data.sequence
}

export const payment = async (me, address, amount, secret) => {
    let params = {
        address,
        amount
    }
    let strBase64 = await makeTransaction(me, 'payment', params, secret);


    return sendTx(strBase64);
}

