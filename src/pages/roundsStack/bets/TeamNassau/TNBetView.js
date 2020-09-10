import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Switch, Picker, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';
import Colors from '../../../../utils/Colors';
import { Dictionary } from '../../../../utils/Dictionary';
import * as Validations from '../../../../utils/Validations';
import DragonButton from '../../../global/DragonButton';
import Database from '../../../../database/database';
import { actionSaveTNBet } from '../../../../store/actions';
import moment from 'moment';
import { ButtonGroup } from 'react-native-elements';

const database = new Database();

class TNBetView extends Component {
  constructor(props) {
    super(props);

    let useFactor = false;
    let front9 = '';
    let back9 = '';
    let match = '';
    let carry = '';
    let medal = '';
    let autoPress = '2';
    let override = false;
    let advStrokes = '';
    let whoGetsAdv = 0;
    let playerA = props.players.length > 0 ? props.players[0].id : '';
    let playerB = props.players.length > 0 ? props.players[0].id : '';
    let playerC = props.players.length > 0 ? props.players[0].id : '';
    let playerD = props.players.length > 0 ? props.players[0].id : '';
    this.manualPress = 0;

    try {
      const { preferences: { tnwData } } = this.props;
      const cantidad = parseFloat(tnwData.cantidad);
      const tipoCalculo = tnwData.tipo_calculo === 'factor';
      autoPress = tnwData.automatic_presses_every;
      front9 = tipoCalculo ? (cantidad * parseFloat(tnwData.front_9)).toString() : tnwData.front_9;
      back9 = tipoCalculo ? (cantidad * parseFloat(tnwData.back_9)).toString() : tnwData.back_9;
      carry = tipoCalculo ? (cantidad * parseFloat(tnwData.carry)).toString() : tnwData.carry;
      match = tipoCalculo ? (cantidad * parseFloat(tnwData.match)).toString() : tnwData.match;
      medal = tipoCalculo ? (cantidad * parseFloat(tnwData.medal)).toString() : tnwData.medal;
      const whoGetsString = tnwData.who_gets_the_adv_strokes;
      whoGetsAdv = whoGetsString === 'hihcp' ? 0 : whoGetsString === 'lowhcp' ? 1 : whoGetsString === 'each' ? 2 : whoGetsString === 'slidhi' ? 3 : whoGetsString === 'slidlow' ? 4 : whoGetsString === 'automatic' ? 5 : 0;
      playerA = props.players[0].id;
      playerB = props.players[0].id;
      playerC = props.players[0].id;
      playerD = props.players[0].id;
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: TNBetView, line: 74');
      console.log('====================================');
    }

    const item = props.navigation.getParam('item');

    this.betId = 0;
    if (item) {
      this.betId = item.id;
      useFactor = !!item.use_factor;
      front9 = item.front_9.toString();
      back9 = (useFactor ? item.back_9 / item.front_9 : item.back_9).toString();
      match = (useFactor ? item.match / item.front_9 : item.match).toString();
      carry = (useFactor ? item.carry / item.front_9 : item.carry).toString();
      medal = (useFactor ? item.medal / item.front_9 : item.medal).toString();
      autoPress = item.automatic_press_every.toString();
      override = item.manually_override_adv ? true : false;
      advStrokes = item.adv_strokes.toString();
      playerA = item.member_a_id;
      playerB = item.member_b_id;
      playerC = item.member_c_id;
      playerD = item.member_d_id;
      const whoGetsString = item.who_gets_the_adv_strokes;
      whoGetsAdv = whoGetsString === 'hihcp' ? 0 : whoGetsString === 'lowhcp' ? 1 : whoGetsString === 'each' ? 2 : whoGetsString === 'slidhi' ? 3 : whoGetsString === 'slidlow' ? 4 : whoGetsString === 'automatic' ? 5 : 0;
      this.manualPress = item.manual_press;
      props.navigation.setParams({ Title: `${item.member_a} ${item.member_b} vs ${item.member_c} ${item.member_d}` });
    }

    this.state = {
      useFactor,
      front9,
      back9,
      match,
      carry,
      medal,
      autoPress,
      override,
      advStrokes,
      playerA,
      playerB,
      playerC,
      playerD,
      whoGetsAdv
    };

    this.playerSettings = [];
    this.loadPlayerSettings();
  }

