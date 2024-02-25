import { combineReducers } from 'redux';

import HomePageReducer from './reducer/HomePageReducer';
import ProgramacaoPageReducer from './reducer/ProgramacaoPageReducer';
import AppConfigReducer from './reducer/AppConfigReducer';
import NewsPageReducer from './reducer/NewsPageReducer';

export default combineReducers({
    HomePageReducer:        HomePageReducer,
    ProgramacaoPageReducer: ProgramacaoPageReducer,
    AppConfigReducer:       AppConfigReducer,
    NewsPageReducer:        NewsPageReducer
});