import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetGS, actionGetGS } from '../actions';

const database = new Database();

const insertGS = (values) => {
    
    return database.addGeneralSettings(values).then(result => {
        if(result.insertId){
            return {
                ok: true,
                snwId: result.insertId
            }
        }else{
            console.log('====================================');
            console.log('no insertId file: sagaGS, line: 18');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaSNWUser, line: 24');
        console.log('====================================');
        return {ok: false}
    })
}

const updateGSData = (values) => {
    
    return database.updateGeneralSettings(values).then(result => {
        if(result.rowsAffected){
            return {ok: true}
        }else{
            console.log('====================================');
            console.log('no rowsAffected file: sagaGS, line: 37');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaGS, line: 43');
        console.log('====================================');
        return {ok: false}
    })
}

export function* saveGS({values}){
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(updateGSData, values);
        if(response.ok){
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetGS(values.player_id));
        }else{
            const response = yield call(insertGS, values);
            if(response.ok){
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
                yield put(actionGetGS(values.player_id));
            }else{
                console.log('====================================');
                console.log('ok false file: sagaGS, line: 73');
                console.log('====================================');
                showMessage({
                    message: Dictionary.somethingWrong[language],
                    type: 'danger',
                    icon: 'danger'
                });
            }
        }
        yield put(actionProgress(false));
    } catch (error) {
        yield put(actionProgress(false));
        console.log('====================================');
        console.log(error + ' file: sagaGS, line: 86');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const selectGS = (id) => {

    return database.generalSettingsById(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaGS, line: 107');
        console.log('====================================');
        return {ok: false}
    })
}

export function* getGSPlayer({value}){
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(selectGS, value);
        if(response.ok){
            yield put(actionSetGS(response.result));
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaGS, line: 123');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}