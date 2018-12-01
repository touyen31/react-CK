import {UPDATEPROFILE} from '../action'

const initialState={
    profile:{},
}
const appReducer = (prevState = initialState, action) => {
    switch(action.type)
    {
        case UPDATEPROFILE:
            return{
                ...prevState, user:action.data
            }
    }
}
export default appReducer;

