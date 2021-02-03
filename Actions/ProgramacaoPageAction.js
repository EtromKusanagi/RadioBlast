import { 
    PROGRAMACAO_LIST,
    NOTIFICATION_LIST
} from './types';

export const getProgramacaoList = (programacao) => {
    return {
        type: PROGRAMACAO_LIST,
        payload: programacao
    }
}

export const setNotificationList = (notification) => {
    return {
        type: NOTIFICATION_LIST,
        payload: notification
    }
}