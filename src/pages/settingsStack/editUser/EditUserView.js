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
import ImagePicker from 'react-native-image-crop-picker';
import PhoneInput from 'react-native-phone-input'
import styles from './styles';
import Colors from '../../../utils/Colors';
//import * as Validations from '../../../utils/Validations';
import { Dictionary } from '../../../utils/Dictionary';
import DragonButton from '../../global/DragonButton';
import FormatCellphone from '../../../utils/FormatCellphone';
import moment from 'moment';
import { Update } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";
import RNRestart from 'react-native-restart'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const {
    photo,
    name,
    lastName,
    lastName2,
    email,
    nickname,
    invalidEmail,
    code,
    cellphone: cellphoneText,
    ghinNumber,
    handicap,
    save,
        } = Dictionary;

class EditUserView extends Component {

    constructor(props) {

        super(props);
        const { cellphone, email, ghin_number, handicap, id, id_sync, last_name, last_name2, name, nick_name, photo, ultimate_sync } = props.route.params.userData;
        const {getUserData} = props.route.params.getUserData
        console.warn(getUserData)
        console.warn(props.route.params.language)
        console.warn(getUserData)
        let cellphone2 = '52' + cellphone;
        //let formatted = '';
        //let pureCell = '';
        //if (cellphone.length > 10) {
          let  pureCell = cellphone2.substr(2,cellphone2.length);
        //}
        let formatted = cellphone2.substr(0, 2);
        //pureCell = FormatCellphone(pureCell);
        this.state = {
            language:props.route.params.language,
            id,
            id_sync,
            profilePicture: photo ? { uri: photo } : null,
            phoneCode: formatted,
            codeNumber: formatted,//formatted.substring(1, formatted.length),
            nameReg: name,
            nameError: '',
            lastNameReg: last_name,
            lastName2Reg: last_name2,
            lastNameError: '',
            emailReg: email,
            emailError: '',
            nicknameReg: nick_name,
            nicknameError: '',
            codeError: '',
            cellphone: pureCell,
            cellphoneError: '',
            ghin: ghin_number,
            ghinError: '',
            handicap: handicap.toString(),
            handicapError: '',
            deleting: false,
            re : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
        const language = this.state.language;
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
            language,
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


        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#FFFFFF"
                    barStyle="dark-content"
                    translucent={false}
                />
                <TouchableOpacity style={{padding:20}} onPress={()=> this.props.navigation.goBack()}>
                  <MaterialIcon name={'arrow-back'} size={30} color={Colors.Primary} />
                </TouchableOpacity>
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
                                    value={this.state.nameReg}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    autoCompleteType="name"
                                    onChangeText={(nameReg) => this.setState({ nameReg })}
                                    error={nameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        this.focusNextField('lastName');
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.inputs['lastName'] = ref}
                                    label={lastName[language]}
                                    value={this.state.lastNameReg}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    onChangeText={(lastNameReg) => this.setState({ lastNameReg })}
                                    error={lastNameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        this.focusNextField('lastName2');
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.inputs['lastName2'] = ref}
                                    label={lastName2[language]}
                                    value={this.state.lastName2Reg}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    onChangeText={(lastName2Reg) => this.setState({ lastName2Reg })}
                                    error={lastNameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        this.focusNextField('nickname');
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.inputs['email'] = ref}
                                    editable={false}
                                    label={email[language]}
                                    value={this.state.emailReg}
                                    tintColor={Colors.Primary}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCompleteType="email"
                                    autoCorrect={false}
                                    onChangeText={(emailReg) => this.setState({ emailReg })}
                                    error={emailError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                            this.focusNextField('nickname');
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.inputs['nickname'] = ref}
                                    label={nickname[language]}
                                    tintColor={Colors.Primary}
                                    value={this.state.nicknameReg}
                                    autoCapitalize="characters"
                                    autoCorrect={false}
                                    maxLength={5}
                                    onChangeText={(nickname) => this.setState({ nicknameReg: nickname.toUpperCase() })}
                                    error={nicknameError}
                                    onSubmitEditing={({ nativeEvent: { text } }) => {
                                        this.focusNextField('cellphone');
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
                                            this.focusNextField('ghin');
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
                                        this.focusNextField('handicap');
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
                                        this.inputs['handicap'].blur();
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

         setTimeout(() => {
          Alert.alert(
            Dictionary.selectPhoto[this.state.language],
            '',
            [
              { text: Dictionary.takePhoto[this.state.language], onPress: () => this._openCamera() },
              { text: Dictionary.selectPhoto[this.state.language], onPress: () => this._openGalley() },
            ],
            { cancelable: false }
          )
        }, 100)

         /*
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
        });*/
    }

     _openGalley() {

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
        let bytes = image.size
        console.warn(bytes)
        if (bytes >= 5242880) {
          setTimeout(() => {
            Alert.alert(
              'La imagen debe pesar menos de 5mb',
              '',
              [
                { text: 'Aceptar', style: 'Cancelar' },
              ],
              { cancelable: true }
            )
          }, 100)
          this.setState({
            status: false
          })
        }
        else {

          let path = image.path
          let NombreArchivo = path.split('Pictures/');
          let name = NombreArchivo[1];
          console.warn(name)
            this.setState({
              status: false,
              foto: path,
              profilePicture: {
                uri: Platform.OS === "android" ? path : path.replace("file://", ""),
                type: 'image/jepg',
                name: name
              }
            });
        }
    }).catch((err) => { console.warn("openCamera catch" + err.toString()) });
  }

  _openCamera() {

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
        let bytes = image.size
        console.warn(bytes)
        if (bytes >= 5242880) {
          setTimeout(() => {
            Alert.alert(
              'La imagen debe pesar menos de 5mb',
              '',
              [
                { text: 'Aceptar', style: 'Cancelar' },
              ],
              { cancelable: true }
            )
          }, 100)
          this.setState({
            status: false
          })
        }
        else {

          let path = image.path
          let NombreArchivo = path.split('Pictures/');
          let name = NombreArchivo[1];
          console.warn(name)
            this.setState({
              status: false,
              foto: path,
              profilePicture: {
                uri: Platform.OS === "android" ? path : path.replace("file://", ""),
                type: 'image/jepg',
                name: name
              }
            });
        }
    }).catch((err) => { console.warn("openCamera catch" + err.toString()) });
  }

    formatCellphone = (cellphone) => {
        //Filter only numbers from the input
        /*let cleaned = ('' + cellphone).replace(/\D/g, '');

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
        } else {*/
            this.setState({ cellphone: cellphone, deleting: false });
        //}
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

    //============= VALIDATIONS ==============

    GuardarFoto = async (idUsuario) => {

    if (this.state.profilePicture != null) {
      SubirImagenUsuario(idUsuario, this.state.profilePicture)
        .then((res) => {
          console.warn(res)
          if (res.estatus == 1) {

               setTimeout(() => {
                 showMessage({
                  message: 'Foto subida correctamente',
                  type: "success",
                });
               }, 1000)

          }
          else {
            Alert.alert(
              "Dragon Golf",
              "Ocurrió un error al subir la Foto",
              [
                {
                  text: "Aceptar",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
              ],
              { cancelable: false }
            );
          }
        });
    }
  }

    submit = () => {
        const {
            id,
            profilePicture,
            nameReg,
            lastNameReg,
            lastName2Reg,
            emailReg,
            nicknameReg,
            codeNumber,
            cellphone,
            ghin,
            handicap,
            passwordReg,
            confirmPasswordReg,
            language
        } = this.state;

        if (nameReg == '') {
      showMessage({
                message: name[language] +' ' + required[language],
                type: "warning",
              });
      return
    }

    if (lastNameReg == '') {
      showMessage({
                message: lastName[language] + ' ' + required[language],
                type: "warning",
              });
      return
    }


    if (nicknameReg == '') {
      showMessage({
                message: nickname[language] + ' ' +required[language],
                type: "warning",
              });
      return
    }

    if (passwordReg == '') {
      showMessage({
                message: password[language] + ' ' + required[language],
                type: "warning",
              });
      return
    }

    if (confirmPasswordReg == '') {
      showMessage({
                message: confirmPassword[language],
                type: "warning",
              });
      return
    }

    if (passwordReg != confirmPasswordReg) {
      showMessage({
                message: dontMatch[language],
                type: "warning",
              });
      return
    }

    Update(id, nameReg, lastNameReg, lastName2Reg, emailReg, nicknameReg, codeNumber + cellphone)
        .then((res) => {
            console.warn(res)
            if (res.estatus === 1) {

              try {
               showMessage({
                    message: 'Usuario editado correctamente',
                    type: "success",
                  });

               this.GuardarFoto(id)

                this.props.route.params.getUserData()

               /*setTimeout(
                      () => { RNRestart.Restart();
                       },
                      1000
                    )*/

              } catch (e) {

                showMessage({
                    message: e.toString(),
                    type: "danger",
                  });
              }
            }
            else {
              showMessage({
                    message: res.mensaje,
                    type: "warning",
                  });
            }
        });
    }

}


export default EditUserView;
