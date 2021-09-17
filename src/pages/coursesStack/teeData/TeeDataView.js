import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  TextInput
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import HolesComponent from './HolesComponent';
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import Colors from '../../../utils/Colors';
import DragonButton from '../../global/DragonButton';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { ListaHole, ActualizarHoles, LastHole } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import InputScrollView from "react-native-input-scroll-view";
import AsyncStorage from '@react-native-community/async-storage';

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [holes, setHoles] = useState([]);
    const [holesAux, setHolesAux] = useState([]);
    const [IDTees, setIDTees] = useState(route.route.params.IDTees);
    const [NameTee, setNameTee] = useState(route.route.params.NameTee);
    const [IDCourse, setIDCourse] = useState(route.route.params.IDCourse);
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('es');

    const [dataInState, setDataInState] = useState([]);
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
        ListadoHoles();
          });

        return unsubscribe;
      }, [navigation]);
    

  async function ListadoHoles() {
    let language = await AsyncStorage.getItem('language')
    setLanguage(language)
    /*let list = [];
    for (var i = 0; i < 18; i++) {
      list.push({
        index: i,
        par: '2',
        hole_number: (i + 1).toString(),
        adv: '',
        yards: '',
        tee_id: IDTees,
        //id_sync: null,
        //ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    setHoles(list)*/
    ListaHole(IDTees)
        .then((res) => {
          console.warn('HOLA')
          console.warn(res)
          if(res.estatus == 1){
            console.warn('entró')
                const list = res.Result.map(item => (
                    {
                      id: item.IDHoles,
                      hole_number: item.Ho_Hole,
                      par: item.Ho_Par,
                      adv: item.Ho_Advantage,
                      yards: item.Ho_Yards
                    }
                ))
                setHoles(list)
                setHolesAux(list)
            }
            else{
              LastHole(IDTees)
                .then((res1) => {
                  console.warn(res1)
                    if(res1.estatus == 1){
                        const list1 = res1.Result.map(item => (
                            {
                              id: item.IDHoles,
                              hole_number: item.Ho_Hole,
                              par: item.Ho_Par,
                              adv: item.Ho_Advantage,
                              yards: item.Ho_Yards
                            }
                        ))
                        setHoles(list1)
                        setHolesAux(list1)
                    }
                    else{
                      setHoles([])
                      setHolesAux([])
                    }
                })
            }
        })
  }

  function change(data,x,y){
    if(data<=18 && data>=0 && y=='adv'){
      let list = holes
      list[x][y] = data
      setDataInState([...dataInState, holes]);
    }
    else if(y !='adv'){
      let list = holes
      list[x][y] = data
      setDataInState([...dataInState, holes]);
    }
    else{
      showMessage({
        message: "Valor no permitido",
          type:'warning',
      });
    }
  }

  function onSubmitAdv(index){
    let adv = holes[index]['adv']
    console.warn(adv)
        if (!existAdv(index, adv) || !adv) focusNextInput(1,index);
        else {
            showMessage({
                message: Dictionary.advRepeat[language],
                type: 'warning',
                icon: 'warning',
            });
            setTimeout(_ => holes[`1:${index}`].focus(), 100);
        }
    }

  function existAdv(index, adv){
    for (let i = 0; i < holes.length; i++) {
      if(i != index){
        if(adv == holes[i].adv){
          return true;
        }
      }
    }
    return false;
  }

  function focusNextInput(column, index){
    //console.warn(holes[`${column + 1}:0`])
        //console.warn('['+column+']['+index+']')
        if (index === 17) {
            holes[`${column + 1}:0`].focus();
        } else {
            holes[`${column}:${index + 1}`].focus();
        }
    }

  function guardar(){

    var x = [];
    var par = 0;

    for(var i=0;i<holes.length;i++){
      x.push(holes[i].adv)
      par = par + parseInt(holes[i].par)
    }
    
    var elementos = x;
    var repetidos = [];
    var temporal = [];

    elementos.forEach((value,index)=>{
      temporal = Object.assign([],elementos); //Copiado de elemento
      console.warn(temporal)
      temporal.splice(index,1); //Se elimina el elemnto q se compara
      console.warn(temporal)
      /**
       * Se busca en temporal el elemento, y en repetido para 
       * ver si esta ingresado al array. indexOf returna
       * -1 si el elemento no se encuetra
       **/
       console.warn(value)
      if(temporal.indexOf(value.toString())!=-1 && repetidos.indexOf(value.toString())==-1)      repetidos.push(value);
    });

    console.warn(repetidos);
    if(repetidos.length>0){
      showMessage({
                message: Dictionary.advRepeat[language],
                type: 'warning',
                icon: 'warning',
            });
    }
    else{

      let dataSource = [];
      for (var i =0 ; i <= holes.length-1; i++) {
              dataSource.push('{'+Object.values(holes[i])+'}')
      }
      console.warn(IDTees)
      console.warn(NameTee)
      console.warn('['+dataSource.toString()+']')
      console.warn('par')
      console.warn(par)
      if(par < 70 || par > 74){
        showMessage({
          message: Dictionary.parRangeError[language],
          type: 'warning',
          icon: 'warning',
        });
      }
      ActualizarHoles(IDTees, '['+dataSource.toString()+']')
        .then((res) => {
          console.warn('r: '+res)
            if(res.estatus == 1){      
              showMessage({
                message: successSaveTeeData[language],
                type:'success',
              });
              navigation.navigate('TeesView', {IDCourse:IDCourse})
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

    const {
      emptyHoles,
      save,
      hoyos,
      hoyo,
      ventaja,
      successSaveTeeData,
      error
    } = Dictionary;

    return (
      <InputScrollView style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> navigation.goBack()}>
              <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View> 
            <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
              <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{hoyos[language]}</Text>
            </View>
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddHole', {IDTees:IDTees, NameTee:NameTee})}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
        </View>
          <View style={{flex:1, marginLeft:50}}>
            <View style={styles.holesHeader}>
              <View style={styles.rectangleElement}>
                <Text style={styles.holeText}>{hoyo[language]}</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Par</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>{ventaja[language]}</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Yds</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}></Text>
              </View>
            </View>
            <FlatList
            data={holes}
            renderItem={ (item) => (
              <View style={{flexDirection:'row'}}>
                  <View style={styles.holesHeader}>
                <View style={styles.rectangleElement}>
                    <Text style={styles.holeNumber}>{item.item.hole_number}</Text>
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                      ref={ref => holes[`0:${item.item.hole_number-1}`] = ref}
                      selectionColor={Colors.Secondary}
                      color={'black'}
                      style={[styles.input,{marginTop:-5}]}
                      maxLength={1}
                      keyboardType="numeric"
                      returnKeyType='done'
                      value={item.item.par.toString()}
                      onChangeText={(par) => change(par,item.item.hole_number-1,'par')}
                      selectTextOnFocus={true}
                      onSubmitEditing={_ => focusNextInput(0,item.item.hole_number-1)}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                      ref={ref => holes[`1:${item.item.hole_number-1}`] = ref}
                      selectionColor={Colors.Secondary}
                      color={'black'}
                      style={[styles.input,{marginTop:-5}]}
                      maxLength={2}
                      keyboardType="numeric"
                      returnKeyType='done'
                      value={item.item.adv.toString()}
                      onChangeText={(adv) => change(adv,item.item.hole_number-1,'adv')}
                      selectTextOnFocus={true}
                      onSubmitEditing={()=>onSubmitAdv(item.item.hole_number-1)}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                      ref={ref => holes[`2:${item.item.hole_number-1}`] = ref}
                      selectionColor={Colors.Secondary}
                      color={'black'}
                      style={[styles.input,{marginTop:-5}]}
                      maxLength={5}
                      keyboardType="numeric"
                      returnKeyType='done'
                      value={item.item.yards.toString()}
                      onChangeText={(yards) => change(yards,item.item.hole_number-1,'yards')}
                      selectTextOnFocus={true}
                      onSubmitEditing={_ => {
                        if (item.item.hole_number-1 < 17) {
                          focusNextInput(2,item.item.hole_number-1);
                        }
                      }}
                    />
                </View>
            </View>
                </View>
              )}
          />
          <View style={styles.bottomButtom}>
            <DragonButton title={save[language]} onPress={()=>guardar()} />
          </View>
          </View>
      </InputScrollView>
    );
}

