import { combineReducers } from 'redux';

import HomePageReducer from './HomePageReducer';
import ProgramacaoPageReducer from './ProgramacaoPageReducer';

export default combineReducers({
    HomePageReducer:        HomePageReducer,
    ProgramacaoPageReducer: ProgramacaoPageReducer,
});