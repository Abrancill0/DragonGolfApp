import React, { Component } from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Switch,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import Colors from '../../../utils/Colors';
import { ButtonGroup } from 'react-native-elements';
import HeaderButton from '../../global/HeaderButton';
import Entypo from 'react-native-vector-icons/Entypo';
import Details from '../../../utils/Details';

class ConfigRoundView extends Component {
  constructor(props) {
    super(props);

    let monthDay = '';
    let title = '';
    let selectedButton = 0;
    let holeNumber = 1;
    let switchAdv = false;
    let pickerDate = moment().toDate();
    let pickerTextDate = moment().format(props.language === 'es' ? 'DD/MM/YYYY' : 'MM/DD/YYYY');

    this.hcpAdjustment = [1, 0.95, 0.90, 0.85, 0.80];

    if (props.round) {
      this.courseName = props.round.course_name;
      monthDay = this.formatDate(moment(props.round.date).toDate() / 1000);
      title = props.round.name;
      selectedButton = this.hcpAdjustment.indexOf(props.round.hcp_adjustment);
      holeNumber = props.round.starting_hole;
      switchAdv = props.round.adv_b9_f9 == 1 ? true : false;
      pickerDate = moment(props.round.date).toDate();
      pickerTextDate = moment(props.round.date).format(props.language === 'es' ? 'DD/MM/YYYY' : 'MM/DD/YYYY');
      props.setHcpAdj(props.round.hcp_adjustment);
      props.setRoundId(props.round.id);
    } else if (props.course) {
      this.courseName = props.course.name;
      monthDay = this.formatDate(moment().toDate() / 1000);
      title = props.course.short_name + ` ${monthDay}`;

      let howAdvMove = 'match';
      let howManyStrokes = 0.5;
      let advMoves = 0;
      let carryMoves = 0;

      if (props.preferences) {
        const { asData } = props.preferences;
        if (asData.how_adv_move !== "") howAdvMove = asData.how_adv_move;
        if (asData.how_many_strokes !== "") howManyStrokes = asData.how_many_strokes;
        if (asData.adv_moves !== "") advMoves = asData.adv_moves;
        if (asData.carry_move_adv !== "") carryMoves = asData.carry_move_adv;
      }

      const roundData = {
        name: title,
        course_id: props.course.id,
        date: moment().format('YYYY-MM-DD'),
        hcp_adjustment: 1,
        online_key: '',
        starting_hole: '1',
        adv_b9_f9: 0,
        how_adv_move: howAdvMove,
        how_many_strokes: howManyStrokes,
        adv_moves: advMoves,
        carry_move_adv: carryMoves,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      props.saveRound(roundData);
    } else {
      //props.navigate('HomeTab');
    }

    props.navigation.setParams({
      Title: title,
    });

    //props.setInitHole(holeNumber);
    //props.setSwitchAdv(switchAdv);

    this.state = {
      language: 'es',
      roundName: title,
      selectedButton,
      holeNumber,
      switchAdv,
      date: monthDay,
      showDatePicker: false,
      pickerDate,
      pickerTextDate,
      editDate: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const language = 'es';
    return {
      title: navigation.getParam('Title', 'Round'),
      headerRight: (
        <HeaderButton
          iconName="ios-exit"
          color={Colors.Primary}
          onPress={() =>
            Alert.alert(
              Dictionary.exitRound[language],
              '',
              [
                { text: Dictionary.cancel[language], style: 'cancel' },
                {
                  text: Dictionary.exit[language], style: 'destructive', onPress: () => {
                    navigation.navigate('RoundsView');
                  }
                },
              ]
            )
          }
        />
      )
    }
  }

  componentDidMount() {
    this.initBackHandler();
  }

  render() {

    const {
      language,
      roundName,
      selectedButton,
      holeNumber,
      switchAdv,
      date,
      showDatePicker,
      pickerDate,
      pickerTextDate,
      editDate
    } = this.state;

    const {
      roundName: roundNameText,
      autoAdjust,
      startingHole,
      roundDate: roundDateText
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor='#FFFFFF'
          barStyle='dark-content'
          translucent={false}
        />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
          <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled">

            <View style={styles.titleView}>
              <Text style={styles.courseTitle}>{this.courseName}</Text>
              <Text style={styles.courseTitle}>{date}</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextField
                  label={roundNameText[language]}
                  tintColor={Colors.Primary}
                  autoCapitalize="words"
                  value={roundName}
                  //onChangeText={this.onChangeName}
                />
              </View>
            </View>

            {(!editDate || Platform.OS === 'android') && <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TouchableOpacity /*onPress={_ => this.setState({ editDate: true, showDatePicker: Platform.OS === 'android' })}*/>
                  <TextField
                    label={roundDateText[language]}
                    editable={false}
                    tintColor={Colors.Primary}
                    autoCapitalize="words"
                    value={pickerTextDate}
                  />
                  <View style={styles.editView}>
                    <Entypo name='edit' size={18} color={Colors.Primary} />
                  </View>
                </TouchableOpacity>
                {showDatePicker &&
                  <DateTimePicker
                    value={pickerDate}
                    mode='date'
                    display='default'
                    //onChange={this.onChangeDate}
                  />}
              </View>
            </View>}

            {Platform.OS === 'ios' && editDate && <View style={styles.formContainer}>
              <View style={[styles.inputContainer, { height: 250 }]}>
                <TouchableOpacity style={styles.checkView} /*onPress={_ => this.setState({ editDate: false })}*/>
                  <Text style={[styles.titles, { marginBottom: 0 }]}>{roundDateText[language]}</Text>
                  <Entypo name="check" size={20} color={Colors.Primary} />
                </TouchableOpacity>
                <DateTimePicker
                  value={pickerDate}
                  mode='date'
                  display='default'
                  //onChange={this.onChangeDate}
                  locale={language}
                />
              </View>
            </View>}

            <View style={{ height: 10 }} />
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TouchableOpacity /*onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.hcpAutoAdj })}*/>
                  <Text style={styles.titles}>{autoAdjust[language]} <Text style={{ color: Colors.Primary }}>?</Text></Text>
                </TouchableOpacity>
                <ButtonGroup
                  //onPress={this.onChangeHcpAdj}
                  selectedIndex={selectedButton}
                  buttons={['100%', '95%', '90%', '85%', '80%']}
                  containerStyle={{ height: 30 }}
                  selectedButtonStyle={{ backgroundColor: Colors.Primary }}
                />
              </View>
            </View>

            <View style={{ height: 10 }} />
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TouchableOpacity /*onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.startingHole })}*/>
                  <Text style={styles.titles}>{startingHole[language]} <Text style={{ color: Colors.Primary }}>?</Text></Text>
                </TouchableOpacity>
                <View style={styles.startHoleView}>
                  <View style={{ width: 150 }}>
                    <ButtonGroup
                      //onPress={this.changeHole}
                      selectedIndex={1}
                      buttons={['-', '+']}
                      containerStyle={{ height: 30 }}
                      selectedButtonStyle={{ backgroundColor: Colors.Primary }}
                      textStyle={{ fontSize: 20 }}
                      underlayColor='red'
                    />
                  </View>
                  <Text style={styles.holeNumber}>{holeNumber}</Text>
                </View>
              </View>
            </View>

            {holeNumber !== 1 && <>
              <View style={{ height: 10 }} />
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.switchView}>
                    <TouchableOpacity style={{width: '80%'}} /*onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.switchAdv })}*/>
                      <Text style={styles.question} numberOfLines={2}>Switch Adv B9/F9 <Text style={{ color: Colors.Primary }}>?</Text></Text>
                    </TouchableOpacity>
                    <Switch
                      value={switchAdv}
                      thumbColor={switchAdv ? Colors.Primary : Colors.Gray}
                      trackColor={{ true: Colors.PrimaryWithOpacity }}
                      //onValueChange={this.onChangeSwitchAdv}
                    />
                  </View>
                </View>
              </View>
            </>}

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  changeHole = (value) => {
    const { holeNumber } = this.state;
    let hole = 0;
    let switchAdv = this.state.switchAdv;

    if (value === 1) {
      hole = holeNumber === 18 ? 1 : holeNumber + 1;
      this.setState({ holeNumber: hole });
      if (hole === 1) {
        switchAdv = false;
        this.setState({ switchAdv: false });
        this.props.setSwitchAdv(false);
      }
    } else {
      hole = holeNumber === 1 ? 18 : holeNumber - 1;
      this.setState({ holeNumber: hole });
      if (hole === 1) {
        switchAdv = false;
        this.setState({ switchAdv: false });
        this.props.setSwitchAdv(false);
      }
    }

    const {
      roundName,
      pickerDate,
      selectedButton,
    } = this.state;

    const roundData = {
      id: this.props.roundId,
      name: roundName,
      course_id: this.props.course.id,
      date: moment.unix(pickerDate / 1000).format('YYYY-MM-DD'),
      hcp_adjustment: this.hcpAdjustment[selectedButton],
      online_key: '',
      starting_hole: hole,
      adv_b9_f9: switchAdv ? 1 : 0,
      id_sync: '',
      ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    this.props.updateRound(roundData);
    this.props.setInitHole(hole);

  }

  formatDate = (timestamp) => {
    const { language } = this.props;
    const numMonth = moment.unix(timestamp).format('M');
    let month = '';

    switch (numMonth) {
      case '1':
        month = Dictionary.january[language];
        break;
      case '4':
        month = Dictionary.april[language];
        break;
      case '8':
        month = Dictionary.august[language];
        break;
      case '12':
        month = Dictionary.december[language];
        break;
      default:
        month = moment.unix(timestamp).format('MMM');
        break;
    }
    const day = moment.unix(timestamp).format('DD');

    return `${month} ${day}`;
  }

  handleBackPress = () => {
    Alert.alert(
      Dictionary.exitRound[this.state.language],
      '',
      [
        { text: Dictionary.cancel[this.state.language], style: 'cancel' },
        { text: Dictionary.exit[this.state.language], onPress: () => this.props.navigation.navigate(/*'HomeTab'*/'RoundsStack') },
      ]
    )
    return true;
  }

  initBackHandler = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  onChangeDate = (date) => {

    const {
      roundName,
      selectedButton,
      holeNumber,
      switchAdv
    } = this.state;

    if (Platform.OS === 'android') {
      if (date.type === 'set') {
        const { timestamp } = date.nativeEvent;
        this.setState({
          pickerDate: moment.unix(timestamp / 1000).toDate(),
          pickerTextDate: moment.unix(timestamp / 1000).format(this.props.language === 'es' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'),
          date: this.formatDate(timestamp / 1000),
          showDatePicker: false,
          editDate: false
        });

        const roundData = {
          id: this.props.roundId,
          name: roundName,
          course_id: this.props.course.id,
          date: moment.unix(timestamp / 1000).format('YYYY-MM-DD'),
          hcp_adjustment: this.hcpAdjustment[selectedButton],
          online_key: '',
          starting_hole: holeNumber,
          adv_b9_f9: switchAdv ? 1 : 0,
          id_sync: '',
          ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
        }

        this.props.updateRound(roundData);
      }
      this.setState({ showDatePicker: false, editDate: false });
    }

    if (Platform.OS === 'ios') {
      const { nativeEvent: { timestamp } } = date;

      this.setState({
        pickerTextDate: moment.unix(timestamp / 1000).format(this.props.language === 'es' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'),
        pickerDate: moment.unix(timestamp / 1000).toDate(),
        date: this.formatDate(timestamp / 1000),
      });

      const roundData = {
        id: this.props.roundId,
        name: roundName,
        course_id: this.props.course.id,
        date: moment.unix(timestamp / 1000).format('YYYY-MM-DD'),
        hcp_adjustment: this.hcpAdjustment[selectedButton],
        online_key: '',
        starting_hole: holeNumber,
        adv_b9_f9: switchAdv ? 1 : 0,
        id_sync: '',
        ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      this.props.updateRound(roundData);
    }
  }

  onChangeHcpAdj = (selectedButton) => {
    this.setState({ selectedButton });

    const {
      roundName,
      pickerDate,
      holeNumber,
      switchAdv
    } = this.state;

    const roundData = {
      id: this.props.roundId,
      name: roundName,
      course_id: this.props.course.id,
      date: moment.unix(pickerDate / 1000).format('YYYY-MM-DD'),
      hcp_adjustment: this.hcpAdjustment[selectedButton],
      online_key: '',
      starting_hole: holeNumber,
      adv_b9_f9: switchAdv ? 1 : 0,
      id_sync: '',
      ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    this.props.setHcpAdj(this.hcpAdjustment[selectedButton]);
    this.props.updateRound(roundData);
  }

  onChangeName = (title) => {
    this.setState({ roundName: title });
    this.props.navigation.setParams({
      Title: title,
    });

    const {
      pickerDate,
      selectedButton,
      holeNumber,
      switchAdv
    } = this.state;

    const roundData = {
      id: this.props.roundId,
      name: title,
      course_id: this.props.course.id,
      date: moment.unix(pickerDate / 1000).format('YYYY-MM-DD'),
      hcp_adjustment: this.hcpAdjustment[selectedButton],
      online_key: '',
      starting_hole: holeNumber,
      adv_b9_f9: switchAdv ? 1 : 0,
      id_sync: '',
      ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    this.props.updateRound(roundData);
  }

  onChangeSwitchAdv = (switchAdv) => {
    this.setState({ switchAdv });

    const {
      roundName,
      pickerDate,
      selectedButton,
      holeNumber
    } = this.state;

    const roundData = {
      id: this.props.roundId,
      name: roundName,
      course_id: this.props.course.id,
      date: moment.unix(pickerDate / 1000).format('YYYY-MM-DD'),
      hcp_adjustment: this.hcpAdjustment[selectedButton],
      online_key: '',
      starting_hole: holeNumber,
      adv_b9_f9: switchAdv ? 1 : 0,
      id_sync: '',
      ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    this.props.updateRound(roundData);
    this.props.setSwitchAdv(switchAdv);
  }

  removeBackHandler = () => {
    try {
      this.backHandler.remove();
    } catch (error) {
      console.log('====================================');
      console.log(error + ' file: ConfigRoundView, line: 236');
      console.log('====================================');
    }
  }
}

export default ConfigRoundView;
