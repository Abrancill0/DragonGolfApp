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
import { ListadoDetalleApuesta, CalcularApuesta } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [IDRound, setIDRound] = useState(route.route.params.IDRound);
    const [IDBet, setIDBet] = useState(route.route.params.IDBet);
    const [rounds, setRounds] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
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
        ListadoRondas();
          });

        return unsubscribe;
      }, [rounds]);
    

  async function ListadoRondas() {
                setStatus(true)
    let language = await AsyncStorage.getItem('language')
    setLanguage(language)
    ListadoDetalleApuesta(IDRound,IDBet)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDBetDetail,
                      fecha: moment(item.Bet_FechaCreacion).format('DD/MM/YYYY').toString(),
                      Player1: item.Player1,
                      Player2: item.Player2,
                      BetD_AdvStrokers: item.BetD_AdvStrokers,
                      BetD_AutoPress: item.BetD_AutoPress,
                      BetD_MontoF9: item.BetD_MontoCalculoF9,
                      BetD_MontoB9: item.BetD_MontoB9,
                      BetD_Medal: item.BetD_Medal,
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
                      BetD_B9_9: item.BetD_B9_9
                    }
                ))
                setRounds(list.reverse())
                setArrayholder(list)
                setStatus(false)
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

  async function muestraRonda(IDRound, IDBet, IDBetDetail){
    CalcularApuesta(IDRound, IDBet, IDBetDetail)
        .then((res) => {
          console.warn(IDRound)
          console.warn(IDBet)
          console.warn(IDBetDetail)
          console.warn(res)
        })
        ListadoRondas()
        navigation.navigate("SNBetListComponent",{IDBet:IDBet, IDRound:IDRound, bets:rounds, language:language})
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
                    ListadoRounds()
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
            <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> navigation.goBack()}>
              <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
          <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>SINGLE NASSAU{/*bets[language]*/}</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{margin:20, marginTop:40, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('SNBetView',{IDBet:IDBet, IDRound:IDRound})}>
              <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>
        { visible &&
          <ScrollView>

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
                  ListadoRondas()
                  setValue1('')
                  setValue2('')
                  setValue3('')
                  setValue4('')
                }}
              />
            }
            data={rounds}
            renderItem={({item}) =>
                    <View style={{flex:.2,padding:5}}>
                        <ScrollView
                          horizontal={false}
                          showsHorizontalScrollIndicator={false}>
                          <TouchableOpacity activeOpacity={0} onPress={()=> muestraRonda(IDRound,IDBet, item.id)}>
                            <View style={{width: ScreenWidth, flexDirection:'row',height:70,backgroundColor:'#f1f2f2',marginVertical:10, marginHorizontal:10}}>
                              <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                                <View style={{flex:.85}}>
                                  <View style={{flex:.6,justifyContent:'center',paddingHorizontal:10}}>
                                    {/*<Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{date[language]+ item.fecha}</Text>*/}
                                    <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.Player1 + ' VS '+ item.Player2}</Text>
                                    {/*<Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',fontWeight:'bold'}}>{round[language]+': '+ item.nombreRonda}</Text>*/}
                                    {/*<Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Handicap Autoajustable: '+ item.handicap + '%'}</Text>
                                    <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Hoyo inicial: '+item.hole}</Text>*/}
                                  </View>
                                </View>
                              {/*<View style={{flex:.2,padding:5}}>
                              <View style={{flex:.5}}>
                                    <Fontisto name={item.tipo=='Copia'?'cloud-down':'cloud-up'} size={30} color={Colors.Primary} />
                              </View>
                            </View>*/}
                              </View>
                          </TouchableOpacity>
                          {/*<View style={{flexDirection:'row', backgroundColor: 'red',height: 70, alignItems: 'center', justifyContent: 'center' }}>
                          <TouchableOpacity activeOpacity={0} style={{flex:.2,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('EditCourse', {IDCourse: item.id, Nombre: item.nombre, NombreCorto: item.nombreCorto, Ciudad: item.ciudad, Pais: item.pais})}>
                            <FontAwesome name={'edit'} size={30} color={Colors.White} />
                          </TouchableOpacity>
                          <TouchableOpacity style={{flex:.2,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id, item.tipo)}>
                            <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
                          </TouchableOpacity>
                          </View>*/}
                          </ScrollView>
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

