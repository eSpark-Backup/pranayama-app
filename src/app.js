import React, {useState,useEffect } from 'react';

// FILES
import Router from './navigations';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { fcmService } from '../FCMService';
import { localNotificationService } from '../LocalNotification';
import Modal from 'react-native-modal';
import {Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { ScrollView } from 'react-native-gesture-handler';
import styles, { colors } from './styles';
function App() {
  const [notificalModal,setIsVisible] = useState(false);
  const [notificationBody,setNotificationBody] = useState('');
  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)
    function onRegister(token) {
      console.log("[App] onRegister: ", token)
    }
    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true //,
        // largeIcon: ‘ic_launcher’, // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: ‘ic_launcher’ // add icon small for Android (Link: app/src/main/mipmap)
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }
    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
       //alert("Open Notification: " + notify.full_body)
       setIsVisible(!notificalModal);
       setNotificationBody(notify.full_body);
    }
    messaging()
      .subscribeToTopic('Pranayama')
      .then(() => console.log('Subscribed to topic!'));
    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
      <Modal
        testID={'modal'}
        isVisible={notificalModal}
        backdropColor={colors.activeSwitch}
        backdropOpacity={0.3}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        onBackButtonPress={()=>setIsVisible(!notificalModal)}
        onBackdropPress={()=>setIsVisible(!notificalModal)}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        style={styles.Modal.root}
        >
        <ScrollView showsVerticalScrollIndicator={false} style={styles.Modal.container}>  
        <Text style={styles.Modal.headingStyle}>{`Today's Qoute`}</Text>
        <Text style={styles.Modal.textStyle}>{notificationBody}</Text>
        </ScrollView>
      </Modal>
    </Provider>
  );
}


export default App;
