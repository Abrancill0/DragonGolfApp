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
  Alert,
  Button
} from 'react-native';
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
import moment from 'moment';
import Details from '../../../utils/Details';
import { ListadoSettingsFriend, InfoUsuarioAB, AltaSettingsFriend, ActualizaSettingsFriend, RutaBaseAB } from '../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";

const BlankProfile = require('../../../../assets/globals/blank-profile.png');

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
      strokes,
      difTees,
      save,
      useFactor: useFactorText,
      successSaveTeeData,
      error
    } = Dictionary;

class PlayerInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitado:props.route.params.item.invitado,
      signo:props.route.params.item.strokes.toString().substring(0,1)=='-'?false:true,
      strokesReg:props.route.params.item.strokes,
      strokesRegAbs:Math.abs(props.route.params.item.strokes),
      signoTee:props.route.params.item.difTee.toString().substring(0,1)=='-'?false:true,
      difTeesReg:props.route.params.item.difTee,
      difTeesRegAbs:Math.abs(props.route.params.item.difTee),
      update: false,
      item: props.route.params.item,
      asCollapsed: true,
      advantageMove: 'Match',
      strokesPerRound: '0.5',
      advMovesHoles: false,
      carryMoveAdv: false,
      gsCollapsed: true,
      rabbit16: '0',
      rabbit712: '0',
      rabbit1318: '0',
      medalF9: '0',
      medalB9: '0',
      medal18: '0',
      skins: '0',
      skinCarryOver: 0,
      lowedAdv: false,
      snwCollapsed: true,
      tnwCollapsed: true,
      ebCollapsed: true,
      bbtCollapsed: true,
      snwAutoPressesEvery: '0',
      snwUseFactor: false,
      snwFront9: '0',
      snwBack9: '0',
      snwMatch: '0',
      snwCarry: '0',
      snwMedal: '0',
      tnwFront9: '0',
      tnwAutoPressesEvery: '0',
      tnwUseFactor: false,
      tnwBack9: '0',
      tnwMatch: '0',
      tnwCarry: '0',
      tnwMedal: '0',
      whoGetAdvStrokes: 'each',
      ebWager: '0',
      bbtWagerF9: '0',
      bbtWagerB9: '0',
      bbtWager18: '0',
      language: 'es'
    };

    //console.warn(this.state.item)

    this.inputs = {};
  }

  async componentDidMount() {
    this.getUserData()
    console.warn(this.state.invitado)
   }

   getUserData = async () => {
    const token = await AsyncStorage.getItem('usu_id')
    const language = await AsyncStorage.getItem('language')
    this.setState({
      language:language
    })
      ListadoSettingsFriend(token, this.state.item.id)
        .then((res) => {
          console.warn(res)
            if(res.estatus==1){
                this.setState({
                update:true,
                advantageMove: res.Result[0].set_how_adv_move,
                strokesPerRound: res.Result[0].set_strokes_moved_per_round!=0?res.Result[0].set_strokes_moved_per_round.toString():'0.5',
                advMovesHoles: res.Result[0].set_adv_moves_on_9_holes,
                carryMoveAdv: res.Result[0].set_carry_moves_adv,
                rabbit16: res.Result[0].set_rabbit_1_6.toString(),
                rabbit712: res.Result[0].set_rabbit_7_12.toString(),
                rabbit1318: res.Result[0].set_rabbit_13_18.toString(),
                medalF9: res.Result[0].set_medal_play_f9.toString(),
                medalB9: res.Result[0].set_medal_play_b9.toString(),
                medal18: res.Result[0].set_medal_play_18.toString(),
                skins: res.Result[0].set_skins.toString(),
                skinCarryOver: res.Result[0].set_skins_carry_over,
                lowedAdv: res.Result[0].set_lower_adv_f9,
                snwUseFactor: res.Result[0].set_snw_use_factor,
                snwAutoPressesEvery: res.Result[0].set_snw_automatic_press.toString(),
                snwFront9: res.Result[0].set_snw_front_9.toString(),
                snwBack9: res.Result[0].set_snw_back_9.toString(),
                snwMatch: res.Result[0].set_snw_match.toString(),
                snwCarry: res.Result[0].set_snw_carry.toString(),
                snwMedal: res.Result[0].set_snw_medal.toString(),
                tnwUseFactor: res.Result[0].set_tmw_use_factor,
                tnwAutoPressesEvery: res.Result[0].set_tmw_automatic_press.toString(),
                tnwFront9: res.Result[0].set_tmw_front_9.toString(),
                tnwBack9: res.Result[0].set_tmw_back_9.toString(),
                tnwMatch: res.Result[0].set_tmw_match.toString(),
                tnwCarry: res.Result[0].set_tmw_carry.toString(),
                tnwMedal: res.Result[0].set_tmw_medal.toString(),
                whoGetAdvStrokes: res.Result[0].set_tmw_adv_strokes,
                ebWager: res.Result[0].set_eb_wager.toString(),
                bbtWagerF9: res.Result[0].set_bbt_wager_f9.toString(),
                bbtWagerB9: res.Result[0].set_bbt_wager_b9.toString(),
                bbtWager18: res.Result[0].set_bbt_wager_18.toString(),
                ssDoubleEagle: res.Result[0].set_stableford_double_eagle.toString(),
                ssEaglePoints: res.Result[0].set_stableford_eagle.toString(),
                ssBirdie: res.Result[0].set_stableford_birdie.toString(),
                ssPar: res.Result[0].set_stableford_par.toString(),
                ssBogey: res.Result[0].set_stableford_bogey.toString(),
                ssDoubleBogey: res.Result[0].set_stableford_double_bogey.toString(),
                strokesReg:res.Result[0].set_golpesventaja,
                strokesRegAbs:Math.abs(res.Result[0].set_golpesventaja),
                signo:res.Result[0].set_golpesventaja.toString().substring(0,1)=='-'?false:true,
                difTeesReg:res.Result[0].set_diferenciatee,
                difTeesRegAbs:Math.abs(res.Result[0].set_diferenciatee),
                signoTee:res.Result[0].set_diferenciatee.toString().substring(0,1)=='-'?false:true
                //seePicker: res.Result[0].usu_id
              })
            }  
            else{
              console.warn('AB')
                InfoUsuarioAB(token)
                  .then((res) => {
                    console.warn(res)
                      if(res.estatus==1){
                          this.setState({
                          update:false,
                          advantageMove: res.Result[0].set_how_adv_move,
                          strokesPerRound: res.Result[0].set_strokes_moved_per_round!=0?res.Result[0].set_strokes_moved_per_round.toString():'0.5',
                          advMovesHoles: res.Result[0].set_adv_moves_on_9_holes,
                          carryMoveAdv: res.Result[0].set_carry_moves_adv,
                          rabbit16: res.Result[0].set_rabbit_1_6.toString(),
                          rabbit712: res.Result[0].set_rabbit_7_12.toString(),
                          rabbit1318: res.Result[0].set_rabbit_13_18.toString(),
                          medalF9: res.Result[0].set_medal_play_f9.toString(),
                          medalB9: res.Result[0].set_medal_play_b9.toString(),
                          medal18: res.Result[0].set_medal_play_18.toString(),
                          skins: res.Result[0].set_skins.toString(),
                          skinCarryOver: res.Result[0].set_skins_carry_over,
                          lowedAdv: res.Result[0].set_lower_adv_f9,
                          snwUseFactor: res.Result[0].set_snw_use_factor,
                          snwAutoPressesEvery: res.Result[0].set_snw_automatic_press.toString(),
                          snwFront9: res.Result[0].set_snw_front_9.toString(),
                          snwBack9: res.Result[0].set_snw_back_9.toString(),
                          snwMatch: res.Result[0].set_snw_match.toString(),
                          snwCarry: res.Result[0].set_snw_carry.toString(),
                          snwMedal: res.Result[0].set_snw_medal.toString(),
                          tnwUseFactor: res.Result[0].set_tmw_use_factor,
                          tnwAutoPressesEvery: res.Result[0].set_tmw_automatic_press.toString(),
                          tnwFront9: res.Result[0].set_tmw_front_9.toString(),
                          tnwBack9: res.Result[0].set_tmw_back_9.toString(),
                          tnwMatch: res.Result[0].set_tmw_match.toString(),
                          tnwCarry: res.Result[0].set_tmw_carry.toString(),
                          tnwMedal: res.Result[0].set_tmw_medal.toString(),
                          whoGetAdvStrokes: res.Result[0].set_tmw_adv_strokes,
                          ebWager: res.Result[0].set_eb_wager.toString(),
                          bbtWagerF9: res.Result[0].set_bbt_wager_f9.toString(),
                          bbtWagerB9: res.Result[0].set_bbt_wager_b9.toString(),
                          bbtWager18: res.Result[0].set_bbt_wager_18.toString(),
                          ssDoubleEagle: res.Result[0].set_stableford_double_eagle.toString(),
                          ssEaglePoints: res.Result[0].set_stableford_eagle.toString(),
                          ssBirdie: res.Result[0].set_stableford_birdie.toString(),
                          ssPar: res.Result[0].set_stableford_par.toString(),
                          ssBogey: res.Result[0].set_stableford_bogey.toString(),
                          ssDoubleBogey: res.Result[0].set_stableford_double_bogey.toString(),
                          //seePicker: res.Result[0].usu_id
                        })
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
        }).catch(error=>{
            //setLoading(false)
            showMessage({
                message: error,
                type:'error',
            });
        })
  }

  render() {

    const {
      signoTee,
      difTeesReg,
      difTeesRegAbs,
      signo,
      strokesReg,
      strokesRegAbs,
      item,
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
      language
    } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.goBack()}>
              <MaterialIcons name={'arrow-back'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View> 
          <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
          <Text style={{ padding:20, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>Settings Player</Text>
          </View>
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{margin:30, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddTee', {IDCourse:IDCourse})}>
              <MaterialIcons name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
        </View>
        <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps='handled'>
          {item.invitado&&<TouchableOpacity style={styles.profileCard} onPress={_ => this.props.navigation.navigate('EditPlayerView', { userData:item, language:language })}>
            <View style={styles.imageNameView}>
              <Image
                source={item.photo ? { uri: RutaBaseAB+'/images'   + item.photo } : BlankProfile}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30
                }}
              />
              <View style={styles.userInfoView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.userName}>{item.nombre}</Text>
                  <Text style={styles.nicknameText}>({item.nickname})</Text>
                </View>
                <View>
                  <TouchableOpacity /*onPress={() => Linking.openURL('mailto:' + item.email)}*/>
                    <Text style={[styles.textLink, { color: Colors.Primary, marginRight: 10 }]}>{item.email}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity /*onPress={() => Linking.openURL('tel://' + item.usu_telefono)}*/>
                    <Text style={styles.textLink} ellipsizeMode="tail">{this.formatCellphone(item.cellphone)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, height: '100%', alignItems: 'flex-end' }}>
                {item.id !== 1 && <TouchableOpacity onPress={_ => this.props.navigation.navigate('HistoryScreen', { playerId: item.id, playernickname: item.nickname })}>
                  <MaterialIcons name='history' size={25} color={Colors.Black} />
                </TouchableOpacity>}
              </View>
            </View>
            <View style={styles.infoGolfView}>
              <View>
                <Text style={styles.cardTitle}>{ghinNumber[language]}</Text>
                <Text style={styles.cardInfo}>{item.ghinnumber}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.hcpIndex, language:language })}>
                  <Text style={styles.cardTitle}>{handicap[language]} <Text style={{ color: Colors.Primary }}>?</Text></Text>
                </TouchableOpacity>
                <View style={{flex:0.5, flexDirection:'row'}}>
                <View style={{flex:0.5}}>
                <Text style={styles.cardInfo}>{item.handicap}</Text>
                </View>
                <View style={{ flex: 0.5}}>
                <TouchableOpacity onPress={_ => this.props.navigation.navigate('HandicapIndex', { playerId: item.id, playernickname: item.nick_name })}>
                  <MaterialIcons name='grid-on' size={25} color={Colors.Black} />
                </TouchableOpacity>
              </View>
              </View>
              </View>
              <View>
                <Text style={styles.cardTitle}>Strokes</Text>
                <Text style={styles.cardInfo}>{strokesReg ? strokesReg : 0}</Text>
              </View>
            </View>
          </TouchableOpacity>
          }
          { !item.invitado &&
          <View style={styles.profileCard} onPress={_ => this.props.navigation.navigate('EditPlayerView', { userData:item, language:language })}>
            <View style={styles.imageNameView}>
              <Image
                source={item.photo ? { uri: RutaBaseAB+'/images'   + item.photo } : BlankProfile}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30
                }}
              />
              <View style={styles.userInfoView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.userName}>{item.nombre}</Text>
                  <Text style={styles.nicknameText}>({item.nickname})</Text>
                </View>
                <View>
                  <TouchableOpacity /*onPress={() => Linking.openURL('mailto:' + item.email)}*/>
                    <Text style={[styles.textLink, { color: Colors.Primary, marginRight: 10 }]}>{item.email}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity /*onPress={() => Linking.openURL('tel://' + item.usu_telefono)}*/>
                    <Text style={styles.textLink} ellipsizeMode="tail">{this.formatCellphone(item.cellphone)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, height: '100%', alignItems: 'flex-end' }}>
                {item.id !== 1 && <TouchableOpacity onPress={_ => this.props.navigation.navigate('HistoryScreen', { playerId: item.id, playernickname: item.nickname })}>
                  <MaterialIcons name='history' size={25} color={Colors.Black} />
                </TouchableOpacity>}
              </View>
            </View>
            <View style={styles.infoGolfView}>
              <View>
                <Text style={styles.cardTitle}>{ghinNumber[language]}</Text>
                <Text style={styles.cardInfo}>{item.ghinnumber}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.hcpIndex, language:language })}>
                  <Text style={styles.cardTitle}>{handicap[language]} <Text style={{ color: Colors.Primary }}>?</Text></Text>
                </TouchableOpacity>
                <View style={{flex:0.5, flexDirection:'row'}}>
                <View style={{flex:0.5}}>
                <Text style={styles.cardInfo}>{item.handicap}</Text>
                </View>
                <View style={{ flex: 0.5}}>
                <TouchableOpacity onPress={_ => this.props.navigation.navigate('HandicapIndex', { playerId: item.id, playernickname: item.nick_name })}>
                  <MaterialIcons name='grid-on' size={25} color={Colors.Black} />
                </TouchableOpacity>
              </View>
              </View>
              </View>
              <View>
                <Text style={styles.cardTitle}>Strokes</Text>
                <Text style={styles.cardInfo}>{strokesReg ? strokesReg : 0}</Text>
              </View>
            </View>
          </View>
        }
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
              <View style={styles.switchView}>
                <Text style={styles.question}>{strokes[language]}</Text>
                
                <View style={styles.costInputView}>
                <View style={{flex:1, alignSelf:'center', paddingRigth:5}}>
                  <Button
                    title={signo?'+':'-'}
                    onPress={() => this.setState({signo:!signo})}
                    color={Colors.Primary}
                  />
                </View>
                <View style={{flex:0.9, paddingLeft:5}}>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    onChangeText={(strokesRegAbs) => this.setState({ strokesRegAbs })}
                    value={strokesRegAbs.toString()}
                    selectTextOnFocus={true}
                  />
                  </View>
                </View>
              </View>
              <View style={styles.switchView}>
                <Text style={styles.question}>{difTees[language]}</Text>
                
                <View style={styles.costInputView}>
                <View style={{flex:1, alignSelf:'center', paddingRigth:5}}>
                  <Button
                    title={signoTee?'+':'-'}
                    onPress={() => this.setState({signoTee:!signoTee})}
                    color={Colors.Primary}
                  />
                </View>
                <View style={{flex:0.9, paddingLeft:5}}>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    onChangeText={(difTeesRegAbs) => this.setState({ difTeesRegAbs })}
                    value={difTeesRegAbs.toString()}
                    selectTextOnFocus={true}
                  />
                  </View>
                </View>
              </View>
                <Text style={styles.question}>{howAdvantage[language]}</Text>
                <View style={styles.radioGroupView}>
                  <View style={styles.radioButtonView}>
                    <RadioButton value="Match" color={Colors.Primary} />
                    <TouchableOpacity
                      onPress={() => this.setState({ advantageMove: 'Match' })}
                    >
                      <Text style={[styles.radioButtonText, { color: advantageMove === 'Match' ? Colors.Primary : Colors.Black }]}>{match[language]}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.radioButtonView}>
                    <RadioButton value="Money" color={Colors.Primary} />
                    <TouchableOpacity
                      onPress={() => this.setState({ advantageMove: 'Money' })}
                    >
                      <Text style={[styles.radioButtonText, { color: advantageMove === 'Money' ? Colors.Primary : Colors.Black }]}>{money[language]}</Text>
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
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={(advMovesHoles) => this.setState({ advMovesHoles })}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>{carryMove[language]}</Text>
                <Switch
                  value={carryMoveAdv}
                  thumbColor={carryMoveAdv ? Colors.Primary : Colors.Gray}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
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
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(rabbit16) => this.setState({ rabbit16 })}
                    value={rabbit16}
                    onSubmitEditing={_ => this.focusNextField('gs2')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Rabbit 7-12</Text>
                <View style={styles.costInputView}>
                  <Text style={styles.dollarText}>$</Text>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(rabbit712) => this.setState({ rabbit712 })}
                    value={rabbit712}
                    ref={ref => this.inputs['gs2'] = ref}
                    onSubmitEditing={_ => this.focusNextField('gs3')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Rabbit 13-18</Text>
                <View style={styles.costInputView}>
                  <Text style={styles.dollarText}>$</Text>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(rabbit1318) => this.setState({ rabbit1318 })}
                    value={rabbit1318}
                    ref={ref => this.inputs['gs3'] = ref}
                    onSubmitEditing={_ => this.focusNextField('gs4')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Medal Play F9</Text>
                <View style={styles.costInputView}>
                  <Text style={styles.dollarText}>$</Text>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(medalF9) => this.setState({ medalF9 })}
                    value={medalF9}
                    ref={ref => this.inputs['gs4'] = ref}
                    onSubmitEditing={_ => this.focusNextField('gs5')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Medal Play B9</Text>
                <View style={styles.costInputView}>
                  <Text style={styles.dollarText}>$</Text>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(medalB9) => this.setState({ medalB9 })}
                    value={medalB9}
                    ref={ref => this.inputs['gs5'] = ref}
                    onSubmitEditing={_ => this.focusNextField('gs6')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Medal Play 18</Text>
                <View style={styles.costInputView}>
                  <Text style={styles.dollarText}>$</Text>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(medal18) => this.setState({ medal18 })}
                    value={medal18}
                    ref={ref => this.inputs['gs6'] = ref}
                    onSubmitEditing={_ => this.focusNextField('gs7')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Skins</Text>
                <View style={styles.costInputView}>
                  <Text style={styles.dollarText}>$</Text>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(skins) => this.setState({ skins })}
                    value={skins}
                    ref={ref => this.inputs['gs7'] = ref}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Skin Carry Over</Text>
                <Switch
                  value={skinCarryOver}
                  thumbColor={skinCarryOver ? Colors.Primary : Colors.Gray}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={(skinCarryOver) => this.setState({ skinCarryOver })}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Lowed Adv On F9</Text>
                <Switch
                  value={lowedAdv}
                  thumbColor={lowedAdv ? Colors.Primary : Colors.Gray}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
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
                    style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={2}
                    onChangeText={(snwAutoPressesEvery) => this.setState({ snwAutoPressesEvery })}
                    value={snwAutoPressesEvery}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>{useFactorText[language]}</Text>
                <Switch
                  value={snwUseFactor}
                  thumbColor={snwUseFactor ? Colors.Primary : Colors.Gray}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={this.changeSNUseFactor}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Front 9</Text>
                <View style={styles.costInputView}>
                  {!snwUseFactor && <Text style={styles.dollarText}>$</Text>}
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(snwFront9) => this.setState({ snwFront9 })}
                    value={snwFront9}
                    ref={ref => this.inputs['snw2'] = ref}
                    onSubmitEditing={_ => this.focusNextField('snw3')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>
              {
                snwUseFactor ?
                <View>
                <View style={[styles.switchView,{flexDirection:'row', justifyContent:'space-between'}]}>
                <Text style={[styles.question,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Back 9</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                  <TextInput
                    style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(snwBack9) => this.setState({ snwBack9 })}
                    value={snwBack9}
                    ref={ref => this.inputs['snw3'] = ref}
                    onSubmitEditing={_ => this.focusNextField('snw4')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
              </View>

              <View style={[styles.switchView,{flexDirection:'row', justifyContent:'space-between'}]}>
                <Text style={[styles.question,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Match</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                  <TextInput
                    style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(snwMatch) => this.setState({ snwMatch })}
                    value={snwMatch}
                    ref={ref => this.inputs['snw4'] = ref}
                    onSubmitEditing={_ => this.focusNextField('snw5')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
              </View>

              <View style={[styles.switchView,{flexDirection:'row', justifyContent:'space-between'}]}>
                <Text style={[styles.question,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Carry</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                  <TextInput
                    style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(snwCarry) => this.setState({ snwCarry })}
                    value={snwCarry}
                    ref={ref => this.inputs['snw5'] = ref}
                    onSubmitEditing={_ => this.focusNextField('snw6')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
              </View>

              <View style={[styles.switchView,{flexDirection:'row', justifyContent:'space-between'}]}>
                <Text style={[styles.question,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Medal</Text>
                <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{snwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                  <TextInput
                    style={[styles.costInput,{flex:0.3, textAlign:'center'}]}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(snwMedal) => this.setState({ snwMedal })}
                    value={snwMedal}
                    ref={ref => this.inputs['snw6'] = ref}
                    selectTextOnFocus={true}
                  />
              </View>
              </View>
              :
              <View>
              <View style={styles.switchView}>
                <Text style={styles.question}>Back 9</Text>
                <View style={styles.costInputView}>
                  {!snwUseFactor && <Text style={styles.dollarText}>$</Text>}
                  { snwUseFactor && <Text style={styles.dollarText}>Front X</Text>}
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(snwBack9) => this.setState({ snwBack9 })}
                    value={snwBack9}
                    ref={ref => this.inputs['snw3'] = ref}
                    onSubmitEditing={_ => this.focusNextField('snw4')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Match</Text>
                <View style={styles.costInputView}>
                  {!snwUseFactor && <Text style={styles.dollarText}>$</Text>}
                  { snwUseFactor && <Text style={styles.dollarText}>Front X</Text>}
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(snwMatch) => this.setState({ snwMatch })}
                    value={snwMatch}
                    ref={ref => this.inputs['snw4'] = ref}
                    onSubmitEditing={_ => this.focusNextField('snw5')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Carry</Text>
                <View style={styles.costInputView}>
                  {!snwUseFactor && <Text style={styles.dollarText}>$</Text>}
                  { snwUseFactor && <Text style={styles.dollarText}>Front X</Text>}
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(snwCarry) => this.setState({ snwCarry })}
                    value={snwCarry}
                    ref={ref => this.inputs['snw5'] = ref}
                    onSubmitEditing={_ => this.focusNextField('snw6')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Medal</Text>
                <View style={styles.costInputView}>
                  {!snwUseFactor && <Text style={styles.dollarText}>$</Text>}
                  { snwUseFactor && <Text style={styles.dollarText}>Front X</Text>}
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(snwMedal) => this.setState({ snwMedal })}
                    value={snwMedal}
                    ref={ref => this.inputs['snw6'] = ref}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>
              </View>
              }

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
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={2}
                    onChangeText={(tnwAutoPressesEvery) => this.setState({ tnwAutoPressesEvery })}
                    value={tnwAutoPressesEvery}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>{useFactorText[language]}</Text>
                <Switch
                  value={tnwUseFactor}
                  thumbColor={tnwUseFactor ? Colors.Primary : Colors.Gray}
                  trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                  onValueChange={this.changeTNUseFactor}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Front 9</Text>
                <View style={styles.costInputView}>
                  {!tnwUseFactor && <Text style={styles.dollarText}>$</Text>}
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(tnwFront9) => this.setState({ tnwFront9 })}
                    value={tnwFront9}
                    ref={ref => this.inputs['tnw2'] = ref}
                    onSubmitEditing={_ => this.focusNextField('tnw3')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              {
                tnwUseFactor ?
                <View>
                  <View style={[styles.switchView,{flexDirection:'row', justifyContent:'space-between'}]}>
                  <Text style={[styles.question,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Back 9</Text>
                  <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Secondary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwBack9) => this.setState({ tnwBack9 })}
                      value={tnwBack9}
                      ref={ref => this.inputs['tnw3'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw4')}
                      blurOnSubmit={false}
                      selectTextOnFocus={true}
                    />
                </View>

                <View style={[styles.switchView,{flexDirection:'row', justifyContent:'space-between'}]}>
                  <Text style={[styles.question,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Match</Text>
                  <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Secondary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwMatch) => this.setState({ tnwMatch })}
                      value={tnwMatch}
                      ref={ref => this.inputs['tnw4'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw5')}
                      blurOnSubmit={false}
                      selectTextOnFocus={true}
                    />
                </View>

                <View style={[styles.switchView,{flexDirection:'row', justifyContent:'space-between'}]}>
                  <Text style={[styles.question,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Carry</Text>
                  <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Secondary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwCarry) => this.setState({ tnwCarry })}
                      value={tnwCarry}
                      ref={ref => this.inputs['tnw5'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw6')}
                      blurOnSubmit={false}
                      selectTextOnFocus={true}
                    />
                </View>

                <View style={[styles.switchView,{flexDirection:'row', justifyContent:'space-between'}]}>
                  <Text style={[styles.question,{flex:0.3, paddingHorizontal:12,alignSelf:'center'}]}>Medal</Text>
                  <Text style={[styles.dollarText,{flex:0.3,alignSelf:'center', textAlign:'center'}]}>{tnwUseFactor ? 'Front 9 X ': '$ ' }</Text>
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Secondary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwMedal) => this.setState({ tnwMedal })}
                      value={tnwMedal}
                      ref={ref => this.inputs['tnw6'] = ref}
                      selectTextOnFocus={true}
                    />
                </View>
                </View>
                :
                <View>
                  <View style={styles.switchView}>
                  <Text style={styles.question}>Back 9</Text>
                  <View style={styles.costInputView}>
                    {!tnwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    { tnwUseFactor && <Text style={styles.dollarText}>Front X</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Secondary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwBack9) => this.setState({ tnwBack9 })}
                      value={tnwBack9}
                      ref={ref => this.inputs['tnw3'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw4')}
                      blurOnSubmit={false}
                      selectTextOnFocus={true}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Match</Text>
                  <View style={styles.costInputView}>
                    {!tnwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    { tnwUseFactor && <Text style={styles.dollarText}>Front X</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Secondary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwMatch) => this.setState({ tnwMatch })}
                      value={tnwMatch}
                      ref={ref => this.inputs['tnw4'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw5')}
                      blurOnSubmit={false}
                      selectTextOnFocus={true}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Carry</Text>
                  <View style={styles.costInputView}>
                    {!tnwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    { tnwUseFactor && <Text style={styles.dollarText}>Front X</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Secondary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwCarry) => this.setState({ tnwCarry })}
                      value={tnwCarry}
                      ref={ref => this.inputs['tnw5'] = ref}
                      onSubmitEditing={_ => this.focusNextField('tnw6')}
                      blurOnSubmit={false}
                      selectTextOnFocus={true}
                    />
                  </View>
                </View>

                <View style={styles.switchView}>
                  <Text style={styles.question}>Medal</Text>
                  <View style={styles.costInputView}>
                    {!tnwUseFactor && <Text style={styles.dollarText}>$</Text>}
                    { tnwUseFactor && <Text style={styles.dollarText}>Front X</Text>}
                    <TextInput
                      style={styles.costInput}
                      selectionColor={Colors.Secondary}
                      placeholder="0"
                      keyboardType="numeric"
                      returnKeyType='done'
                      maxLength={8}
                      onChangeText={(tnwMedal) => this.setState({ tnwMedal })}
                      value={tnwMedal}
                      ref={ref => this.inputs['tnw6'] = ref}
                      selectTextOnFocus={true}
                    />
                  </View>
                </View>
                </View>
              }

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
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(bbtWagerF9) => this.setState({ bbtWagerF9 })}
                    value={bbtWagerF9}
                    onSubmitEditing={_ => this.focusNextField('bbt2')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Wager B9</Text>
                <View style={styles.costInputView}>
                  <Text style={styles.dollarText}>$</Text>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(bbtWagerB9) => this.setState({ bbtWagerB9 })}
                    value={bbtWagerB9}
                    ref={ref => this.inputs['bbt2'] = ref}
                    onSubmitEditing={_ => this.focusNextField('bbt3')}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>

              <View style={styles.switchView}>
                <Text style={styles.question}>Wager 18</Text>
                <View style={styles.costInputView}>
                  <Text style={styles.dollarText}>$</Text>
                  <TextInput
                    style={styles.costInput}
                    selectionColor={Colors.Secondary}
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType='done'
                    maxLength={8}
                    onChangeText={(bbtWager18) => this.setState({ bbtWager18 })}
                    value={bbtWager18}
                    ref={ref => this.inputs['bbt3'] = ref}
                    selectTextOnFocus={true}
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

  formatCellphone = (cellphone) => {
    //console.warn(cellphone)
    let formatted = '';
      let pureCell = '';
      //console.warn('ce: ' + cellphone)
      /*if (cellphone.length > 2) {
        pureCell = cellphone.substr(2,cellphone.length);
        formatted = '+' + cellphone.substr(0,2);
        formatted += ' ' + FormatCellphone(pureCell);
      }
      else{
        formatted = '+' + cellphone
      }*/
      return cellphone;
  }

  submit = async () => {

    const token = await AsyncStorage.getItem('usu_id')

      const {
        difTeesReg,
        difTeesRegAbs,
        signoTee,
        strokesReg,
        strokesRegAbs,
        signo,
        update,
        language,
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
        skinCarry: skinCarryOver ? 1 : 0,
        lowedAdv: lowedAdv ? 1 : 0,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

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
        useFactor: snwUseFactor ? 1 : 0,
        automatic_presses_every: snwAutoPressesEvery,
        front_9: snwFront9,
        back_9: snwBack9,
        match: snwMatch,
        medal: snwMedal,
        carry: snwCarry,
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
        useFactor: tnwUseFactor ? 1 : 0,
        automatic_presses_every: tnwAutoPressesEvery,
        front_9: tnwFront9,
        back_9: tnwBack9,
        match: tnwMatch,
        medal: tnwMedal,
        carry: tnwCarry,
        who_gets_the_adv_strokes: whoGetAdvStrokes,
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
        how_adv_move: advantageMove,
        how_many_strokes: strokesPerRound,
        adv_moves: advMovesHoles ? 1 : 0,
        carry_move_adv: carryMoveAdv ? 1 : 0,
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

      console.warn("IDUsuario: " + token)
      console.warn("IDUsuarioFriend: " + this.state.item.id)
      console.warn("set_idioma: " + language)
      console.warn("set_how_adv_move: " + asData.how_adv_move)
      console.warn("set_strokes_moved_per_round: " + asData.how_many_strokes)
      console.warn("set_adv_moves_on_9_holes: " + asData.adv_moves)
      console.warn("set_carry_moves_adv: " + asData.carry_move_adv)
      console.warn("set_rabbit_1_6: " + gsData.rabbit_1_6)
      console.warn("set_rabbit_7_12: " + gsData.rabbit_7_12)
      console.warn("set_rabbit_13_18: " + gsData.rabbit_13_18)
      console.warn("set_medal_play_f9: " + gsData.medal_play_f9)
      console.warn("set_medal_play_b9: " + gsData.medal_play_b9)
      console.warn("set_medal_play_18: " + gsData.medal_play_18)
      console.warn("set_skins: " + gsData.skins)
      console.warn("set_skins_carry_over: " + gsData.skinCarry)
      console.warn("set_lower_adv_f9: " + gsData.lowedAdv)
      console.warn("set_snw_automatic_press: " + snwData.automatic_presses_every)
      console.warn("set_snw_use_factor: " + snwData.useFactor)
      console.warn("set_snw_front_9: " + snwData.front_9)
      console.warn("set_snw_back_9: " + snwData.back_9)
      console.warn("set_snw_match: " + snwData.match)
      console.warn("set_snw_carry: " + snwData.carry)
      console.warn("set_snw_medal: " + snwData.medal)
      console.warn("set_tmw_automatic_press: " + tnwData.automatic_presses_every)
      console.warn("set_tmw_use_factor: " + tnwData.useFactor)
      console.warn("set_tmw_front_9: " + tnwData.front_9)
      console.warn("set_tmw_back_9: " + tnwData.back_9)
      console.warn("set_tmw_match: " + tnwData.match)
      console.warn("set_tmw_carry: " + tnwData.carry)
      console.warn("set_tmw_medal: " + tnwData.medal)
      console.warn("set_tmw_adv_strokes: " + tnwData.who_gets_the_adv_strokes)
      console.warn("set_eb_wager: " + ebData.wager)
      console.warn("set_bbt_wager_f9: " + bbData.wager_f9)
      console.warn("set_bbt_wager_b9: " + bbData.wager_b9)
      console.warn("set_bbt_wager_18: " + bbData.wager_18)
      console.warn("set_stableford_double_eagle: " + 0)

      console.warn(update)

      let strokesRegSigno = ''
      if(!signo)
        strokesRegSigno = '-'+strokesRegAbs
      else
          strokesRegSigno = strokesRegAbs
      console.warn(strokesRegSigno)

      let TeeRegSigno = ''
      if(!signoTee)
        TeeRegSigno = '-'+difTeesRegAbs
      else
          TeeRegSigno = difTeesRegAbs
      console.warn(TeeRegSigno)

      if(update){
        ActualizaSettingsFriend(token,this.state.item.id,language,asData.how_adv_move,asData.how_many_strokes,asData.adv_moves,
        asData.carry_move_adv,gsData.rabbit_1_6,gsData.rabbit_7_12,gsData.rabbit_13_18,
        gsData.medal_play_f9,gsData.medal_play_b9,gsData.medal_play_18,gsData.skins,
        gsData.skinCarry,gsData.lowedAdv,snwData.automatic_presses_every, 
        snwData.useFactor,snwData.front_9,snwData.back_9,snwData.match,
        snwData.carry,snwData.medal,tnwData.automatic_presses_every, tnwData.useFactor,
        tnwData.front_9,tnwData.back_9,tnwData.match,tnwData.carry,tnwData.medal,
        tnwData.who_gets_the_adv_strokes,ebData.wager,bbData.wager_f9,bbData.wager_b9,
        bbData.wager_18,0,0,0,0,0,0,strokesRegSigno,TeeRegSigno)
        .then((res) => {
          console.warn(res)
          try{
            if(res.estatus==1){
            showMessage({
                  message: successSaveTeeData[language],
                  type: 'success',
              });
            this.props.navigation.goBack()
          }  
          else{
              //setLoading(false)
              showMessage({
                  message: error[language],
                  type: 'danger',
              });
          }
          }catch(e){
            showMessage({
              message: error[language],
              type:'danger',
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
      else{
        AltaSettingsFriend(token,this.state.item.id,language,asData.how_adv_move,asData.how_many_strokes,asData.adv_moves,
        asData.carry_move_adv,gsData.rabbit_1_6,gsData.rabbit_7_12,gsData.rabbit_13_18,
        gsData.medal_play_f9,gsData.medal_play_b9,gsData.medal_play_18,gsData.skins,
        gsData.skinCarry,gsData.lowedAdv,snwData.automatic_presses_every, 
        snwData.useFactor,snwData.front_9,snwData.back_9,snwData.match,
        snwData.carry,snwData.medal,tnwData.automatic_presses_every, tnwData.useFactor,
        tnwData.front_9,tnwData.back_9,tnwData.match,tnwData.carry,tnwData.medal,
        tnwData.who_gets_the_adv_strokes,ebData.wager,bbData.wager_f9,bbData.wager_b9,
        bbData.wager_18,0,0,0,0,0,0,strokesRegSigno,TeeRegSigno)
        .then((res) => {
          console.warn(res)
          try{
            if(res.estatus==1){
            showMessage({
                  message: successSaveTeeData[language],
                  type: 'success',
              });
            this.props.navigation.goBack()
          }  
          else{
              //setLoading(false)
              showMessage({
                  message: error[language],
                  type: 'danger',
              });
          }
          }catch(e){
            showMessage({
              message: error[language],
              type:'danger',
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

}

export default PlayerInfoView;