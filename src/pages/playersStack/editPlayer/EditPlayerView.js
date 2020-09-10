import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import PhoneInput from 'react-native-phone-input';
import * as Validations from '../../../utils/Validations';
import DragonButton from '../../global/DragonButton';
import FormatCellphone from '../../../utils/FormatCellphone';
import moment from "moment";
import styles from '../addPlayer/styles';
import Colors from '../../../utils/Colors';
import { actionUpdatePlayer } from '../../../store/actions';

class EditPlayerView extends Component {
  constructor(props) {
    super(props);

    const item = props.navigation.getParam('item');
    if (!item) {
      props.navigation.goBack();
    }

    this.state = {
      player: {
        id: item.id,
        name: item.name,
        last_name: item.last_name,
        email: item.email,
        ghin_number: item.ghin_number.toString(),
        nick_name: item.nick_name,
        handicap: item.handicap.toString(),
        strokes: item.strokes ? item.strokes.toString() : '0',
        tee: item.tee ? item.tee.toString() : '0',
        photo: item.photo,
        id_sync: null,
        ultimate_sync: '',
      },
      cellphone: this.firstFormatCellphone(),
      profilePicture: item.photo ? { uri: item.photo } : null,
      nameError: '',
      nicknameError: '',
      handicapError: '',
      emailError: '',
      ghinError: '',
      strokesError: '',
      teeError: '',
      phoneCode: '+52',
      codeNumber: '52',
      codeError: '',
      cellphoneError: '',
      deleting: false,
    };

    this.inputs = {};
  }

  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item', { name: '', lastName: '' });
    return {
      title: `${item.name} ${item.last_name}`,
    }
  };

  render() {

    const {
      player,
      profilePicture,
      nameError,
      lastNameError,
      nicknameError,
      handicapError,
      emailError,
      ghinError,
      strokesError,
      teeError,
      phoneCode,
      codeNumber,
      codeError,
      cellphoneError,
      cellphone
    } = this.state;

    const {
      language
    } = this.props;

    const {
      name: nameText,
      lastName: lastNameText,
      nickname: nicknameText,
      ghinNumber,
      email: emailText,
      photo,
      strokes: strokesText,
      code,
      cellphone: cellphoneText,
      save,
      difTees
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
          <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled">
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
              <View style={[styles.inputContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <View style={styles.twoInputContainer}>
                  <TextField
                    ref={ref => this.inputs['name'] = ref}
                    label={nameText[language]}
                    tintColor={Colors.Primary}
                    autoCapitalize="words"
                    onChangeText={(name) => this.updateTextInput(name, 'name')}
                    value={player.name}
                    error={nameError}
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.nameValidation(text)) {
                        this.focusNextField('lastName');
                      }
                    }}
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.twoInputContainer}>
                  <TextField
                    ref={ref => this.inputs['lastName'] = ref}
                    label={lastNameText[language]}
                    tintColor={Colors.Primary}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={(lastName) => this.updateTextInput(lastName, 'last_name')}
                    value={player.last_name}
                    error={lastNameError}
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.lastNameValidation(text)) {
                        this.focusNextField('email');
                      }
                    }}
                    blurOnSubmit={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <TextField
                  ref={ref => this.inputs['email'] = ref}
                  label={emailText[language]}
                  tintColor={Colors.Primary}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={(email) => this.updateTextInput(email, 'email')}
                  value={player.email}
                  error={emailError}
                  onSubmitEditing={({ nativeEvent: { text } }) => {
                    if (this.emailValidation(text)) {
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
                      keyboardType="numeric"
                      returnKeyType='done'
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
                        this.focusNextField('nickname');
                      }
                    }}
                    blurOnSubmit={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <TextField
                  ref={ref => this.inputs['nickname'] = ref}
                  label={nicknameText[language]}
                  tintColor={Colors.Primary}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={5}
                  onChangeText={(nickname) => this.updateTextInput(nickname.toUpperCase(), 'nick_name')}
                  value={player.nick_name}
                  error={nicknameError}
                  onSubmitEditing={({ nativeEvent: { text } }) => {
                    if (this.nicknameValidation(text)) {
                      this.focusNextField('ghin');
                    }
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={[styles.inputContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <View style={styles.twoInputContainer}>
                  <TextField
                    ref={ref => this.inputs['ghin'] = ref}
                    label={ghinNumber[language]}
                    tintColor={Colors.Primary}
                    autoCapitalize="none"
                    maxLength={7}
                    keyboardType="numeric"
                    returnKeyType='done'
                    onChangeText={(ghin) => this.updateTextInput(ghin, 'ghin_number')}
                    value={player.ghin_number}
                    error={ghinError}
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.ghinValidation(text)) {
                        this.focusNextField('handicap');
                      }
                    }}
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.twoInputContainer}>
                  <TextField
                    ref={ref => this.inputs['handicap'] = ref}
                    label="Handicap Index"
                    tintColor={Colors.Primary}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    returnKeyType='done'
                    onChangeText={(handicap) => this.updateTextInput(handicap, 'handicap')}
                    value={player.handicap}
                    error={handicapError}
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.handicapValidation(text)) {
                        this.focusNextField('strokes');
                      }
                    }}
                    blurOnSubmit={false}
                  />
                </View>
              </View>

              <View style={[styles.inputContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <View style={styles.twoInputContainer}>
                  <TextField
                    ref={ref => this.inputs['strokes'] = ref}
                    label={strokesText[language]}
                    tintColor={Colors.Primary}
                    autoCapitalize="none"
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    onChangeText={(strokes) => this.updateTextInput(strokes, 'strokes')}
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.strokesValidation(text)) {
                        this.focusNextField('tee');
                      }
                    }}
                    value={player.strokes}
                    error={strokesError}
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.twoInputContainer}>
                  <TextField
                    ref={ref => this.inputs['tee'] = ref}
                    label={difTees[language]}
                    tintColor={Colors.Primary}
                    autoCapitalize="none"
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    onChangeText={(tee) => this.updateTextInput(tee, 'tee')}
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.teeValidation(text)) {
                        this.inputs['tee'].blur();
                      }
                    }}
                    value={player.tee}
                    error={teeError}
                    blurOnSubmit={false}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: 20 }} />
          </ScrollView>

          <View style={styles.bottomButtom}>
            <DragonButton title={save[language]} onPress={this.submit} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  focusNextField = (field) => {
    this.inputs[field].focus();
  }

  updateTextInput = (text, field) => {
    const state = this.state;
    state.player[field] = text;
    state.player.ultimate_sync = moment().format('YYYY-MM-DD HH:mm:ss');
    this.setState(state);
  }

  firstFormatCellphone = () => {
    let { navigation: { state: { params: { item: { cellphone } } } } } = this.props;
    let formatted = '';
    let pureCell = '';
    if (cellphone.length > 10) {
      pureCell = cellphone.substr(cellphone.length - 10);
    }

    formatted = FormatCellphone(pureCell);

    return formatted;
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

  //================Validations==================

  cellphoneValidation = (cellphone) => {
    const response = Validations.phoneValidation(cellphone);
    this.setState({ cellphoneError: !response.ok ? response.error : '' });

    return response.ok;
  }

  codeValidation = (code) => {
    const response = Validations.intNumberValidation(code);
    this.setState({ codeError: !response.ok ? response.error : '' });

    return response.ok;
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
    if(!response.ok && email === '' && this.state.cellphone !== '') response.ok = true;
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
    if(!response.ok && cellphone === '' && this.state.player.email !== '') response.ok = true;
    this.setState({ cellphoneError: !response.ok ? response.error : '' });

    return response.ok;
  }

  ghinValidation = (ghin) => {
    let ok = true;
    const response = Validations.intNumberValidation(ghin);
    this.setState({ ghinError: !response.ok ? response.error : '' });
    if (response.ok) {
      if (ghin.length !== 7) {
        this.setState({ ghinError: Dictionary.ghinMustContain[this.props.language] });
        ok = false;
      }
    }

    return response.ok && ok;
  }

  handicapValidation = (handicap) => {
    const response = Validations.floatNumberValidation(handicap);
    this.setState({ handicapError: !response.ok ? response.error : '' });

    return response.ok;
  }

  strokesValidation = (strokes) => {
    let stroke = strokes;
    if (strokes.startsWith("-")) {
      stroke = stroke.substr(1);
    }

    const response = Validations.floatNumberValidation(stroke);
    this.setState({ strokesError: !response.ok ? response.error : '' });

    return response.ok;
  }

  teeValidation = (tee) => {
    let tees = tee;
    if (tees.startsWith("-")) {
      tees = tee.substr(1);
    }

    const response = Validations.intNumberValidation(tees);
    this.setState({ teeError: !response.ok ? response.error : '' });

    return response.ok;
  }

  submit = () => {
    let {
      player,
      codeNumber,
      cellphone
    } = this.state;

    const nameOk = this.nameValidation(player.name);
    const lastNameOk = this.lastNameValidation(player.last_name);
    const emailOk = this.emailValidation(player.email);
    const nicknameOk = this.nicknameValidation(player.nick_name);
    const codeNumberOk = this.codeValidation(codeNumber);
    const cellphoneOk = this.cellphoneValidation(cellphone);
    const ghinOk = this.ghinValidation(player.ghin_number);
    const handicapOk = this.handicapValidation(player.handicap);
    const strokesOk = this.strokesValidation(player.strokes);
    const teeOk = this.teeValidation(player.tee);

    const submitOk = (emailOk || cellphoneOk) && nameOk && lastNameOk
      && nicknameOk && codeNumberOk && ghinOk && handicapOk && strokesOk && teeOk;

    if (submitOk) {
      let cleaned = ('' + cellphone).replace(/\D/g, '');

      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) cellphone = match[1] + match[2] + match[3];

      player.cellphone = `+${codeNumber}${cellphone}`;
      player.ultimate_sync = moment().format('YYYY-MM-DD HH:mm:ss');
      player.editPlayer = true;
      const { profilePicture } = this.state;
      player.photo = profilePicture ? profilePicture.uri : player.photo;
      this.props.updatePlayer(player);
    }
  }
}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  userData: state.reducerUserData,
});

const mapDispatchToProps = dispatch => ({
  updatePlayer: (values) => {
    dispatch(actionUpdatePlayer(values));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlayerView);