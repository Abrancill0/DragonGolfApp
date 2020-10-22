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
import { ListaTees, EliminarTees } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import Ripple from 'react-native-material-ripple';

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [tees, setTees] = useState([]);
    const [IDCourse, setIDCourse] = useState(route.route.params.IDCourse);
    const [arrayholder, setArrayholder] = useState([]);
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('es');
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
        ListadoTees();
          });

        return unsubscribe;
      }, [navigation]);
    

  async function ListadoTees() {
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
                      teeColor: item.Te_TeeColor
                    }
                ))
                setTees(list)
            }
            else{
              setTees([])
            }
        })
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
            <TouchableOpacity style={{padding:20}} onPress={()=> navigation.goBack()}>
              <MaterialIcon name={'arrow-back'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View> 
          <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
          <Text style={{ padding:20, fontSize: 16, fontFamily: 'Montserrat',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>Tees</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddTee', {IDCourse:IDCourse})}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
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
              <TouchableOpacity style={{padding:10}} onPress={()=> navigation.navigate('TeeDataView', {IDTees: item.id, NameTee: item.nombre})}>
                <View style={{flexDirection:'row',height:90,backgroundColor:'#f1f2f2',marginHorizontal:50,marginVertical:10}}>
                  <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                    
                    <View style={{flex:.85}}>
                      <View style={{flex:.6,justifyContent:'center',paddingHorizontal:10}}>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b',fontWeight:'bold'}}>{item.nombre}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{'Slope: ' + item.slope}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{'Rating: ' + item.rating}</Text>
                        <View style={styles.teeColorView}>
                          <View style={[styles.colorSquare, { backgroundColor: item.teeColor, marginVertical:2 }]} />
                        </View>
                      </View>
                    </View>
                    <View style={{flex:.2,padding:5}}>
                        <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> Elimina(IDCourse,item.id)}>
                          <FontAwesome name={'trash-o'} size={30} color={Colors.Primary} />
                        </TouchableOpacity>
                      {/*<View style={{flex:.5}}>
                        <Fontisto name={'world'} size={30} color={Colors.Primary} />
                      </View>*/}
                      <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('EditTee', {IDTees:item.id ,IDCourse: IDCourse, Nombre: item.nombre, Slope: item.slope, Rating: item.rating, Color: item.teeColor})}>
                        <FontAwesome name={'edit'} size={30} color={Colors.Primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
              </TouchableOpacity>
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