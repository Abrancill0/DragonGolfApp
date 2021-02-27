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
  Image
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
import { ListaAmigosAgregar, QuitarAmigos, ListaInvitadosAgregar, ListaTodosAgregar, AgregarAmigosRonda } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import { showMessage } from "react-native-flash-message";

const {
      emptyPlayerList,
      friends,
      SelectFriend,
      all,
      guests,
      Search,
      name,
      lastName,
      nickname,
      ghinNumber,
      successSavePlayer,
      cancel,
      samePlayer,
      continuar
    } = Dictionary;

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [IDCourse, setIDCourse] = useState(route.route.params.IDCourse);
    const [IDRound, setIDRound] = useState(route.route.params.IDRound);
    const [players, setPlayers] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [language, setLanguage] = useState('es');
    const ScreenWidth = Dimensions.get("window").width;
    const [search, setSearch] = useState(false);
    const [visible, setVisible] = useState(true);
    const [buttons, setButtons] = useState([])
    const BlankProfile = require('../../../../assets/globals/blank-profile.png');
    const [selectedIndex, setSelectedIndex] = useState(0)
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
            ListadoTodos();
            setSelectedIndex(0)
          });

        return unsubscribe;
      }, [navigation]);

  async function ListadoTodos() {
    let idUsu = await AsyncStorage.getItem('usu_id')
    let language = await AsyncStorage.getItem('language')
    setButtons([all[language], friends[language], guests[language]])
    setLanguage(language)
    console.warn(idUsu)
    ListaTodosAgregar(idUsu, IDRound)
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
    

  async function ListadoJugadores() {
    let idUsu = await AsyncStorage.getItem('usu_id')
    console.warn(idUsu)
    console.warn(IDRound)
    ListaAmigosAgregar(idUsu, IDRound)
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
    ListaInvitadosAgregar(idUsu, IDRound)
        .then((res) => {
          console.warn(idUsu)
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

  async function Elimina(IDUsuarioFav){
    let idUsu = await AsyncStorage.getItem('usu_id')
    Alert.alert(
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
            QuitarAmigos(IDUsuarioFav,idUsu)
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
    );
  }

  async function agregaJugadorRonda(playerId){
    let idUsu = await AsyncStorage.getItem('usu_id')
    console.warn(idUsu)
    console.warn(IDCourse)
    console.warn(IDRound)
    console.warn(playerId)
    AgregarAmigosRonda(IDRound,idUsu,playerId,0.0,'',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
            .then((res) => {
              console.warn(res)
                if(res.estatus == 1){
                    showMessage({
                      message: successSavePlayer[language],
                      type:'success',
                  });
                    if(selectedIndex==0)
                      ListadoTodos()
                    if(selectedIndex==1)
                      ListadoJugadores()
                    if(selectedIndex==2)
                      ListadoInvitados()
                    //navigation.goBack()
                  //navigation.navigate("PlayersViewRoundsList", {IDCourse:IDCourse, IDRound:IDRound})
                }
                else{
                  showMessage({
                      message: samePlayer[language],
                      type:'danger',
                  });
                }
            })
    /*Alert.alert(
      "DragonGolf",
      selectPlayer[language],
      [
        {
          text: cancel[language],
          style: 'cancel',
        },
        {
          text: continuar[language],
          onPress: () => {
            AgregarAmigosRonda(IDRound,idUsu,playerId,0.0,'',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
            .then((res) => {
              console.warn(res)
                if(res.estatus == 1){
                    showMessage({
                      message: "Jugador agreado correctamente",
                      type:'success',
                  });
                    navigation.goBack()
                  //navigation.navigate("PlayersViewRoundsList", {IDCourse:IDCourse, IDRound:IDRound})
                }
                else{
                  showMessage({
                      message: "Ocurrió un samePlayer, intente más tarde",
                      type:'danger',
                  });
                }
            })
          },
        },
      ],
      { cancelable: false }
    );*/
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
          <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{SelectFriend[language]}</Text>
          </View>
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{margin:20, marginTop:40, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddPlayer')}>
              <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
        </View>
        { visible &&
          <ScrollView>

        <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              selectedButtonStyle={{backgroundColor:Colors.Primary}}
              containerStyle={{ height: 50 }}
            />

      <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:Colors.Primary,fontWeight:'bold', marginHorizontal:50}}>{Search[language]}</Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent: "flex-end"}} onPress={()=> setSearch(!search)}>
              <Entypo name={search?'chevron-thin-up':'chevron-thin-down'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>

      {search && <View>
      <SearchBar
        placeholder={name[language]}
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
      <SearchBar
        placeholder={lastName[language]}
        onChangeText={(text) => searchFilterFunction(text,2)}
        autoCorrect={false}
        value={value2}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        height:50,
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:0.8}}
      />
      <SearchBar
        placeholder={nickname[language]}
        lightTheme
        round
        onChangeText={(text) => searchFilterFunction(text,3)}
        autoCorrect={false}
        value={value3}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        height:50,
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:1}}
      />
      <SearchBar
        placeholder={ghinNumber[language]}
        lightTheme
        round
        onChangeText={(text) => searchFilterFunction(text,4)}
        autoCorrect={false}
        value={value4}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        height:50,
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
                horizontal={false}
                showsHorizontalScrollIndicator={false}>
              <TouchableOpacity activeOpacity={0} onPress={()=> agregaJugadorRonda(item.id)}>
                <View style={{width: ScreenWidth,flexDirection:'row',height:70,backgroundColor:'#f1f2f2',marginHorizontal:30,marginVertical:10}}>
                  <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                    <View style={{flex:1}}>
                      <View style={{flex:1, flexDirection:'row',paddingHorizontal:10}}>
                      <View style={{flex:.8,justifyContent:'center',paddingHorizontal:10}}>
                        <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',fontWeight:'bold'}}>{item.nombre}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.apellido}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.nickname}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.ghinnumber}</Text>
                      </View>
                      <View>
                        <Image
                          source={item.photo ? { uri: 'http://13.90.32.51/DragonGolfBackEnd/images' + item.photo } : BlankProfile }
                          style={{
                            alignSelf:'center',
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            marginHorizontal:30
                          }}
                        />
                      </View>
                      </View>
                      </View>
                    </View>
                  </TouchableOpacity>
            {/*<View style={{flexDirection:'row', backgroundColor: 'red',height: 90, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{flex:.8,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id)}>
                <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
              </TouchableOpacity>
            </View>*/}
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
            stopLeftSwipe={Dimensions.get('window').width * .5}
            stopRightSwipe={-(Dimensions.get('window').width * .5)}
            //onSwipeValueChange={this.onSwipeValueChange}
          />
        
      </ScrollView>}

      </View>
    );
}

