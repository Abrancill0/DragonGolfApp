import { call, select, put } from 'redux-saga/effects';
import * as NavigationService from '../../routes/NavigationService';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress } from '../actions';

const database = new Database();

const insertHoles = (values) => {
    return database.add18Holes(values).then(result => {
        if (result.insertId) {
            return {
                ok: true
            };
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaHoles, line: 20');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaHoles, line: 26');
        console.log('====================================');
        return { ok: false }
    });
}

const selectHoles = (teeId) => {
    return database.holesByTeeId(teeId).then(result => {
        if (result) {
            return {
                ok: true,
                result,
            };
        } else {
            console.log('====================================');
            console.log('no result file: sagaHoles, line: 43');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaHoles, line: 49');
        console.log('====================================');
        return { ok: false }
    });
}

const updateHoles = (values) => {
    return database.update18Holes(values).then(result => {
        if (Array.isArray(result)) {
            return {
                ok: true
            };
        } else {
            console.log('====================================');
            console.log('no result file: sagaHoles, line: 65');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaHoles, line: 71');
        console.log('====================================');
        return { ok: false }
    });
}

export function* saveHoles({values}) {
    const language = yield select(state => state.reducerLanguage);
    try {
        yield put(actionProgress(true));
        const response = yield call(selectHoles, values.teeId);
        if (response.ok) {
            if (response.result.length !== 0) {
                const response = yield call(updateHoles, values.holes);
                if(!response.ok){
                    console.log('====================================');
                    console.log('ok false file: sagaHoles, line: 87');
                    console.log('====================================');
                    showMessage({
                        message: Dictionary.somethingWrong[language],
                        description: Dictionary.tryAgain[language],
                        type: 'danger',
                        icon: 'danger'
                    });
                }else{
                    showMessage({
                        message: Dictionary.successSaveTeeData[language],
                        type: 'success',
                        icon: 'success'
                    });
                    NavigationService.goBack();
                }
            } else {
                const response = yield call(insertHoles, values.holes);
                if(!response.ok){
                    console.log('====================================');
                    console.log('ok false file: sagaHoles, line: 106');
                    console.log('====================================');
                    showMessage({
                        message: Dictionary.somethingWrong[language],
                        description: Dictionary.tryAgain[language],
                        type: 'danger',
                        icon: 'danger'
                    });
                }else{
                    showMessage({
                        message: Dictionary.successSaveTeeData[language],
                        type: 'success',
                        icon: 'success'
                    });
                    NavigationService.goBack();
                }
            }
        } else {
            console.log('====================================');
            console.log('ok false file: sagaHoles, line: 124');
            console.log('====================================');
            showMessage({
                message: Dictionary.somethingWrong[language],
                description: Dictionary.tryAgain[language],
                type: 'danger',
                icon: 'danger'
            });
        }
        yield put(actionProgress(false));
    } catch (error) {
        yield put(actionProgress(false));
        console.log('====================================');
        console.log(error + ' file: sagaHoles, line: 137');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}