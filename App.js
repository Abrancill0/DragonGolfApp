import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, Alert, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer'

import SplashScreen from './src/screen/splashScreen/SplashScreen'

import { Icon } from 'react-native-elements'
import Login from './src/screen/indexStack/login/LoginView'
import RegisterView from './src/screen/indexStack/register/RegisterView'
import FlashMessage from "react-native-flash-message";

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();
var { width, height } = Dimensions.get('window');


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      logeado:false,
      isLoading:true,
      UsuNombre:'',
      UsuApellidoPaterno:'',
      UsuApelidoMaterno:'',
      UsuFoto:''
    }

    this.loadSesion = this.loadSesion.bind(this)


  }

  componentDidMount(){
    setTimeout(() => {
      this.loadSesion();
    },500)
  }


  loadSesion = async () => {

    try {
        let IDUsuario = await AsyncStorage.getItem('CLVUsuario')
        if (IDUsuario != null )
        {
          this.setState({
            logeado:true,
            isLoading:false,
          })
          //this.LoadUsuario(IDUsuario)
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
            let result=res.Result[0]
            this.setState({
              logeado:true,
              isLoading:false,
              UsuNombre:result.UsuNombre,
              UsuApellidoPaterno:result.UsuApellidoPaterno,
              UsuApelidoMaterno:result.UsuApelidoMaterno,
              UsuFoto:result.UsuFoto+'?'+Math.random()
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
            props.navigation.closeDrawer()
            this.setState({logeado:false})
          }
        },
      ],
      { cancelable: false }
    )
  }


  render() {

    console.warn(this.state.logeado)


    const DrawerContent = props => {
      return (

        <View style={{flex:1}}>
          <View style={{height:'90%',padding:20}}>
              {
              this.state.logeado
              ?
              <View style={{height:'25%',borderBottomWidth:1,borderBottomColor:'#0F222D',marginBottom:10}}>
                {
                  this.state.UsuFoto==null
                  ?
                  <TouchableOpacity onPress={() => props.navigation.navigate('Perfil')} style={{marginBottom:20,alignItems:'center'}}>
                      <FontAwesomeIcon name='user-circle' color='white' size={70}/>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => props.navigation.navigate('Perfil')} style={{marginBottom:20,height:70,width:70,alignSelf:'center'}}>
                      <Image source={{uri:'http://200.94.138.139:84'+this.state.UsuFoto}} resizeMode='cover' style={{flex:1,borderRadius:200}} height={undefined} width={undefined}/>
                  </TouchableOpacity>
                }
                <View>
                  <Text style={{textAlign:'center'}}>{this.state.UsuNombre+' '+this.state.UsuApellidoPaterno+' '+this.state.UsuApelidoMaterno}</Text>
                </View>
              </View>
              :
              null
              }
              <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                  <View style={{flex:.1}}>
                    <FontAwesomeIcon name='bank' color='#0F222D' size={20}/>
                  </View>
                <View style={{flex:.9}}>
                  <DrawerItem
                  label="Inicio"
                  onPress={() => props.navigation.closeDrawer()}
                  labelStyle={{color:'#0F222D'}} />
                </View>
              </TouchableOpacity> 
              {
              this.state.logeado
              ?
              <TouchableOpacity onPress={() => props.navigation.navigate('Perfil')} style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                  <View style={{flex:.1}}>
                    <FontAwesomeIcon name='user' color='#0F222D' size={20}/>
                  </View>
                <View style={{flex:.9}}>
                  <DrawerItem
                  label="Perfil"
                  onPress={() => props.navigation.navigate('Perfil')}
                  labelStyle={{color:'#0F222D'}} />
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
            style={{height:'10%',flexDirection:'row',alignItems:'center',backgroundColor:'#123c5b',padding:10}}>
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
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} >
        <Drawer.Screen name='createHomeStack' children={createHomeStack} options={{ title: 'Inicio' }} />
      </Drawer.Navigator>
    
    createHomeStack = () =>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}
          options={({ route }) => ({
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#104E81',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
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
            }
          })} />
      </Stack.Navigator>

    if (this.state.isLoading) {
      // We haven't finished checking for the token yet
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator
         headerMode="none">
          <Drawer.Screen name='Home' children={createHomeDrawer} options={{ title: 'Dragon Golf' }} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    )
  }
}