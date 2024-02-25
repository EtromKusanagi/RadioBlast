import { 
    APP_BACKGROUND_IMAGE,
    APP_BACKGROUND_COLOR
} from './types';

export const setBackgroundImage = (backgroundImage) => {
    return {
        type: APP_BACKGROUND_IMAGE,
        payload: backgroundImage
    }
}
export const setBackgroundColor = (backgroundColor) => {
    return {
        type: APP_BACKGROUND_COLOR,
        payload: backgroundColor
    }
}