import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image,
    BackHandler,
    Alert,
    ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Back from 'react-native-vector-icons/MaterialIcons';
import SpinnerLoader from '../../../../components/spinnerLoader';
import { store } from '../../../../store';
import style from './style';
import exercisStyle from './exerciseStyle';
import { Fonts } from '../../../../utils/fonts';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import Tts from 'react-native-tts';
import { user_last_exer } from '../../../../actions/userHistory';
import { sub_exer } from '../../../../actions/subExercise';
import { stat } from 'react-native-fs';
import Animated from 'react-native-reanimated';
var voiceId = 'EN-US-X-IOM-LOCAL'
Tts.setDefaultRate(0.46, true);
Tts.setDucking(true);
Tts.setDefaultPitch(1.86);
Tts.setDefaultVoice(voiceId.toLowerCase());
const pickerStyle = {
    inputIOS: {
        color: 'white',
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
    },
    inputAndroid: {
        color: 'white',
        fontSize: width * 0.04,
    },
};
// var RNFS = require('react-native-fs');
const Sound = require('react-native-sound');
var song = new Sound('076968423-dark-om.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
        console.warn(error)
    }
});
const exerciseText_Relaxdeeper = ['Inhale left for 4 second', 'Exahle right for 8 second', 'Now hold for 8 second', 'Inhale right for 4 second', 'Exahle left for 8 second', 'Now hold for 8 second'];
const exerciseText_Elevate = ['Inhale left nostril for 8 second', 'Exahle right nostril for 8 second', 'Inhale right nostril for 8 second', 'Exahle left nostril for 8 second'];

