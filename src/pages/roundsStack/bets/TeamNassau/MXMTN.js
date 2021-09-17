import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Switch, Alert, Platform, TouchableOpacity } from 'react-native';
import styles from '../styles';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import Colors from '../../../../utils/Colors';
import { Dictionary } from '../../../../utils/Dictionary';
import DragonButton from '../../../global/DragonButton';
import moment from 'moment';
import { ListadoAmigosRonda, ValidaDetalleApuestaTeam, CrearDetalleApuestaTeam, InfoUsuarioAB, CalcularGolpesVentajaTeam } from '../../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

const {
  save,
  useFactor: useFactorText,
  error,
  successSaveTeeData,
  betsRepeat,
  fewPlayerTN,
  Manually,
  OverrideAdv,
  auto,
  Press,
  submit
} = Dictionary;


class SNBetView extends Component {
  constructor(props) {
    super(props);

    let useFactor = false;
    let front9 = 0;
    let back9 = 0;
    let match = 0;
    let carry = 0;
    let medal = 0;
    let autoPress = 0;
    let override = false;
    let advStrokes = 0;
    let playerA = 0//props.players.length > 0 ? props.players[0].id : 0;
    let playerB = 0//props.players.length > 0 ? props.players[0].id : 0;
    this.manualPress = 0;

    try {
      //const { preferences: { snwData } } = this.props;
      //const cantidad = parseFloat(snwData.cantidad);
      const tipoCalculo = snwData.tipo_calculo === 'factor';
      autoPress = 0//snwData.automatic_presses_every;
      front9 = 0//tipoCalculo ? (cantidad * parseFloat(snwData.front_9)).toString() : snwData.front_9;
      back9 = 0//tipoCalculo ? (cantidad * parseFloat(snwData.back_9)).toString() : snwData.back_9;
      carry = 0//tipoCalculo ? (cantidad * parseFloat(snwData.carry)).toString() : snwData.carry;
      match = 0//tipoCalculo ? (cantidad * parseFloat(snwData.match)).toString() : snwData.match;
      medal = 0//tipoCalculo ? (cantidad * parseFloat(snwData.medal)).toString() : snwData.medal;
      playerA = 0//props.players[0].id;
      playerB = 0//props.players[0].id;
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: SNBetView, line: 74');
      console.log('====================================');
    }

    /*const item = props.navigation.getParam('item');

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
      this.manualPress = item.manual_press;
      props.navigation.setParams({ Title: `${item.member_a} vs ${item.member_b}` });
    }*/

    console.warn(this.props)

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
      language: '',
      players: [],
      IDBet:this.props.route.params.IDBet,
      IDRound:this.props.route.params.IDRound,
      selectedItems : []
    };

