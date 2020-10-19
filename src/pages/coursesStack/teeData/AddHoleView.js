import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TextInput
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
import { AltaHoles } from '../../../Services/Services'
import { showMessage } from "react-native-flash-message";

const {
      hole,
      teeColor: teeColorText,
      save,
      update,
      required
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
        holeAdd: '',
        par: '',
        adv: '',
        yards: '',
        language: 'es',
        IDTees: props.route.params.IDTees,
        NameTee: props.route.params.NameTee
      };
    //}
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
      holeAdd,
      par,
      adv,
      yards,
      language,
    } = this.state;

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
          <View style={{width: Dimensions.get('screen').width, alignItems: 'center', marginTop:40}}>
            <View style={styles.holesHeader}>
              <View style={styles.rectangleElement}>
                <Text style={styles.holeText}>Hole</Text>
                <TextInput
                        //ref={ref => inputs[`1:${item.index}`] = ref}
                        tintColor={Colors.Primary}
                        style={styles.input}
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={holeAdd}
                        onSubmitEditing={_ => this.focusNextInput(1)}
                        onChangeText={text => this.setState({holeAdd:text})}
                        blurOnSubmit={false}
                    />
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Par</Text>
                <TextInput
                        //ref={ref => inputs[`1:${item.index}`] = ref}
                        style={styles.input}
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={par}
                        onSubmitEditing={_ => this.focusNextInput(1)}
                        onChangeText={text => this.setState({par:text})}
                        blurOnSubmit={false}
                    />
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Adv</Text>
                <TextInput
                        //ref={ref => inputs[`2:${item.index}`] = ref}
                        style={styles.input}
                        maxLength={2}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={adv}
                        onSubmitEditing={this.onSubmitAdv}
                        onChangeText={text => this.setState({adv:text})}
                        blurOnSubmit={false}
                    />
              </View>

              <View style={styles.rectangleElement}>
                <Text style={styles.headerText}>Yds</Text>
                <TextInput
                        //ref={ref => inputs[`3:${item.index}`] = ref}
                        style={styles.input}
                        maxLength={5}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={yards}
                        onSubmitEditing={this.onSubmitAdv}
                        onChangeText={text => this.setState({yards:text})}
                        //blurOnSubmit={item.index === 17}
                    />
              </View>
            </View>
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
      NameTee,
      holeAdd,
      par,
      adv,
      yards,
      IDTees,
      language
    } = this.state;

    if (holeAdd === "") {
          showMessage({
                    message: hole[language]+' ' + required[language],
                    type: "warning",
                  });
          return;
        }
    if (par === "") {
          showMessage({
                    message: 'Par '+ required[language],
                    type: "warning",
                  });
          return;
        }
    if (adv === "") {
          showMessage({
                    message: 'Adv ' + required[language],
                    type: "warning",
                  });
          return;
        }

    if (yards === "") {
          showMessage({
                    message: 'Yds ' + required[language],
                    type: "warning",
                  });
          return;
        }

        console.warn(NameTee)
        console.warn(IDTees)
        console.warn(holeAdd)
        console.warn(par)
        console.warn(adv)
        console.warn(yards)

        AltaHoles(NameTee, holeAdd, par, adv, yards,IDTees)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                showMessage({
                message: "Hole creado correctamente",
                type:'success',
            });
            this.props.navigation.navigate("TeeDataView")
            }
        })
  }
}

export default AddTeeView;
