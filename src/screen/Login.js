import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback,Keyboard } from 'react-native';
import StyleLogin from '../Styles/StyleLogin';
import { Button } from 'react-native-elements';
import { OutlinedTextField } from 'react-native-material-textfield';
//import { LoginApp } from '../Services/Services'
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';
import EntypoIcon from 'react-native-vector-icons/Entypo';
//import DatosUser from '../DatosUser'
import { useNavigation } from '@react-navigation/native';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;

export default function Login({logeadoHandler}) {
	const navigation = useNavigation();

	const [isloading, setLoading] = useState(false)
	const [correoElectronico, setCorreoElectronico] = useState('');
	const [contrasena, setContrasena] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    

    function toggleSwitch() {
        setShowPassword(!showPassword)
    }
       
        return (
                <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <View style={{flex: 1,backgroundColor: '#123c5b',justifyContent:'center'}}>
                    <View style={{flex: .2,marginBottom:10}}>
                    </View>
                    <View style={{flex: .4,paddingHorizontal:30}}>
                        <View style={{marginBottom:10}}>
                            <OutlinedTextField
                                label='Usuario'
                                autoCapitalize='none'
                                value={correoElectronico}
                                onChangeText={(text) => setCorreoElectronico(text)}
                                baseColor='#fff'
                                tintColor='#fff'
                                textColor='#fff'
                                inputContainerStyle={{borderRadius:20}}
                                labelTextStyle={StyleLogin.TextStyle}
                        
                            />
                        </View>
                        <View style={{marginBottom:20,justifyContent:'center'}}>
                            <OutlinedTextField
                                label='Contraseña'
                                onChangeText={(text) => setContrasena(text)}
                                secureTextEntry={!showPassword}
                                baseColor='#fff'
                                tintColor='#fff'
                                textColor='#fff'
                                labelTextStyle={StyleLogin.TextStyle}
                            />
                           <TouchableOpacity style={{ alignItems: 'flex-end', position: 'absolute',right:20}} onPress={toggleSwitch}>
                                {
                                    showPassword
                                    ?
                                    <EntypoIcon name='eye-with-line' color='white' size={20}/>
                                    :
                                    <EntypoIcon name='eye' color='white' size={20}/>
                                }
                            </TouchableOpacity>
                        </View>
                        <Button title='Iniciar Sesión'
                            titleStyle={{ color:'#104E81', fontFamily: 'Montserrat',textAlignVertical: 'bottom', fontSize: 18, color: '#104E81' }}
                            buttonStyle={{ backgroundColor: "#fff" }}/>

                        <View style={{margin:20,alignItems:'center'}}>
                            <Text style={{color:'white'}}>Version 1.0</Text>
                        </View>

                    </View>


                </View>
                </TouchableWithoutFeedback>
        );
}
