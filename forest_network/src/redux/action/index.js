import {Keypair} from 'stellar-base'
import axios from 'axios'
export const UPDATEPROFILE = 'UPDATEPROFILE'
export const AUTHENTICATE = 'AUTHENTICATE'
export const SAVEFOLLOWING = 'SAVEFOLLOWING'
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
export const savefollowing = (following)=>{
    return{
        type:SAVEFOLLOWING,
        data:following
    }
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
    try {
        let res = await axios.get(url);
        return res.data.data
    } catch (e) {
        return[]
    }

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

export const getTotalMoney = async (publickey)=>{
    const url ='http://localhost:5000/account/'+publickey+'/money'
    return await axios.get(url)
        .then(res=>{
            return res.data.totalMoney
        })
        .catch(e=>{
            alert(e.message)
        })
}


export const getAllStatusRelationship = async (publickey) => {
    const url = 'http://localhost:5000/account/'+publickey+'/all'
    return await axios.get(url)
        .then(res=>{
            console.log(res.data.data)
            return res.data.data
        })
        .catch(e=>{
            alert(e.message)
        })
}

export const getInteractComment = async (hash)=>{
    const url ='http://localhost:5000/account/comment/'+hash
    try {
        let res = await axios.get(url);
        return res.data.comment
    } catch (e) {
        return[]
    }
}

export const getEnergy = async (publickey)=>{
    const url ='http://localhost:5000/account/'+publickey+'/energy'
    try {
        let res = await axios.get(url);
        return res.data.energy
    } catch (e) {
        return[]
    }
}

