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
  ScrollView
} from 'react-native';
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
import { ListaApuesta, ListadoDetalleApuesta, ListadoDetalleApuestaTeam } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import Collapsible2 from 'react-native-collapsible';
import BetsViewDetail from './BetsViewDetail';
import BetsViewDetailTN from './BetsViewDetailTN';

export default function betsView(route) {

    const navigation = useNavigation();
    const [rounds2, setRounds2] = useState([]);
    const [rounds3, setRounds3] = useState([]);
    const [bets2, setbets2] = useState([]);
    const [collapsedArray, setCollapsedArray] = useState([]);
    const [collapsed, setCollapsed] = useState([]);
    let collapsedArray2 = [false,false];
    const [collapsed2, setCollapsed2] = useState([false,false]);
    const [arrayholder, setArrayholder] = useState([]);
    const [IDRound, setIDRound] = useState(0);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [language, setLanguage] = useState('');
    const [search, setSearch] = useState(false);
    const [visible, setVisible] = useState(true);
    const [carga, setStatus] = useState(false);
    const ScreenWidth = Dimensions.get("window").width;
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
          ListadoBets();
          });

        return unsubscribe;
      }, [bets2]);
    

  async function ListadoBets() {
    collapsedArray2[0]=false
    collapsedArray2[1]=false
    setCollapsed2(collapsedArray2)
    setCollapsed([])
    setCollapsedArray([])
                setStatus(true)
    let language = await AsyncStorage.getItem('language')
    let IDRound = await AsyncStorage.getItem('IDRound')
    muestraRonda(1,IDRound)
    muestraRonda(2,IDRound)
    setLanguage(language)
    setIDRound(IDRound)
    ListaApuesta()
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDBet,
                      nombre: item.Bet_Nombre,
                      fecha: moment(item.Bet_FechaCreacion).format('DD/MM/YYYY').toString()
                    }
                ))
                setbets2(list.reverse())
                /*for (var i = 0; i<=list.length - 1; i++) {
                    collapsedArray2.push(false)
                  }*/
                  //setCollapsed2(collapsedArray2)
                setArrayholder(list)
                setStatus(false)
            }
            else{
              setbets2([])
              setStatus(false)
            }
        })
  }

  async function ListadoRondas(IDBet,IDRound) {
    let language = await AsyncStorage.getItem('language')
    let IDUsuario = await AsyncStorage.getItem('usu_id')
    console.warn(IDBet)
    console.warn('IDUsuario')
    setLanguage(language)
    if(IDBet == 1){
    setRounds2([])
    ListadoDetalleApuesta(IDRound,1, IDUsuario)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      ConsecutivosApuesta: item.ConsecutivosApuesta,
                      id: item.IDBetDetail,
                      fecha: moment(item.Bet_FechaCreacion).format('DD/MM/YYYY').toString(),
                      Player1: item.Player1,
                      Player2: item.Player2,
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
                  setCollapsed([])
                  setCollapsedArray([])
                  for (var i = 0; i<=list.length - 1; i++) {
                    collapsedArray.push(true)
                  }
                  console.warn(collapsedArray.length)
                  setCollapsedArray(collapsedArray)
                  setCollapsed(collapsedArray)
                  setArrayholder(list)
                  //if(IDBet == 1){
                    collapsedArray2[0]=(!collapsed2[0])
                    collapsedArray2[1]=(collapsed2[1])
                    //collapsedArray2[2]=(true)
                    setCollapsed2(collapsedArray2)
                    //navigation.navigate("BetsViewDetail",{IDBet:IDBet, IDRound:IDRound})
                  //}
                  setStatus(false)
            }
            else{
              //if(IDBet == 1){
                collapsedArray2[0]=(!collapsed2[0])
                    collapsedArray2[1]=(collapsed2[1])
                //collapsedArray2[2]=(true)
                setCollapsed2(collapsedArray2)
                //navigation.navigate("BetsViewDetail",{IDBet:IDBet, IDRound:IDRound})
              //}
              setCollapsed2(collapsedArray2)
              setRounds2([])
              setStatus(false)
            }
          })
        }
        else{
          setRounds3([])
          ListadoDetalleApuestaTeam(IDRound,2, IDUsuario)
          .then((res) => {
            console.warn(res)
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
                    setCollapsed([])
                    setCollapsedArray([])
                    for (var i = 0; i<=list.length - 1; i++) {
                      collapsedArray.push(true)
                    }
                    console.warn(collapsedArray.length)
                    setCollapsedArray(collapsedArray)
                    setCollapsed(collapsedArray)
                    setArrayholder(list)
                    //if(IDBet == 1){
                      collapsedArray2[1]=(!collapsed2[1])
                      collapsedArray2[0]=(collapsed2[0])
                      //collapsedArray2[2]=(true)
                      setCollapsed2(collapsedArray2)
                      //navigation.navigate("BetsViewDetail",{IDBet:IDBet, IDRound:IDRound})
                    //}
                    setStatus(false)
              }
              else{
                //if(IDBet == 1){
                  collapsedArray2[1]=(!collapsed2[1])
                  collapsedArray2[0]=(collapsed2[0])
                  //collapsedArray2[2]=(true)
                  setCollapsed2(collapsedArray2)
                  //navigation.navigate("BetsViewDetail",{IDBet:IDBet, IDRound:IDRound})
                //}
                setCollapsed2(collapsedArray2)
                setRounds3([])
                setStatus(false)
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
        itemData = `${item.nombre} ${item.nombre.toUpperCase()}`;
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
    setbets2(newData)
  };

   function renderSeparator(){  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
                }}  
            />  
        );  
    };

    function renderHeader(){

    return (

      <View>

      <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:Colors.Primary,fontWeight:'bold', marginHorizontal:50}}>Buscar por: </Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent: "flex-end"}} onPress={()=> setSearch(!search)}>
              <Entypo name={search?'chevron-thin-up':'chevron-thin-down'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>

      {search && <View>
      <SearchBar
        placeholder="Nombre"
        onChangeText={(text) => searchFilterFunction(text,1)}
        autoCorrect={false}
        value={value1}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:0.5}}
      />
      <SearchBar
        placeholder="Nombre Corto"
        onChangeText={(text) => searchFilterFunction(text,2)}
        autoCorrect={false}
        value={value2}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:0.8}}
      />
      <SearchBar
        placeholder="Ciudad"
        lightTheme
        round
        onChangeText={(text) => searchFilterFunction(text,3)}
        autoCorrect={false}
        value={value3}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:1}}
      />
      <SearchBar
        placeholder="Pais"
        lightTheme
        round
        onChangeText={(text) => searchFilterFunction(text,4)}
        autoCorrect={false}
        value={value4}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:1,
        borderBottomWidth:2}}
      />
      </View>}
      </View>
    );
  };

  async function muestraRonda(IDBet,IDRound){
    ListadoRondas(IDBet,IDRound);
    /*console.warn(IDBet)
    //let IDRound = await AsyncStorage.getItem('IDRound')
    if(IDBet == 1){
      collapsedArray2[IDBet-1]=(!collapsed2[IDBet-1])
      //collapsedArray2[2]=(true)
      setCollapsed2(collapsedArray2)
      //navigation.navigate("BetsViewDetail",{IDBet:IDBet, IDRound:IDRound})
    }*/
    /*else{
      navigation.navigate("BetsViewDetailTN",{IDBet:IDBet, IDRound:IDRound})
    }*/
    /*
    navigation.navigate("RoundTab", { screen: 'Settings', params: {IDCourse:IDCourse, IDRound:IDRound} })
    AsyncStorage.setItem('IDRound', IDRound.toString());*/
  }


  async function Elimina(id, tipo){
    console.warn(tipo)
    let idUsu = await AsyncStorage.getItem('usu_id')
    Alert.alert(
      "DragonGolf",
      "¿Está seguro de eliminar este campo?",
      [
        {
          text: "Cancelar",
          style: 'cancel',
        },
        {
          text: "Continuar",
          onPress: () => {
            EliminarCampo(id, tipo, idUsu)
              .then((res) => {
                console.warn(res)
                  if(res.estatus == 1){
                    ListadoBets()
                  }
              })
          },
        },
      ],
      { cancelable: false }
    );
  }


    const {
      round,
      date,
      tipe,
      bets
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
          <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
          <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{bets[language]}</Text>
          </View>
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{margin:20, marginTop:40, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('SNBetView')}>
              <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
        </View>
        { visible &&
          <ScrollView contentContainerStyle={{paddingBottom:20}}>

      {/*<View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:Colors.Primary,fontWeight:'bold', marginHorizontal:50}}>Buscar por: </Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent: "flex-end"}} onPress={()=> setSearch(!search)}>
              <Entypo name={search?'chevron-thin-up':'chevron-thin-down'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>*/}

      {search && <View>
      <SearchBar
        placeholder="Nombre"
        onChangeText={(text) => searchFilterFunction(text,1)}
        autoCorrect={false}
        value={value1}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:0.5}}
      />
      <SearchBar
        placeholder="Nombre Corto"
        onChangeText={(text) => searchFilterFunction(text,2)}
        autoCorrect={false}
        value={value2}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:0.8}}
      />
      <SearchBar
        placeholder="Ciudad"
        lightTheme
        round
        onChangeText={(text) => searchFilterFunction(text,3)}
        autoCorrect={false}
        value={value3}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:1}}
      />
      <SearchBar
        placeholder="Pais"
        lightTheme
        round
        onChangeText={(text) => searchFilterFunction(text,4)}
        autoCorrect={false}
        value={value4}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:1,
        borderBottomWidth:2}}
      />
      </View>}
          <SwipeListView
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
                    <View style={{flex:.2,padding:5}}>
                        <View>
                          <TouchableOpacity activeOpacity={0} onPress={()=> muestraRonda(item.id,IDRound)}>
                            {item.id == 1 ?
                            <View style={{ flexDirection: 'row' }}>
                              <TouchableOpacity style={{ flex:0.2, justifyContent: 'flex-start', marginLeft:15 }} onPress={()=> muestraRonda(1,IDRound)}>
                                <Entypo name={collapsed2[0]?'chevron-thin-up':'chevron-thin-down'} size={30} color={Colors.Primary} />
                              </TouchableOpacity>
                              <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
                              <Text style={{ margin:0, marginTop:0, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>SINGLE NASSAU{/*bets[language]*/}</Text>
                              </View>
                              <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={{margin:0, marginTop:0, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('SNBetView',{IDBet:item.id, IDRound:IDRound})}>
                                  <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
                                </TouchableOpacity>
                              </View>
                            </View>:
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ flex:0.2, justifyContent: 'flex-start', marginLeft:15 }}>
                                <TouchableOpacity style={{ flex:0.2, justifyContent: 'flex-start' }} onPress={()=> muestraRonda(2,IDRound)}>
                                  <Entypo name={collapsed2[1]?'chevron-thin-up':'chevron-thin-down'} size={30} color={Colors.Primary} />
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
                            </View>}
                          </TouchableOpacity>
                          {collapsed2[item.id-1]? item.id == 1 ?
                            <BetsViewDetail rounds2={rounds2} collapsedD={collapsedArray} collapsedArrayD={collapsedArray} IDBet={item.id} IDRound={IDRound} language={language} />:
                            <BetsViewDetailTN rounds2={rounds3} collapsedD={collapsedArray} collapsedArrayD={collapsedArray} IDBet={item.id} IDRound={IDRound} language={language} />
                          :null}
                          {/*<View style={{flexDirection:'row', backgroundColor: 'red',height: 70, alignItems: 'center', justifyContent: 'center' }}>
                          <TouchableOpacity activeOpacity={0} style={{flex:.2,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('EditCourse', {IDCourse: item.id, Nombre: item.nombre, NombreCorto: item.nombreCorto, Ciudad: item.ciudad, Pais: item.pais})}>
                            <FontAwesome name={'edit'} size={30} color={Colors.White} />
                          </TouchableOpacity>
                          <TouchableOpacity style={{flex:.2,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id, item.tipo)}>
                            <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
                          </TouchableOpacity>
                          </View>*/}
                          </View>
                    </View>
              }
              keyExtractor={item=>item.id}
              //ListHeaderComponent={renderHeader}
              ListEmptyComponent={
              <ListEmptyComponent
                text={Dictionary.emptyBets[language]}
                iconName="money-bill-alt"
                iconFamily='font-awesome'
              />
            }
            stopLeftSwipe={Dimensions.get('window').width * .5}
            stopRightSwipe={-(Dimensions.get('window').width * .5)}
            //onSwipeValueChange={this.onSwipeValueChange}
          />
        
      </ScrollView>}

      </View>
    );
}

