import { 
    PLAY_PAUSE,
    VOLUME,
    PLAY_LIST,
    DISPLAY_PLAY,
    SONG_LIST,
    CURRENT_SONG,
    CURRENT_LISTENERS,
    TEAM,
    ACTIVE_PAGE
} from '../Actions/types';

const INITIAL_STATE = {
    playlist: "https://centova4.transmissaodigital.com:20143/principal;",
    statusPlay: true,
    volume: 0.8,
    statusPlayList: false,
    statusDisplayPlay: true,
    songs: [],
    currentSong: "",
    currentListeners: 0,
    team: {},
    activePage: "home",
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
        case CURRENT_SONG:
            return { ...state, currentSong: action.payload }
        case CURRENT_LISTENERS:
            return { ...state, currentListeners: action.payload }
        case TEAM:
            return { ...state, team: action.payload }
        case ACTIVE_PAGE:
            return { ...state, activePage: action.payload }
        default:
            return state;
    }
}