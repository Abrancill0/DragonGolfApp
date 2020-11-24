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
    Platform,
    Button
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Ripple from 'react-native-material-ripple';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImagePicker from "react-native-image-picker";
import PhoneInput from 'react-native-phone-input'
import styles from './styles';
import Colors from '../../../utils/Colors';
import { Dictionary } from '../../../utils/Dictionary';
import { showMessage } from "react-native-flash-message";
import { CrearInvitados, SubirImagenUsuario } from '../../../Services/Services'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNRestart from 'react-native-restart'
import AsyncStorage from '@react-native-community/async-storage';
import DragonButton from '../../../pages/global/DragonButton';
import ImageResizer from "react-native-image-resizer";

const {
            photo,
            name,
            lastName,
            lastName2,
            email,
            nickname,
            code,
            cellphone: cellphoneText,
            ghinNumber,
            handicap,
            password,
            confirmPassword,
            haveAccount,
            create,
            required,
            strokes,
            difTees,
            createPlayer
        } = Dictionary;

class RegisterView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signo: true,
            signoTee: true,
            language: props.route.params.language,
            profilePicture: null,
            phoneCode: '+52',
            codeNumber: '52',
            strokesReg:'0',
            difTeesReg:'0',
            nameReg: '',
            nameError: '',
            lastNameReg: '',
            lastName2Reg: '',
            lastNameError: '',
            emailReg: '',
            emailError: '',
            nicknameReg: '',
            nicknameError: '',
            codeError: '',
            cellphone: '',
            cellphoneError: '',
            ghin: '0',
            ghinError: '',
            handicapReg: '0',
            handicapError: '',
            passwordReg: '',
            passwordError: '',
            confirmPasswordReg: '',
            confirmPasswordError: '',
            deleting: false,
            seePassword: false,
            confirmseePassword: false,
            re : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
            handicapReg,
            difTeesReg,
            confirmPasswordError,
            strokesReg,
            ghin,
            signo,
            signoTee
        } = this.state

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#FFFFFF"
                    barStyle="dark-content"
                    translucent={false}
                />
                <KeyboardAvoidingView style={styles.body} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
                    <ScrollView style={{ flex: 0.9, paddingTop: 20}} keyboardShouldPersistTaps='handled'>
                        <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.goBack()}>
                          <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
                        </TouchableOpacity> 
                          <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
                            <Text style={{ paddingBottom:20, fontSize: 16, fontFamily: 'Montserrat',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{createPlayer[language]}</Text>
                          </View>
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
                                    onChangeText={(nameReg) => this.setState({ nameReg })}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        this.lastNameIn.focus();
                                    }}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.lastNameIn = ref}
                                    label={lastName[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    onChangeText={(lastNameReg) => this.setState({ lastNameReg })}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        this.emailIn.focus();
                                    }}
                                />
                            </View>
                            {/*<View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.lastNameIn2 = ref}
                                    label={lastName2[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    onChangeText={(lastName2Reg) => this.setState({ lastName2Reg })}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        this.emailIn.focus();
                                    }}
                                />
                            </View>*/}
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.emailIn = ref}
                                    label={email[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    onChangeText={(emailReg) => this.setState({ emailReg })}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        this.nicknameIn.focus();
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
                                    onChangeText={(nickname) => this.setState({ nicknameReg: nickname.toUpperCase() })}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        this.phoneIn.focus();
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
                                        maxLength={10}
                                        autoCapitalize="none"
                                        onKeyPress={({ nativeEvent: { key } }) => this.setState({ deleting: key === 'Backspace' })}
                                        onChangeText={this.formatCellphone}
                                        value={cellphone}
                                        onSubmitEditing={({nativeEvent: {text}}) => {
                                            this.ghinIn.focus();
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.ghinIn = ref}
                                    label={ghinNumber[language]}
                                    maxLength={7}
                                    value={ghin}
                                    selectTextOnFocus={true}
                                    selectionColor={Colors.Secondary}
                                    tintColor={Colors.Primary}
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    onChangeText={(ghin) => this.setState({ ghin })}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        this.handicapIn.focus();
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
                                    value={handicapReg}
                                    selectTextOnFocus={true}
                                    selectionColor={Colors.Secondary}
                                    autoCapitalize="none"
                                    onChangeText={(handicapReg) => this.setState({ handicapReg })}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        this.strokesIn.focus();
                                    }}
                                />
                            </View>
                            <View style={[styles.inputContainer, {flex:1, flexDirection:'row', justifyContent: 'space-between'}]}>
                                <View style={{flex:0.1, alignSelf:'center', paddingRigth:5}}>
                                <Button
                                  title={this.state.signo?'+':'-'}
                                  onPress={() => this.setState({signo:!signo})}
                                  color={Colors.Primary}
                                />
                                </View>
                                <View style={{flex:0.9, paddingLeft:5}}>
                                <TextField
                                    ref={ref => this.strokesIn = ref}
                                    label={strokes[language]}
                                    maxLength={7}
                                    value={strokesReg}
                                    selectTextOnFocus={true}
                                    selectionColor={Colors.Secondary}
                                    tintColor={Colors.Primary}
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    onChangeText={(strokesReg) => this.setState({ strokesReg })}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        this.difTeesIn.focus();
                                    }}
                                />
                                </View>
                            </View>
                            <View style={[styles.inputContainer, {flex:1, flexDirection:'row', justifyContent: 'space-between', paddingBottom:20}]}>
                                <View style={{flex:0.1, alignSelf:'center', paddingRigth:5}}>
                                <Button
                                  title={this.state.signoTee?'+':'-'}
                                  onPress={() => this.setState({signoTee:!signoTee})}
                                  color={Colors.Primary}
                                />
                                </View>
                                <View style={{flex:0.9, paddingLeft:5}}>
                                <TextField
                                    ref={ref => this.difTeesIn = ref}
                                    label={difTees[language]}
                                    tintColor={Colors.Primary}
                                    keyboardType="numeric"
                                    maxLength={5}
                                    value={difTeesReg}
                                    selectTextOnFocus={true}
                                    selectionColor={Colors.Secondary}
                                    autoCapitalize="none"
                                    onChangeText={(difTeesReg) => this.setState({ difTeesReg })}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        this.difTeesIn.blur();
                                    }}
                                />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[styles.bottomButtom, {paddingTop:10}]}>
                            <DragonButton title={create[language]} onPress={this.submit} />
                        </View>
                </KeyboardAvoidingView>
            </View>
        )
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
              { text: Dictionary.cancel[this.state.language], onPress: () => null },
              { text: Dictionary.takePhoto[this.state.language], onPress: () => this._openCamera() },
              { text: Dictionary.selectPhoto[this.state.language], onPress: () => this._openGalley() },
            ],
            { cancelable: true }
          )
        }, 100)
    }

     _openGalley() {

        const options = {
          title: "Selected",
          storageOptions: {
            skipBackup: true,
            path: "images",
          },
          takePhotoButtonTitle: "Tomar fotografia",
          chooseFromLibraryButtonTitle: "Seleccionar de la libreria",
        };

    ImagePicker.launchImageLibrary(options,(response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let compressFormat = "JPEG";
        let quality = 80;
        let rotation = 0;
        let newWidth = 0;
        let newHeight = 0;
        if (response.width > response.height) {
          newWidth = 500;
          newHeight = response.height;
        }
        if (response.height > response.width) {
          newWidth = 500;
          newHeight = 750;
        }
        if (response.height == response.width) {
          (newWidth = 500), (newHeight = 500);
        }

        ImageResizer.createResizedImage(
          response.uri,
          newWidth,
          newHeight,
          compressFormat,
          quality,
          rotation,
          null
        )
          .then((response2) => {
                this.setState({
                  profilePicture: {
                    uri:
                    Platform.OS === "android"
                      ? response2.uri
                      : response2.uri.replace("file://", "/private"),
                    type: 'image/jepg',
                    name:
                      Platform.OS === "android"
                        ? response.fileName
                        : "evidencia.jpg",
                  },
                });
            })
          .catch((err) => {
            showMessage({
              message: err.toString(),
              type: "info",
            });
          });
      }
    });
  }

  _openCamera() {

    const options = {
      title: "Selected",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      takePhotoButtonTitle: "Tomar fotografia",
      chooseFromLibraryButtonTitle: "Seleccionar de la libreria",
    };

    ImagePicker.launchCamera(options,(response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let compressFormat = "JPEG";
        let quality = 80;
        let rotation = 0;
        let newWidth = 0;
        let newHeight = 0;
        if (response.isVertical) {
          newWidth = 500;
          newHeight = response.height;
        }
        if (!response.isVertical) {
          newWidth = 500;
          newHeight = 750;
          rotation = 90;
        }

        ImageResizer.createResizedImage(
          response.uri,
          newWidth,
          newHeight,
          compressFormat,
          quality,
          rotation,
          null
        )
          .then((response2) => {
                this.setState({
                  profilePicture: {
                    uri:
                    Platform.OS === "android"
                      ? response2.uri
                      : response2.uri.replace("file://", "/private"),
                    type: 'image/jepg',
                    name:
                      Platform.OS === "android"
                        ? response.fileName
                        : "evidencia.jpg",
                  },
                });
          })
          .catch((err) => {
            showMessage({
              message: err.toString(),
              type: "info",
            });
          });
      }
    });
  }

    formatCellphone = (cellphone) => {
        /*Filter only numbers from the input
        let cleaned = ('' + cellphone).replace(/\D/g, '');

        Check if the input is of correct length
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

    passwordValidation = (password) => {
        return true
    }

    confirmPasswordValidation = (confirmPassword) => {
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
              { cancelable: true }
            );
          }
        });
    }
  }

    submit = async () => {
    let idUsu = await AsyncStorage.getItem('usu_id')
    console.warn(idUsu)
        const {
            profilePicture,
            nameReg,
            lastNameReg,
            lastName2Reg,
            emailReg,
            nicknameReg,
            codeNumber,
            cellphone,
            ghin,
            handicapReg,
            strokesReg,
            difTeesReg,
            language,
            signo,
            signoTee
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
    console.warn(nameReg)
    console.warn(lastNameReg)
    console.warn(nicknameReg)
    console.warn(handicapReg)
    console.warn(ghin)
    console.warn(strokesReg)
    console.warn(difTeesReg)
    console.warn(idUsu)
    console.warn(signo)
    console.warn(signoTee)

    let strokesRegSigno = ''

    if(!signo)
        strokesRegSigno = '-'+strokesReg
    else
        strokesRegSigno = strokesReg
    console.warn(strokesRegSigno)

    let TeeRegSigno = ''

    if(!signoTee)
        TeeRegSigno = '-'+difTeesReg
    else
        TeeRegSigno = difTeesReg
    console.warn(TeeRegSigno)

      CrearInvitados(nameReg, lastNameReg, nicknameReg, handicapReg, ghin, strokesRegSigno, TeeRegSigno, idUsu)
      .then((res) => {
        console.warn(res)
        if (res.estatus == 1) {

          try {
           showMessage({
                message: 'Invitado guardado correctamente',
                type: "success",
              });

           console.warn(res.idusuario)

           this.GuardarFoto(res.idusuario)

           this.props.navigation.navigate("PlayersView")

          } catch (e) {

            showMessage({
                message: 'Ocurrió un error, favor de intentar más tarde' + e,
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

export default RegisterView;
