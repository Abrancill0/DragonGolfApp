import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../utils/Colors';
import HistoryComponent from '../../playersStack/history/HistoryComponent2';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HandicapIndex, HistoriaFilter } from '../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { TextField } from 'react-native-material-textfield';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import DragonButton from '../../global/DragonButton'; 

class HistoryScreen extends Component {
    constructor(props) {
        super(props);


        
        let pickerDate = moment().toDate();
        let pickerTextDateInicio = moment().format('DD/MM/YYYY');
        let pickerTextDateFin = moment().format('DD/MM/YYYY');
        let pickerTextDateInicio2 = moment().format('YYYY-MM-DD');
        let pickerTextDateFin2 = moment().format('YYYY-MM-DD');

        this.state = {
            token: 0,
            landscape: Dimensions.get('window').width > Dimensions.get('window').height,
            topToBottomDate: true,
            topToBottomPlayer: null,
            topToBottomCourse: null,
            language: 'es',
            history:[],
            editDate: false,
            editDateInicio: false,
            editDateFin: false,
            pickerDate,
            pickerTextDateInicio,
            pickerTextDateFin,
            pickerTextDateInicio2,
            pickerTextDateFin2,
            showDatePickerInicio: false,
            showDatePickerFin: false
        };

        let playerId = props.route.params.playerId
        let playernickname = props.route.params.playernickname
        props.navigation.setParams({ Title: playernickname });
        /*if (this.playerId) {
            const idx = props.history.findIndex(item => item.player_id === this.playerId);
            if (idx >= 0) props.navigation.setParams({ Title: props.history[idx].nick_name });
        }*/

        this.total = 0;
    }

    componentDidMount() {
        this.obtenHistorial()
        Dimensions.addEventListener('change', ({ window: { height, width } }) => {
            this.setState({ landscape: width > height });
        });
    }

