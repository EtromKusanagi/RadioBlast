import { 
    APP_BACKGROUND,
} from '../Actions/types';

const INITIAL_STATE = {
    background:  null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case APP_BACKGROUND:
            return { ...state, background: action.payload }
        default:
            return state;
    }
}