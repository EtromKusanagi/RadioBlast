import { combineReducers } from 'redux';

import HomePageReducer from './HomePageReducer';
import ProgramacaoPageReducer from './ProgramacaoPageReducer';
import AppConfigReducer from './AppConfigReducer';
import NewsPageReducer from './NewsPageReducer';

export default combineReducers({
    HomePageReducer:        HomePageReducer,
    ProgramacaoPageReducer: ProgramacaoPageReducer,
    AppConfigReducer:       AppConfigReducer,
    NewsPageReducer:        NewsPageReducer
});