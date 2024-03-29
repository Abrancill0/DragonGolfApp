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
import { ListaTees, AgregarTeesRonda } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import Ripple from 'react-native-material-ripple';
import { showMessage } from "react-native-flash-message";

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [tees, setTees] = useState([]);
    const [IDCourse, setIDCourse] = useState(route.route.params.IDCourse);
    const [IDRound, setIDRound] = useState(route.route.params.IDRound);
    const [PlayerID, setPlayerID] = useState(route.route.params.PlayerID);
    const [arrayholder, setArrayholder] = useState([]);
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('es');
    const ScreenWidth = Dimensions.get("window").width;
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
        ListadoTees();
          });

        return unsubscribe;
      }, [navigation]);
    

  async function ListadoTees() {
    let language = await AsyncStorage.getItem('language')
    setLanguage(language)
    ListaTees(IDCourse)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDTees,
                      nombre: item.Te_TeeName,
                      slope: item.Te_Slope,
                      rating: item.Te_Rating,
                      par: item.Te_Par,
                      teeColor: item.Te_TeeColor,
                      front: item.Te_In,
                      back: item.Te_Out,
                      total: item.Te_Total
                    }
                ))
                setTees(list)
            }
            else{
              setTees([])
            }
        })
  }

  async function agregarTee(IDTees)
  {
    let idUsu = await AsyncStorage.getItem('usu_id')
    console.warn(IDRound)
    console.warn(idUsu)
    console.warn(PlayerID)
    console.warn(IDTees)
    if(idUsu == PlayerID){
      AgregarTeesRonda(IDRound,idUsu,PlayerID,IDTees,1)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
            showMessage({
              message: successSaveTeeData[language],
              type:'success',
            });  
            AsyncStorage.setItem('arreglo2', 'false');
            navigation.goBack()
            //navigation.navigate("PlayersViewRoundsList", {IDCourse:IDCourse, IDRound:IDRound})
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
      SelectTee3[language],
      [
        {
          text: cancel[language],
          style: 'cancel',
        },
        {
          text: mi[language],
          onPress: () => {
            AgregarTeesRonda(IDRound,idUsu,PlayerID,IDTees,0)
              .then((res) => {
                console.warn(res)
                if(res.estatus == 1){
                  showMessage({
                    message: successSaveTeeData[language],
                    type:'success',
                  });
                  navigation.goBack()
                  //navigation.navigate("PlayersViewRoundsList", {IDCourse:IDCourse, IDRound:IDRound})
                }
                else{
                  showMessage({
                    message: error[language],
                    type:'danger',
                  });
               }
            })
          },
        },
        {
          text: all[language],
          onPress: () => {
            AgregarTeesRonda(IDRound,idUsu,PlayerID,IDTees,1)
              .then((res) => {
                console.warn(res)
                if(res.estatus == 1){
                  showMessage({
                    message: successSaveTeeData[language],
                    type:'success',
                  });
                  navigation.goBack()
                  //navigation.navigate("PlayersViewRoundsList", {IDCourse:IDCourse, IDRound:IDRound})
                }
                else{
                  showMessage({
                    message: error[language],
                    type:'danger',
                  });
               }
            })
          },
        },
      ],
      { cancelable: true }
    );*/
    }else{
      AgregarTeesRonda(IDRound,idUsu,PlayerID,IDTees,0)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
            showMessage({
              message: successSaveTeeData[language],
              type:'success',
            });
            navigation.goBack()
            //navigation.navigate("PlayersViewRoundsList", {IDCourse:IDCourse, IDRound:IDRound})
          }
          else{
            showMessage({
              message: error[language],
              type:'danger',
            });
         }
      })
    }
  }

  function Elimina(idCourse,id){
    Alert.alert(
      "DragonGolf",
      "¿Está seguro de eliminar este tee?",
      [
        {
          text: "Cancelar",
          style: 'cancel',
        },
        {
          text: "Continuar",
          onPress: () => {
            EliminarTees(idCourse,id)
              .then((res) => {
                console.warn(res)
                  if(res.estatus == 1){
                    ListadoTees()
                  }
              })
          },
        },
      ],
      { cancelable: false }
    );
  }


    const {
      emptyTeesList,
      teeColor: teeColorText,
      SelectTee2,
      SelectTee3,
      mi,
      all,
      cancel,
      continuar,
      successSaveTeeData,
      error
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
          <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
          <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{SelectTee2[language]}</Text>
          </View>
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{margin:30, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddTee', {IDCourse:IDCourse})}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
        </View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  ListadoTees()
                  setValue('')
                }}
              />
            }
            data={tees}
            renderItem={({item}) =>
            <View style={{flex:.2,padding:5}}>
              <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}>
              <TouchableOpacity activeOpacity={0} onPress={()=>agregarTee(item.id)} onLongPress={()=> navigation.navigate('TeeDataViewRound', {IDTees: item.id, NameTee: item.nombre,IDCourse: IDCourse})}>
                <View style={{width: ScreenWidth,flexDirection:'row',height:90,backgroundColor:'#f1f2f2',marginVertical:10}}>
                  <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                    
                    <View style={{flex:1}}>
                      <View style={{flex:1, flexDirection:'row',paddingHorizontal:10}}>
                        <View style={{flex:.4}}>
                          <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b',fontWeight:'bold'}}>{item.nombre}</Text>
                          <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Slope: ' + item.slope}</Text>
                          <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Rating: ' + item.rating}</Text>
                          <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Par: ' + item.par}</Text>
                        </View>
                        <View style={{flex:.4}}>
                          <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Front: ' + item.front}</Text>
                          <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Back: ' + item.back}</Text>
                          <Text style={{ fontSize: 13, fontFamily: 'BankGothic Lt BT', color:'#123c5b'}}>{'Total: ' + item.total}</Text>
                        </View>
                        <View style={[styles.teeColorView],{flex:.2}}>
                          <View style={[styles.colorSquare, { backgroundColor: item.teeColor, marginVertical:2 }]} />
                        </View>
                      </View>
                    </View>
                  </View>
              </TouchableOpacity>
            {/*<View style={{flexDirection:'row', backgroundColor: 'red',height: 90, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('EditTee', {IDTees:item.id ,IDCourse: IDCourse, Nombre: item.nombre, Slope: item.slope, Rating: item.rating, Color: item.teeColor})}>
                <FontAwesome name={'edit'} size={30} color={Colors.White} />
              </TouchableOpacity>
              <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> Elimina(IDCourse,item.id)}>
                <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
              </TouchableOpacity>
            </View>*/}
          </ScrollView>
        </View>
              }
              //ListHeaderComponent={this.renderHeader}
              ListEmptyComponent={
              <ListEmptyComponent
                text={emptyTeesList[language]}
                iconName="golf"
              />
            }
          />
      </View>
    );
}