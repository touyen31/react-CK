import {Keypair} from 'stellar-base'
import axios from 'axios'
export const UPDATEPROFILE = 'UPDATEPROFILE'
export const AUTHENTICATE = 'AUTHENTICATE'
export const GETMYNAME = 'GETMYNAME'

export const getmyname = (publickey)=> dispatch => {
    const url ='http://localhost:5000/account/'+publickey+'/name'
   return axios.get(url)
        .then(res=>{
            dispatch({
                type:GETMYNAME,
                data:res.data.Name
            })
        })
        .catch(e=>{
            alert(e.message)
        })

}

export const updateprofile = (profile)=>{
    return {
        type:UPDATEPROFILE,
        data:profile
    }
}

export const authenticate = (secretkey) => {
    let key = Keypair.fromSecret(secretkey);
    let publickey = key.publicKey();
    console.log(publickey)
    return {
        type: AUTHENTICATE,
        data: {
            publickey,
            secretkey
        }
    }
}


