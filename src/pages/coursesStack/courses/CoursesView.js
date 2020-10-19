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
import { ListaCampos, EliminarCampo } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "@react-navigation/native";

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [courses, setCourses] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('es');
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
        ListadoCourses();
          });

        return unsubscribe;
      }, [navigation]);
    

  async function ListadoCourses() {
    let idUsu = await AsyncStorage.getItem('usu_id')
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
                      pais: item.Cou_Pais
                    }
                ))
                setCourses(list)
                setArrayholder(list)
            }
        })
  }

  function searchFilterFunction(text) {

    setValue(text)

    const newData = this.arrayholder.filter(item => {
    const itemData = `${item.nombre} ${item.nombre.toUpperCase()}`;
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;

    });

    console.warn(newData)

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

      <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b',fontWeight:'bold'}}>Buscar por: </Text>

      <SearchBar
        placeholder="Nombre..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={value}
      />
      <SearchBar
        placeholder="Nombre Corto..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={value}
      />
      <SearchBar
        placeholder="Ciudad..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={value}
      />
      <SearchBar
        placeholder="Pais..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={value}
      />
      </View>
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
      emptyCourseList
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{padding:20}} onPress={()=> navigation.openDrawer()}>
              <MaterialIcon name={'menu'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddCourse')}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>
          <SwipeListView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  ListadoCourses()
                  setValue('')
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
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.nombreCorto}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.ciudad}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.pais}</Text>
                      </View>
                    </View>
                    <View style={{flex:.2,padding:5}}>
                        <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id)}>
                          <FontAwesome name={'trash-o'} size={30} color={Colors.Primary} />
                        </TouchableOpacity>
                      {/*<View style={{flex:.5}}>
                        <Fontisto name={'world'} size={30} color={Colors.Primary} />
                      </View>*/}
                      <View style={{flex:.5}}>
                        <Fontisto name={'world-o'} size={30} color={Colors.Primary} />
                      </View>
                    </View>
                  </View>
              </TouchableOpacity>
              }
              //ListHeaderComponent={this.renderHeader}
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
    );
}

