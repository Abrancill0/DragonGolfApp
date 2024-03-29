import React, { useState, useEffect, useRef } from 'react';
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
  Button,
  TextInput,
  FlatList
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
import AsyncStorage from '@react-native-community/async-storage';
import { ListaAmigos, ActualizaStableFordStrokes, ListaInvitados, ListadoJugadoreStableFordStrokes } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import styles3 from './styles3';
import { showMessage } from "react-native-flash-message";
import DragonButton from '../../global/DragonButton';

export default function RoundsView(route) {

    //const refInput = useRef();
    const navigation = useNavigation();
    const [IDRound, setIDRound] = useState(route.route.params.IDRound);
    const [IDUsuario, setIDUsuario] = useState(0);
    const [IDUsuarioCreo, setIDUsuarioCreo] = useState(0);
    const [Nickname, setNickname] = useState('');
    const [players, setPlayers] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [signoMas] = useState(true);
    const [signoMenos] = useState(false);
    const [valorMenos, setValorMemos] = useState(false);
    const [strokesReg, setstrokesReg] = useState(0);
    const [strokesRegAbs, setStrokesRegAbs] = useState(Math.abs(route.route.params.strokes))
    const [language, setLanguage] = useState('es');
    const ScreenWidth = Dimensions.get("window").width;
    const [search, setSearch] = useState(false);
    const [visible, setVisible] = useState(true);
    const buttons = ['Todos', 'Amigos', 'Invitados']
    const BlankProfile = require('../../../../assets/globals/blank-profile.png');
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [dataInState, setDataInState] = useState([]);
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
            ListadoTodos();
            setSelectedIndex(0)
          });

        return unsubscribe;
      }, [navigation]);

  async function ListadoTodos() {
    let idUsu = await AsyncStorage.getItem('IDUsuarioCreo')
    let language = await AsyncStorage.getItem('language')
    setLanguage(language)
    setIDUsuarioCreo(idUsu)
    console.warn(idUsu)
    console.warn(IDRound)
    console.warn(IDUsuario)
    setPlayers([])
    ListadoJugadoreStableFordStrokes(IDRound)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      Player1Id: item.IDUsuario,
                      Player2Id: item.Player2Id,
                      RoundId: item.RoundId,
                      nickname: item.usu_nickname,
                      strokes: item.Strokes
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

  function finalizar(){
    navigation.goBack()
    /*Alert.alert(
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
    );*/
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
                      id: item.Player2Id,
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

  async function Elimina(Player1Id, Player2Id, strokes){
    console.warn('R: '+IDRound)
    console.warn('P1: '+Player1Id)
    console.warn('P2: '+Player2Id)
    console.warn('S: '+strokes)
    ActualizaStableFordStrokes(Player1Id, IDRound, strokes)
      .then((res) => {
        console.warn(res)
          if(res.estatus == 1){
            /*showMessage({
              message: successSaveTeeData[language],
              type:'success',
            });
            ListadoTodos()*/
          }
          else{
            showMessage({
              message: error[language],
              type:'danger',
            });
          }
      })
    /*Alert.alert(
      "DragonGolf",
      "¿Desea eliminar este jugador de su lista de amigos?",
      [
        {
          text: "Cancelar",
          onPress: () => {
          },
        },
        {
          text: "Eliminar",
          onPress: () => {
            ActualizaStableFordStrokes(IDUsuarioFav,idUsu)
                .then((res) => {
                  console.warn(res)
                    if(res.estatus == 1){
                      showMessage({
                        message: "Jugador eliminado correctamente",
                        type:'success',
                      });
                      ListadoJugadores()
                    }
                })
          },
        }
      ],
      { cancelable: false }
    );*/
  }

  async function Elimina2(Player1Id, Player2Id, strokes){
    const re = /^[+-]?[0-9]{1,9}(?:.[0-9]{1,2})?$/;
    if (strokes === "" || re.test(strokes)) {
      console.warn('R: '+IDRound)
      console.warn('P1: '+Player1Id)
      console.warn('P2: '+Player2Id)
      console.warn('S: '+strokes)
      ActualizaStableFordStrokes(Player1Id, IDRound, strokes)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
              /*showMessage({
                message: successSaveTeeData[language],
                type:'success',
              });
              ListadoTodos()*/
            }
            else{
              showMessage({
                message: error[language],
                type:'danger',
              });
            }
        })
    }
    else{
      console.warn('Incorrecto')
    }
    /*Alert.alert(
      "DragonGolf",
      "¿Desea eliminar este jugador de su lista de amigos?",
      [
        {
          text: "Cancelar",
          onPress: () => {
          },
        },
        {
          text: "Eliminar",
          onPress: () => {
            ActualizaStableFordStrokes(IDUsuarioFav,idUsu)
                .then((res) => {
                  console.warn(res)
                    if(res.estatus == 1){
                      showMessage({
                        message: "Jugador eliminado correctamente",
                        type:'success',
                      });
                      ListadoJugadores()
                    }
                })
          },
        }
      ],
      { cancelable: false }
    );*/
  }

  function checaEntero(text){
    console.warn('Entró')
    if(text.length == 1 && text == '-'){ return ''}
      else{
        let strokes = parseFloat(text)
        const re = /^[+-]?[0-9]{1,9}(?:[0-9]{1,2})?$/;
        let filteredData = text.split(".")
        console.warn(filteredData)
        if(filteredData[1]=='')
        {
          return text
        }
        if (strokes === "" || re.test(strokes)) {
          return strokes 
        }
        
        return '0' 
      }
  }

  function chechaStrokes(text){
    let filteredData = text.toString().split(".")
        console.warn(filteredData)
        if(filteredData[1]=='')
        {
          return 0
        }
    if(text.length == 1 && text == '-' || text == ''){ return 0}
      else{
        return text
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

    const {
      emptyPlayerList,
      tournaments,
      save,
      strokesPlayer,
      exitRound,
      cancel,
      continuar,
      strokes,
      error,
      successSaveTeeData
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> navigation.goBack()}>
              <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
          <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{strokesPlayer[language]}</Text>
        <Text style={{ fontSize: 16, fontFamily: 'BankGothic Lt BT', color:'#123c5b', alignSelf:'center',backgroundColor:'#f1f2f2',fontWeight:'bold'}}>{Nickname}</Text>
          </View>
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{margin:20, marginTop:40, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('PlayersViewRounds', {IDCourse:IDCourse, IDRound:IDRound})}>
              <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
        </View>
        { visible &&
          <ScrollView>

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
      </View>}
          <FlatList
            data={players}
            renderItem={({item}) =>
            <View style={{flex:.2,padding:5}}>
              <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}>
              <View /*activeOpacity={0} /*onPress={()=> navigation.navigate('TeesViewRound', {IDCourse: IDCourse, IDRound:IDRound,PlayerID:item.id})}*/>
                <View style={{width: ScreenWidth,flexDirection:'row',height:70,backgroundColor:'#f1f2f2',marginHorizontal:10,marginVertical:10}}>
                  <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                    <View style={{flex:0.8}}>
                      <View style={{flex:1, flexDirection:'row',paddingHorizontal:5}}>
                      <View style={{flex:1,justifyContent:'center',paddingHorizontal:5}}>
                        <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.nickname}</Text>
                        <View style={styles3.switchView}>
                          <Text style={styles3.question}>{strokes[language]}</Text>
                          
                          <View style={[{flexDirection:'row', justifyContent:'space-between'}]}>
                          <View style={{flex:0.2, alignSelf:'center', marginHorizontal:30}}>
                          <TouchableOpacity onPress={() => {item.strokes=chechaStrokes(item.strokes)-1>=0?item.strokes-1:item.strokes;setDataInState([...dataInState, players]);Elimina(item.Player1Id, item.Player2Id, item.strokes)}}>
                            <MaterialIcon name={'expand-more'} size={25} color={Colors.Primary} />
                          </TouchableOpacity>
                          </View>
                            {/*<Button
                              title={item.strokes.toString().substring(0,1)=='-'?'-':'+'}
                              onPress={() => {item.strokes=item.strokes*-1;setDataInState([...dataInState, players]);Elimina(item.RoundId, item.Player1Id, item.Player2Id, item.strokes)}}
                              color={Colors.Primary}
                            />*/}
                            <View style={{flex:0.2, alignSelf:'center', marginHorizontal:15}}>
                            <TextInput
                              ref={ref => item.id = ref}
                              //editable={false}
                              style={styles3.costInput}
                              selectionColor={Colors.Secondary}
                              placeholder="0"
                              keyboardType="numeric"
                              returnKeyType='done'
                              onChange={(change) => {console.warn(change.nativeEvent.text);item.strokes=checaEntero(change.nativeEvent.text);setDataInState([...dataInState, players]);Elimina2(item.Player1Id, item.Player2Id, item.strokes)}}
                              defaultValue={Math.abs(item.strokes).toString()}
                              value={Math.abs(item.strokes).toString()}
                              selectTextOnFocus={true}
                            />
                            </View>
                            <View style={{flex:1, alignSelf:'center', marginHorizontal:3}}>
                            <TouchableOpacity onPress={() => {item.strokes=chechaStrokes(item.strokes)+1;setDataInState([...dataInState, players]);Elimina(item.Player1Id, item.Player2Id, item.strokes)}}>
                              <MaterialIcon name={'expand-less'} size={25} color={Colors.Primary} />
                            </TouchableOpacity>
                          </View>
                          </View>
                        </View>
                        {/*<Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',fontWeight:'bold'}}>{item.nombre}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.apellido}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.ghinnumber}</Text>*/}
                      </View>
                      {/*<View>
                        <TouchableOpacity style={{margin:20, marginTop:10}} onPress={()=> navigation.navigate("StrokesView")}>
                          <MaterialIcon name={'info-outline'} size={25} color={Colors.Primary} />
                        </TouchableOpacity>
                        {item.idUsu!=item.id?<Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b', marginHorizontal:20}}>{'Strokes: '+item.strokes}</Text>:null}
                        {/*<Image
                          source={item.photo ? { uri: 'http://13.90.32.51/DragonGolfBackEnd/images' + item.photo } : BlankProfile }
                          style={{
                            alignSelf:'center',
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            marginHorizontal:30
                          }}
                        />
                      </View>*/}
                      </View>
                      </View>
                    </View>
                  </View>
            {/*<View style={{flexDirection:'row', backgroundColor: 'red',height: 90, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{flex:1,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.RoundId, item.Player1Id, item.Player2Id, item.strokes)}>
                <FontAwesome name={'save'} size={30} color={Colors.White} />
              </TouchableOpacity>
            </View>*/}
          </ScrollView>
        </View>
              }
              keyExtractor={item=>item.Player2Id}
              ListEmptyComponent={
              <View style={styles.emptyView}>
                  <FontAwesome5 name={"user-friends"} size={50} color="red" />
                <Text style={styles.emptyText}>{emptyPlayerList[language]}</Text>
              </View>
            }
            stopLeftSwipe={Dimensions.get('window').width * .5}
            stopRightSwipe={-(Dimensions.get('window').width * .5)}
            //onSwipeValueChange={this.onSwipeValueChange}
          />
        
      </ScrollView>}
      </View>
    );
}

