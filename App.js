import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, Alert, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer'

import SplashScreen from './src/screen/splashScreen/SplashScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { Icon } from 'react-native-elements'
import Login from './src/screen/indexStack/login/LoginView'
import RecuperaContrasena from './src/screen/indexStack/login/RecuperaContrasena'
import CambioContrasena from './src/screen/indexStack/login/CambioContrasena'
import RegisterView from './src/screen/indexStack/register/RegisterView'
//import RoundTab from './src/routes/RoundTab'
import SettingsView from './src/pages/settingsStack/settings/SettingsView'
import CoursesView from './src/pages/coursesStack/courses/CoursesView'
import CoursesViewRounds from './src/pages/roundsStack/courses/CoursesViewRound'
import PlayersView from './src/pages/playersStack/players/PlayersView'
import NotificationsView from './src/pages/playersStack/players/NotificationsView'
import PlayersViewRounds from './src/pages/roundsStack/players/PlayersView'
import PlayersViewRoundsList from './src/pages/roundsStack/players/PlayersViewRound'
import PlayersViewRoundsList2 from './src/pages/roundsStack/players/PlayersViewRound2'
import StrokesView from './src/pages/roundsStack/players/StrokesView'
import ScoreView from './src/pages/roundsStack/score/ScoreView'
import BetsView from './src/pages/roundsStack/bets/BetsView'
import SNBetListComponent from './src/pages/roundsStack/bets/SingleNassau/SNBetListComponent'
import SNBetView from './src/pages/roundsStack/bets/SingleNassau/SNBetView'
import TeesView from './src/pages/coursesStack/tees/TeesView'
import TeesViewRound from './src/pages/roundsStack/players/TeesView'
import TeeDataView from './src/pages/coursesStack/teeData/TeeDataView'
import TeeDataViewRound from './src/pages/roundsStack/players/TeeDataView'
import AddCourse from './src/pages/coursesStack/addCourse/AddCourseView'
import AddPlayer from './src/pages/playersStack/addPlayer/AddPlayerView'
import PlayerInfo from './src/pages/playersStack/playerInfo/PlayerInfoView'
import AddTee from './src/pages/coursesStack/addTee/AddTeeView'
import EditTee from './src/pages/coursesStack/addTee/EditTeeView'
import AddHole from './src/pages/coursesStack/teeData/AddHoleView'
import EditHole from './src/pages/coursesStack/teeData/EditHoleView'
import CreateCourse from './src/pages/coursesStack/addCourse/CreateCourseView'
import RegisterPlayer from './src/screen/indexStack/register/RegisterPlayer'
import EditCourse from './src/pages/coursesStack/addCourse/EditCourseView'
import InfoScreen from './src/pages/InfoScreen/InfoScreen';
import EditUserView from './src/pages/settingsStack/editUser/EditUserView';
import EditPlayerView from './src/pages/playersStack/editPlayer/EditPlayerView';
import configureRounds from './src/pages/roundsStack/configRound/ConfigRoundView'
import FlashMessage from "react-native-flash-message";

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { showMessage } from "react-native-flash-message";

import AsyncStorage from '@react-native-community/async-storage';

import RoundsStack from './src/pages/roundsStack/rounds/RoundsView';
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
import { InfoUsuarioAB } from './src/Services/Services';
import NetInfo from "@react-native-community/netinfo";
import RNRestart from 'react-native-restart'
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({ name: "a", createFromLocation: "~DragonGolf.db" });

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();
var { width, height } = Dimensions.get('window');
const BottomTab = createBottomTabNavigator();
const BlankProfile = require('./assets/globals/blank-profile.png');

