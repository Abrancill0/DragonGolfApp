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
import Ripple from 'react-native-material-ripple';
//import * as Validations from '../../../utils/Validations';
import FormatCellphone from '../../../utils/FormatCellphone';
import moment from 'moment';
import { RadioButton } from 'react-native-paper';
import Details from '../../../utils/Details';
import AsyncStorage from '@react-native-community/async-storage';
import { InfoUsuarioAB, updateSettingsAB } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";
// import * as Animatable from 'react-native-animatable';
import SQLite from 'react-native-sqlite-storage';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from "@react-native-community/netinfo";

var db = SQLite.openDatabase({ name: "a", createFromLocation: "~DragonGolf.db" });

const BlankProfile = require('../../../../assets/globals/blank-profile.png');

class SettingsView extends Component {
  constructor(props) {
    super(props);

    this.state={
      status: false,
      una:0,
      userData: [],
      language:'es',
      asHowAdvMove : 'Match',
      asHowManyStrokes : '0.5',
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
      tnwWhoGets : 'Each',
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
      btnAct: false
    }

    //this.getUserData = this.getUserData.bind(this);

    this.inputs = {};
  }

  handleConnectivityChange = (connection) => {
    if(connection.isInternetReachable)
    {
        this.setState({
          conexion:true
        })
        //this.getUserData()
    }
    else if(connection.isInternetReachable==false)
    {
      this.setState({
        conexion:false
      })
        //this.getUserDataLocal()
    }
  };

