import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { Dictionary } from '../../../utils/Dictionary';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../../utils/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function HoleHeader(props) {
  const [language, setLanguage] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(true);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);

  useEffect(() => {
         changeLanguage()
      });

  async function changeLanguage(tipo, index) {
    let language = await AsyncStorage.getItem('language')
    setLanguage(language)
    }

    function change(i){
      console.warn(i)
      props.clickHandler2(i)
      setVisible(false)
    }

    const {
      hole,
      course,
    } = props;

    return (
      <View>
      <View style={{ flex: 1, flexDirection: 'row', alignSelf:'center' }}>
      <TouchableOpacity onPress={()=> props.clickHandlerI2(hole-1)}><View style={[styles.holeView, {alignSelf:'center'}]}>
          <Text style={[styles.holeTitle,{opacity: 0.5}]}>{Dictionary.hole[language]}</Text>
          {hole-1>0?<View style={styles.holeNumberView}>
            <Text style={[styles.holeNumber,{opacity: 0.5}]}>{hole-1}</Text>
          </View>:
          <View style={styles.holeNumberView}>
            <Text style={[styles.holeNumber,{opacity: 0.5}]}>{18}</Text>
          </View>
        }
        </View></TouchableOpacity>
        <TouchableOpacity onPress={()=> setVisible(true)}>
        <View style={[styles.holeView, {alignSelf:'center', marginHorizontal:80}]}>
          <Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>
          <View style={styles.holeNumberView}>
            <Text style={styles.holeNumber}>{hole}</Text>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> props.clickHandlerD2(parseInt(hole,10))}><View style={[styles.holeView, {alignSelf:'center'}]}>
          <Text style={[styles.holeTitle,{opacity: 0.5}]}>{Dictionary.hole[language]}</Text>
          {hole<18?<View style={styles.holeNumberView}>
            <Text style={[styles.holeNumber,{opacity: 0.5}]}>{parseInt(hole,10)+1}</Text>
          </View>:
        <View style={styles.holeNumberView}>
            <Text style={[styles.holeNumber,{opacity: 0.5}]}>{1}</Text>
          </View>}
        </View></TouchableOpacity>
        <View>
          {/*<Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.cityName}>{course.city}</Text>*/}
        </View>
      </View>
      {visible &&<View
          style={{
            flex:1,
            flexDirection:'row',
            backgroundColor:'white',
            borderRadius:10,
            paddingHorizontal:5,
            paddingTop:5,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            marginHorizontal:2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,

            elevation: 17,
          }}>
      <View style={{flex:1}}>
      {visible2 &&<View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
      <TouchableOpacity style={{alignSelf:'center'}} onPress={() => {setVisible7(true);setVisible2(false)}}>
          <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
      <TouchableOpacity onPress={() => change(0)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{1}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(1)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{2}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(2)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{3}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible3(true);setVisible2(false)}}>
          <MaterialIcon name={'arrow-forward'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        </View>}
        {visible3 &&<View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible2(true);setVisible3(false)}}>
          <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(3)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{4}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(4)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{5}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(5)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{6}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible4(true);setVisible3(false)}}>
          <MaterialIcon name={'arrow-forward'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        </View>}
        {visible4 &&<View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible3(true);setVisible4(false)}}>
          <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(6)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{7}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(7)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{8}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(8)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{9}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible5(true);setVisible4(false)}}>
          <MaterialIcon name={'arrow-forward'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        </View>}
        {visible5 &&<View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible4(true);setVisible5(false)}}>
          <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(9)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{10}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(10)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{11}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(11)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{12}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible6(true);setVisible5(false)}}>
          <MaterialIcon name={'arrow-forward'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        </View>}
        {visible6 &&<View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible5(true);setVisible6(false)}}>
          <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(12)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{13}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(13)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{14}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(14)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{15}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible7(true);setVisible6(false)}}>
          <MaterialIcon name={'arrow-forward'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        </View>}
        {visible7 &&<View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible6(true);setVisible7(false)}}>
          <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(15)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{16}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(16)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{17}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(17)}>
          <View style={styles.holeView2}>
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{18}</Text>
            </View>
          </View>
        </TouchableOpacity>
      <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => {setVisible2(true);setVisible7(false)}}>
          <MaterialIcon name={'arrow-forward'} size={25} color={Colors.Primary} />
        </TouchableOpacity>
        </View>}
      </View>
          <TouchableOpacity style={{paddingTop:15}} onPress={() => setVisible(false)}>
          <Text style={{color:Colors.Primary,fontWeight: 'bold',paddingBottom: 1,paddingRight: 15}}>X</Text>
        </TouchableOpacity>
      </View>}
      </View>
    );
}