/** @format */

import {AppRegistry, Platform} from 'react-native';
import App from './cardGroup';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


if(Platform.OS === 'web'){
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('react-root')
  });
}

