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
  ScrollView,StyleSheet
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
import { ListadoInvitacion, EliminarInvitacion } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [courses, setCourses] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [language, setLanguage] = useState('es');
    const [search, setSearch] = useState(false);
    const [visible, setVisible] = useState(true);
    const [carga, setStatus] = useState(false);
    const ScreenWidth = Dimensions.get("window").width;
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
        ListarInvitacion();
          });

        return unsubscribe;
      }, [courses]);
    

  async function ListarInvitacion() {
                setStatus(true)
    let idUsu = await AsyncStorage.getItem('usu_id')
    let language = await AsyncStorage.getItem('language')
    setLanguage(language)
    console.warn(language)
    ListadoInvitacion(idUsu)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDInvitacion,
                      nombre: item.Nombre,
                      Ro_Name: item.Ro_Name,
                      fecha: moment(item.FechaCreacion).format('DD/MM/YYYY').toString()
                    }
                ))
                setCourses(list)
                setArrayholder(list)
                setStatus(false)
            }
            else{
              setCourses([])
              setArrayholder([])
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
    setCourses(newData)
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
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> navigation.goBack()}>
              <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View> 
            <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
              <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{notifications[language]}</Text>
            </View>
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddHole', {IDTees:IDTees, NameTee:NameTee})}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
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


  async function Elimina(id){
    console.warn(id)
    let idUsu = await AsyncStorage.getItem('usu_id')
    Alert.alert(
      "DragonGolf",
      sureToUpdateInvitations[language],
      [
        {
          text: cancel[language],
          style: 'cancel',
        },
        {
          text: continuar[language],
          onPress: () => {
            EliminarInvitacion(id,idUsu)
              .then((res) => {
                console.warn(res)
                  if(res.estatus == 1){
                    ListarInvitacion()
                  }
              })
          },
        },
      ],
      { cancelable: false }
    );
  }


    const {
      emptynotifications,
      Search,
      myCourses,
      courseName,
      courseShortName,
      courseCity,
      country,
      sureToUpdateInvitations,
      cancel,
      continuar,
      notifications,
      player,
      round,
      date
    } = Dictionary;

    return (
      <View style={{ flex: 1,backgroundColor:Colors.White }}>
        <Spinner
            visible={carga}
            color={Colors.Primary} />
        <View style={{ flex:.1,  flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{flex:.1,padding:10}} onPress={()=> navigation.goBack()}>
                <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
            <View style={{flex:.9,padding:10,justifyContent:'flex-start'}}>
                <Text style={{fontSize: 16, fontFamily: 'BankGothic Lt BT', color:Colors.Primary,fontWeight:'bold'}}>{notifications[language]}</Text>
            </View>
        </View>
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddHole', {IDTees:IDTees, NameTee:NameTee})}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
      {/*<View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:Colors.Primary,fontWeight:'bold', marginHorizontal:50}}>{Search[language]}</Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent: "flex-end"}} onPress={()=> setSearch(!search)}>
              <Entypo name={search?'chevron-thin-up':'chevron-thin-down'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>*/}

      {/*search && <View>
      <SearchBar
        placeholder={courseName[language]}
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
        placeholder={courseShortName[language]}
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
        placeholder={courseCity[language]}
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
        placeholder={country[language]}
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
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  ListarInvitacion()
                  setValue1('')
                  setValue2('')
                  setValue3('')
                  setValue4('')
                }}
              />
            }
            data={courses}
            renderItem={({item}) =>
                    <View style={styleDos.campos}>
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}>
                          <TouchableOpacity style={{width: ScreenWidth, flexDirection:'row',height:100}} activeOpacity={0} onPress={()=> navigation.navigate('TeesView', {IDCourse: item.id})}>
                              <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                              <View style={{flex:.85,justifyContent:'center',alignItems:'center',padding:10}}>
                                      <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',fontWeight:'bold'}}>{player[language]+': '+ item.nombre}</Text>
                                      <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{round[language]+': '+ item.Ro_Name}</Text>
                                      <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{date[language]+': '+ item.fecha}</Text>
                              </View>
                          </TouchableOpacity>
                          <View style={{flexDirection:'row', backgroundColor: 'red',height:100, alignItems: 'center', justifyContent: 'center',padding:5 }}>
                          {/*<TouchableOpacity activeOpacity={0} style={{flex:.2,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('EditCourse', {IDCourse: item.id, Nombre: item.nombre, NombreCorto: item.nombreCorto, Ciudad: item.ciudad, Pais: item.pais})}>
                            <FontAwesome name={'edit'} size={30} color={Colors.White} />
                          </TouchableOpacity>*/}
                              <TouchableOpacity onPress={()=> Elimina(item.id)}>
                                <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
                              </TouchableOpacity>
                          </View>
                          </ScrollView>
                    </View>
              }
              keyExtractor={item=>item.id}
              //ListHeaderComponent={renderHeader}
              ItemSeparatorComponent={()=>{
                return(<View style={{marginVertical:5}}/>)
              }}
              ListEmptyComponent={
              <ListEmptyComponent
                text={emptynotifications[language]}
                iconName="golf"
              />
            }
            stopLeftSwipe={Dimensions.get('window').width * .5}
            stopRightSwipe={-(Dimensions.get('window').width * .5)}
            //onSwipeValueChange={this.onSwipeValueChange}
          />
      </View>
      </View>
    );
}


const styleDos = StyleSheet.create({
  campos: {
    backgroundColor:Colors.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

