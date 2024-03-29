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
  StyleSheet
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
import { ListaAmigos, QuitarAmigos, ListaInvitados, ListaTodos, RutaBaseAB } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import { showMessage } from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextField } from 'react-native-material-textfield';

const {
      emptyPlayerList,
      friends,
      all,
      guests,
      Search,
      playerData,
      lastName,
      nickname,
      ghinNumber
    } = Dictionary;

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [players, setPlayers] = useState([]);
    const [carga, setStatus] = useState(false);
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
    setStatus(true)
    let idUsu = await AsyncStorage.getItem('usu_id')
    let language = await AsyncStorage.getItem('language')
    setButtons([all[language], friends[language], guests[language]])
    setLanguage(language)
    console.warn(idUsu)
    ListaTodos(idUsu)
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
                      handicap: item.usu_handicapindex,
                      strokes: item.usu_golpesventaja,
                      difTee: item.usu_diferenciatee,
                      invitado: item.usu_invitado,
                      cellphone: item.usu_telefono,
                      email: item.usu_email,
                      todos: item.usu_nombre + item.usu_apellido_paterno + item.usu_nickname + item.usu_ghinnumber
                    }
                ))
                setPlayers(list)
                setArrayholder(list)
                setStatus(false)
            }
            else{
              setPlayers([])
              setStatus(false)
            }
        })
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
                      handicap: item.usu_handicapindex,
                      strokes: item.usu_golpesventaja,
                      difTee: item.usu_diferenciatee,
                      invitado: item.usu_invitado,
                      cellphone: item.usu_telefono,
                      email: item.usu_email,
                      todos: item.usu_nombre + item.usu_apellido_paterno + item.usu_nickname + item.usu_ghinnumber
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
                      handicap: item.usu_handicapindex,
                      strokes: item.usu_golpesventaja,
                      difTee: item.usu_diferenciatee,
                      invitado: item.usu_invitado,
                      cellphone: item.usu_telefono,
                      email: item.usu_email,
                      todos: item.usu_nombre + item.usu_apellido_paterno + item.usu_nickname + item.usu_ghinnumber
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

  function searchFilterFunction(text,busqueda){

    const newData = arrayholder.filter(item => {
    let itemData = ""
    switch(busqueda){
      case 1:
        setValue1(text) 
        itemData = `${item.nombre} ${item.todos.toUpperCase()}`;
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
      <View style={{ flex: 1,backgroundColor:Colors.White }}>
        <Spinner
            visible={carga}
            color={Colors.Primary} />

        <View style={{flex:.1,justifyContent:'space-between',flexDirection:'row'}}>
          <TouchableOpacity style={{padding:10,flex:.1,justifyContent:'center'}} onPress={()=> navigation.openDrawer()}>
              <MaterialIcon name={'menu'} size={25} color={Colors.Primary} />
          </TouchableOpacity>
          <View>
              <Text style={{ margin:20, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{all[language]}</Text>
          </View>
          <TouchableOpacity style={{padding:10,flex:.1,justifyContent:'center'}} onPress={()=> navigation.navigate('AddPlayer')}>
              <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
          </TouchableOpacity>
        </View>
      {
        /*
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
        */
        }
    
      {/*<SearchBar
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
      />*/}
        <View style={{flex:.1}}>
          <TextField
              placeholder={Search[language]}
              tintColor={Colors.Primary}
              autoCapitalize="none"
              onChangeText={(text) => searchFilterFunction(text,1)}
              value={value1}
              style={{textAlign:'center',height:'100%',marginTop:0,padding:0}}
          />
      </View>
        <View style={{flex:.8}}>
          <FlatList
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
            {
              console.log(item.photo ? { uri:  RutaBaseAB+'/images' + item.photo } : false)
                return(
                <View style={styles.campos}>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                      <TouchableOpacity style={{width: ScreenWidth,padding:10}} activeOpacity={0} onPress={()=> navigation.navigate('PlayerInfo',{item:item})}>
                              <View style={{flex:1, flexDirection:'row',paddingHorizontal:10}}>
                                  <View style={{flex:.2}}>
                                    <Image
                                      source={item.photo ? { uri:  RutaBaseAB+'/images' + item.photo } : BlankProfile }
                                      style={{
                                        alignSelf:'center',
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30,
                                        marginHorizontal:30
                                      }}
                                    />
                                  </View>
                                  <View style={{flex:.8,justifyContent:'center',paddingHorizontal:10}}>
                                    <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',fontWeight:'bold'}}>{item.nickname}</Text>
                                    <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.nombre+ ' ' + item.apellido}</Text>
                                    <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.ghinnumber}</Text>
                                  </View>
                              </View>
                      </TouchableOpacity>
                    <View style={{flexDirection:'row', backgroundColor: 'red',height: 90, alignItems: 'center', justifyContent: 'center',width:150 }}>
                      <TouchableOpacity style={{flex:.8,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id)}>
                        <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
            )}}
            keyExtractor={item=>item.id}
            ListEmptyComponent={
              <View style={styles.emptyView}>
                  <FontAwesome5 name={"user-friends"} size={50} color="red" />
                <Text style={styles.emptyText}>{emptyPlayerList[language]}</Text>
              </View>
            }
            ItemSeparatorComponent={()=>{
              return(<View style={{marginVertical:5}}/>)
            }}
            stopLeftSwipe={Dimensions.get('window').width * .5}
            stopRightSwipe={-(Dimensions.get('window').width * .5)}
            //onSwipeValueChange={this.onSwipeValueChange}
          />
          </View>
      </View>
    );
}


const styles = StyleSheet.create({
  campos: {
    flex:1,
    flexDirection:'row',
    backgroundColor:Colors.White,
    marginTop:5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80
},
emptyText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10
},
});