    this.playerSettings = [];
  }

  static navigationOptions = ({ navigation }) => {

    return {
      title: navigation.getParam('Title', 'Single Nassau'),
    }
  };

  componentDidMount() {
    this.ListadoTodos()
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {

    const {
      carga,
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
      playerB
    } = this.state;

    const {
      language,
      players
    } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
        <Spinner
            visible={carga}
            color={Colors.Primary} />
        <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled" >

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.goBack()}>
              <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
            <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{Dictionary.CreateBet[language]}</Text>
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
                blurOnSubmit={false}
                selectTextOnFocus={true}
              />
            </View>
          </View>

        {/*

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
                selectTextOnFocus={true}
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
                selectTextOnFocus={true}
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
                selectTextOnFocus={true}
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
                selectTextOnFocus={true}
              />
            </View>
          </View>

          <View style={styles.betField}>
            <View style={styles.betRow}>
              <Text numberOfLines={2} adjustsFontSizeToFit={true}>{auto['es']}{'\n'}{Press['es']} </Text>
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
                selectTextOnFocus={true}
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
                selectTextOnFocus={true}
              />
            </View>
          </View>

          <View style={styles.betField}>
            <View style={styles.betRow}>
              <Text style={[styles.betText, { fontSize: 14, width: 60 }]} numberOfLines={2} adjustsFontSizeToFit={true}>{Manually['es']}{'\n'}{OverrideAdv['es']} </Text>
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
                selectTextOnFocus={true}
              />
            </View>
          </View>

        */}

          <View style={{ height: 20 }} />
            <View style={{ flex: 1 }}>
            <MultiSelect
              hideTags
              items={players}
              uniqueKey="id"
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={ (text)=> console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor={Colors.Primary}
              submitButtonText={submit[language]}
            />
            </View>
            {/*<View style={{ flex: 1, marginLeft: Platform.OS === 'android' && 30 }}>
              <Picker
                mode="dropdown"
                selectedValue={playerB}
                onValueChange={(playerB) => this.onChangeSwitch(playerB, 'B')}
              >
                {
                  players.map(player =>
                    <Picker.Item key={player.id} label={player.nickname} value={player.id} />
                  )
                }
              </Picker>
            </View>
            <View style={{ position: 'absolute' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>VS</Text>
            </View>*/}

        </ScrollView>

        <View style={styles.bottomButtom}>
          <DragonButton title={save[language]} onPress={this.submit} />
        </View>

        {/*<View style={styles.bottomButtom}>
          <DragonButton title={'M & M'} onPress={this.submit} />
        </View>*/}

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

  ListadoTodos = async () => {
    let idUsu = await AsyncStorage.getItem('usu_id')
    let language = await AsyncStorage.getItem('language')
    let IDRound = await AsyncStorage.getItem('IDRound')
    this.setState({
        language:language
    })
    console.warn(idUsu)
    console.warn(IDRound)
    ListadoAmigosRonda(idUsu, IDRound)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.PlayerId,
                      nickname: item.usu_nickname,
                      name: item.usu_nickname
                    }
                ))

                this.setState({
                  players:list,
                  carga:false,
                  playerA:list[0].id,
                  playerB:list[0].id
                })
            }
            else{
              this.setState({
                players:[],
                carga:false
              })
            }
        })
    InfoUsuarioAB(idUsu)
        .then((res2) => {
          console.warn(res2)
          if(res2.estatus == 1){
            let useFactor = false
            if(res2.Result[0].set_tmw_use_factor == 1 ){
              useFactor = true
            }
              else{
              useFactor = false
              }
              console.warn(useFactor)
            this.setState({
              useFactor : useFactor,
              front9 : res2.Result[0].set_tmw_front_9.toString(),
              back9 : res2.Result[0].set_tmw_back_9.toString(),
              match : res2.Result[0].set_tmw_match.toString(),
              carry : res2.Result[0].set_tmw_carry.toString(),
              medal : res2.Result[0].set_tmw_medal.toString(),
              autoPress : res2.Result[0].set_tmw_automatic_press.toString(),
              //advStrokes : res2.Result[0].usu_handicapindex,
              whoGetsAdv : res2.Result[0].set_tmw_adv_strokes.toString() === 'Hi Handicap' ? 0 : res2.Result[0].set_tmw_adv_strokes.toString() === 'Low Handicap' ? 1 : res2.Result[0].set_tmw_adv_strokes.toString() === 'Each' ? 2 : res2.Result[0].set_tmw_adv_strokes.toString() === 'Slid Hi' ? 3 : res2.Result[0].set_tmw_adv_strokes.toString() === 'Slid Low' ? 4 : 5
            })
          }
          else{
            this.setState({
              useFactor : false,
              front9 : 0,
              back9 : 0,
              match : 0,
              carry : 0,
              medal : 0,
              autoPress : 0,
              advStrokes : 0,
              whoGetsAdv: 0
            })
          }
        })
  }

  onChangeSwitch = (player, type) => {
    if (type === 'A'){
       this.setState({ playerA: player });
       ListadoAmigosRondaData(player,this.state.playerB, this.state.IDRound)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
            let useFactor = false
            if(res.Result[0].set_snw_use_factor == 1 ){
              useFactor = true
            }
              else{
              useFactor = false
              }
              console.warn(useFactor)
            this.setState({
              useFactor : useFactor,
              front9 : res.Result[0].set_snw_front_9.toString(),
              back9 : res.Result[0].set_snw_back_9.toString(),
              match : res.Result[0].set_snw_match.toString(),
              carry : res.Result[0].set_snw_carry.toString(),
              medal : res.Result[0].set_snw_medal.toString(),
              autoPress : res.Result[0].set_snw_automatic_press.toString(),
              advStrokes : res.Result[0].set_golpesventaja.toString()
            })
          }
          else{
            this.setState({
              useFactor : false,
              front9 : 0,
              back9 : 0,
              match : 0,
              carry : 0,
              medal : 0,
              autoPress : 0,
              advStrokes : 0
            })
          }
        })
    }
    if (type === 'B'){
      this.setState({ playerB: player });
      ListadoAmigosRondaData(this.state.playerA,player, this.state.IDRound)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
            let useFactor = false
            if(res.Result[0].set_snw_use_factor == 1 ){
              useFactor = true
            }
              else{
              useFactor = false
              }
              console.warn(useFactor)
            this.setState({
              useFactor : useFactor,
              front9 : res.Result[0].set_snw_front_9.toString(),
              back9 : res.Result[0].set_snw_back_9.toString(),
              match : res.Result[0].set_snw_match.toString(),
              carry : res.Result[0].set_snw_carry.toString(),
              medal : res.Result[0].set_snw_medal.toString(),
              autoPress : res.Result[0].set_snw_automatic_press.toString(),
              advStrokes : res.Result[0].set_golpesventaja.toString()
            })
          }
          else{
            this.setState({
              useFactor : false,
              front9 : 0,
              back9 : 0,
              match : 0,
              carry : 0,
              medal : 0,
              autoPress : 0,
              advStrokes : 0
            })
          }
        })
      }
    //this.calculateAdvStrokes(player, type);
    //this.changeBetsValues(player, type);
  }

  calculateAdvStrokes = async (player, type) => {
    const { players, playerA, playerB, override } = this.state;
    //const { players, hcpAdj, playersWithStrokes } = this.props;
    let advStrokes = 0;
    if (type === 'A') {
      if (player && playerB) {
        const strokes = 0//await database.listPlayersConfrontations(player);
        const idx = strokes.findIndex(item => item.member_b_id === playerB);
        if (idx >= 0) {
          advStrokes = strokes[idx].adv_strokes;
        } else {
          const indexA = players.findIndex(item => item.id === player);
          const indexB = players.findIndex(item => item.id === playerB);
          const strokesA = ((players[indexA].handicap * players[indexA].tee.slope / 113) * hcpAdj).toFixed(0);
          const strokesB = ((players[indexB].handicap * players[indexB].tee.slope / 113) * hcpAdj).toFixed(0);

          if (players[indexA].player_id === 1) {
            const playerId = players[indexB].player_id;
            const playerIndex = playersWithStrokes.findIndex(item => item.id === playerId);
            if (playerIndex >= 0) {
              advStrokes = playersWithStrokes[playerIndex].strokes;
            } else {
              advStrokes = strokesA - strokesB;
            }
          } else if (players[indexB].player_id === 1) {
            const playerId = players[indexA].player_id;
            const playerIndex = playersWithStrokes.findIndex(item => item.id === playerId);
            if (playerIndex >= 0) {
              advStrokes = -playersWithStrokes[playerIndex].strokes;
            } else {
              advStrokes = strokesA - strokesB;
            }
          } else {
            advStrokes = strokesA - strokesB;
          }
        }
      }
    }

    if (type === 'B') {
      if (player && playerA) {
        const strokes = 0//await database.listPlayersConfrontations(playerA);
        const idx = strokes.findIndex(item => item.member_b_id === player);
        if (idx >= 0) {
          advStrokes = strokes[idx].adv_strokes;
        } else {
          const indexA = players.findIndex(item => item.id === playerA);
          const indexB = players.findIndex(item => item.id === player);
          if (indexA >= 0 && indexB >= 0) {
            const strokesA = ((players[indexA].handicap * players[indexA].tee.slope / 113) * hcpAdj).toFixed(0);
            const strokesB = ((players[indexB].handicap * players[indexB].tee.slope / 113) * hcpAdj).toFixed(0);

            if (players[indexA].player_id === 1) {
              const playerId = players[indexB].player_id;
              const playerIndex = playersWithStrokes.findIndex(item => item.id === playerId);
              if (playerIndex >= 0) {
                advStrokes = playersWithStrokes[playerIndex].strokes;
              } else {
                advStrokes = strokesA - strokesB;
              }
            } else if (players[indexB].player_id === 1) {
              const playerId = players[indexA].player_id;
              const playerIndex = playersWithStrokes.findIndex(item => item.id === playerId);
              if (playerIndex >= 0) {
                advStrokes = -playersWithStrokes[playerIndex].strokes;
              } else {
                advStrokes = strokesA - strokesB;
              }
            } else {
              advStrokes = strokesA - strokesB;
            }
          }
        }
      }
    }

    if (!override) {
      this.setState({ advStrokes: advStrokes.toString() });
    }
  }

  changeBetsValues = (player, type) => {
    const { players } = this.props;
    if (type === 'B') {
      const index = players.findIndex(item => item.id === player);
      if (this.playerSettings[index]) {
        const settings = this.playerSettings[index];
        const useFactor = settings.use_factor === 'factor';
        const value = settings.cantidad;
        this.setState({
          autoPress: settings.automatic_presses_every.toString(),
          front9: useFactor ? (value * settings.front_9).toString() : settings.front_9.toString(),
          back9: useFactor ? (value * settings.back_9).toString() : settings.back_9.toString(),
          match: useFactor ? (value * settings.match).toString() : settings.match.toString(),
          carry: useFactor ? (value * settings.carry).toString() : settings.carry.toString(),
          medal: useFactor ? (value * settings.medal).toString() : settings.medal.toString(),
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
      playerB
    } = this.state;

    const {
      language
    } = this.state;

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

    if (playerA === playerB) {
      Alert.alert(
        'Error',
        Dictionary.samePlayer[language]
      );
      return false;
    }

    return true;
  }

  submit = async () => {


    var arreglo=this.state.selectedItems//[1,2,3,4,5]
    console.warn(this.state.front9)

    if(arreglo.length<3){
      showMessage({
        message: fewPlayerTN[this.state.language],
        type: 'warning',
      });
    }
    else{

    var n = 0;
      var numero;
      var aleatorios=[]
      var cont=-1,aux;
      var entra=true
      do {
          numero = Math.floor((Math.random() * arreglo.length/2));
          
          if(entra){
            if (aleatorios.indexOf(numero) == -1) {
              aux=cont;
              cont=numero;
              n++;
              aleatorios.push(numero)
            }
            else{
              if(cont==numero){
                n++;
                aleatorios.push(numero)
                if(cont==aux){
                  cont=-1;
                }
                else{
                  cont=aux;
                }
              }
              else{
                 if(aux == numero){
                  //n++;
                  //aleatorios.push(numero)
                  entra = false
                  const specimens = aleatorios.filter((number, i) => i == 0 ? true : aleatorios[i - 1] != number);
                  const counterSpecimens = specimens.map(spec => {
                      return {number: spec, count: 0};
                  });

                  for (var i = 0; i < counterSpecimens.length - 1; i++) {
                    const actualSpecLength = aleatorios.filter(number => number === counterSpecimens[i].number).length
                    if(actualSpecLength<2){
                        n++;
                        aleatorios.push(counterSpecimens[i].number)
                        i=0;
                      }
                  }
                 }
              }
            }
          }
          else{
            entra = true
          }
      } 
  while (n < Math.floor(arreglo.length));

  console.log(aleatorios)
  var aleatoriosAux=[]

  for (var i = aleatorios.length - 1; i >= 0; i--) {
    if(aleatoriosAux.indexOf(aleatorios[i]) == -1){
      aleatoriosAux.push(aleatorios[i])
    }
  }

  console.log(aleatoriosAux)

  if(aleatoriosAux.length<arreglo.length/2){
    showMessage({
      message: error[this.state.language],
      type: 'danger',
    });
  }
  else{

  var pairs = new Array(),

      pos = 0;

    var repeat = false;

      for (var i = 0; i < aleatoriosAux.length; i++) {

          for (var j = 0; j < aleatoriosAux.length; j++) {

            if(i!=j){
              var element = [aleatoriosAux[i], aleatoriosAux[j]];
              var element2 = [aleatoriosAux[j], aleatoriosAux[i]];
              let pos2 = pairs.indexOf(element.toString())
              let pos3 = pairs.indexOf(element2.toString())

              if(pos2 == pos3){
                pairs[pos++] = [aleatoriosAux[i], aleatoriosAux[j]].toString();
              }
            }
          }
      }
              console.warn(pairs)
              var equipos = []
              var equipos2 = []
              var equipos3 = []
              var equipos4 = []

            for (var i = 0; i < pairs.length; i++) {
                var equipo = pairs[i].split(',')
                console.warn(equipo)
              for (var j = 0; j < aleatorios.length; j++) {
                if(equipo[0]==aleatorios[j]){
                  console.warn(arreglo[j])
                  equipos.push(arreglo[j])
                }
                if(equipo[1]==aleatorios[j]){
                  console.warn(arreglo[j])
                  equipos2.push(arreglo[j])
                }
              }
              equipos3.push(equipos)
              equipos4.push(equipos2)
              equipos = []
              equipos2 = []
            }
        console.warn('------------------------------')


        for (var i = 0; i < equipos3.length; i++) {
          if(equipos3[i].length<equipos4[i].length){
            equipos3[i].push(equipos3[i][0])
          }
          if (equipos3[i].length>equipos4[i].length) {
            equipos4[i].push(equipos4[i][0])
          }
        }

        let whoGetsString =  this.state.whoGetsAdv === 0 ? 'Hi Handicap' : this.state.whoGetsAdv === 1 ? 'Low Handicap' : this.state.whoGetsAdv === 2 ? 'Each' : this.state.whoGetsAdv === 3 ? 'Slid Hi' : this.state.whoGetsAdv === 4 ? 'Slid Low' : 'Automatic'

        for (var i = 0; i < equipos3.length; i++) {
          let playerA = equipos3[i][0];
          let playerB = equipos3[i][1];
          let playerC = equipos4[i][0];
          let playerD = equipos4[i][1];
          console.warn(playerA)
          console.warn(playerB)
          console.warn(playerC)
          console.warn(playerD)
          console.warn('------------------------------')
          CalcularGolpesVentajaTeam(playerA, playerC, playerB, playerD, this.state.IDRound)
            .then((res) => {
              console.warn(res)
              ValidaDetalleApuestaTeam(this.state.IDRound,this.state.IDBet,playerA,playerC,playerB,playerD)
              .then((res) => {
                console.warn(res)
                if(res.estatus == 0){
                  repeat = true;
                }
              })
              CrearDetalleApuestaTeam(this.state.IDBet,this.state.IDRound,playerA,playerC,playerB,playerD,this.state.front9,this.state.back9,this.state.match,this.state.carry,this.state.medal,this.state.autoPress,0,res.golpesventaja.toString(),whoGetsString)
                .then((res) => {
                  console.warn(res)
                  if(res.estatus == 1){
                    /*showMessage({
                      message: successSaveTeeData[this.state.language],
                      type: 'success',
                    });
                    this.setState({
                      carga:false
                    })*/
                    //AsyncStorage.setItem('arreglo', 'false');
                    //this.props.navigation.goBack()
                  }
                  else{
                    this.setState({
                      carga:false
                    })
                    showMessage({
                      message: error[this.state.language],
                      type: 'danger',
                    });
                  }
                })
            })
        }

        showMessage({
                      message: successSaveTeeData[this.state.language],
                      type: 'success',
                    });
                    this.setState({
                      carga:true
                    })

        AsyncStorage.setItem('arreglo', 'false');
        this.props.navigation.navigate('BetsView')

        if(repeat){
          showMessage({
                        message: betsRepeat[this.state.language],
                        type: 'warning',
                      });
        }
      }
    }

      /*

    let arreglo = this.state.selectedItems

    if(arreglo.length<3){
      showMessage({
        message: fewPlayerTN[this.state.language],
        type: 'warning',
      });
    }
    else{

      var n = 0;
      var numero;
      var aleatorios=[0,1]
      var cont = 1
      do {
          numero = Math.floor((Math.random() * arreglo.length/2));
          if (aleatorios.indexOf(numero) == -1 && cont == 1) {
            n++;
            cont++;
            aleatorios.push(numero)
          }
          else{
            if(aleatorios.indexOf(numero) == -1){
              n++;
              cont =;
              aleatorios.push(numero)
            }
            else{
              if(cont == 2){
                n++;
                cont++;
                aleatorios.push(numero)
              }
            }
          }
      } 
  while (n < Math.floor(arreglo.length));
      /*do {
          numero = Math.floor((Math.random() * arreglo.length/2));
          if (aleatorios.indexOf(numero) == -1 || par) {
            if (aleatorios.indexOf(numero) == -1){ 
              par = true;
            }
            else{
              par = false
            }
            n++;
            aleatorios.push(numero)
          }
      } 
  while (n < Math.floor(arreglo.length));*/

      /*console.warn(aleatorios)

      console.warn(arreglo)

      let whoGetsString =  this.state.whoGetsAdv === 0 ? 'Hi Handicap' : this.state.whoGetsAdv === 1 ? 'Low Handicap' : this.state.whoGetsAdv === 2 ? 'Each' : this.state.whoGetsAdv === 3 ? 'Slid Hi' : this.state.whoGetsAdv === 4 ? 'Slid Low' : 'Automatic'

      var pairs = [];
      if(arreglo.length%2==0){//PAR
        for (var i = 0; i < arreglo.length; i++) {
          if(pairs.indexOf(arreglo[i])==-1){
            pairs.push(arreglo[i])
          }
        }
      }
      else{//IMPAR

      }

      if(arreglo.length%2==0){

        var pairs = new Array(),

        pos = 0;

        for (var i = 0; i < arreglo.length; i++) {

          for (var j = 0; j < arreglo.length; j++) {

            for (var k = 0; k < arreglo.length; k++) {

              for (var l = 0; l < arreglo.length; l++) {

                if(i!=j && i!=k && i!=l && j!=k && j!=l && k!=l){
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  var element   = [arreglo[i], arreglo[j],arreglo[k], arreglo[l]];//[1,2,3,4]Este
                  var element2  = [arreglo[i], arreglo[j],arreglo[l], arreglo[k]];//[1,2,4,3]
                  var element3  = [arreglo[i], arreglo[k],arreglo[j], arreglo[l]];//[1,3,2,4]Este
                  var element4  = [arreglo[i], arreglo[k],arreglo[l], arreglo[j]];//[1,3,4,2]
                  var element5  = [arreglo[i], arreglo[l],arreglo[j], arreglo[k]];//[1,4,2,3]Este
                  var element6  = [arreglo[i], arreglo[l],arreglo[k], arreglo[j]];//[1,4,3,2]
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  var element7  = [arreglo[j], arreglo[i],arreglo[k], arreglo[l]];//[2,1,3,4]
                  var element8  = [arreglo[j], arreglo[i],arreglo[l], arreglo[k]];//[2,1,4,3]
                  var element9  = [arreglo[j], arreglo[k],arreglo[i], arreglo[l]];//[2,3,1,4]
                  var element10 = [arreglo[j], arreglo[k],arreglo[l], arreglo[i]];//[2,3,4,1]
                  var element11 = [arreglo[j], arreglo[l],arreglo[i], arreglo[k]];//[2,4,1,3]
                  var element12 = [arreglo[j], arreglo[l],arreglo[k], arreglo[i]];//[2,4,3,1]
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  var element13 = [arreglo[k], arreglo[i],arreglo[j], arreglo[l]];//[3,1,2,4]
                  var element14 = [arreglo[k], arreglo[i],arreglo[l], arreglo[j]];//[3,1,4,2]
                  var element15 = [arreglo[k], arreglo[j],arreglo[i], arreglo[l]];//[3,2,1,4]
                  var element16 = [arreglo[k], arreglo[j],arreglo[l], arreglo[i]];//[3,2,4,1]
                  var element17 = [arreglo[k], arreglo[l],arreglo[i], arreglo[j]];//[3,4,1,2]
                  var element18 = [arreglo[k], arreglo[l],arreglo[j], arreglo[i]];//[3,4,2,1]
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  var element19 = [arreglo[l], arreglo[i],arreglo[j], arreglo[k]];//[4,1,2,3]
                  var element20 = [arreglo[l], arreglo[i],arreglo[k], arreglo[j]];//[4,1,3,2]
                  var element21 = [arreglo[l], arreglo[j],arreglo[i], arreglo[k]];//[4,2,1,3]
                  var element22 = [arreglo[l], arreglo[j],arreglo[k], arreglo[i]];//[4,2,3,1]
                  var element23 = [arreglo[l], arreglo[k],arreglo[i], arreglo[j]];//[4,3,1,2]
                  var element24 = [arreglo[l], arreglo[k],arreglo[j], arreglo[i]];//[4,3,2,1]
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  let pos2  = pairs.indexOf(element.toString())
                  let pos3  = pairs.indexOf(element2.toString())
                  let pos4  = pairs.indexOf(element3.toString())
                  let pos5  = pairs.indexOf(element4.toString())
                  let pos6  = pairs.indexOf(element5.toString())
                  let pos7  = pairs.indexOf(element6.toString())
                  let pos8  = pairs.indexOf(element7.toString())
                  let pos9  = pairs.indexOf(element8.toString())
                  let pos10 = pairs.indexOf(element9.toString())
                  let pos11 = pairs.indexOf(element10.toString())
                  let pos12 = pairs.indexOf(element11.toString())
                  let pos13 = pairs.indexOf(element12.toString())
                  let pos14 = pairs.indexOf(element13.toString())
                  let pos15 = pairs.indexOf(element14.toString())
                  let pos16 = pairs.indexOf(element15.toString())
                  let pos17 = pairs.indexOf(element16.toString())
                  let pos18 = pairs.indexOf(element17.toString())
                  let pos19 = pairs.indexOf(element18.toString())
                  let pos20 = pairs.indexOf(element19.toString())
                  let pos21 = pairs.indexOf(element20.toString())
                  let pos22 = pairs.indexOf(element21.toString())
                  let pos23 = pairs.indexOf(element22.toString())
                  let pos24 = pairs.indexOf(element23.toString())
                  let pos25 = pairs.indexOf(element24.toString())

                  if(pos2 == pos3 && pos3 == pos4 && pos4 == pos5 && pos5 == pos6 && pos6 == pos7 && pos7 == pos8 && pos8 == pos9 && pos9 == pos10 && pos10 == pos11 && pos11 == pos12 && pos12 == pos13 && pos13 == pos14 && pos14 == pos15 && pos15 == pos16 && pos16 == pos17 && pos17 == pos18 && pos18 == pos19 && pos19 == pos20 && pos20 == pos21 && pos21 == pos22 && pos22 == pos23 && pos23 == pos24 && pos24 == pos25){
                    pairs[pos++] = [arreglo[i], arreglo[j], arreglo[k], arreglo[l]].toString();
                  }
                  else{
                    console.warn('NO')
                  }
                }
              }
            }
          }
        }
        console.warn('Par')
      }
      else{

        var pairs = new Array(),

        pos = 0;

        for (var i = 0; i < arreglo.length; i++) {

          for (var j = 0; j < arreglo.length; j++) {

            for (var k = 0; k < arreglo.length; k++) {

              for (var l = 0; l < arreglo.length; l++) {

                if(i!=k && i!=l && j!=k && j!=l && k!=l){
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  var element   = [arreglo[i], arreglo[j],arreglo[k], arreglo[l]];//[1,2,3,4]Este
                  var element2  = [arreglo[i], arreglo[j],arreglo[l], arreglo[k]];//[1,2,4,3]
                  var element3  = [arreglo[i], arreglo[k],arreglo[j], arreglo[l]];//[1,3,2,4]Este
                  var element4  = [arreglo[i], arreglo[k],arreglo[l], arreglo[j]];//[1,3,4,2]
                  var element5  = [arreglo[i], arreglo[l],arreglo[j], arreglo[k]];//[1,4,2,3]Este
                  var element6  = [arreglo[i], arreglo[l],arreglo[k], arreglo[j]];//[1,4,3,2]
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  var element7  = [arreglo[j], arreglo[i],arreglo[k], arreglo[l]];//[2,1,3,4]
                  var element8  = [arreglo[j], arreglo[i],arreglo[l], arreglo[k]];//[2,1,4,3]
                  var element9  = [arreglo[j], arreglo[k],arreglo[i], arreglo[l]];//[2,3,1,4]
                  var element10 = [arreglo[j], arreglo[k],arreglo[l], arreglo[i]];//[2,3,4,1]
                  var element11 = [arreglo[j], arreglo[l],arreglo[i], arreglo[k]];//[2,4,1,3]
                  var element12 = [arreglo[j], arreglo[l],arreglo[k], arreglo[i]];//[2,4,3,1]
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  var element13 = [arreglo[k], arreglo[i],arreglo[j], arreglo[l]];//[3,1,2,4]
                  var element14 = [arreglo[k], arreglo[i],arreglo[l], arreglo[j]];//[3,1,4,2]
                  var element15 = [arreglo[k], arreglo[j],arreglo[i], arreglo[l]];//[3,2,1,4]
                  var element16 = [arreglo[k], arreglo[j],arreglo[l], arreglo[i]];//[3,2,4,1]
                  var element17 = [arreglo[k], arreglo[l],arreglo[i], arreglo[j]];//[3,4,1,2]
                  var element18 = [arreglo[k], arreglo[l],arreglo[j], arreglo[i]];//[3,4,2,1]
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  var element19 = [arreglo[l], arreglo[i],arreglo[j], arreglo[k]];//[4,1,2,3]
                  var element20 = [arreglo[l], arreglo[i],arreglo[k], arreglo[j]];//[4,1,3,2]
                  var element21 = [arreglo[l], arreglo[j],arreglo[i], arreglo[k]];//[4,2,1,3]
                  var element22 = [arreglo[l], arreglo[j],arreglo[k], arreglo[i]];//[4,2,3,1]
                  var element23 = [arreglo[l], arreglo[k],arreglo[i], arreglo[j]];//[4,3,1,2]
                  var element24 = [arreglo[l], arreglo[k],arreglo[j], arreglo[i]];//[4,3,2,1]
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  let pos2  = pairs.indexOf(element.toString())
                  let pos3  = pairs.indexOf(element2.toString())
                  let pos4  = pairs.indexOf(element3.toString())
                  let pos5  = pairs.indexOf(element4.toString())
                  let pos6  = pairs.indexOf(element5.toString())
                  let pos7  = pairs.indexOf(element6.toString())
                  let pos8  = pairs.indexOf(element7.toString())
                  let pos9  = pairs.indexOf(element8.toString())
                  let pos10 = pairs.indexOf(element9.toString())
                  let pos11 = pairs.indexOf(element10.toString())
                  let pos12 = pairs.indexOf(element11.toString())
                  let pos13 = pairs.indexOf(element12.toString())
                  let pos14 = pairs.indexOf(element13.toString())
                  let pos15 = pairs.indexOf(element14.toString())
                  let pos16 = pairs.indexOf(element15.toString())
                  let pos17 = pairs.indexOf(element16.toString())
                  let pos18 = pairs.indexOf(element17.toString())
                  let pos19 = pairs.indexOf(element18.toString())
                  let pos20 = pairs.indexOf(element19.toString())
                  let pos21 = pairs.indexOf(element20.toString())
                  let pos22 = pairs.indexOf(element21.toString())
                  let pos23 = pairs.indexOf(element22.toString())
                  let pos24 = pairs.indexOf(element23.toString())
                  let pos25 = pairs.indexOf(element24.toString())

                  if(pos2 == pos3 && pos3 == pos4 && pos4 == pos5 && pos5 == pos6 && pos6 == pos7 && pos7 == pos8 && pos8 == pos9 && pos9 == pos10 && pos10 == pos11 && pos11 == pos12 && pos12 == pos13 && pos13 == pos14 && pos14 == pos15 && pos15 == pos16 && pos16 == pos17 && pos17 == pos18 && pos18 == pos19 && pos19 == pos20 && pos20 == pos21 && pos21 == pos22 && pos22 == pos23 && pos23 == pos24 && pos24 == pos25){
                    pairs[pos++] = [arreglo[i], arreglo[j], arreglo[k], arreglo[l]].toString();
                  }
                  else{
                    console.warn('NO')
                  }
                }
              }
            }
          }
        }
        console.warn('Impar')
      }
      console.warn(pairs)
      console.warn(pairs.length)

      if(pairs.length>1){

      var n = 0;
      var numero;
      var aleatorios=[]
      do {
          numero = Math.floor((Math.random() * pairs.length));
          if (aleatorios.indexOf(numero) == -1) {
              n++;
              aleatorios.push(numero)
          }
      } 
  while (n < Math.floor(arreglo.length/2));

      console.warn(aleatorios)

    }
    else{
      var aleatorios=[0]
    }

    console.warn(pairs.length)

    for (var i = 0; i <= pairs.length-1; i++) {
      if(aleatorios.indexOf(i) != -1){
        let players = pairs[i].split(',')
        let playerA = players[0];
        let playerB = players[1];
        let playerC = players[2];
        let playerD = players[3];
        console.warn(playerA)
        console.warn(playerB)
        console.warn(playerC)
        console.warn(playerD)
        CalcularGolpesVentajaTeam(playerA, playerC, playerB, playerD, this.state.IDRound)
          .then((res) => {
            console.warn(res)
            CrearDetalleApuestaTeam(this.state.IDBet,this.state.IDRound,playerA,playerC,playerB,playerD,this.state.front9,this.state.back9,this.state.match,this.state.carry,this.state.medal,this.state.autoPress,0,res.golpesventaja.toString(),whoGetsString)
              .then((res) => {
                console.warn(res)
                if(res.estatus == 1){
                  showMessage({
                    message: successSaveTeeData[this.state.language],
                    type: 'success',
                  });
                  this.setState({
                    carga:false
                  })
                  //AsyncStorage.setItem('arreglo', 'false');
                  //this.props.navigation.goBack()
                }
                else{
                  this.setState({
                    carga:false
                  })
                  showMessage({
                    message: error[this.state.language],
                    type: 'danger',
                  });
                }
              })
          })
      }
    }*/
    //}
  }
}

export default SNBetView;