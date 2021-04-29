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
import DragonButton from '../../global/DragonButton';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";
import { CrearRonda } from '../../../Services/Services'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

const {
      next,
      required,
      roundName: roundNameText,
      autoAdjust,
      startingHole,
      roundDate: roundDateText,
      CreateRound
    } = Dictionary;

class ConfigRoundView extends Component {
  constructor(props) {
    super(props);

    let monthDay = '';
    let title = '';
    let selectedButton = 0;
    let holeNumber = 1;
    let switchAdv = false;
    let pickerDate = moment().toDate();
    let pickerTextDate = moment().format('DD/MM/YYYY');
    let pickerTextDate2 = moment().format('YYYY-MM-DD');
    console.warn((new Date()).valueOf());

    this.hcpAdjustment = [1, 0.95, 0.90, 0.85, 0.80];

    this.state = {
      carga: false,
      language: 'es',
      IDCourse: props.route.params.IDCourse,
      courseName: props.route.params.courseName,
      roundName: title,
      selectedButton,
      holeNumber,
      switchAdv,
      date: monthDay,
      showDatePicker: false,
      pickerDate,
      pickerTextDate,
      pickerTextDate2,
      editDate: false,
    };
  }

  componentDidMount = async () => {
    const  timestamp  = (new Date()).valueOf();
    let language = await AsyncStorage.getItem('language')
    this.setState({
        language:language,
        roundName: this.state.courseName + ' ' + this.formatDate(timestamp / 1000),
        date: this.formatDate(timestamp / 1000)
    })
    this.refs.nombre.setValue(this.state.courseName + ' ' + this.formatDate(timestamp / 1000))
    }

    navegaBack (){
      Alert.alert(
              Dictionary.exitRound[this.state.language],
              '',
              [
                { text: Dictionary.cancel[this.state.language], style: 'cancel' },
                {
                  text: Dictionary.exit[this.state.language], style: 'destructive', onPress: () => {
                    this.props.navigation.navigate('RoundsStack');
                  }
                },
              ]
            )
    }

