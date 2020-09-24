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
import ImagePicker from 'react-native-image-picker';
import PhoneInput from 'react-native-phone-input'
import styles from './styles';
import Colors from '../../../utils/Colors';
//import * as Validations from '../../../utils/Validations';
import { Dictionary } from '../../../utils/Dictionary';
import DragonButton from '../../global/DragonButton';
import FormatCellphone from '../../../utils/FormatCellphone';
import moment from 'moment';

class EditUserView extends Component {

    constructor(props) {
        super(props);
        //const { cellphone, email, ghin_number, handicap, id, id_sync, last_name, name, nick_name, photo, ultimate_sync } = props.userData;
        let formatted = '';
        let pureCell = '';
        /*if (cellphone.length > 10) {
            pureCell = cellphone.substr(cellphone.length - 10);
        }
        formatted = cellphone.substr(0, cellphone.length - 10);
        pureCell = FormatCellphone(pureCell);*/
        this.state = {
            id,
            //id_sync,
            //profilePicture: photo ? { uri: photo } : null,
            phoneCode: formatted,
            codeNumber: formatted.substring(1, formatted.length),
            name: 'name',
            nameError: '',
            lastName: 'last_name',
            lastNameError: '',
            email: 'email',
            emailError: '',
            nickname: 'nick_name',
            nicknameError: '',
            codeError: '',
            cellphone: pureCell,
            cellphoneError: '',
            ghin: 'ghin_number',
            ghinError: '',
            handicap: 'handicap'.toString(),
            handicapError: '',
            deleting: false,
        }

        this.inputs = {};
    }

    formatCellphone = (cellphone) => {
        let formatted = '';
        let pureCell = '';
        if (cellphone.length > 14) {
            pureCell = cellphone.substr(cellphone.length - 14);
        }

        formatted = cellphone.substr(0, cellphone.length - 14);

        return pureCell;
    }

