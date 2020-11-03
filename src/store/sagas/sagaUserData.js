import { Alert } from 'react-native';
import { call, select, put } from 'redux-saga/effects';
import AppConstants from '../../utils/AppConstants';
import * as NavigationService from '../../routes/NavigationService';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import { removeToken } from '../../utils/Session';
import NetInfo from "@react-native-community/netinfo";
import store from '../store';
import { actionLoading, actionSetUserData, actionGetUserData, actionProgress, actionGetSNWUser, actionGetTNWUser, actionGetPreferences, actionSavePlayer } from '../actions';
import Database from '../../database/database';
import moment from 'moment';

const database = new Database();
const axios = require('axios');

const getNetInfo = () => {
    return NetInfo.fetch().then(state => {
        return state;
    });
}

const getUserDataApi = (token) => {

    return axios.get(AppConstants.ApiUrl + 'auth/user', {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        timeout: 15000
    })
        .then(response => ({
            ok: true,
            data: response.data
        }))
        .catch(error => {
            console.log('====================================');
            console.log(error + ' file: sagaUserData, line: 37');
            console.log('====================================');
            if (error.code === 'ECONNABORTED') {
                return {
                    ok: false,
                    timeout: true,
                };
            }
            if (error.response.data) {
                if (error.response.data.message === 'Unauthenticated.') {
                    return {
                        ok: false,
                        timeout: false
                    }
                }
            }
        });
}

