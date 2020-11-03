import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetAS, actionGetAS } from '../actions';

const database = new Database();

const insertAS = (values) => {
    
    return database.addAdvantageSettings(values).then(result => {
        if(result.insertId){
            return {
                ok: true,
                snwId: result.insertId
            }
        }else{
            console.log('====================================');
            console.log('no insertId file: sagaAS, line: 18');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaAS, line: 24');
        console.log('====================================');
        return {ok: false}
    })
}

const updateASData = (values) => {
    
    return database.updateAdvantageSettings(values).then(result => {
        if(result.rowsAffected){
            return {ok: true}
        }else{
            console.log('====================================');
            console.log('no rowsAffected file: sagaAS, line: 37');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaAS, line: 43');
        console.log('====================================');
        return {ok: false}
    })
}

export function* saveAS({values}){
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(updateASData, values);
        if(response.ok){
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetAS(values.player_id));
        }else{
            const response = yield call(insertAS, values);
            if(response.ok){
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
                yield put(actionGetAS(values.player_id));
            }else{
                console.log('====================================');
                console.log('ok false file: sagaAS, line: 73');
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
        console.log(error + ' file: sagaAS, line: 86');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const selectAS = (id) => {

    return database.advantageSettingsByPlayerId(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaAS, line: 107');
        console.log('====================================');
        return {ok: false}
    })
}

export function* getASPlayer({value}){
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(selectAS, value);
        if(response.ok){
            yield put(actionSetAS(response.result));
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaAS, line: 123');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}