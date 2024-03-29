import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import FlashMessage from "react-native-flash-message";

import Rotas from './Views/Rotas';
import Reducer from './Reducer';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export default class App extends Component {
  saveTokenToDatabase = async (token) => {
    //console.log("TOKEN = ", token)
    AsyncStorage.setItem("TOKEN", token)
    //Salve o token no banco de dados do seu sistema, como salva qualquer outro conteúdo que você utiliza
  }
  
  componentDidMount(){
    crashlytics().log('Iniciando get Notification Geral.');
    messaging()
    .subscribeToTopic('blast')
    .then(() => console.log('Subscribed to topic!'));
      // Pega o token do dispositivo
      messaging()
        .getToken()
        .then(token => {
          return this.saveTokenToDatabase(token);
        })
        .catch(error => {
          crashlytics().recordError(error);
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
        <FlashMessage position="top" animated duration={2000} />
      </Provider>
    );
  }
};

AppRegistry.registerComponent(App, () => App);