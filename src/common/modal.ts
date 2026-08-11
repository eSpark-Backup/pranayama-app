import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { colors } from "../styles";
import { Fonts } from "../utils/fonts";
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from "react-native-gesture-handler";
const CustomModal = (props) => {
    return (
        <Modal
            animationIn="bounceIn"
            animationOut="bounceOut"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible()
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }} style={{ alignSelf: 'flex-end' }} onPress={props.setModalVisible} >
                        <AntDesign name="closecircleo" size={30} color={colors.activeSwitch} onPress={props.setModalVisible} />
                    </TouchableOpacity>
                    <Text style={styles.headingStyle} numberOfLines={4}>{props.title}</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.textStyle} >{props.note}</Text>
                    </ScrollView>
                    <TouchableOpacity activeOpacity={0.8} style={styles.okButton} onPress={props.btnfunction}>
                        <AntDesign name="play" size={30} color={colors.activeSwitch} style={{marginEnd:5}} onPress={props.btnfunction} />
                        <Text style={[styles.textStyle, { fontWeight: 'bold',textAlign:'center' }]}>Play</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        height: height * 0.6,
        width: width * 0.85,
        backgroundColor: colors.transparentGrayx,
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    okButton: {
        backgroundColor: colors.lightGray,
        flexDirection:'row',
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 2
    },
    textStyle: {
        fontSize: 18,
        fontFamily: Fonts.Handlee,
    },
    headingStyle: {
        fontSize: 20,
        textAlign: 'center',
        //position: 'absolute',
        //top: 10,
        color: colors.activeSwitch,
        fontFamily: Fonts.Handlee,
        fontWeight: 'bold',
        paddingVertical: height * 0.02,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default CustomModal;