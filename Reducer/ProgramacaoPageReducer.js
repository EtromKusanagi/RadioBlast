import { 
    PROGRAMACAO_LIST
} from '../Actions/types';

const INITIAL_STATE = {
    programacao:  []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case PROGRAMACAO_LIST:
            return { ...state, programacao: action.payload }
        default:
            return state;
    }
}