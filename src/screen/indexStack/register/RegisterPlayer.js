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
import ImagePicker from 'react-native-image-crop-picker';
import PhoneInput from 'react-native-phone-input'
import styles from './styles';
import Colors from '../../../utils/Colors';
import { Dictionary } from '../../../utils/Dictionary';
import { showMessage } from "react-native-flash-message";
import { RegistroAB, SubirImagenUsuario } from '../../../Services/Services'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNRestart from 'react-native-restart'
import AsyncStorage from '@react-native-community/async-storage';
import DragonButton from '../../../pages/global/DragonButton';

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
            difTees
        } = Dictionary;

class RegisterView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: props.route.params.language,
            profilePicture: null,
            phoneCode: '+52',
            codeNumber: '52',
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
            ghin: '',
            ghinError: '',
            handicap: '',
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
            handicapError,
            passwordError,
            confirmPasswordError,
            seePassword,
            confirmseePassword
        } = this.state

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#FFFFFF"
                    barStyle="dark-content"
                    translucent={false}
                />
                <KeyboardAvoidingView style={styles.body} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
                    <ScrollView style={{ flex: 1, paddingTop: 20}} keyboardShouldPersistTaps='handled'>
                        <TouchableOpacity style={{paddingTop:30, paddingLeft:10}} onPress={()=> this.props.navigation.goBack()}>
                          <MaterialIcon name={'arrow-back'} size={30} color={Colors.Primary} />
                        </TouchableOpacity> 
                          <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
                            <Text style={{ paddingBottom:20, fontSize: 16, fontFamily: 'Montserrat',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>Create Player</Text>
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
                                        this.lastNameIn2.focus();
                                    }}
                                />
                            </View>
                            <View style={styles.inputContainer}>
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
                                            this.passIn.focus();
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
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.ghinIn = ref}
                                    label={strokes[language]}
                                    maxLength={7}
                                    tintColor={Colors.Primary}
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    onChangeText={(ghin) => this.setState({ ghin })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.handicapIn = ref}
                                    label={difTees[language]}
                                    tintColor={Colors.Primary}
                                    keyboardType="numeric"
                                    maxLength={5}
                                    autoCapitalize="none"
                                    onChangeText={(handicap) => this.setState({ handicap })}
                                />
                            </View>
                        </View>
                    </ScrollView>
                        <View style={[styles.bottomButtom, {paddingTop:10}]}>
                            <DragonButton title={create[language]} /*onPress={this.submit}*/ />
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
              { cancelable: false }
            );
          }
        });
    }
  }

    submit = async () => {
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
      RegistroAB(nameReg, lastNameReg, lastName2Reg, emailReg, passwordReg, nicknameReg, codeNumber + cellphone)
      .then((res) => {
        console.warn(res)
        if (res.estatus == 1) {

          try {
           showMessage({
                message: 'Registro guardado correctamente',
                type: "success",
              });

           console.warn(res.Result[0].IDUsuario)

           this.GuardarFoto(res.Result[0].IDUsuario)

           setTimeout(
                  () => { RNRestart.Restart();
                   },
                  2000
                )

                AsyncStorage.setItem('usu_id', res.Result[0].IDUsuario.toString());
                AsyncStorage.setItem('actualizar', "false");

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
