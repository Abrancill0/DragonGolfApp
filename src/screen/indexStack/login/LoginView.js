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
    Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Ripple from 'react-native-material-ripple';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Colors from '../../../utils/Colors';
import { Dictionary } from '../../../utils/Dictionary';
import { setLanguage } from '../../../utils/Session';
import { NavigationEvents } from 'react-navigation';

//Assets
import HeaderImage from '../../../../assets/globals/header.jpg';

class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headerHeight: new Animated.Value(250),
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
        }
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => this.changeHeaderSize(120),
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => this.changeHeaderSize(250),
        );
    }

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
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {

        const {
            headerHeight,
            emailError,
            passwordError,
        } = this.state

        const {
            language,
        } = this.props;

        const {
            email,
            password,
            createAccount,
            login
        } = Dictionary;

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
                useNativeDriver: true
            }
        ).start()
    }

    changeLanguage = (language) => {
        setLanguage(language);
        this.props.changeLanguage(language);
    }

    createAnAccountAction = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate('RegisterView', { language: this.props.language });
    }

    emailValidation = (email) => {
        console.warn('Hola')

        return true;
    }

    passwordValidation = (password) => {
        console.warn('Hola')

        return true;
    }

    submit = () => {
        const email = this.state.email;
        const password = this.state.password;
        const emailOk = this.emailValidation(email);
        const passwordOk = this.passwordValidation(password);
        const submitOk = emailOk && passwordOk;

        if (submitOk) this.props.signIn({ email, password });
    }
}

export default LoginView;