import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Switch,
  TextInput,
  Picker,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import DragonButton from '../../global/DragonButton';
import styles from './styles';
import Colors from '../../../utils/Colors';
import { Dictionary } from '../../../utils/Dictionary';
import FormatCellphone from '../../../utils/FormatCellphone';
import HeaderButton from '../../global/HeaderButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Validations from '../../../utils/Validations';
import moment from 'moment';
import { actionSaveSNWPlayer, actionGetSNWPlayer, actionGetTNWPlayer, actionSaveTNWPlayer, actionGetGS, actionSaveGS, actionGetEB, actionSaveEB, actionGetAS, actionSaveAS, actionGetBB, actionSaveBB } from '../../../store/actions';
import Details from '../../../utils/Details';

const BlankProfile = require('../../../../assets/globals/blank-profile.png');

class PlayerInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asCollapsed: true,
      advantageMove: '',
      strokesPerRound: null,
      advMovesHoles: false,
      carryMoveAdv: false,
      gsCollapsed: true,
      rabbit16: '',
      rabbit712: '',
      rabbit1318: '',
      medalF9: '',
      medalB9: '',
      medal18: '',
      skins: '',
      skinCarryOver: false,
      lowedAdv: false,
      snwCollapsed: true,
      tnwCollapsed: true,
      ebCollapsed: true,
      bbtCollapsed: true,
      snwAutoPressesEvery: '',
      snwUseFactor: false,
      snwFront9: '',
      snwBack9: '',
      snwMatch: '',
      snwCarry: '',
      snwMedal: '',
      tnwFront9: '',
      tnwAutoPressesEvery: '',
      tnwUseFactor: false,
      tnwBack9: '',
      tnwMatch: '',
      tnwCarry: '',
      tnwMedal: '',
      whoGetAdvStrokes: 'each',
      ebWager: '',
      bbtWagerF9: '',
      bbtWagerB9: '',
      bbtWager18: ''
    };

    const { id } = props.navigation.getParam('item');
    props.getSNW(id);
    props.getTNW(id);
    props.getGS(id);
    props.getEB(id);
    props.getAS(id);
    props.getBB(id);

    this.inputs = {};
  }

  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item');
    return {
      title: `${navigation.getParam('item').name} ${navigation.getParam('item').last_name}`,
      headerRight: (
        <HeaderButton
          iconName="md-create"
          onPress={() => navigation.navigate('EditPlayerView', { item: item })}
        />
      ),
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.snwData !== this.props.snwData) {
      const { snwData } = nextProps;
      try {
        this.setState({
          snwAutoPressesEvery: snwData.automatic_presses_every.toString(),
          snwUseFactor: snwData.use_factor === 'factor',
          snwFront9: snwData.use_factor === 'factor' ? snwData.cantidad.toString() : snwData.front_9.toString(),
          snwBack9: snwData.back_9.toString(),
          snwMatch: snwData.match.toString(),
          snwCarry: snwData.carry.toString(),
          snwMedal: snwData.medal.toString(),
        });
      } catch (error) {
        console.log('====================================');
        console.log(error + ' file: PlayerInfoView, line: 107');
        console.log('====================================');
      }
    }

    if (nextProps.tnwData !== this.props.tnwData) {
      const { tnwData } = nextProps;
      try {
        this.setState({
          tnwUseFactor: tnwData.use_factor === 'factor',
          tnwFront9: tnwData.use_factor === 'factor' ? tnwData.cantidad.toString() : tnwData.front_9.toString(),
          tnwAutoPressesEvery: tnwData.automatic_presses_every.toString(),
          tnwBack9: tnwData.back_9.toString(),
          tnwMatch: tnwData.match.toString(),
          tnwCarry: tnwData.carry.toString(),
          tnwMedal: tnwData.medal.toString(),
          whoGetAdvStrokes: tnwData.who_gets_the_adv_strokes.toString(),
        });
      } catch (error) {
        console.log('====================================');
        console.log(error + ' file: PlayerInfoView, line: 125');
        console.log('====================================');
      }
    }

    if (nextProps.gsData !== this.props.gsData) {
      const { gsData } = nextProps;
      try {
        this.setState({
          rabbit16: gsData.rabbit_1_6.toString(),
          rabbit712: gsData.rabbit_7_12.toString(),
          rabbit1318: gsData.rabbit_13_18.toString(),
          medalF9: gsData.medal_play_f9.toString(),
          medalB9: gsData.medal_play_b9.toString(),
          medal18: gsData.medal_play_18.toString(),
          skins: gsData.skins.toString(),
          skinCarryOver: gsData.skins_carry_over ? true : false,
          lowedAdv: gsData.lowed_adv_on_f9 ? true : false,
        });
      } catch (error) {
        console.log('====================================');
        console.log(error + ' file: PlayerInfoView, line: 147');
        console.log('====================================');
      }
    }

    if (nextProps.ebData !== this.props.ebData) {
      const { ebData } = nextProps;
      try {
        this.setState({
          ebWager: ebData.wager.toString(),
        });
      } catch (error) {
        console.log('====================================');
        console.log(error + ' file: PlayerInfoView, line: 162');
        console.log('====================================');
      }
    }

    if (nextProps.asData !== this.props.asData) {
      const { asData } = nextProps;
      try {
        this.setState({
          advantageMove: asData.advantage_move.toString(),
          strokesPerRound: asData.strokes_moved_per_round.toString(),
          advMovesHoles: asData.adv_mov_if_only_9_holes ? true : false,
          carryMoveAdv: asData.does_the_carry_move ? true : false,
        });
      } catch (error) {
        console.log('====================================');
        console.log(error + ' file: PlayerInfoView, line: 176');
        console.log('====================================');
      }
    }

    if (nextProps.bbData !== this.props.bbData) {
      const { bbData } = nextProps;
      try {
        this.setState({
          bbtWagerF9: bbData.wager_f9.toString(),
          bbtWagerB9: bbData.wager_b9.toString(),
          bbtWager18: bbData.wager_18.toString(),
        });
      } catch (error) {
        console.log('====================================');
        console.log(error + ' file: PlayerInfoView, line: 196');
        console.log('====================================');
      }
    }
  }

  render() {

    const { navigation: { state: { params: { item } } } } = this.props;

    const {
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
      snwAutoPressesEvery,
      snwUseFactor,
      snwFront9,
      snwBack9,
      snwMatch,
      snwCarry,
      snwMedal,
      tnwAutoPressesEvery,
      tnwUseFactor,
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
    } = this.state;

    const {
      language,
      navigation
    } = this.props;

    const {
      ghinNumber,
      handicap,
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
      useFactor: useFactorText
    } = Dictionary;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
        <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps='handled'>
          <View style={styles.profileCard}>
            <View style={styles.imageNameView}>
              <Image
                source={item.photo ? { uri: item.photo } : BlankProfile}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30
                }}
              />
              <View style={styles.userInfoView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.nicknameText}>({item.nick_name})</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => Linking.openURL('mailto:' + item.email)}>
                    <Text style={[styles.textLink, { color: Colors.Primary, marginRight: 10 }]}>{item.email}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL('tel://' + item.cellphone)}>
                    <Text style={styles.textLink} ellipsizeMode="tail">{this.formatCellphone()}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, height: '100%', alignItems: 'flex-end' }}>
                {item.id !== 1 && <TouchableOpacity onPress={_ => navigation.navigate('HistoryScreen', { playerId: item.id })}>
                  <MaterialIcons name='history' size={25} color={Colors.Black} />
                </TouchableOpacity>}
              </View>
            </View>
            <View style={styles.infoGolfView}>
              <View>
                <Text style={styles.cardTitle}>{ghinNumber[language]}</Text>
                <Text style={styles.cardInfo}>{item.ghin_number}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.hcpIndex })}>
                  <Text style={styles.cardTitle}>{handicap[language]} <Text style={{ color: Colors.Primary }}>?</Text></Text>
                </TouchableOpacity>
                <Text style={styles.cardInfo}>{item.handicap}</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Strokes</Text>
                <Text style={styles.cardInfo}>{item.strokes ? item.strokes : 0}</Text>
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
                      <Text style={[styles.radioButtonText, { color: strokesPerRound === '0.5' ? Colors.Primary : Colors.Black }]}>0.5</Text>
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
                  onValueChange={this.changeSNUseFactor}
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
                    onChangeText={(snwFront9) => this.setState({ snwFront9 })}
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
                  onValueChange={this.changeTNUseFactor}
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
                    onChangeText={(tnwFront9) => this.setState({ tnwFront9 })}
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
    );
  }

  changeSNUseFactor = (snwUseFactor) => {
    const state = this.state;
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

  formatCellphone = () => {
    let { navigation: { state: { params: { item: { cellphone } } } } } = this.props;
    let formatted = '';
    let pureCell = '';
    if (cellphone.length > 10) {
      pureCell = cellphone.substr(cellphone.length - 10);
    }

    formatted = cellphone.substr(0, cellphone.length - 10);

    formatted += ' ' + FormatCellphone(pureCell);

    return formatted;
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

  submit = () => {

    const player = this.props.navigation.getParam('item');

    const gsOk = this.gsValidations();
    if (gsOk) {
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
        player_id: player.id,
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

      this.props.saveGS(gsData);
    }

    const snwOk = this.snwValidations();
    if (snwOk) {
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
        player_id: player.id,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      this.props.saveSNW(snwData);
    }

    const tnwOk = this.tnwValidations();
    if (tnwOk) {
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
        player_id: player.id,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      this.props.saveTNW(tnwData);

      const {
        ebWager
      } = this.state;

      const ebData = {
        wager: ebWager,
        player_id: player.id,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      this.props.saveEB(ebData);

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
        player_id: player.id,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      this.props.saveAS(asData);

      const {
        bbtWagerF9,
        bbtWagerB9,
        bbtWager18
      } = this.state;

      const bbData = {
        wager_f9: bbtWagerF9,
        wager_b9: bbtWagerB9,
        wager_18: bbtWager18,
        player_id: player.id,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      this.props.saveBB(bbData);
    }
  }

}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  snwData: state.reducerSNWPlayer,
  tnwData: state.reducerTNWPlayer,
  gsData: state.reducerGSData,
  ebData: state.reducerEBData,
  asData: state.reducerASData,
  bbData: state.reducerBBData,
});

const mapDispatchToProps = dispatch => ({
  saveSNW: (values) => {
    dispatch(actionSaveSNWPlayer(values));
  },
  saveTNW: (values) => {
    dispatch(actionSaveTNWPlayer(values));
  },
  getSNW: (value) => {
    dispatch(actionGetSNWPlayer(value));
  },
  getTNW: (value) => {
    dispatch(actionGetTNWPlayer(value));
  },
  getGS: (value) => {
    dispatch(actionGetGS(value));
  },
  saveGS: (values) => {
    dispatch(actionSaveGS(values));
  },
  getEB: (values) => {
    dispatch(actionGetEB(values));
  },
  saveEB: (values) => {
    dispatch(actionSaveEB(values));
  },
  getAS: (value) => {
    dispatch(actionGetAS(value));
  },
  saveAS: (values) => {
    dispatch(actionSaveAS(values));
  },
  getBB: (value) => {
    dispatch(actionGetBB(value));
  },
  saveBB: (values) => {
    dispatch(actionSaveBB(values));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfoView);
