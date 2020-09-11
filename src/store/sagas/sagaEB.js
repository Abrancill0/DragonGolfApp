import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetEB, actionGetEB } from '../actions';

const database = new Database();

const insertEB = (values) => {
    return database.addExtraBets(values).then(result => {
        if(result.insertId){
            return {
                ok: true,
                ebId: result.insertId
            }
        }else{
            console.log('====================================');
            console.log('no insertId file: sagaEB, line: 18');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaEB, line: 24');
        console.log('====================================');
        return {ok: false}
    })
}

const updateEBData = (values) => {
    
    return database.updateExtraBets(values).then(result => {
        if(result.rowsAffected){
            return {ok: true}
        }else{
            console.log('====================================');
            console.log('no rowsAffected file: sagaEB, line: 37');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaEB, line: 43');
        console.log('====================================');
        return {ok: false}
    })
}

export function* saveEBData({values}){
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(updateEBData, values);
        if(response.ok){
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetEB(values.player_id));
        }else{
            const response = yield call(insertEB, values);
            if(response.ok){
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
                yield put(actionGetEB(values.player_id));
            }else{
                console.log('====================================');
                console.log('ok false file: sagaEB, line: 73');
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
        console.log(error + ' file: sagaEB, line: 86');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const selectEB = (id) => {

    return database.extraBetsByPlayerId(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaEB, line: 107');
        console.log('====================================');
        return {ok: false}
    })
}

export function* getEBPlayer({value}){
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(selectEB, value);
        if(response.ok){
            yield put(actionSetEB(response.result));
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaEB, line: 123');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}