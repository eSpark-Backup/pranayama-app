import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  Dimensions,
  StyleSheet
} from 'react-native';
import style from '../../../styles/index';
import Icon from 'react-native-vector-icons/AntDesign';
import { strings } from '../../../Locatization';
import TabIcon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import { last_exer } from '../../../actions/userHistory';
import Language from './Language';
import { store } from '../../../store';
import { Fonts } from '../../../utils/fonts';
import { Item } from 'native-base';

let colors = ['white', '#d9f9ff']

class LastExerciseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysToShow: [
        {
          id: 1,
          name: 'Monday',
        },
        {
          id: 2,
          name: 'Tuesday',
        },
        {
          id: 3,
          name: 'Wednesday',
        },
        {
          id: 4,
          name: 'Thursday',
        },
        {
          id: 5,
          name: 'Friday',
        },
        {
          id: 6,
          name: 'Saturday',
        },
        {
          id: 7,
          name: 'Sunday',
        },
      ],
      workToShow: [
        {
          id: 1,
          name: 'Monday',
          mins: '1',
          secs: '4',
        },
        {
          id: 2,
          name: 'Monday',
          mins: '1',
          secs: '4',
        },
        {
          id: 3,
          name: 'Monday',
          mins: '1',
          secs: '4',
        },
        {
          id: 4,
          name: 'Monday',
          mins: '1',
          secs: '4',
        },
        {
          id: 5,
          name: 'Monday',
          mins: '1',
          secs: '4',
        },
        {
          id: 6,
          name: 'Monday',
          mins: '1',
          secs: '4',
        },
        {
          id: 7,
          name: 'Monday',
          mins: '1',
          secs: '4',
        },
        {
          id: 7,
          name: 'Monday',
          mins: '1',
          secs: '4',
        },
        // {
        //   id: 8,
        //   name: 'Sundasdasay',
        // },
        // {
        //   id: 9,
        //   name: 'Sunffeday',
        // },
        // {
        //   id: 10,
        //   name: 'Sundayjk',
        // },
      ]
    }
  }
  // static navigationOptions = {
  //   title: store.getState().language.lastExercice,
  //   tabBarIcon: ({ tintColor }) => (
  //     <TabIcon name="history" color={tintColor} size={height * .03} />
  //   )
  // };
  static navigationOptions = {
    title: store.getState().language.history,
    tabBarIcon: ({ tintColor }) => (
      <TabIcon name="clipboard-list" color={tintColor} size={height * .03} />
    )
  };
  separator = () => <View style={styles.line} />;

  componentDidMount() {
    this.props.last_exer();
    this.setState(Object.assign(this.state.workToShow[0], { name: this.props.history.subExercise.subExerciseName }))
    this.setState(Object.assign(this.state.workToShow[0], { mins: this.props.history.exerciseMinutes }))
    this.setState(Object.assign(this.state.workToShow[0], { secs: this.props.history.exerciseSeconds }))
    // console.log(this.props.history.subExercise.subExerciseName)
    console.log(this.state.workToShow)
    // console.log(this.props.history.exerciseSeconds)
  }
  render() {
    let { subExercise, exerciseMinutes, exerciseSeconds } = '';
    this.props.history
      ? ({ subExercise, exerciseMinutes, exerciseSeconds } = this.props.history)
      : null;
    return (
      <View style={style.Layout.safeArea}>
        <StatusBar hidden={true} />
        <Image
          source={require('../../../../image/last.jpg')}
          style={{ ...style.Layout.backgroundImage, opacity: 0.8 }}
        />
        <View
          style={[
            style.Layout.container,
            {
              padding: 16,
            },
          ]}>
          <View
            style={{
              flex: 1,
              marginBottom: height * .27,
              // backgroundColor: 'transparent',
              // borderRadius: height * .02,
              // borderWidth: height * .003,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <View style={{ backgroundColor: '#97C9EE', borderRadius: height * .003, width: width * .9 }}>
              <Text
                style={{
                  fontSize: 32,
                  fontFamily: Fonts.WorkSansBold,
                  color: '#000',
                  textAlign: 'center',
                }}>
                {strings.history}
              </Text>
              {/* {this.props.history && (
                <View>
                  <Text style={styles.text}>Last Exercise: {subExercise.subExerciseName}</Text>
                  <Text style={styles.text}>Minutes: {exerciseMinutes}</Text>
                  <Text style={styles.text}>Seconds: {exerciseSeconds}</Text>
                </View>
              )} */}
            </View>
            <View style={{
              height: height * .1,
              width: width * .8,
              backgroundColor: '#00000098',
              alignItems: 'center',
              justifyContent: "center",
              borderColor: 'white',
              borderWidth: height * .001,
              borderRadius: height * .003,
              margin: height * .03
            }}>
              <Text style={{ color: 'white', fontSize: 32, fontFamily: Fonts.WorkSansBold }}>Total Hours: 00</Text>
            </View>
            <View
              style={{
                height: height * .6,
                width: width * 1,
                // flex: 1,
                justifyContent: 'space-around',
                // alignItems: 'center',
                // marginBottom: height * .15,
                borderTopWidth: height * .002,
                borderBottomWidth: height * .002,
                borderColor: 'white',
                borderRadius: width * .01,
                backgroundColor: '#00000098',
              }}
            >
              {/* <View style={{ borderBottomWidth: height * .003, borderColor: '#97C9EE', alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: '#00000098', }}> */}
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.daysToShow}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={{
                    justifyContent: "center",
                    marginHorizontal: width * .008,
                    marginVertical: width * .045,
                  }}>
                    <TouchableOpacity style={{ height: height * .085, width: width * .25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000098' }}>
                      <Text style={{ color: 'white', fontFamily: Fonts.WorkSansBold }} >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              {/* </View> */}
              <View style={{ borderTopWidth: height * .003, borderColor: '#97C9EE', }} />
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.workToShow}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={this.separator}
                renderItem={({ item, index }) => (
                  <View style={{
                    padding: width * .04,
                    // borderBottomWidth: height * .001,
                    // borderTopWidth: height * .001,
                    borderColor: 'white',
                    backgroundColor: '#00000098',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <Text style={{ color: 'white', fontFamily: Fonts.WorkSansBold }}>
                      Exercise: {item.name}
                    </Text>
                    <Text style={{ color: 'white', fontFamily: Fonts.WorkSansBold }}>
                      Mins: {item.mins}
                    </Text>
                    <Text style={{ color: 'white', fontFamily: Fonts.WorkSansBold }}>
                      Seconds: {item.secs}
                    </Text>
                  </View>
                )}
              />
              {/* <View style={{ borderTopWidth: height * .003, borderColor: '#97C9EE', }} /> */}
            </View>
          </View>
        </View>
        {/* <Language /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: width * 0.05,
    color: 'white',
    fontFamily: Fonts.WorkSansBold,
    textShadowOffset: {
      width: width * 0.002,
      height: height * 0.002,
    },
    textShadowRadius: width * 0.09,
    textShadowColor: 'black'
  },
  line: {
    height: height * .001,
    width: width * 1,
    backgroundColor: "white",
  },

})
const mapStateToProps = state => ({
  history: state.userHistory.history,
});
export default connect(
  mapStateToProps,
  { last_exer },
)(LastExerciseScreen);
