/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    Picker,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity
} from 'react-native'
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../../utils/Colors';
import DragonButton from '../../global/DragonButton';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from "react-native-flash-message";
import { AltaCampo } from '../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';

const {
            courseName,
            courseShortName,
            courseCity,
            courseAddress,
            mexico,
            usa,
            country: countryText,
            save,
            update,
            required,
            createCourse
        } = Dictionary;

class AddCourseView extends Component {
    constructor(props) {
        super(props);
        /*let course=props.navigation.getParam('course');
        if (course){
            this.state = {
                name: 'course.name',
                nameError: '',
                shortName: 'course.short_name',
                shortNameError: '',
                city: 'course.city',
                cityError: '',
                address: 'course.address',
                addressError: '',
                country: 'course.country',
            }
        }else {*/
            this.state = {
                name: '',
                nameError: '',
                shortName: '',
                shortNameError: '',
                city: '',
                cityError: '',
                address: '',
                addressError: '',
                country: 'México',
                language: 'es'
            }
        //}
    }



    componentDidMount = async () => {
    let language = await AsyncStorage.getItem('language')
    this.setState({
        language:language
    })
    }

    render() {

        const {
            name,
            nameError,
            shortName,
            shortNameError,
            city,
            cityError,
            address,
            addressError,
            country,
            language
        } = this.state; this.props;


        //let course = this.props.navigation.getParam('course');
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
                <View style={{ flex: 1 }}>
                <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.goBack()}>
                  <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
                </TouchableOpacity> 
                  <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
                  <Text style={{ padding:20, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{createCourse[language]}</Text>
                  </View>
                    <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled">
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <TextField
                                    ref={ref => this.courseNameIn = ref}
                                    label={courseName[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    onChangeText={(name) => this.setState({ name })}
                                    value={name}
                                    error={nameError}
                                    onSubmitEditing={({nativeEvent: {text}}) => {
                                        //if(this.nameValidation(text)){
                                            this.shortNameIn.focus();
                                        //}
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={[styles.inputContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <View style={styles.twoInputContainer}>
                                    <TextField
                                        ref={ref => this.shortNameIn = ref}
                                        label={courseShortName[language]}
                                        tintColor={Colors.Primary}
                                        autoCapitalize="characters"
                                        autoCorrect={false}
                                        maxLength={6}
                                        onChangeText={(shortName) => this.setState({ shortName })}
                                        value={shortName}
                                        error={shortNameError}
                                        onSubmitEditing={({nativeEvent: {text}}) => {
                                            //if(this.shortNameValidation(text)){
                                                this.cityIn.focus();
                                            //}
                                        }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.twoInputContainer}>
                                    <TextField
                                        ref={ref => this.cityIn = ref}
                                        label={courseCity[language]}
                                        tintColor={Colors.Primary}
                                        autoCapitalize="words"
                                        onChangeText={(city) => this.setState({ city })}
                                        value={city}
                                        error={cityError}
                                        onSubmitEditing={({nativeEvent: {text}}) => {
                                            //if(this.cityValidation(text)){
                                                this.cityIn.blur();
                                            //}
                                        }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            {/* <View style={styles.inputContainer}>
                                <TextField
                                    label={courseAddress[language]}
                                    tintColor={Colors.Primary}
                                    autoCapitalize="words"
                                    autoCompleteType="street-address"
                                    onChangeText={(address) => this.setState({ address })}
                                    value={address}
                                    error={addressError}
                                    onSubmitEditing={({nativeEvent: {text}}) => this.addressValidation(text)}
                                />
                            </View> */}
                            <View style={styles.countryPickerView}>
                                <Text style={styles.countryText} allowFontScaling={false}>{countryText[language]}</Text>
                                <Picker
                                    style={{ height: 50, width: 100 }}
                                    onValueChange={(country) => this.setState({ country })}
                                    mode="dropdown"
                                    selectedValue={country}
                                    style={{ flex: 1 }}
                                >
                                    <Picker.Item label={`🇲🇽   ${mexico[language]}`} value="México" />
                                    <Picker.Item label={`🇺🇸   ${usa[language]}`} value="USA" />
                                </Picker>
                            </View>
                            <View style={{height: 200}} />
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.bottomButtom}>
                    <DragonButton title={save[language]} onPress={this.submit} />
                </View>
            </KeyboardAvoidingView>
        )
    }
    
    changeTitleText = () => {
        let course = this.props.navigation.getParam('course');
        this.props.navigation.setParams({
            Title: course ? Dictionary.editCourse[this.props.language] : Dictionary.addCourse[this.props.language]
        });
    }

    nameValidation = (name) => {
        this.setState({nameError: name.length > 0 ? '' : Dictionary.required[this.props.language]});

        return name.length > 0;
    }

    shortNameValidation = (shortName) => {
        const response = Validations.nicknameValidation(shortName);
        this.setState({shortNameError: !response.ok ? response.error : ''});

        return response.ok;
    }

    cityValidation = (city) => {
        const response = Validations.nameValidation(city);
        this.setState({cityError: !response.ok ? response.error : ''});

        return response.ok;
    }

    submit = async () => {
    const token = await AsyncStorage.getItem('usu_id')

        const {
            name,
            shortName,
            city,
            address,
            country,
            language
        } = this.state;

        if (name === "") {
          showMessage({
                    message: courseName[language]+' ' + required[language],
                    type: "warning",
                  });
          return;
        }

        AltaCampo(name, shortName, city, country, token)
        .then((res) => {
          console.warn(res)
            if(res.estatus > 0){
                showMessage({
                message: "Campo creado correctamente",
                type:'success',
            });
            this.props.navigation.navigate("CoursesView")
            }
        })
        }
}

export default AddCourseView;
