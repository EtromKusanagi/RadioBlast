import { 
    NEWS_ACTIVE,
    NEWS_VISIBLE
} from './types';

export const setNews = (newsPage) => {
    return {
        type: NEWS_ACTIVE,
        payload: newsPage
    }
}

export const setNewsVisible = (newsVisible) => {
    return {
        type: NEWS_VISIBLE,
        payload: newsVisible
    }
}