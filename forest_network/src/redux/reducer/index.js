import {UPDATEPROFILE, AUTHENTICATE, GETMYNAME, SAVEFOLLOWING} from '../action/index'

const initialState={
    profile:{name:'', account:'@banhcom', tweets:20, following:100, follower:20, background:'https://pbs.twimg.com/profile_banners/824815001152135169/1533970929/1500x500', avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg'},
    //following:[{avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'AAAA', account: '@aaaaaaa'}, {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'BBBB', account: '@bbbbbbb'}],
    follower:[{avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'CCCCC', account: '@cccccc'}, {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'DDDD', account: '@dddd'}, {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'EEEEE', account: '@eeee'}],
    tweets:[
        {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'Tố Uyên', account: '@banhcom', comment:2, react:10, share:10, content:'hello hello hello hello hello hello hello hellohello', time:'3m'},
        {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'Tố Uyên', account: '@banhcom', comment:5, react:4, share:6, content:'hello hello hello hello hello hello hello hellohello', time:'1hour'},
        {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'Tố Uyên', account: '@banhcom', comment:2, react:2, share:5, content:'hello hello hello hello hello hello hello hellohello', time:'03/12/2018'},
    ],
    comment:[
        {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'Văn Tú', account: '@vantu', comment:1, react:2, share:1, content:'comment1', time:'3m'},
        {avatar:'http://mcm-bt0hsn6c.stackpathdns.com/wp-content/uploads/2016/02/hybrid-rose-pink.jpg', name: 'Hoa Hồng', account: '@nhuquynhsayhi', comment:1, react:0, share:1, content:'comment2', time:'8:17 03/12/2018'},
    ],
    authenticate: {
        publickey: null,
        secretkey: null,
        isAuthenticated: false
    },
    datafollowing:[]
}
const appReducer = (prevState = initialState, action) => {
    switch(action.type)
    {
        // case UPDATEPROFILE:
        //     let newprofile = {...prevState.profile};   //creating copy of object
        //     newprofile.name = action.data;                        //updating value
        //     return{
        //         ...prevState, profile:newprofile
        //     }
        case SAVEFOLLOWING:
            return {
                ...prevState, datafollowing: action.data
            }
        case GETMYNAME:
            let newprofile = {...prevState.profile};   //creating copy of object
            newprofile.name = action.data;                        //updating value
            return{
                ...prevState, profile:newprofile
            }

        case AUTHENTICATE:
            console.log(action)
            return {
                ...prevState,
                authenticate: {
                    ...action.data,
                    isAuthenticated: true
                }
            }
        default:
            return prevState;
    }
}
export default appReducer;

