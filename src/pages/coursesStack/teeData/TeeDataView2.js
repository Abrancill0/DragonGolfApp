import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Colors from '../../../utils/Colors';
import DragonButton from '../../global/DragonButton';
import HolesComponent from './HolesComponent';
import { Dictionary } from '../../../utils/Dictionary';
import moment from 'moment';
import { actionSetHoles, actionSaveHoles, actionSaveYards } from '../../../store/actions';
import Database from '../../../database/database';
import * as Validations from '../../../utils/Validations';

const database = new Database();

class TeeDataView extends Component {
  constructor(props) {
    super(props);

    const {courseId} = props.navigation.state.params;
    
    let holes = [];
    let tee = props.navigation.state.params.tee;
    for (var i = 0; i < 18; i++) {
      holes.push({
        index: i,
        par: '',
        hole_number: (i + 1).toString(),
        adv: '',
        yards: '',
        tee_id: tee.id,
        id_sync: null,
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    
    this.state = {
      holes: holes,
      tee: tee
    };

    this.inputs = {};
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('Title'),
      tabBarVisible: false
    }
  };

  async componentDidMount(){
    const { tee } = this.props.navigation.state.params;
    const holes = await database.holesByTeeId(tee.id);
    if (holes.length==18){
      this.setState({ holes });
    }else {
      const listOfTees= await database.listTeeByCourseId(tee.course_id);
      if (listOfTees.length > 0){
        let firstHoles = [];
        for (let index = 0; index < listOfTees.length; index++) {
          firstHoles = await database.holesByTeeId(listOfTees[index].id);
          if(firstHoles.length > 0) break;
        }
        if (firstHoles.length > 0) {
          let newHoles = [];
          for (var i = 0; i < 18; i++) {
            newHoles.push({
              index: i,
              par: firstHoles[i].par,
              hole_number: (i + 1).toString(),
              adv: firstHoles[i].adv,
              yards: '',
              tee_id: tee.id,
              id_sync: null,
              ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
            }); 
          }
          this.setState({ 
            holes: newHoles 
          });
        }
      }
    }
  }

  render() {

    const {
      holes,
      tee
    } = this.state;

    const {
      language
    } = this.props;

    const {
      save
    } = Dictionary;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'} >
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
        <View style={styles.bottomButtom}>
          <DragonButton
            title={save[language]}
            onPress={this.submit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  changeValues = (index, type, value) => {
      let holes = this.state.holes;
      holes[index][type] = value;
      this.setState({holes});
  }

  existAdv = (index, adv) => {
    const {holes} = this.state;
    for (let i = 0; i < holes.length; i++) {
      if(i != index){
        if(adv == holes[i].adv){
          return true;
        }
      }
    }
    return false;
  }

  intValidation = (type) => {
    const {holes} = this.state;
    for (let index = 0; index < holes.length; index++) {
      const num = holes[index][type];
      if(num === '') num = 1;
      const response = Validations.intNumberValidation(num);
      if(!response.ok){
        return {
          ok: false,
          index,
          type
        };
      }
    }

    return {ok: true};
  }

  floatValidation = (type) => {
    const {holes} = this.state;
    for (let index = 0; index < holes.length; index++) {
      const num = holes[index][type];
      if(num === '') num = 1;
      const response = Validations.floatNumberValidation(num);
      if(!response.ok){
        return {
          ok: false,
          index,
          type
        };
      }
    }

    return {ok: true};
  }

  yardsValidation = () => {
    const {tee} = this.state;
    for (let index = 0; index < 18; index++) {
      const num = tee[`hole_${index+1}`];
      if(num === '') num = 1;
      const response = Validations.intNumberValidation(num);
      if(!response.ok){
        return {
          ok: false,
          index
        };
      }
    }

    return {ok: true};
  }

  repeatedAdv = () => {
    const {holes} = this.state;
    const advArray = holes.map(item => item.adv);
    const isDuplicate = advArray.some((item, index) => {
      if(item) return advArray.indexOf(item) != index;
    });
    
    return isDuplicate;
  }

  parRangeValidation = () => {
    const {holes} = this.state;
    let totalPar = 0;
    holes.map(item => totalPar += item.par ? parseInt(item.par) : 0);

    if(totalPar < 70 || totalPar > 74) return {ok: false};

    return {ok: true}
  }

  submit = () => {
    const {language} = this.props;

    const parValidation = this.intValidation('par');
    if(!parValidation.ok){
      Alert.alert(
        'Error',
        Dictionary.verifyField[language] + 'par ' + (parValidation.index + 1),
      );
      return;
    }

    const parRangeValidation = this.parRangeValidation();
    if(!parRangeValidation.ok){
      Alert.alert(
        'Error',
        Dictionary.parRangeError[language]
      );
      return;
    }

    const advValidation = this.intValidation('adv');
    if(!advValidation.ok){
      Alert.alert(
        'Error',
        Dictionary.verifyField[language] + 'adv ' + (advValidation.index + 1),
      );
      return;
    }

    const advRepeated = this.repeatedAdv();
    if(advRepeated){
      Alert.alert(
        'Error',
        Dictionary.advRepeat[language],
      );
      return;
    }

    const yardsValidation = this.intValidation('yards');
    if(!yardsValidation.ok){
      Alert.alert(
        'Error',
        Dictionary.verifyField[language] + 'yds ' + (yardsValidation.index + 1),
      );
      return;
    }

    const { tee } = this.props.navigation.state.params;
    let teeId=tee.id;
    this.props.saveHoles({teeId, holes: this.state.holes});
  }
}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  holes: state.reducerHoles,
});

const mapDispatchToProps = dispatch => ({
  setHoles: (values) => {
    dispatch(actionSetHoles(values));
  },
  saveHoles: (values) => {
    dispatch(actionSaveHoles(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeeDataView);
