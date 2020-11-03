import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetSNWPlayer, actionGetSNWPlayer } from '../actions';

const database = new Database();

const insertSNWData = (values) => {
    
    return database.addSingleNassauSettings(values).then(result => {
        if(result.insertId){
            return {
                ok: true,
                snwId: result.insertId
            }
        }else{
            console.log('====================================');
            console.log('no insertId file: sagaSNWUser, line: 19');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaSNWUser, line: 25');
        console.log('====================================');
        return {ok: false}
    })
}

const updateSNWData = (values) => {
    
    return database.updateSingleNassauSettings(values).then(result => {
        if(result.rowsAffected){
            return {ok: true}
        }else{
            console.log('====================================');
            console.log('no rowsAffected file: sagaSNWUser, line: 38');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaSNWUser, line: 44');
        console.log('====================================');
        return {ok: false}
    })
}

export function* saveSNWPlayer({values}){
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(updateSNWData, values);
        if(response.ok){
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetSNWPlayer(values.player_id));
        }else{
            const response = yield call(insertSNWData, values);
            if(response.ok){
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
                yield put(actionGetSNWPlayer(values.player_id));
            }else{
                console.log('====================================');
                console.log('ok false file: sagaSNW, line: 73');
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
        console.log(error + ' file: sagaSNW, line: 86');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const selectSNWPlayer = (id) => {

    return database.singleSettingsByPlayerId(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaSNWUser, line: 122');
        console.log('====================================');
        return {ok: false}
    })
}

export function* getSNWPlayer({value}){
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(selectSNWPlayer, value);
        if(response.ok){
            yield put(actionSetSNWPlayer(response.result));
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaSNWUser, line: 138');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}