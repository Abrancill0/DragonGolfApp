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
  StyleSheet,
  FlatList
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
import AsyncStorage from '@react-native-community/async-storage';
import { ListaCampos, EliminarCampo } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spinner from 'react-native-loading-spinner-overlay';

const ScreenWidth = Dimensions.get("window").width;

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
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
        ListadoCourses();
          });

        return unsubscribe;
      }, [courses]);
    

  async function ListadoCourses() {
    setStatus(true)
    let idUsu = await AsyncStorage.getItem('usu_id')
    let language = await AsyncStorage.getItem('language')
    setLanguage(language)
    ListaCampos(idUsu)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDCourse,
                      nombre: item.Cou_Nombre,
                      nombreCorto: item.Cou_NombreCorto,
                      ciudad: item.Cou_Ciudad,
                      pais: item.Cou_Pais,
                      tipo: item.Tipo,
                      todos: item.Cou_Nombre + item.Cou_NombreCorto + item.Cou_Ciudad + item.Cou_Pais
                    }
                ))
                setCourses(list)
                setArrayholder(list)
                setStatus(false)
            }
            else{
              setCourses([])
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
        itemData = `${item.nombre} ${item.todos.toUpperCase()}`;
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

  async function Elimina(id, tipo){
    console.warn(tipo)
    let idUsu = await AsyncStorage.getItem('usu_id')
    Alert.alert(
      "DragonGolf",
      sureToUpdateCourse[language],
      [
        {
          text: cancel[language],
          style: 'cancel',
        },
        {
          text: continuar[language],
          onPress: () => {
            EliminarCampo(id, tipo, idUsu)
              .then((res) => {
                console.warn(res)
                  if(res.estatus == 1){
                    ListadoCourses()
                  }
              })
          },
        },
      ],
      { cancelable: false }
    );
  }


    const {
      emptyCourseList,
      Search,
      myCourses,
      courseData,
      courseShortName,
      courseCity,
      country,
      sureToUpdateCourse,
      cancel,
      continuar
    } = Dictionary;

    return (
      <View style={{ flex: 1,backgroundColor:Colors.White}}>
        <Spinner
            visible={carga}
            color={Colors.Primary} />
        <View style={{flex:.1,justifyContent:'space-between',flexDirection:'row'}}>
              <TouchableOpacity style={{padding:10}} onPress={()=> navigation.openDrawer()}>
                <MaterialIcon name={'menu'} size={25} color={Colors.Primary} />
              </TouchableOpacity>
              <TouchableOpacity style={{padding:10}} onPress={()=> navigation.navigate('AddCourse')}>
                <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
              </TouchableOpacity>
        </View>
      {/*<View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:Colors.Primary,fontWeight:'bold', marginHorizontal:50}}>{Search[language]}</Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent: "flex-end"}} onPress={()=> setSearch(!search)}>
              <Entypo name={search?'chevron-thin-up':'chevron-thin-down'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>
    */}
     
      
      {/*<SearchBar
        placeholder={courseShortName[language]}
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
        height:50,
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
        height:50,
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:1,
        borderBottomWidth:2}}
      />*/}
      <View style={{flex:.9}}>
          <FlatList
            ListHeaderComponent={()=>{
              return(<SearchBar
                placeholder={courseData[language]}
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
              />)
            }}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  ListadoCourses()
                  setValue1('')
                  setValue2('')
                  setValue3('')
                  setValue4('')
                }}
              />
            }
            data={courses}
            renderItem={({item}) =>
            <View style={styles.campos}>
                    <ScrollView 
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={{width:ScreenWidth}} activeOpacity={0} onPress={()=> navigation.navigate('TeesView', {IDCourse: item.id})}>
                                <View style={{flexDirection:'row'}}>
                                  <View style={{flex:1,justifyContent:'center',paddingHorizontal:10}}>
                                      <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',fontWeight:'bold'}}>{item.nombre}</Text>
                                      <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.nombreCorto}</Text>
                                      <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{item.ciudad}, {item.pais}</Text>
                                  </View>
                                {/*<View style={{flex:.2,padding:5}}>
                                <View style={{flex:.5}}>
                                      <Fontisto name={item.tipo=='Copia'?'cloud-down':'cloud-up'} size={30} color={Colors.Primary} />
                                </View>
                              </View>*/}
                                </View>
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', backgroundColor: 'red',height: 70, alignItems: 'center', justifyContent: 'center',width:150 }}>
                                <TouchableOpacity activeOpacity={0} style={{flex:.2,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('EditCourse', {IDCourse: item.id, Nombre: item.nombre, NombreCorto: item.nombreCorto, Ciudad: item.ciudad, Pais: item.pais})}>
                                      <FontAwesome name={'edit'} size={30} color={Colors.White} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:.2,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id, item.tipo)}>
                                      <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
                                </TouchableOpacity>
                            </View>
                      </ScrollView>
              </View>
              }
              keyExtractor={item=>item.id}
              ItemSeparatorComponent={()=>{
                return(<View style={{marginVertical:5}}/>)
              }}
              //ListHeaderComponent={renderHeader}
              ListEmptyComponent={
              <ListEmptyComponent
                text={emptyCourseList[language]}
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

const styles = StyleSheet.create({
  campos: {
    flex:1,
    flexDirection:'row',
    height:70,
    backgroundColor:Colors.White,
    marginTop:2,
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

