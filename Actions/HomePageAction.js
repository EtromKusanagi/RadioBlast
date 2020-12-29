import {
    PLAY_PAUSE,
    VOLUME,
    PLAY_LIST,
    DISPLAY_PLAY
} from './types';


export const playPause = (statusPlay) => {
    return {
        type: PLAY_PAUSE,
        payload: statusPlay
    }
}
export const controlVolume = (volume) => {
    return {
        type: VOLUME,
        payload: volume
    }
}
export const playList = (statusPlayList) => {
    return {
        type: PLAY_LIST,
        payload: statusPlayList
    }
}
export const displayPlayer = (statusDisplayPlay) => {
    return {
        type: DISPLAY_PLAY,
        payload: statusDisplayPlay
    }
}