const {
      home,
      profile,
      notifications,
      signOutAsk,
      signOut,
      cancel,
      continuar
    } = Dictionary;


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      language:'es',
      logeado:false,
      isLoading:true,
      UsuNombre:'',
      UsuApellidoPaterno:'',
      UsuApelidoMaterno:'',
      UsuFoto:'',
      conexion: true,
      userData:[]
    }

    //this.loadSesion = this.loadSesion.bind(this)
    //this.getUserData = this.getUserData.bind(this)


  }

  handleConnectivityChange = (connection) => {
    if(connection.isInternetReachable)
    {
        this.setState({
          conexion:true
        })
        //this.loadSesion()
    }
    else if(connection.isInternetReachable==false)
    {
      this.setState({
        conexion:false
      })
        //this.loadSesionLocal()
    }
  };

  componentDidMount() {
    this.loadSesion()//this.netinfoUnsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
  }

  getUserData = async () => {
    const token = await AsyncStorage.getItem('usu_id')
    if(this.state.conexion){
    InfoUsuarioAB(token)
    .then((res) => {
        if(res.estatus==1){

            const lista =[
            {
              id: res.Result[0].IDUsuario,
              name: res.Result[0].usu_nombre,
              last_name: res.Result[0].usu_apellido_paterno,
              last_name2: res.Result[0].usu_apellido_materno,
              nick_name: res.Result[0].usu_nickname,
              email: res.Result[0].usu_email,
              ghin_number: res.Result[0].usu_ghinnumber,
              handicap: res.Result[0].usu_handicapindex,
              cellphone:res.Result[0].usu_telefono,
              photo: 'http://13.90.32.51/DragonGolfBackEnd/images' + res.Result[0].usu_imagen,
              language: res.Result[0].set_idioma
            }]
            this.setState({
            userData: lista[0]
          })
        }  
      })
    }
    else{
      this.LoadUsuarioLocal(token)
    }
  }

  loadSesion = async () => {

    try {
        let IDUsuario = await AsyncStorage.getItem('usu_id')
        const language = await AsyncStorage.getItem('language')
        if (language != null )
        {
          this.setState({
            language:language
          })
        }
        console.warn('lan: '+language)
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
    InfoUsuarioAB(CLVUsuario)
    .then((res) => {
        if(res.estatus==1){
          //console.warn(res)
            let result=res.Result[0]
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
              id: result.IDUsuario,
              name: result.usu_nombre,
              last_name: result.usu_apellido_paterno,
              last_name2: result.usu_apellido_materno,
              nick_name: result.usu_nickname,
              email: result.usu_email,
              ghin_number: result.usu_ghinnumber,
              handicap: result.usu_handicapindex,
              cellphone:result.usu_telefono,
              language: result.set_idioma,
              photo: 'http://13.90.32.51/DragonGolfBackEnd/images' + result.usu_imagen,
              //language: result.set_idioma.substring(0,2)
            }]
            //console.warn(result)
            this.setState({
            userData: lista[0],
            language: lista[0].language
          })
        }  
        else{
            this.setState({
              isLoading:false
            })
            showMessage({
                message: res.mensaje,
                type: 'info',
            });
        }
    }).catch(error=>{
        this.setState({
          isLoading:false
        })
        showMessage({
            message: "Error de conexión" + error,
            type:'error',
        });
    })
  }



  loadSesionLocal = async () => {

    try {
        let IDUsuario = await AsyncStorage.getItem('usu_id')
        //console.warn(IDUsuario)
        if (IDUsuario != null )
        {
          this.setState({
            logeado:true,
            isLoading:false,
            activo:true
          })
          this.LoadUsuarioLocal(IDUsuario)
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

  LoadUsuarioLocal(CLVUsuario) 
  {
    try{
      db.transaction((tx) => {

      let sql = `SELECT * FROM Usuario`
      //console.warn(sql)
      tx.executeSql(sql, [], (tx, results) => {
        //console.warn('Consulta OK')
        //console.warn(results)

        var len = results.rows.length;

        const tempticket = [];

        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          //console.warn(row)

          this.setState({
              logeado:true,
              isLoading:false,
              UsuNombre:row.FirstName,
              UsuApellidoPaterno:row.FirstLastName,
              UsuApelidoMaterno:row.LastName
              //UsuFoto:result.UsuFoto+'?'+Math.random()
            })

          const lista =[
            {
              id: row.OnlineId,
              name: row.FirstName,
              last_name: row.FirstLastName,
              last_name2: row.LastName,
              nick_name: row.Nickname,
              email: row.Email,
              ghin_number: row.GhinNumber,
              handicap: row.Handicap,
              cellphone:row.Cellphone,
              password:row.Password,
              //photo: 'http://13.90.32.51/DragonGolfBackEnd/images' + res.Result[0].usu_imagen
            }]

          this.setState({
            userData: lista[0]
          })
        }
      });
      //console.warn(tx)
    }) 
    }
    catch(e){
      //console.warn(e)
    }
  }

  closeSesion(props){
    Alert.alert(
      'Dragon Golf',
      signOutAsk[this.state.language],
      [
        { text: cancel[this.state.language], onPress: () => { return null } },
        {
          text: continuar[this.state.language], onPress: () => {
            AsyncStorage.clear();
            RNRestart.Restart();
          }
        },
      ],
      { cancelable: false }
    )
  }


  render() {

    const Tab = createMaterialTopTabNavigator();

    function RoundTab() {
      return (
        <BottomTab.Navigator tabBarOptions={{showLabel:false}}>
          <BottomTab.Screen name="Settings" component={PlayersViewRoundsList2} 
          options={({ route }) => ({
            tabBarIcon:({ focused })=>{
            if(focused==true)
            {
              return(
              <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <FontAwesome5
                    name='user-friends'
                    color={Colors.Primary}
                    size={25} />
              </View>
              )
            }else
            {
              return(
                <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <FontAwesome5
                    name='user-friends'
                    color={Colors.Black}
                    size={20} />
              </View>
              )
            }
          },
          })}
          />
          <BottomTab.Screen name="ScoreView" component={ScoreView} 
          options={({ route }) => ({
            tabBarIcon:({ focused })=>{
            if(focused==true)
            {
              return(
              <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <MaterialCommunityIcons
                    name='scoreboard'
                    color={Colors.Primary}
                    size={30} />
              </View>
              )
            }else
            {
              return(
                <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <MaterialCommunityIcons
                    name='scoreboard'
                    color={Colors.Black}
                    size={25} />
              </View>
              )
            }
          },
          })}
          />
          <BottomTab.Screen name="BetsView" component={BetsView} 
          options={({ route }) => ({
            tabBarIcon:({ focused })=>{
            if(focused==true)
            {
              return(
              <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <FontAwesomeIcon
                    name='money'
                    color={Colors.Primary}
                    size={30} />
              </View>
              )
            }else
            {
              return(
                <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <FontAwesomeIcon
                    name='money'
                    color={Colors.Black}
                    size={25} />
              </View>
              )
            }
          },
          })}
          />
        </BottomTab.Navigator>
      );
    }


    const DrawerContent = props => {
      const {
        userData
      } = this.state;
      return (
        <View style={{flex:1}}>
          <View style={{height:'90%',padding:20}}>
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
              <View>
              <TouchableOpacity  style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                  <View style={{flex:.1}}>
                    <FontAwesomeIcon name='bank' color='#0F222D' size={20}/>
                  </View>
                <View style={{flex:.9}}>
                  <DrawerItem
                  label={home[this.state.language]}
                  onPress={() => props.navigation.closeDrawer()}
                  labelStyle={{color:Colors.Primary}} />
                </View>
              </TouchableOpacity> 
              <TouchableOpacity style={{width:'100%',flexDirection:'row',alignItems:'center'}} onPress={()=> props.navigation.navigate('EditUserView', {userData:userData, language:userData.language, getUserData:this.getUserData})}>
                  <View style={{flex:.1}}>
                    <FontAwesomeIcon name='user' color='#0F222D' size={20}/>
                  </View>
                <View style={{flex:.9}}>
                  <DrawerItem
                  label={profile[this.state.language]}
                  labelStyle={{color:Colors.Primary}}
                  onPress={()=> props.navigation.navigate('EditUserView', {userData:userData, language:userData.language, getUserData:this.getUserData})} />
                </View>
              </TouchableOpacity> 
              <TouchableOpacity style={{width:'100%',flexDirection:'row',alignItems:'center'}} onPress={()=> props.navigation.navigate('NotificationsView')}>
                  <View style={{flex:.1}}>
                    <MaterialIcons name='notifications' color='#0F222D' size={20}/>
                  </View>
                <View style={{flex:.9}}>
                  <DrawerItem
                  label={notifications[this.state.language]}
                  labelStyle={{color:Colors.Primary}}
                  onPress={()=> props.navigation.navigate('NotificationsView')}/>
                </View>
              </TouchableOpacity> 
              </View>
          </View>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => this.closeSesion(props)}
            style={{height:'10%',flexDirection:'row',alignItems:'center',backgroundColor:Colors.Primary,padding:10}}>
              <View style={{flex:.1}}>
                  <FontAwesomeIcon name='sign-out' color='white' size={20}/>
              </View>
              <View style={{flex:.9}}>
                <DrawerItem
                label={signOut[this.state.language]}
                onPress={() => this.closeSesion(props)}
                labelStyle={{color:'white'}} />
              </View> 
          </TouchableOpacity> 
        </View>
      )
    }

    createHomeDrawer = () =>
      <Drawer.Navigator drawerType='back' drawerContent={(props) => <DrawerContent {...props} />}>
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
        <BottomTab.Screen name='PlayersView' component={PlayersView} 
          options={({ route }) => ({
            tabBarIcon:({ focused })=>{
            if(focused==true)
            {
              return(
              <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <FontAwesome5
                    name='user-friends'
                    color={Colors.Primary}
                    size={25} />
              </View>
              )
            }else
            {
              return(
                <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <FontAwesome5
                    name='user-friends'
                    color={Colors.Black}
                    size={20} />
              </View>
              )
            }
          },
          })} />
        <BottomTab.Screen name='RoundsStack' component={RoundsStack} 
          options={({ route }) => ({
            tabBarIcon:({ focused })=>{
            if(focused==true)
            {
              return(
              <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <FontAwesome5
                    name='golf-ball'
                    color={Colors.Primary}
                    size={25} />
              </View>
              )
            }else
            {
              return(
                <View style={{height:'60%',width:'60%', alignItems:'center'}}>
                  <FontAwesome5
                    name='golf-ball'
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
        <Stack.Screen name='RoundTab' component={RoundTab}
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
          <Stack.Screen name='AddPlayer' component={AddPlayer}
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
          <Stack.Screen name='PlayerInfo' component={PlayerInfo}
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
          <Stack.Screen name='AddTee' component={AddTee}
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
          <Stack.Screen name='EditTee' component={EditTee}
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
          <Stack.Screen name='AddHole' component={AddHole}
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
          <Stack.Screen name='EditHole' component={EditHole}
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
          <Stack.Screen name='TeesView' component={TeesView}
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
          <Stack.Screen name='TeesViewRound' component={TeesViewRound}
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
          <Stack.Screen name='TeeDataView' component={TeeDataView}
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
          <Stack.Screen name='SNBetView' component={SNBetView}
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
          <Stack.Screen name='TeeDataViewRound' component={TeeDataViewRound}
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
          <Stack.Screen name='CreateCourse' component={CreateCourse}
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
          <Stack.Screen name='RegisterPlayer' component={RegisterPlayer}
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
          <Stack.Screen name='EditCourse' component={EditCourse}
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
          <Stack.Screen name='CoursesViewRounds' component={CoursesViewRounds}
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
          <Stack.Screen name='PlayersViewRounds' component={PlayersViewRounds}
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
          <Stack.Screen name='NotificationsView' component={NotificationsView}
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
          <Stack.Screen name='PlayersViewRoundsList' component={PlayersViewRoundsList}
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
          <Stack.Screen name='PlayersViewRoundsList2' component={PlayersViewRoundsList2}
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
          <Stack.Screen name='StrokesView' component={StrokesView}
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
        <Stack.Screen name='EditPlayerView' component={EditPlayerView}
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
        <Stack.Screen name='configureRounds' component={configureRounds}
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
      {/*
        !this.state.conexion
        ?
        <View style={{height:25,backgroundColor:'#DC3A20',justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'white'}}>Sin conexión</Text>
        </View>
        :
        null
        */}
        <Stack.Navigator
         headerMode="none">
          <Drawer.Screen name='Home' children={createHomeDrawer} options={{ title: 'Dragon Golf' }} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    )
  }
}