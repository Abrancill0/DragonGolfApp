import React, { useState } from 'react';
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
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import StyleLogin from '../Styles/StyleLogin';
import { Button } from 'react-native-elements';
import { OutlinedTextField, TextField } from 'react-native-material-textfield';
//import { LoginApp } from '../Services/Services'
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';
import EntypoIcon from 'react-native-vector-icons/Entypo';
//import DatosUser from '../DatosUser'
import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';
import styles from './styles';
import Colors from '../utils/Colors';
import { Dictionary } from '../utils/Dictionary';
import { setLanguage } from '../utils/Session';
import HeaderImage from '../../assets/globals/header.jpg';
import Ripple from 'react-native-material-ripple';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;

export default function Login({logeadoHandler}) {
	const navigation = useNavigation();

	const [isloading, setLoading] = useState(false)
	const [correoElectronico, setCorreoElectronico] = useState('');
	const [contrasena, setContrasena] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [headerHeight, setheaderHeight] = useState(new Animated.Value(250));
    
    

    function toggleSwitch() {
        setShowPassword(!showPassword)
    }

    const [language, setlanguage] = useState(false)
    const [email, setemail] = useState(false)
    const [emailError, setemailError] = useState(false)
    const [password, setpassword] = useState(false)
    const [passwordError, setpasswordError] = useState(false)
       
        return (
                <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <View style={{ flex: 1 }}>
                <NavigationEvents
                    onWillFocus={_ => this.props.setForceInset('never')}
                    onWillBlur={_ => this.props.setForceInset('always')}
                />
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
                                onValueChange={setlanguage(language)}
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
                                    error={emailError}
                                    onSubmitEditing={(event) => {
                                        if(this.emailValidation(event.nativeEvent.text)){
                                            this.passInput.focus();
                                        }else{
                                            setTimeout(_ => this.emailInput.focus(), 100);
                                        }
                                    }}
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
                                    error={passwordError}
                                    onSubmitEditing={(event) => {
                                        if(!this.passwordValidation(event.nativeEvent.text)){
                                            setTimeout(_ => this.passInput.focus(), 100);
                                        }
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonsView}>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
                </TouchableWithoutFeedback>
        );
}