  static navigationOptions = ({ navigation }) => {

    return {
      title: navigation.getParam('Title', 'Team Nassau'),
      headerTitleStyle: {
        fontSize: navigation.getParam('Title', 'Team Nassau') === 'Team Nassau' ? 20 : 14
      }
    }
  };

  render() {

    const {
      useFactor,
      front9,
      back9,
      match,
      carry,
      medal,
      autoPress,
      override,
      advStrokes,
      playerA,
      playerB,
      playerC,
      playerD,
      whoGetsAdv
    } = this.state;

    const {
      language,
      players
    } = this.props;

    const {
      save,
      useFactor: useFactorText
    } = Dictionary;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
        <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled" >

          <View style={styles.betField}>
            <View style={styles.useFactorView}>
              <Text style={styles.dollarSym}>{useFactorText[language]}</Text>
              <Switch
                thumbColor={useFactor ? Colors.Primary : Colors.Gray}
                trackColor={{ true: Colors.PrimaryWithOpacity }}
                onValueChange={this.changeUseFactor}
                value={useFactor}
              />
            </View>
          </View>

          <View style={styles.betField}>
            <View style={styles.betRow}>
              <Text style={styles.betText}>Front 9 </Text>
              <View style={{ width: 10 }} />
              <Text style={styles.dollarSym}>$ </Text>
              <TextInput
                style={styles.betInput}
                selectionColor={Colors.Primary}
                placeholder="0"
                keyboardType="numeric"
                returnKeyType='done'
                maxLength={5}
                onChangeText={(front9) => this.setState({ front9 })}
                value={front9}
                onSubmitEditing={_ => this.back9In.focus()}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.betRow}>
              <Text style={styles.betText}>Match </Text>
              <View style={{ width: 10 }} />
              <Text style={styles.dollarSym}>{!useFactor ? '$' : ''} </Text>
              <TextInput
                ref={ref => this.matchIn = ref}
                style={styles.betInput}
                selectionColor={Colors.Primary}
                placeholder="0"
                keyboardType="numeric"
                returnKeyType='done'
                maxLength={5}
                onChangeText={(match) => this.setState({ match })}
                value={match}
                onSubmitEditing={_ => this.carryIn.focus()}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View style={styles.betField}>
            <View style={styles.betRow}>
              <Text style={styles.betText}>Back 9 </Text>
              <View style={{ width: 10 }} />
              <Text style={styles.dollarSym}>{!useFactor ? '$' : ''} </Text>
              <TextInput
                ref={ref => this.back9In = ref}
                style={styles.betInput}
                selectionColor={Colors.Primary}
                placeholder="0"
                keyboardType="numeric"
                returnKeyType='done'
                maxLength={5}
                onChangeText={(back9) => this.setState({ back9 })}
                value={back9}
                onSubmitEditing={_ => this.autoIn.focus()}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.betRow}>
              <Text style={styles.betText}>Carry </Text>
              <View style={{ width: 10 }} />
              <Text style={styles.dollarSym}>{!useFactor ? '$' : ''} </Text>
              <TextInput
                ref={ref => this.carryIn = ref}
                style={styles.betInput}
                selectionColor={Colors.Primary}
                placeholder="0"
                keyboardType="numeric"
                returnKeyType='done'
                maxLength={5}
                onChangeText={(carry) => this.setState({ carry })}
                value={carry}
                onSubmitEditing={_ => this.medalIn.focus()}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View style={styles.betField}>
            <View style={styles.betRow}>
              <Text numberOfLines={2} adjustsFontSizeToFit={true}>Auto Press{'\n'}Every: </Text>
              <View style={{ width: 10 }} />
              <Text style={styles.dollarSym}></Text>
              <TextInput
                ref={ref => this.autoIn = ref}
                style={styles.betInput}
                selectionColor={Colors.Primary}
                placeholder="0"
                keyboardType="numeric"
                returnKeyType='done'
                maxLength={2}
                onChangeText={(autoPress) => this.setState({ autoPress })}
                value={autoPress}
                onSubmitEditing={_ => this.matchIn.focus()}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.betRow}>
              <Text style={styles.betText}>Medal </Text>
              <View style={{ width: 10 }} />
              <Text style={styles.dollarSym}>{!useFactor ? '$' : ''} </Text>
              <TextInput
                ref={ref => this.medalIn = ref}
                style={styles.betInput}
                selectionColor={Colors.Primary}
                placeholder="0"
                keyboardType="numeric"
                returnKeyType='done'
                maxLength={5}
                onChangeText={(medal) => this.setState({ medal })}
                value={medal}
              />
            </View>
          </View>

          <View style={styles.betField}>
            <View style={styles.betRow}>
              <Text style={[styles.betText, { fontSize: 9, width: 60 }]} numberOfLines={2} adjustsFontSizeToFit={true}>Manually{'\n'}Override Adv. </Text>
              <View style={{ width: 10 }} />
              <Text style={styles.dollarSym}></Text>
              <View style={styles.switchView}>
                <Switch
                  value={override}
                  thumbColor={override ? Colors.Primary : Colors.Gray}
                  trackColor={{ true: Colors.PrimaryWithOpacity }}
                  onValueChange={(override) => this.setState({ override })}
                />
              </View>
            </View>
            <View style={styles.betRow}>
              <Text style={[styles.betText, { fontSize: null }]} numberOfLines={2} adjustsFontSizeToFit={true}>Adv. Strokes: </Text>
              <View style={{ width: 10 }} />
              <Text style={styles.dollarSym}></Text>
              <TextInput
                style={styles.betInput}
                selectionColor={Colors.Primary}
                placeholder="0"
                placeholderTextColor={Colors.Black}
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                returnKeyType='done'
                maxLength={6}
                onChangeText={(advStrokes) => this.setState({ advStrokes })}
                value={advStrokes}
                editable={override}
              />
            </View>
          </View>

          <View style={{ width: '100%', paddingVertical: 20, paddingHorizontal: 25 }}>
            <Text>{Dictionary.whoGetsAdv[language]}</Text>
              <ButtonGroup
                onPress={this.onChangeButton}
                selectedIndex={whoGetsAdv}
              buttons={['Hi Hcp', 'Low Hcp', 'Each', 'Slid Hi', 'Slid Low', 'Auto']}
                containerStyle={{ height: 30, margin: 0, marginLeft: 0, marginRight: 0 }}
                textStyle={{ fontSize: 12 }}
                selectedButtonStyle={{ backgroundColor: Colors.Primary }}
              />
          </View>

          <View style={{ height: 20 }} />
          {Platform.OS === 'ios' ?
            <View style={styles.pickerView}>
              <View style={{ flex: 1 }}>
                <Picker
                  mode="dropdown"
                  selectedValue={playerA}
                  onValueChange={(playerA) => this.onChangeSwitch(playerA, 'A')}
                >
                  {
                    players.map(player =>
                      <Picker.Item key={player.id} label={player.nick_name} value={player.id} />
                    )
                  }
                </Picker>
              </View>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Picker
                  mode="dropdown"
                  selectedValue={playerB}
                  onValueChange={(playerB) => this.onChangeSwitch(playerB, 'B')}
                >
                  {
                    players.map(player =>
                      <Picker.Item key={player.id} label={player.nick_name} value={player.id} />
                    )
                  }
                </Picker>
              </View>
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Picker
                  mode="dropdown"
                  selectedValue={playerC}
                  onValueChange={(playerC) => this.onChangeSwitch(playerC, 'C')}
                >
                  {
                    players.map(player =>
                      <Picker.Item key={player.id} label={player.nick_name} value={player.id} />
                    )
                  }
                </Picker>
              </View>
              <View style={{ flex: 1, marginLeft: Platform.OS === 'android' && 30 }}>
                <Picker
                  mode="dropdown"
                  selectedValue={playerD}
                  onValueChange={(playerD) => this.onChangeSwitch(playerD, 'D')}
                >
                  {
                    players.map(player =>
                      <Picker.Item key={player.id} label={player.nick_name} value={player.id} />
                    )
                  }
                </Picker>
              </View>
              <View style={{ position: 'absolute' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>VS</Text>
              </View>
            </View> :
            <View style={styles.pickerView}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <Picker
                  mode="dropdown"
                  selectedValue={playerA}
                  onValueChange={(playerA) => this.onChangeSwitch(playerA, 'A')}
                >
                  {
                    players.map(player =>
                      <Picker.Item key={player.id} label={player.nick_name} value={player.id} />
                    )
                  }
                </Picker>
                <Picker
                  mode="dropdown"
                  selectedValue={playerB}
                  onValueChange={(playerB) => this.onChangeSwitch(playerB, 'B')}
                >
                  {
                    players.map(player =>
                      <Picker.Item key={player.id} label={player.nick_name} value={player.id} />
                    )
                  }
                </Picker>
              </View>
              <View style={{ flex: 1, marginLeft: 20, paddingLeft: 20 }}>
                <Picker
                  mode="dropdown"
                  selectedValue={playerC}
                  onValueChange={(playerC) => this.onChangeSwitch(playerC, 'C')}
                >
                  {
                    players.map(player =>
                      <Picker.Item key={player.id} label={player.nick_name} value={player.id} />
                    )
                  }
                </Picker>
                <Picker
                  mode="dropdown"
                  selectedValue={playerD}
                  onValueChange={(playerD) => this.onChangeSwitch(playerD, 'D')}
                >
                  {
                    players.map(player =>
                      <Picker.Item key={player.id} label={player.nick_name} value={player.id} />
                    )
                  }
                </Picker>
              </View>
              <View style={{ position: 'absolute' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>VS</Text>
              </View>
            </View>
          }

        </ScrollView>

        <View style={styles.bottomButtom}>
          <DragonButton title={save[language]} onPress={this.submit} />
        </View>

      </KeyboardAvoidingView>
    );
  }

  changeUseFactor = (useFactor) => {
    const state = this.state;
    state.useFactor = useFactor;
    if (state.front9 && state.front9 != 0) {
      if (useFactor) {
        state.back9 = (parseFloat(state.back9) / parseFloat(state.front9)).toString();
        state.match = (parseFloat(state.match) / parseFloat(state.front9)).toString();
        state.carry = (parseFloat(state.carry) / parseFloat(state.front9)).toString();
        state.medal = (parseFloat(state.medal) / parseFloat(state.front9)).toString();
      } else {
        state.back9 = (parseFloat(state.back9) * parseFloat(state.front9)).toString();
        state.match = (parseFloat(state.match) * parseFloat(state.front9)).toString();
        state.carry = (parseFloat(state.carry) * parseFloat(state.front9)).toString();
        state.medal = (parseFloat(state.medal) * parseFloat(state.front9)).toString();
      }
    }

    this.setState(state);
  }

  loadPlayerSettings = () => {
    this.props.players.forEach(async player => {
      const tnwData = await database.teamSettingsByPlayerId(player.player_id);
      if (tnwData) this.playerSettings.push(tnwData);
    });
  }

  onChangeSwitch = (player, type) => {
    if (type === 'A') this.setState({ playerA: player });
    if (type === 'B') this.setState({ playerB: player });
    if (type === 'C') this.setState({ playerC: player });
    if (type === 'D') this.setState({ playerD: player });
    try {
      this.calculateAdvStrokes(player, type);
      this.changeBetsValues(player, type);
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: TNBetView, line: 436');
      console.log('====================================');
    }
  }

  onChangeButton = (index) => {
    this.setState({ whoGetsAdv: index });
  }

  calculateAdvStrokes = async (player, type) => {
    const { override } = this.state;
    let playerA = this.state.playerA;
    let playerB = this.state.playerB;
    let playerC = this.state.playerC;
    let playerD = this.state.playerD;
    const { players, hcpAdj, playersWithStrokes } = this.props;
    let indexA = -1;
    let indexB = -1;
    let indexC = -1;
    let indexD = -1;
    let advStrokes = 0;

    switch (type) {
      case 'A':
        playerA = player;
        break;
      case 'B':
        playerB = player;
        break;
      case 'C':
        playerC = player;
        break;
      case 'D':
        playerD = player;
        break;
    }

    if (playerA && playerB && playerC && playerD) {
      indexA = players.findIndex(item => item.id === playerA);
      indexB = players.findIndex(item => item.id === playerB);
      indexC = players.findIndex(item => item.id === playerC);
      indexD = players.findIndex(item => item.id === playerD);
    }

    let advStrokesC = 0;
    let advStrokesD = 0;

    if (indexA >= 0 && indexB >= 0 && indexC >= 0 && indexD >= 0) {
      const strokesA = ((players[indexA].handicap * players[indexA].tee.slope / 113) * hcpAdj).toFixed(0);
      const strokesB = ((players[indexB].handicap * players[indexB].tee.slope / 113) * hcpAdj).toFixed(0);
      const strokesC = ((players[indexC].handicap * players[indexC].tee.slope / 113) * hcpAdj).toFixed(0);
      const strokesD = ((players[indexD].handicap * players[indexD].tee.slope / 113) * hcpAdj).toFixed(0);

      let strokes = await database.listPlayersConfrontations(playerA);
      let strokesCId = strokes.findIndex(item => item.member_a_id === playerA && item.member_b_id === playerC);
      let strokesDId = strokes.findIndex(item => item.member_a_id === playerA && item.member_b_id === playerD);

      if (players[indexA].player_id === 1) {
        const playerCId = players[indexC].player_id;
        const playerCIndex = playersWithStrokes.findIndex(item => item.id === playerCId);
        const playerDId = players[indexD].player_id;
        const playerDIndex = playersWithStrokes.findIndex(item => item.id === playerDId);

        if (strokesCId >= 0) {
          advStrokesC = strokes[strokesCId].adv_strokes;
        } else if (playerCIndex >= 0) {
          advStrokesC = playersWithStrokes[playerCIndex].strokes;
        } else {
          advStrokesC = strokesA - strokesC;
        }

        if (strokesDId >= 0) {
          advStrokesD = strokes[strokesDId].adv_strokes;
        } else if (playerDIndex >= 0) {
          advStrokesD = playersWithStrokes[playerDIndex].strokes;
        } else {
          advStrokesD = strokesA - strokesD;
        }
      } else {
        if (strokesCId >= 0) advStrokesC = strokes[strokesCId].adv_strokes;
        else advStrokesC = strokesA - strokesC;
        if (strokesDId >= 0) advStrokesD = strokes[strokesDId].adv_strokes;
        else advStrokesD = strokesA - strokesD;
      }

      advStrokes = parseFloat(advStrokesC + advStrokesD);

      strokes = await database.listPlayersConfrontations(playerB);
      strokesCId = strokes.findIndex(item => item.member_a_id === playerB && item.member_b_id === playerC);
      strokesDId = strokes.findIndex(item => item.member_a_id === playerB && item.member_b_id === playerD);

      if (players[indexB].player_id === 1) {
        const playerCId = players[indexC].player_id;
        const playerCIndex = playersWithStrokes.findIndex(item => item.id === playerCId);
        const playerDId = players[indexD].player_id;
        const playerDIndex = playersWithStrokes.findIndex(item => item.id === playerDId);

        if (strokesCId >= 0) {
          advStrokesC = strokes[strokesCId].adv_strokes;
        } else if (playerCIndex >= 0) {
          advStrokesC = playersWithStrokes[playerCIndex].strokes;
        } else {
          advStrokesC = strokesB - strokesC;
        }

        if (strokesDId >= 0) {
          advStrokesD = strokes[strokesDId].adv_strokes;
        } else if (playerDIndex >= 0) {
          advStrokesD = playersWithStrokes[playerDIndex].strokes;
        } else {
          advStrokesD = strokesB - strokesD;
        }
      } else {
        if (strokesCId >= 0) advStrokesC = strokes[strokesCId].adv_strokes;
        else advStrokesC = strokesB - strokesC;
        if (strokesDId >= 0) advStrokesD = strokes[strokesDId].adv_strokes;
        else advStrokesD = strokesB - strokesD;
      }

      advStrokes += parseFloat(advStrokesC + advStrokesD);
      advStrokes /= 2;
    }

    if (!override) {
      this.setState({ advStrokes: advStrokes ? parseFloat(advStrokes.toFixed(1)).toString() : '0' });
    }
  }

  changeBetsValues = (player, type) => {
    const { players } = this.props;
    if (type === 'C' || type === 'D') {
      const index = players.findIndex(item => item.id === player);
      if (this.playerSettings[index]) {
        const settings = this.playerSettings[index];
        const useFactor = settings.use_factor === 'factor';
        const value = settings.cantidad;
        const whoGetsString = settings.who_gets_the_adv_strokes;
        const whoGetsAdv = whoGetsString === 'hihcp' ? 0 : whoGetsString === 'lowhcp' ? 1 : whoGetsString === 'each' ? 2 : whoGetsString === 'slidhi' ? 3 : whoGetsString === 'slidlow' ? 4 : whoGetsString === 'automatic' ? 5 : 0;
        this.setState({
          autoPress: settings.automatic_presses_every.toString(),
          front9: useFactor ? (value * settings.front_9).toString() : settings.front_9.toString(),
          back9: useFactor ? (value * settings.back_9).toString() : settings.back_9.toString(),
          match: useFactor ? (value * settings.match).toString() : settings.match.toString(),
          carry: useFactor ? (value * settings.carry).toString() : settings.carry.toString(),
          medal: useFactor ? (value * settings.medal).toString() : settings.medal.toString(),
          whoGetsAdv
        });
      }
    }
  }

  fieldValidations = () => {

    const {
      front9,
      back9,
      autoPress,
      match,
      carry,
      medal,
      advStrokes,
      playerA,
      playerB,
      playerC,
      playerD
    } = this.state;

    const {
      language
    } = this.props;

    const { ok: front9Ok } = Validations.floatNumberValidation(front9 ? front9 : 1);
    if (!front9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Front 9`
      );
      return false;
    }

    const { ok: back9Ok } = Validations.floatNumberValidation(back9 ? back9 : 1);
    if (!back9Ok) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Back 9`
      );
      return false;
    }

    const { ok: autoPressOk } = Validations.intNumberValidation(autoPress ? autoPress : 1);
    if (!autoPressOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Auto Press Every`
      );
      return false;
    }

    const { ok: matchOk } = Validations.floatNumberValidation(match ? match : 1);
    if (!matchOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Match`
      );
      return false;
    }

    const { ok: carryOk } = Validations.floatNumberValidation(carry ? carry : 1);
    if (!carryOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Carry`
      );
      return false;
    }

    const { ok: medalOk } = Validations.floatNumberValidation(medal ? medal : 1);
    if (!medalOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Medal`
      );
      return false;
    }

    const { ok: advStrokesOk } = Validations.floatNumberValidation(advStrokes ? advStrokes : 1);
    if (!advStrokesOk) {
      Alert.alert(
        'Error',
        `${Dictionary.verifyField[language]} Adv. Strokes`
      );
      return false;
    }

    if (!playerA || !playerB) {
      Alert.alert(
        'Error',
        Dictionary.mustSelect[language]
      );
      return false;
    }

    if (playerA === playerC || playerA === playerD || playerB === playerC || playerB === playerD) {
      Alert.alert(
        'Error',
        Dictionary.samePlayer[language]
      );
      return false;
    }

    return true;
  }

  submit = () => {
    if (this.fieldValidations()) {
      const {
        useFactor,
        front9,
        back9,
        match,
        carry,
        medal,
        autoPress,
        override,
        advStrokes,
        playerA,
        playerB,
        playerC,
        playerD,
        whoGetsAdv
      } = this.state;

      const indexA = this.props.players.findIndex(item => item.id === playerA);
      const indexB = this.props.players.findIndex(item => item.id === playerB);
      const indexC = this.props.players.findIndex(item => item.id === playerC);
      const indexD = this.props.players.findIndex(item => item.id === playerD);

      const TNBet = {
        id: this.betId,
        round_id: this.props.roundId,
        member_a_id: playerA,
        member_b_id: playerB,
        member_a: this.props.players[indexA].nick_name,
        member_b: this.props.players[indexB].nick_name,
        member_c_id: playerC,
        member_d_id: playerD,
        member_c: this.props.players[indexC].nick_name,
        member_d: this.props.players[indexD].nick_name,
        automatic_press_every: autoPress ? autoPress : '0',
        use_factor: useFactor ? 1 : 0,
        front_9: front9 ? front9 : '0',
        back_9: back9 ? useFactor ? back9 * front9 : back9 : '0',
        match: match ? useFactor ? match * front9 : match : '0',
        carry: carry ? useFactor ? carry * front9 : carry : '0',
        medal: medal ? useFactor ? medal * front9 : medal : '0',
        who_gets_the_adv_strokes: whoGetsAdv === 0 ? 'hihcp' : whoGetsAdv === 1 ? 'lowhcp' : whoGetsAdv === 3 ? 'slidhi' : whoGetsAdv === 4 ? 'slidlow' : whoGetsAdv === 5 ? 'automatic' : 'hihcp',
        adv_strokes: advStrokes ? advStrokes : '0',
        manually_override_adv: override ? 1 : 0,
        manually_adv_strokes: advStrokes ? advStrokes : '0',
        manual_press: this.manualPress,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      this.props.saveTNBet(TNBet);
    }
  }
}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  preferences: state.reducerPreferences,
  players: state.reducerRoundPlayers,
  hcpAdj: state.reducerHcpAdj,
  playersWithStrokes: state.reducerPlayers,
  roundId: state.reducerRoundId,
});

const mapDispatchToProps = dispatch => ({
  saveTNBet: (values) => {
    dispatch(actionSaveTNBet(values));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TNBetView);
