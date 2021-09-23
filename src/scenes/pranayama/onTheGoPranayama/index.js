import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import style from '../../../styles/index';
import Heart from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../../utils/fonts';
import Lock from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import styles from './style';
import Modal from 'react-native-modal';
import { strings } from '../../../Locatization';
import Back from 'react-native-vector-icons/MaterialIcons';
import { Button, Overlay } from 'react-native-elements';
import Notification from 'react-native-vector-icons/MaterialIcons';
import { store } from '../../../store';
import { language } from '../../../language/language';
import stripe from 'tipsi-stripe';
import SpinnerLoader from '../../../components/spinnerLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPaidBundle } from '../../../actions/paidBundle';
import { getSongs } from '../../../actions/songs';
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomModal from '../../../common/modal';
const { width, height } = Dimensions.get('window');
stripe.setOptions({
  publishableKey: 'pk_test_51Hok6WKeP6VpaigJ03JJjInxAhdeYVk2msj6faFO7OlnaHeurM8QlSeuWJG3kLfeEcQdxZ545srzFPMYXJqH2sGw00W0AYy0kV',
  merchantId: 'sk_test_51Hok6WKeP6VpaigJ8ykDlI3B0jARFMR2zmyjhrHyCxoEoOzdY9igIU5Xl3oAM6K5zpIJCtC5ovNLxR0VxtO0U6Vc00fM3hqm8u',
  androidPayMode: 'test',
});

