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
  Image,
} from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements';
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
import { ListaAmigos, EliminarAmigosRonda, ListaInvitados, ListadoAmigosRonda2 } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import styles4 from './styles4';
import { showMessage } from "react-native-flash-message";
import DragonButton from '../../global/DragonButton';
import Spinner from 'react-native-loading-spinner-overlay';

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [IDCourse, setIDCourse] = useState(0);
    const [IDRound, setIDRound] = useState(0);
    const [players, setPlayers] = useState([]);
    const [UsuarioCreo, setUsuarioCreo] = useState(1);
    const [ValidaUsuarioCreo, setValidaUsuarioCreo] = useState(0);
    const [IDUsuarioCreo, setIDUsuarioCreo] = useState(0);
    const [arrayholder, setArrayholder] = useState([]);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [language, setLanguage] = useState('es');
    const ScreenWidth = Dimensions.get("window").width;
    const [search, setSearch] = useState(false);
    const [visible, setVisible] = useState(true);
    const [carga, setStatus] = useState(true);
    const buttons = ['Todos', 'Amigos', 'Invitados']
    const BlankProfile = require('../../../../assets/globals/blank-profile.png');
    const [selectedIndex, setSelectedIndex] = useState(0)
        useEffect(() => {
          ListadoTodos();
         const unsubscribe = navigation.addListener("focus", () => {
            ListadoTodos();
          });

        return unsubscribe;
      }, []);

  async function ListadoTodos() {
    let IDUsuarioCreo = await AsyncStorage.getItem('IDUsuarioCreo')
    let idUsu = await AsyncStorage.getItem('usu_id')
    let language = await AsyncStorage.getItem('language')
    let IDCourse = await AsyncStorage.getItem('IDCourse')
    let IDRound = await AsyncStorage.getItem('IDRound')
    setPlayers([])
    setIDUsuarioCreo(IDUsuarioCreo)
    setLanguage(language)
    setIDCourse(IDCourse)
    setIDRound(IDRound)
    console.warn(idUsu)
    console.warn(IDRound)
    ListadoAmigosRonda2(idUsu, IDRound)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      idUsu: item.IDUsuario,
                      id: item.PlayerId,
                      nickname: item.usu_nickname,
                      handicap: item.usu_handicapindex,
                      strokes: item.usu_golpesventaja,
                      tee: item.PlayerTee,
                      colorTee: item.Te_TeeColor,
                      handicapAuto: item.handicapAuto
                    }
                ))
                setPlayers(list)
                console.warn(res.Result[0].ValidaUsuarioCreo)
                setUsuarioCreo(res.Result[0].ValidaUsuarioCreo)
                setValidaUsuarioCreo(idUsu)
                setArrayholder(list)
                setStatus(false)
            }
            else{
              setPlayers([])
              setStatus(false)
            }
        })
  }

  function finalizar(){
    console.warn(players.length)
    if(players.length<2){
      showMessage({
        message: needTwoPlayers[language],
        type:'warning',
      });
    }
    else{
      Alert.alert(
        "DragonGolf",
        exitRound[language],
        [
          {
            text: cancel[language],
            onPress: () => {
            },
          },
          {
            text: continuar[language],
            onPress: () => {
              navigation.navigate('RoundsStack')
            },
          }
        ],
        { cancelable: true }
      );
    }
  }
    

  async function ListadoJugadores() {
    let idUsu = await AsyncStorage.getItem('usu_id')
    ListaAmigos(idUsu)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDUsuario,
                      nombre: item.usu_nombre,
                      apellido: item.usu_apellido_paterno,
                      nickname: item.usu_nickname,
                      ghinnumber: item.usu_ghinnumber,
                      photo: item.usu_imagen,
                      handicap: item.usu_handicapindex
                    }
                ))
                setPlayers(list)
                setArrayholder(list)
            }
            else{
              setPlayers([])
            }
        })
  }

  async function ListadoInvitados() {
    let idUsu = await AsyncStorage.getItem('usu_id')
    ListaInvitados(idUsu)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDUsuario,
                      nombre: item.usu_nombre,
                      apellido: item.usu_apellido_paterno,
                      nickname: item.usu_nickname,
                      ghinnumber: item.usu_ghinnumber,
                      photo: item.usu_imagen,
                      handicap: item.usu_handicapindex
                    }
                ))
                setPlayers(list)
                setArrayholder(list)
            }
            else{
              setPlayers([])
              setArrayholder([])
            }
        })
  }

  function updateIndex(selectedIndex) {

    console.warn(selectedIndex)

    setSelectedIndex(selectedIndex)
    setValue1('')
    setValue2('')
    setValue3('')
    setValue4('')
    setSearch(false)

    if (selectedIndex == 0) {
      ListadoTodos()
    }

    if (selectedIndex == 1) {
      ListadoJugadores()
    }
    if (selectedIndex == 2) {
        ListadoInvitados()
    }
  }

  async function Elimina(PlayerId){
    Alert.alert(
      "DragonGolf",
      deletePlayer[language],
      [
        {
          text: cancel[language],
          onPress: () => {
          },
        },
        {
          text: continuar[language],
          onPress: () => {
            EliminarAmigosRonda(IDRound,PlayerId)
                .then((res) => {
                  console.warn(res)
                    if(res.estatus == 1){
                      showMessage({
                        message: deleted[language],
                        type:'success',
                      });
                      AsyncStorage.setItem('arreglo2', 'false');
                      ListadoTodos()
                    }
                })
          },
        }
      ],
      { cancelable: false }
    );
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
        itemData = `${item.apellido} ${item.apellido.toUpperCase()}`;
        break;
      case 3:
        setValue3(text) 
        itemData = `${item.nickname} ${item.nickname.toUpperCase()}`;
        break;
      case 4:
        setValue4(text) 
        itemData = `${item.ghinnumber} ${item.ghinnumber.toUpperCase()}`;
        break;
    }
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;

    });
    setPlayers(newData)
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

    function navegaStrokes(id,strokes,nickname){
      if(UsuarioCreo == 1){
        navigation.navigate("StrokesRoundView",{IDUsuarioCreo:IDUsuarioCreo,IDRound:IDRound,IDUsuario:id, strokes:strokes, Nickname:nickname})
      }
      else{
        if(ValidaUsuarioCreo == id){
          navigation.navigate("StrokesRoundView",{IDUsuarioCreo:IDUsuarioCreo,IDRound:IDRound,IDUsuario:id, strokes:strokes, Nickname:nickname})
        }
        else{
          showMessage({
            message: sinPermiso[language],
            type:'warning',
          });
        }
      }
    }

    function navegaTees(id){
      if(UsuarioCreo == 1){
        navigation.navigate('TeesViewRoundC', {IDCourse: IDCourse, IDRound:IDRound,PlayerID:id})
      }
      else{
        if(ValidaUsuarioCreo == id){
          navigation.navigate('TeesViewRoundC', {IDCourse: IDCourse, IDRound:IDRound,PlayerID:id})
        }
        else{
          showMessage({
            message: sinPermiso[language],
            type:'warning',
          });
        }
      }
    }

    const {
      emptyPlayerList,
      finish,
      FriendsinRound,
      exitRound,
      cancel,
      continuar,
      needTwoPlayers,
      deletePlayer,
      deleted,
      sinPermiso
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <Spinner
            visible={carga}
            color={Colors.Primary} />

        <View style={{flex:.1,flexDirection: 'row' ,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={{flex:.1}} onPress={()=> navigation.openDrawer()}>
            <MaterialIcon name={'menu'} size={25} color={Colors.Primary} />
          </TouchableOpacity>
          <View style={{ flex:0.8,alignItems:'center'}}>
                <Text style={{ fontSize: 16, fontFamily: 'BankGothic Lt BT', color:Colors.Primary,fontWeight:'bold'}}>{FriendsinRound[language]}</Text>
          </View>
          {
          UsuarioCreo==1 && 
          <TouchableOpacity style={{flex:.1, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('PlayersViewRoundsC', {IDCourse:IDCourse, IDRound:IDRound})}>
              <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
          </TouchableOpacity>
          }
        </View>
        {/*<ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              selectedButtonStyle={{backgroundColor:Colors.Primary}}
              containerStyle={{ height: 50 }}
            />

      <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:Colors.Primary,fontWeight:'bold', marginHorizontal:50}}>Buscar por: </Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent: "flex-end"}} onPress={()=> setSearch(!search)}>
              <Entypo name={search?'chevron-thin-up':'chevron-thin-down'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>}

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
        placeholder="Apellido"
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
        placeholder="Nickname"
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
        placeholder="Ghin"
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
        </View>*/}
      <View style={{flex:.9}}>
          <SwipeListView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  if(selectedIndex==0)
                    ListadoTodos()
                  if(selectedIndex==1)
                    ListadoJugadores()
                  if(selectedIndex==2)
                    ListadoInvitados()
                  setValue1('')
                  setValue2('')
                  setValue3('')
                  setValue4('')
                }}
              />
            }
            data={players}
            renderItem={({item}) =>
                  <View style={{flex:.2,padding:5}}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={0} onPress={()=> navegaStrokes(item.id,item.strokes,item.nickname)}>
                      <View style={{width: ScreenWidth,flexDirection:'row',height:70,backgroundColor:'#f1f2f2',marginHorizontal:10,marginVertical:10}}>
                        <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                          <TouchableOpacity onPress={()=> navegaTees(item.id)}><View style={{flex:1,backgroundColor:item.colorTee}}><Text style={{textAlign:'center'}}>Selec Tee</Text></View></TouchableOpacity>
                          <View style={{flex:1}}>
                            <View style={{flex:1, flexDirection:'row',paddingHorizontal:10}}>
                            <View style={{flex:.8,justifyContent:'center',paddingHorizontal:10}}>
                              <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',fontWeight:'bold'}}>{item.nickname}</Text>
                              <View style={[styles4.teeColorView,{flex:.2}]}>
                                <View style={[styles4.colorSquare, { backgroundColor: item.colorTee, marginVertical:2}]} />
                              </View>
                              <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b', marginLeft:20 }}>{item.tee}</Text>
                              <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'handicap: '+item.handicap}</Text>
                            </View>
                            <View style={{flex: 1, margin:20, marginTop:10, alignSelf:'center'}}>
                              {/*<TouchableOpacity style={{marginTop:10, alignSelf:'center'}} onPress={()=> navigation.navigate("StrokesRoundView",{IDRound:IDRound,IDUsuario:item.id, strokes:item.strokes, Nickname:item.nickname})}>
                                <MaterialIcon name={'info-outline'} size={27} color={Colors.Primary} />
                              </TouchableOpacity>*/ }
                              <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',marginTop:10, alignSelf:'flex-start'}}>{'Strokes: '+item.handicapAuto}</Text>
                              {/*<Image
                                source={item.photo ? { uri: 'http://13.90.32.51/DragonGolfBackEnd/images' + item.photo } : BlankProfile }
                                style={{
                                  alignSelf:'center',
                                  width: 60,
                                  height: 60,
                                  borderRadius: 30,
                                  marginHorizontal:30
                                }}
                              />*/}
                            </View>
                            </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                  <View style={{flexDirection:'row', backgroundColor: 'red',height: 90, alignItems: 'center', justifyContent: 'center' }}>
                    {UsuarioCreo == 1 && <TouchableOpacity style={{flex:.8,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id)}>
                      <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
                    </TouchableOpacity>}
                    {/*<TouchableOpacity style={{flex:.8,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('TeesViewRound', {IDCourse: IDCourse, IDRound:IDRound,PlayerID:item.id})}>
                      <FontAwesome name={'edit'} size={30} color={Colors.White} />
                    </TouchableOpacity>*/}
                  </View>
                </ScrollView>
              </View>
              }
              keyExtractor={item=>item.id}
              ListEmptyComponent={
              <View style={styles.emptyView}>
                  <FontAwesome5 name={"user-friends"} size={50} color="red" />
                <Text style={styles.emptyText}>{emptyPlayerList[language]}</Text>
              </View>
            }
            //stopLeftSwipe={Dimensions.get('window').width * .5}
            //stopRightSwipe={-(Dimensions.get('window').width * .5)}
            //onSwipeValueChange={this.onSwipeValueChange}
          />
        {/*<View style={[styles.bottomButtom,{flex:0.2, margin:10}]}>
          <DragonButton title={finish[language]} onPress={()=>finalizar()} />
        </View>*/}
      </View>
    </View>
    );
}

