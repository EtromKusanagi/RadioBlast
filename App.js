import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import TrackPlayer from 'react-native-track-player';

import Rotas from './Views/Rotas';
import Reducer from './Reducer';

export default class App extends Component {
  componentDidMount(){
      // Creates the player
      TrackPlayer.setupPlayer().then(async () => {
          // Adds a track to the queue
          await TrackPlayer.add({
              id: 'track',
              url: 'http://192.99.150.31:8315/principal;'
          });
      });
  }
  componentWillUnmount(){
    TrackPlayer.destroy();
  }
  render(){
    return (
      <Provider store={createStore(Reducer, {}, applyMiddleware(ReduxThunk))}>
        <Rotas/>
      </Provider>
    );
  }
};

AppRegistry.registerComponent(App, () => App);