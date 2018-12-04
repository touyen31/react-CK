import {UPDATEPROFILE} from '../action'

const initialState={
    profile:{name:'Tố Uyên', account:'@banhcom', tweets:20, following:100, follower:20, background:'https://pbs.twimg.com/profile_banners/824815001152135169/1533970929/1500x500', avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg'},
    following:[{avatar:'http://via.placeholder.com/50x50', name: 'AAAA', account: '@aaaaaaa'}, {avatar:'http://via.placeholder.com/50x50', name: 'BBBB', account: '@bbbbbbb'}],
    follower:[{avatar:'http://via.placeholder.com/50x50', name: 'CCCCC', account: '@cccccc'}, {avatar:'http://via.placeholder.com/50x50', name: 'DDDD', account: '@dddd'}, {avatar:'http://via.placeholder.com/50x50', name: 'EEEEE', account: '@eeee'}],
    tweets:[
        {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'Tố Uyên', account: '@banhcom', comment:2, react:10, share:10, content:'hello hello hello hello hello hello hello hellohello', time:'3m'},
        {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'Tố Uyên', account: '@banhcom', comment:5, react:4, share:6, content:'hello hello hello hello hello hello hello hellohello', time:'1hour'},
        {avatar:'https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg', name: 'Tố Uyên', account: '@banhcom', comment:2, react:2, share:5, content:'hello hello hello hello hello hello hello hellohello', time:'03/12/2018'},
    ]
}
const appReducer = (prevState = initialState, action) => {
    console.log(action.data)
    switch(action.type)
    {
        case UPDATEPROFILE:
            let newprofile = {...prevState.profile};   //creating copy of object
            newprofile.name = action.data;                        //updating value
            return{
                ...prevState, profile:newprofile
            }
        default:
            return prevState;
    }
}
export default appReducer;