    obtenHistorial = async () => {
        const token = this.props.route.params.playerId //await AsyncStorage.getItem('usu_id')
        const language = await AsyncStorage.getItem('language')
        this.setState({
          language:language,
          token:token
        })
        console.warn(this.props.route.params.playerId)
        console.warn('---------------------------------------')
        HandicapIndex(this.props.route.params.playerId)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
                var suma = 0/*res.Result.reduce((obj, data) => {
                  obj += parseFloat(data.GanadoPerdido);
                  return obj;
                }, 0);*/
                console.warn(suma)
                const list = res.Result.map(item => (
                    {
                      //id: item.IDBet,
                      course_name: item.Cou_Nombre,
                      money: item.Te_Rating,
                      played_hp: item.Te_Slope,
                      next_hp: item.Score18,
                      PlayerTee: item.PlayerTee,
                      Diferencial: item.Diferencial.toFixed(1),
                      handicap: item.Handicap.toFixed(1),
                      date: moment(item.Fecha).format('DD/MM/YYYY').toString(),
                      date2: new Date(item.Fecha)
                    }
                ))
                this.total = list[0].handicap
                this.setState({
                    history: list
                })
                /*for (var i = 0; i<=list.length - 1; i++) {
                    collapsedArray2.push(false)
                  }*/
                  //setCollapsed2(collapsedArray2)
                //setArrayholder(list)
            }
            else{
              this.total = 0
              this.setState({
                    history: []
                })
            }
        })
    }

    submit = async () => {
        const token = await AsyncStorage.getItem('usu_id')
        const language = await AsyncStorage.getItem('language')
        this.setState({
          language:language
        })
        HistoriaFilter(token,this.props.route.params.playerId,this.state.pickerTextDateInicio2,this.state.pickerTextDateFin2)
        .then((res) => {
          console.warn(res)
          if(res.estatus == 1){
                var suma = res.Result.reduce((obj, data) => {
                  obj += parseFloat(data.GanadoPerdido);
                  return obj;
                }, 0);
                console.warn(suma)
                const list = res.Result.map(item => (
                    {
                      //id: item.IDBet,
                      course_name: item.Campo,
                      money: item.GanadoPerdido,
                      played_hp: item.Stroke,
                      next_hp: item.StrokeSiguiente,
                      date: moment(item.Fecha).format('DD/MM/YYYY').toString()
                    }
                ))
                this.total = suma
                this.setState({
                    history: list
                })
                /*for (var i = 0; i<=list.length - 1; i++) {
                    collapsedArray2.push(false)
                  }*/
                  //setCollapsed2(collapsedArray2)
                //setArrayholder(list)
            }
            else{
              this.total = 0
              this.setState({
                    history: []
                })
            }
        })
    }

    onChangeDateInicio = (date) => {
    console.warn('Inicio')

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
          pickerTextDateInicio: moment.unix(timestamp / 1000).format('DD/MM/YYYY'),
          pickerTextDateInicio2: moment.unix(timestamp / 1000).format('YYYY-MM-DD'),
          date: this.formatDate(timestamp / 1000),
          showDatePickerInicio: false,
          editDateInicio: false,
          roundName: this.state.courseName + ' ' + this.formatDate(timestamp / 1000)

        });

        this.refs.fechaInicio.setValue(this.state.pickerTextDateInicio)

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
      this.setState({ showDatePickerInicio: false, editDateInicio: false });
    }

    if (Platform.OS === 'ios') {
      const { nativeEvent: { timestamp } } = date;

      this.setState({
        pickerTextDateInicio: moment.unix(timestamp / 1000).format('DD/MM/YYYY'),
        pickerTextDateInicio2: moment.unix(timestamp / 1000).format('YYYY-MM-DD'),
        pickerDate: moment.unix(timestamp / 1000).toDate(),
        date: this.formatDate(timestamp / 1000),
        roundName: this.state.courseName + ' ' + this.formatDate(timestamp / 1000)
        });

      this.setState({ showDatePickerInicio: false, editDateInicio: false });
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

    onChangeDateFin = (date) => {
    console.warn('Fin')

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
          pickerTextDateFin: moment.unix(timestamp / 1000).format('DD/MM/YYYY'),
          pickerTextDateFin2: moment.unix(timestamp / 1000).format('YYYY-MM-DD'),
          date: this.formatDate(timestamp / 1000),
          showDatePickerFin: false,
          editDateFin: false,
          roundName: this.state.courseName + ' ' + this.formatDate(timestamp / 1000)

        });

        this.refs.fechaFin.setValue(this.state.pickerTextDateFin)

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
      this.setState({ showDatePickerFin: false, editDateFin: false });
    }

    if (Platform.OS === 'ios') {
      const { nativeEvent: { timestamp } } = date;

      this.setState({
        pickerTextDateFin: moment.unix(timestamp / 1000).format('DD/MM/YYYY'),
        pickerTextDateFin2: moment.unix(timestamp / 1000).format('YYYY-MM-DD'),
        pickerDate: moment.unix(timestamp / 1000).toDate(),
        date: this.formatDate(timestamp / 1000),
        roundName: this.state.courseName + ' ' + this.formatDate(timestamp / 1000)
        });

      this.setState({ showDatePickerFin: false, editDateFin: false });
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

    render() {

        const {
            token,
            language,
            landscape,
            topToBottomDate,
            topToBottomPlayer,
            topToBottomCourse,
            editDate,
            editDateInicio,
            editDateFin,
            pickerDate,
            pickerTextDateInicio,
            pickerTextDateFin,
            showDatePickerInicio,
            showDatePickerFin
        } = this.state;

        const {
            date,
            course,
            rating,
            result,
            teeColor,
            h18s,
            differential,
            nextHcp,
            debt,
            notes,
            player,
            history,
            dateStart: dateStartText,
            dateEnd: dateEndText,
            filter
        } = Dictionary;

        return (
            <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
                    <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.goBack()}>
                      <MaterialIcons name={'arrow-back'} size={25} color={Colors.Primary} />
                    </TouchableOpacity>
                  </View> 
                  <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
                  <Text style={{ padding:20, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>Handicap Auto: {this.total}</Text>
                  </View>
                  {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                    <Text style={{ padding:10, fontSize: 14, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color: this.total < 0 ? Colors.Primary : this.total === 0 ? Colors.Black: Colors.Secondary ,fontWeight:'bold'}}>${this.total}</Text>
                  </View>*/}
                </View>
                <View style={styles.headersView}>
                    <TouchableOpacity style={styles.headers} onPress={this.sortDate2}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.headerText}>{date[language]}</Text>
                        </View>
                        <FontAwesome name={topToBottomDate === null ? 'minus' : topToBottomDate ? 'caret-down' : 'caret-up'} color={Colors.Black} size={15} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headers} /*onPress={this.sortCourse}*/>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 3 }}>
                            <Text style={styles.headerText}>{course[language]}</Text>
                        </View>
                        {/*<FontAwesome name={topToBottomCourse === null ? 'minus' : topToBottomCourse ? 'caret-down' : 'caret-up'} color={Colors.Black} size={15} />*/}
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.headers} onPress={this.sortPlayer}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 3 }}>
                            <Text style={styles.headerText}>{player[language]}</Text>
                        </View>
                        <FontAwesome name={topToBottomPlayer === null ? 'minus' : topToBottomPlayer ? 'caret-down' : 'caret-up'} color={Colors.Black} size={15} />
                    </TouchableOpacity> */}
                    <View style={styles.headers2}>
                        <Text style={styles.headerText}>{rating[language]}</Text>
                    </View>
                    {/*<View style={styles.headers}>
                        <Text style={styles.headerText}>{result[language]}</Text>
                    </View>*/}
                    <View style={styles.headers2}>
                        <Text style={styles.headerText}>Slope</Text>
                    </View>
                    <View style={styles.headers}>
                        <Text style={styles.headerText}>{h18s[language]}</Text>
                    </View>
                    <View style={styles.headers}>
                        <Text style={styles.headerText}>{differential[language]}</Text>
                    </View>
                    <View style={styles.headers}>
                        <Text style={styles.headerText}>{teeColor[language]}</Text>
                    </View>
                    {landscape && <View>
                        <View style={styles.headers}>
                            <Text style={styles.headerText}>{debt[language]}</Text>
                        </View>
                        <View style={styles.headers}>
                            <Text style={styles.headerText}>{notes[language]}</Text>
                        </View>
                    </View>}
                </View>
                <FlatList
                    data={this.state.history}
                    style={{ flex: 1, marginTop: 2 }}
                    extraData={this.state.history}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) =>
                        <HistoryComponent
                            item={item}
                            landscape={landscape}
                            language={language}
                        />
                    }
                />
                </View>
                {editDate && <View style={{ flex: 0.5 }}>
                {(!editDateInicio || Platform.OS === 'android') && <View style={{flex:0.5}}>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={_ => this.setState({ editDateInicio: true, showDatePickerInicio: Platform.OS === 'android' })}>
                  <TextField
                    label={dateStartText[language]}
                    editable={false}
                    tintColor={Colors.Primary}
                    autoCapitalize="words"
                    value={pickerTextDateInicio}
                    ref='fechaInicio'
                  />
                  <View style={styles.editView}>
                    <Entypo name='edit' size={18} color={Colors.Primary} />
                  </View>
                </TouchableOpacity>
                {showDatePickerInicio &&
                  <DateTimePicker
                    value={pickerDate}
                    mode='date'
                    display='default'
                    onChange={this.onChangeDateInicio}
                  />}
              </View>
            </View>}

            {Platform.OS === 'ios' && editDateInicio && <View style={{flex:0.5}}>
              <View style={[styles.inputContainer, { height: 250 }]}>
                <TouchableOpacity style={styles.checkView} onPress={_ => this.setState({ editDateInicio: false })}>
                  <Text style={[styles.titles, { marginBottom: 0 }]}>{dateStartText[language]}</Text>
                  <Entypo name="check" size={20} color={Colors.Primary} />
                </TouchableOpacity>
                <DateTimePicker
                  value={pickerDate}
                  mode='date'
                  display='default'
                  onChange={this.onChangeDateInicio}
                  locale={language}
                />
              </View>
            </View>}
            
            {(!editDateFin || Platform.OS === 'android') && <View style={{flex:0.5}}>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={_ => this.setState({ editDateFin: true, showDatePickerFin: Platform.OS === 'android' })}>
                  <TextField
                    label={dateEndText[language]}
                    editable={false}
                    tintColor={Colors.Primary}
                    autoCapitalize="words"
                    value={pickerTextDateFin}
                    ref='fechaFin'
                  />
                  <View style={styles.editView}>
                    <Entypo name='edit' size={18} color={Colors.Primary} />
                  </View>
                </TouchableOpacity>
                {showDatePickerFin &&
                  <DateTimePicker
                    value={pickerDate}
                    mode='date'
                    display='default'
                    onChange={this.onChangeDateFin}
                  />}
              </View>
            </View>}

            {Platform.OS === 'ios' && editDateFin && <View style={{flex:0.5}}>
              <View style={[styles.inputContainer, { height: 250 }]}>
                <TouchableOpacity style={styles.checkView} onPress={_ => this.setState({ editDateFin: false })}>
                  <Text style={[styles.titles, { marginBottom: 0 }]}>{dateEndText[language]}</Text>
                  <Entypo name="check" size={20} color={Colors.Primary} />
                </TouchableOpacity>
                <DateTimePicker
                  value={pickerDate}
                  mode='date'
                  display='default'
                  onChange={this.onChangeDateFin}
                  locale={language}
                />
              </View>
            </View>}
            <View style={[styles.bottomButtom,{flex:0.1, margin:10}]}>
                    <DragonButton title={filter[language]} onPress={this.submit} />
                </View>
            </View>}
            </View>
        )
    }

    sortDate = () => {
        this.setState({
            editDate: true
        })
        if (this.state.topToBottomDate) {
            this.setState({
            editDate: true,
            topToBottomDate: false
        })
        } else {
            this.setState({
            editDate: false,
            topToBottomDate: true
        })
        }
    }

    sortDate2 = () => {
        if (!this.state.topToBottomDate) {
            this.state.history.sort((a, b) => (a.date2 > b.date2) ? 1 : (a.date2 < b.date2) ? -1 : 0);
            this.setState({ topToBottomPlayer: null, topToBottomDate: true, topToBottomCourse: null });
        } else {
            this.state.history.sort((a, b) => (a.date2 < b.date2) ? 1 : (a.date2 > b.date2) ? -1 : 0);
            this.setState({ topToBottomPlayer: null, topToBottomDate: false, topToBottomCourse: null });
        }
    }

    sortPlayer = () => {
        if (!this.state.topToBottomPlayer) {
            this.props.history.sort((a, b) => (a.nick_name > b.nick_name) ? 1 : (a.nick_name < b.nick_name) ? -1 : 0);
            this.setState({ topToBottomDate: null, topToBottomPlayer: true, topToBottomCourse: null });
        } else {
            this.props.history.sort((a, b) => (a.nick_name < b.nick_name) ? 1 : (a.nick_name > b.nick_name) ? -1 : 0);
            this.setState({ topToBottomDate: null, topToBottomPlayer: false, topToBottomCourse: null });
        }
    }

    sortCourse = () => {
        if (!this.state.topToBottomCourse) {
            this.state.history.sort((a, b) => (a.course_name > b.course_name) ? 1 : (a.course_name < b.course_name) ? -1 : 0);
            this.setState({ topToBottomDate: null, topToBottomPlayer: null, topToBottomCourse: true });
        } else {
            this.state.history.sort((a, b) => (a.course_name < b.course_name) ? 1 : (a.course_name > b.course_name) ? -1 : 0);
            this.setState({ topToBottomDate: null, topToBottomPlayer: null, topToBottomCourse: false });
        }
    }

    calculateTotal = val => {
        this.total += val;
        this.props.navigation.setParams({ total: this.total });
    }
}


export default HistoryScreen
