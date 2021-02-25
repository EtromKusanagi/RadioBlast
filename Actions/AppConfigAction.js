import { 
    APP_BACKGROUND,
} from './types';

export const setBackground = (background) => {
    return {
        type: APP_BACKGROUND,
        payload: background
    }
}