import { Navigation } from "react-native-navigation";
import Main from "./src/screens/Main.js";

Navigation.registerComponent('MainScreen', () => Main);
Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'MainScreen'
             }
           }
         ]
       }
     }
  });
});