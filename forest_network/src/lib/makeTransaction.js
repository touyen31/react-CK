import {sign,encode} from './transaction'
import {getSequence} from './api/account'
import axios from 'axios'
const makeTransaction = async (account, operation, params, secretKey) => {
    let req1 = await axios.post('http://localhost:5000/tx/unsignedhash', {
        params,
        operation,
        account
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    let tx = req1.data.tx;
    let unsignedhash = req1.data.UnsignedHash;
    sign(tx, secretKey, unsignedhash);
    let newTx = {
        ...tx,
        params
    }

    return await axios.post('http://localhost:5000/tx/receiveTx', {
        tx: newTx
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export  default  makeTransaction;