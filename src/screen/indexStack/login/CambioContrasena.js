import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
//import { RestableceContrasena } from '../Services/Services';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";
import RNRestart from 'react-native-restart';
//import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../utils/Colors';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import Ripple from 'react-native-material-ripple';

let ScreenHeight = Dimensions.get("window").height;

const {
        CamPass,
        password,
        confirmPassword,
        required,
        dontMatch
      } = Dictionary;

export default class Mascota extends Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 'en',
      contrasena: '',
      confirmaContrasena: '',
      showPass: true,
      showPassConfirm: true,
      usuario: ''
    }
  }

  clicked = async () => {

    const {
            language
        } = this.state;

    if (this.state.contrasena === "") {
      showMessage({
                message: password[language] + ' ' + required[language],
                type: "warning",
              });
      return;
    }

    if (this.state.confirmaContrasena === "") {
      showMessage({
                message: confirmPassword[language],
                type: "warning",
              });
      return;
    }

    if (this.state.contrasena != this.state.confirmaContrasena) {
      showMessage({
                message: dontMatch[language],
                type: "warning",
              });
      return
    }

    /*RestableceContrasena(this.state.usuario, this.state.contrasena)
      .then((res) => {
        if (res.estatus == 1) {
          showMessage({
                message: res.mensaje,
                type: "success",
              });
          AsyncStorage.clear();
          setTimeout(
                () => { RNRestart.Restart(); },
                1000
            )
        }
        else{
          showMessage({
                message: 'Ocurrió un error, favor de intentarlo más tarde',
                type: "danger",
              });
        }
      });*/
  }

  render() {
    const {
            language
        } = this.state
    return (
      <ScrollView keyboardShouldPersistTaps='always'
        contentContainerStyle={{ height: ScreenHeight, backgroundColor: '#123c5b' }}>
      <StatusBar translucent barStyle='dark-content' backgroundColor='transparent'/>
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles2.container}>
        <View style={{flex: .9}}>
          <View style={{paddingHorizontal:50, alignSelf: 'center'}}>
            <Text style={{ color: Colors.Primary, fontFamily: 'Montserrat', fontSize: 18}}>{CamPass[language]}</Text>
          </View>
          <View style={{flexDirection: 'row', margin:20}}>
          <View style={{flexDirection: 'column', flex:.1}}>
            </View>
            <View style={styles.inputContainer}>
            <TextField
              label={password[language]}
              onChangeText={(text) => this.setState({ contrasena: text })}
              secureTextEntry={this.state.showPass}
              tintColor={Colors.Primary}
              autoCompleteType='password'
              autoCapitalize="none"
              labelTextStyle={styles2.TextStyle}
            />
            </View>
            <View style={{flexDirection: 'column', flex:.1}}>
              <TouchableOpacity onPress={()=>this.setState({ showPass: !this.state.showPass })}>
            </TouchableOpacity>
          </View>
          </View>
          <View style={{flexDirection: 'row', margin:20}}>
          <View style={{flexDirection: 'column', flex:.1}}>
            </View>
            <View style={styles.inputContainer}>
            <TextField
              label={confirmPassword[language]}
              onChangeText={(text) => this.setState({ confirmaContrasena: text })}
              secureTextEntry={this.state.showPassConfirm}
              tintColor={Colors.Primary}
              autoCompleteType='password'
              autoCapitalize="none"
              labelTextStyle={styles2.TextStyle}
            />
            </View>
            <View style={{flexDirection: 'column', flex:.1}}>
              <TouchableOpacity onPress={()=>this.setState({ showPassConfirm: !this.state.showPassConfirm })}>
               
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.buttonsView}>
                    <Ripple
                      style={[styles.button, { backgroundColor: Colors.Primary }]}
                      onPress={this.clicked}
                    >
                    <Text style={[styles.buttonText, { color: Colors.White }]}>{CamPass[language]}</Text>
                    <View style={{ width: 30 }} />
                    <Ionicon name="ios-arrow-forward" size={30} color={Colors.White} />
                    </Ripple>
                  </View>
         </View>
        </View>
    </TouchableWithoutFeedback>
    </ScrollView>

    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: 'white'
  },
  Box0: {
    flex: 1,
    margin:12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Box2: {
    margin: 20
  },
  Version: {
    fontSize: 13,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    margin: 10
  },
  TextStyle: {
    fontFamily: 'Montserrat',
    fontSize: 15,
  },
})