import { 
    PROGRAMACAO_LIST
} from './types';

export const getProgramacaoList = (programacao) => {
    return {
        type: PROGRAMACAO_LIST,
        payload: programacao
    }
}