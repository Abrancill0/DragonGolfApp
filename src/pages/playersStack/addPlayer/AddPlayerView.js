import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Switch,
  TextInput,
  Picker,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import { Dictionary } from '../../../utils/Dictionary';
import PhoneInput from 'react-native-phone-input';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import store from '../../../store/store';
import Collapsible from 'react-native-collapsible';
import styles from './styles';
import Colors from '../../../utils/Colors';
import * as Validations from '../../../utils/Validations';
import DragonButton from '../../global/DragonButton';
import { NavigationEvents } from 'react-navigation';
import FormatCellphone from '../../../utils/FormatCellphone';
import moment from "moment";
import { actionSavePlayer, actionGetSNWPlayer } from '../../../store/actions';

class AddPlayerView extends Component {
  constructor(props) {
    super(props);

    const { preferences } = props;
    let rabbit16 = '';
    let rabbit712 = '';
    let rabbit1318 = '';
    let medalF9 = '';
    let medalB9 = '';
    let medal18 = '';
    let skins = '';
    let skinCarryOver = false;
    let lowedAdv = false;
    let snwUseFactor = false;
    let snwAutoPressesEvery = '';
    let snwFront9 = '';
    let snwBack9 = '';
    let snwMatch = '';
    let snwCarry = '';
    let snwMedal = '';
    let tnwUseFactor = false;
    let tnwAutoPressesEvery = '';
    let tnwFront9 = '';
    let tnwBack9 = '';
    let tnwMatch = '';
    let tnwCarry = '';
    let tnwMedal = '';
    let whoGetAdvStrokes = 'each';
    let ebWager = '';
    let advantageMove = 'match';
    let strokesPerRound = '0.5';
    let advMovesHoles = false;
    let carryMoveAdv = false;
    let bbtWagerF9 = '';
    let bbtWagerB9 = '';
    let bbtWager18 = '';

    try {
      const { snwData } = preferences;
      snwUseFactor = preferences.snwData.tipo_calculo === 'factor';
      //============SNWDATA===============
      snwAutoPressesEvery = snwData.automatic_presses_every.toString();
      snwFront9 = snwUseFactor ? snwData.cantidad : snwData.front_9;
      snwBack9 = snwData.back_9;
      snwMatch = snwData.match;
      snwCarry = snwData.carry;
      snwMedal = snwData.medal;
      snwFront9 = snwFront9.toString();
      snwBack9 = snwBack9.toString();
      snwMatch = snwMatch.toString();
      snwCarry = snwCarry.toString();
      snwMedal = snwMedal.toString();
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: AddPlayerView, line: 64');
      console.log('====================================');
    }

    try {
      const { tnwData } = preferences;
      tnwUseFactor = preferences.tnwData.tipo_calculo === 'factor';
      //============TNWDATA===============
      tnwAutoPressesEvery = tnwData.automatic_presses_every.toString();
      tnwFront9 = tnwUseFactor ? tnwData.cantidad : tnwData.front_9;
      tnwBack9 = tnwData.back_9;
      tnwMatch = tnwData.match;
      tnwCarry = tnwData.carry;
      tnwMedal = tnwData.medal;
      whoGetAdvStrokes = tnwData.who_gets_the_adv_strokes.toString();
      tnwFront9 = tnwFront9.toString();
      tnwBack9 = tnwBack9.toString();
      tnwMatch = tnwMatch.toString();
      tnwCarry = tnwCarry.toString();
      tnwMedal = tnwMedal.toString();
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: AddPlayerView, line: 81');
      console.log('====================================');
    }

    try {
      const { gsData } = preferences;
      rabbit16 = gsData.rabbit_1_6;
      rabbit712 = gsData.rabbit_7_12;
      rabbit1318 = gsData.rabbit_13_18;
      medalF9 = gsData.medal_play_f9;
      medalB9 = gsData.medal_play_b9;
      medal18 = gsData.medal_play_18;
      skins = gsData.skins;
      skinCarryOver = !!gsData.skins_carry_over;
      lowedAdv = !!gsData.lowed_adv_on_f9;
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: AddPlayerView, line: 117');
      console.log('====================================');
    }

    try {
      const { ebData } = preferences;
      ebWager = ebData.wager;
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: AddPlayerView, line: 127');
      console.log('====================================');
    }

    try {
      const { asData } = preferences;
      advantageMove = asData.how_adv_move;
      strokesPerRound = asData.how_many_strokes;
      advMovesHoles = parseInt(asData.adv_moves) ? true : false;
      carryMoveAdv = parseInt(asData.carry_move_adv) ? true : false;
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: AddPlayerView, line: 146');
      console.log('====================================');
    }

    try {
      const { bbData } = preferences;
      bbtWagerF9 = bbData.wager_f9;
      bbtWagerB9 = bbData.wager_b9;
      bbtWager18 = bbData.wager_18;
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: AddPlayerView, line: 157');
      console.log('====================================');
    }

    this.state = {
      player: {
        name: '',
        last_name: '',
        email: '',
        cellphone: '',
        ghin_number: '',
        nick_name: '',
        handicap: '',
        strokes: '',
        tee: '',
        photo: '',
        id_sync: null,
        ultimate_sync: '',
      },
      profilePicture: null,
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
      asCollapsed: true,
      advantageMove,
      strokesPerRound,
      advMovesHoles,
      carryMoveAdv,
      gsCollapsed: true,
      rabbit16,
      rabbit712,
      rabbit1318,
      medalF9,
      medalB9,
      medal18,
      skins,
      skinCarryOver,
      lowedAdv,
      snwCollapsed: true,
      tnwCollapsed: true,
      ebCollapsed: true,
      bbtCollapsed: true,
      snwUseFactor,
      snwAutoPressesEvery,
      snwFront9,
      snwBack9,
      snwMatch,
      snwCarry,
      snwMedal,
      tnwUseFactor,
      tnwFront9,
      tnwAutoPressesEvery,
      tnwBack9,
      tnwMatch,
      tnwCarry,
      tnwMedal,
      whoGetAdvStrokes,
      ebWager,
      bbtWagerF9,
      bbtWagerB9,
      bbtWager18
    };

    this.inputs = {};
  }

