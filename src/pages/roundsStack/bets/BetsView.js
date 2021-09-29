import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  Animated,
  Dimensions,
  Alert,
  TouchableOpacity,
  RefreshControl,
  Text,
  ScrollView,
  SafeAreaView,
  ActionSheetIOS
} from 'react-native';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import { SearchBar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Dictionary } from '../../../utils/Dictionary';
import HeaderButton from '../../global/HeaderButton';
//import CourseComponent from './CourseComponent';
import { NavigationEvents } from 'react-navigation';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import HideItem from '../../global/HideItem';
import Snackbar from 'react-native-snackbar';
import Colors from '../../../utils/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { ListaApuesta, ListadoDetalleApuesta, ListadoDetalleApuestaTeam, ActualizarOrdenApuesta, EliminarApuesta } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import Collapsible2 from 'react-native-collapsible';
import BetsViewDetail from './BetsViewDetail';
import BetsViewDetailTN from './BetsViewDetailTN';
import styles from './styles';

export default function betsView(route) {

    const navigation = useNavigation();
    const [subebaja, setSubebaja] = useState(false);
    const [rounds2, setRounds2] = useState([]);
    const [rounds3, setRounds3] = useState([]);
    const [bets2, setbets2] = useState([]);
    const [collapsedArray, setCollapsedArray] = useState([]);
    const [collapsed, setCollapsed] = useState([]);
    let collapsedArray2 = [];
    const [collapsed2, setCollapsed2] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
    const [arrayholder2, setArrayholder2] = useState([]);
    const [IDRound, setIDRound] = useState(0);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [language, setLanguage] = useState('');
    const [search, setSearch] = useState(true);
    const [visible, setVisible] = useState(true);
    const [carga, setStatus] = useState(false);
    const [dataInState, setDataInState] = useState([]);
    const ScreenWidth = Dimensions.get("window").width;
        useEffect(() => {
          ListadoBets();
          const unsubscribe = navigation.addListener("focus", () => {
            ListadoBets();
          });
          Dimensions.addEventListener('change', (dimensions) => {
            console.warn('Adios')
            cambia()
          });
        return unsubscribe;
      }, []);


  async function cambia() {
      console.warn('Hola')
      AsyncStorage.setItem('arreglo', 'false');
      //ListadoBets()
  }

  async function ListadoBets() {
      setCollapsed([])
      setCollapsedArray([])
      let language = await AsyncStorage.getItem('language')
      let IDRound = await AsyncStorage.getItem('IDRound')
      let IDUsuario = await AsyncStorage.getItem('usu_id')
      let sn = await AsyncStorage.getItem('sn')
      let tn = await AsyncStorage.getItem('tn')
      let arreglo = await AsyncStorage.getItem('arreglo')
      sn=sn=='true'?true:false
      tn=tn=='true'?true:false
      arreglo=arreglo=='true'?true:false
      collapsedArray2[0]=sn
      collapsedArray2[1]=tn
      setCollapsed2(collapsedArray2)
      setIDRound(IDRound)
      setLanguage(language)
      if(!arreglo){
        setbets2([])
      setStatus(true)
      setRounds2([])
      ListadoDetalleApuesta(IDRound,1, IDUsuario)
          .then((res) => {
            console.warn(res)
              if(res.estatus == 1 || res.estatus == 0){
                if(res.estatus == 1){
                  const list = res.Result.map(item => (
                      {
                        ConsecutivosApuesta: item.ConsecutivosApuesta,
                        id: item.IDBetDetail,
                        fecha: moment(item.Bet_FechaCreacion).format('DD/MM/YYYY').toString(),
                        Player1: item.Player1,
                        Player2: item.Player2,
                        todos: item.Player1 + item.Player2,
                        BetD_Player1: item.BetD_Player1,
                        BetD_Player2: item.BetD_Player2,
                        BetD_AdvStrokers: item.BetD_AdvStrokers,
                        BetD_AutoPress: item.BetD_AutoPress,
                        BetD_MontoF9: item.BetD_MontoF9,
                        BetD_MontoB9: item.BetD_MontoB9,
                        BetD_MontoCalculoF9: item.BetD_MontoCalculoF9,
                        BetD_MontoCalculoB9: item.BetD_MontoCalculoB9,
                        BetD_Medal: item.BetD_Medal,
                        BetD_MedalInt: item.BetD_MedalInt,
                        BetD_MachInt: item.BetD_MachInt,
                        BetD_Carry: item.BetD_Carry,
                        BetD_CarryCalculado: item.BetD_CarryCalculado,
                        BetD_MontoApuestaMedal: item.BetD_MontoApuestaMedal,
                        BetD_Match: item.BetD_Match,
                        BetD_MachMonto: item.BetD_MachMonto,
                        BetD_MontoPerdidoGanado: item.BetD_MontoPerdidoGanado,
                        BetD_F9_1: item.BetD_F9_1,
                        BetD_F9_2: item.BetD_F9_2,
                        BetD_F9_3: item.BetD_F9_3,
                        BetD_F9_4: item.BetD_F9_4,
                        BetD_F9_5: item.BetD_F9_5,
                        BetD_F9_6: item.BetD_F9_6,
                        BetD_F9_7: item.BetD_F9_7,
                        BetD_F9_8: item.BetD_F9_8,
                        BetD_F9_9: item.BetD_F9_9,
                        BetD_B9_1: item.BetD_B9_1,
                        BetD_B9_2: item.BetD_B9_2,
                        BetD_B9_3: item.BetD_B9_3,
                        BetD_B9_4: item.BetD_B9_4,
                        BetD_B9_5: item.BetD_B9_5,
                        BetD_B9_6: item.BetD_B9_6,
                        BetD_B9_7: item.BetD_B9_7,
                        BetD_B9_8: item.BetD_B9_8,
                        BetD_B9_9: item.BetD_B9_9,
                        f9Presses: [item.BetD_F9_1, item.BetD_F9_2, item.BetD_F9_3, item.BetD_F9_4, item.BetD_F9_5, item.BetD_F9_6, item.BetD_F9_7, item.BetD_F9_8, item.BetD_F9_9],
                        b9Presses: [item.BetD_B9_1, item.BetD_B9_2, item.BetD_B9_3, item.BetD_B9_4, item.BetD_B9_5, item.BetD_B9_6, item.BetD_B9_7, item.BetD_B9_8, item.BetD_B9_9],
                        BetD_AdvStrokers: item.BetD_AdvStrokers
                      }
                  ))
                    setRounds2(list)
                    setArrayholder(list)
                  }
                    setRounds3([])
            ListadoDetalleApuestaTeam(IDRound,2, IDUsuario)
            .then((res) => {
            console.warn(res)
              //console.warn('Hola')
              //console.warn(res)
                if(res.estatus == 1){
                    const list = res.Result.map(item => (
                        {
                          ConsecutivosApuesta: item.ConsecutivosApuesta,
                          id: item.IDBetDetail,
                          fecha: moment(item.Bet_FechaCreacion).format('DD/MM/YYYY').toString(),
                          Player1: item.Player1,
                          Player2: item.Player2,
                          Player3: item.Player3,
                          Player4: item.Player4,
                          todos: item.Player1 + item.Player2 + item.Player3 + item.Player4,
                          BetD_Player1: item.BetD_Player1,
                          BetD_Player2: item.BetD_Player2,
                          BetD_Player3: item.BetD_Player3,
                          BetD_Player4: item.BetD_Player4,
                          BetD_AdvStrokers: item.BetD_AdvStrokers,
                          set_tmw_adv_strokes: item.set_tmw_adv_strokes,
                          BetD_AutoPress: item.BetD_AutoPress,
                          BetD_MontoF9: item.BetD_MontoF9,
                          BetD_MontoB9: item.BetD_MontoB9,
                          BetD_MontoCalculoF9: item.BetD_MontoCalculoF9,
                          BetD_MontoCalculoB9: item.BetD_MontoCalculoB9,
                          BetD_Medal: item.BetD_Medal,
                          BetD_MedalInt: item.BetD_MedalInt,
                          BetD_MachInt: item.BetD_MachInt,
                          BetD_Carry: item.BetD_Carry,
                          BetD_CarryCalculado: item.BetD_CarryCalculado,
                          BetD_MontoApuestaMedal: item.BetD_MontoApuestaMedal,
                          BetD_Match: item.BetD_Match,
                          BetD_MachMonto: item.BetD_MachMonto,
                          BetD_MontoPerdidoGanado: item.BetD_MontoPerdidoGanado,
                          BetD_F9_1: item.BetD_F9_1,
                          BetD_F9_2: item.BetD_F9_2,
                          BetD_F9_3: item.BetD_F9_3,
                          BetD_F9_4: item.BetD_F9_4,
                          BetD_F9_5: item.BetD_F9_5,
                          BetD_F9_6: item.BetD_F9_6,
                          BetD_F9_7: item.BetD_F9_7,
                          BetD_F9_8: item.BetD_F9_8,
                          BetD_F9_9: item.BetD_F9_9,
                          BetD_B9_1: item.BetD_B9_1,
                          BetD_B9_2: item.BetD_B9_2,
                          BetD_B9_3: item.BetD_B9_3,
                          BetD_B9_4: item.BetD_B9_4,
                          BetD_B9_5: item.BetD_B9_5,
                          BetD_B9_6: item.BetD_B9_6,
                          BetD_B9_7: item.BetD_B9_7,
                          BetD_B9_8: item.BetD_B9_8,
                          BetD_B9_9: item.BetD_B9_9,
                          f9Presses: [item.BetD_F9_1, item.BetD_F9_2, item.BetD_F9_3, item.BetD_F9_4, item.BetD_F9_5, item.BetD_F9_6, item.BetD_F9_7, item.BetD_F9_8, item.BetD_F9_9],
                          b9Presses: [item.BetD_B9_1, item.BetD_B9_2, item.BetD_B9_3, item.BetD_B9_4, item.BetD_B9_5, item.BetD_B9_6, item.BetD_B9_7, item.BetD_B9_8, item.BetD_B9_9],
                          BetD_AdvStrokers: item.BetD_AdvStrokers
                        }
                    ))
                      setRounds3(list)
                      setArrayholder2(list)
                      ListaApuesta()
                        .then((res) => {
                          ////console.warn(res)
                            if(res.estatus == 1){
                                const list = res.Result.map(item => (
                                    {
                                      id: item.IDBet,
                                      nombre: item.Bet_Nombre,
                                      fecha: moment(item.Bet_FechaCreacion).format('DD/MM/YYYY').toString()
                                    }
                                ))
                                setbets2(list.reverse())
                                setStatus(false)
                                AsyncStorage.setItem('arreglo', 'true');
                            }
                            else{
                              setbets2([])
                              setStatus(false)
                              AsyncStorage.setItem('arreglo', 'true');
                            }
                        })
                }
                else{
                  setRounds3([])
                  ListaApuesta()
                        .then((res) => {
                          ////console.warn(res)
                            if(res.estatus == 1){
                                const list = res.Result.map(item => (
                                    {
                                      id: item.IDBet,
                                      nombre: item.Bet_Nombre,
                                      fecha: moment(item.Bet_FechaCreacion).format('DD/MM/YYYY').toString()
                                    }
                                ))
                                setbets2(list.reverse())
                                setStatus(false)
                                AsyncStorage.setItem('arreglo', 'true');
                            }
                            else{
                              setbets2([])
                              setStatus(false)
                              AsyncStorage.setItem('arreglo', 'true');
                            }
                        })
                }
              })
              }
              else{
                setRounds2([])
                ListaApuesta()
                        .then((res) => {
                          ////console.warn(res)
                            if(res.estatus == 1){
                                const list = res.Result.map(item => (
                                    {
                                      id: item.IDBet,
                                      nombre: item.Bet_Nombre,
                                      fecha: moment(item.Bet_FechaCreacion).format('DD/MM/YYYY').toString()
                                    }
                                ))
                                setbets2(list.reverse())
                                setStatus(false)
                                AsyncStorage.setItem('arreglo', 'true');
                            }
                            else{
                              setbets2([])
                              setStatus(false)
                              AsyncStorage.setItem('arreglo', 'true');
                            }
                        })
              }
          })
      }
  }

  function searchFilterFunction(text,busqueda){

    const newData = arrayholder.filter(item => {
    let itemData = ""
    switch(busqueda){
      case 1:
        setValue1(text) 
        itemData = `${item.todos} ${item.todos.toUpperCase()}`;
        break;
      case 2:
        setValue2(text) 
        itemData = `${item.nombreCorto} ${item.nombreCorto.toUpperCase()}`;
        break;
      case 3:
        setValue3(text) 
        itemData = `${item.ciudad} ${item.ciudad.toUpperCase()}`;
        break;
      case 4:
        setValue4(text) 
        itemData = `${item.pais} ${item.pais.toUpperCase()}`;
        break;
    }
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;

    });
    setRounds2(newData)
    setDataInState([...dataInState, rounds2])

    const newData2 = arrayholder2.filter(item => {
    let itemData = ""
    switch(busqueda){
      case 1:
        setValue1(text) 
        itemData = `${item.todos} ${item.todos.toUpperCase()}`;
        break;
      case 2:
        setValue2(text) 
        itemData = `${item.nombreCorto} ${item.nombreCorto.toUpperCase()}`;
        break;
      case 3:
        setValue3(text) 
        itemData = `${item.ciudad} ${item.ciudad.toUpperCase()}`;
        break;
      case 4:
        setValue4(text) 
        itemData = `${item.pais} ${item.pais.toUpperCase()}`;
        break;
    }
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;

    });
    setRounds3(newData2)
    setDataInState([...dataInState, rounds3])
  };

  async function muestraRonda(IDBet,IDRound){
    if(IDBet==1){
      collapsedArray2[0]=(!collapsed2[0])
      collapsedArray2[1]=(collapsed2[1])
      AsyncStorage.setItem('sn', (!collapsed2[0]).toString());
      AsyncStorage.setItem('tn', (collapsed2[1]).toString());
      setCollapsed2(collapsedArray2)
    }
    else{
      collapsedArray2[1]=(!collapsed2[1])
      collapsedArray2[0]=(collapsed2[0])
      AsyncStorage.setItem('tn', (!collapsed2[1]).toString());
      AsyncStorage.setItem('sn', (collapsed2[0]).toString());
      setCollapsed2(collapsedArray2)
    }
    //ListadoRondas(IDBet,IDRound);
    //setValue1('')
  }

  function showSheetView(item,index){
    console.warn('Entra función')
    //muestraRonda2(IDRound,IDBet, item.id, index)
    console.warn(item.id)
        const {
            seeResults,
            editBet,
            addPress,
            removePress,
            removeBet,
            cancel
        } = Dictionary;

        if (Platform.OS === 'ios') {
          console.warn('Entra if')
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: [
                        seeResults[language],
                        removeBet[language],
                        editBet[language],
                        /*addPress[language],
                        removePress[language],
                        removeBet[language],*/
                        cancel[language],
                    ],
                    destructiveButtonIndex: 4,
                    cancelButtonIndex: 5,
                },
                (index2) => {
                    if (index2 !== 3) doAction(index,index2, item);
                },
            );
        } else {
          console.warn('Entra al else')
            const resultsIcon = <Icon name='counter' color={Colors.Primary} size={40} family={"MaterialCommunityIcons"} />;
            const editIcon = <Icon name='edit' color={Colors.Primary} size={40} family={"Entypo"} />;
            const addPressIcon = <Icon name='md-add-circle-outline' color={Colors.Primary} size={40} family={"Ionicons"} />;
            const removePressIcon = <Icon name='md-remove-circle-outline' color={Colors.Primary} size={40} family={"Ionicons"} />;
            const removeBetIcon = <Icon name='md-trash' color={Colors.Primary} size={40} family={"Ionicons"} />;

            RNBottomActionSheet.SheetView.Show({
                title: `${item.Player1} vs ${item.Player2}`,
                items: [
                    { title: seeResults[language], icon: resultsIcon },
                    { title: removeBet[language], icon: removeBetIcon },
                    { title: editBet[language], icon: editIcon },
                    /*{ title: addPress[language], icon: addPressIcon },
                    { title: removePress[language], icon: removePressIcon },
                    { title: removeBet[language], icon: removeBetIcon },*/
                ],
                onSelection: (index2) => {
                    doAction(index,index2, item);
                },
            });
        }
    }

    function doAction(index, index2, item){
      console.warn(item)
        switch (index2) {
            case 0:
                navigation.navigate('SNScoreCardView',{Item:item});
                break;
            case 1:
                Alert.alert(
                    Dictionary.sureToDeleteBet[language],
                    '',
                    [
                        { text: Dictionary.cancel[language], style: 'cancel' },
                        { text: Dictionary.delete[language], onPress: _ => Elimina(item.id,index), style: 'destructive' }
                    ]
                )
                break;
            case 2:
                navigation.navigate('SNBetViewEdit',{IDBet:1, IDRound:IDRound, IDBetDetail: item.id, BetD_MontoF9:item.BetD_MontoF9, BetD_MontoB9:item.BetD_MontoB9, BetD_Medal:item.BetD_Medal, BetD_Carry:item.BetD_Carry, BetD_Match:item.BetD_Match, BetD_AdvStrokers:item.BetD_AdvStrokers, Player1:item.BetD_Player1, Player2:item.BetD_Player2, BetD_AutoPress:item.BetD_AutoPress})
                break;
            /*case 2:
                item.manual_press = manualPress + 1;
                this.props.updatePress(item);
                this.calculatePresses(this.props.switchAdv, manualPress + 1);
                this.setState({ manualPress: manualPress + 1 });
                break;
            case 3:
                if (manualPress > 0) {
                    item.manual_press = manualPress - 1;
                    this.props.updatePress(item);
                    this.calculatePresses(this.props.switchAdv, manualPress - 1);
                    this.setState({ manualPress: manualPress - 1 });
                }
                break;
            case 4:
                Alert.alert(
                    Dictionary.sureToDeleteBet[this.props.language],
                    '',
                    [
                        { text: Dictionary.cancel[this.props.language], style: 'cancel' },
                        { text: Dictionary.delete[this.props.language], onPress: _ => this.props.deleteSNBet({ id: item.id, round_id: this.props.roundId, type: 'single' }), style: 'destructive' }
                    ]
                )
                break;*/
            default:
                Alert.alert('Error', Dictionary.noFeature[language]);
        }
    }

  async function subeSN(index) {
      //console.warn(rounds)
      let aux;
      if(index!=0){
        console.warn(rounds2[index-1].id)
        console.warn(rounds2[index].id)
        let IDUsuario = await AsyncStorage.getItem('usu_id')
        console.warn(IDUsuario)
        ActualizarOrdenApuesta(rounds2[index-1].id,rounds2[index].id,IDUsuario)
          .then((res) => {console.warn(res)})
        aux = rounds2[index]
        rounds2[index]=rounds2[index-1]
        rounds2[index-1]=aux
        setDataInState([...dataInState, rounds2])
      }
    }
    async function bajaSN(index){
      let aux;
      if(index!=rounds2.length-1){
        console.warn(rounds2[index+1].id)
        console.warn(rounds2[index].id)
        let IDUsuario = await AsyncStorage.getItem('usu_id')
        console.warn(IDUsuario)
        ActualizarOrdenApuesta(rounds2[index+1].id,rounds2[index].id,IDUsuario)
          .then((res) => {console.warn(res)})
        aux = rounds2[index]
        rounds2[index]=rounds2[index+1]
        rounds2[index+1]=aux
        setDataInState([...dataInState, rounds2])
      }
    }

    function showSheetViewTN(item,index){
    //muestraRonda2(IDRound,IDBet, item.id, index)
    console.warn(item.id)
        const {
            seeResults,
            editBet,
            addPress,
            removePress,
            removeBet,
            cancel
        } = Dictionary;

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: [
                        seeResults[language],
                        removeBet[language],
                        editBet[language],
                        /*addPress[language],
                        removePress[language],
                        removeBet[language],*/
                        cancel[language],
                    ],
                    destructiveButtonIndex: 4,
                    cancelButtonIndex: 5,
                },
                (index2) => {
                    if (index2 !== 3) doActionTN(index,index2, item);
                },
            );
        } else {
            const resultsIcon = <Icon name='counter' color={Colors.Primary} size={40} family={"MaterialCommunityIcons"} />;
            const editIcon = <Icon name='edit' color={Colors.Primary} size={40} family={"Entypo"} />;
            const addPressIcon = <Icon name='md-add-circle-outline' color={Colors.Primary} size={40} family={"Ionicons"} />;
            const removePressIcon = <Icon name='md-remove-circle-outline' color={Colors.Primary} size={40} family={"Ionicons"} />;
            const removeBetIcon = <Icon name='md-trash' color={Colors.Primary} size={40} family={"Ionicons"} />;

            if(item.BetD_Player1==item.BetD_Player3 && item.BetD_Player2!=item.BetD_Player4){
              RNBottomActionSheet.SheetView.Show({
                title: `${item.Player1} ${item.Player3} vs ${item.Player2} ${item.Player4}`,
                items: [
                    { title: seeResults[language], icon: resultsIcon },
                    { title: removeBet[language], icon: removeBetIcon },
                    { title: editBet[language], icon: editIcon },
                    /*{ title: addPress[language], icon: addPressIcon },
                    { title: removePress[language], icon: removePressIcon },
                    { title: removeBet[language], icon: removeBetIcon },*/
                ],
                onSelection: (index2) => {
                    doActionTN(index,index2, item);
                },
            });
          }
          if(item.BetD_Player1!=item.BetD_Player3 && item.BetD_Player2!=item.BetD_Player4){
              RNBottomActionSheet.SheetView.Show({
                title: `${item.Player1} ${item.Player3} vs ${item.Player2} ${item.Player4}`,
                items: [
                    { title: seeResults[language], icon: resultsIcon },
                    { title: removeBet[language], icon: removeBetIcon },
                    { title: editBet[language], icon: editIcon },
                    /*{ title: addPress[language], icon: addPressIcon },
                    { title: removePress[language], icon: removePressIcon },
                    { title: removeBet[language], icon: removeBetIcon },*/
                ],
                onSelection: (index2) => {
                    doActionTN(index,index2, item);
                },
            });
          }
          if(item.BetD_Player2==item.BetD_Player4 && item.BetD_Player1!=item.BetD_Player3){
              RNBottomActionSheet.SheetView.Show({
                title: `${item.Player1} ${item.Player3} vs ${item.Player2} ${item.Player4}`,
                items: [
                    { title: seeResults[language], icon: resultsIcon },
                    { title: removeBet[language], icon: removeBetIcon },
                    { title: editBet[language], icon: editIcon },
                    /*{ title: addPress[language], icon: addPressIcon },
                    { title: removePress[language], icon: removePressIcon },
                    { title: removeBet[language], icon: removeBetIcon },*/
                ],
                onSelection: (index2) => {
                    doActionTN(index,index2, item);
                },
            });
          }
          if(item.BetD_Player1==item.BetD_Player3 && item.BetD_Player2==item.BetD_Player4){
              RNBottomActionSheet.SheetView.Show({
                title: `${item.Player1} ${item.Player3} vs ${item.Player2} ${item.Player4}`,
                items: [
                    { title: seeResults[language], icon: resultsIcon },
                    { title: removeBet[language], icon: removeBetIcon },
                    { title: editBet[language], icon: editIcon },
                    /*{ title: addPress[language], icon: addPressIcon },
                    { title: removePress[language], icon: removePressIcon },
                    { title: removeBet[language], icon: removeBetIcon },*/
                ],
                onSelection: (index2) => {
                    doActionTN(index,index2, item);
                },
            });
          }
        }
    }

    function doActionTN(index, index2, item){
      console.warn(item)
        switch (index2) {
            case 0:
                navigation.navigate('TNScoreCardView',{Item:item});
                break;
            case 1:
                Alert.alert(
                    Dictionary.sureToDeleteBet[language],
                    '',
                    [
                        { text: Dictionary.cancel[language], style: 'cancel' },
                        { text: Dictionary.delete[language], onPress: _ => Elimina(item.id,index), style: 'destructive' }
                    ]
                )
                break;
            case 2:
                navigation.navigate('TNBetViewEdit',{IDBet:2, IDRound:IDRound, IDBetDetail: item.id, BetD_MontoF9:item.BetD_MontoF9, BetD_MontoB9:item.BetD_MontoB9, BetD_Medal:item.BetD_Medal, BetD_Carry:item.BetD_Carry, BetD_Match:item.BetD_Match, BetD_AdvStrokers:item.BetD_AdvStrokers, Player1:item.BetD_Player1, Player2:item.BetD_Player2, Player3:item.BetD_Player3, Player4:item.BetD_Player4, BetD_AutoPress:item.BetD_AutoPress, set_tmw_adv_strokes:item.set_tmw_adv_strokes})
                break;
            /*case 2:
                item.manual_press = manualPress + 1;
                this.props.updatePress(item);
                this.calculatePresses(this.props.switchAdv, manualPress + 1);
                this.setState({ manualPress: manualPress + 1 });
                break;
            case 3:
                if (manualPress > 0) {
                    item.manual_press = manualPress - 1;
                    this.props.updatePress(item);
                    this.calculatePresses(this.props.switchAdv, manualPress - 1);
                    this.setState({ manualPress: manualPress - 1 });
                }
                break;
            case 4:
                Alert.alert(
                    Dictionary.sureToDeleteBet[this.props.language],
                    '',
                    [
                        { text: Dictionary.cancel[this.props.language], style: 'cancel' },
                        { text: Dictionary.delete[this.props.language], onPress: _ => this.props.deleteSNBet({ id: item.id, round_id: this.props.roundId, type: 'single' }), style: 'destructive' }
                    ]
                )
                break;*/
            default:
                Alert.alert('Error', Dictionary.noFeature[language]);
        }
    }

    async function subeTN(index){
      console.warn(rounds3)
      let aux;
      if(index!=0){
        console.warn(rounds3[index-1].id)
        console.warn(rounds3[index].id)
        let IDUsuario = await AsyncStorage.getItem('usu_id')
        console.warn(IDUsuario)
        ActualizarOrdenApuesta(rounds3[index-1].id,rounds3[index].id,IDUsuario)
          .then((res) => {console.warn(res)})
        aux = rounds3[index]
        rounds3[index]=rounds3[index-1]
        rounds3[index-1]=aux
        setDataInState([...dataInState, rounds3])
      }
      console.warn(rounds3)
      console.warn(index)
    }
    async function bajaTN(index){
      console.warn(rounds3)
      let aux;
      if(index!=rounds3.length-1){
        console.warn(rounds3[index+1].id)
        console.warn(rounds3[index].id)
        let IDUsuario = await AsyncStorage.getItem('usu_id')
        console.warn(IDUsuario)
        ActualizarOrdenApuesta(rounds3[index+1].id,rounds3[index].id,IDUsuario)
          .then((res) => {console.warn(res)})
        aux = rounds3[index]
        rounds3[index]=rounds3[index+1]
        rounds3[index+1]=aux
        setDataInState([...dataInState, rounds3])
      }
      console.warn(rounds3)
      console.warn(index)
    }

    async function Elimina(id, index){
    console.warn(id)
    EliminarApuesta(id)
      .then((res) => {
        console.warn(res)
        if(res.estatus == 1){
          AsyncStorage.setItem('arreglo', 'false');
          ListadoBets()
          //ListadoRondas2(3, index)
        }
      })
  }

    const {
      round,
      date,
      tipe,
      bets,
      Search,
      nickname
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <Spinner
            visible={carga}
            color={Colors.Primary} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> navigation.openDrawer()}>
              <MaterialIcon name={'menu'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> setSubebaja(!subebaja)}>
          <FontAwesome name={subebaja?'toggle-on':'toggle-off'} size={20} color={Colors.Primary} />
        </TouchableOpacity>
          <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
          <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{bets[language]}</Text>
          </View>
        </View>

      {search && <View style={{margin:5}}>
      <SearchBar
        icon={() => <Entypo name={'magnifying-glass'} size={20} color={Colors.Primary} />}
        placeholder={nickname[language]}
        onChangeText={(text) => searchFilterFunction(text,1)}
        autoCorrect={false}
        value={value1}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        height:50,
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:0.5}}
      />
      </View>}
        <ScrollView style={{marginBottom:50}}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  ListadoBets()
                  setValue1('')
                  setValue2('')
                  setValue3('')
                  setValue4('')
                }}
              />
            }
            data={bets2}
            renderItem={({item}) =>
              <View>
                <TouchableOpacity activeOpacity={0} onPress={()=> muestraRonda(item.id,IDRound)}>
                  {item.id == 1 ?
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity style={{ flex:0.2, justifyContent: 'flex-start', marginLeft:15 }} onPress={()=> muestraRonda(1,IDRound)}>
                        <Entypo name={collapsed2[0]?'chevron-thin-up':'chevron-thin-down'} size={20} color={Colors.Primary} />
                      </TouchableOpacity>
                      <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
                        <Text style={{ margin:0, marginTop:0, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>SINGLE NASSAU{/*bets[language]*/}</Text>
                      </View>
                      <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{margin:0, marginTop:0, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('SNBetView',{IDBet:item.id, IDRound:IDRound})}>
                          <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    :
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex:0.2, justifyContent: 'flex-start', marginLeft:15 }}>
                        <TouchableOpacity style={{ flex:0.2, justifyContent: 'flex-start' }} onPress={()=> muestraRonda(2,IDRound)}>
                          <Entypo name={collapsed2[1]?'chevron-thin-up':'chevron-thin-down'} size={20} color={Colors.Primary} />
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
                        <Text style={{ margin:0, marginTop:0, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>TEAM NASSAU{/*bets[language]*/}</Text>
                      </View>
                      <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{margin:0, marginTop:0, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('TNBetView',{IDBet:item.id, IDRound:IDRound})}>
                          <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  }
                </TouchableOpacity>
                {collapsed2[item.id-1]? item.id == 1 ?
                  <View style={{ flex: 0.5, margin:10 }}>
        <Spinner
            visible={carga}
            color={Colors.Primary} />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  ListadoBets()
                  setValue1('')
                  setValue2('')
                  setValue3('')
                  setValue4('')
                }}
              />
            }
            data={rounds2}
            renderItem={({item, index}) =>
              <View style={{flexDirection:'row'}}>
                {subebaja && <View style={{ flexDirection: 'column', justifyContent: "center"}}>
                  <TouchableOpacity style={{padding:0}} onPress={()=> subeSN(index)}>
                      <Entypo name={'chevron-small-up'} size={25} color={Colors.Primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding:0}} onPress={()=> bajaSN(index)}>
                      <Entypo name={'chevron-small-down'} size={25} color={Colors.Primary} />
                    </TouchableOpacity>
                </View>}
                  <View style={styles.betIndexView}>
                    <Text style={styles.betIndexText}>{rounds2[index].ConsecutivosApuesta}</Text>
                  </View>
                      <View style={{flex:0.95,padding:0,paddingHorizontal:0}}>
                          {/*!collapsed3[index]&&*/<Ripple
                            rippleColor={Colors.Secondary}
                            onPress={()=>showSheetView(item, index)}
                          >
                            <View style={{ flex: 1, margin:0 }}>
                              <View style={styles.betGeneralInfoView}>
                                  <View style={{ flexDirection: 'row' }}>
                                      <Text style={[styles.advInfo, { color: rounds2[index].BetD_AdvStrokers < 0 ? 'red' : Colors.Black }]}>[{rounds2[index].BetD_AdvStrokers}] </Text>
                                      <Text style={styles.vsInfo}> {rounds2[index].Player1} vs {rounds2[index].Player2}</Text>
                                  </View>
                                  <Text style={[styles.profitText, { color: rounds2[index].BetD_MontoPerdidoGanado < 0 ? Colors.Primary : rounds2[index].BetD_MontoPerdidoGanado > 1 ? 'green' : Colors.Black }]}>${rounds2[index].BetD_MontoPerdidoGanado}</Text>
                              </View>
                              <View style={styles.betInfoView}>
                                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ marginRight: 10, color: rounds2[index].BetD_MontoF9 < 0 ? 'red' : Colors.Black }}>${rounds2[index].BetD_MontoF9} <Text style={{ fontWeight: 'bold', color:Colors.Black }}>F9:</Text></Text>
                                      <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                          {
                                              rounds2[index].f9Presses.map((item, index) => {
                                                  switch (item.replace(' ','')) {
                                                      case '':
                                                          return <Text key={'snf9' + index}>_</Text>;
                                                      case '0':
                                                          return <Text key={'snf9' + index}>=</Text>;
                                                      default:
                                                          return <Text key={'snf9' + index} style={{ color: item < 0 ? Colors.Primary : Colors.Black }}>{item}</Text>;
                                                  }
                                              })
                                          }
                                      </View>
                                      <Text style={{ marginRight: 0, color: rounds2[index].BetD_MontoCalculoF9 < 0 ? 'red' : Colors.Black }}>${rounds2[index].BetD_MontoCalculoF9}</Text>
                                      <View style={{ width: 30 }} />
                                  </View>
                                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ marginRight: 10, color: rounds2[index].BetD_MontoB9 < 0 ? 'red' : Colors.Black  }}>${rounds2[index].BetD_MontoB9} <Text style={{ fontWeight: 'bold', color:Colors.Black }}>B9:</Text></Text>
                                      <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                          {
                                              rounds2[index].b9Presses.map((item, index) => {
                                                  switch (item.replace(' ','')) {
                                                      case '':
                                                          return <Text key={'snb9' + index}>_</Text>;
                                                      case '0':
                                                          return <Text key={'snb9' + index}>=</Text>;
                                                      default:
                                                          return <Text key={'snb9' + index} style={{ color: item < 0 ? Colors.Primary : Colors.Black }}>{item}</Text>;
                                                  }
                                              })
                                          }
                                      </View>
                                      <Text style={{ marginRight: 0, color: rounds2[index].BetD_MontoCalculoB9 < 0 ? 'red' : Colors.Black }}>${rounds2[index].BetD_MontoCalculoB9}</Text>
                                      <View style={{ width: 30, alignItems: 'flex-end' }}>
                                          <Text style={{ color: Colors.Primary, fontWeight: 'bold', fontSize: 12 }}>{/*rounds2[index].BetD_AutoPress ? `${rounds2[index].BetD_AutoPress}P` : ''*/}</Text>
                                      </View>
                                  </View>
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                      <Text style={{ fontSize: 14, textDecorationLine: rounds2[index].BetD_CarryCalculado !=0 ? 'line-through' : 'none', color: rounds2[index].BetD_MachMonto < 0 ? 'red' : Colors.Black   }}>${rounds2[index].BetD_MachMonto} <Text
                                          style={{
                                              textDecorationLine: rounds2[index].BetD_CarryCalculado !=0 ? 'line-through' : 'none',
                                              fontWeight: 'bold',
                                              color: rounds2[index].BetD_MachInt <0 || rounds2[index].BetD_CarryCalculado !=0 ? Colors.Primary : Colors.Black
                                          }}>
                                          Match = {rounds2[index].BetD_CarryCalculado !=0 ? 0 : rounds2[index].BetD_MachInt}
                                      </Text></Text>
                                      {rounds2[index].BetD_CarryCalculado !=0 && <Text style={{ fontSize: 10, color: Colors.Primary, alignSelf: 'center' }}>Carry・ON</Text>}
                                      <Text style={{ fontSize: 14, fontWeight: 'bold', color: rounds2[index].BetD_MontoApuestaMedal < 0 ? Colors.Primary : Colors.Black }}>${rounds2[index].BetD_MontoApuestaMedal} <Text style={{ fontSize: 14, fontWeight: 'bold', color: rounds2[index].BetD_MedalInt < 0 ? Colors.Primary : Colors.Black }}>Medal = {rounds2[index].BetD_MedalInt}</Text></Text>
                                  </View>
                              </View>
                          </View>
                        </Ripple>}
                            </View>
                      </View>
                      }
                keyExtractor={item=>item.id.toString()}
              //onSwipeValueChange={this.onSwipeValueChange}
            />
        </View>:
      <View style={{ flex: 0.5, margin:10 }}>
        <Spinner
            visible={carga}
            color={Colors.Primary} />

          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  ListadoBets()
                  setValue1('')
                  setValue2('')
                  setValue3('')
                  setValue4('')
                }}
              />
            }
            data={rounds3}
            renderItem={({item, index}) =>
                <View style={{flexDirection:'row'}}>
                {subebaja && <View style={{ flexDirection: 'column', justifyContent: "center"}}>
                <TouchableOpacity style={{padding:0}} onPress={()=> subeTN(index)}>
                    <Entypo name={'chevron-small-up'} size={25} color={Colors.Primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding:0}} onPress={()=> bajaTN(index)}>
                    <Entypo name={'chevron-small-down'} size={25} color={Colors.Primary} />
                  </TouchableOpacity>
              </View>}
                <View style={styles.betIndexView}>
                  <Text style={styles.betIndexText}>{rounds3[index].ConsecutivosApuesta}</Text>
                </View>
                    <View style={{flex:0.95,padding:0,paddingHorizontal:0}}>
                        {/*!collapsed3[index]&&*/<Ripple
                          rippleColor={Colors.Secondary}
                          onPress={()=>showSheetViewTN(item, index)}
                        >
                          <View style={{ flex: 1, margin:0 }}>
                            <View style={styles.betGeneralInfoView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.advInfo, { color: rounds3[index].BetD_AdvStrokers < 0 ? 'red' : Colors.Black }]}>[{rounds3[index].BetD_AdvStrokers}] </Text>
                                    {item.BetD_Player1==item.BetD_Player3 && item.BetD_Player2!=item.BetD_Player4 && <Text style={styles.vsInfo}> {rounds3[index].Player1} {rounds3[index].Player3} vs {rounds3[index].Player2} {rounds3[index].Player4}</Text>}
                                    {item.BetD_Player1!=item.BetD_Player3 && item.BetD_Player2!=item.BetD_Player4 && <Text style={styles.vsInfo}> {rounds3[index].Player1} {rounds3[index].Player3} vs {rounds3[index].Player2} {rounds3[index].Player4}</Text>}
                                    {item.BetD_Player2==item.BetD_Player4 && item.BetD_Player1!=item.BetD_Player3 && <Text style={styles.vsInfo}> {rounds3[index].Player1} {rounds3[index].Player3} vs {rounds3[index].Player2} {rounds3[index].Player4}</Text>}
                                    {item.BetD_Player1==item.BetD_Player3 && item.BetD_Player2==item.BetD_Player4 && <Text style={styles.vsInfo}> {rounds3[index].Player1} {rounds3[index].Player3} vs {rounds3[index].Player2} {rounds3[index].Player4}</Text>}
                                </View>
                                <Text style={[styles.profitText, { color: rounds3[index].BetD_MontoPerdidoGanado < 0 ? Colors.Primary : rounds3[index].BetD_MontoPerdidoGanado > 1 ? 'green' : Colors.Black }]}>${rounds3[index].BetD_MontoPerdidoGanado}</Text>
                            </View>
                            <View style={styles.betInfoView}>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ marginRight: 10, color: rounds3[index].BetD_MontoF9 < 0 ? 'red' : Colors.Black }}>${rounds3[index].BetD_MontoF9} <Text style={{ fontWeight: 'bold', color:Colors.Black }}>F9:</Text></Text>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                        {
                                            rounds3[index].f9Presses.map((item, index) => {
                                                switch (item.replace(' ','')) {
                                                    case '':
                                                        return <Text key={'snf9' + index}>_</Text>;
                                                    case '0':
                                                        return <Text key={'snf9' + index}>=</Text>;
                                                    default:
                                                        return <Text key={'snf9' + index} style={{ color: item < 0 ? Colors.Primary : Colors.Black }}>{item}</Text>;
                                                }
                                            })
                                        }
                                    </View>
                                    <Text style={{ marginRight: 0, color: rounds3[index].BetD_MontoCalculoF9 < 0 ? 'red' : Colors.Black }}>${rounds3[index].BetD_MontoCalculoF9}</Text>
                                    <View style={{ width: 30 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ marginRight: 10, color: rounds3[index].BetD_MontoB9 < 0 ? 'red' : Colors.Black  }}>${rounds3[index].BetD_MontoB9} <Text style={{ fontWeight: 'bold', color:Colors.Black }}>B9:</Text></Text>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                        {
                                            rounds3[index].b9Presses.map((item, index) => {
                                                switch (item.replace(' ','')) {
                                                    case '':
                                                        return <Text key={'snb9' + index}>_</Text>;
                                                    case '0':
                                                        return <Text key={'snb9' + index}>=</Text>;
                                                    default:
                                                        return <Text key={'snb9' + index} style={{ color: item < 0 ? Colors.Primary : Colors.Black }}>{item}</Text>;
                                                }
                                            })
                                        }
                                    </View>
                                    <Text style={{ marginRight: 0, color: rounds3[index].BetD_MontoCalculoB9 < 0 ? 'red' : Colors.Black }}>${rounds3[index].BetD_MontoCalculoB9}</Text>
                                    <View style={{ width: 30, alignItems: 'flex-end' }}>
                                        <Text style={{ color: Colors.Primary, fontWeight: 'bold', fontSize: 12 }}>{/*rounds3[index].BetD_AutoPress ? `${rounds3[index].BetD_AutoPress}P` : ''*/}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ textDecorationLine: rounds3[index].BetD_CarryCalculado !=0 ? 'line-through' : 'none', color: rounds3[index].BetD_MachMonto < 0 ? 'red' : Colors.Black   }}>${rounds3[index].BetD_MachMonto} <Text
                                        style={{
                                            textDecorationLine: rounds3[index].BetD_CarryCalculado !=0 ? 'line-through' : 'none',
                                            fontWeight: 'bold',
                                            color: rounds3[index].BetD_MachInt && rounds3[index].BetD_CarryCalculado !=0 ? Colors.Primary : Colors.Black
                                        }}>
                                        Match = {rounds3[index].BetD_CarryCalculado !=0 ? 0 : rounds3[index].BetD_MachInt}
                                    </Text></Text>
                                    {rounds3[index].BetD_CarryCalculado !=0 && <Text style={{ fontSize: 10, color: Colors.Primary, alignSelf: 'center' }}>Carry・ON</Text>}
                                    <Text style={{ fontWeight: 'bold', color: rounds3[index].BetD_MontoApuestaMedal < 0 ? Colors.Primary : Colors.Black }}>${rounds3[index].BetD_MontoApuestaMedal} <Text style={{ fontWeight: 'bold', color: rounds3[index].BetD_MedalInt < 0 ? Colors.Primary : Colors.Black }}>Medal = {rounds3[index].BetD_MedalInt}</Text></Text>
                                </View>
                            </View>
                        </View>
                      </Ripple>}
                          </View>
                    </View>
                    }
              keyExtractor={item=>item.id.toString()}
              stopLeftSwipe={Dimensions.get('window').width * .5}
              stopRightSwipe={-(Dimensions.get('window').width * .5)}
              //onSwipeValueChange={this.onSwipeValueChange}
          />
      </View>
                          :null}
                    </View>
              }
              keyExtractor={item=>item.id.toString()}
              ListEmptyComponent={
              <ListEmptyComponent
                text={Dictionary.emptyBets[language]}
                iconName="money-bill-alt"
                iconFamily='font-awesome'
              />
            }
            //onSwipeValueChange={this.onSwipeValueChange}
          />
        </ScrollView>
      </View>
    );
}

