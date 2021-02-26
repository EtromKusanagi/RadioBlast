import { 
    APP_BACKGROUND_IMAGE,
    APP_BACKGROUND_COLOR,
} from '../Actions/types';

const INITIAL_STATE = {
    backgroundImage:  null,
    backgroundColor:  '#000'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case APP_BACKGROUND_IMAGE:
            return { ...state, backgroundImage: action.payload }
        case APP_BACKGROUND_COLOR:
            return { ...state, backgroundColor: action.payload }
        default:
            return state;
    }
}