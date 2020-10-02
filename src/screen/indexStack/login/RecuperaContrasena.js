import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
//import { OlvideContrasena } from '../Services/Services';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";
import RNRestart from 'react-native-restart';
//import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';

let ScreenHeight = Dimensions.get("window").height;

const {
            RecPass
        } = Dictionary;

export default class Mascota extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mail: '',
      re : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      status: false,
      language: props.route.params.language
    }
  }

  clicked = async () => {

    if (this.state.mail === "") {
      showMessage({
                message: 'Campo correo electronico obligatorio',
                type: "warning",
              });
      return;
    }

    if(!this.state.re.test(String(this.state.mail).toLowerCase())){
      showMessage({
                message: 'Campo correo electronico no valido',
                type: "danger",
              });
      return

    }

    this.setState({
      status: true
    })

    OlvideContrasena(this.state.mail)
      .then((res) => {

        this.setState({
            status:false
          })

        if (res.estatus == 1) {

          showMessage({
                message: 'La nueva contraseña se ha enviado a su correo',
                type: "success",
              });
        }
        else {
          showMessage({
                message: 'Ocurrió un error, favor de intentar más tarde',
                type: "danger",
              });
        }
        this.props.navigation.goBack()
      });
  }

  render() {

    const {
            language
        } = this.state

    return (
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles2.container}>
        <Spinner
            visible={this.state.status}
            color='#104E81' />
        <TouchableOpacity style={{padding:10}} onPress={()=> this.props.navigation.goBack()}>
          <MaterialIcon name={'arrow-back'} size={25} color={'#E5DF4E'} />
        </TouchableOpacity>
        <View style={{ flex: .5, margin: 15, justifyContent: 'space-around' }}>

                <View style={{ alignSelf: 'center' }}>
                  <Text style={{ color: "#E5DF4E", fontFamily: 'Montserrat', fontSize: 18}}>{RecPass[language]}</Text>
                </View>
                <View style={{flexDirection: 'row', margin:20}}>
                  <View style={{flexDirection: 'column', flex:.1}}>
                    <Image style={{
                      marginTop: 30,
                      height: 30,
                      width: 30,
                      resizeMode: 'stretch'
                    }}
                    source={require('../../../../assets/globals/usuario.png')} />
                    </View>
                    <View style={styles.formContainer}>
                    <TextField
                      label='Usuario'
                      value={this.state.usuario}
                      onChangeText={(text) => this.setState({ mail: text })}
                      baseColor='#fff'
                      tintColor='#fff'
                      textColor='#fff'
                      labelTextStyle={styles2.TextStyle}
                    />
                    </View>
                  </View>
                <View style={styles2.Box2}>
                  <Button title='Recuperar Contraseña'
                    buttonStyle={{backgroundColor:'#0f222d',borderRadius:10,paddingHorizontal:20}}
                    titleStyle={{fontWeight:'100'}}
                    onPress={this.clicked} />
                </View>
              </View>
        </View>
    </TouchableWithoutFeedback>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: '#123c5b'
  },
  Box2: {
    margin: 20
  },
  TextStyle: {
    fontFamily: 'Montserrat',
    fontSize: 15,
  },
})