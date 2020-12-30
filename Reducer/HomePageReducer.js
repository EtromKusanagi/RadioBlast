import { 
    PLAY_PAUSE,
    VOLUME,
    PLAY_LIST,
    DISPLAY_PLAY,
    SONG_LIST
} from '../Actions/types';

const INITIAL_STATE = {
    statusPlay: true,
    volume: 0.2,
    statusPlayList: false,
    statusDisplayPlay: true,
    songs: [],
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
        case VOLUME:
            return { ...state, volume: action.payload }
        case PLAY_LIST:
            return { ...state, statusPlayList: action.payload }
        case DISPLAY_PLAY:
            return { ...state, statusDisplayPlay: action.payload }
        case SONG_LIST:
            return { ...state, songs: action.payload }
        default:
            return state;
    }
}