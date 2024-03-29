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

    static navigationOptions = ({navigation}) => {
        const state = store.getState();
        const language = state.reducerLanguage;
        let course = navigation.getParam('course');
        return {
            title: course ? navigation.getParam('Title', Dictionary.editCourse[language]) : navigation.getParam('Title', Dictionary.addCourse[language]),
        }
    };

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
        } = Dictionary;
        //let course = this.props.navigation.getParam('course');
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
                <View style={{ flex: 1 }}>
                <TouchableOpacity style={{padding:10}} onPress={()=> this.props.navigation.goBack()}>
                  <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
                </TouchableOpacity>
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
                                        maxLength={5}
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

    submit = () => {/*

        const {
            name,
            shortName,
            city,
            address,
            country
        } = this.state;
        let course = this.props.navigation.getParam('course');
        const nameOk = this.nameValidation(name);
        const shortNameOk = this.shortNameValidation(shortName);
        const cityOk = this.cityValidation(city);

        if(nameOk && shortNameOk && cityOk){
            if(course){
                const data = {
                    id: course.id,
                    name,
                    short_name: shortName.toUpperCase(),
                    city,
                    address,
                    country,
                    id_sync: null,
                    ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                //this.props.updateCourse(data);
            }else {
                const data = {
                    name,
                    short_name: shortName.toUpperCase(),
                    city,
                    address,
                    country,
                    id_sync: null,
                    ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                //this.props.saveCourse(data);
            }
        }
    */}
}

export default AddCourseView;