  static navigationOptions = ({ navigation }) => {
    const state = store.getState();
    const language = state.reducerLanguage;
    return {
      title: navigation.getParam('Title', Dictionary.addPlayer[language]),
    }
  };

  updateTextInput = (text, field) => {
    const state = this.state;
    state.player[field] = text;
    state.player.ultimate_sync = moment().format('YYYY-MM-DD HH:mm:ss');
    this.setState(state);
  }

  render() {

    const {
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
      asCollapsed,
      advantageMove,
      strokesPerRound,
      advMovesHoles,
      carryMoveAdv,
      gsCollapsed,
      rabbit16,
      rabbit712,
      rabbit1318,
      medalF9,
      medalB9,
      medal18,
      skins,
      skinCarryOver,
      lowedAdv,
      snwCollapsed,
      tnwCollapsed,
      ebCollapsed,
      bbtCollapsed,
      snwUseFactor,
      snwAutoPressesEvery,
      snwFront9,
      snwBack9,
      snwMatch,
      snwCarry,
      snwMedal,
      tnwUseFactor,
      tnwAutoPressesEvery,
      tnwFront9,
      tnwBack9,
      tnwMatch,
      tnwCarry,
      tnwMedal,
      whoGetAdvStrokes,
      ebWager,
      bbtWagerF9,
      bbtWagerB9,
      bbtWager18,
      player
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
      match,
      money,
      howAdvantage,
      strokesPerRound: strokesPerRoundText,
      advMoves,
      carryMove,
      advSettings,
      generalSettings,
      whoGetsAdv,
      autoPress,
      save,
      useFactor: useFactorText,
      difTees
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={this.changeTitleText}
        />
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
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.nameValidation(text)) {
                        this.focusNextField('lastName');
                      }
                    }}
                    error={nameError}
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
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.lastNameValidation(text)) {
                        this.focusNextField('email');
                      }
                    }}
                    error={lastNameError}
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
                  onSubmitEditing={({ nativeEvent: { text } }) => {
                    if (this.emailValidation(text)) {
                      this.focusNextField('cellphone');
                    }
                  }}
                  error={emailError}
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
                    value={player.cellphone}
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
                  onSubmitEditing={({ nativeEvent: { text } }) => {
                    if (this.nicknameValidation(text)) {
                      this.focusNextField('ghin');
                    }
                  }}
                  error={nicknameError}
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
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.ghinValidation(text)) {
                        this.focusNextField('handicap');
                      }
                    }}
                    error={ghinError}
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
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                      if (this.handicapValidation(text)) {
                        this.focusNextField('strokes');
                      }
                    }}
                    error={handicapError}
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
                        this.focusNextField('tee')
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

            <TouchableOpacity
              style={styles.asButton}
              onPress={() => this.setState({ asCollapsed: !asCollapsed })}
            >
              <Text style={styles.asButtonText}>{advSettings[language]}</Text>
              <Ionicon name={asCollapsed ? 'chevron-down' : 'chevron-up'} size={20} color={Colors.Black} />
            </TouchableOpacity>
            <Collapsible collapsed={asCollapsed}>
              {!asCollapsed && <View style={styles.asView}>
                <RadioButton.Group
                  onValueChange={advantageMove => this.setState({ advantageMove })}
                  value={advantageMove}
                >
                  <Text style={styles.question}>{howAdvantage[language]}</Text>
                  <View style={styles.radioGroupView}>
                    <View style={styles.radioButtonView}>
                      <RadioButton value="match" color={Colors.Primary} />
                      <TouchableOpacity
                        onPress={() => this.setState({ advantageMove: 'match' })}
                      >
                        <Text style={[styles.radioButtonText, { color: advantageMove === 'match' ? Colors.Primary : Colors.Black }]}>{match[language]}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.radioButtonView}>
                      <RadioButton value="money" color={Colors.Primary} />
                      <TouchableOpacity
                        onPress={() => this.setState({ advantageMove: 'money' })}
                      >
                        <Text style={[styles.radioButtonText, { color: advantageMove === 'money' ? Colors.Primary : Colors.Black }]}>{money[language]}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </RadioButton.Group>

                <RadioButton.Group
                  onValueChange={strokesPerRound => this.setState({ strokesPerRound })}
                  value={strokesPerRound}
                >
                  <Text style={styles.question}>{strokesPerRoundText[language]}</Text>
                  <View style={styles.radioGroupView}>
                    <View style={styles.radioButtonView}>
                      <RadioButton value={'0.5'} color={Colors.Primary} />
                      <TouchableOpacity
                        onPress={() => this.setState({ strokesPerRound: '0.5' })}
                      >
                        <Text style={[styles.radioButtonText, { color: strokesPerRound === ' 0.5' ? Colors.Primary : Colors.Black }]}>0.5</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.radioButtonView}>
                      <RadioButton value={'1'} color={Colors.Primary} />
                      <TouchableOpacity
                        onPress={() => this.setState({ strokesPerRound: '1' })}
                      >
                        <Text style={[styles.radioButtonText, { color: strokesPerRound === '1' ? Colors.Primary : Colors.Black }]}>1</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.radioButtonView}>
                      <RadioButton value={'2'} color={Colors.Primary} />
                      <TouchableOpacity
                        onPress={() => this.setState({ strokesPerRound: '2' })}
                      >
                        <Text style={[styles.radioButtonText, { color: strokesPerRound === '2' ? Colors.Primary : Colors.Black }]}>2</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </RadioButton.Group>

                <View style={styles.switchView}>
                  <Text style={styles.question} numberOfLines={2}>{advMoves[language]}</Text>
                  <Switch
                    value={advMovesHoles}
                    thumbColor={advMovesHoles ? Colors.Primary : Colors.Gray}
                    trackColor={{ true: Colors.PrimaryWithOpacity }}
                    onValueChange={(advMovesHoles) => this.setState({ advMovesHoles })}
                  />
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>{carryMove[language]}</Text>
                  <Switch
                    value={carryMoveAdv}
                    thumbColor={carryMoveAdv ? Colors.Primary : Colors.Gray}
                    trackColor={{ true: Colors.PrimaryWithOpacity }}
                    onValueChange={(carryMoveAdv) => this.setState({ carryMoveAdv })}
                  />
                </View>
              </View>}
            </Collapsible>

            <TouchableOpacity
              style={styles.asButton}
              onPress={() => this.setState({ gsCollapsed: !gsCollapsed })}
            >
              <Text style={styles.asButtonText}>{generalSettings[language]}</Text>
              <Ionicon name={gsCollapsed ? 'chevron-down' : 'chevron-up'} size={20} color={Colors.Black} />
            </TouchableOpacity>

            <Collapsible collapsed={gsCollapsed}>
              {!gsCollapsed && <View style={styles.asView}>
                <View style={styles.switchView}>
                  <Text style={styles.question}>Rabbit 1-6</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(rabbit16) => this.setState({ rabbit16 })}
                      value={rabbit16}
                      onSubmitEditing={_ => this.focusNextField('gs2')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Rabbit 7-12</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(rabbit712) => this.setState({ rabbit712 })}
                      value={rabbit712}
                      ref={ref => this.inputs['gs2'] = ref}
                      onSubmitEditing={_ => this.focusNextField('gs3')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Rabbit 13-18</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(rabbit1318) => this.setState({ rabbit1318 })}
                      value={rabbit1318}
                      ref={ref => this.inputs['gs3'] = ref}
                      onSubmitEditing={_ => this.focusNextField('gs4')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Medal Play F9</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(medalF9) => this.setState({ medalF9 })}
                      value={medalF9}
                      ref={ref => this.inputs['gs4'] = ref}
                      onSubmitEditing={_ => this.focusNextField('gs5')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Medal Play B9</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(medalB9) => this.setState({ medalB9 })}
                      value={medalB9}
                      ref={ref => this.inputs['gs5'] = ref}
                      onSubmitEditing={_ => this.focusNextField('gs6')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Medal Play 18</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(medal18) => this.setState({ medal18 })}
                      value={medal18}
                      ref={ref => this.inputs['gs6'] = ref}
                      onSubmitEditing={_ => this.focusNextField('gs7')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Skins</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(skins) => this.setState({ skins })}
                      value={skins}
                      ref={ref => this.inputs['gs7'] = ref}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Skin Carry Over</Text>
                  <Switch
                    value={skinCarryOver}
                    thumbColor={skinCarryOver ? Colors.Primary : Colors.Gray}
                    trackColor={{ true: Colors.PrimaryWithOpacity }}
                    onValueChange={(skinCarryOver) => this.setState({ skinCarryOver })}
                  />
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Lowed Adv On F9</Text>
                  <Switch
                    value={lowedAdv}
                    thumbColor={lowedAdv ? Colors.Primary : Colors.Gray}
                    trackColor={{ true: Colors.PrimaryWithOpacity }}
                    onValueChange={(lowedAdv) => this.setState({ lowedAdv })}
                  />
                </View>

              </View>}
            </Collapsible>

            <TouchableOpacity
              style={styles.asButton}
              onPress={() => this.setState({ snwCollapsed: !snwCollapsed })}
            >
              <Text style={styles.asButtonText}>Single Nassau Wagers</Text>
              <Ionicon name={snwCollapsed ? 'chevron-down' : 'chevron-up'} size={20} color={Colors.Black} />
            </TouchableOpacity>

            <Collapsible collapsed={snwCollapsed}>
              {!snwCollapsed && <View style={styles.asView}>

                <View style={styles.switchView}>
                  <Text style={styles.question}>{autoPress[language]}</Text>
                  <View style={styles.costInputView}>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={2}
                      onChangeText={(snwAutoPressesEvery) => this.setState({ snwAutoPressesEvery })}
                      value={snwAutoPressesEvery}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>{useFactorText[language]}</Text>
                  <Switch
                    value={snwUseFactor}
                    thumbColor={snwUseFactor ? Colors.Primary : Colors.Gray}
                    trackColor={{ true: Colors.PrimaryWithOpacity }}
                    onValueChange={(snwUseFactor) => this.setState({ snwUseFactor })}
                  />
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Front 9</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={this.onChangeSNWFront}
                      value={snwFront9}
                      ref={ref => this.inputs['snw2'] = ref}
                      onSubmitEditing={_ => this.focusNextField('snw3')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Back 9</Text>
                  <View style={styles.costInputView}>
                    {!snwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(snwBack9) => this.setState({ snwBack9 })}
                      value={snwBack9}
                      ref={ref => this.inputs['snw3'] = ref}
                      onSubmitEditing={_ => this.focusNextField('snw4')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Match</Text>
                  <View style={styles.costInputView}>
                    {!snwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(snwMatch) => this.setState({ snwMatch })}
                      value={snwMatch}
                      ref={ref => this.inputs['snw4'] = ref}
                      onSubmitEditing={_ => this.focusNextField('snw5')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Carry</Text>
                  <View style={styles.costInputView}>
                    {!snwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(snwCarry) => this.setState({ snwCarry })}
                      value={snwCarry}
                      ref={ref => this.inputs['snw5'] = ref}
                      onSubmitEditing={_ => this.focusNextField('snw6')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Medal</Text>
                  <View style={styles.costInputView}>
                    {!snwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(snwMedal) => this.setState({ snwMedal })}
                      value={snwMedal}
                      ref={ref => this.inputs['snw6'] = ref}
                    />
                  </View>
                </View>

              </View>}
            </Collapsible>

            <TouchableOpacity
              style={styles.asButton}
              onPress={() => this.setState({ tnwCollapsed: !tnwCollapsed })}
            >
              <Text style={styles.asButtonText}>Team Nassau Wagers</Text>
              <Ionicon name={tnwCollapsed ? 'chevron-down' : 'chevron-up'} size={20} color={Colors.Black} />
            </TouchableOpacity>

            <Collapsible collapsed={tnwCollapsed}>
              {!tnwCollapsed && <View style={styles.asView}>

                <View style={styles.switchView}>
                  <Text style={styles.question}>{autoPress[language]}</Text>
                  <View style={styles.costInputView}>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={2}
                      onChangeText={(tnwAutoPressesEvery) => this.setState({ tnwAutoPressesEvery })}
                      value={tnwAutoPressesEvery}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>{useFactorText[language]}</Text>
                  <Switch
                    value={tnwUseFactor}
                    thumbColor={tnwUseFactor ? Colors.Primary : Colors.Gray}
                    trackColor={{ true: Colors.PrimaryWithOpacity }}
                    onValueChange={(tnwUseFactor) => this.setState({ tnwUseFactor })}
                  />
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Front 9</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={this.onChangeTNWFront}
                      value={tnwFront9}
                      ref={ref => this.inputs['tnw2'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw3')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Back 9</Text>
                  <View style={styles.costInputView}>
                    {!tnwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwBack9) => this.setState({ tnwBack9 })}
                      value={tnwBack9}
                      ref={ref => this.inputs['tnw3'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw4')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Match</Text>
                  <View style={styles.costInputView}>
                    {!tnwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwMatch) => this.setState({ tnwMatch })}
                      value={tnwMatch}
                      ref={ref => this.inputs['tnw4'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw5')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Carry</Text>
                  <View style={styles.costInputView}>
                    {!tnwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwCarry) => this.setState({ tnwCarry })}
                      value={tnwCarry}
                      ref={ref => this.inputs['tnw5'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw6')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Medal</Text>
                  <View style={styles.costInputView}>
                    {!tnwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwMedal) => this.setState({ tnwMedal })}
                      value={tnwMedal}
                      ref={ref => this.inputs['tnw6'] = ref}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.switchText}>{whoGetsAdv[language]}</Text>
                    <Picker
                      mode="dropdown"
                      selectedValue={whoGetAdvStrokes}
                      onValueChange={(whoGetAdvStrokes) =>
                        this.setState({ whoGetAdvStrokes })
                      }>
                      <Picker.Item label="Hi Handicap" value="hihcp" />
                      <Picker.Item label="Low Handicap" value="lowhcp" />
                      <Picker.Item label="Each" value="each" />
                      <Picker.Item label="Slid Hi" value="slidhi" />
                      <Picker.Item label="Slid Low" value="slidlow" />
                    </Picker>
                  </View>
                </View>

              </View>}
            </Collapsible>

            <TouchableOpacity
              style={styles.asButton}
              onPress={() => this.setState({ ebCollapsed: !ebCollapsed })}
            >
              <Text style={styles.asButtonText}>Extra Bets</Text>
              <Ionicon name={ebCollapsed ? 'chevron-down' : 'chevron-up'} size={20} color={Colors.Black} />
            </TouchableOpacity>

            <Collapsible collapsed={ebCollapsed}>
              {!ebCollapsed && <View style={styles.asView}>
                <View style={styles.switchView}>
                  <Text style={styles.question}>Wager</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(ebWager) => this.setState({ ebWager })}
                      value={ebWager}
                    />
                  </View>
                </View>
              </View>
              }
            </Collapsible>

            <TouchableOpacity
              style={styles.asButton}
              onPress={() => this.setState({ bbtCollapsed: !bbtCollapsed })}
            >
              <Text style={styles.asButtonText}>Best Ball Teams</Text>
              <Ionicon name={bbtCollapsed ? 'chevron-down' : 'chevron-up'} size={20} color={Colors.Black} />
            </TouchableOpacity>

            <Collapsible collapsed={bbtCollapsed}>
              {!bbtCollapsed && <View style={styles.asView}>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Wager F9</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(bbtWagerF9) => this.setState({ bbtWagerF9 })}
                      value={bbtWagerF9}
                      onSubmitEditing={_ => this.focusNextField('bbt2')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Wager B9</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(bbtWagerB9) => this.setState({ bbtWagerB9 })}
                      value={bbtWagerB9}
                      ref={ref => this.inputs['bbt2'] = ref}
                      onSubmitEditing={_ => this.focusNextField('bbt3')}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Wager 18</Text>
                  <View style={styles.costInputView}>
                    <Text style={styles.dollarText}>$</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Primary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(bbtWager18) => this.setState({ bbtWager18 })}
                      value={bbtWager18}
                      ref={ref => this.inputs['bbt3'] = ref}
                    />
                  </View>
                </View>

              </View>
              }
            </Collapsible>
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

  formatCellphone = (cellphone) => {

    const formatted = FormatCellphone(cellphone);
    const state = this.state;
    if (!this.state.deleting) {
      state.player.cellphone = formatted;
      state.player.ultimate_sync = moment().format('YYYY-MM-DD HH:mm:ss');
      this.setState(state);
    } else {
      state.player.cellphone = cellphone;
      state.deleting = false;
      state.player.ultimate_sync = moment().format('YYYY-MM-DD HH:mm:ss');
      this.setState(state);
    }
  }

  onChangeSNWFront = (snwFront9) => {
    const { preferences } = this.props;
    let snwBack9 = '';
    let snwMatch = '';
    let snwCarry = '';
    let snwMedal = '';

    try {
      const { snwData } = preferences;
      const factor = preferences.tipo_calculo === 'factor';
      //============SNWDATA===============
      snwBack9 = factor ? snwFront9 * snwData.back_9 : snwData.back_9;
      snwMatch = factor ? snwFront9 * snwData.match : snwData.match;
      snwCarry = factor ? snwFront9 * snwData.carry : snwData.carry;
      snwMedal = factor ? snwFront9 * snwData.medal : snwData.medal;
      snwBack9 = snwBack9.toString();
      snwMatch = snwMatch.toString();
      snwCarry = snwCarry.toString();
      snwMedal = snwMedal.toString();
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: AddPlayerView, line: 1019');
      console.log('====================================');
    }

    this.setState({
      snwFront9,
      snwBack9,
      snwCarry,
      snwMatch,
      snwMedal
    });
  }

  onChangeTNWFront = (tnwFront9) => {
    const { preferences } = this.props;
    let tnwBack9 = '';
    let tnwMatch = '';
    let tnwCarry = '';
    let tnwMedal = '';

    try {
      const { tnwData } = preferences;
      const factor = preferences.tipo_calculo === 'factor';
      //============SNWDATA===============
      tnwBack9 = factor ? tnwFront9 * tnwData.back_9 : tnwData.back_9;
      tnwMatch = factor ? tnwFront9 * tnwData.match : tnwData.match;
      tnwCarry = factor ? tnwFront9 * tnwData.carry : tnwData.carry;
      tnwMedal = factor ? tnwFront9 * tnwData.medal : tnwData.medal;
      tnwBack9 = tnwBack9.toString();
      tnwMatch = tnwMatch.toString();
      tnwCarry = tnwCarry.toString();
      tnwMedal = tnwMedal.toString();
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: AddPlayerView, line: 1019');
      console.log('====================================');
    }

    this.setState({
      tnwFront9,
      tnwBack9,
      tnwCarry,
      tnwMatch,
      tnwMedal
    });
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
    if(!response.ok && email === '' && this.state.player.cellphone !== '') response.ok = true;
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

  snwValidations = () => {

    const {
      snwAutoPressesEvery,
      snwFront9,
      snwBack9,
      snwMatch,
      snwCarry,
      snwMedal
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: autoPressOk } = Validations.intNumberValidation(snwAutoPressesEvery ? snwAutoPressesEvery : 1);
    if (!autoPressOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} ${Dictionary.autoPress[language]} ${Dictionary.from[language]} Single Nassau Wagers`
      );
      return false;
    }

    const { ok: front9Ok } = Validations.floatNumberValidation(snwFront9 ? snwFront9 : 1);
    if (!front9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Front 9 ${Dictionary.from[language]} Single Nassau Wagers`
      );
      return false;
    }

    const { ok: back9Ok } = Validations.floatNumberValidation(snwBack9 ? snwBack9 : 1);
    if (!back9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Back 9 ${Dictionary.from[language]} Single Nassau Wagers`
      );
      return false;
    }

    const { ok: matchOk } = Validations.floatNumberValidation(snwMatch ? snwMatch : 1);
    if (!matchOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Match ${Dictionary.from[language]} Single Nassau Wagers`
      );
      return false;
    }

    const { ok: carryOk } = Validations.floatNumberValidation(snwCarry ? snwCarry : 1);
    if (!carryOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Carry ${Dictionary.from[language]} Single Nassau Wagers`
      );
      return false;
    }

    const { ok: medalOk } = Validations.floatNumberValidation(snwMedal ? snwMedal : 1);
    if (!medalOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Medal ${Dictionary.from[language]} Single Nassau Wagers`
      );
      return false;
    }

    return true;

  }

  tnwValidations = () => {

    const {
      tnwAutoPressesEvery,
      tnwBack9,
      tnwCarry,
      tnwFront9,
      tnwMatch,
      tnwMedal
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: autoPressOk } = Validations.intNumberValidation(tnwAutoPressesEvery ? tnwAutoPressesEvery : 1);
    if (!autoPressOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} ${Dictionary.autoPress[language]} ${Dictionary.from[language]} Team Nassau Wagers`
      );
      return false;
    }

    const { ok: front9Ok } = Validations.floatNumberValidation(tnwFront9 ? tnwFront9 : 1);
    if (!front9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Front 9 ${Dictionary.from[language]} Team Nassau Wagers`
      );
      return false;
    }

    const { ok: back9Ok } = Validations.floatNumberValidation(tnwBack9 ? tnwBack9 : 1);
    if (!back9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Back 9 ${Dictionary.from[language]} Team Nassau Wagers`
      );
      return false;
    }

    const { ok: matchOk } = Validations.floatNumberValidation(tnwMatch ? tnwMatch : 1);
    if (!matchOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Match ${Dictionary.from[language]} Team Nassau Wagers`
      );
      return false;
    }

    const { ok: carryOk } = Validations.floatNumberValidation(tnwCarry ? tnwCarry : 1);
    if (!carryOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Carry ${Dictionary.from[language]} Team Nassau Wagers`
      );
      return false;
    }

    const { ok: medalOk } = Validations.floatNumberValidation(tnwMedal ? tnwMedal : 1);
    if (!medalOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Medal ${Dictionary.from[language]} Team Nassau Wagers`
      );
      return false;
    }

    return true;
  }

  gsValidations = () => {

    const {
      rabbit16,
      rabbit712,
      rabbit1318,
      medalF9,
      medalB9,
      medal18,
      skins,
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: rabbit16Ok } = Validations.floatNumberValidation(rabbit16 ? rabbit16 : 1);
    if (!rabbit16Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Rabbit 1-6 ${Dictionary.from[language]} ${Dictionary.generalSettings[language]}`
      );
      return false;
    }

    const { ok: rabbit712Ok } = Validations.floatNumberValidation(rabbit712 ? rabbit712 : 1);
    if (!rabbit712Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Rabbit 7-12 ${Dictionary.from[language]} ${Dictionary.generalSettings[language]}`
      );
      return false;
    }

    const { ok: rabbit1318Ok } = Validations.floatNumberValidation(rabbit1318 ? rabbit1318 : 1);
    if (!rabbit1318Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Rabbit 13-18 ${Dictionary.from[language]} ${Dictionary.generalSettings[language]}`
      );
      return false;
    }

    const { ok: medalF9Ok } = Validations.floatNumberValidation(medalF9 ? medalF9 : 1);
    if (!medalF9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Medal Play F9 ${Dictionary.from[language]} ${Dictionary.generalSettings[language]}`
      );
      return false;
    }

    const { ok: medalB9Ok } = Validations.floatNumberValidation(medalB9 ? medalB9 : 1);
    if (!medalB9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Medal Play B9 ${Dictionary.from[language]} ${Dictionary.generalSettings[language]}`
      );
      return false;
    }

    const { ok: medal18Ok } = Validations.floatNumberValidation(medal18 ? medal18 : 1);
    if (!medal18Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Medal Play 18 ${Dictionary.from[language]} ${Dictionary.generalSettings[language]}`
      );
      return false;
    }

    const { ok: skinsOk } = Validations.floatNumberValidation(skins ? skins : 1);
    if (!skinsOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Skins ${Dictionary.from[language]} ${Dictionary.generalSettings[language]}`
      );
      return false;
    }

    return true;

  }

  bbValidations = () => {
    const {
      bbtWagerF9,
      bbtWagerB9,
      bbtWager18
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: wagerF9Ok } = Validations.floatNumberValidation(bbtWagerF9 ? bbtWagerF9 : 1);
    if (!wagerF9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Wager F9 ${Dictionary.from[language]} Best Ball Teams`
      );
      return false;
    }

    const { ok: wagerB9Ok } = Validations.floatNumberValidation(bbtWagerB9 ? bbtWagerB9 : 1);
    if (!wagerB9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Wager B9 ${Dictionary.from[language]} Best Ball Teams`
      );
      return false;
    }

    const { ok: wager18Ok } = Validations.floatNumberValidation(bbtWager18 ? bbtWager18 : 1);
    if (!wager18Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Wager 18 ${Dictionary.from[language]} Best Ball Teams`
      );
      return false;
    }

    return true;
  }

  submit = () => {
    const {
      player,
      codeNumber
    } = this.state;

    const nameOk = this.nameValidation(player.name);
    const lastNameOk = this.lastNameValidation(player.last_name);
    const emailOk = this.emailValidation(player.email);
    const nicknameOk = this.nicknameValidation(player.nick_name);
    const codeNumberOk = this.codeValidation(codeNumber);
    const cellphoneOk = this.cellphoneValidation(player.cellphone);
    const ghinOk = this.ghinValidation(player.ghin_number);
    const handicapOk = this.handicapValidation(player.handicap);
    const strokesOk = this.strokesValidation(player.strokes);
    const teeOk = this.teeValidation(player.tee);
    const snwOk = this.snwValidations();
    const tnwOk = this.tnwValidations();
    const gsOk = this.gsValidations();

    const submitOk = (emailOk || cellphoneOk) && nameOk && lastNameOk && nicknameOk
      && codeNumberOk && ghinOk && handicapOk && strokesOk && snwOk && tnwOk && gsOk && teeOk;

    if (submitOk) {
      let cleaned = ('' + player.cellphone).replace(/\D/g, '');

      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) player.cellphone = match[1] + match[2] + match[3];

      player.cellphone = `+${codeNumber}${player.cellphone}`;
      player.ultimate_sync = moment().format('YYYY-MM-DD HH:mm:ss');
      const { profilePicture } = this.state;
      player.photo = profilePicture ? profilePicture.uri : '';
      const {
        snwAutoPressesEvery,
        snwUseFactor,
        snwFront9,
        snwBack9,
        snwMatch,
        snwCarry,
        snwMedal
      } = this.state;

      const snwData = {
        automatic_presses_every: snwAutoPressesEvery,
        use_factor: snwUseFactor ? 'factor' : 'value',
        cantidad: snwFront9,
        front_9: snwUseFactor ? 1 : snwFront9,
        back_9: snwBack9,
        match: snwMatch,
        medal: snwMedal,
        carry: snwCarry,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const {
        tnwAutoPressesEvery,
        tnwUseFactor,
        tnwFront9,
        tnwBack9,
        tnwMatch,
        tnwCarry,
        tnwMedal,
        whoGetAdvStrokes
      } = this.state;

      const tnwData = {
        automatic_presses_every: tnwAutoPressesEvery,
        use_factor: tnwUseFactor ? 'factor' : 'value',
        cantidad: tnwFront9,
        front_9: tnwUseFactor ? 1 : tnwFront9,
        back_9: tnwBack9,
        match: tnwMatch,
        medal: tnwMedal,
        carry: tnwCarry,
        who_gets_the_adv_strokes: whoGetAdvStrokes,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const {
        rabbit16,
        rabbit712,
        rabbit1318,
        medalF9,
        medalB9,
        medal18,
        skins,
        skinCarryOver,
        lowedAdv
      } = this.state;

      const gsData = {
        rabbit_1_6: rabbit16,
        rabbit_7_12: rabbit712,
        rabbit_13_18: rabbit1318,
        medal_play_f9: medalF9,
        medal_play_b9: medalB9,
        medal_play_18: medal18,
        skins,
        skins_carry_over: skinCarryOver,
        lowed_adv_on_f9: lowedAdv,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const {
        ebWager
      } = this.state;

      const ebData = {
        wager: ebWager,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const {
        advantageMove,
        strokesPerRound,
        advMovesHoles,
        carryMoveAdv
      } = this.state;

      const asData = {
        advantage_move: advantageMove,
        strokes_moved_per_round: strokesPerRound,
        adv_mov_if_only_9_holes: advMovesHoles ? 1 : 0,
        does_the_carry_move: carryMoveAdv ? 1 : 0,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const {
        bbtWagerF9,
        bbtWagerB9,
        bbtWager18
      } = this.state;

      const bbData = {
        wager_f9: bbtWagerF9,
        wager_b9: bbtWagerB9,
        wager_18: bbtWager18,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      this.props.savePlayer({
        player,
        asData,
        bbData,
        snwData,
        tnwData,
        gsData,
        ebData
      });
    }
  }


  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: Dictionary.addPlayer[this.props.language]
    });
  }

}
const mapStateToProps = state => ({
  language: state.reducerLanguage,
  userData: state.reducerUserData,
  preferences: state.reducerPreferences,
});

const mapDispatchToProps = dispatch => ({
  savePlayer: (player) => {
    dispatch(actionSavePlayer(player))
  },
  getSNW: (player) => {
    dispatch(actionGetSNWPlayer(player));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayerView);