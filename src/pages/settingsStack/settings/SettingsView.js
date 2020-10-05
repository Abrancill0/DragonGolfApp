import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Picker,
  TextInput,
  ScrollView,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Dictionary } from '../../../utils/Dictionary';
import HeaderButton from '../../global/HeaderButton';
import Colors from '../../../utils/Colors';
import styles from './styles';
import { setLanguage, getSessionToken } from '../../../utils/Session';
import DragonButton from '../../global/DragonButton';
import FormatCellphone from '../../../utils/FormatCellphone';
import Ripple from 'react-native-material-ripple';
//import * as Validations from '../../../utils/Validations';
import moment from 'moment';
import { RadioButton } from 'react-native-paper';
import Details from '../../../utils/Details';
import AsyncStorage from '@react-native-community/async-storage';
import { InfoUsuario, updateSettings } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";
// import * as Animatable from 'react-native-animatable';
import { openDatabase } from 'react-native-sqlite-storage';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Spinner from 'react-native-loading-spinner-overlay';

var db = openDatabase({ name: 'DragonGolf.db' });

const BlankProfile = require('../../../../assets/globals/blank-profile.png');

class SettingsView extends Component {
  constructor(props) {
    super(props);

    this.havePreferences = false;
    this.state={
      status: true,
      userData: [],
      language:'en',
      asHowAdvMove : 'Match',
      asHowManyStrokes : '0.50',
      asAdvMoves : false,
      asDoesCarryMove : false,
      rabbit16 : '',
      rabbit712 : '',
      rabbit1318 : '',
      medalF9 : '',
      medalB9 : '',
      medal18 : '',
      skins : '',
      skinCarry : 0,
      lowedAdv : false,
      snwAutoPress : '2',
      snwFront9 : '',
      snwBack9 : '',
      snwMatch : '',
      snwCarry : '',
      snwMedal : '',
      snwUseFactor : false,
      snwValueFactor : '',
      tnwAutoPress : '2',
      tnwFront9 : '',
      tnwBack9 : '',
      tnwMatch : '',
      tnwCarry : '',
      tnwMedal : '',
      tnwWhoGets : 'each',
      tnwUseFactor : false,
      tnwValueFactor : '',
      ebWager : '',
      ssDoubleEagle : '5',
      ssEaglePoints : '4',
      ssBirdie : '3',
      ssPar : '2',
      ssBogey : '1',
      ssDoubleBogey : '0',
      bbWagerF9 : '',
      bbWagerB9 : '',
      bbWager18 : '',
    }
    
    this.getUserData();

    this.inputs = {};
  }

  static navigationOptions = ({ navigation }) => {
    const state = store.getState();
    const language = state.reducerLanguage;
    return {
      title: navigation.getParam('Title', Dictionary.settings[language]),
      headerRight: (
        <HeaderButton
          iconName="ios-log-out"
          color={Colors.Primary}
          onPress={() =>
            Alert.alert(
              Dictionary.signOutAsk[language],
              '',
              [
                { text: Dictionary.cancel[language], style: 'cancel' },
                { text: Dictionary.signOut[language], onPress: () => store.dispatch(actionSignOut()) },
              ]
            )
          }
        />
      )
    }
  };

  render() {

    const {
      userData,
      language,
      asHowAdvMove,
      asHowManyStrokes,
      asAdvMoves,
      asDoesCarryMove,
      rabbit16,
      rabbit712,
      rabbit1318,
      medalF9,
      medalB9,
      medal18,
      skins,
      skinCarry,
      lowedAdv,
      snwUseFactor,
      snwAutoPress,
      snwFront9,
      snwBack9,
      snwMatch,
      snwCarry,
      snwMedal,
      tnwUseFactor,
      tnwAutoPress,
      tnwFront9,
      tnwBack9,
      tnwMatch,
      tnwCarry,
      tnwMedal,
      tnwWhoGets,
      ebWager,
      ssDoubleEagle,
      ssEaglePoints,
      ssBirdie,
      ssPar,
      ssBogey,
      ssDoubleBogey,
      bbWagerF9,
      bbWagerB9,
      bbWager18,
      seePicker
    } = this.state;

    const {
      ghinNumber,
      handicap,
      language: languageText,
      generalSettings,
      autoPress,
      whoGetsAdv,
      save,
      useFactor: useFactorText,
      advSettings,
      howAdvantage,
      strokesPerRound,
      advMoves,
      carryMove,
      match,
      money,
      history
    } = Dictionary;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
        <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled" >
        <Spinner
            visible={this.state.status}
            color={Colors.Primary} />
        <TouchableOpacity style={{padding:10,width:50}} onPress={()=> this.props.navigation.openDrawer()}>
          <EntypoIcon name={'menu'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
          <Ripple
            style={styles.profileCard}
            rippleColor='gray'
            onPress={() => this.props.navigation.navigate('EditUserView', {userData:userData, language:language})}
          >
            <View style={styles.imageNameView}>
              <Image
                source={userData ? userData.photo ? { uri: userData.photo } : BlankProfile : BlankProfile}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30
                }}
              />
              <View style={styles.userInfoView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.userName}>{userData ? userData.name : 'User name'}</Text>
                  <Text style={styles.nicknameText}>({userData ? userData.nick_name : 'Nickname'})</Text>
                </View>
                <View>
                  <Text style={[styles.textLink, { color: Colors.Primary, marginRight: 10 }]}>{userData ? userData.email : 'example@mail.com'}</Text>
                  <Text style={styles.textLink} ellipsizeMode="tail">{userData.cellphone}</Text>
                </View>
              </View>
            </View>
            <View style={styles.infoGolfView}>
              <View style={{ marginRight: 20 }}>
                <Text style={styles.cardTitle}>{ghinNumber[language]}</Text>
                <Text style={styles.cardInfo}>{userData ? userData.ghin_number : '1234567'}</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>{handicap[language]}</Text>
                <Text style={styles.cardInfo}>{userData ? userData.handicap : '20.0'}</Text>
              </View>
            </View>
          </Ripple>

          {/* <View style={{ width: '100%', paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={_ => navigation.navigate('HistoryScreen')}>
              <Text style={styles.textButton}>{history[language]}</Text>
            </TouchableOpacity>
          </View> */}

          <Text style={styles.settingsTitle}>{languageText[language]}</Text>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Ionicon name="md-globe" size={20} color={Colors.Primary} />
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Picker
                  selectedValue={language}
                  onValueChange={this.changeLanguage}
                  mode="dropdown"
                >
                  <Picker.Item label='🇺🇸 English' value='en' />
                  <Picker.Item label='🇪🇸 Español' value='es' />
                </Picker>
              </View>
            </View>
          </View>

          <Text style={styles.settingsTitle}>{advSettings[language]}</Text>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{howAdvantage[language]}</Text>
            </View>
            <RadioButton.Group
              onValueChange={asHowAdvMove => this.setState({ asHowAdvMove })}
              value={asHowAdvMove}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={styles.radioButtonView}>
                  <RadioButton value="Match" color={Colors.Primary} />
                  <TouchableOpacity
                    onPress={() => this.setState({ asHowAdvMove: 'Match' })}
                  >
                    <Text style={[styles.radioButtonText, { color: asHowAdvMove === 'Match' ? Colors.Primary : Colors.Black }]}>{match[language]}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.radioButtonView}>
                  <RadioButton value="Money" color={Colors.Primary} />
                  <TouchableOpacity
                    onPress={() => this.setState({ asHowAdvMove: 'Money' })}
                  >
                    <Text style={[styles.radioButtonText, { color: asHowAdvMove === 'Money' ? Colors.Primary : Colors.Black }]}>{money[language]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{strokesPerRound[language]}</Text>
            </View>
            <RadioButton.Group
              onValueChange={asHowManyStrokes => this.setState({ asHowManyStrokes })}
              value={asHowManyStrokes}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={styles.radioButtonView}>
                  <RadioButton value="0.50" color={Colors.Primary} />
                  <TouchableOpacity
                    onPress={() => this.setState({ asHowManyStrokes: '0.50' })}
                  >
                    <Text style={[styles.radioButtonText, { color: asHowManyStrokes === '0.50' ? Colors.Primary : Colors.Black }]}>0.5</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.radioButtonView}>
                  <RadioButton value="1.00" color={Colors.Primary} />
                  <TouchableOpacity
                    onPress={() => this.setState({ asHowManyStrokes: '1.00' })}
                  >
                    <Text style={[styles.radioButtonText, { color: asHowManyStrokes === '1.00' ? Colors.Primary : Colors.Black }]}>1</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.radioButtonView}>
                  <RadioButton value="2.00" color={Colors.Primary} />
                  <TouchableOpacity
                    onPress={() => this.setState({ asHowManyStrokes: '2.00' })}
                  >
                    <Text style={[styles.radioButtonText, { color: asHowManyStrokes === '2.00' ? Colors.Primary : Colors.Black }]}>2</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{advMoves[language]}</Text>
              <View style={styles.costInputView}>
                <Switch
                  value={asAdvMoves}
                  thumbColor={asAdvMoves ? Colors.Primary : Colors.Primary}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={(asAdvMoves) => this.setState({ asAdvMoves })}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{carryMove[language]}</Text>
              <View style={styles.costInputView}>
                <Switch
                  value={asDoesCarryMove}
                  thumbColor={asDoesCarryMove ? Colors.Primary : Colors.Primary}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={(asDoesCarryMove) => this.setState({ asDoesCarryMove })}
                />
              </View>
            </View>
          </View>

          <Text style={styles.settingsTitle}>{generalSettings[language]}</Text>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Rabbit 1-6</Text>
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
                  onSubmitEditing={_ => this.focusNextField('gs2')}
                  value={rabbit16}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Rabbit 7-12</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  ref={ref => this.inputs['gs2'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(rabbit712) => this.setState({ rabbit712 })}
                  onSubmitEditing={_ => this.focusNextField('gs3')}
                  value={rabbit712}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Rabbit 13-18</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  ref={ref => this.inputs['gs3'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(rabbit1318) => this.setState({ rabbit1318 })}
                  onSubmitEditing={_ => this.focusNextField('gs4')}
                  value={rabbit1318}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Medal Play F9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  ref={ref => this.inputs['gs4'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(medalF9) => this.setState({ medalF9 })}
                  onSubmitEditing={_ => this.focusNextField('gs5')}
                  value={medalF9}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Medal Play B9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  ref={ref => this.inputs['gs5'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(medalB9) => this.setState({ medalB9 })}
                  onSubmitEditing={_ => this.focusNextField('gs6')}
                  value={medalB9}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Medal Play 18</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  ref={ref => this.inputs['gs6'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(medal18) => this.setState({ medal18 })}
                  onSubmitEditing={_ => this.focusNextField('gs7')}
                  value={medal18}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Skins</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  ref={ref => this.inputs['gs7'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(skins) => this.setState({ skins })}
                  value={skins}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <TouchableOpacity style={{ flex: 1 }} onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.skinCarryOver, language: language })}>
                <Text style={styles.optionsText}>Skin Carry Over <Text style={{ color: Colors.Primary }}>?</Text></Text>
              </TouchableOpacity>
              <View style={styles.costInputView}>
                <Switch
                  value={skinCarry}
                  thumbColor={skinCarry ? Colors.Primary : Colors.Primary}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={(skinCarry) => this.setState({ skinCarry })}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <TouchableOpacity style={{ flex: 1 }} onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.lowerAdvOnF9, language: language })}>
                <Text style={styles.optionsText}>Lower Adv On F9 <Text style={{ color: Colors.Primary }}>?</Text></Text>
              </TouchableOpacity>
              <View style={styles.costInputView}>
                <Switch
                  value={lowedAdv}
                  thumbColor={lowedAdv ? Colors.Primary : Colors.Primary}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={(lowedAdv) => this.setState({ lowedAdv })}
                />
              </View>
            </View>
          </View>

          <Text style={styles.settingsTitle}>Single Nassau Wagers</Text>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{autoPress[language]}</Text>
              <View style={styles.costInputView}>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={2}
                  onChangeText={(snwAutoPress) => this.setState({ snwAutoPress })}
                  value={snwAutoPress}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{useFactorText[language]}</Text>
              <View style={styles.costInputView}>
                <Switch
                  value={snwUseFactor}
                  thumbColor={snwUseFactor ? Colors.Primary : Colors.Primary}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={this.changeSNUseFactor}
                />
              </View>
            </View>
          </View>

          {/* {snwUseFactor && <Animatable.View animation='flipInX' duration={500} style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{valueFactorText[language]}</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwValueFactor) => this.setState({ snwValueFactor })}
                  value={snwValueFactor}
                />
              </View>
            </View>
          </Animatable.View>} */}

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Front 9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwFront9) => this.setState({ snwFront9 })}
                  onSubmitEditing={_ => this.focusNextField('snw2')}
                  value={snwFront9}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Back 9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{snwUseFactor ? 'Back 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw2'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwBack9) => this.setState({ snwBack9 })}
                  onSubmitEditing={_ => this.focusNextField('snw3')}
                  value={snwBack9}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Match</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{snwUseFactor ? 'Match X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw3'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwMatch) => this.setState({ snwMatch })}
                  onSubmitEditing={_ => this.focusNextField('snw4')}
                  value={snwMatch}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Carry</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{snwUseFactor ? 'Carry X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw4'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwCarry) => this.setState({ snwCarry })}
                  onSubmitEditing={_ => this.focusNextField('snw5')}
                  value={snwCarry}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Medal</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{snwUseFactor ? 'Medal X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw5'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwMedal) => this.setState({ snwMedal })}
                  value={snwMedal}
                />
              </View>
            </View>
          </View>

          <Text style={styles.settingsTitle}>Team Nassau Wagers</Text>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{autoPress[language]}</Text>
              <View style={styles.costInputView}>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={2}
                  onChangeText={(tnwAutoPress) => this.setState({ tnwAutoPress })}
                  value={tnwAutoPress}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{useFactorText[language]}</Text>
              <View style={styles.costInputView}>
                <Switch
                  value={tnwUseFactor}
                  thumbColor={tnwUseFactor ? Colors.Primary : Colors.Primary}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={this.changeTNUseFactor}
                />
              </View>
            </View>
          </View>

          {/* {tnwUseFactor && <Animatable.View animation='flipInX' duration={500} style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{valueFactorText[language]}</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwValueFactor) => this.setState({ tnwValueFactor })}
                  value={tnwValueFactor}
                />
              </View>
            </View>
          </Animatable.View>} */}

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Front 9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwFront9) => this.setState({ tnwFront9 })}
                  onSubmitEditing={_ => this.focusNextField('tnw2')}
                  value={tnwFront9}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Back 9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{tnwUseFactor ? 'Back 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw2'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwBack9) => this.setState({ tnwBack9 })}
                  onSubmitEditing={_ => this.focusNextField('tnw3')}
                  value={tnwBack9}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Match</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{tnwUseFactor ? 'Match X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw3'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwMatch) => this.setState({ tnwMatch })}
                  onSubmitEditing={_ => this.focusNextField('tnw4')}
                  value={tnwMatch}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Carry</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{tnwUseFactor ? 'Carry X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw4'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwCarry) => this.setState({ tnwCarry })}
                  onSubmitEditing={_ => this.focusNextField('tnw5')}
                  value={tnwCarry}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Medal</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{tnwUseFactor ? 'Medal X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw5'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwMedal) => this.setState({ tnwMedal })}
                  value={tnwMedal}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={{ paddingHorizontal: 10 }}>
              <TouchableOpacity  style={{ flex: 1 }} onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.whoGetsAdv, language: language })}>
                <Text style={styles.optionsText}>{whoGetsAdv[language]} <Text style={{ color: Colors.Primary }}>?</Text></Text>
              </TouchableOpacity>
              {Platform.OS === 'ios' &&
                <TouchableOpacity style={styles.whoGetButton} onPress={_ => this.setState({ seePicker: !seePicker })}>
                  <Text style={styles.optionsText}>{this.whoGetsAdvText(tnwWhoGets)}</Text>
                  <Ionicon name={!seePicker ? 'chevron-down' : 'chevron-up'} size={20} color={Colors.Black} />
                </TouchableOpacity>
              }
              {(Platform.OS === 'android' || seePicker) && <Picker
                mode="dropdown"
                selectedValue={tnwWhoGets}
                onValueChange={(tnwWhoGets) =>
                  this.setState({ tnwWhoGets })
                }>
                <Picker.Item label="Hi Handicap" value="hihcp" />
                <Picker.Item label="Low Handicap" value="lowhcp" />
                <Picker.Item label="Each" value="each" />
                <Picker.Item label="Slid Hi" value="slidhi" />
                <Picker.Item label="Slid Low" value="slidlow" />
              </Picker>}
            </View>
          </View>

          <Text style={styles.settingsTitle}>Extra Bets</Text>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Wager</Text>
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

          <Text style={styles.settingsTitle}>Best Ball Teams</Text>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Wager F9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(bbWagerF9) => this.setState({ bbWagerF9 })}
                  onSubmitEditing={_ => this.focusNextField('bbt2')}
                  value={bbWagerF9}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Wager B9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(bbWagerB9) => this.setState({ bbWagerB9 })}
                  ref={ref => this.inputs['bbt2'] = ref}
                  onSubmitEditing={_ => this.focusNextField('bbt3')}
                  value={bbWagerB9}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Wager 18</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>$</Text>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(bbWager18) => this.setState({ bbWager18 })}
                  ref={ref => this.inputs['bbt3'] = ref}
                  value={bbWager18}
                />
              </View>
            </View>
          </View>

          <Text style={styles.settingsTitle}>Stableford Settings</Text>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Double Eagle Points</Text>
              <View style={styles.costInputView}>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssDoubleEagle) => this.setState({ ssDoubleEagle })}
                  onSubmitEditing={_ => this.focusNextField('ss2')}
                  value={ssDoubleEagle}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Eagle Points</Text>
              <View style={styles.costInputView}>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssEaglePoints) => this.setState({ ssEaglePoints })}
                  ref={ref => this.inputs['ss2'] = ref}
                  onSubmitEditing={_ => this.focusNextField('ss3')}
                  value={ssEaglePoints}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Birdie</Text>
              <View style={styles.costInputView}>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssBirdie) => this.setState({ ssBirdie })}
                  ref={ref => this.inputs['ss3'] = ref}
                  onSubmitEditing={_ => this.focusNextField('ss4')}
                  value={ssBirdie}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Par</Text>
              <View style={styles.costInputView}>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssPar) => this.setState({ ssPar })}
                  ref={ref => this.inputs['ss4'] = ref}
                  onSubmitEditing={_ => this.focusNextField('ss5')}
                  value={ssPar}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Bogey</Text>
              <View style={styles.costInputView}>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssBogey) => this.setState({ ssBogey })}
                  ref={ref => this.inputs['ss5'] = ref}
                  onSubmitEditing={_ => this.focusNextField('ss6')}
                  value={ssBogey}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Double Bogey</Text>
              <View style={styles.costInputView}>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Primary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssDoubleBogey) => this.setState({ ssDoubleBogey })}
                  ref={ref => this.inputs['ss6'] = ref}
                  value={ssDoubleBogey}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtom}>
          <DragonButton title={save[language]} onPress={this.submit} />
        </View>

      </KeyboardAvoidingView>
    );
  }

  changeSNUseFactor = (snwUseFactor) => {
    const state = this.state;
    console.warn(snwUseFactor)
    state.snwUseFactor = snwUseFactor;
    if (state.snwFront9 && state.snwFront9 != 0) {
      if (snwUseFactor) {
        state.snwBack9 = (parseFloat(state.snwBack9) / parseFloat(state.snwFront9)).toString();
        state.snwMatch = (parseFloat(state.snwMatch) / parseFloat(state.snwFront9)).toString();
        state.snwCarry = (parseFloat(state.snwCarry) / parseFloat(state.snwFront9)).toString();
        state.snwMedal = (parseFloat(state.snwMedal) / parseFloat(state.snwFront9)).toString();
      } else {
        state.snwBack9 = (parseFloat(state.snwBack9) * parseFloat(state.snwFront9)).toString();
        state.snwMatch = (parseFloat(state.snwMatch) * parseFloat(state.snwFront9)).toString();
        state.snwCarry = (parseFloat(state.snwCarry) * parseFloat(state.snwFront9)).toString();
        state.snwMedal = (parseFloat(state.snwMedal) * parseFloat(state.snwFront9)).toString();
      }
    }

    this.setState(state);
    console.warn(state.snwUseFactor)
  }

  changeTNUseFactor = (tnwUseFactor) => {
    const state = this.state;
    state.tnwUseFactor = tnwUseFactor;
    if (state.tnwFront9 && state.tnwFront9 != 0) {
      if (tnwUseFactor) {
        state.tnwBack9 = (parseFloat(state.tnwBack9) / parseFloat(state.tnwFront9)).toString();
        state.tnwMatch = (parseFloat(state.tnwMatch) / parseFloat(state.tnwFront9)).toString();
        state.tnwCarry = (parseFloat(state.tnwCarry) / parseFloat(state.tnwFront9)).toString();
        state.tnwMedal = (parseFloat(state.tnwMedal) / parseFloat(state.tnwFront9)).toString();
      } else {
        state.tnwBack9 = (parseFloat(state.tnwBack9) * parseFloat(state.tnwFront9)).toString();
        state.tnwMatch = (parseFloat(state.tnwMatch) * parseFloat(state.tnwFront9)).toString();
        state.tnwCarry = (parseFloat(state.tnwCarry) * parseFloat(state.tnwFront9)).toString();
        state.tnwMedal = (parseFloat(state.tnwMedal) * parseFloat(state.tnwFront9)).toString();
      }
    }

    this.setState(state);
  }

  whoGetsAdvText = (text) => {
    switch (text) {
      case 'hihcp':
        return 'Hi Handicap';
      case 'lowhcp':
        return 'Low Handicap';
      case 'each':
        return 'Each';
      case 'slidhi':
        return 'Slid Hi';
      case 'slidlow':
        return 'Slid Low';
    }
  }

  focusNextField = (field) => {
    this.inputs[field].focus();
  }

  changeLanguage = (language) => {
    //setLanguage(language);
    this.setState({
            language
        })
    this.changeTitleText(language);
  }

  changeTitleText = (language) => {
    this.props.navigation.setParams({
      Title: Dictionary.settings[language]
    });
  }

  /*formatCellphone = () => {
    if (this.props.userData) {
      let { userData: { cellphone } } = this.props;
      let formatted = '';
      let pureCell = '';
      if (cellphone.length > 10) {
        pureCell = cellphone.substr(cellphone.length - 10);
      }

      formatted = cellphone.substr(0, cellphone.length - 10);

      formatted += ' ' + FormatCellphone(pureCell);

      return formatted;
    }
  }*/

  getUserData = async () => {
    const token = await AsyncStorage.getItem('usu_id')
    InfoUsuario(token)
    .then((res) => {
        if(res.estatus==1){

          let snwUF = false
          let snwTF = false
          if(res.resultado.set_snw_use_factor===1) {snwUF=true} else {snwUF=false}
          if(res.resultado.set_tmw_use_factor===1) {snwTF=true} else {snwTF=false}

            const lista =[
            {
              id: res.resultado.usu_id,
              name: res.resultado.usu_nombre,
              last_name: res.resultado.usu_apellido_paterno,
              last_name2: res.resultado.usu_apellido_materno,
              nick_name: res.resultado.usu_nickname,
              email: res.resultado.usu_email,
              ghin_number: res.resultado.usu_ghin_numero,
              handicap: res.resultado.usu_handicap_index,
              cellphone:res.resultado.usu_telefono,
              photo: 'http://trascenti.com/pruebasDragon/public/' + res.resultado.usu_imagen
            }]

            this.setState({
            asHowAdvMove: res.resultado.set_how_adv_move,
            asHowManyStrokes: res.resultado.set_strokes_moved_per_round,
            asAdvMoves: res.resultado.set_adv_moves_on_9_holes,
            asDoesCarryMove: res.resultado.set_carry_moves_adv,
            rabbit16: res.resultado.set_rabbit_1_6,
            rabbit712: res.resultado.set_rabbit_7_12,
            rabbit1318: res.resultado.set_rabbit_13_18,
            medalF9: res.resultado.set_medal_play_f9,
            medalB9: res.resultado.set_medal_play_b9,
            medal18: res.resultado.set_medal_play_18,
            skins: res.resultado.set_skins,
            skinCarry: res.resultado.set_skins_carry_over,
            lowedAdv: res.resultado.set_lower_adv_f9,
            snwUseFactor: snwUF,
            snwAutoPress: res.resultado.set_snw_automatic_press,
            snwFront9: res.resultado.set_snw_front_9,
            snwBack9: res.resultado.set_snw_back_9,
            snwMatch: res.resultado.set_snw_match,
            snwCarry: res.resultado.set_snw_carry,
            snwMedal: res.resultado.set_snw_medal,
            tnwUseFactor: snwTF,
            tnwAutoPress: res.resultado.set_tmw_automatic_press,
            tnwFront9: res.resultado.set_tmw_front_9,
            tnwBack9: res.resultado.set_tmw_back_9,
            tnwMatch: res.resultado.set_tmw_match,
            tnwCarry: res.resultado.set_tmw_carry,
            tnwMedal: res.resultado.set_tmw_medal,
            tnwWhoGets: res.resultado.set_tmw_adv_strokes,
            ebWager: res.resultado.set_eb_wager,
            ssDoubleEagle: res.resultado.set_stableford_double_eagle,
            ssEaglePoints: res.resultado.set_stableford_eagle,
            ssBirdie: res.resultado.set_stableford_birdie,
            ssPar: res.resultado.set_stableford_par,
            ssBogey: res.resultado.set_stableford_bogey,
            ssDoubleBogey: res.resultado.set_stableford_double_bogey,
            bbWagerF9: res.resultado.set_bbt_wager_f9,
            bbWagerB9: res.resultado.set_bbt_wager_b9,
            bbWager18: res.resultado.set_bbt_wager_18,
            status: false
            //seePicker: res.resultado.usu_id
          })
          console.warn(res.resultado)
          this.setState({
            userData: lista[0]
          })

        db.transaction((tx) => {
            tx.executeSql(
              'UPDATE Settings set user_language=?, user_how_adv_move=? , user_strokes_moved_per_round=? where user_id=?',
              [language, asData.how_adv_move, asData.how_many_strokes, lista[0].id],
              (tx, results) => {
                console.warn('Results', results);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User updated successfully',
                    [
                      {
                        text: 'Ok',
                        //onPress: () => navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else alert('Updation Failed');
              }
            );
          });
        }  
        else{
            //setLoading(false)
            showMessage({
                message: res.mensaje,
                type: 'info',
            });
        }
    }).catch(error=>{
        //setLoading(false)
        showMessage({
            message: error,
            type:'error',
        });
    })
  }

  snwValidations = () => {

    const {
      snwAutoPress,
      snwFront9,
      snwBack9,
      snwMatch,
      snwCarry,
      snwMedal
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: autoPressOk } = Validations.intNumberValidation(snwAutoPress ? snwAutoPress : 1);
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
      tnwAutoPress,
      tnwBack9,
      tnwCarry,
      tnwFront9,
      tnwMatch,
      tnwMedal
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: autoPressOk } = Validations.intNumberValidation(tnwAutoPress ? tnwAutoPress : 1);
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

  ebValidations = () => {

    const {
      ebWager
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: ebWagerOk } = Validations.floatNumberValidation(ebWager ? ebWager : 1);
    if (!ebWagerOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Wager ${Dictionary.from[language]} Extra Bets`
      );
      return false;
    }

    return true;

  }

  ssValidations = () => {

    const {
      ssDoubleEagle,
      ssEaglePoints,
      ssBirdie,
      ssPar,
      ssBogey,
      ssDoubleBogey
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: ssDoubleEagleOk } = Validations.floatNumberValidation(ssDoubleEagle ? ssDoubleEagle : 1);
    if (!ssDoubleEagleOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Double Eagle Points ${Dictionary.from[language]} Stableford Settings`
      );
      return false;
    }

    const { ok: ssEaglePointsOk } = Validations.floatNumberValidation(ssEaglePoints ? ssEaglePoints : 1);
    if (!ssEaglePointsOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Eagle Points ${Dictionary.from[language]} Stableford Settings`
      );
      return false;
    }

    const { ok: ssBirdieOk } = Validations.floatNumberValidation(ssBirdie ? ssBirdie : 1);
    if (!ssBirdieOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Birdie ${Dictionary.from[language]} Stableford Settings`
      );
      return false;
    }

    const { ok: ssParOk } = Validations.floatNumberValidation(ssPar ? ssPar : 1);
    if (!ssParOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Par ${Dictionary.from[language]} Stableford Settings`
      );
      return false;
    }

    const { ok: ssBogeyOk } = Validations.floatNumberValidation(ssBogey ? ssBogey : 1);
    if (!ssBogeyOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Bogey ${Dictionary.from[language]} Stableford Settings`
      );
      return false;
    }

    const { ok: ssDoubleBogeyOk } = Validations.floatNumberValidation(ssDoubleBogey ? ssDoubleBogey : 1);
    if (!ssDoubleBogeyOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Double Bogey ${Dictionary.from[language]} Stableford Settings`
      );
      return false;
    }

    return true;
  }

  bbValidations = () => {

    const {
      bbWagerF9,
      bbWagerB9,
      bbWager18
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: bbWagerF9Ok } = Validations.floatNumberValidation(bbWagerF9 ? bbWagerF9 : 1);
    if (!bbWagerF9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Wager F9 ${Dictionary.from[language]} Best Ball Teams`
      );
      return false;
    }

    const { ok: bbWagerB9Ok } = Validations.floatNumberValidation(bbWagerB9 ? bbWagerB9 : 1);
    if (!bbWagerB9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Wager B9 ${Dictionary.from[language]} Best Ball Teams`
      );
      return false;
    }

    const { ok: bbWager18Ok } = Validations.floatNumberValidation(bbWager18 ? bbWager18 : 1);
    if (!bbWager18Ok) {
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
        language,
        snwAutoPress,
        snwFront9,
        snwBack9,
        snwMatch,
        snwCarry,
        snwMedal,
        snwUseFactor,
        snwValueFactor,
      } = this.state;

      console.warn(snwUseFactor)

      const snwData = {
        useFactor: snwUseFactor ? 1 : 0,
        valueFactor: snwValueFactor,
        automatic_presses_every: snwAutoPress,
        front_9: snwFront9,
        back_9: snwBack9,
        match: snwMatch,
        medal: snwMedal,
        carry: snwCarry,
      }

      const {
        tnwAutoPress,
        tnwFront9,
        tnwBack9,
        tnwMatch,
        tnwCarry,
        tnwMedal,
        tnwWhoGets,
        tnwUseFactor,
        tnwValueFactor
      } = this.state;

      //console.warn(tnwWhoGets)

      const tnwData = {
        useFactor: tnwUseFactor ? 1 : 0,
        valueFactor: tnwValueFactor,
        automatic_presses_every: tnwAutoPress,
        front_9: tnwFront9,
        back_9: tnwBack9,
        match: tnwMatch,
        medal: tnwMedal,
        carry: tnwCarry,
        who_gets_the_adv_strokes: tnwWhoGets,
      }

      const {
        rabbit16,
        rabbit712,
        rabbit1318,
        medalF9,
        medalB9,
        medal18,
        skins,
        skinCarry,
        lowedAdv
      } = this.state;

      const gsData = {
        rabbit16,
        rabbit712,
        rabbit1318,
        medalF9,
        medalB9,
        medal18,
        skins,
        skinCarry: skinCarry ? 1 : 0,
        lowedAdv: lowedAdv ? 1 : 0
      }

      const {
        ebWager
      } = this.state;

      const ebData = {
        wager: ebWager
      }

      const {
        ssDoubleEagle,
        ssEaglePoints,
        ssBirdie,
        ssPar,
        ssBogey,
        ssDoubleBogey
      } = this.state;

      const sfsData = {
        double_eagles_points: ssDoubleEagle,
        eagle_points: ssEaglePoints,
        birdie: ssBirdie,
        par: ssPar,
        bogey: ssBogey,
        double_bogey: ssDoubleBogey,
      }

      const {
        asHowAdvMove,
        asHowManyStrokes,
        asAdvMoves,
        asDoesCarryMove
      } = this.state;

      const asData = {
        how_adv_move: asHowAdvMove,
        how_many_strokes: asHowManyStrokes,
        adv_moves: asAdvMoves ? 1 : 0,
        carry_move_adv: asDoesCarryMove ? 1 : 0
      }

      const {
        bbWagerF9,
        bbWagerB9,
        bbWager18
      } = this.state;

      const bbData = {
        wager_f9: bbWagerF9,
        wager_b9: bbWagerB9,
        wager_18: bbWager18
      }

      const { userData } = this.state;

      let data = {
        user_id: userData.id,
        asData,
        snwData,
        tnwData,
        gsData,
        ebData,
        bbData,
        sfsData,
        havePreferences: this.havePreferences,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const gsDataPlayer = {
        player_id: 1,
        rabbit_1_6: rabbit16,
        rabbit_7_12: rabbit712,
        rabbit_13_18: rabbit1318,
        medal_play_f9: medalF9,
        medal_play_b9: medalB9,
        medal_play_18: medal18,
        skins,
        skins_carry_over: skinCarry,
        lowed_adv_on_f9: lowedAdv,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const snwPlayerData = {
        automatic_presses_every: snwAutoPress,
        use_factor: snwUseFactor ? 1: 0,
        cantidad: snwFront9,
        front_9: snwUseFactor ? 1 : snwFront9,
        back_9: snwBack9,
        match: snwMatch,
        medal: snwMedal,
        carry: snwCarry,
        player_id: 1,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const tnwPlayerData = {
        automatic_presses_every: tnwAutoPress,
        use_factor: tnwUseFactor ? 1: 0,
        cantidad: tnwFront9,
        front_9: tnwUseFactor ? 1 : tnwFront9,
        back_9: tnwBack9,
        match: tnwMatch,
        medal: tnwMedal,
        carry: tnwCarry,
        who_gets_the_adv_strokes: tnwWhoGets,
        player_id: 1,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const ebPlayerData = {
        wager: ebWager,
        player_id: 1,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const asPlayerData = {
        advantage_move: asHowAdvMove,
        strokes_moved_per_round: asHowManyStrokes,
        adv_mov_if_only_9_holes: asAdvMoves ? 1 : 0,
        does_the_carry_move: asDoesCarryMove ? 1 : 0,
        player_id: 1,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      const bbPlayerData = {
        wager_f9: bbWagerF9,
        wager_b9: bbWagerB9,
        wager_18: bbWager18,
        player_id: 1,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      console.warn('s: '+snwData.useFactor)
      console.warn('t: '+tnwData.useFactor)

      updateSettings(data.user_id,language,asData.how_adv_move,asData.how_many_strokes,asData.adv_moves,
      asData.carry_move_adv,gsDataPlayer.rabbit_1_6,gsDataPlayer.rabbit_7_12,gsDataPlayer.rabbit_13_18,
      gsDataPlayer.medal_play_f9,gsDataPlayer.medal_play_b9,gsDataPlayer.medal_play_18,gsDataPlayer.skins,
      gsData.skins_carry_over,gsDataPlayer.lowed_adv_on_f9,snwData.automatic_presses_every, 
      snwData.useFactor,snwData.front_9,snwData.back_9,snwData.match,
      snwData.carry,snwData.medal,tnwData.automatic_presses_every, tnwData.useFactor,
      tnwData.front_9,tnwData.back_9,tnwData.match,tnwData.carry,tnwData.medal,
      tnwData.who_gets_the_adv_strokes,ebPlayerData.wager,bbPlayerData.wager_f9,bbPlayerData.wager_b9,
      bbPlayerData.wager_18,sfsData.double_eagles_points,sfsData.eagle_points,sfsData.birdie,sfsData.par,
      sfsData.bogey,sfsData.double_bogey)
      .then((res) => {
        console.warn(res)
        if(res.estatus==1){
          showMessage({
                message: res.mensaje,
                type: 'success',
            });
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_settings set user_language=?, user_how_adv_move=? , user_strokes_moved_per_round=? where user_id=?',
              [language, asData.how_adv_move, asData.how_many_strokes, data.user_id],
              (tx, results) => {
                console.warn('Results', results);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User updated successfully',
                    [
                      {
                        text: 'Ok',
                        //onPress: () => navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else alert('Updation Failed');
              }
            );
          });
        }  
        else{
            //setLoading(false)
            showMessage({
                message: res.mensaje,
                type: 'info',
            });
        }
    }).catch(error=>{
        //setLoading(false)
        showMessage({
            message: error,
            type:'error',
        });
    })
  }
}

export default SettingsView;
