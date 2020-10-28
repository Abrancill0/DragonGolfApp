import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Animated,
  Dimensions,
  Alert,
  TouchableOpacity,
  RefreshControl,
  Text
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Dictionary } from '../../../utils/Dictionary';
import HeaderButton from '../../global/HeaderButton';
//import CourseComponent from './CourseComponent';
import { NavigationEvents } from 'react-navigation';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import HideItem from '../../global/HideItem';
import Snackbar from 'react-native-snackbar';
import Colors from '../../../utils/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { ListaJugadores, AltaAmigos, QuitarAmigos } from '../../../Services/Services'
import styles from './styles';
import DragonButton from '../../global/DragonButton';
import { showMessage } from "react-native-flash-message";

class RoundsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      language: 'es',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      courses: [],
      search: false
    };
    
    this.arrayholder = [];

    //props.getCourses();
    this.isDeleting = false;
    this.isEditing = false;
    this.hideSnackbar = null;

    this.rowTranslateAnimatedValues = true;

    Dimensions.addEventListener('change', () => {
      this.setState({ visible: false });
      let timeout = setTimeout(() => {
        this.setState({ visible: true });
        clearTimeout(timeout);
      }, 50);
    })
  }

  componentDidMount(){
        this.ListadoJugadores()
  }

  Agrega = async (IDUsuarioFav) => {
    let idUsu = await AsyncStorage.getItem('usu_id')
    Alert.alert(
      "DragonGolf",
      "¿Desea agregar este jugador a su lista de amigos?",
      [
        {
          text: "Cancelar",
          onPress: () => {
          },
        },
        {
          text: "Agregar",
          onPress: () => {
            AltaAmigos(IDUsuarioFav,idUsu,1)
                .then((res) => {
                  console.warn(res)
                    if(res.estatus == 1){
                      showMessage({
                        message: "Jugador agregado correctamente",
                        type:'success',
                      });
                      this.props.navigation.navigate("PlayersView")
                    }
                })
          },
        }
      ],
      { cancelable: false }
    );
  }

  Elimina = async (IDUsuarioFav) => {
    let idUsu = await AsyncStorage.getItem('usu_id')
    Alert.alert(
      "DragonGolf",
      "¿Desea eliminar este jugador de su lista de amigos?",
      [
        {
          text: "Cancelar",
          onPress: () => {
          },
        },
        {
          text: "Eliminar",
          onPress: () => {
            QuitarAmigos(IDUsuarioFav,idUsu)
                .then((res) => {
                  console.warn(res)
                    if(res.estatus == 1){
                      showMessage({
                        message: "Jugador eliminado correctamente",
                        type:'success',
                      });
                      this.props.navigation.navigate("PlayersView")
                    }
                })
          },
        }
      ],
      { cancelable: false }
    );
  }

  ListadoJugadores = async () => {
    let idUsu = await AsyncStorage.getItem('usu_id')
    ListaJugadores(idUsu)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDUsuario,
                      nombre: item.usu_nombre,
                      apellido: item.usu_apellido_paterno,
                      nickname: item.usu_nickname,
                      email: item.usu_email
                    }
                ))
                this.setState({
                    courses: list
                })
                this.arrayholder = list;
            }
        })
  }

  searchFilterFunction = (text,busqueda) => {

    console.warn(busqueda)

    const newData = this.arrayholder.filter(item => {
    let itemData = ""
    switch(busqueda){
      case 1:
        this.setState({
          value1: text
        }); 
        itemData = `${item.nombre} ${item.nombre.toUpperCase()}`;
        break;
      case 2:
        this.setState({
          value2: text
        });  
        itemData = `${item.apellido} ${item.apellido.toUpperCase()}`;
        break;
      case 3:
        this.setState({
          value3: text
        }); 
        itemData = `${item.nickname} ${item.nickname.toUpperCase()}`;
        break;
      case 4:
        this.setState({
          value4: text
        }); 
        itemData = `${item.email} ${item.email.toUpperCase()}`;
        break;
    }
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;

    });

    console.warn(newData)

    this.setState({ courses: newData });

    
  };

   renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "white",  
                }}  
            />  
        );  
    };

    renderHeader = () => {

    return (

      <View>

      <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:Colors.Primary,fontWeight:'bold', marginHorizontal:50}}>Buscar por: </Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent: "flex-end"}} onPress={()=> this.setState({search:!this.state.search})}>
              <Entypo name={this.state.search?'chevron-thin-up':'chevron-thin-down'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>

      {this.state.search && <View>
      <SearchBar
        placeholder="Nombre"
        onChangeText={text => this.searchFilterFunction(text, 1)}
        autoCorrect={false}
        value={this.state.value1}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:0.5}}
      />
      <SearchBar
        placeholder="Apellido"
        onChangeText={text => this.searchFilterFunction(text, 2)}
        autoCorrect={false}
        value={this.state.value2}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:0.8}}
      />
      <SearchBar
        placeholder="Nickname"
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text, 3)}
        autoCorrect={false}
        value={this.state.value3}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:0,
        borderBottomWidth:1}}
      />
      <SearchBar
        placeholder="Email"
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text, 4)}
        autoCorrect={false}
        value={this.state.value4}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
        marginHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderTopWidth:1,
        borderBottomWidth:2}}
      />
      </View>}
      </View>
    );
  };

  static navigationOptions = ({ navigation }) => {
    const state = store.getState();
    const language = state.reducerLanguage;
    return {
      title: navigation.getParam('Title', Dictionary.courses[language]),
      headerRight: (
        <HeaderButton
          iconName="ios-add"
          onPress={() => navigation.navigate('AddCourseView')}
        />
      )
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.courses !== this.props.courses) {
      this.rowTranslateAnimatedValues = {}
      nextProps.courses.map(item => {
        this.rowTranslateAnimatedValues[`${item.id}`] = new Animated.Value(1);
      });
    }
  }

  render() {

    const {
      visible
    } = this.state;

    const {
      language,
      courses
    } = this.state;

    const {
      emptyPlayerList,
      create
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{padding:20}} onPress={()=> this.props.navigation.goBack()}>
              <MaterialIcon name={'arrow-back'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View> 
          <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
          <Text style={{ padding:20, fontSize: 16, fontFamily: 'Montserrat',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>All Players</Text>
          </View>
          {/*<View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> this.props.navigation.navigate('AddCourse')}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>*/}
        </View>
        {this.rowTranslateAnimatedValues && visible &&
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  this.ListadoJugadores()
                  this.setState({
                    value1: '',
                    value2: '',
                    value3: '',
                    value4: ''
                  })
                }}
              />
            }
            data={this.state.courses}
            renderItem={({item}) =>
            <View style={{flex:.2,padding:5}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
              <TouchableOpacity activeOpacity={0} /*onPress={()=> this.props.navigation.navigate('DetallePlacas', {nombre:item.nombre, modelo:item.modelo, placas:item.placas, hora:item.hora, latitud:item.latitud, longitud:item.longitud})}*/>
                <View style={{width: ScreenWidth,flexDirection:'row',height:100,backgroundColor:'#f1f2f2',marginHorizontal:50,marginVertical:10}}>
                  <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                    
                    <View style={{flex:.85}}>
                      <View style={{flex:.6,justifyContent:'center',paddingHorizontal:10}}>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b',fontWeight:'bold'}}>{item.nombre}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.apellido}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.nickname}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.email}</Text>
                      </View>
                    </View>
                    <View style={{flex:.2,padding:5}}>
                      <TouchableOpacity style={{flex:.5}} onPress={()=> this.Agrega(item.id)}>
                        <Fontisto name={'cloud-down'} size={30} color={Colors.Primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
              </TouchableOpacity>
            <View style={{flexDirection:'row', backgroundColor: 'red',height: 90, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> Elimina(item.id)}>
                <FontAwesome name={'trash-o'} size={30} color={Colors.White} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
              }
              ListHeaderComponent={this.renderHeader}
              ListEmptyComponent={
              <View style={styles.emptyView}>
                  <FontAwesome5 name={"user-friends"} size={50} color="red" />
                <Text style={styles.emptyText}>{emptyPlayerList[language]}</Text>
              </View>
            }
          />}
          <View style={styles.bottomButtom}>
            <DragonButton title={create[language]} onPress={()=>this.props.navigation.navigate('RegisterPlayer', {language:language})} />
          </View>
      </View>
    );
  }

  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: Dictionary.courses[this.props.language]
    });
  }

  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value > Dimensions.get('window').width * .5 - 50 && !this.isEditing) {
      this.editCourse(key);
    }

    if (value < -(Dimensions.get('window').width * .5 - 1) && !this.isDeleting) {
      clearInterval(this.hideSnackbar);
      this.deleteValidation(key);
    }
  }

  editCourse = (key) => {
    this.isEditing = true;
    const { courses } = this.props;
    const index = courses.findIndex(item => item.id == key);
    this.props.navigation.navigate('AddCourseView', { course: courses[index] });
    this.isEditing = false;
  }

  deleteValidation = (key) => {
    this.isDeleting = true;
    const courseidx = this.props.rounds.findIndex(item => item.course_id == key);
    if (courseidx < 0) {
      this.deleteCourse(key);
    } else {
      Alert.alert(
        Dictionary.alert[this.props.language],
        Dictionary.deleteCourseWithRound[this.props.language],
        [
          { text: Dictionary.cancel[this.props.language], style: 'cancel', onPress: _ => this.isDeleting = false },
          { text: Dictionary.deleteAnyway[this.props.language], style: 'destructive', onPress: _ => this.deleteCourse(key) }
        ],
        {cancelable: false}
      );
    }
  }

  deleteCourse = (key) => {
    this.isDeleting = true;
    Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
      const { courses } = this.props;
      const index = courses.findIndex(item => item.id == key);
      this.hideSnackbar = setTimeout(() => {
        Snackbar.dismiss();
        courses.splice(index, 1);
        this.props.updateCourses(courses);
        this.props.deleteCourse(key);
        this.isDeleting = false;
        console.log('terminó')
      }, 5000);
      Snackbar.show({
        text: `1 ${Dictionary.removed[this.props.language]}`,
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: Dictionary.undo[this.props.language],
          textColor: Colors.Secondary,
          onPress: () => {
            Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 1, duration: 200 }).start();
            this.isDeleting = false;
            clearTimeout(this.hideSnackbar);
          },
        },
      });
    });
  }
}

export default RoundsView;