  render() {

    const {
      carga,
      language,
      IDCourse,
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

    return (
      <View style={{ flex: 1 }}>
        <Spinner
            visible={carga}
            color={Colors.Primary} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
          <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled">

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
              <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.navegaBack()}>
                <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
              </TouchableOpacity>
            </View>
            <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
            <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{CreateRound[language]}</Text>
            </View>
            {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
              <TouchableOpacity style={{margin:20, marginTop:40, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('AddPlayer')}>
                <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
              </TouchableOpacity>
            </View>*/}
          </View>

            <View style={styles.titleView}>
              <Text style={styles.courseTitle}>{this.state.courseName}</Text>
              <Text style={styles.courseTitle}>{date}</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextField
                  label={roundNameText[language]}
                  tintColor={Colors.Primary}
                  autoCapitalize="words"
                  value={roundName}
                  onChangeText={this.onChangeName}
                  ref='nombre'
                />
              </View>
            </View>

            {(!editDate || Platform.OS === 'android') && <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={_ => this.setState({ editDate: true, showDatePicker: Platform.OS === 'android' })}>
                  <TextField
                    label={roundDateText[language]}
                    editable={false}
                    tintColor={Colors.Primary}
                    autoCapitalize="words"
                    value={pickerTextDate}
                    ref='fecha'
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
                    onChange={this.onChangeDate}
                  />}
              </View>
            </View>}

            {Platform.OS === 'ios' && editDate && <View style={styles.formContainer}>
              <View style={[styles.inputContainer, { height: 250 }]}>
                <TouchableOpacity style={styles.checkView} onPress={_ => this.setState({ editDate: false })}>
                  <Text style={[styles.titles, { marginBottom: 0 }]}>{roundDateText[language]}</Text>
                  <Entypo name="check" size={20} color={Colors.Primary} />
                </TouchableOpacity>
                <DateTimePicker
                  value={pickerDate}
                  mode='date'
                  display='default'
                  onChange={this.onChangeDate}
                  locale={language}
                />
              </View>
            </View>}

            <View style={{ height: 10 }} />
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.hcpAutoAdj, language: language })}>
                  <Text style={styles.titles}>{autoAdjust[language]} <Text style={{ color: Colors.Primary }}>?</Text></Text>
                </TouchableOpacity>
                <ButtonGroup
                  onPress={this.onChangeHcpAdj}
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
                <TouchableOpacity onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.startingHole, language: language })}>
                  <Text style={styles.titles}>{startingHole[language]} <Text style={{ color: Colors.Primary }}>?</Text></Text>
                </TouchableOpacity>
                <View style={styles.startHoleView}>
                  <View style={{ width: 150 }}>
                    <ButtonGroup
                      onPress={this.changeHole}
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

            {holeNumber !== 1 && <View>
              <View style={{ height: 10 }} />
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.switchView}>
                    <TouchableOpacity style={{width: '80%'}} /*onPress={_ => this.props.navigation.navigate('InfoScreen', { data: Details.switchAdv })}*/>
                      <Text style={styles.question} numberOfLines={2}>Switch Adv B9/F9 <Text style={{ color: Colors.Primary }}>?</Text></Text>
                    </TouchableOpacity>
                    <Switch
                      value={switchAdv}
                      thumbColor={switchAdv ? Colors.Primary : Colors.Primary}
                      trackColor={{ true: Colors.PrimaryWithOpacity, false: Colors.PrimaryWithOpacity }}
                      onValueChange={this.onChangeSwitchAdv}
                    />
                  </View>
                </View>
              </View>
            </View>}

            <View style={[styles.bottomButtom,{margin:20}]}>
                    <DragonButton title={next[language]} onPress={this.submit} />
                </View>

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
        //this.props.setSwitchAdv(false);
      }
    } else {
      hole = holeNumber === 1 ? 18 : holeNumber - 1;
      this.setState({ holeNumber: hole });
      if (hole === 1) {
        switchAdv = false;
        this.setState({ switchAdv: false });
        //this.props.setSwitchAdv(false);
      }
    }

    const {
      roundName,
      pickerDate,
      selectedButton,
    } = this.state;

    /*const roundData = {
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
    this.props.setInitHole(hole);*/

  }

  formatDate = (timestamp) => {
    const { language } = this.state;
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
    console.warn(date)

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
          pickerTextDate: moment.unix(timestamp / 1000).format('DD/MM/YYYY'),
          pickerTextDate2: moment.unix(timestamp / 1000).format('YYYY-MM-DD'),
          date: this.formatDate(timestamp / 1000),
          showDatePicker: false,
          editDate: false,
          roundName: this.state.courseName + ' ' + this.formatDate(timestamp / 1000)

        });

        this.refs.nombre.setValue(this.state.courseName + ' ' + this.formatDate(timestamp / 1000))

        this.refs.fecha.setValue(this.state.pickerTextDate)

        /*const roundData = {
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

        this.props.updateRound(roundData);*/
      }
      this.setState({ showDatePicker: false, editDate: false });
    }

    if (Platform.OS === 'ios') {
      const { nativeEvent: { timestamp } } = date;

      this.setState({
        pickerTextDate: moment.unix(timestamp / 1000).format('DD/MM/YYYY'),
        pickerTextDate2: moment.unix(timestamp / 1000).format('YYYY-MM-DD'),
        pickerDate: moment.unix(timestamp / 1000).toDate(),
        date: this.formatDate(timestamp / 1000),
        roundName: this.state.courseName + ' ' + this.formatDate(timestamp / 1000)
        });

      this.refs.nombre.setValue(this.state.courseName + ' ' + this.formatDate(timestamp / 1000))
      this.setState({ showDatePicker: false, editDate: false });
      //this.refs.fecha.setValue(this.state.pickerTextDate)

      /*const roundData = {
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

      this.props.updateRound(roundData);*/
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

    /*const roundData = {
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
    this.props.updateRound(roundData);*/
  }

  onChangeName = (title) => {
    this.setState({ roundName: title });

    const {
      pickerDate,
      selectedButton,
      holeNumber,
      switchAdv
    } = this.state;

    /*const roundData = {
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

    this.props.updateRound(roundData);*/
  }

  onChangeSwitchAdv = (switchAdv) => {
    this.setState({ switchAdv });

    const {
      roundName,
      pickerDate,
      selectedButton,
      holeNumber
    } = this.state;

    /*const roundData = {
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
    //this.props.setSwitchAdv(switchAdv);*/
  }

  submit = async () => {
    console.warn(this.state.roundName)
    const token = await AsyncStorage.getItem('usu_id')

        const {
          roundName,
          pickerTextDate2,
          selectedButton,
          holeNumber,
          switchAdv,
          language,
          IDCourse,
          courseName
        } = this.state;

        if (roundName === "") {
          showMessage({
                    message: roundNameText[language]+' ' + required[language],
                    type: "warning",
                  });
          return;
        }

        this.setState({
          carga:true
        })

        console.warn(IDCourse)
        console.warn(roundName)
        console.warn(holeNumber)
        console.warn(token)

        let Ro_SwitchAdventage = 0
        if(switchAdv)
          Ro_SwitchAdventage= 1


        console.warn(Ro_SwitchAdventage)

        let Ro_HandicapAdjustment = 0

        switch(selectedButton){
          case 0: Ro_HandicapAdjustment = 100
          break;
          case 1: Ro_HandicapAdjustment = 95
          break;
          case 2: Ro_HandicapAdjustment = 90
          break;
          case 3: Ro_HandicapAdjustment = 85
          break;
          case 4: Ro_HandicapAdjustment = 80
          break;
        }


        console.warn(Ro_HandicapAdjustment)
        console.warn(pickerTextDate2)

        CrearRonda(IDCourse, roundName, Ro_HandicapAdjustment, holeNumber, Ro_SwitchAdventage, token, pickerTextDate2)
        .then((res) => {
          console.warn(res)
            if(res.estatus > 0){
              this.setState({
                carga:false
              })
                /*showMessage({
                message: "Ronda creada correctamente",
                type:'success',
            });*/
            //navigation.navigate('createDetalleTab', { screen: 'Detalle', params: { RmReqId: RmReqId, RmReqProveedorNombre: RmReqProveedorNombre } })
            this.props.navigation.navigate("PlayersViewRoundsList", {IDCourse:IDCourse, IDRound:res.idround})
            //this.props.navigation.navigate("RoundTab", { screen: 'Settings', params: {IDCourse:IDCourse, IDRound:res.idround} })
            //AsyncStorage.setItem('IDRound', res.idround.toString());
              AsyncStorage.setItem('nombreRonda', roundName.toString());
              AsyncStorage.setItem('handicap', Ro_HandicapAdjustment.toString());
              AsyncStorage.setItem('hole', holeNumber.toString());
              AsyncStorage.setItem('adv', Ro_SwitchAdventage.toString());
              AsyncStorage.setItem('fecha', pickerTextDate2.toString());
              AsyncStorage.setItem('IDCourse', IDCourse.toString());
              AsyncStorage.setItem('courseName', courseName.toString());
            }
            else{
              this.setState({
                carga:false
              })
              showMessage({
                message: "Ocurrió un error, intente más tarde",
                type:'danger',
            });
            }
        })
  }
}

export default ConfigRoundView;
