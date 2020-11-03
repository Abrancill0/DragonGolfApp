import { call, select, put } from 'redux-saga/effects';
import AppConstants from '../../utils/AppConstants';
import { actionLoading, actionSignUpError, actionSignInError, actionSignIn, actionGetUserData, actionSetUserData } from '../actions';
import { showMessage } from 'react-native-flash-message';
import store from '../store';
import { Dictionary } from '../../utils/Dictionary';
import { setSessionToken, getSessionToken, removeToken } from '../../utils/Session';
import * as NavigationService from '../../routes/NavigationService';
import Colors from '../../utils/Colors';
import NetInfo from "@react-native-community/netinfo";
const axios = require('axios');

const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    },
    timeout: 10000
}

const signInApi = ({email, password}) => {
    const body = new FormData();
    body.append('email', email);
    body.append('password', password);

    return axios.post(AppConstants.ApiUrl + 'auth/login', body, config)
    .then(response => {
        return {
            ok: true,
            ...response.data
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaAuth, line: 34');
        console.log('====================================');
        const state = store.getState();
        const language = state.reducerLanguage;
        if(error.code === 'ECONNABORTED'){
            return {
                ok: false,
                timeout: true,
                message: Dictionary.timeExceeded[language],
                error: Dictionary.verifyConnection[language],
            };
        }
        if(error.response.data){
            const { message } = error.response.data;
            if(message === 'Unauthorized'){
                return {
                    ok: false,
                    timeout: false,
                    message: Dictionary.invalidLogin[language],
                    error: Dictionary.tryLoginAgain[language],
                };
            }
        }
    })
}

const getNetInfo = () => {
    return NetInfo.fetch().then(state => {
        return state;
    });
}

export function* signIn({values}){
    const language = yield select((state) => state.reducerLanguage);
    try {
        yield put(actionLoading(true));
        const netInfo = yield call(getNetInfo);
        if(netInfo.isConnected){
            const response = yield call(signInApi, values);
            if(response){
                if(response.ok){
                    if(response.access_token){
                        yield call(setSessionToken, response.access_token);
                        const token = response.access_token;
                        if(token){
                            yield put(actionGetUserData(token));
                        }else{
                            console.log('====================================');
                            console.log('no token file: sagaAuth, line: 82');
                            console.log('====================================');
                        }
                    }else{
                        yield put(actionLoading(false));
                        showMessage({
                            message: response.message,
                            description: response.error,
                            type: 'danger',
                            icon: 'danger'
                        });
                    }
                }else if(!response.timeout){
                    console.log('====================================');
                    console.log('!response.timeout file: sagaAuth, line: 96');
                    console.log('====================================');
                    yield put(actionSignInError(response));
                }else{
                    console.log('====================================');
                    console.log('ok false file: sagaAuth, line: 100');
                    console.log('====================================');
                    yield put(actionLoading(false));
                    showMessage({
                        message: response.message,
                        description: response.error,
                        type: 'danger',
                        icon: 'danger'
                    });
                }
            }else{
                console.log('====================================');
                console.log('response undefined file: sagaAuth, line: 113');
                console.log('====================================');
                yield put(actionLoading(false));
                showMessage({
                    message: Dictionary.somethingWrong[language],
                    description: Dictionary.tryAgain[language],
                    type: 'danger',
                    icon: 'danger'
                });
            }
        }else{
            console.log('====================================');
            console.log('no internet file: sagaAuth, line: 125');
            console.log('====================================');
            yield put(actionLoading(false));
            showMessage({
                message: Dictionary.noInternet[language],
                type: 'danger',
                icon: 'danger'
            });
        }
    } catch (error) {
        yield put(actionLoading(false));
        console.log('====================================');
        console.log(error + ' file: sagaAuth, line: 137');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const signUpApi = (data) => {
    let {
        cellphone,
        codeNumber,
        email,
        ghin,
        handicap,
        name,
        lastName,
        nickname,
        password,
        profilePicture
    } = data;

    let cleaned = ('' + cellphone).replace(/\D/g, '');
    
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if(match) cellphone = match[1] + match[2] + match[3];

    name = name.trim();
    lastName = lastName.trim();

    const body = new FormData();
    body.append('name', name);
    body.append('last_name', lastName);
    body.append('nick_name', nickname);
    body.append('email', email);
    body.append('password', password);
    body.append('cellphone', '+' + codeNumber + cellphone);
    body.append('ghin_number', ghin);
    body.append('handicap', handicap);

    if(profilePicture){
        const file = {
            uri: profilePicture.uri,
            type: 'image/jpeg', // or photo.type
            name: 'profilePicture.jpg'
          };
          body.append('photo', file);
    }

    return axios.post(AppConstants.ApiUrl + 'auth/signup', body, config)
    .then(response => {
        return {
            ok: true,
            ...response.data
        }
    })
    .catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaAuth, line: 198');
        console.log('====================================');
        const state = store.getState();
        const language = state.reducerLanguage;
        if(error.code === 'ECONNABORTED'){
            return {
                ok: false,
                timeout: true,
                message: Dictionary.timeExceeded[language],
                error: Dictionary.verifyConnection[language],
            };
        }
        if(error.response.data){
            const { errors } = error.response.data;
            if(errors){
                if(errors.email){
                    return {
                        ok: false,
                        timeout: false,
                        message: Dictionary.invalidData[language],
                        error: Dictionary.emailTaken[language]
                    }
                }else if(errors.ghin_number){
                    return {
                        ok: false,
                        timeout: false,
                        message: Dictionary.invalidData[language],
                        error: Dictionary.ghinNumberTaken[language]
                    }
                }else if(errors.nick_name){
                    return {
                        ok: false,
                        timeout: false,
                        message: Dictionary.invalidData[language],
                        error: Dictionary.nicknameTaken[language]
                    }
                }
            }
        }
    });
}

export function* signUp({values}){
    const language = yield select((state) => state.reducerLanguage);
    try {
        yield put(actionLoading(true));
        const netInfo = yield call(getNetInfo);
        if(netInfo.isConnected){
            const response = yield call(signUpApi, values);
            if(response){
                if(response.ok){
                    yield put(actionLoading(false));
                    yield put(actionSignIn({email: values.email, password: values.password}));
                }else if(!response.timeout){
                    console.log('====================================');
                    console.log('!response.timeout file: sagaAuth, line: 253');
                    console.log('====================================');
                    yield put(actionSignUpError(response));
                }else{
                    console.log('====================================');
                    console.log('ok false file: sagaAuth, line: 258');
                    console.log('====================================');
                    yield put(actionLoading(false));
                    showMessage({
                        message: response.message,
                        description: response.error,
                        type: 'danger',
                        icon: 'danger'
                    });
                }
            }else{
                console.log('====================================');
                console.log('response undefined file: sagaAuth, line: 270');
                console.log('====================================');
                yield put(actionLoading(false));
                showMessage({
                    message: Dictionary.somethingWrong[language],
                    description: Dictionary.tryAgain[language],
                    type: 'danger',
                    icon: 'danger'
                });
            }
        }else{
            yield put(actionLoading(false));
            console.log('====================================');
            console.log('no internet file: sagaAuth, line: 283');
            console.log('====================================');
            showMessage({
                message: Dictionary.noInternet[language],
                type: 'danger',
                icon: 'danger'
            });
        }
    } catch (error) {
        yield put(actionLoading(false));
        console.log('====================================');
        console.log(error + ' file: sagaAuth, line: 294');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const signOutApi = (token) => {
    return axios.get(AppConstants.ApiUrl + 'auth/logout', {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        timeout: 15000
    })
    .then(response => {
        return {
            ok: true,
            ...response.data
        }
    })
    .catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaAuth, line: 321');
        console.log('====================================');
        console.log(error.response.data);
        return {
            ok: false
        }
    });
}

export function* signOut(){
    try {
        yield put(actionLoading(true));
        const token = yield call(getSessionToken);
        const response = yield call(signOutApi, token);
        yield call(removeToken);
        const language = yield select(state => state.reducerLanguage);
        const {name} = yield select(state => state.reducerUserData);
        yield put(actionLoading(false));
        showMessage({
            message: '👋  ' + Dictionary.seeYou[language] + name,
            backgroundColor: Colors.White,
            color: Colors.Black
        });
        NavigationService.navigate('IndexStack');
    } catch (error) {
        yield put(actionLoading(false));
        console.log('====================================');
        console.log(error + ' file: sagaAuth, line: 348');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}