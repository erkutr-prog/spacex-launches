import {Navigation} from 'react-native-navigation';
import Main from './src/screens/Main.js';
import LaunchDetails from './src/screens/LaunchDetails.js';

Navigation.registerComponent('MainScreen', () => Main);
Navigation.registerComponent('DetailScreen', () => LaunchDetails);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'MainScreen',
            },
          },
        ],
      },
    },
  });
});