    static navigationOptions = ({ navigation }) => {
        const language = 'es';
        return {
            title: navigation.getParam('Title', Dictionary.editUser[language]),
        }
    };

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
            save,
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
                                    ref={ref => this.inputs['name'] = ref}
                                    label={name[language]}
                                    value={this.state.name}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    autoCompleteType="name"
                                    onChangeText={(name) => this.setState({ name })}
                                    error={nameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.nameValidation(text)) {
                                            this.focusNextField('lastName');
                                        }
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.inputs['lastName'] = ref}
                                    label={lastName[language]}
                                    value={this.state.lastName}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    onChangeText={(lastName) => this.setState({ lastName })}
                                    error={lastNameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.lastNameValidation(text)) {
                                            this.focusNextField('email');
                                        }
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.inputs['email'] = ref}
                                    label={email[language]}
                                    value={this.state.email}
                                    tintColor={Colors.Primary}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCompleteType="email"
                                    autoCorrect={false}
                                    onChangeText={(email) => this.setState({ email })}
                                    error={emailError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.emailValidation(text)) {
                                            this.focusNextField('nickname');
                                        }
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.inputs['nickname'] = ref}
                                    label={nickname[language]}
                                    tintColor={Colors.Primary}
                                    value={this.state.nickname}
                                    autoCapitalize="characters"
                                    autoCorrect={false}
                                    maxLength={5}
                                    onChangeText={(nickname) => this.setState({ nickname: nickname.toUpperCase() })}
                                    error={nicknameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.nicknameValidation(text)) {
                                            this.focusNextField('cellphone');
                                        }
                                    }}
                                    blurOnSubmit={false}
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
                                            onSubmitEditing={({ nativeEvent: { text } }) => this.codeValidation(text)}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginTop: -10 }}>
                                    <TextField
                                        ref={ref => this.inputs['cellphone'] = ref}
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
                                                this.focusNextField('ghin');
                                            }
                                        }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.inputs['ghin'] = ref}
                                    label={ghinNumber[language]}
                                    value={this.state.ghin}
                                    maxLength={7}
                                    tintColor={Colors.Primary}
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    onChangeText={(ghin) => this.setState({ ghin })}
                                    error={ghinError}
                                    returnKeyType='done'
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.ghinValidation(text)) {
                                            this.focusNextField('handicap');
                                        }
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.inputs['handicap'] = ref}
                                    label={handicap[language]}
                                    value={this.state.handicap}
                                    tintColor={Colors.Primary}
                                    keyboardType="numeric"
                                    maxLength={5}
                                    autoCapitalize="none"
                                    returnKeyType='done'
                                    onChangeText={(handicap) => this.setState({ handicap })}
                                    error={handicapError} onSubmitEditing={({ nativeEvent: { text } }) => {
                                        if (this.handicapValidation(text)) {
                                            this.inputs['handicap'].blur();
                                        }
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={{ height: 20 }} />
                        </View>
                    </ScrollView>

                    <View style={styles.bottomButtom}>
                        <DragonButton title={save[language]} onPress={this.submit} />
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }

    focusNextField = (field) => {
        this.inputs[field].focus();
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
            storageOptions: {
                skipBackup: true,
                path: 'DragonGolf',
                waitUntilSaved: true
            }
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
        const response = Validations.nameValidation(name);
        this.setState({ nameError: !response.ok ? response.error : '' });

        return response.ok;
    }

    lastNameValidation = (lastName) => {
        const response = Validations.nameValidation(lastName);
        this.setState({ lastNameError: !response.ok ? response.error : '' });

        return response.ok;
    }

    emailValidation = (email) => {
        const response = Validations.emailValidation(email);
        this.setState({ emailError: !response.ok ? response.error : '' });

        return response.ok;
    }

    nicknameValidation = (nickname) => {
        const response = Validations.nicknameValidation(nickname);
        this.setState({ nicknameError: !response.ok ? response.error : '' });

        return response.ok;
    }

    codeValidation = (code) => {
        const response = Validations.intNumberValidation(code);
        this.setState({ codeError: !response.ok ? response.error : '' });

        return response.ok;
    }

    cellphoneValidation = (cellphone) => {
        const response = Validations.phoneValidation(cellphone);
        this.setState({ cellphoneError: !response.ok ? response.error : '' });

        return response.ok;
    }

    ghinValidation = (ghin) => {
        let ok = true;
        const response = Validations.intNumberValidation(ghin);
        this.setState({ ghinError: !response.ok ? response.error : '' });
        if (response.ok) {
            if (ghin.length !== 7){
                ok = false;
                this.setState({ ghinError: Dictionary.ghinMustContain[this.props.language] });
            }
        }

        return response.ok && ok;
    }

    handicapValidation = (handicap) => {
        const response = Validations.floatNumberValidation(handicap);
        this.setState({ handicapError: !response.ok ? response.error : '' });

        return response.ok;
    }

    //============= VALIDATIONS ==============

    submit = () => {
        let {
            profilePicture,
            id,
            id_sync,
            name,
            lastName,
            email,
            nickname,
            codeNumber,
            cellphone,
            ghin,
            handicap,
        } = this.state;

        const nameOk = this.nameValidation(name);
        const lastNameOk = this.lastNameValidation(lastName);
        const emailOk = this.emailValidation(email);
        const nicknameOk = this.nicknameValidation(nickname);
        const codeNumberOk = this.codeValidation(codeNumber);
        const cellphoneOk = this.cellphoneValidation(cellphone);
        const ghinOk = this.ghinValidation(ghin);
        const handicapOk = this.handicapValidation(handicap);

        const submitOk = nameOk && lastNameOk && emailOk && nicknameOk && codeNumberOk
            && cellphoneOk && ghinOk && handicapOk;

        if (submitOk) {
            let cleaned = ('' + cellphone).replace(/\D/g, '');

            let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) cellphone = match[1] + match[2] + match[3];

            name = name.trim();
            lastName = lastName.trim();

            const data = {
                id,
                name: name,
                last_name: lastName,
                email: email,
                nick_name: nickname,
                cellphone: '+' + codeNumber + cellphone,
                language: this.props.language,
                handicap: handicap,
                ghin_number: ghin,
                photo: profilePicture ? profilePicture.uri : '',
                id_sync: id_sync,
                ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
            };
            this.props.updateUserData(data);
            data.strokes = '';
            this.props.updatePlayer(data);
        }
    }

}


export default EditUserView;
