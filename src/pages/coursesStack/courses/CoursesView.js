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
import Fontisto from 'react-native-vector-icons/Fontisto';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { ListaCampos, EliminarCampo } from '../../../Services/Services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class RoundsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      language: 'es',
      value: '',
      courses: []
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
        this.ListadoCourses()
  }

  ListadoCourses = async () => {
    let idUsu = await AsyncStorage.getItem('usu_id')
    ListaCampos(idUsu)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDCourse,
                      nombre: item.Cou_Nombre,
                      nombreCorto: item.Cou_NombreCorto,
                      ciudad: item.Cou_Ciudad,
                      pais: item.Cou_Pais
                    }
                ))
                this.setState({
                    courses: list
                })
                this.arrayholder = list;
            }
        })
  }

  searchFilterFunction = text => {

    this.setState({
      value: text
    });

    const newData = this.arrayholder.filter(item => {
    const itemData = `${item.nombre} ${item.nombre.toUpperCase()}`;
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
                    backgroundColor: "#000",  
                }}  
            />  
        );  
    };

    renderHeader = () => {

    return (

      <View>

      <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b',fontWeight:'bold'}}>Buscar por: </Text>

      <SearchBar
        placeholder="Nombre..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
      <SearchBar
        placeholder="Nombre Corto..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
      <SearchBar
        placeholder="Ciudad..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
      <SearchBar
        placeholder="Pais..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
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

  Elimina(id){
    Alert.alert(
      "DragonGolf",
      "¿Está seguro de eliminar este campo?",
      [
        {
          text: "Cancelar",
          style: 'cancel',
        },
        {
          text: "Continuar",
          onPress: () => {
            EliminarCampo(id)
              .then((res) => {
                console.warn(res)
                  if(res.estatus == 1){
                  }
              })
          },
        },
      ],
      { cancelable: false }
    );
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
      emptyCourseList
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{padding:20}}>
              <MaterialIcon name={'menu'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> this.props.navigation.navigate('AddCourse')}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>
        {this.rowTranslateAnimatedValues && visible &&
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{
                  this.ListadoCourses()
                  this.setState({
                    value: ''
                  })
                }}
              />
            }
            data={this.state.courses}
            renderItem={({item}) =>
              <TouchableOpacity style={{padding:10}} onPress={()=> this.props.navigation.navigate('TeesView', {IDCourse: item.id})}>
                <View style={{flexDirection:'row',height:100,backgroundColor:'#f1f2f2',marginHorizontal:50,marginVertical:10}}>
                  <View style={{flex:.05,backgroundColor:'#123c5b'}}/>
                    
                    <View style={{flex:.85}}>
                      <View style={{flex:.6,justifyContent:'center',paddingHorizontal:10}}>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b',fontWeight:'bold'}}>{item.nombre}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.nombreCorto}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.ciudad}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat', color:'#123c5b'}}>{item.pais}</Text>
                      </View>
                    </View>
                    <View style={{flex:.2,padding:5}}>
                        <TouchableOpacity style={{flex:.4,padding:5,justifyContent:'center'}} onPress={()=> this.Elimina(item.id)}>
                          <FontAwesome name={'trash-o'} size={30} color={Colors.Primary} />
                        </TouchableOpacity>
                      {/*<View style={{flex:.5}}>
                        <Fontisto name={'world'} size={30} color={Colors.Primary} />
                      </View>*/}
                      <View style={{flex:.5}}>
                        <Fontisto name={'world-o'} size={30} color={Colors.Primary} />
                      </View>
                    </View>
                  </View>
              </TouchableOpacity>
              }
              //ListHeaderComponent={this.renderHeader}
              ListEmptyComponent={
              <ListEmptyComponent
                text={emptyCourseList[language]}
                iconName="golf"
              />
            }
          />}
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
