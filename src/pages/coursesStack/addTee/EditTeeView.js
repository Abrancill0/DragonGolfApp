import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import Colors from '../../../utils/Colors';
import DragonButton from '../../global/DragonButton';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { ActualizarTees } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

const {
      teeName,
      teeColor: teeColorText,
      save,
      update,
      required,
      successUpdateTee
    } = Dictionary;

class AddTeeView extends Component {
  constructor(props) {
    super(props);
    /*let tee=props.navigation.getParam('tee');
    if(tee){
      this.state = {
        name: tee.name,
        nameError: '',
        slope: tee.slope.toString(),
        slopeError: '',
        rating: tee.rating.toString(),
        ratingError: '',
        teeColor: tee.color,
        modalColor: false
      };
    }else {*/
      this.state = {
        IDTees: props.route.params.IDTees,
        name: props.route.params.Nombre,
        nameError: '',
        slope: props.route.params.Slope,
        slopeError: '',
        rating: props.route.params.Rating,
        ratingError: '',
        teeColor: props.route.params.Color,
        modalColor: false,
        language: 'es',
        IDCourse: props.route.params.IDCourse
      };
    //}
  }

  componentDidMount = async () => {
    let language = await AsyncStorage.getItem('language')
    console.warn(language)
    this.setState({
        language:language
    })
    }

  static navigationOptions = ({ navigation }) => {
    const state = store.getState();
    const language = state.reducerLanguage;
    let tee = navigation.getParam('tee');
    return {
      title: tee ? navigation.getParam('Title', Dictionary.editTee[language]) : navigation.getParam('Title', Dictionary.addTee[language]),
    }
  };

  render() {

    const {
      name,
      nameError,
      slope,
      slopeError,
      rating,
      ratingError,
      teeColor,
      modalColor,
      language
    } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
        <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={{padding:20}} onPress={()=> this.props.navigation.goBack()}>
            <MaterialIcon name={'arrow-back'} size={30} color={Colors.Primary} />
          </TouchableOpacity>
          <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>Edit Tee</Text>
          </View>
          <View style={styles.formContainer}>

            <View style={styles.inputContainer}>
              <TextField
                ref={ref => this.teeNameIn = ref}
                label={teeName[language]}
                tintColor={Colors.Primary}
                autoCapitalize="words"
                onChangeText={(name) => this.setState({ name })}
                value={name}
                error={nameError}
                onSubmitEditing={({ nativeEvent: { text } }) => {
                  if(this.nameValidation(text)){
                    this.slopeIn.focus();
                  }
                }}
                blurOnSubmit={false}
              />
            </View>

            <View style={[styles.inputContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <View style={styles.twoInputContainer}>
                <TextField
                  ref={ref => this.slopeIn = ref}
                  label="Slope"
                  tintColor={Colors.Primary}
                  autoCapitalize="none"
                  maxLength={5}
                  keyboardType="numeric"
                  returnKeyType='done'
                  onChangeText={(slope) => this.setState({ slope })}
                  value={slope}
                  error={slopeError}
                  onSubmitEditing={({ nativeEvent: { text } }) => {
                    if(this.slopeValidation(text)){
                      this.ratingIn.focus();
                    }
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.twoInputContainer}>
                <TextField
                  ref={ref => this.ratingIn = ref}
                  label="Rating"
                  tintColor={Colors.Primary}
                  autoCapitalize="none"
                  maxLength={5}
                  keyboardType="numeric"
                  returnKeyType='done'
                  onChangeText={(rating) => this.setState({ rating })}
                  value={rating}
                  error={ratingError}
                  onSubmitEditing={({ nativeEvent: { text } }) => {
                    if(this.ratingValidation(text)){
                      this.ratingIn.blur();
                    }
                  }}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => this.setState({modalColor: true})}
            >
              <View style={styles.teeColorView}>
                <Text style={styles.teeColorText}>{teeColorText[language]}</Text>
                <View style={[styles.colorSquare, { backgroundColor: teeColor }]} />
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>

        <Modal
          style={{ flex: 1 }}
          visible={modalColor}
          transparent
          onRequestClose={() => this.setState({modalColor: false})}
          
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalColorPicker}>
              <View style={styles.colorPickerView}>
                <ColorPicker
                  defaultColor={teeColor}
                  onColorChange={this.onColorChange}
                  style={{ flex: 1 }}
                  onColorSelected={() => this.setState({modalColor: false})}
                />
              </View>
              <TouchableOpacity
                style={styles.modalOkButton}
                onPress={() => this.setState({modalColor: false})}
              >
                <Text style={styles.modalOkText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.bottomButtom}>
          <DragonButton
            title={save[language]}
            onPress={this.submit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  changeTitleText = () => {
    let tee = this.props.navigation.getParam('tee');
    this.props.navigation.setParams({
      Title: tee ? Dictionary.editTee[this.props.language] : Dictionary.addTee[this.props.language]
    });
  }

  nameValidation = (name) => {
    this.setState({ nameError: name.length > 0 ? '' : Dictionary.required[this.props.language] });

    return name.length > 0;
  }

  onColorChange = (color) => {
    this.setState({
      teeColor: fromHsv(color),
    })
  }

  ratingValidation = (rating) => {
    const response = Validations.floatNumberValidation(rating);
    this.setState({ ratingError: !response.ok ? response.error : '' });

    return response.ok;
  }

  slopeValidation = (slope) => {
    const response = Validations.intNumberValidation(slope);
    this.setState({ slopeError: !response.ok ? response.error : '' });

    return response.ok;
  }

  submit = () => {

    const {
      IDTees,
      name,
      slope,
      rating,
      teeColor,
      language,
      IDCourse
    } = this.state;

    console.warn(IDCourse)

    if (name === "") {
          showMessage({
                    message: teeName[language]+' ' + required[language],
                    type: "warning",
                  });
          return;
        }
    if (slope === "") {
          showMessage({
                    message: 'Slope '+ required[language],
                    type: "warning",
                  });
          return;
        }
    if (rating === "") {
          showMessage({
                    message: 'Rating ' + required[language],
                    type: "warning",
                  });
          return;
        }

        ActualizarTees(IDTees, name, slope, rating, teeColor, 0,0,0, IDCourse)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                showMessage({
                message: successUpdateTee[language],
                type:'success',
            });
            this.props.navigation.navigate("TeesView", {IDCourse:IDCourse})
            }
        })
  }
}

export default AddTeeView;
