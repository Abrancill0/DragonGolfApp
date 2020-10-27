import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  Animated,
  Dimensions,
  Alert,
  TouchableOpacity,
  RefreshControl,
  Text
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
import { ListaAmigos, EliminarCampo } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [players, setPlayers] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [language, setLanguage] = useState('es');
    const [search, setSearch] = useState(false);
    const [visible, setVisible] = useState(true);
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
        ListadoJugadores();
          });

        return unsubscribe;
      }, [navigation]);
    

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
                      email: item.usu_email
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
        itemData = `${item.email} ${item.email.toUpperCase()}`;
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


  function Elimina(id){
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
            EliminarCampo(id)
              .then((res) => {
                console.warn(res)
                  if(res.estatus == 1){
                    //ListadoCourses()
                  }
              })
          },
        },
      ],
      { cancelable: false }
    );
  }


    const {
      emptyPlayerList
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
            <TouchableOpacity style={{padding:20}} onPress={()=> navigation.openDrawer()}>
              <MaterialIcon name={'menu'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
          <Text style={{ padding:20, fontSize: 16, fontFamily: 'Montserrat',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>Friends</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddPlayer')}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>
        { visible &&
          <View>

      <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:Colors.Primary,fontWeight:'bold', marginHorizontal:50}}>Buscar por: </Text>
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
        placeholder="Email"
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
                  //ListadoCourses()
                  setValue1('')
                  setValue2('')
                  setValue3('')
                  setValue4('')
                }}
              />
            }
            data={courses}
            renderItem={({item}) =>
              <TouchableOpacity style={{padding:10}} onPress={()=> navigation.navigate('TeesView', {IDCourse: item.id})}>
                <View style={{flexDirection:'row',height:100,backgroundColor:'#f1f2f2',marginHorizontal:50,marginVertical:10}}>
                  <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                    
                    <View style={{flex:.85}}>
                      <View style={{flex:.6,justifyContent:'center',paddingHorizontal:10}}>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b',fontWeight:'bold'}}>{item.nombre}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.apellido}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.nickname}, {item.email}</Text>
                      </View>
                    </View>
                    <View style={{flex:.2,padding:5}}>
                        <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id)}>
                          <FontAwesome name={'trash-o'} size={30} color={Colors.Primary} />
                        </TouchableOpacity>
                      {/*<View style={{flex:.5}}>
                        <Fontisto name={'world-o'} size={30} color={Colors.Primary} />
                      </View>*/}
                      <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('EditCourse', {IDCourse: item.id, Nombre: item.nombre, Apellido: item.apellido, Nickname: item.nickname, Email: item.email})}>
                        <FontAwesome name={'edit'} size={30} color={Colors.Primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
              </TouchableOpacity>
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
        
      </View>}

      </View>
    );
}

