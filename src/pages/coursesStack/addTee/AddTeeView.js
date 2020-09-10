import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import store from '../../../store/store';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import Colors from '../../../utils/Colors';
import DragonButton from '../../global/DragonButton';
import { NavigationEvents } from 'react-navigation';
import * as Validations from '../../../utils/Validations';
import { actionSaveTees, actionUpdateTee } from '../../../store/actions';
import moment from 'moment';

class AddTeeView extends Component {
  constructor(props) {
    super(props);
    let tee=props.navigation.getParam('tee');
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
    }else {
      this.state = {
        name: '',
        nameError: '',
        slope: '',
        slopeError: '',
        rating: '',
        ratingError: '',
        teeColor: 'red',
        modalColor: false
      };
    }
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
      modalColor
    } = this.state;

    const {
      language,
    } = this.props;

    const tee =this.props.navigation.getParam('tee');

    const {
      teeName,
      teeColor: teeColorText,
      save,
      update,
    } = Dictionary;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
        <NavigationEvents
          onWillFocus={this.changeTitleText}
        />
        <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled">
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
      name,
      slope,
      rating,
      teeColor
    } = this.state;

    const { navigation: { state: { params: { courseId } } } } = this.props;

    const nameOk = this.nameValidation(name);
    const slopeOk = this.slopeValidation(slope);
    const ratingOk = this.ratingValidation(rating);

    if (nameOk && slopeOk && ratingOk) {
      let tee = this.props.navigation.getParam('tee');
      if(tee){
        const data = {
          id: tee.id,
          name,
          slope,
          rating,
          course_id: tee.course_id,
          color: teeColor,
          id_sync: null,
          ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        this.props.updateTee(data);
      }else {
        const data = {
          name,
          slope,
          rating,
          color: teeColor,
          course_id: courseId,
          id_sync: null,
          ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        this.props.saveTee(data);
      }
    }
  }
}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  userData: state.reducerUserData,
});

const mapDispatchToProps = dispatch => ({
  saveTee: (values) => {
    dispatch(actionSaveTees(values));
  },
  updateTee: (values) => {
    dispatch(actionUpdateTee(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTeeView);
