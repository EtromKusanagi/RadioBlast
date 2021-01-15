import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Rotas from './Views/Rotas';
import Reducer from './Reducer';

export default class App extends Component {
  render(){
    return (
      <Provider store={createStore(Reducer, {}, applyMiddleware(ReduxThunk))}>
        <Rotas/>
      </Provider>
    );
  }
};

AppRegistry.registerComponent(App, () => App);