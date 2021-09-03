import React, { useState, useRef } from "react";
import {
    Text,
    View,
    ImageBackground,
    StatusBar,
    Keyboard,
    Animated,
    ScrollView,
    Easing,
    Alert,
    Picker,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Ripple from 'react-native-material-ripple';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Colors from '../../../utils/Colors';
import { Dictionary } from '../../../utils/Dictionary';
import { HomeTab } from '../../../routes/HomeTab';
import { NavigationEvents } from 'react-navigation';
import { LogearseAB } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";
import RNRestart from 'react-native-restart'
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from 'react-native-sqlite-storage';
//Assets
import HeaderImage from '../../../../assets/globals/header.jpg';
import { useNavigation } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';

const {
            email,
            password,
            createAccount,
            login,
            required,
            invalidEmail,
            Bienvenido,
            Recupera
        } = Dictionary;


export default function Login({ logeadoHandler }) {
  const navigation = useNavigation();

  const refInput = useRef();
  const passInput = useRef();

  const [emailLogin, setemailLogin] = useState("");
  const [re, setre] = useState(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const [passwordLogin, setpasswordLogin] = useState("");
  const [carga, setStatus] = useState(false);
  //const [showPassword, setShowPassword] = useState(false);
  const [language, setlanguage] = useState('es');
  const [headerHeight, setheaderHeight] = useState( new Animated.Value(240));

  function toggleSwitch() {
    setShowPassword(!showPassword);
  }

  function changeLanguage(language) {
        //console.warn(language)
        setlanguage(language)
    }

  function createAnAccountAction() {
        Keyboard.dismiss();
        navigation.navigate('RegisterView', { language: language });
    }

    function recupera(){
      setemailLogin("");
      setpasswordLogin("");
      refInput.current.clear();
      passInput.current.clear();
      navigation.navigate("RecuperaContrasena", {language:language})
    }

    function Logearse() {

        if (emailLogin === "") {
          showMessage({
                    message: email[language]+' ' + required[language],
                    type: "warning",
                  });
          return;
        }

        if(!re.test(String(emailLogin).toLowerCase())){
          showMessage({
                    message: invalidEmail[language],
                    type: "danger",
                  });
          return

        }

        if (passwordLogin === "") {
          showMessage({
                    message: password[language]+' ' + required[language],
                    type: "warning",
                  });
          return;
        }

        //console.warn(emailLogin)
        //console.warn(passwordLogin)
        
        setStatus(true)
        LogearseAB(emailLogin, passwordLogin)
          .then((res) => {
            //console.warn(res)

            try {
              if (res.estatus == 1) {

                let Mensaje = Bienvenido[language] + ' ' + res.Result[0].usu_nombre + ' ' + res.Result[0].usu_apellido_paterno + ' ' + res.Result[0].usu_apellido_materno

                //console.warn(Mensaje)
                showMessage({
                  message: Mensaje,
                  type: "success",
                });


                /*logeadoHandler()
                navigation.navigate("SettingsView");*/

                setTimeout(
                  () => { RNRestart.Restart();
                    setStatus(false)
                   },
                  1000
                )

                AsyncStorage.setItem('usu_id', res.Result[0].IDUsuario.toString());
                AsyncStorage.setItem('actualizar', "false");
                AsyncStorage.setItem('language', language);
                AsyncStorage.setItem('IDRound', '0');
                AsyncStorage.setItem('sn', 'false');
                AsyncStorage.setItem('tn', 'false');
                AsyncStorage.setItem('hole', '0');

                /*AsyncStorage.setItem('UsuVerCorreo',res.Result[0].UsuVerCorreo.toString());
                AsyncStorage.setItem('UsuVerContrasena', res.Result[0].UsuVerContrasena.toString());
                AsyncStorage.setItem('UsuVerNombre', res.Result[0].UsuVerNombre.toString());
                AsyncStorage.setItem('UsuverApellidopaterno', res.Result[0].UsuverApellidopaterno.toString());
                AsyncStorage.setItem('UsuverApellidoMaterno', res.Result[0].UsuverApellidoMaterno.toString());
                AsyncStorage.setItem('UsuVerFoto', res.Result[0].UsuVerFoto.toString());
                AsyncStorage.setItem('UsuVerNomina', res.Result[0].UsuVerNomina.toString());
                AsyncStorage.setItem('UsuVerOlvideContrasena', res.Result[0].UsuVerOlvideContrasena.toString());
                AsyncStorage.setItem('UsuVerContrasenaTemp',res.Result[0].UsuVerContrasenaTemp.toString());
                AsyncStorage.setItem('UsuVerStatus', res.Result[0].UsuVerStatus.toString());
                AsyncStorage.setItem('CLVZONA', res.Result[0].CLVZONA.toString());
                AsyncStorage.setItem('CLVROLES', res.Result[0].CLVROLES.toString());

                setTimeout(
                  () => { RNRestart.Restart();
                    this.setState({
                      usuario: '',
                      password: '',
                      status: false
                    })
                   },
                  2000
                )
                
                let Mensaje = 'Bienvenido ' + res.Result[0].UsuVerNombre + ' ' + res.Result[0].UsuverApellidopaterno + ' ' + res.Result[0].UsuverApellidoMaterno

                showMessage({
                  message: Mensaje,
                  type: "success",
                });*/

              
            }
            else if (res.estatus == 2) {
              this.props.navigation.navigate('CambioContrasena', {Email:emailLogin})
              setemailLogin("");
              setpasswordLogin("");
              refInput.current.clear();
              passInput.current.clear();
              setStatus(false)
            }
            else {
              showMessage({
                    message: res.mensaje,
                    type: "danger",
                  });
              setStatus(false)
            }
          } catch (e) {
            //console.warn(e)
                showMessage({
                  message: "Ocurrió un error, favor de intentar más tarde" + e,
                  type: "danger",
                });
                setStatus(false)
              }
          });
    }

  return (
            <View style={{ flex: 1 }}>
                <Spinner
                  visible={carga}
                  color={Colors.Primary} />
                <Animated.View
                    style={[styles.header, { height: headerHeight }]}
                >
                    <ImageBackground
                        style={styles.headerImage}
                        source={HeaderImage}
                        resizeMode="cover"
                    >
                        <Text style={styles.headerText}>DRAGON GOLF</Text>
                    </ImageBackground>
                </Animated.View>
                <KeyboardAvoidingView style={styles.body} behavior='padding' enabled={Platform.OS === 'ios'}>
                    <View style={styles.selectlanguage}>
                        <Ionicon name='md-globe' size={18} color={Colors.Primary} />
                        <View style={{ flex: 1 }}>
                            <Picker
                                selectedValue={language}
                                onValueChange={changeLanguage}
                                mode="dropdown"
                            >
                                <Picker.Item label='🇺🇸 EN' value='en' />
                                <Picker.Item label='🇪🇸 ES' value='es' />
                            </Picker>
                        </View>
                    </View>
                    <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled">
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={refInput}
                                    label={email[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="none"
                                    autoCompleteType='email'
                                    keyboardType="email-address"
                                    onChangeText={(email) => setemailLogin(email)}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        //passInput.focus();
                                    }}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    //ref={ref => passInput = ref}
                                    ref={passInput}
                                    label={password[language]}
                                    tintColor={Colors.Primary}
                                    secureTextEntry
                                    autoCompleteType='password'
                                    autoCapitalize="none"
                                    onChangeText={(password) => setpasswordLogin(password)}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        //passInput.blur();
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonsView}>
                            <Ripple
                                style={[styles.button, { backgroundColor: Colors.Gray }]}
                                onPress={createAnAccountAction}
                            >
                                <Text style={styles.buttonText}>{createAccount[language]}</Text>
                            </Ripple>
                            <Ripple
                                style={[styles.button, { backgroundColor: Colors.Primary }]}
                                onPress={()=>Logearse()}
                            >
                                <Text style={[styles.buttonText, { color: Colors.White }]}>{login[language]}</Text>
                                <View style={{ width: 30 }} />
                                <Ionicon name="ios-arrow-forward" size={30} color={Colors.White} />
                            </Ripple>
                        </View>
                        <TouchableOpacity style={{padding:10, alignSelf: 'center'}} onPress={()=>recupera()}>
                            <Text style={{color:Colors.Primary,fontWeight:'bold',fontSize:16}}>{Recupera[language]}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
}
