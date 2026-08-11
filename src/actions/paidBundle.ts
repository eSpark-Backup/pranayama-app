import axios from 'axios';
import {PAID_BUNDLE_SUCCESS, PAID_BUNDLE_FAIL} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPaidBundle = () => async dispatch => {
  const headers = {
    'x-auth-token': await AsyncStorage.getItem('token'),
  };
  try {
    
    const res = await axios.get(
      `http://ec2-18-218-255-66.us-east-2.compute.amazonaws.com/yoga/api/paid-bundle`,
      {headers: headers},
    );
    dispatch({
      type: PAID_BUNDLE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log('getPaidList', errors);
    if (errors) {
      errors.forEach(error => Alert.alert('Error', error.msg));
    }
    dispatch({
      type: PAID_BUNDLE_FAIL,
    });
  }
};
