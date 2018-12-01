import {UPDATEPROFILE} from '../action'

const initialState={
    profile:{name:'To Uyen', account:'@banhcom', tweets:20, following:100, follower:20, background:'http://lorempixel.com/300/70', avatar:'http://lorempixel.com/70/70'},
    following:[{avatar:'http://lorempixel.com/70/70', name: 'AAAA', account: '@aaaaaaa'}, {avatar:'http://lorempixel.com/70/70', name: 'BBBB', account: '@bbbbbbb'}],
    follower:[{avatar:'http://lorempixel.com/70/70', name: 'CCCCC', account: '@cccccc'}, {avatar:'http://lorempixel.com/70/70', name: 'DDDD', account: '@dddd'}],

}
const appReducer = (prevState = initialState, action) => {
    switch(action.type)
    {
        case UPDATEPROFILE:
            return{
                ...prevState, profile:action.data
            }
        default:
            return prevState;
    }
}
export default appReducer;

