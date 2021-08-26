import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Switch, Alert, Platform, TouchableOpacity } from 'react-native';
import styles from '../styles';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import Colors from '../../../../utils/Colors';
import { Dictionary } from '../../../../utils/Dictionary';
import DragonButton from '../../../global/DragonButton';
import moment from 'moment';
import { ListadoAmigosRonda, CrearDetalleApuesta, ListadoAmigosRondaData } from '../../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

const {
  save,
  useFactor: useFactorText,
  error,
  successSaveTeeData,
  fewPlayer,
  samePlayerTN,
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
      selectedItems : [],
      selectedItems2 : []
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

  onSelectedItemsChange2 = selectedItems2 => {
    this.setState({ selectedItems2 });
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

          <View style={{ height: 20 }} />
          <View style={{ flex: 1, flexDirection:'row' }}>
            <View style={{ flex: 0.5, margin:1 }}>
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

            <View style={{ flex: 0.5,margin:1 }}>
            <MultiSelect
              hideTags
              items={players}
              uniqueKey="id"
              onSelectedItemsChange={this.onSelectedItemsChange2}
              selectedItems={this.state.selectedItems2}
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
          </View>

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

    console.warn(this.state.selectedItems.length + this.state.selectedItems2.length)

    if(this.state.selectedItems.length + this.state.selectedItems2.length <2){
      showMessage({
        message: fewPlayer[this.state.language],
        type: 'warning',
      });
    }
    else{

      console.warn(this.state.selectedItems)
      console.warn(this.state.selectedItems2)

      let mismo = false

      if(this.state.selectedItems.length<this.state.players.length){
        for (var i = 0; i <this.state.selectedItems.length; i++) {
          if(this.state.selectedItems2.includes(this.state.selectedItems[i])){
            mismo = true
            showMessage({
              message: samePlayerTN[this.state.language],
              type: 'warning',
            });
            i=this.state.selectedItems.length
          }
        }
      }

      if(this.state.selectedItems.length===this.state.players.length){

        this.setState({
                        carga:true
                      })

        console.warn('Todos vs todos')

      var pairs = new Array(),

      pos = 0;

      for (var i = 0; i < this.state.selectedItems.length; i++) {

          for (var j = 0; j < this.state.selectedItems.length; j++) {

            if(i!=j){
              console.warn(pairs)
              var element = [this.state.selectedItems[i], this.state.selectedItems[j]];
              var element2 = [this.state.selectedItems[j], this.state.selectedItems[i]];
              console.warn(element)
              console.warn(element2)
              let pos2 = pairs.indexOf(element.toString())
              let pos3 = pairs.indexOf(element2.toString())
              console.warn(pos2)
              console.warn(pos3)

              if(pos2 == pos3){
                pairs[pos++] = [this.state.selectedItems[i], this.state.selectedItems[j]].toString();
                let playerA = this.state.selectedItems[i];
                let playerB = this.state.selectedItems[j];
                ListadoAmigosRondaData(playerA,playerB, this.state.IDRound)
                .then((res) => {
                  console.warn(res)
                  CrearDetalleApuesta(this.state.IDBet,this.state.IDRound,playerA,playerB,res.Result[0].set_snw_front_9,res.Result[0].set_snw_back_9,res.Result[0].set_snw_match,res.Result[0].set_snw_carry,res.Result[0].set_snw_medal,res.Result[0].set_snw_automatic_press,0,res.Result[0].set_golpesventaja)
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
            }
          }
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
      }
      else{

        console.warn('Ciertos jugadores')

        var pairs = new Array(),

      pos = 0;

      if(!mismo){
        this.setState({
                        carga:true
                      })
        console.warn('Entra')

      for (var i = 0; i < this.state.selectedItems.length; i++) {

          for (var j = 0; j < this.state.selectedItems2.length; j++) {
              
              var element = [this.state.selectedItems[i], this.state.selectedItems2[j]];
              var element2 = [this.state.selectedItems2[j], this.state.selectedItems[i]];
              console.warn(element)
              console.warn(element2)
              let pos2 = pairs.indexOf(element.toString())
              let pos3 = pairs.indexOf(element2.toString())
              console.warn(pos2)
              console.warn(pos3)

              if(pos2 == pos3){
                pairs[pos++] = [this.state.selectedItems[i], this.state.selectedItems2[j]].toString();
                let playerA = this.state.selectedItems[i];
                let playerB = this.state.selectedItems2[j];
                console.warn(playerA)
                console.warn(playerB)
                ListadoAmigosRondaData(playerA,playerB, this.state.IDRound)
                .then((res) => {
                  console.warn(res)
                  CrearDetalleApuesta(this.state.IDBet,this.state.IDRound,playerA,playerB,res.Result[0].set_snw_front_9,res.Result[0].set_snw_back_9,res.Result[0].set_snw_match,res.Result[0].set_snw_carry,res.Result[0].set_snw_medal,res.Result[0].set_snw_automatic_press,0,res.Result[0].set_golpesventaja)
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
          }
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
        
      }
      }
    }
  }
}

export default SNBetView;