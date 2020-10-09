import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, Alert, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer'

import SplashScreen from './src/screen/splashScreen/SplashScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'


import { Icon } from 'react-native-elements'
import Login from './src/screen/indexStack/login/LoginView'
import RecuperaContrasena from './src/screen/indexStack/login/RecuperaContrasena'
import CambioContrasena from './src/screen/indexStack/login/CambioContrasena'
import RegisterView from './src/screen/indexStack/register/RegisterView'
import SettingsView from './src/pages/settingsStack/settings/SettingsView'
import CoursesView from './src/pages/coursesStack/courses/CoursesView'
import AddCourse from './src/pages/coursesStack/addCourse/AddCourseView'
import InfoScreen from './src/pages/InfoScreen/InfoScreen';
import EditUserView from './src/pages/settingsStack/editUser/EditUserView';
import configureRounds from './src/pages/roundsStack/configRound/ConfigRoundView'
import FlashMessage from "react-native-flash-message";

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';

import RoundsStack from './src/routes/RoundsStack';
//import PlayersStack from './PlayersStack';
//import CoursesStack from './CoursesStack';
//import SettingsStack from './SettingsStack';
//import TournamentsView from '../pages/tournamentsStack/TournamentsView';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from './src/utils/Colors';
import { Dictionary } from './src/utils/Dictionary';
import { InfoUsuario } from './src/Services/Services';
import NetInfo from "@react-native-community/netinfo";
import RNRestart from 'react-native-restart'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();
var { width, height } = Dimensions.get('window');
const BottomTab = createBottomTabNavigator();
const BlankProfile = require('./assets/globals/blank-profile.png');


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      logeado:false,
      isLoading:true,
      UsuNombre:'',
      UsuApellidoPaterno:'',
      UsuApelidoMaterno:'',
      UsuFoto:'',
      conexion: true,
      userData:[]
    }

    this.loadSesion = this.loadSesion.bind(this)
    this.getUserData = this.getUserData.bind(this)


  }

  handleConnectivityChange = (connection) => {
    if(connection.isInternetReachable)
    {
        this.setState({
          conexion:true
        })
        this.loadSesion()
    }
    else if(connection.isInternetReachable==false)
    {
      this.setState({
        conexion:false,
        count:0
      })
    }
  };

  componentDidMount() {
    this.netinfoUnsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    if (this.netinfoUnsubscribe) {
      this.netinfoUnsubscribe();
      this.netinfoUnsubscribe = null;
    }
  }

  getUserData = async () => {
    const token = await AsyncStorage.getItem('usu_id')
    InfoUsuario(token)
    .then((res) => {
        if(res.estatus==1){

            const lista =[
            {
              id: res.resultado.usu_id,
              name: res.resultado.usu_nombre,
              last_name: res.resultado.usu_apellido_paterno,
              last_name2: res.resultado.usu_apellido_materno,
              nick_name: res.resultado.usu_nickname,
              email: res.resultado.usu_email,
              ghin_number: res.resultado.usu_ghin_numero,
              handicap: res.resultado.usu_handicap_index,
              cellphone:res.resultado.usu_telefono,
              photo: 'http://trascenti.com/pruebasDragon/public/' + res.resultado.usu_imagen,
              language: res.resultado.set_idioma.substring(0,2)
            }]
            this.setState({
            userData: lista[0]
          })
        }  
      })
  }

  loadSesion = async () => {

    try {
        let IDUsuario = await AsyncStorage.getItem('usu_id')
        console.warn(IDUsuario)
        if (IDUsuario != null )
        {
          this.setState({
            logeado:true,
            isLoading:false,
            activo:true
          })
          this.LoadUsuario(IDUsuario)
        }
        else
        {
          this.setState({
            logeado:false,
            isLoading:false
          })
        }
      } catch (error) {
        this.setState({
          logeado:false,
          isLoading:false
        })
      }

  };

  LoadUsuario(CLVUsuario) 
  {
    InfoUsuario(CLVUsuario)
    .then((res) => {
        if(res.estatus==1){
          console.warn(res)
            let result=res.resultado
            this.setState({
              logeado:true,
              isLoading:false,
              UsuNombre:result.usu_nombre,
              UsuApellidoPaterno:result.usu_apellido_paterno,
              UsuApelidoMaterno:result.usu_apellido_materno
              //UsuFoto:result.UsuFoto+'?'+Math.random()
            })
            const lista =[
            {
              id: res.resultado.usu_id,
              name: res.resultado.usu_nombre,
              last_name: res.resultado.usu_apellido_paterno,
              last_name2: res.resultado.usu_apellido_materno,
              nick_name: res.resultado.usu_nickname,
              email: res.resultado.usu_email,
              ghin_number: res.resultado.usu_ghin_numero,
              handicap: res.resultado.usu_handicap_index,
              cellphone:res.resultado.usu_telefono,
              language: res.resultado.set_idioma,
              photo: 'http://trascenti.com/pruebasDragon/public/' + res.resultado.usu_imagen,
              language: res.resultado.set_idioma.substring(0,2)
            }]
            this.setState({
            userData: lista[0]
          })
        }  
        else{
            setLoading(false)
            showMessage({
                message: res.mensaje,
                type: 'info',
            });
        }
    }).catch(error=>{
        setLoading(false)
        showMessage({
            message: "Error de conexión",
            type:'error',
        });
    })
  }

  closeSesion(props){
    Alert.alert(
      'Dragon Golf',
      "¿Esta seguro(a) que desea cerrar sesion?",
      [
        { text: 'Cancelar', onPress: () => { return null } },
        {
          text: 'Confirmar', onPress: () => {
            AsyncStorage.clear();
            RNRestart.Restart();
          }
        },
      ],
      { cancelable: false }
    )
  }


  render() {

    console.warn(this.state.logeado)

    const DrawerContent2 = props => {
      return (
        <View></View>
      )
    }


    const DrawerContent = props => {
      const {
        userData
      } = this.state;
      return (

        <View style={{flex:1}}>
          <View style={{height:'90%',padding:20}}>
              {
              this.state.logeado
              ?
              <View style={{height:'25%',borderBottomWidth:1,borderBottomColor:Colors.Primary,marginBottom:10}}>
                  <TouchableOpacity style={{marginBottom:20,alignItems:'center'}} onPress={() => props.navigation.navigate('EditUserView', {userData:userData, language:userData.language, getUserData:this.getUserData})}>
                      <Image
                        source={userData ? userData.photo ? { uri: userData.photo } : BlankProfile : BlankProfile}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30
                        }}
                      />
                <View>
                  <Text style={{textAlign:'center'}}>{this.state.UsuNombre+' '+this.state.UsuApellidoPaterno+' '+this.state.UsuApelidoMaterno}</Text>
                </View>
                </TouchableOpacity>
              </View>
              :
              null
              }
              <TouchableOpacity  style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                  <View style={{flex:.1}}>
                    <FontAwesomeIcon name='bank' color='#0F222D' size={20}/>
                  </View>
                <View style={{flex:.9}}>
                  <DrawerItem
                  label="Inicio"
                  onPress={() => props.navigation.closeDrawer()}
                  labelStyle={{color:Colors.Primary}} />
                </View>
              </TouchableOpacity> 
              {
              this.state.logeado
              ?
              <TouchableOpacity style={{width:'100%',flexDirection:'row',alignItems:'center'}} onPress={()=> props.navigation.navigate('EditUserView', {userData:userData, language:userData.language, getUserData:this.getUserData})}>
                  <View style={{flex:.1}}>
                    <FontAwesomeIcon name='user' color='#0F222D' size={20}/>
                  </View>
                <View style={{flex:.9}}>
                  <DrawerItem
                  label="Perfil"
                  labelStyle={{color:Colors.Primary}}
                  onPress={()=> props.navigation.navigate('EditUserView', {userData:userData, language:userData.language, getUserData:this.getUserData})} />
                </View>
              </TouchableOpacity> 
               :
               null
               }
          </View>
          {
          !this.state.logeado
          ?
          <View style={{height:'10%',flexDirection:'row',alignItems:'center',backgroundColor:'#123c5b'}}>
              <View style={{flex:.45,borderRightWidth:1,borderColor:'white'}}>
                <DrawerItem
                label="Registrar"
                onPress={() => props.navigation.navigate('Registro')}
                labelStyle={{color:'white'}} />
              </View> 
              <View style={{flex:.55,color:'white'}}>
                <DrawerItem
                label="Iniciar sesión"
                onPress={() => props.navigation.navigate('Login')}
                labelStyle={{color:'white',flexWrap:'wrap-reverse'}} />
              </View>
          </View>
          :
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => this.closeSesion(props)}
            style={{height:'10%',flexDirection:'row',alignItems:'center',backgroundColor:Colors.Primary,padding:10}}>
              <View style={{flex:.1}}>
                  <FontAwesomeIcon name='sign-out' color='white' size={20}/>
              </View>
              <View style={{flex:.9}}>
                <DrawerItem
                label="Cerrar sesión"
                onPress={() => this.closeSesion(props)}
                labelStyle={{color:'white'}} />
              </View> 
          </TouchableOpacity>
          }
              
        </View>
       
      )
    }

    createHomeDrawer = () =>
      <Drawer.Navigator drawerContent={props => this.state.activo?<DrawerContent {...props} />:<DrawerContent {...props} />} >
        <Drawer.Screen name='createHomeStack' children={createHomeStack} options={{ title: 'Inicio' }} />
      </Drawer.Navigator>

    CreateHomeBottomTabNavigator = () =>
      <BottomTab.Navigator tabBarOptions={{showLabel:false}}>
      <BottomTab.Screen name='SettingsView' component={SettingsView} 
          options={({ route }) => ({
            tabBarIcon:({ focused })=>{
            if(focused==true)
            {
              return(
              <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <MaterialIcons
                    name='settings'
                    color={Colors.Primary}
                    size={25} />
              </View>
              )
            }else
            {
              return(
                <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <MaterialIcons
                    name='settings'
                    color={Colors.Black}
                    size={20} />
              </View>
              )
            }
          },
            
          })} />
          <BottomTab.Screen name='CoursesView' component={CoursesView} 
          options={({ route }) => ({
            tabBarIcon:({ focused })=>{
            if(focused==true)
            {
              return(
              <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <MaterialCommunityIcons
                    name='golf'
                    color={Colors.Primary}
                    size={25} />
              </View>
              )
            }else
            {
              return(
                <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <MaterialCommunityIcons
                    name='golf'
                    color={Colors.Black}
                    size={20} />
              </View>
              )
            }
          },
            
          })} />
      </BottomTab.Navigator>
    
    createHomeStack = () =>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={this.state.activo?CreateHomeBottomTabNavigator:Login}
          options={({ route }) => ({
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#104E81',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
              headerShown:false
          })} />
        <Stack.Screen name='RecuperaContrasena' component={RecuperaContrasena}
          options={({ route }) => ({
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#104E81',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
              headerShown:false
          })} />
          <Stack.Screen name='CambioContrasena' component={CambioContrasena}
          options={({ route }) => ({
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#104E81',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
              headerShown:false
          })} />
        <Stack.Screen name='RegisterView' component={RegisterView}
          options={({ route }) => ({
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#104E81',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
              headerShown:false
          })} />
        <Stack.Screen name='AddCourse' component={AddCourse}
          options={({ route }) => ({
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#104E81',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
              headerShown:false
          })} />
          <Stack.Screen name='InfoScreen' component={InfoScreen}
          options={({ route }) => ({
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#104E81',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
              headerShown:false
          })} />
          <Stack.Screen name='EditUserView' component={EditUserView}
          options={({ route }) => ({
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#104E81',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
              headerShown:false
          })} />
      </Stack.Navigator>

    if (this.state.isLoading) {
      // We haven't finished checking for the token yet
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
      {
        !this.state.conexion
        ?
        <View style={{height:25,backgroundColor:'#DC3A20',justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'white'}}>Sin conexión</Text>
        </View>
        :
        null
        }
        <Stack.Navigator
         headerMode="none">
          <Drawer.Screen name='Home' children={createHomeDrawer} options={{ title: 'Dragon Golf' }} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    )
  }
}