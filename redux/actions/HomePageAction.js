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
        payload: parseFloat(volume).toFixed(1)
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
export const getSongs = (songs) => {
    return {
        type: SONG_LIST,
        payload: songs
    }
}
export const setCurrentSong = (currentSong) => {
    return {
        type: CURRENT_SONG,
        payload: currentSong
    }
}
export const setCurrentListeners = (currentListeners) => {
    return {
        type: CURRENT_LISTENERS,
        payload: currentListeners
    }
}
export const getTean = (team) => {
    return {
        type: TEAM,
        payload: team
    }
}

export const setActivePage = (activePage) => {
    return {
        type: ACTIVE_PAGE,
        payload: activePage
    }
}