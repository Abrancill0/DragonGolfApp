import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetTNWPlayer, actionGetTNWPlayer } from '../actions';

const database = new Database();

const insertTNWData = (values) => {
    
    return database.addTeamNassauSettings(values).then(result => {
        if(result.insertId){
            return {
                ok: true,
                tnwId: result.insertId
            }
        }else{
            console.log('====================================');
            console.log('no insertId file: sagaTNWUser, line: 19');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTNWUser, line: 25');
        console.log('====================================');
        return {ok: false}
    })
}

const updateTNWData = (values) => {
    
    return database.updateTeamNassauSettings(values).then(result => {
        if(result.rowsAffected){
            return {ok: true}
        }else{
            console.log('====================================');
            console.log('no rowsAffected file: sagaTNWUser, line: 38');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTNWUser, line: 44');
        console.log('====================================');
        return {ok: false}
    })
}

export function* saveTNWPlayer({values}){
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(updateTNWData, values);
        if(response.ok){
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetTNWPlayer(values.player_id));
        }else{
            const response = yield call(insertTNWData, values);
            if(response.ok){
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
                yield put(actionGetTNWPlayer(values.player_id));
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

const selectTNWPlayer = (id) => {

    return database.teamSettingsByPlayerId(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTNW, line: 106');
        console.log('====================================');
        return {ok: false}
    })
}

export function* getTNWPlayer({value}){
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(selectTNWPlayer, value);
        if(response.ok){
            yield put(actionSetTNWPlayer(response.result));
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaTNW, line: 122');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}