import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Player from './Component/Player';

import Rotas from './Views/Rotas';
import Reducer from './Reducer';

export default class App extends Component {
  render(){
    return (
      <Provider store={createStore(Reducer, {}, applyMiddleware(ReduxThunk))}>
        <Player/>
        <Rotas/>
      </Provider>
    );
  }
};

AppRegistry.registerComponent(App, () => App);