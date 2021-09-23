import React, { Component, useState } from "react";
import { View, Text, StatusBar, FlatList, TouchableOpacity, Dimensions } from "react-native";
import style, { colors } from "../../styles/index";
import { Header } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import { Fonts } from '../../utils/fonts';
import { strings } from '../../Locatization';
import TabIcon from 'react-native-vector-icons/FontAwesome5';
import { store } from "../../store";
import Axios from "axios";
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpinnerLoader from "../../components/spinnerLoader";
import { ScrollView } from "react-native-gesture-handler";



const { width, height } = Dimensions.get('window');

const ListItem = ({ item }) => {
    const [state, setState] = useState(false);
    const todayCheck = moment(moment(item.creationDate).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD'), 'day'); 
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#89CCFE',
                padding: 16,
                paddingHorizontal: 24,
                marginVertical: 8,
                borderRadius: 32,
                height: state ? 400 : 50,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
            activeOpacity={0.7}
            onPress={() => setState(!state)}
        >
            <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>    
            <Text
                style={{
                    color: '#fff',
                    fontFamily: Fonts.Handlee,
                    fontWeight:'bold',
                }}
            >
                {todayCheck?item.title:moment(item.creationDate).format('DD/MM/YYYY')}
            </Text>
            <Icon name={state ? "downcircle" : "rightcircle"} color="#fff" size={16} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{
                    fontSize: 18,
                    paddingTop:10,
                    color:colors.lightGray,
                    fontFamily: Fonts.Handlee,
                }} >{item.body}</Text>
            </ScrollView>
         </View>   
        </TouchableOpacity>
    );
}



class TodaysQouteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            notificationData: []
        }
    }
    getNotifications = async () => {
        this.setState({ isLoading: true })
        try {
            let header = {
                'Content-Type': 'application/json',
                'x-auth-token': await AsyncStorage.getItem('token')
            }
            const res = await Axios.get(
                `http://ec2-18-218-255-66.us-east-2.compute.amazonaws.com/yoga/api/notification/all`,
                { headers: header },
            );
            this.setState({ notificationData: res.data.data, isLoading: false }, () => console.log('list', res.data.data));
        } catch (err) {
            this.setState({ isLoading: false });
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => Alert.alert('Error', error.msg));
                this.setState({ isLoading: false });
            }
        }
    }
    componentDidMount() {
        this.getNotifications()
    }
    static navigationOptions = {
        title: store.getState().language.todaysqoute,
        tabBarIcon: ({ tintColor }) => (
            <TabIcon name="podcast" color={tintColor} size={height * .03} />
        )
    };
    renderLoader() {
        let { isLoading } = this.state;
        return <SpinnerLoader isLoading={isLoading} />;
    }
    render() {

        return (
            <View style={style.Layout.safeArea}>
                <StatusBar
                    translucent={false}
                    backgroundColor={'rgba(0, 0, 0, 0.0)'}
                    barStyle={'dark-content'}
                />

                <View style={[style.Layout.container, {
                    padding: width * .05,
                    marginBottom: height * 0.08
                }]}>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.notificationData}
                        renderItem={({ item }) => {
                            return <ListItem item={item} />
                        }}
                        keyExtractor={item => item._id.toString()}
                        scrollEnabled={true}
                    />
                </View>
                {this.renderLoader()}
            </View>
        );
    }
}
export default TodaysQouteScreen