import { 
    PLAY_PAUSE
} from '../Actions/types';

const INITIAL_STATE = {
    statusPlay: false,
    headerColor: [
        '#99CC00',
        '#258BE9',
        '#2BBA4C',
        '#E85531',
        '#EB854B',
        '#739A58',
        '#444444'
    ],
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case PLAY_PAUSE:
            return { ...state, statusPlay: action.payload }
        default:
            return state;
    }
}