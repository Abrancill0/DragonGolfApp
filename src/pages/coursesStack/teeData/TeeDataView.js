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
import { FlatList } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';

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
        //id_sync: null,
        //ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
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

  function change(data,x,y){
    console.warn('data: '+data)
    console.warn('x: '+x)
    console.warn('y: '+y)
    let list = holes
    console.warn(list)
    list[x][y] = data
    console.warn(list)
    setHoles(list)
    //console.warn(holes)
  }

  function guardar(){
    showMessage({
                message: "Holes guardados correctamente",
                type:'success',
            });
  }

    const {
      emptyHoles,
      save
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
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddHole', {IDTees:IDTees, NameTee:NameTee})}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
        </View>

        <ScrollView
          horizontal
          keyboardShouldPersistTaps='always'
          keyboardDismissMode='none'
          showsHorizontalScrollIndicator={false}
        >
          <View style={{flex:1, marginLeft:50}}>
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
            <SwipeListView
            data={holes}
            renderItem={({item}) =>
              <View style={{flexDirection:'row'}}>
                  <View style={styles.holesHeader}>
                <View style={styles.rectangleElement}>
                    <Text style={styles.holeNumber}>{item.hole_number}</Text>
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        selectionColor={Colors.Secondary}
                        color={'black'}
                        style={[styles.input,{marginTop:-5}]}
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.par}
                        onChangeText={(par) => change(par,item.index,'par')}
                        selectTextOnFocus={true}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        selectionColor={Colors.Secondary}
                        color={'black'}
                        style={[styles.input,{marginTop:-5}]}
                        maxLength={2}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.adv}
                        onChangeText={(adv) => change(adv,item.index,'adv')}
                        selectTextOnFocus={true}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        selectionColor={Colors.Secondary}
                        color={'black'}
                        style={[styles.input,{marginTop:-5}]}
                        maxLength={5}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.yards}
                        onChangeText={(yards) => change(yards,item.index,'yards')}
                        selectTextOnFocus={true}
                    />
                </View>
            </View>
                </View>
              }
          />
          <View style={styles.bottomButtom}>
            <DragonButton title={save[language]} onPress={()=>guardar()} />
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
}