export default class OnTheGoPranayama extends Component {
  static navigationOptions = {
    title: strings.stateofMindWanted,
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
      visible: false,
      mockData: [],
      bundleId: '',
      showAlert: false,
      title: '',
      note: '',
      message: '',
      showConfirmButton: false,
      showCancelButtun: false,
      confirmBtnTitle: '',
      cancelBtnTitle: '',
      modalVisible: false
    };
  }
  getBundle = async () => {
    this.setState({ isLoading: true })
    try {
      let header = {
        'Content-Type': 'application/json',
        'x-auth-token': await AsyncStorage.getItem('token')
      }
      const res = await axios.get(
        `http://ec2-18-218-255-66.us-east-2.compute.amazonaws.com/yoga/api/paid-bundle`,
        { headers: header },
      );
      this.setState({ mockData: res.data, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
      const errors = err.response.data.errors;
      console.log('getPaidList', errors);
      if (errors) {
        errors.forEach(error => Alert.alert('Error', error.msg));
        this.setState({ isLoading: false });
      }
    }
  }
  componentDidMount() {
    this.getBundle()
  }

  navigationRelax() {
    let { selectedExercise } = this.state;

    this.relaxModal();
    // setTimeout(() => {
    //   this.props.navigation.navigate('Exercise', selectedExercise);
    // }, 100);
  }

  renderLoader() {
    let { isLoading } = this.state;
    return <SpinnerLoader isLoading={isLoading} />;
  }
  payNow = async (bundleId) => {
    const token = await stripe.paymentRequestWithCardForm({});
    let header = {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token')
    }
    const body = JSON.stringify({
      tokenId: token.tokenId,
      bundleId: bundleId
    });

    this.setState({ isLoading: true })
    axios.post(`http://ec2-18-218-255-66.us-east-2.compute.amazonaws.com/yoga/api/user-pay`, body, { headers: header })
      .then(res => {
        if (res.data.status == 1) {
          this.setState({
            isLoading: false,
            isModalVisible: false,
            title: 'Thanks for your purchase',
            message: res.data.message,
            cancelBtnTitle: 'Not now',
            confirmBtnTitle: 'Play now',
            showConfirmButton: true,
            showCancelButton: true,
            showAlert: true,
          })
          //Alert.alert(res.data.message);
          this.getBundle()
        }
      }).catch(err => {
        this.setState({ isLoading: false, isModalVisible: false })
        console.log(err)
      })
    //console.log(token);
  }
  toggleModal = (bundleId, excerciseTitle, note) => {
    this.setState({ bundleId: bundleId, isModalVisible: !this.state.isModalVisible, title: excerciseTitle, excerciseTitle: excerciseTitle, note });
  };
  relaxModal = () => {
    this.setState({ relaxModal: !this.state.relaxModal });

  };
  modalGetFiery = () => {
    this.setState({ modalGetFiery: !this.state.modalGetFiery });
  };
  antiInflamatoryModal = () => {
    this.setState({ antiInflamatoryModal: !this.state.antiInflamatoryModal });
  };
  stopProcrasModal = () => {
    this.setState({ stopProcrasModal: !this.state.stopProcrasModal });
  };
  bringModal = () => {
    this.setState({ bringModal: !this.state.bringModal });
  };
  btnfunction = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
    switch (this.state.title) {
      case 'Emotional Stability':
        this.props.navigation.navigate('EmotionalStability', { selectedExercise: this.state.title })
        break;
      case 'Feel good and strong in your body':
        this.props.navigation.navigate('FeelStrong', { selectedExercise: this.state.title })
        break;
      case 'Go spiritual touch the infinite upgrade':
        this.props.navigation.navigate('GoSpiritual', { selectedExercise: this.state.title })
        break;
      case 'Get a Razor sharp brain upgrade':
        this.props.navigation.navigate('RazorSharp', { selectedExercise: this.state.title })
        break;
      default :
        break;  

    }
    
  }
  renderModal = () => {
    let { selectedExercise } = this.state;

    return (
      <Modal
        isVisible={this.state.relaxModal}
        style={styles.modalNoteMainContainer}
        animationIn="slideInLeft"
        animationOut="slideOutRight">
        <LinearGradient
          colors={['#363636', '#75c3ff', '#363636']}
          style={styles.modalNoteLinear}>
          <View style={styles.modalNoteHeaderContainer}>
            <View style={styles.modalNoteHeader}>
              <TouchableOpacity
                onPress={() => this.relaxModal()}
                style={styles.headerBackBottonModal}>
                <Back
                  size={width * 0.08}
                  color="white"
                  name="keyboard-backspace"
                />
              </TouchableOpacity>
              <Text style={styles.selectNoteText}>
                {/* ddddd */}
                {store.getState().language.note}
              </Text>
            </View>
          </View>
          <View style={styles.noteModalBodyContainer}>
            <View style={styles.noteModalBodyInner}>
              <Text style={styles.noteText}>
                {selectedExercise?.note}
                {/* {store.getState().language.noteRelax} */}
              </Text>
            </View>
          </View>
          <View style={styles.modalNoteFooterContainer}>
            <View style={styles.modalNoteFooter}>
              <TouchableOpacity
                onPress={() => this.navigationRelax()}
                activeOpacity={0.7}
                style={styles.okNoteBotton}>
                <Text style={styles.okNoteText}>
                  {store.getState().language.next}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  render() {
    const { mockData } = this.state;

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#007AFF', '#75c3ff', '#007AFF']}
          style={{
            flex: 1,
          }}>
          <Image
            source={require('../../../../image/pranyamaBack1.png')}
            style={styles.backgroundImage}
          />
          <View style={styles.headerContainer}>
            <View style={styles.headerInner}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                activeOpacity={0.7}
                style={styles.headerBackBotton}>
                <Back
                  size={width * 0.08}
                  color="white"
                  name="keyboard-backspace"
                />
              </TouchableOpacity>
              <Text style={styles.headerHeading}>
                {store.getState().language.exercise}
              </Text>
            </View>
          </View>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.scrollViewContainer}>


              {/* Go Deeper */}
              <View style={styles.goDeeperContainer}>
                <View style={styles.goDeeperInner}>
                  <Text style={styles.goDeeperheading}>
                    {store.getState().language.goDeeper}
                  </Text>
                </View>
              </View>
              <View>
                {mockData.length != 0 &&
                  mockData.map(v => {

                    return (
                      <TouchableOpacity
                        style={styles.cardContainerPaid}
                        onPress={() => {
                          if (v.paid) {
                            this.setState({ modalVisible: true, title: v.name, note: v.note })
                            //this.props.navigation.navigate('Exercise', { selectedExercise: v.name });
                          }
                          else {
                            this.toggleModal(v._id, v.name, v.note)

                          }
                        }}>
                        <LinearGradient
                          colors={['#363636', '#75c3ff', '#363636']}
                          style={styles.cardInnerPaid}>
                          <Image
                            source={{ uri: v.image }}
                            blurRadius={0.5}
                            style={styles.cardImagePaid}
                          />
                          <View style={styles.cardHeaderContainerPaid}>
                            <View style={styles.cardHeaderInnerLock}>
                              <Text style={styles.mainHeadingPaid}>
                                {v.name}
                              </Text>
                              <Lock
                                name={v.paid ? 'lock-open' : 'lock'}
                                color="white"
                                size={width * 0.05}
                                style={{ position: 'absolute', right: width * .02, top: height * .02, }}
                              />
                            </View>
                          </View>
                          <View style={styles.cardBodyPaid}>
                            <View style={styles.bodyContainerPaid}>
                              <Text style={styles.footerTextPaid}>
                                {
                                  store.getState().language.feelGoodAndStrongInYourBodyUpgrade
                                }
                              </Text>
                            </View>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    )
                  })}
              </View>
            </View>
          </ScrollView>
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title={this.state.title}
            message={this.state.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={this.state.showCancelButton}
            showConfirmButton={this.state.showConfirmButton}
            cancelText={this.state.cancelBtnTitle}
            confirmText={this.state.confirmBtnTitle}
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.setState({ showAlert: false })
            }}
            onConfirmPressed={() => {
              if (this.state.title == 'Thanks for your purchase') {
                this.setState({ showAlert: false, modalVisible: true, title: this.state.excerciseTitle })
                //this.props.navigation.navigate('Exercise', { selectedExercise: this.state.message.split('Thanks for purchasing bundle')[1] });
              }
              this.setState({ showAlert: false })
            }}
          />
          <Modal
            animationIn="bounceIn"
            animationOut="bounceOut"
            isVisible={this.state.isModalVisible}
            onRequestClose={() => {
              this.setState({ isModalVisible: false })
            }}
            style={{
              backgroundColor: 'white',
              maxHeight: height * 0.4,
              maxWidth: width * 1,
              top: height * 0.25,
              borderRadius: width * 0.01,
            }}>
            <LinearGradient
              colors={['#363636', '#75c3ff', '#363636']}
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderRadius: width * 0.01,
              }}>
              <View style={styles.modalHeaderContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.alertText}>
                    {strings.getMorePranayamasFor}
                  </Text>
                </View>
              </View>
              <View style={styles.modalFooterContainer}>
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isModalVisible: !this.state.isModalVisible })

                      this.payNow(this.state.bundleId)
                    }}
                    style={styles.okBotton}>
                    <Text style={styles.okText}>{strings.ok}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </Modal>
        </LinearGradient>
        <CustomModal title={this.state.title} note={this.state.note} btnfunction={this.btnfunction} modalVisible={this.state.modalVisible} setModalVisible={() => this.setState({ modalVisible: !this.state.modalVisible })} />
        {this.renderLoader()}
        {this.renderModal()}
      </View>
    );
  }
}
