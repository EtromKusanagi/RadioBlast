import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import FlashMessage from "react-native-flash-message";

import messaging from '@react-native-firebase/messaging';

import Reducer from './redux';
import Rotas from './screens/';

const store = createStore(Reducer, {}, applyMiddleware(ReduxThunk));
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const requestNotificationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Permissão de notificação do aplicativo Blast!',
        message:
          'Blast! precisa de permissão para receber notificações. ' +
          'Você receberá as atualizações conforme sua escolha.',
        buttonNeutral: 'Ver mais tarde',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

class App extends Component {
  saveTokenToDatabase = async (token) => {
    //console.log("TOKEN = ", token)
    AsyncStorage.setItem("TOKEN", token)
    //Salve o token no banco de dados do seu sistema, como salva qualquer outro conteúdo que você utiliza
  }

  componentDidMount(){
    requestNotificationPermission();
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
  render() {
    return (
      <Provider store={createStore(Reducer, {}, applyMiddleware(ReduxThunk))}>
        <Rotas/>
        <FlashMessage position="top" animated duration={2000} />
      </Provider>
    );
  }
}

export default App;
