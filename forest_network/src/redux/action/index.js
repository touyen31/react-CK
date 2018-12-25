import {Keypair} from 'stellar-base'
import axios from 'axios'
export const UPDATEPROFILE = 'UPDATEPROFILE'
export const AUTHENTICATE = 'AUTHENTICATE'
export const GETMYNAME = 'GETMYNAME'

// export const getmyname = (publickey)=> dispatch => {
//     const url ='http://localhost:5000/account/'+publickey+'/name'
//    return axios.get(url)
//         .then(res=>{
//             dispatch({
//                 type:GETMYNAME,
//                 data:res.data.Name
//             })
//         })
//         .catch(e=>{
//             alert(e.message)
//         })
//
// }

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


export const getmyname  = async (publickey)=>{
    const url ='http://localhost:5000/account/'+publickey+'/name'
    return await axios.get(url)
        .then(res=>{
            return res.data.Name
        })
        .catch(e=>{
            alert(e.message)
        })
}

export const getAllMyStatus = async (publickey)=>{
    const url ='http://localhost:5000/account/'+publickey+'/status'
    return await axios.get(url)
        .then(res=>{
            return res.data.data
        })
        .catch(e=>{
            alert(e.message)
        })
}

export const getFollowing =async (publickey)=>{
    const url ='http://localhost:5000/account/'+publickey+'/following'
    return await axios.get(url)
        .then(res=>{
            return res.data.following
        })
        .catch(e=>{
            alert(e.message)
        })
}

export const getFollower = async (publickey)=>{
    const url ='http://localhost:5000/account/'+publickey+'/follower'
    return await axios.get(url)
        .then(res=>{
            return res.data.follower
        })
        .catch(e=>{
            alert(e.message)
        })
}

export const getSequence = async (publickey) => {
    let request = await axios.get(`http://localhost:5000/account/${publickey}/sequence`);
    return request.data.sequence
}

export const getAvatar = async (publickey)=>{
    const url ='http://localhost:5000/account/'+publickey+'/avatar'
    return await axios.get(url)
        .then(res=>{
            const flag= 'data:image/jpeg;base64,'
            return flag+res.data.Avatar
        })
        .catch(e=>{
            alert(e.message)
        })
}

export const getinfo = async (publickey)=>{
    const url ='http://localhost:5000/account/'+publickey
    return await axios.get(url)
        .then(res=>{
            return res.data.data
        })
        .catch(e=>{
            alert(e.message)
        })
}
