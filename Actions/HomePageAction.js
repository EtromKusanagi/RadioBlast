import {
    PLAY_PAUSE
} from './types';


export const playPause = (statusPlay) => {
    return {
        type: PLAY_PAUSE,
        payload: statusPlay
    }
}