const insertUser = (values) => {

    return database.addUser(values).then(result => {
        if (result.insertId) {
            return {
                ok: true,
                userId: result.insertId
            }
        } else {
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaUserData, line: 62');
        console.log('====================================');
        return { ok: false }
    })
}

const selectUser = () => {

    return database.userById(1).then(result => {
        if (result.name) {
            return {
                ok: true,
                result
            }
        } else {
            console.log('====================================');
            console.log('no result.name file: sagaUserData, line: 77');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaUserData, line: 83');
        console.log('====================================');
        return { ok: false }
    })
}

export function* getUserData({ value }) {
    const language = yield select((state) => state.reducerLanguage);
    try {
        const dbUser = yield call(selectUser);
        if (!dbUser.ok) {
            const netInfo = yield call(getNetInfo);
            if (netInfo.isConnected) {
                const response = yield call(getUserDataApi, value);
                if (response) {
                    if (response.ok) {
                        const user = {
                            name: response.data.name,
                            last_name: response.data.last_name,
                            email: response.data.email,
                            nick_name: response.data.nick_name,
                            cellphone: response.data.cellphone,
                            language: response.data.language ? response.data.language : 'en',
                            handicap: response.data.handicap,
                            ghin_number: response.data.ghin_number,
                            photo: response.data.photo,
                            tee: 0,
                            strokes: 0,
                            id_sync: response.data.id,
                            ultimate_sync: null,
                        }
                        const insertResponse = yield call(insertUser, user);
                        if (insertResponse.ok) user.id = insertResponse.userId;

                        const snwData = {
                            automatic_presses_every: '2',
                            use_factor: '',
                            cantidad: '',
                            front_9: '',
                            back_9: '',
                            match: '',
                            medal: '',
                            carry: '',
                            id_sync: '',
                            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
                        }

                        const tnwData = {
                            automatic_presses_every: '2',
                            use_factor: '',
                            cantidad: '',
                            front_9: '',
                            back_9: '',
                            match: '',
                            medal: '',
                            carry: '',
                            who_gets_the_adv_strokes: '',
                            id_sync: '',
                            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
                        }

                        const gsData = {
                            rabbit_1_6: '',
                            rabbit_7_12: '',
                            rabbit_13_18: '',
                            medal_play_f9: '',
                            medal_play_b9: '',
                            medal_play_18: '',
                            skins: '',
                            skins_carry_over: '',
                            lowed_adv_on_f9: '',
                            id_sync: '',
                            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
                        }

                        const ebData = {
                            wager: '',
                            id_sync: '',
                            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
                        }

                        const asData = {
                            advantage_move: '',
                            strokes_moved_per_round: '',
                            adv_mov_if_only_9_holes: '',
                            does_the_carry_move: '',
                            id_sync: '',
                            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
                        }

                        const bbData = {
                            wager_f9: '',
                            wager_b9: '',
                            wager_18: '',
                            id_sync: '',
                            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
                        }

                        user.strokes = '';
                        yield put(actionSavePlayer({ player: user, snwData, tnwData, gsData, ebData, asData, bbData }));
                        yield put(actionSetUserData(user));
                        yield put(actionGetPreferences(user.id));
                        NavigationService.navigate('HomeTab');
                    } else if (!response.timeout) {
                        console.log('====================================');
                        console.log('session expired file: sagaUserData, line: 128');
                        console.log('====================================');
                        showMessage({
                            message: Dictionary.sessionExpired[language],
                            type: 'warning',
                            icon: 'warning'
                        });
                        removeToken();
                        NavigationService.navigate('IndexStack');
                    } else {
                        console.log('====================================');
                        console.log('time exceeded file: sagaUserData, line: 139');
                        console.log('====================================');
                        Alert.alert(
                            Dictionary.timeExceeded[language],
                            Dictionary.verifyConnection[language],
                            [
                                {
                                    text: Dictionary.signOut[language],
                                    onPress: () => {
                                        removeToken();
                                        NavigationService.navigate('IndexStack');
                                    },
                                    style: 'cancel'
                                },
                                {
                                    text: Dictionary.tryAgain[language],
                                    onPress: () => store.dispatch(actionGetUserData(value))
                                }
                            ]
                        );
                    }
                } else {
                    console.log('====================================');
                    console.log('no response file: sagaUserData, line: 162');
                    console.log('====================================');
                    Alert.alert(
                        Dictionary.somethingWrong[language],
                        '',
                        [
                            {
                                text: Dictionary.signOut[language],
                                onPress: () => {
                                    removeToken();
                                    NavigationService.navigate('IndexStack');
                                },
                                style: 'cancel'
                            },
                            {
                                text: Dictionary.tryAgain[language],
                                onPress: () => store.dispatch(actionGetUserData(value))
                            }
                        ]
                    );
                }
            } else {
                console.log('====================================');
                console.log('no internet file: sagaUserData, line: 185');
                console.log('====================================');
                Alert.alert(
                    Dictionary.noInternet[language],
                    '',
                    [
                        {
                            text: Dictionary.signOut[language],
                            onPress: () => {
                                removeToken();
                                NavigationService.navigate('IndexStack');
                            },
                            style: 'cancel'
                        },
                        {
                            text: Dictionary.tryAgain[language],
                            onPress: () => store.dispatch(actionGetUserData(value))
                        }
                    ]
                );
            }
        } else {
            const user = dbUser.result;
            yield put(actionSetUserData(user));
            yield put(actionGetPreferences(user.id));
            NavigationService.navigate('HomeTab');
        }
        yield put(actionLoading(false));
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaUserData, line: 209');
        console.log('====================================');
        yield put(actionLoading(false));
        Alert.alert(
            Dictionary.somethingWrong[language],
            '',
            [
                {
                    text: Dictionary.signOut[language],
                    onPress: () => {
                        removeToken();
                        NavigationService.navigate('IndexStack');
                    },
                    style: 'cancel'
                },
                {
                    text: Dictionary.tryAgain[language],
                    onPress: () => store.dispatch(actionGetUserData(value))
                }
            ]
        );
    }
}

const dbUpdateUser = (values) => {

    return database.updateUser(values).then(result => {
        if (result.rowsAffected) {
            return { ok: true }
        } else {
            console.log('====================================');
            console.log('no rowsAffected file: sagaUserData, line: 240');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaUserData, line: 246');
        console.log('====================================');
        return { ok: false }
    })
}

export function* updateUserData({ values }) {
    const language = yield select((state) => state.reducerLanguage);
    try {
        yield put(actionProgress(true));
        const response = yield call(dbUpdateUser, values);
        if (response.ok) {
            yield put(actionSetUserData(values));
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            NavigationService.goBack();
        } else {
            console.log('====================================');
            console.log('ok false file: sagaUserData, line: 265');
            console.log('====================================');
            showMessage({
                message: Dictionary.somethingWrong[language],
                type: 'danger',
                icon: 'danger'
            });
        }
        yield put(actionProgress(false));
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaUserData, line: 276');
        console.log('====================================');
        yield put(actionProgress(false));
        showMessage({
            message: Dictionary.somethingWrong[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}