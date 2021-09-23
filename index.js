/**
 * @format
 */
import React, { useState } from 'react';
import { Alert, AppRegistry, Text, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import App from './src';
import styles, { colors } from './src/styles';
import messaging from '@react-native-firebase/messaging';
// import App from './test';

// import App from './src/components/countDown/paidExercise/elevate';
import { name as appName } from './app.json';
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    //Alert.alert(remoteMessage.data.full_body)
    setIsVisible(!notificalModal);
    setNotificationBody(remoteMessage.data.full_body);
});
messaging()
    .subscribeToTopic('Pranayama')
    .then(() => console.log('Subscribed to topic!'));
function HeadlessCheck({ isHeadless }) {
    const [notificalModal, setIsVisible] = useState(false);
    const [notificationBody, setNotificationBody] = useState('');
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }
    return (
        <React.Fragment>
            <App />
            <Modal
                testID={'modal'}
                isVisible={notificalModal}
                backdropColor={colors.activeSwitch}
                backdropOpacity={0.3}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                onBackButtonPress={() => setIsVisible(!notificalModal)}
                onBackdropPress={() => setIsVisible(!notificalModal)}
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
        </React.Fragment>);
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
