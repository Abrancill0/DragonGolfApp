import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionGetBB, actionSetBB } from '../actions';

const database = new Database();

const insertBB = (values) => {
    
    return database.addBestBallTeams(values).then(result => {
        if(result.insertId){
            return {
                ok: true,
                snwId: result.insertId
            }
        }else{
            console.log('====================================');
            console.log('no insertId file: sagaBB, line: 18');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaBB, line: 24');
        console.log('====================================');
        return {ok: false}
    })
}

const updateBBData = (values) => {
    
    return database.updateBestBallTeams(values).then(result => {
        if(result.rowsAffected){
            return {ok: true}
        }else{
            console.log('====================================');
            console.log('no rowsAffected file: sagaBB, line: 37');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaBB, line: 43');
        console.log('====================================');
        return {ok: false}
    })
}

export function* saveBB({values}){
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(updateBBData, values);
        if(response.ok){
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetBB(values.player_id));
        }else{
            const response = yield call(insertBB, values);
            if(response.ok){
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
                yield put(actionGetBB(values.player_id));
            }else{
                console.log('====================================');
                console.log('ok false file: sagaBB, line: 73');
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
        console.log(error + ' file: sagaBB, line: 86');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const selectBB = (id) => {

    return database.bestBallTeamsByPlayerId(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaBB, line: 107');
        console.log('====================================');
        return {ok: false}
    })
}

export function* getBBPlayer({value}){
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(selectBB, value);
        if(response.ok){
            yield put(actionSetBB(response.result));
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaBB, line: 123');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}