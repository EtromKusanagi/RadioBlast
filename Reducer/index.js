import { combineReducers } from 'redux';

import HomePageReducer from './HomePageReducer';
import ProgramacaoPageReducer from './ProgramacaoPageReducer';
import AppConfigReducer from './AppConfigReducer'

export default combineReducers({
    HomePageReducer:        HomePageReducer,
    ProgramacaoPageReducer: ProgramacaoPageReducer,
    AppConfigReducer:       AppConfigReducer
});