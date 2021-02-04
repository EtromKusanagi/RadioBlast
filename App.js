import React, {Component} from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import messaging from '@react-native-firebase/messaging';

import Rotas from './Views/Rotas';
import Reducer from './Reducer';

export default class App extends Component {
  saveTokenToDatabase = async (token) => {
    console.log("TOKEN = ", token)
    //Salve o token no banco de dados do seu sistema, como salva qualquer outro conteúdo que você utiliza
  }
  componentDidMount(){
    messaging()
    .subscribeToTopic('blast')
    .then(() => console.log('Subscribed to topic!'));
      // Pega o token do dispositivo
      messaging()
        .getToken()
        .then(token => {
          return this.saveTokenToDatabase(token);
        });
        
     
      // escuta mudanças no token
      return messaging().onTokenRefresh(token => {
        this.saveTokenToDatabase(token);
      });
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