import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Switch, Alert, Platform, TouchableOpacity } from 'react-native';
import styles from '../styles';
import {Picker} from '@react-native-picker/picker';
import Colors from '../../../../utils/Colors';
import { Dictionary } from '../../../../utils/Dictionary';
import DragonButton from '../../../global/DragonButton';
import moment from 'moment';
import { ListadoAmigosRonda, CrearDetalleApuestaTeam, InfoUsuarioAB, CalcularGolpesVentajaTeam } from '../../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ButtonGroup } from 'react-native-elements';

const {
  Throwballs,
  save,
  useFactor: useFactorText,
  error,
  successSaveTeeData,
  samePlayerTN,
  Manually,
  OverrideAdv,
  auto,
  Press
} = Dictionary;


class TNBetView extends Component {
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
    let whoGetsAdv = 0;
    let playerA = 0//props.players.length > 0 ? props.players[0].id : 0;
    let playerB = 0//props.players.length > 0 ? props.players[0].id : 0;
    let playerC = 0//props.players.length > 0 ? props.players[0].id : 0;
    let playerD = 0//props.players.length > 0 ? props.players[0].id : 0;
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
      //const whoGetsString = 'hihcp';//Data.who_gets_the_adv_strokes;
      whoGetsAdv = 0//whoGetsString === 'hihcp' ? 0 : whoGetsString === 'lowhcp' ? 1 : whoGetsString === 'each' ? 2 : whoGetsString === 'slidhi' ? 3 : whoGetsString === 'slidlow' ? 4 : whoGetsString === 'automatic' ? 5 : 0;
      playerA = 0//props.players[0].id;
      playerB = 0//props.players[0].id;
      playerC = 0//props.players[0].id;
      playerD = 0//props.players[0].id;
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: TNBetView, line: 74');
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
      playerC,
      playerD,
      whoGetsAdv,
      language: '',
      players: [],
      IDBet:this.props.route.params.IDBet,
      IDRound:this.props.route.params.IDRound
    };

    this.playerSettings = [];
  }

  static navigationOptions = ({ navigation }) => {

    return {
      title: navigation.getParam('Title', 'Team Nassau'),
    }
  };

  componentDidMount() {
    this.ListadoTodos()
  }

  mxmtn = async () => {
    this.props.navigation.navigate('MXMTN',{IDBet:this.state.IDBet, IDRound:this.state.IDRound});
  }

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
    } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
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
                selectTextOnFocus={true}
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
                      <Picker.Item key={player.id} label={player.nickname} value={player.id} />
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
                      <Picker.Item key={player.id} label={player.nickname} value={player.id} />
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
                      <Picker.Item key={player.id} label={player.nickname} value={player.id} />
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
                      <Picker.Item key={player.id} label={player.nickname} value={player.id} />
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
                      <Picker.Item key={player.id} label={player.nickname} value={player.id} />
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
                      <Picker.Item key={player.id} label={player.nickname} value={player.id} />
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
                      <Picker.Item key={player.id} label={player.nickname} value={player.id} />
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
                      <Picker.Item key={player.id} label={player.nickname} value={player.id} />
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

        <View style={styles.bottomButtom}>
          <DragonButton title={Throwballs[language]} onPress={this.mxmtn} />
        </View>

      </KeyboardAvoidingView>
    );
  }

  onChangeButton = (index) => {
    this.setState({ whoGetsAdv: index });
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
                      nickname: item.usu_nickname
                    }
                ))

                this.setState({
                  players:list,
                  carga:false,
                  playerA:list[0].id,
                  playerB:list[0].id,
                  playerC:list[0].id,
                  playerD:list[0].id
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
    console.warn(this.state.playerA)
    console.warn(this.state.playerB)
    console.warn(this.state.playerC)
    console.warn(this.state.playerD)
    if (type === 'A'){
       this.setState({ playerA: player });
       CalcularGolpesVentajaTeam(player, this.state.playerC, this.state.playerB, this.state.playerD, this.state.IDRound)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
            this.setState({
              advStrokes : res.golpesventaja.toString()
            })
          }
          else{
            this.setState({
              advStrokes : 0
            })
          }
        })
    }
    if (type === 'B'){
      this.setState({ playerB: player });
      CalcularGolpesVentajaTeam(this.state.playerA, this.state.playerC, player, this.state.playerD, this.state.IDRound)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
            this.setState({
              advStrokes : res.golpesventaja.toString()
            })
          }
          else{
            this.setState({
              advStrokes : 0
            })
          }
        })
      }
      if (type === 'C'){
      this.setState({ playerC: player });
      CalcularGolpesVentajaTeam(this.state.playerA, player, this.state.playerB, this.state.playerD, this.state.IDRound)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
            this.setState({
              advStrokes : res.golpesventaja.toString()
            })
          }
          else{
            this.setState({
              advStrokes : 0
            })
          }
        })
      }
      if (type === 'D'){
      this.setState({ playerD: player });
      CalcularGolpesVentajaTeam(this.state.playerA, this.state.playerC, this.state.playerB, player, this.state.IDRound)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
            this.setState({
              advStrokes : res.golpesventaja.toString()
            })
          }
          else{
            this.setState({
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
        Dictionary.samePlayerTN[language]
      );
      return false;
    }

    return true;
  }

  submit = async () => {
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
        whoGetsAdv,
        playerA,
        playerB,
        playerC,
        playerD,
        IDRound,
        IDBet
      } = this.state;
    console.warn('----------------------------------')
    console.warn(IDBet)
    console.warn(IDRound)
    console.warn(front9)
    console.warn(back9)
    console.warn(match)
    console.warn(carry)
    console.warn(medal)
    console.warn(autoPress)
    console.warn(override)
    console.warn(advStrokes)
    console.warn(whoGetsAdv)
    let whoGetsString =  whoGetsAdv === 0 ? 'Hi Handicap' : whoGetsAdv === 1 ? 'Low Handicap' : whoGetsAdv === 2 ? 'Each' : whoGetsAdv === 3 ? 'Slid Hi' : whoGetsAdv === 4 ? 'Slid Low' : 'Automatic'
    console.warn(whoGetsString)
    console.warn(playerA)
    console.warn(playerB)
    console.warn(playerC)
    console.warn(playerD)
    console.warn('----------------------------------')
    let back9UF = useFactor ? (front9 * back9).toString() : back9.toString()
    let matchUF = useFactor ? (front9 * match).toString() : match.toString()
    let carryUF = useFactor ? (front9 * carry).toString() : carry.toString()
    let medalUF = useFactor ? (front9 * medal).toString() : medal.toString()
    console.warn(back9UF)
    console.warn(matchUF)
    console.warn(carryUF)
    console.warn(medalUF)
    if(playerA == playerC || playerA == playerD || playerB == playerC || playerB == playerD){
      showMessage({
        message: samePlayerTN[this.state.language],
        type: 'warning',
      });
    }
    else{
      CrearDetalleApuestaTeam(IDBet,IDRound,playerA,playerC,playerB,playerD,front9,back9UF,matchUF,carryUF,medalUF,autoPress,0,advStrokes,whoGetsString)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
            showMessage({
              message: successSaveTeeData[this.state.language],
              type: 'success',
            });
            AsyncStorage.setItem('arreglo', 'false');
            this.props.navigation.goBack()
          }
          else{
            showMessage({
              message: error[this.state.language],
              type: 'danger',
            });
          }
        })
    }
    /*if (this.fieldValidations()) {
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
        playerB
      } = this.state;

      const indexA = this.props.players.findIndex(item => item.id === playerA);
      const indexB = this.props.players.findIndex(item => item.id === playerB);

      const SNBet = {
        id: this.betId,
        round_id: this.props.roundId,
        member_a_id: playerA,
        member_b_id: playerB,
        member_a: this.props.players[indexA].nick_name,
        member_b: this.props.players[indexB].nick_name,
        automatic_press_every: autoPress ? autoPress : '0',
        use_factor: useFactor ? 1 : 0,
        front_9: front9 ? front9 : '0',
        back_9: back9 ? useFactor ? back9 * front9 : back9 : '0',
        match: match ? useFactor ? match * front9 : match : '0',
        carry: carry ? useFactor ? carry * front9 : carry : '0',
        medal: medal ? useFactor ? medal * front9 : medal : '0',
        adv_strokes: advStrokes ? advStrokes : '0',
        manually_override_adv: override ? 1 : 0,
        manually_adv_strokes: advStrokes ? advStrokes : '0',
        manual_press: this.manualPress,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      this.props.saveSNBet(SNBet);
    }*/
  }
}

export default TNBetView;