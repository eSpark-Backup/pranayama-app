import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Signin from '../scenes/signIn/index';
import Signup from '../components/slider/SignUp';
import Selection1 from '../components/slider/From2';
import Selection2 from '../components/slider/From3';
import Paranyama from './app-navigator';
import Exercise from '../scenes/pranayama/exercise';
import WelcomeSplash from '../welcomeSplash/Splash';

import EmotionalStability from '../scenes/pranayama/paidExercise/EmotionalStability'
import RazorSharp from '../scenes/pranayama/paidExercise/RazorSharp';
import FeelStrong from '../scenes/pranayama/paidExercise/FeelStrong';
import GoSpiritual from '../scenes/pranayama/paidExercise/GoSpiritual';
import HomeScreen from '../scenes/home/index';

// import SplashScreen from "../scenes/splash/index";

export const RootStack = createStackNavigator(
  {
    // Signin,
    // Signup,
    Paranyama,
    Selection1,
    Selection2,
    Exercise,
    //PAID EXCERCISE
    EmotionalStability,
    RazorSharp:RazorSharp,
    FeelStrong:FeelStrong,
    GoSpiritual:GoSpiritual,
    WelcomeSplash,
    // GetFiery,
    // AntiInfla,
    // StopProcast,
    // BringAwaer,
    //Elevate,
    //BuildResource,
    HomeScreen,
    // SplashScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      header: null,
      headerForceInset: {top: 'never', bottom: 'never'},
    },
  },
);
// const Drawer = createDrawerNavigator(
//   {
//     Map
//   },
//   {
//     headerModer: 'none',

//   },
// );
// export default createAppContainer(AppNavigator);
