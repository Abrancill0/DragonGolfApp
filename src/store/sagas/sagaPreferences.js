import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetPreferences, actionGetPreferences } from '../actions';

const database = new Database();

const insertPreferences = (values) => {

    return database.addPreferences(values).then(result => {
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
        console.log(error + ' file: sagaPreferences, line: 19');
        console.log('====================================');
        return { ok: false }
    });
}

const updatePreferences = (values) => {

    return database.updatePreferences(values).then(result => {
        if(result.rowsAffected){
            return {ok: true}
        }else{
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaPreferences, line: 35');
        console.log('====================================');
        return { ok: false }
    })
}

export function* savePreferences({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        if (values.havePreferences) {
            const response = yield call(updatePreferences, values);
            if (response.ok) {
                yield put(actionGetPreferences(values.user_id));
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
            } else {
                console.log('====================================');
                console.log('ok false file: sagaPreferences, line: 56');
                console.log('====================================');
                showMessage({
                    message: Dictionary.somethingWrong[language],
                    description: Dictionary.tryAgain[language],
                    type: 'danger',
                    icon: 'danger'
                });
            }
        } else {
            const response = yield call(insertPreferences, values);
            if (response.ok) {
                yield put(actionGetPreferences(response.userId));
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
            } else {
                console.log('====================================');
                console.log('ok false file: sagaPreferences, line: 75');
                console.log('====================================');
                showMessage({
                    message: Dictionary.somethingWrong[language],
                    description: Dictionary.tryAgain[language],
                    type: 'danger',
                    icon: 'danger'
                });
            }
        }
        yield put(actionProgress(false));
    } catch (error) {
        yield put(actionProgress(false));
        console.log('====================================');
        console.log(error + ' file: sagaPreferences, line: 52');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const selectPreferences = (id) => {
    return database.preferencesByUserId(id).then(result => {
        if (result.user_id) {
            return {
                ok: true,
                result
            }
        } else {
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaPreferences, line: 76');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
        return { ok: false }
    });
}

export function* getPreferences({ value }) {

    try {
        const response = yield call(selectPreferences, value);
        if (response.ok) {
            yield put(actionSetPreferences(response.result));
        } else {
            console.log('====================================');
            console.log('ok false file: sagaPreferences, line: 97');
            console.log('====================================');
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaPreferences, line: 102');
        console.log('====================================');
    }
}