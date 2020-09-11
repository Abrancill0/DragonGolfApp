import React, { Component } from 'react';
import {
    Text,
    View,
    StatusBar,
    Keyboard,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Ripple from 'react-native-material-ripple';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import PhoneInput from 'react-native-phone-input'
import styles from './styles';
import Colors from '../../../utils/Colors';
import { Dictionary } from '../../../utils/Dictionary';

class RegisterView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePicture: null,
            phoneCode: '+52',
            codeNumber: '52',
            name: '',
            nameError: '',
            lastName: '',
            lastNameError: '',
            email: '',
            emailError: '',
            nickname: '',
            nicknameError: '',
            codeError: '',
            cellphone: '',
            cellphoneError: '',
            ghin: '',
            ghinError: '',
            handicap: '',
            handicapError: '',
            password: '',
            passwordError: '',
            confirmPassword: '',
            confirmPasswordError: '',
            deleting: false,
            seePassword: false,
        }
    }

    static navigationOptions = ({ navigation: { state: { params: { language } } } }) => ({
        title: Dictionary.signUp[language],
    });

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.signUpError !== nextProps.signUpError) {
            if (nextProps.signUpError) {
                Alert.alert(
                    nextProps.signUpError.message,
                    nextProps.signUpError.error,
                    [{
                        text: 'Ok', onPress: () => {
                            this.props.changeLoading(false);
                            this.props.resetSignUpError();
                        }
                    }]
                );
                if (nextProps.signUpError.error === Dictionary.emailTaken[this.props.language]) {
                    this.setState({
                        emailError: Dictionary.emailTaken[this.props.language],
                    });
                }
                if (nextProps.signUpError.error === Dictionary.ghinNumberTaken[this.props.language]) {
                    this.setState({
                        ghinError: Dictionary.ghinNumberTaken[this.props.language],
                    });
                }
                if (nextProps.signUpError.error === Dictionary.nicknameTaken[this.props.language]) {
                    this.setState({
                        nicknameError: Dictionary.nicknameTaken[this.props.language],
                    });
                }
            }
        }
    }

    render() {

        const {
            profilePicture,
            phoneCode,
            codeNumber,
            nameError,
            lastNameError,
            emailError,
            nicknameError,
            codeError,
            cellphone,
            cellphoneError,
            ghinError,
            handicapError,
            passwordError,
            confirmPasswordError,
            seePassword
        } = this.state

        const {
            language
        } = this.props;

        const {
            photo,
            name,
            lastName,
            email,
            nickname,
            code,
            cellphone: cellphoneText,
            ghinNumber,
            handicap,
            password,
            confirmPassword,
            haveAccount,
            signIn
        } = Dictionary;

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#FFFFFF"
                    barStyle="dark-content"
                    translucent={false}
                />
                <KeyboardAvoidingView style={styles.body} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
                    <ScrollView style={{ flex: 1, paddingTop: 20 }} keyboardShouldPersistTaps='handled'>
                        <TouchableOpacity
                            style={styles.imagePicker}
                            onPress={this.pickImage}
                        >
                            {profilePicture ?
                                <Image source={profilePicture} style={styles.image} /> :
                                <Text style={styles.imagePickerText}>{photo[language]}</Text>
                            }
                        </TouchableOpacity>
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.nameIn = ref}
                                    label={name[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    onChangeText={(name) => this.setState({ name })}
                                    error={nameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.nameValidation(text)) {
                                            this.lastNameIn.focus();
                                        } else {
                                            setTimeout(_ => this.nameIn.focus(), 100);
                                        }
                                    }}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.lastNameIn = ref}
                                    label={lastName[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    onChangeText={(lastName) => this.setState({ lastName })}
                                    error={lastNameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.lastNameValidation(text)) {
                                            this.emailIn.focus();
                                        } else {
                                            setTimeout(_ => this.lastNameIn.focus(), 100);
                                        }
                                    }}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.emailIn = ref}
                                    label={email[language]}
                                    tintColor={Colors.Primary}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={(email) => this.setState({ email })}
                                    error={emailError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.emailValidation(text)) {
                                            this.nicknameIn.focus();
                                        } else {
                                            setTimeout(_ => this.emailIn.focus(), 100);
                                        }
                                    }}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.nicknameIn = ref}
                                    label={nickname[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="characters"
                                    maxLength={5}
                                    onChangeText={(nickname) => this.setState({ nickname: nickname.toUpperCase() })}
                                    error={nicknameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.nicknameValidation(text)) {
                                            this.phoneIn.focus();
                                        } else {
                                            setTimeout(_ => this.nicknameIn.focus(), 100);
                                        }
                                    }}
                                />
                            </View>
                            <View style={styles.phoneInputContainer}>
                                <View style={{ width: 90, flexDirection: 'row' }}>
                                    <View style={{ width: 30, justifyContent: 'center' }}>
                                        <PhoneInput
                                            initialCountry='mx'
                                            value={phoneCode}
                                            onPressFlag={() => { }}
                                            textStyle={{ fontSize: 16 }}
                                            textComponent={() => <View />}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', width: 10 }}>
                                        <Text style={{ fontSize: 20 }}>+</Text>
                                    </View>
                                    <View style={{ width: 50, marginTop: -10 }}>
                                        <TextField
                                            label={code[language]}
                                            tintColor={Colors.Primary}
                                            keyboardType="number-pad"
                                            onChangeText={(codeNumber) => {
                                                this.setState({
                                                    codeNumber,
                                                    phoneCode: '+' + codeNumber,
                                                });
                                            }}
                                            value={codeNumber}
                                            maxLength={6}
                                            autoCapitalize="none"
                                            error={codeError}
                                            returnKeyType='done'
                                            onSubmitEditing={({ nativeEvent: { text } }) => this.codeValidation(text)}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginTop: -10 }}>
                                    <TextField
                                        ref={ref => this.phoneIn = ref}
                                        label={cellphoneText[language]}
                                        tintColor={Colors.Primary}
                                        keyboardType="phone-pad"
                                        maxLength={14}
                                        autoCapitalize="none"
                                        onKeyPress={({ nativeEvent: { key } }) => this.setState({ deleting: key === 'Backspace' })}
                                        onChangeText={this.formatCellphone}
                                        value={cellphone}
                                        error={cellphoneError}
                                        returnKeyType='done'
                                        onSubmitEditing={({ nativeEvent: { text } }) => {
                                            if (this.cellphoneValidation(text)) {
                                                this.ghinIn.focus();
                                            } else {
                                                setTimeout(_ => this.phoneIn.focus(), 100);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.ghinIn = ref}
                                    label={ghinNumber[language]}
                                    maxLength={7}
                                    tintColor={Colors.Primary}
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    onChangeText={(ghin) => this.setState({ ghin })}
                                    error={ghinError}
                                    returnKeyType='done'
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.ghinValidation(text)) {
                                            this.handicapIn.focus();
                                        } else {
                                            setTimeout(_ => this.ghinIn.focus(), 100);
                                        }
                                    }}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.handicapIn = ref}
                                    label={handicap[language]}
                                    tintColor={Colors.Primary}
                                    keyboardType="numeric"
                                    maxLength={5}
                                    autoCapitalize="none"
                                    onChangeText={(handicap) => this.setState({ handicap })}
                                    error={handicapError}
                                    returnKeyType='done'
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.handicapValidation(text)) {
                                            this.passIn.focus();
                                        } else {
                                            setTimeout(_ => this.handicapIn.focus(), 100);
                                        }
                                    }}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.passIn = ref}
                                    label={password[language]}
                                    tintColor={Colors.Primary}
                                    secureTextEntry={!seePassword}
                                    autoCapitalize="none"
                                    onChangeText={(password) => this.setState({ password })}
                                    error={passwordError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.passwordValidation(text)) {
                                            this.confirmPassIn.focus();
                                        } else {
                                            setTimeout(_ => this.passIn.focus(), 100);
                                        }
                                    }}
                                />
                                <TouchableOpacity
                                    style={styles.showPasswordButton}
                                    onPress={() => this.setState({ seePassword: !seePassword })}
                                >
                                    <Ionicon name={seePassword ? 'ios-eye' : 'ios-eye-off'} size={25} color={seePassword ? Colors.Primary : Colors.Gray} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.confirmPassIn = ref}
                                    label={confirmPassword[language]}
                                    tintColor={Colors.Primary}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                    error={confirmPasswordError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (!this.confirmPasswordValidation(text)) {
                                            setTimeout(_ => this.confirmPassIn.focus(), 100);
                                        }
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonsView}>
                            <Ripple
                                style={[styles.button, { backgroundColor: Colors.Gray }]}
                                onPress={this.haveAnAccountAction}
                            >
                                <Text style={styles.buttonText}>{haveAccount[language]}</Text>
                            </Ripple>
                            <Ripple
                                style={[styles.button, { backgroundColor: Colors.Primary }]}
                                onPress={this.submit}
                            >
                                <Text style={[styles.buttonText, { color: Colors.White }]}>{signIn[language]}</Text>
                                <View style={{ width: 15 }} />
                                <Ionicon name="ios-arrow-forward" size={30} color={Colors.White} />
                            </Ripple>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }

    haveAnAccountAction = () => {
        Keyboard.dismiss();
        this.props.navigation.goBack();
    }

    pickImage = () => {
        const options = {
            title: Dictionary.selectPhoto[this.props.language],
            takePhotoButtonTitle: Dictionary.takePhoto[this.props.language],
            chooseFromLibraryButtonTitle: Dictionary.selectPhoto[this.props.language],
            cancelButtonTitle: Dictionary.cancel[this.props.language],
            mediaType: 'photo',
            allowsEditing: true,
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    profilePicture: source,
                });
            }
        });
    }

    formatCellphone = (cellphone) => {
        //Filter only numbers from the input
        let cleaned = ('' + cellphone).replace(/\D/g, '');

        //Check if the input is of correct length
        let match1 = cleaned.match(/^(\d{3})$/);
        let match2 = cleaned.match(/^(\d{3})(\d{3})$/);
        let match3 = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match3) {
            this.setState({ cellphone: '(' + match3[1] + ') ' + match3[2] + '-' + match3[3] });
        } else if (match2) {
            if (!this.state.deleting)
                this.setState({ cellphone: '(' + match2[1] + ') ' + match2[2] + '-' });
        } else if (match1) {
            if (!this.state.deleting)
                this.setState({ cellphone: '(' + match1[1] + ') ' });
        } else {
            this.setState({ cellphone: cellphone, deleting: false });
        }
    }

    //============= VALIDATIONS ==============

    nameValidation = (name) => {
        return true
    }

    lastNameValidation = (lastName) => {
        return true
    }

    emailValidation = (email) => {
        return true
    }

    nicknameValidation = (nickname) => {
        return true
    }

    codeValidation = (code) => {
        return true
    }

    cellphoneValidation = (cellphone) => {
        return true
    }

    ghinValidation = (ghin) => {
        return true
    }

    handicapValidation = (handicap) => {
        return true
    }

    passwordValidation = (password) => {
        return true
    }

    confirmPasswordValidation = (confirmPassword) => {
        return true
    }

    //============= VALIDATIONS ==============

    submit = () => {
        const {
            profilePicture,
            name,
            lastName,
            email,
            nickname,
            codeNumber,
            cellphone,
            ghin,
            handicap,
            password,
            confirmPassword,
        } = this.state;

        const nameOk = this.nameValidation(name);
        const lastNameOk = this.lastNameValidation(lastName);
        const emailOk = this.emailValidation(email);
        const nicknameOk = this.nicknameValidation(nickname);
        const codeNumberOk = this.codeValidation(codeNumber);
        const cellphoneOk = this.cellphoneValidation(cellphone);
        const ghinOk = this.ghinValidation(ghin);
        const handicapOk = this.handicapValidation(handicap);
        const passwordOk = this.passwordValidation(password);
        const confirmPasswordOk = this.confirmPasswordValidation(confirmPassword);

        const submitOk = nameOk && lastNameOk && emailOk && nicknameOk && codeNumberOk
            && cellphoneOk && ghinOk && handicapOk && passwordOk && confirmPasswordOk;

        if (submitOk) {
            const data = {
                profilePicture,
                name,
                lastName,
                email,
                nickname,
                codeNumber,
                cellphone,
                ghin,
                handicap,
                password
            };
            this.props.signUp(data);
        }
    }

}

export default RegisterView;
