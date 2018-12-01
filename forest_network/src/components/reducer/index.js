import {UPDATEPROFILE} from '../action'

const initialState={
    profile:{name:'To Uyen', account:'@banhcom', tweets:20, following:100, follower:20, background:'http://via.placeholder.com/300x700', avatar:'http://via.placeholder.com/70x70'},
    following:[{avatar:'http://via.placeholder.com/50x50', name: 'AAAA', account: '@aaaaaaa'}, {avatar:'http://via.placeholder.com/50x50', name: 'BBBB', account: '@bbbbbbb'}],
    follower:[{avatar:'http://via.placeholder.com/50x50', name: 'CCCCC', account: '@cccccc'}, {avatar:'http://via.placeholder.com/50x50', name: 'DDDD', account: '@dddd'}, {avatar:'http://via.placeholder.com/50x50', name: 'EEEEE', account: '@eeee'}],
    tweets:[
        {avatar:'http://via.placeholder.com/50x50', name: 'CCCCC', account: '@cccccc', comment:2, react:10, share:10,
            content:'hello hello hello hello hello hello hello hellohello'},
        {avatar:'http://via.placeholder.com/50x50', name: 'EEEE', account: '@eeeee', comment:5, react:4, share:6, content:'hello hello hello hello hello hello hello hellohello'},
        {avatar:'http://via.placeholder.com/50x50', name: 'CCCCC', account: '@cccccc', comment:2, react:2, share:5, content:'hello hello hello hello hello hello hello hellohello'},
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

