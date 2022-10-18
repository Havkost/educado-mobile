//Navigation til Login Screen

//Feather icons

//State på at man har logget ud

//bevar state til næste åbning af app

//importer state i login form

import React, {useState} from 'react';
import {StyleSheet, Image, View, Dimensions, TouchableOpacity, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

export default function LogOutButton(props) {

    const navigation = useNavigation();

    return (
        <View style ={styles.container}>
            <View style={styles.bottomContainer}>
                <View style={styles.formInputContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <View style={styles.formButton}>
                            <Feather name="log-out" size={36}  style={styles.menu} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

/*<TouchableOpacity onPress={() => navigation.navigate('Register')}>
    <View style={styles.formButton}>
        <Text style={styles.buttonText}>Register a new account</Text>
    </View>
</TouchableOpacity>*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent : 'flex-start'
    },
 /*   button: {
        backgroundColor : 'rgba(123,104,238,0.8)',
        height : 55,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius: 35,
        marginHorizontal : 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white'
    },*/
    buttonText:{
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        letterSpacing: 0.5
    },
    bottomContainer:{
        marginVertical: '150%',
        justifyContent: 'center',
        height: '25%',
    },
    formButton: {
        backgroundColor : 'white',
        width : 75,
        height : 55,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius: 15,
        marginHorizontal : 325,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        elevation: 5,
    },
    formInputContainer:{
        marginBottom: 70
    },
    tinyLogo: {
        width: 50,
        height: 50,
    }
});
