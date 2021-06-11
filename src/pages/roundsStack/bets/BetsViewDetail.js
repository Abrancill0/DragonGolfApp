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
import { ListadoDetalleApuesta, CalcularApuesta, EliminarApuesta } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import styles from './styles';

export default function RoundsView(props) {

    const navigation = useNavigation();
    const [IDRound, setIDRound] = useState(props.IDRound);
    const [IDBet, setIDBet] = useState(props.IDBet);
    const [rounds, setRounds] = useState(props.rounds2);
    const [arrayholder, setArrayholder] = useState([]);
    let collapsedArray3 = props.collapsedArrayD;
    const [collapsed3, setCollapsed3] = useState(props.collapsedD);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [language, setLanguage] = useState(props.language);
    const [search, setSearch] = useState(false);
    const [visible, setVisible] = useState(true);
    const [carga, setStatus] = useState(false);
    const [carry, setcarry] = useState(false);
    const [dataInState, setDataInState] = useState([]);
    const ScreenWidth = Dimensions.get("window").width;
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
        ListadoRondas2(1);
          });

        return unsubscribe;
      }, [rounds]);
    

  async function ListadoRondas2(tipo, index) {
    if(tipo==1){
      setStatus(true)
    }
    let IDUsuario = await AsyncStorage.getItem('usu_id')
    console.warn(IDUsuario)
    console.warn('IDUsuario')
    ListadoDetalleApuesta(IDRound,IDBet, IDUsuario)
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
                      BetD_Carry: item.BetD_Carry,
                      BetD_CarryCalculado: item.BetD_CarryCalculado,
                      BetD_MontoApuestaMedal: item.BetD_MontoApuestaMedal,
                      BetD_MedalInt: item.BetD_MedalInt,
                      BetD_MachInt: item.BetD_MachInt,
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
                if(tipo==2){
                  setRounds(list)
                  setArrayholder(list)
                  console.warn(rounds[index].BetD_MontoCalculoF9)
                  for (var i = 0; i<=list.length - 1; i++) {
                    if(index==i){
                      collapsedArray3[index]=(!collapsed3[index])
                    }
                    /*else{
                      collapsedArray3[i]=true
                    }*/
                  }
                  setCollapsed3(collapsedArray3)
                  setStatus(false)
                }
                else if(tipo == 3){
                  setRounds(list)
                  setArrayholder(list)
                  /*for (var i = 0; i<=list.length - 1; i++) {
                    if(index==i){
                      collapsedArray3[index]=true
                    }
                    else{
                      collapsedArray3[i]=true
                    }
                  }
                  setCollapsed3(collapsedArray3)*/
                  setStatus(false)
                }
                else{
                  setRounds(list)
                  for (var i = 0; i<=list.length - 1; i++) {
                    collapsedArray3.push(true)
                  }
                  setCollapsed3(collapsedArray3)
                  setArrayholder(list)
                  setStatus(false)
                }
            }
            else{
              setRounds([])
              setStatus(false)
            }
        })
  }

  function searchFilterFunction(text,busqueda){

    const newData = arrayholder.filter(item => {
    let itemData = ""
    switch(busqueda){
      case 1:
        setValue1(text) 
        itemData = `${item.Player1} ${item.Player1.toUpperCase()}`;
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
    setRounds(newData)
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

  async function muestraRonda2(IDRound, IDBet, IDBetDetail, index){
    CalcularApuesta(IDRound, IDBet, IDBetDetail)
        .then((res) => {
          console.warn(index)
          ListadoRondas2(2,index)
          /*console.warn(IDBet)
          console.warn(IDBetDetail)
          console.warn(res)*/
        })
        //navigation.navigate("SNBetListComponent",{IDBet:IDBet, IDRound:IDRound, bets:rounds, language:language, IDBetDetail:IDBetDetail, index:index})
    /*
    navigation.navigate("RoundTab", { screen: 'Settings', params: {IDCourse:IDCourse, IDRound:IDRound} })
    AsyncStorage.setItem('IDRound', IDRound.toString());*/
  }

  async function infoRonda(IDRound,IDBet,BetD_MontoF9,BetD_MontoB9,BetD_Medal,BetD_Carry,BetD_Match, BetD_AdvStrokers){
    navigation.navigate('SNBetViewInfo',{IDBet:IDBet, IDRound:IDRound, BetD_MontoF9:BetD_MontoF9, BetD_MontoB9:BetD_MontoB9, BetD_Medal:BetD_Medal, BetD_Carry:BetD_Carry, BetD_Match:BetD_Match, BetD_AdvStrokers:BetD_AdvStrokers})
    console.warn('hola')
    //ListadoRondas2()
    //navigation.navigate("SNBetListComponent",{IDBet:IDBet, IDRound:IDRound, bets:rounds, language:language, IDBetDetail:IDBetDetail, index:index})
  }


  async function Elimina(id, index){
    console.warn(id)
    EliminarApuesta(id)
      .then((res) => {
        console.warn(res)
        if(res.estatus == 1){
          ListadoRondas2(3, index)
        }
      })
  }

  function showSheetView(item,index){
    muestraRonda2(IDRound,IDBet, item.id, index)
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
                    if (index2 !== 3) doAction(index,index2, item);
                },
            );
        } else {
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

    function sube(index){
      console.warn(rounds)
      let aux;
      if(index!=0){
        aux = rounds[index]
        rounds[index]=rounds[index-1]
        rounds[index-1]=aux
        setDataInState([...dataInState, rounds])
      }
      console.warn(rounds)
      console.warn(index)
    }
    function baja(index){
      console.warn(rounds)
      let aux;
      if(index!=rounds.length-1){
        aux = rounds[index]
        rounds[index]=rounds[index+1]
        rounds[index+1]=aux
        setDataInState([...dataInState, rounds])
      }
      console.warn(rounds)
      console.warn(index)
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
                navigation.navigate('SNBetViewEdit',{IDBet:IDBet, IDRound:IDRound, IDBetDetail: item.id, BetD_MontoF9:item.BetD_MontoF9, BetD_MontoB9:item.BetD_MontoB9, BetD_Medal:item.BetD_Medal, BetD_Carry:item.BetD_Carry, BetD_Match:item.BetD_Match, BetD_AdvStrokers:item.BetD_AdvStrokers, Player1:item.BetD_Player1, Player2:item.BetD_Player2, BetD_AutoPress:item.BetD_AutoPress})
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
        
        { visible &&
          <ScrollView contentContainerStyle={{paddingBottom:10}}>

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
      {/*<SearchBar
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
      />*/}
      </View>}
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  ListadoRondas2(1)
                  setValue1('')
                  setValue2('')
                  setValue3('')
                  setValue4('')
                }}
              />
            }
            data={rounds}
            renderItem={({item, index}) =>
              <View style={{flexDirection:'row'}}>
              <View style={{ flexDirection: 'column', justifyContent: "center"}}>
                <TouchableOpacity style={{padding:0}} onPress={()=> sube(index)}>
                    <Entypo name={'chevron-small-up'} size={25} color={Colors.Primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding:0}} onPress={()=> baja(index)}>
                    <Entypo name={'chevron-small-down'} size={25} color={Colors.Primary} />
                  </TouchableOpacity>
              </View>
                <View style={styles.betIndexView}>
                  <Text style={styles.betIndexText}>{rounds[index].ConsecutivosApuesta}</Text>
                </View>
                    <View style={{flex:0.95,padding:0,paddingHorizontal:0}}
                          horizontal={false}
                          showsHorizontalScrollIndicator={false}>
                          {/*<TouchableOpacity activeOpacity={0} onPress={()=> muestraRonda2(IDRound,IDBet, item.id, index)} onLongPress={()=> infoRonda(IDRound,IDBet, item.BetD_MontoF9, item.BetD_MontoB9, item.BetD_Medal, item.BetD_Carry, item.BetD_Match, item.BetD_AdvStrokers)}>
                            <View style={{width: ScreenWidth, flexDirection:'row',height:25,backgroundColor:'#f1f2f2',marginVertical:10, marginHorizontal:10}}>
                              <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                                <View style={{flex:.65}}>
                                  <View style={{flex:.6,justifyContent:'center',paddingHorizontal:10}}>
                                    {/*<Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{date[language]+ item.fecha}</Text>*/}
                                    {/*<Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.Player1 + ' VS '+ item.Player2}</Text>
                                    {/*<Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',fontWeight:'bold'}}>{round[language]+': '+ item.nombreRonda}</Text>*/}
                                    {/*<Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Handicap Autoajustable: '+ item.handicap + '%'}</Text>
                                    <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Hoyo inicial: '+item.hole}</Text>*/}
                                  {/*</View>
                                </View>
                              {/*<View style={{flex:.2,padding:5}}>
                              <View style={{flex:.5}}>
                                    <Fontisto name={item.tipo=='Copia'?'cloud-down':'cloud-up'} size={30} color={Colors.Primary} />
                              </View>
                            </View>*/}
                              {/*</View>
                          </TouchableOpacity>*/}
                        {/*!collapsed3[index]&&*/<Ripple
                          rippleColor={Colors.Secondary}
                          onPress={()=>showSheetView(item, index)}
                        >
                          <View style={{ flex: 1, margin:0 }}>
                            <View style={styles.betGeneralInfoView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.advInfo, { color: rounds[index].BetD_AdvStrokers < 0 ? 'red' : Colors.Black }]}>[{rounds[index].BetD_AdvStrokers}] </Text>
                                    <Text style={styles.vsInfo}> {rounds[index].Player1} vs {rounds[index].Player2}</Text>
                                </View>
                                <Text style={[styles.profitText, { color: rounds[index].BetD_MontoPerdidoGanado < 0 ? Colors.Primary : rounds[index].BetD_MontoPerdidoGanado > 1 ? 'green' : Colors.Black }]}>${rounds[index].BetD_MontoPerdidoGanado}</Text>
                            </View>
                            <View style={styles.betInfoView}>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ marginRight: 10, color: rounds[index].BetD_MontoCalculoF9 < 0 ? 'red' : Colors.Black }}>${rounds[index].BetD_MontoCalculoF9} <Text style={{ fontWeight: 'bold', color:Colors.Black }}>F9:</Text></Text>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                        {
                                            rounds[index].f9Presses.map((item, index) => {
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
                                    <View style={{ width: 30 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ marginRight: 10, color: rounds[index].BetD_MontoCalculoB9 < 0 ? 'red' : Colors.Black  }}>${rounds[index].BetD_MontoCalculoB9} <Text style={{ fontWeight: 'bold', color:Colors.Black }}>B9:</Text></Text>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                        {
                                            rounds[index].b9Presses.map((item, index) => {
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
                                    <View style={{ width: 30, alignItems: 'flex-end' }}>
                                        <Text style={{ color: Colors.Primary, fontWeight: 'bold', fontSize: 12 }}>{/*rounds[index].BetD_AutoPress ? `${rounds[index].BetD_AutoPress}P` : ''*/}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 14, textDecorationLine: rounds[index].BetD_CarryCalculado !=0 ? 'line-through' : 'none', color: rounds[index].BetD_MachMonto < 0 ? 'red' : Colors.Black   }}>${rounds[index].BetD_MachMonto} <Text
                                        style={{
                                            textDecorationLine: rounds[index].BetD_CarryCalculado !=0 ? 'line-through' : 'none',
                                            fontWeight: 'bold',
                                            color: rounds[index].BetD_MachInt <0 || rounds[index].BetD_CarryCalculado !=0 ? Colors.Primary : Colors.Black
                                        }}>
                                        Match = {rounds[index].BetD_CarryCalculado !=0 ? 0 : rounds[index].BetD_MachInt}
                                    </Text></Text>
                                    {rounds[index].BetD_CarryCalculado !=0 && <Text style={{ fontSize: 10, color: Colors.Primary, alignSelf: 'center' }}>Carry・ON</Text>}
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: rounds[index].BetD_MontoApuestaMedal < 0 ? Colors.Primary : Colors.Black }}>${rounds[index].BetD_MontoApuestaMedal} <Text style={{ fontSize: 14, fontWeight: 'bold', color: rounds[index].BetD_MedalInt < 0 ? Colors.Primary : Colors.Black }}>Medal = {rounds[index].BetD_MedalInt}</Text></Text>
                                </View>
                            </View>
                            {/*<View style={[styles.bottomButtom,{flex:0.1, margin:10}]}>
                              <DragonButton title={Dictionary.update[language]} onPress={()=> this.finalizar()} />
                            </View>*/}
                        </View>
                          {/*<View style={{flexDirection:'row', backgroundColor: 'red',height: 70, alignItems: 'center', justifyContent: 'center' }}>
                          <TouchableOpacity activeOpacity={0} style={{flex:.2,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('EditCourse', {IDCourse: item.id, Nombre: item.nombre, NombreCorto: item.nombreCorto, Ciudad: item.ciudad, Pais: item.pais})}>
                            <FontAwesome name={'edit'} size={30} color={Colors.White} />
                          </TouchableOpacity>
                          <TouchableOpacity style={{flex:.2,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id, item.tipo)}>
                            <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
                          </TouchableOpacity>
                          </View>*/}
                      </Ripple>}
                          </View>
                    </View>
              }
              keyExtractor={item=>item.id}
              //ListHeaderComponent={renderHeader}
              /*ListEmptyComponent={
              <ListEmptyComponent
                text={Dictionary.emptyBets[language]}
                iconName="money-bill-alt"
                iconFamily='font-awesome'
              />
            }*/
            stopLeftSwipe={Dimensions.get('window').width * .5}
            stopRightSwipe={-(Dimensions.get('window').width * .5)}
            //onSwipeValueChange={this.onSwipeValueChange}
          />
        
      </ScrollView>}

      </View>
    );
}

