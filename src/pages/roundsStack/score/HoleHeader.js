import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { Dictionary } from '../../../utils/Dictionary';
import AsyncStorage from '@react-native-community/async-storage';

export default function HoleHeader(props) {
  const [language, setLanguage] = useState('');
  const [visible, setVisible] = useState(false);

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


  function renderHole(){
    return (
      <View style={{flex:1,flexDirection:'row'}}>
      <TouchableOpacity onPress={() => change(0)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{1}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(1)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{2}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(2)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{3}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(3)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{4}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(4)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{5}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(5)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{6}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(6)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{7}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(7)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{8}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(8)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{9}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(9)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{10}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(10)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{11}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(11)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{12}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(12)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{13}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(13)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{14}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(14)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{15}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(15)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{16}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(16)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{17}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(17)}>
          <View style={styles.holeView2}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>*/}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{18}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )

    /*let array = []

    for (var i = 0; i < 18; i++) {
      array.push(<TouchableOpacity onPress={() => change(i)}>
          <View style={[styles.holeView, {left:i, width:20}]}>
            {/*<Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>}
            <View style={styles.holeNumberView2}>
              <Text style={styles.holeNumber}>{i+1}</Text>
            </View>
          </View>
        </TouchableOpacity>)
    }
    return (<View style={{flex:1,flexDirection:'row'}}>{array}</View>)*/
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
            backgroundColor:'white',
            borderRadius:10,
            paddingHorizontal:5,
            paddingTop:5,
            alignSelf: "flex-end",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            marginHorizontal:10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,

            elevation: 17,
          }}>
          {renderHole()}
        <View>
          {/*<Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.cityName}>{course.city}</Text>*/}
        </View>
      </View>}
      </View>
    );
}