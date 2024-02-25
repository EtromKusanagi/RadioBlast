import { 
    PROGRAMACAO_LIST,
    NOTIFICATION_LIST,
    NOTIFICATION_ITEM_LIST
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
export const setItemNotificationList = (obj, value) => {
    return {
        type: NOTIFICATION_ITEM_LIST,
        object: obj,
        payload: value
    }
}