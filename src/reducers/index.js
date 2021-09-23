import {combineReducers} from 'redux';

import auth from './auth';
import userHistory from './userHistory';
import subExercise from './subExercise';
import language from './language';
import exercise from './exercise';
import paidBundle from './paidBundle';
import songs from './songs';

export default combineReducers({
  auth,
  userHistory,
  paidBundle,
  subExercise,
  language,
  exercise,
  songs,
});
