export const UPDATEPROFILE = 'UPDATEPROFILE'

export const updateprofile = (profile)=>{
    return {
        type:UPDATEPROFILE,
        data:profile
    }
}