function EmotionalStability(props) {
    const [bgLoading, setBgLoading] = useState(false);
    const [excerciseComplete, setexcerciseComplete] = useState(false);
    const [firstExcerciseComplete, setFirstExeciseComplete] = useState(false);
    const [secondExcerciseComplete, setSecondExeciseComplete] = useState(false);
    const [pause, setPause] = useState(false);
    const [voiceStop, setvoiceStop] = useState(false);
    const [bgPath, setBgPath] = useState('');
    const [songPath, setSongPath] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [songInfo, setsongInfo] = useState([]);
    const [songs, setSongs] = useState([]);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [exerCiseStart, setExerciseStart] = useState(false);
    const [index, setIndex] = useState(0);
    const [filterSongs, setFilterSongs] = useState([]);

    const onBackButtonPressAndroid = () => {
        Alert.alert(
            store.getState().language.holdOn,
            store.getState().language.firstYouCompleteYourExercise,
            [
                {
                    text: store.getState().language.ok,
                    //onPress: () => null,
                },
            ],
        );
        return true;
    };
    useEffect(() => {
        // console.log('state',props.navigation.state.params)
        Tts.addEventListener('tts-start', (event) => {
            setvoiceStop(false)
        });
        Tts.addEventListener('tts-finish', (event) => {
            setvoiceStop(true)
            setIndex(index + 1)
        });
        Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
        pause == true
            ? BackHandler.addEventListener(
                'hardwareBackPress',
                onBackButtonPressAndroid,
            )
            : BackHandler.removeEventListener(
                'hardwareBackPress',
                onBackButtonPressAndroid,
            );
        getSongs();
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                onBackButtonPressAndroid,
            );
        }
    }, [])

    const toggleModal = () => {
        if (songPath == '') {
            Alert.alert('Error', 'Please Select Exercise Song');
        }
        if (selectedMinutes == 0) {
            Alert.alert('Error', 'Please Select Exercise Minutes');
        } else if (selectedMinutes < 3 || selectedMinutes > 10) {
            Alert.alert('Error', 'Minutes must be in 3, 5, 7, 11');
        } else {
            setIsModalVisible(!isModalVisible);

            //   this.setState({ isModalVisible: !this.state.isModalVisible, StartExcercise: true }, () => {
            //     this.props.bgSong(this.state.values);
            //     this.props.second(this.state.selectedSeconds);
            //     this.props.exerciseData(this.state.songInfo);
            //   });
        }
    };
    // rn Picker Value Selection Funtion
    const valueChange = (value, index) => {

        let selected_song = songs[index - 1].song;
        let selected_image = songs[index - 1].image;
        let songInfo = songs[index - 1];
        setSongPath(selected_song);
        setsongInfo(songInfo);
        setBgPath(selected_image)
        setBgLoading(true)
        song = new Sound(
            `${selected_song}`,
            Sound.MAIN_BUNDLE,
            error => {
                if (!error) {
                    setBgLoading(false)
                }
            },
        );
    }
    const valueMinutesChange = (selectedMinutes) => {
        setSelectedMinutes(selectedMinutes);
        console.log('Rounds', Math.ceil(selectedMinutes * 60 / 40))
    }
    //
    useEffect(() => {
        // setInterval(() => {

        // },(selectedMinutes * 60000)+1000)
        //playRelaxDeeper();
    }, [])
    const playRelaxDeeper = () => {
         Tts.speak(exerciseText_Relaxdeeper[0], {
            androidParams: {
                KEY_PARAM_PAN: 0,
                KEY_PARAM_VOLUME: 1,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
        });
        this.one = setTimeout(() => {
            setIndex(1)
            Tts.speak(exerciseText_Relaxdeeper[1], {
                androidParams: {
                    KEY_PARAM_PAN: 0,
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 4000)
        this.two = setTimeout(() => {
            setIndex(2)
            Tts.speak(exerciseText_Relaxdeeper[2], {
                androidParams: {
                    KEY_PARAM_PAN: 0,
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 4000+8000)
        this.three = setTimeout(() => {
            setIndex(3)
            Tts.speak(exerciseText_Relaxdeeper[3], {
                androidParams: {
                    KEY_PARAM_PAN: 0,
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 4000+8000+8000)
        this.four = setTimeout(() => {
            setIndex(4)
            Tts.speak(exerciseText_Relaxdeeper[4], {
                androidParams: {
                    KEY_PARAM_PAN: 0,
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 4000+8000+8000+4000)
        this.five = setTimeout(() => {
            setIndex(5)
            Tts.speak(exerciseText_Relaxdeeper[5], {
                androidParams: {
                    KEY_PARAM_PAN: 0,
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 4000+8000+8000+4000+8000)
        this.five = setTimeout(() => {
            setIndex(0)
            playRelaxDeeper();
        }, 4000+8000+8000+4000+8000+8000)
    }
    const handlePlayPause = () => {
        console.log('dasdsaf')
        setPause(!pause);
        if (pause == true) {
            song.stop(() => { });
        }
        else {
            song.play(success => {
                if (!success) {
                }
            })
            
            playRelaxDeeper();

        }
    }
    const onPressFunc = () => {
        Alert.alert(
            store.getState().language.holdOn,
            store.getState().language.firstYouCompleteYourExercise,
            [
                {
                    text: store.getState().language.ok,
                    //onPress: () => null,
                },
            ],
        );
    };
    const getSongs = async () => {
        setSongs(store.getState().songs.songs)
        let filter_song =
            store.getState().songs.songs.length &&
            store.getState().songs.songs.map(v => {
                return { label: v.name, value: v._id };
            });
        setFilterSongs(filter_song)
        setIsModalVisible(!isModalVisible);
        await Tts.setDefaultVoice(voiceId.toLowerCase())
    }

    return (
        <View style={style.mainContainer}>
            <StatusBar hidden={true} />
            <TouchableOpacity
                //onPress={pause && !excerciseComplete ? null : handlePlayPause()}
                activeOpacity={1}
                style={style.mainLenear}
            >
                <SpinnerLoader isLoading={bgLoading} />
                <Image
                    source={{
                        uri: bgPath != '' && bgPath
                    }}
                    style={style.backgroundImage}
                />
                <View style={style.headerContainer}>
                    <View style={style.headerInner}>
                        {pause == false ? (
                            <TouchableOpacity
                                onPress={onPressFunc}
                                style={style.headerBackBotton}>
                                <Back
                                    size={width * 0.08}
                                    color="black"
                                    name="keyboard-backspace"
                                />
                            </TouchableOpacity>
                        ) : null}
                        <Text style={style.headerHeading}>
                            {store.getState().language.exerciseBegins}
                        </Text>
                    </View>
                </View>
                <View style={style.bodyContainer}>
                    <View style={style.bodyInner}>
                        <View style={exercisStyle.mainContainer}>
                            <View style={exercisStyle.mainInner}>
                                <View>
                                    {pause == false ?
                                        <TouchableOpacity
                                            onPress={() => {
                                                handlePlayPause()
                                            }}
                                            activeOpacity={0.9}
                                            style={exercisStyle.playBotton}>
                                            <Image
                                                source={require('../../../../../image/playbottongray.png')}
                                                style={{
                                                    width: height * 0.12,
                                                    height: height * 0.12,
                                                }}
                                            />
                                        </TouchableOpacity> :

                                        <>
                                            <View style={exercisStyle.MainContainer}>
                                                <View style={[exercisStyle.animatedBox]} >
                                                    {<Text style={exercisStyle.remainHeading}>{exerciseText_Relaxdeeper[index]}</Text>}
                                                </View>
                                            </View>
                                        </>
                                    }

                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <Modal
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                isVisible={isModalVisible}
                style={exercisStyle.modalMainContainer}>
                <LinearGradient
                    colors={['#363636', '#75c3ff', '#363636']}
                    style={exercisStyle.modalLinear}>
                    <View style={exercisStyle.modalHeaderContainer}>
                        <View style={exercisStyle.modalHeader}>
                            <Text style={style.selectExerText}>
                                {store.getState().language.selectExerciseSong}
                            </Text>

                            <RNPickerSelect
                                placeholder={{
                                    label: store.getState().language.selectSong,
                                    value: 'anambientday.mp3',
                                }}
                                onValueChange={(value, index) => valueChange(value, index)}
                                enabled={!pause}
                                style={{
                                    inputAndroid: {
                                        fontSize: width * 0.04,
                                        fontFamily: Fonts.WorkSansBold,
                                        width: width * 0.7,
                                        height: height * 0.07,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#000000ab',
                                        borderRadius: width * 0.005,
                                        elevation: width * 0.01,
                                        borderWidth: 1,
                                        borderColor: 'white',
                                    },
                                }}
                                items={
                                    filterSongs.length
                                        ? filterSongs
                                        : [{ label: 'Please Select', value: '' }]
                                }
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    </View>
                    <View style={exercisStyle.modalBodyContainer}>
                        <View style={exercisStyle.modalBodyInner}>
                            <Text style={style.timeInMinHeading}>
                                {store.getState().language.emotionalTiming}
                            </Text>
                            <View style={exercisStyle.minInputView}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: store.getState().language.minutes,
                                        value: 0,
                                    }}
                                    onValueChange={selectedMinutes =>
                                        valueMinutesChange(selectedMinutes)
                                    }
                                    // enabled={!this.state.pause}
                                    style={{
                                        inputAndroid: {
                                            fontSize: width * 0.04,
                                            fontFamily: Fonts.WorkSansBold,
                                            width: width * 0.4,
                                            height: height * 0.07,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            color: 'white',
                                            backgroundColor: '#000000ab',
                                            borderRadius: width * 0.005,
                                            elevation: width * 0.01,
                                            borderWidth: 1,
                                            borderColor: 'black',
                                        },
                                    }}
                                    items={[
                                        { label: '3', value: 3 },
                                        { label: '5', value: 5 },
                                        { label: '7', value: 7 },
                                        { label: '11', value: 11 },
                                    ]}
                                    useNativeAndroidPickerStyle={false}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={exercisStyle.modalFooterContainer}>
                        <View style={exercisStyle.modalFooter}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsModalVisible(!isModalVisible)
                                    props.navigation.goBack();
                                }
                                }
                                style={exercisStyle.okBotton}>
                                <Text style={exercisStyle.okText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={toggleModal}
                                style={exercisStyle.okBotton}>
                                <Text style={exercisStyle.okText}>
                                    {store.getState().language.ok}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
        </View>
    )
}
const { width, height } = Dimensions.get('window');
export default EmotionalStability;