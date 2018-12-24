import {Keypair} from 'stellar-base'
export const UPDATEPROFILE = 'UPDATEPROFILE'
export const AUTHENTICATE = 'AUTHENTICATE'

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


