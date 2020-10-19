import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import HolesComponent from './HolesComponent';
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import Colors from '../../../utils/Colors';
import DragonButton from '../../global/DragonButton';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { ListaHole } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class RoundsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      language: 'es',
      value: '',
      holes: [],
      IDTees: props.route.params.IDTees,
      NameTee: props.route.params.NameTee
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
        this.ListadoHoles()
  }

  ListadoHoles = async () => {
    ListaHole(this.state.IDTees)
        .then((res) => {
          console.warn(res)
            /*if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDTees,
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
            }*/
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
      visible,
      holes
    } = this.state;

    const {
      language,
      courses,
      IDTees,
      NameTee
    } = this.state;

    const {
      emptyHoles
    } = Dictionary;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'} >

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{padding:20}} onPress={()=> this.props.navigation.goBack()}>
              <MaterialIcon name={'arrow-back'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{padding:20, justifyContent:'flex-end'}} onPress={()=> this.props.navigation.navigate('AddHole', {IDTees:IDTees, NameTee:NameTee})}>
              <MaterialIcon name={'add'} size={30} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          style={{ alignSelf: 'center' }}
          keyboardShouldPersistTaps='always'
          keyboardDismissMode='none'
          showsHorizontalScrollIndicator={false}
          style={{width: '100%'}}
        >
          <View style={{width: Dimensions.get('screen').width, alignItems: 'center'}}>
            <View style={styles.holesHeader}>
              <View style={styles.rectangleElement}>
                <Text style={styles.holeText}>Hole</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Par</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Adv</Text>
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Yds</Text>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width: '100%'}}
              ref={ref => this.scroll = ref}
            >
              {holes.map(item => 
                  <HolesComponent
                    key={item.hole_number}
                    item={item}
                    changeValues={this.changeValues}
                    existAdv={this.existAdv}
                    inputs={this.inputs}
                    language={language}
                    scrollToEnd={_ => this.scroll.scrollToEnd()}
                  />
                )
              }
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
