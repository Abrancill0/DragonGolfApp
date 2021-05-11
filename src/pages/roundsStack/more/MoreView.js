import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import Colors from '../../../utils/Colors';
import styles from './styles';
import MoreOptionComponent from './MoreOptionComponent';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { CerrarRonda } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";

class MoreView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'es'
    };
  }

  componentDidMount = async () => {
    let language = await AsyncStorage.getItem('language')

    this.setState({
        language:language
    })
    }

  cierraRonda = async () => {
    let IDRound = await AsyncStorage.getItem('IDRound')
    CerrarRonda(IDRound)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
              showMessage({
                message: Dictionary.closeRoundSuccess[this.state.language],
                type: 'success',
              });
              this.props.navigation.navigate('RoundsStack')
            }
            else{
              showMessage({
                message: Dictionary.error[this.state.language],
                type: 'danger',
              });
            }
        })
  }

  render() {

    const { language } = this.state;
    const {
      earningDetails,
      more,
      closeRound
    } = Dictionary;

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.openDrawer()}>
              <MaterialIcon name={'menu'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
          <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{more[language]}</Text>
          </View>
          {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{margin:20, marginTop:40, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('SNBetView')}>
              <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
        </View>
        <MoreOptionComponent title='Score Card' onPress={() => this.props.navigation.navigate('ScoreCardView')} />
        <MoreOptionComponent
          title={earningDetails[language]}
          onPress={() => this.props.navigation.navigate('SummaryView')}
          iconName='ios-cash'
          iconFamily='Ionicons'
        />
        <MoreOptionComponent 
          title={closeRound[language]} 
          onPress={() => this.cierraRonda()}
          iconName='ios-close-circle-outline'
          iconFamily='Ionicons'
        />
      </View>
    );
  }
}

export default MoreView;