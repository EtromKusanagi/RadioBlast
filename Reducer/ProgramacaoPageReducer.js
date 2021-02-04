import { 
    PROGRAMACAO_LIST,
    NOTIFICATION_LIST,
    NOTIFICATION_ITEM_LIST
} from '../Actions/types';

const INITIAL_STATE = {
    programacao:  [],
    notification: {}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case PROGRAMACAO_LIST:
            return { ...state, programacao: action.payload }
        case NOTIFICATION_LIST:
            return { ...state, notification: action.payload }
        case NOTIFICATION_ITEM_LIST:
            return { 
                ...state, 
                notification: {
                    ...state.notification,
                    [action.object]: action.payload
                }
            }
        default:
            return state;
    }
}