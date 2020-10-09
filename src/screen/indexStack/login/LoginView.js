import React, { Component } from 'react';
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
import { setLanguage } from '../../../utils/Session';
import { getLanguage } from '../../../utils/Session';
import { NavigationEvents } from 'react-navigation';
import { Login } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";
import RNRestart from 'react-native-restart'
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from 'react-native-sqlite-storage';
//Assets
import HeaderImage from '../../../../assets/globals/header.jpg';

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

class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language:'en',
            headerHeight: new Animated.Value(250),
            email: '',
            password: '',
            re : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {/*

      var db = SQLite.openDatabase({ name: "DragonGolf", createFromLocation: "~DragonGolf.db" },
        this.openSuccess, this.openError);

      try{

      db.transaction(tx => {
          tx.executeSql('Select * Login', [], (tx, results) => {

          })
        });
     }catch(e){
        console.warn(e)
     }
 */}

    /*componentDidMount() {

        db = SQLite.openDatabase({ name: "DragonGolf", createFromLocation: "~DragonGolf.db" },
        this.openSuccess, this.openError);

     

        /*this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => this.changeHeaderSize(120),
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => this.changeHeaderSize(250),
        );
    }*/

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.signInError !== nextProps.signInError) {
            if (nextProps.signInError) {
                Alert.alert(
                    nextProps.signInError.message,
                    nextProps.signInError.error,
                    [{
                        text: 'Ok', onPress: () => {
                            this.props.changeLoading(false);
                            this.props.resetSignInError();
                        }
                    }]
                );
            }
        }
    }

    componentWillUnmount() {
        //this.keyboardDidShowListener.remove();
        //this.keyboardDidHideListener.remove();
    }

    render() {

        const {
            headerHeight,
            emailError,
            passwordError,
            language
        } = this.state


        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent
                />
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
                                onValueChange={this.changeLanguage}
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
                                    ref={ref => this.emailInput = ref}
                                    label={email[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="none"
                                    autoCompleteType='email'
                                    keyboardType="email-address"
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.passInput = ref}
                                    label={password[language]}
                                    tintColor={Colors.Primary}
                                    secureTextEntry
                                    autoCompleteType='password'
                                    autoCapitalize="none"
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonsView}>
                            <Ripple
                                style={[styles.button, { backgroundColor: Colors.Gray }]}
                                onPress={this.createAnAccountAction}
                            >
                                <Text style={styles.buttonText}>{createAccount[language]}</Text>
                            </Ripple>
                            <Ripple
                                style={[styles.button, { backgroundColor: Colors.Primary }]}
                                onPress={this.submit}
                            >
                                <Text style={[styles.buttonText, { color: Colors.White }]}>{login[language]}</Text>
                                <View style={{ width: 30 }} />
                                <Ionicon name="ios-arrow-forward" size={30} color={Colors.White} />
                            </Ripple>
                        </View>
                        <TouchableOpacity style={{padding:10, alignSelf: 'center'}} onPress={()=>this.props.navigation.navigate('RecuperaContrasena', {language:language})}>
                            <Text style={{color:Colors.Primary,fontWeight:'bold',fontSize:16}}>{Recupera[language]}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }

    changeHeaderSize = (value) => {
        Animated.timing(
            this.state.headerHeight,
            {
                toValue: value,
                duration: 500,
                easing: Easing.elastic(1.2),
                useNativeDriver: false
            }
        ).start()
    }

    changeLanguage = (language) => {
        console.warn(language)
        this.setState({
            language
        })
    }

    submit = () => {/*

        try{

            let usuario = "chuy@hotmail.com"
            let password = "123"

                    db.transaction((tx) => {

                    let sql = `Insert into Login (usuario, password)` + ` VALUES ("${usuario}","${password}");`

                    console.warn(sql)

                    tx.executeSql(sql, [], (tx, results) => {
                      console.warn('Consulta OK')

                      var len = results.rows.length;

                      const tempticket = [];

                      for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);

                        let Localidad = row.Localidad
                        let ClaveLocalidad = row.Clave_Localidad

                        tempticket.push(Localidad + ' - ' + ClaveLocalidad);
                      }

                      this.setState({
                        Localidades: tempticket
                      });

                      console.warn(tempticket)
                    });
                    console.warn(tx)
                  });
                }
                catch(e){
                    console.warn(e)
                }
                return*/
        const emailLogin = this.state.email.trim();
        const passwordLogin = this.state.password;

        if (emailLogin === "") {
          showMessage({
                    message: email[this.state.language]+' ' + required[this.state.language],
                    type: "warning",
                  });
          return;
        }

        if(!this.state.re.test(String(emailLogin).toLowerCase())){
          showMessage({
                    message: invalidEmail[this.state.language],
                    type: "danger",
                  });
          return

        }

        if (passwordLogin === "") {
          showMessage({
                    message: password[this.state.language]+' ' + required[this.state.language],
                    type: "warning",
                  });
          return;
        }

        Login(emailLogin, passwordLogin)
          .then((res) => {
            console.warn(res)
            if (res.estatus == 1) {

              try {

                let Mensaje = Bienvenido[this.state.language] + ' ' + res.resultado.usu_nombre + ' ' + res.resultado.usu_apellido_paterno + ' ' + res.resultado.usu_apellido_materno

                showMessage({
                  message: Mensaje,
                  type: "success",
                });

                setTimeout(
                  () => { RNRestart.Restart();
                    this.setState({
                      usuario: '',
                      password: '',
                      status: false
                    })
                   },
                  1000
                )

                AsyncStorage.setItem('usu_id', res.resultado.usu_id.toString());

                   

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
                });

              */} catch (e) {
                showMessage({
                  message: e.toString(),
                  type: "danger",
                });
                this.setState({
                  status: false
                })
              }
            }
            else if (res.estatus == 2) {
              this.props.navigation.navigate('CambioContrasena', {Email:emailLogin})
              this.setState({
                status: false
              })
            }
            else {
              this.setState({
                status: false
              })
              showMessage({
                    message: res.mensaje,
                    type: "danger",
                  });
            }
          });
    }

    createAnAccountAction = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate('RegisterView', { language: this.state.language });
    }
}

export default LoginView;