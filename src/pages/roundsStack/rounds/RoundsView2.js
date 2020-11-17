import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
  NativeModules,
  TouchableOpacity,
  Text
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Dictionary } from '../../../utils/Dictionary';
import { NavigationEvents } from 'react-navigation';
import HeaderButton from '../../global/HeaderButton';
import RoundComponent from './RoundComponent';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import { SwipeListView } from 'react-native-swipe-list-view';
import HideItem from '../../global/HideItem';
import Snackbar from 'react-native-snackbar';
import Colors from '../../../utils/Colors';
import { ListarRonda } from '../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';

class RoundsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      language: 'es'
    };

    //props.setForceInset('always');

    //props.getRounds();
    this.isDeleting = false;
    this.isEditing = false;
    this.hideSnackbar = null;

    this.rowTranslateAnimatedValues = null;

    Dimensions.addEventListener('change', () => {
      this.setState({ visible: false });
      let timeout = setTimeout(() => {
        this.setState({ visible: true });
        clearTimeout(timeout);
      }, 50);
    });

  }

  componentDidMount(){
    this.ListarRonda()
  }

  ListarRonda = async () => {
    let idUsu = await AsyncStorage.getItem('usu_id')
    ListarRonda(idUsu)
        .then((res) => {
          console.warn(res)
            /*if(res.estatus == 1){
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
            }*/
        })
  }

  render() {

    const {
      visible,
      language
    } = this.state;

    const {
      rounds,
      courses,
      setRound,
      setCourse,
      getRounds,
      setLoadingRound
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
            <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.openDrawer()}>
              <MaterialIcon name={'menu'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
          <Text style={{ padding:20, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>My Rounds</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{margin:20, marginTop:40, justifyContent:'flex-end'}} onPress={()=> this.props.navigation.navigate('CoursesViewRounds')}>
              <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>
          <SwipeListView
            data={rounds}
            extraData={rounds}
            keyExtractor={item => item.id.toString()}
            style={{ flex: 1, paddingVertical: 5 }}
            renderItem={({ item }) => (
              <RoundComponent
                item={item}
                courses={courses}
                language={language}
                setRound={setRound}
                setCourse={setCourse}
                height={this.rowTranslateAnimatedValues[`${item.id}`].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 70],
                })}
                opacity={this.rowTranslateAnimatedValues[`${item.id}`]}
                setLoadingRound={setLoadingRound}
              />
            )}
            ListEmptyComponent={
              <ListEmptyComponent
                text={Dictionary.emptyRoundList[language]}
                iconName="golf-ball"
                iconFamily='font-awesome'
              />
            }
            renderHiddenItem={({ item }) => (
              <HideItem
                item={item}
                height={this.rowTranslateAnimatedValues[`${item.id}`].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 70],
                })}
                opacity={this.rowTranslateAnimatedValues[`${item.id}`]}
              />
            )}
            disableRightSwipe
            stopRightSwipe={-(Dimensions.get('window').width * .5)}
            onSwipeValueChange={this.onSwipeValueChange}
          />
      </View>
    );
  }

  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: Dictionary.rounds[this.props.language]
    });
  }

  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;

    if (value < -(Dimensions.get('window').width * .5 - 1) && !this.isDeleting) {
      clearInterval(this.hideSnackbar);
      this.deleteCourse(key);
    }
  }

  deleteCourse = (key) => {
    this.isDeleting = true;
    Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
      const { rounds } = this.props;
      const index = rounds.findIndex(item => item.id == key);
      this.hideSnackbar = setTimeout(() => {
        Snackbar.dismiss();
        rounds.splice(index, 1);
        this.props.updateRounds(rounds);
        this.props.deleteRound(key);
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

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  userData: state.reducerUserData,
  rounds: state.reducerRounds,
  courses: state.reducerCourses
});

export default RoundsView;
