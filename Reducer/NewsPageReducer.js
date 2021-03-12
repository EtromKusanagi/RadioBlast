import { 
    NEWS_ACTIVE,
    NEWS_VISIBLE,
} from '../Actions/types';

const INITIAL_STATE = {
    newsPage:  null,
    newsVisible: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case NEWS_ACTIVE:
            return { ...state, newsPage: action.payload }
        case NEWS_VISIBLE:
            return { ...state, newsVisible: action.payload }
        default:
            return state;
    }
}