  async componentDidMount() {
    this.getUserData()
  }
   /*async componentDidMount() {
    const actualizar = await AsyncStorage.getItem('actualizar')
    if(actualizar=="true"){
      this.setState({
        btnAct: true
      })
    }
    this.netinfoUnsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
   }*/

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
      history,
      update
    } = Dictionary;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
        <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled" >
        <Spinner
            visible={this.state.status}
            color={Colors.Primary} />
        <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.openDrawer()}>
          <EntypoIcon name={'menu'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
          <Ripple
            style={styles.profileCard}
            rippleColor='gray'
            onPress={() => this.props.navigation.navigate('EditUserView', {userData:userData, language:language, getUserData:this.getUserData})}
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
                  <Text style={styles.textLink} ellipsizeMode="tail">{userData.cellphoneAux}</Text>
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
                  <RadioButton value="0.5" color={Colors.Primary} />
                  <TouchableOpacity
                    onPress={() => this.setState({ asHowManyStrokes: '0.5' })}
                  >
                    <Text style={[styles.radioButtonText, { color: asHowManyStrokes === '0.5' ? Colors.Primary : Colors.Black }]}>0.5</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.radioButtonView}>
                  <RadioButton value="1" color={Colors.Primary} />
                  <TouchableOpacity
                    onPress={() => this.setState({ asHowManyStrokes: '1' })}
                  >
                    <Text style={[styles.radioButtonText, { color: asHowManyStrokes === '1' ? Colors.Primary : Colors.Black }]}>1</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.radioButtonView}>
                  <RadioButton value="2" color={Colors.Primary} />
                  <TouchableOpacity
                    onPress={() => this.setState({ asHowManyStrokes: '2' })}
                  >
                    <Text style={[styles.radioButtonText, { color: asHowManyStrokes === '2' ? Colors.Primary : Colors.Black }]}>2</Text>
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
                  thumbColor={asAdvMoves ? Colors.Primary : Colors.Gray}
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
                  thumbColor={asDoesCarryMove ? Colors.Primary : Colors.Gray}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(rabbit16) => this.setState({ rabbit16 })}
                  onSubmitEditing={_ => this.focusNextField('gs2')}
                  value={rabbit16}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(rabbit712) => this.setState({ rabbit712 })}
                  onSubmitEditing={_ => this.focusNextField('gs3')}
                  value={rabbit712}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(rabbit1318) => this.setState({ rabbit1318 })}
                  onSubmitEditing={_ => this.focusNextField('gs4')}
                  value={rabbit1318}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(medalF9) => this.setState({ medalF9 })}
                  onSubmitEditing={_ => this.focusNextField('gs5')}
                  value={medalF9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(medalB9) => this.setState({ medalB9 })}
                  onSubmitEditing={_ => this.focusNextField('gs6')}
                  value={medalB9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(medal18) => this.setState({ medal18 })}
                  onSubmitEditing={_ => this.focusNextField('gs7')}
                  value={medal18}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(skins) => this.setState({ skins })}
                  value={skins}
                  selectTextOnFocus={true}
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
                  thumbColor={skinCarry ? Colors.Primary : Colors.Gray}
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
                  thumbColor={lowedAdv ? Colors.Primary : Colors.Gray}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={2}
                  onChangeText={(snwAutoPress) => this.setState({ snwAutoPress })}
                  value={snwAutoPress}
                  selectTextOnFocus={true}
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
                  thumbColor={snwUseFactor ? Colors.Primary : Colors.Gray}
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
                <Text style={styles.dollarText}>{snwUseFactor ? '$ ': '$ ' }</Text>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwFront9) => this.setState({ snwFront9 })}
                  onSubmitEditing={_ => this.focusNextField('snw2')}
                  value={snwFront9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>

          {
            snwUseFactor ? 
          <View>
            <View style={[styles.optionSection,{flexDirection:'row', justifyContent:'space-between'}]}>
              <Text style={[styles.optionsText,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Back 9</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
            <TextInput
                  ref={ref => this.inputs['snw2'] = ref}
                  style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwBack9) => this.setState({ snwBack9 })}
                  onSubmitEditing={_ => this.focusNextField('snw3')}
                  value={snwBack9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
          </View> 
          <View style={[styles.optionSection,{flexDirection:'row', justifyContent:'space-between'}]}>
              <Text style={[styles.optionsText,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Match</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw3'] = ref}
                  style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwMatch) => this.setState({ snwMatch })}
                  onSubmitEditing={_ => this.focusNextField('snw4')}
                  value={snwMatch}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
          </View>
          <View style={[styles.optionSection,{flexDirection:'row', justifyContent:'space-between'}]}>
              <Text style={[styles.optionsText,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Carry</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw4'] = ref}
                  style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwCarry) => this.setState({ snwCarry })}
                  onSubmitEditing={_ => this.focusNextField('snw5')}
                  value={snwCarry}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
          </View>
          <View style={[styles.optionSection,{flexDirection:'row', justifyContent:'space-between'}]}>
              <Text style={[styles.optionsText,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Medal</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw5'] = ref}
                  style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwMedal) => this.setState({ snwMedal })}
                  value={snwMedal}
                  selectTextOnFocus={true}
                />
          </View>
        </View>
          :
        <View>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Back 9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw2'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwBack9) => this.setState({ snwBack9 })}
                  onSubmitEditing={_ => this.focusNextField('snw3')}
                  value={snwBack9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Match</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw3'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwMatch) => this.setState({ snwMatch })}
                  onSubmitEditing={_ => this.focusNextField('snw4')}
                  value={snwMatch}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Carry</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw4'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwCarry) => this.setState({ snwCarry })}
                  onSubmitEditing={_ => this.focusNextField('snw5')}
                  value={snwCarry}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Medal</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['snw5'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(snwMedal) => this.setState({ snwMedal })}
                  value={snwMedal}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>
        </View>
          }
          <Text style={styles.settingsTitle}>Team Nassau Wagers</Text>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>{autoPress[language]}</Text>
              <View style={styles.costInputView}>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={2}
                  onChangeText={(tnwAutoPress) => this.setState({ tnwAutoPress })}
                  value={tnwAutoPress}
                  selectTextOnFocus={true}
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
                  thumbColor={tnwUseFactor ? Colors.Primary : Colors.Gray}
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
                <Text style={styles.dollarText}>{tnwUseFactor ? '$ ': '$ ' }</Text>
                <TextInput
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwFront9) => this.setState({ tnwFront9 })}
                  onSubmitEditing={_ => this.focusNextField('tnw2')}
                  value={tnwFront9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>

          {
            tnwUseFactor ? 
        <View>
          <View style={[styles.optionSection,{flexDirection:'row', justifyContent:'space-between'}]}>
              <Text style={[styles.optionsText,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Back 9</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw2'] = ref}
                  style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwBack9) => this.setState({ tnwBack9 })}
                  onSubmitEditing={_ => this.focusNextField('tnw3')}
                  value={tnwBack9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
          </View>

          <View style={[styles.optionSection,{flexDirection:'row', justifyContent:'space-between'}]}>
              <Text style={[styles.optionsText,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Match</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw3'] = ref}
                  style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwMatch) => this.setState({ tnwMatch })}
                  onSubmitEditing={_ => this.focusNextField('tnw4')}
                  value={tnwMatch}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
          </View>

          <View style={[styles.optionSection,{flexDirection:'row', justifyContent:'space-between'}]}>
              <Text style={[styles.optionsText,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Carry</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw4'] = ref}
                  style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwCarry) => this.setState({ tnwCarry })}
                  onSubmitEditing={_ => this.focusNextField('tnw5')}
                  value={tnwCarry}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
          </View>

          <View style={[styles.optionSection,{flexDirection:'row', justifyContent:'space-between'}]}>
              <Text style={[styles.optionsText,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Medal</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw5'] = ref}
                  style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwMedal) => this.setState({ tnwMedal })}
                  value={tnwMedal}
                  selectTextOnFocus={true}
                />
          </View>
        </View>
          :
        <View>
          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Back 9</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw2'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwBack9) => this.setState({ tnwBack9 })}
                  onSubmitEditing={_ => this.focusNextField('tnw3')}
                  value={tnwBack9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Match</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw3'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwMatch) => this.setState({ tnwMatch })}
                  onSubmitEditing={_ => this.focusNextField('tnw4')}
                  value={tnwMatch}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Carry</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw4'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwCarry) => this.setState({ tnwCarry })}
                  onSubmitEditing={_ => this.focusNextField('tnw5')}
                  value={tnwCarry}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.optionSection}>
            <View style={styles.optionView}>
              <Text style={styles.optionsText}>Medal</Text>
              <View style={styles.costInputView}>
                <Text style={styles.dollarText}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                <TextInput
                  ref={ref => this.inputs['tnw5'] = ref}
                  style={styles.costInput}
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(tnwMedal) => this.setState({ tnwMedal })}
                  value={tnwMedal}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>
        </View>
      }

          <View style={styles.optionSection}>
            <View style={{ paddingHorizontal: 10 }}>
              <TouchableOpacity  style={{ flex: 1 }} onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.whoGetsAdv, language: language })}>
                <Text style={styles.optionsText}>{whoGetsAdv[language]} <Text style={{ color: Colors.Primary }}>?</Text></Text>
              </TouchableOpacity>
              {Platform.OS === 'ios' &&
                <TouchableOpacity style={styles.whoGetButton} onPress={_ => this.setState({ seePicker: !seePicker })}>
                  <Text style={styles.optionsText}>{tnwWhoGets}</Text>
                  <Ionicon name={!seePicker ? 'chevron-down' : 'chevron-up'} size={20} color={Colors.Black} />
                </TouchableOpacity>
              }
              {(Platform.OS === 'android' || seePicker) && <Picker
                mode="dropdown"
                selectedValue={tnwWhoGets}
                onValueChange={(tnwWhoGets) =>
                  this.setState({ tnwWhoGets })
                }>
                <Picker.Item label="Hi Handicap" value="Hi Handicap" />
                <Picker.Item label="Low Handicap" value="Low Handicap" />
                <Picker.Item label="Each" value="Each" />
                <Picker.Item label="Slid Hi" value="Slid Hi" />
                <Picker.Item label="Slid Low" value="Slid Low" />
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(ebWager) => this.setState({ ebWager })}
                  value={ebWager}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(bbWagerF9) => this.setState({ bbWagerF9 })}
                  onSubmitEditing={_ => this.focusNextField('bbt2')}
                  value={bbWagerF9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(bbWagerB9) => this.setState({ bbWagerB9 })}
                  ref={ref => this.inputs['bbt2'] = ref}
                  onSubmitEditing={_ => this.focusNextField('bbt3')}
                  value={bbWagerB9}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={8}
                  onChangeText={(bbWager18) => this.setState({ bbWager18 })}
                  ref={ref => this.inputs['bbt3'] = ref}
                  value={bbWager18}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssDoubleEagle) => this.setState({ ssDoubleEagle })}
                  onSubmitEditing={_ => this.focusNextField('ss2')}
                  value={ssDoubleEagle}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssEaglePoints) => this.setState({ ssEaglePoints })}
                  ref={ref => this.inputs['ss2'] = ref}
                  onSubmitEditing={_ => this.focusNextField('ss3')}
                  value={ssEaglePoints}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssBirdie) => this.setState({ ssBirdie })}
                  ref={ref => this.inputs['ss3'] = ref}
                  onSubmitEditing={_ => this.focusNextField('ss4')}
                  value={ssBirdie}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssPar) => this.setState({ ssPar })}
                  ref={ref => this.inputs['ss4'] = ref}
                  onSubmitEditing={_ => this.focusNextField('ss5')}
                  value={ssPar}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssBogey) => this.setState({ ssBogey })}
                  ref={ref => this.inputs['ss5'] = ref}
                  onSubmitEditing={_ => this.focusNextField('ss6')}
                  value={ssBogey}
                  blurOnSubmit={false}
                  selectTextOnFocus={true}
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
                  selectionColor={Colors.Secondary}
                  placeholder="0"
                  keyboardType="numeric"
                  returnKeyType='done'
                  maxLength={5}
                  onChangeText={(ssDoubleBogey) => this.setState({ ssDoubleBogey })}
                  ref={ref => this.inputs['ss6'] = ref}
                  value={ssDoubleBogey}
                  selectTextOnFocus={true}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtom}>
          <DragonButton title={save[language]} onPress={this.submit} />
        </View>

        {
          this.state.btnAct &&
          <View style={styles.bottomButtom}>
            <DragonButton title={update[language]} onPress={this.Actualizar} />
          </View>
        }

      </KeyboardAvoidingView>
    );
  }

  changeSNUseFactor = (snwUseFactor) => {
    const state = this.state;
    //console.warn(snwUseFactor)
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
    //console.warn(state.snwUseFactor)
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

  formatCellphone = (cellphone) => {
      let formatted = '';
      let pureCell = '';
      //console.warn('ce: ' + cellphone)
      if (cellphone.length > 2) {
        pureCell = cellphone.substr(2,cellphone.length);
        formatted = '+' + cellphone.substr(0,2);
        formatted += ' ' + FormatCellphone(pureCell);
      }
      else{
        formatted = '+' + cellphone
      }
      return formatted;
  }

  getUserDataLocal = async () => {

    this.setState({
      status:false
    })

    db.transaction((tx) => {

      let sql = `SELECT * FROM Usuario`
      //console.warn(sql)
      tx.executeSql(sql, [], (tx, results) => {
        //console.warn('Consulta OK')
        //console.warn(results)

        var len = results.rows.length;

        const tempticket = [];

        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          //console.warn(row)

          const lista =[
            {
              id: row.UsuId,
              name: row.FirstName,
              last_name: row.FirstLastName,
              last_name2: row.LastName,
              nick_name: row.Nickname,
              email: row.Email,
              ghin_number: row.GhinNumber,
              handicap: row.Handicap,
              cellphone:row.Cellphone,
              password:row.Password,
              //photo: 'http://13.90.32.51/DragonGolfBackEnd/images' + res.Result[0].usu_imagen
            }]

          this.setState({
            userData: lista[0]
          })
        }
      });
      //console.warn(tx)
    }) 

    db.transaction((tx) => {

      let sql = `SELECT * FROM Settings`
      //console.warn(sql)
      tx.executeSql(sql, [], (tx, results) => {
        //console.warn('Consulta OK')
        //console.warn(results)

        var len = results.rows.length;

        const tempticket = [];

        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          //console.warn(row)

          let usu_id = row.usu_id
          let Lenguage = row.Lenguage

          let move9 = false
          let moveAdv = false
          let ScarryOver = false
          let LAdvF9 = false
          let UseFactorS = false
          let UseFactorT = false

          if(row.AdvMovesOn9Holes==1){
            move9 = true
          }
          if(row.CarryMovesAdv==1){
            moveAdv = true
          }
          if(row.SkinsCarryOver==1){
            ScarryOver = true
          }
          if(row.LowerAdvF9==1){
            LAdvF9 = true
          }
          if(row.SNWUseFactor==1){
            UseFactorS = true
          }
          if(row.TMWUseFactor==1){
            UseFactorT = true
          }

          this.setState({
            asHowAdvMove: row.HowAdvMove.toString(),
            asHowManyStrokes: row.StrokesMovedPerRound.toString(),
            asAdvMoves: move9,
            asDoesCarryMove: moveAdv,
            rabbit16: row.Rabbit1_6.toString(),
            rabbit712: row.Rabbit7_12.toString(),
            rabbit1318: row.Rabbit13_18.toString(),
            medalF9: row.MedalPlayF9.toString(),
            medalB9: row.MedalPlayB9.toString(),
            medal18: row.MedalPlay18.toString(),
            skins: row.Skins.toString(),
            skinCarry: ScarryOver,
            lowedAdv: LAdvF9,
            snwUseFactor: UseFactorS,
            snwAutoPress: row.SNWAutomaticPress.toString(),
            snwFront9: row.SNWFront9.toString(),
            snwBack9: row.SNWBack9.toString(),
            snwMatch: row.SNWMatch.toString(),
            snwCarry: row.SNWCarry.toString(),
            snwMedal: row.SNWMedal.toString(),
            tnwUseFactor: UseFactorT,
            tnwAutoPress: row.TMWAutomaticPress.toString(),
            tnwFront9: row.TMWFront9.toString(),
            tnwBack9: row.TMWBack9.toString(),
            tnwMatch: row.TMWMatch.toString(),
            tnwCarry: row.MTWCarry.toString(),
            tnwMedal: row.TMWMedal.toString(),
            tnwWhoGets: row.TMWAdvStrokes.toString(),
            ebWager: row.EBWager.toString(),
            bbWagerF9: row.BBTWagerF9.toString(),
            bbWagerB9: row.BBTWagerB9.toString(),
            bbWager18: row.BBTWager18.toString(),
            ssDoubleEagle: row.StablefordDoubleEagle.toString(),
            ssEaglePoints: row.StablefordEagle.toString(),
            ssBirdie: row.StablefordBirdie.toString(),
            ssPar: row.StablefordPar.toString(),
            ssBogey: row.StablefordBogey.toString(),
            ssDoubleBogey: row.StablefordDoubleBogey.toString(),
            status: false
            //seePicker: res.Result[0].usu_id
          })
          //console.warn("P1: " + row.AdvMovesOn9Holes)
          //console.warn("P2: " + row.StrokesMovedPerRound)
          //console.warn("P3: " + row.CarryMovesAdv)
        }
      });
      //console.warn(tx)
    })
  }

  getUserData = async () => {

    if(this.state.una==0){
      this.setState({
        status:true
      })
    }
    console.warn("Hola")
    const token = await AsyncStorage.getItem('usu_id')
    const actualizar = await AsyncStorage.getItem('actualizar')
    let language = await AsyncStorage.getItem('language')
    if (language != null )
    {
      console.warn('entró')
      this.setState({
        language:language
      })
    }
    else{
      AsyncStorage.setItem('language', this.state.language);
    }
    //console.warn("Act: " + actualizar)
    if(actualizar=="false"){
      console.warn(this.state.una)
      InfoUsuarioAB(token)
        .then((res) => {
          //console.warn(res)
            if(res.estatus==1){

                const lista =[
                {
                  idSettings: res.Result[0].IDSettings,
                  id: res.Result[0].IDUsuario,
                  name: res.Result[0].usu_nombre,
                  last_name: res.Result[0].usu_apellido_paterno,
                  last_name2: res.Result[0].usu_apellido_materno,
                  nick_name: res.Result[0].usu_nickname,
                  email: res.Result[0].usu_email,
                  ghin_number: res.Result[0].usu_ghinnumber,
                  handicap: res.Result[0].usu_handicapindex,
                  cellphone:res.Result[0].usu_telefono,
                  cellphoneAux:this.formatCellphone(res.Result[0].usu_telefono),
                  password:res.Result[0].usu_pass,
                  photo: 'http://13.90.32.51/DragonGolfBackEnd/images' + res.Result[0].usu_imagen
                }]

                ////console.warn(lista[0])

                this.setState({
                asHowAdvMove: res.Result[0].set_how_adv_move,
                asHowManyStrokes: res.Result[0].set_strokes_moved_per_round.toString(),
                asAdvMoves: res.Result[0].set_adv_moves_on_9_holes,
                asDoesCarryMove: res.Result[0].set_carry_moves_adv,
                rabbit16: res.Result[0].set_rabbit_1_6.toString(),
                rabbit712: res.Result[0].set_rabbit_7_12.toString(),
                rabbit1318: res.Result[0].set_rabbit_13_18.toString(),
                medalF9: res.Result[0].set_medal_play_f9.toString(),
                medalB9: res.Result[0].set_medal_play_b9.toString(),
                medal18: res.Result[0].set_medal_play_18.toString(),
                skins: res.Result[0].set_skins.toString(),
                skinCarry: res.Result[0].set_skins_carry_over,
                lowedAdv: res.Result[0].set_lower_adv_f9,
                snwUseFactor: res.Result[0].set_snw_use_factor,
                snwAutoPress: res.Result[0].set_snw_automatic_press.toString(),
                snwFront9: res.Result[0].set_snw_front_9.toString(),
                snwBack9: res.Result[0].set_snw_back_9.toString(),
                snwMatch: res.Result[0].set_snw_match.toString(),
                snwCarry: res.Result[0].set_snw_carry.toString(),
                snwMedal: res.Result[0].set_snw_medal.toString(),
                tnwUseFactor: res.Result[0].set_tmw_use_factor,
                tnwAutoPress: res.Result[0].set_tmw_automatic_press.toString(),
                tnwFront9: res.Result[0].set_tmw_front_9.toString(),
                tnwBack9: res.Result[0].set_tmw_back_9.toString(),
                tnwMatch: res.Result[0].set_tmw_match.toString(),
                tnwCarry: res.Result[0].set_tmw_carry.toString(),
                tnwMedal: res.Result[0].set_tmw_medal.toString(),
                tnwWhoGets: res.Result[0].set_tmw_adv_strokes,
                ebWager: res.Result[0].set_eb_wager.toString(),
                bbWagerF9: res.Result[0].set_bbt_wager_f9.toString(),
                bbWagerB9: res.Result[0].set_bbt_wager_b9.toString(),
                bbWager18: res.Result[0].set_bbt_wager_18.toString(),
                ssDoubleEagle: res.Result[0].set_stableford_double_eagle.toString(),
                ssEaglePoints: res.Result[0].set_stableford_eagle.toString(),
                ssBirdie: res.Result[0].set_stableford_birdie.toString(),
                ssPar: res.Result[0].set_stableford_par.toString(),
                ssBogey: res.Result[0].set_stableford_bogey.toString(),
                ssDoubleBogey: res.Result[0].set_stableford_double_bogey.toString(),
                //seePicker: res.Result[0].usu_id
              })
              //console.warn(res.Result[0])
              this.setState({
                userData: lista[0],
                status: false,
                una:this.state.una + 1
              })

            db.transaction((tx) => {

              let sql = `Insert into Usuario (UsuId,FirstName,LastName,Email,Password,Cellphone,Nickname,GhinNumber,Handicap,Status,FirstLastName)VALUES("${lista[0].id}","${lista[0].name}","${lista[0].last_name2}","${lista[0].email}","
              ${lista[0].password}","${lista[0].cellphone}","${lista[0].nick_name}","${lista[0].ghin_number}","${lista[0].handicap}","Local","${lista[0].last_name}");`
              //console.warn(sql)
                tx.executeSql(
                  sql,
                  [],
                  (tx, results) => {
                    //console.warn('Results', results);
                    if (results.rowsAffected > 0) {
                      //console.warn("OK")
                    } else console.warn('Updation Failed');
                  }
                );
                //console.warn(tx)
              });

            db.transaction((tx) => {

              let sql = `Insert into Settings (idSettings,usu_id,Lenguage,HowAdvMove,StrokesMovedPerRound,AdvMovesOn9Holes,CarryMovesAdv,Rabbit1_6,Rabbit7_12,Rabbit13_18,
              MedalPlayF9,MedalPlayB9,MedalPlay18,Skins,SkinsCarryOver,LowerAdvF9,SNWAutomaticPress,SNWUseFactor,SNWFront9,SNWBack9,SNWMatch,SNWCarry,SNWMedal,
              TMWAutomaticPress,TMWUseFactor,TMWFront9,TMWBack9,TMWMatch,MTWCarry,TMWMedal,TMWAdvStrokes,EBWager,BBTWagerF9,BBTWagerB9,BBTWager18,
              StablefordDoubleEagle,StablefordEagle,StablefordBirdie,StablefordPar,StablefordBogey,StablefordDoubleBogey)` + ` VALUES ("${lista[0].idSettings}","${lista[0].id}","${this.state.language}","
              ${res.Result[0].set_how_adv_move}","${res.Result[0].set_strokes_moved_per_round}","${_9holes}","${carryMov}","${res.Result[0].set_rabbit_1_6.split('.')[0]}","
              ${res.Result[0].set_rabbit_7_12.split('.')[0]}","${res.Result[0].set_rabbit_13_18.split('.')[0]}","${res.Result[0].set_medal_play_f9.split('.')[0]}","
              ${res.Result[0].set_medal_play_b9.split('.')[0]}","${res.Result[0].set_medal_play_18.split('.')[0]}","${res.Result[0].set_skins.split('.')[0]}","
              ${carryOver}","${res.lowedf9}","${res.Result[0].set_snw_automatic_press}","${snwUF}","${res.Result[0].set_snw_front_9}","${res.Result[0].set_snw_back_9}","
              ${res.Result[0].set_snw_match}","${res.Result[0].set_snw_carry}","${res.Result[0].set_snw_medal}","${res.Result[0].set_tmw_automatic_press}","${snwTF}","
              ${res.Result[0].set_tmw_front_9}","${res.Result[0].set_tmw_back_9}","${res.Result[0].set_tmw_match}","${res.Result[0].set_tmw_carry}","
              ${res.Result[0].set_tmw_medal}","${res.Result[0].set_tmw_adv_strokes}","${res.Result[0].set_eb_wager}","${res.Result[0].set_bbt_wager_f9}","
              ${res.Result[0].set_bbt_wager_b9}","${res.Result[0].set_bbt_wager_18}","${res.Result[0].set_stableford_double_eagle}","
              ${res.Result[0].set_stableford_eagle}","${res.Result[0].set_stableford_birdie}","${res.Result[0].set_stableford_par}","
              ${res.Result[0].set_stableford_bogey}","${res.Result[0].set_stableford_double_bogey}");`
                tx.executeSql(
                  sql,
                  [],
                  (tx, results) => {
                    //console.warn('Results', results);
                    if (results.rowsAffected > 0) {
                      //console.warn("OK")
                    } else console.warn('Updation Failed');
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
    else if(this.state.status){
      Alert.alert(
      "DragonGolf",
      "¿Los datos no están actualizados en la base global, si continúa, usará la última versión de Settings",
      [
        {
          text: "Actualizar",
          onPress: () => {
            this.Actualizar()
          },
        },
        {
          text: "Continuar",
          onPress: () => {
            AsyncStorage.setItem('actualizar', "false");
            //this.getUserData()
            this.setState({
              btnAct: false
            })
          },
        },
      ],
      { cancelable: false }
    );
    }
  }

  Actualizar = async () => {
    this.setState({
      status:true
    })
    db.transaction((tx) => {

      let sql = `SELECT * FROM Settings`
      //console.warn("ACTU: " + sql)
      tx.executeSql(sql, [], (tx, results) => {
        //console.warn('Consulta OK')
        //console.warn(results)

        var len = results.rows.length;

        const tempticket = [];

        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          //console.warn(row)

          let usu_id = row.usu_id
          let Lenguage = row.Lenguage

          let move9 = false
          let moveAdv = false
          let ScarryOver = false
          let LAdvF9 = false
          let UseFactorS = false
          let UseFactorT = false

          if(row.AdvMovesOn9Holes==1){
            move9 = true
          }
          if(row.CarryMovesAdv==1){
            moveAdv = true
          }
          if(row.SkinsCarryOver==1){
            ScarryOver = true
          }
          if(row.LowerAdvF9==1){
            LAdvF9 = true
          }
          if(row.SNWUseFactor==1){
            UseFactorS = true
          }
          if(row.TMWUseFactor==1){
            UseFactorT = true
          }

          this.setState({
            idSettings: row.idSettings,
            asHowAdvMove: row.HowAdvMove.toString(),
            asHowManyStrokes: row.StrokesMovedPerRound.toString(),
            asAdvMoves: move9,
            asDoesCarryMove: moveAdv,
            rabbit16: row.Rabbit1_6.toString(),
            rabbit712: row.Rabbit7_12.toString(),
            rabbit1318: row.Rabbit13_18.toString(),
            medalF9: row.MedalPlayF9.toString(),
            medalB9: row.MedalPlayB9.toString(),
            medal18: row.MedalPlay18.toString(),
            skins: row.Skins.toString(),
            skinCarry: ScarryOver,
            lowedAdv: LAdvF9,
            snwUseFactor: UseFactorS,
            snwAutoPress: row.SNWAutomaticPress.toString(),
            snwFront9: row.SNWFront9.toString(),
            snwBack9: row.SNWBack9.toString(),
            snwMatch: row.SNWMatch.toString(),
            snwCarry: row.SNWCarry.toString(),
            snwMedal: row.SNWMedal.toString(),
            tnwUseFactor: UseFactorT,
            tnwAutoPress: row.TMWAutomaticPress.toString(),
            tnwFront9: row.TMWFront9.toString(),
            tnwBack9: row.TMWBack9.toString(),
            tnwMatch: row.TMWMatch.toString(),
            tnwCarry: row.MTWCarry.toString(),
            tnwMedal: row.TMWMedal.toString(),
            tnwWhoGets: row.TMWAdvStrokes.toString(),
            ebWager: row.EBWager.toString(),
            bbWagerF9: row.BBTWagerF9.toString(),
            bbWagerB9: row.BBTWagerB9.toString(),
            bbWager18: row.BBTWager18.toString(),
            ssDoubleEagle: row.StablefordDoubleEagle.toString(),
            ssEaglePoints: row.StablefordEagle.toString(),
            ssBirdie: row.StablefordBirdie.toString(),
            ssPar: row.StablefordPar.toString(),
            ssBogey: row.StablefordBogey.toString(),
            ssDoubleBogey: row.StablefordDoubleBogey.toString(),
            status: false
            //seePicker: res.Result[0].usu_id
          })

         
          //console.warn("P1: " + row.AdvMovesOn9Holes)
          //console.warn("P2: " + row.StrokesMovedPerRound)
          //console.warn("P3: " + row.CarryMovesAdv)

          updateSettingsAB(row.idSettings, usu_id,Lenguage,row.HowAdvMove,row.StrokesMovedPerRound,row.AdvMovesOn9Holes,
            row.CarryMovesAdv,row.Rabbit1_6,row.Rabbit7_12,row.Rabbit13_18,
            row.MedalPlayF9,row.MedalPlayB9,row.MedalPlay18,row.Skins,
            row.SkinsCarryOver,row.LowerAdvF9,row.SNWAutomaticPress, 
            row.SNWUseFactor,row.SNWFront9,row.SNWBack9,row.SNWMatch,
            row.SNWCarry,row.SNWMedal,row.TMWAutomaticPress, row.TMWUseFactor,
            row.TMWFront9,row.TMWBack9,row.TMWMatch,row.MTWCarry,row.TMWMedal,
            row.TMWAdvStrokes,row.EBWager,row.BBTWagerF9,row.BBTWagerB9,
            row.BBTWager18,row.StablefordDoubleEagle,row.StablefordEagle,row.StablefordBirdie,row.StablefordPar,
            row.StablefordBogey,row.StablefordDoubleBogey)
            .then((res) => {
              //console.warn(res)
              try{
                if(res.estatus==1){
                showMessage({
                      message: res.mensaje,
                      type: 'success',
                  });
                AsyncStorage.setItem('actualizar', "false");
                this.setState({
                  btnAct: false
                })
              }  
              else{
                  //setLoading(false)
                  showMessage({
                      message: res.mensaje,
                      type: 'info',
                  });
              }
              }catch(e){
                showMessage({
                  message: "No se actualizaron Settings global",
                  type:'danger',
              });
                AsyncStorage.setItem('actualizar', "true");
              }
          }).catch(error=>{
              //setLoading(true)
              showMessage({
                  message: error,
                  type:'error',
              });
              AsyncStorage.setItem('actualizar', "true");
          })
        }
      });
      //console.warn(tx)
    })
  }

  submit = async () => {

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

      //console.warn(snwUseFactor)

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

      ////console.warn(tnwWhoGets)

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
        user_settings: userData.idSettings,
        user_id: userData.id,
        asData,
        snwData,
        tnwData,
        gsData,
        ebData,
        bbData,
        sfsData,
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

      //console.warn('t: '+tnwData.who_gets_the_adv_strokes)

      db.transaction((tx) => {
            tx.executeSql(
               `UPDATE Settings set idSettings=?,Lenguage=?,HowAdvMove=?,StrokesMovedPerRound=?,AdvMovesOn9Holes=?,CarryMovesAdv=?,Rabbit1_6=?,Rabbit7_12=?,Rabbit13_18=?,MedalPlayF9=?,
              MedalPlayB9=?,MedalPlay18=?,Skins=?,SkinsCarryOver=?,LowerAdvF9=?,SNWAutomaticPress=?,SNWUseFactor=?,SNWFront9=?,SNWBack9=?,SNWMatch=?,SNWCarry=?,SNWMedal=?,
          TMWAutomaticPress=?,TMWUseFactor=?,TMWFront9=?,TMWBack9=?,TMWMatch=?,MTWCarry=?,TMWMedal=?,TMWAdvStrokes=?,EBWager=?,BBTWagerF9=?,BBTWagerB9=?,BBTWager18=?,
          StablefordDoubleEagle=?,StablefordEagle=?,StablefordBirdie=?,StablefordPar=?,StablefordBogey=?,StablefordDoubleBogey=? where usu_id=?`,
              [data.idSettings,language,asData.how_adv_move,asData.how_many_strokes,asData.adv_moves,asData.carry_move_adv,gsDataPlayer.rabbit_1_6,gsDataPlayer.rabbit_7_12,
              gsDataPlayer.rabbit_13_18, gsDataPlayer.medal_play_f9,gsDataPlayer.medal_play_b9,gsDataPlayer.medal_play_18,gsDataPlayer.skins,gsData.skinCarry,
              gsData.lowedAdv,snwData.automatic_presses_every, snwData.useFactor,snwData.front_9,snwData.back_9,snwData.match,snwData.carry,snwData.medal,
              tnwData.automatic_presses_every, tnwData.useFactor,tnwData.front_9,tnwData.back_9,tnwData.match,tnwData.carry,tnwData.medal,tnwData.who_gets_the_adv_strokes,
              ebPlayerData.wager,bbPlayerData.wager_f9,bbPlayerData.wager_b9,bbPlayerData.wager_18,sfsData.double_eagles_points,sfsData.eagle_points,
              sfsData.birdie,sfsData.par,sfsData.bogey,sfsData.double_bogey, data.user_id],
              (tx, results) => {
                //console.warn('Results', results);
                if (results.rowsAffected > 0) {
                  showMessage({
                    message: "Settings guardados localmente",
                    type: 'success',
                });
                AsyncStorage.setItem('actualizar', "true");
                this.setState({
                  btnAct: true
                })
                } else console.warn('Updation Failed');
              }
            );
            //console.warn(tx)
          });

      //console.warn("S: "+data.user_settings)
      //console.warn("U: "+data.user_id)
      //console.warn("R: "+gsDataPlayer.rabbit_1_6)

      updateSettingsAB(data.user_settings,data.user_id,language,asData.how_adv_move,asData.how_many_strokes,asData.adv_moves,
      asData.carry_move_adv,gsDataPlayer.rabbit_1_6,gsDataPlayer.rabbit_7_12,gsDataPlayer.rabbit_13_18,
      gsDataPlayer.medal_play_f9,gsDataPlayer.medal_play_b9,gsDataPlayer.medal_play_18,gsDataPlayer.skins,
      gsData.skinCarry,gsData.lowedAdv,snwData.automatic_presses_every, 
      snwData.useFactor,snwData.front_9,snwData.back_9,snwData.match,
      snwData.carry,snwData.medal,tnwData.automatic_presses_every, tnwData.useFactor,
      tnwData.front_9,tnwData.back_9,tnwData.match,tnwData.carry,tnwData.medal,
      tnwData.who_gets_the_adv_strokes,ebPlayerData.wager,bbPlayerData.wager_f9,bbPlayerData.wager_b9,
      bbPlayerData.wager_18,sfsData.double_eagles_points,sfsData.eagle_points,sfsData.birdie,sfsData.par,
      sfsData.bogey,sfsData.double_bogey)
      .then((res) => {
        //console.warn(res)
        try{
          if(res.estatus==1){
          showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
            });
          AsyncStorage.setItem('actualizar', "false");
          AsyncStorage.setItem('language', language);
          this.setState({
            btnAct: false
          })
        }  
        else{
            //setLoading(false)
            showMessage({
                message: res.mensaje,
                type: 'info',
            });
        }
        }catch(e){
          showMessage({
            message: "No se actualizaron Settings global",
            type:'danger',
        });
          AsyncStorage.setItem('actualizar', "true");
          this.setState({
            btnAct: true
          })
        }
    }).catch(error=>{
        //setLoading(false)
        showMessage({
            message: error,
            type:'error',
        });
        AsyncStorage.setItem('actualizar', "true");
        this.setState({
          btnAct: true
        })
    })
  }
}

export default SettingsView;
