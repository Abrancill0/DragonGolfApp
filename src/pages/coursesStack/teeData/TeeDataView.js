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
import { ListaHole, EliminarHoles } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function RoundsView(route) {

    const navigation = useNavigation();
    const [holes, setHoles] = useState([]);
    const [IDTees, setIDTees] = useState(route.route.params.IDTees);
    const [NameTee, setNameTee] = useState(route.route.params.NameTee);
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('es');
        useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
        ListadoHoles();
          });

        return unsubscribe;
      }, [navigation]);
    

  async function ListadoHoles() {
    let list = [];
    for (var i = 0; i < 18; i++) {
      list.push({
        index: i,
        par: '2',
        hole_number: (i + 1).toString(),
        adv: '',
        yards: '',
        tee_id: IDTees,
        id_sync: null,
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    setHoles(list)
    /*ListaHole(IDTees)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
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
            }
            else{
              setHoles([])
            }
        })*/
  }

  function Elimina(IDTees,id){
    Alert.alert(
      "DragonGolf",
      "¿Está seguro de eliminar este hoyo?",
      [
        {
          text: "Cancelar",
          style: 'cancel',
        },
        {
          text: "Continuar",
          onPress: () => {
            EliminarHoles(id,IDTees)
              .then((res) => {
                console.warn(res)
                  if(res.estatus == 1){
                    ListadoHoles()
                  }
              })
          },
        },
      ],
      { cancelable: false }
    );
  }

    const {
      emptyHoles
    } = Dictionary;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'} >

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{padding:20}} onPress={()=> navigation.goBack()}>
              <MaterialIcon name={'arrow-back'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View> 
            <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
              <Text style={{ padding:20, fontSize: 16, fontFamily: 'Montserrat',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>Holes</Text>
            </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddHole', {IDTees:IDTees, NameTee:NameTee})}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          style={{ alignSelf: 'center' }}
          keyboardShouldPersistTaps='always'
          keyboardDismissMode='none'
          showsHorizontalScrollIndicator={false}
          style={{width: '100%'}}
        >
          <View style={{width: Dimensions.get('screen').width, alignItems: 'center'}}>
            <View style={styles.holesHeader}>
              <View style={styles.rectangleElement}>
                <Text style={styles.holeText}>Hole</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Par</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Adv</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Yds</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}></Text>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width: Dimensions.get('screen').width}}
            >
              {holes.map(item => 
                <View style={{flex:1, flexDirection:'row',alignItems: 'center'}}>
                  <View style={styles.inputsView}>
                <View style={styles.rectangleElement}>
                    <Text style={styles.holeNumber}>{item.hole_number}</Text>
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        editable={false}
                        color={'black'}
                        style={[styles.input,{marginTop:-5}]}
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.par.toString()}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        editable={false}
                        color={'black'}
                        style={[styles.input,{marginTop:-5}]}
                        maxLength={2}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.adv.toString()}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        editable={false}
                        color={'black'}
                        style={[styles.input,{marginTop:-5}]}
                        maxLength={5}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.yards.toString()}
                        blurOnSubmit={false}
                    />
                </View>
            </View>
                  {/*<View>
                    <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> Elimina(IDTees,item.id)}>
                      <FontAwesome name={'trash-o'} size={30} color={Colors.Primary} />
                    </TouchableOpacity>
                    {/*<View style={{flex:.5}}>
                      <Fontisto name={'world'} size={30} color={Colors.Primary} />
                    </View>
                    <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> navigation.navigate('EditHole', {IDTees: IDTees, NameTee:NameTee, Hole: item.hole_number, Par: item.par, Adv: item.adv, Yds: item.yards, IDHoles: item.id})}>
                      <FontAwesome name={'edit'} size={30} color={Colors.Primary} />
                    </TouchableOpacity>
                  </View>*/}
                </View>
                )
              }
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
}

