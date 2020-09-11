/* eslint-disable prettier/prettier */
import { call, select, put } from 'redux-saga/effects';
import * as NavigationService from '../../routes/NavigationService';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetPlayers, actionGetPlayers, actionSaveSNWPlayer, actionSaveTNWPlayer, actionSaveGS, actionSaveEB, actionSaveAS, actionSaveBB } from '../actions';

const database = new Database();

const insertPlayer= (player) => {

    let cleaned = ('' + player.cellphone).replace(/\D/g, '');
    
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if(match) player.cellphone = match[1] + match[2] + match[3];

    return database.addPlayers(player).then(result => {
        if (result.insertId) {
            return {
                ok: true,
                playerId: result.insertId,
            };
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaPlayers, line: 22');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaPlayers, line: 28');
        console.log('====================================');
        return { ok: false }
    });
}

export function* savePlayer({ value }) {
    const language = yield select(state => state.reducerLanguage);
    try {
        yield put(actionProgress(true));
        const response = yield call(insertPlayer, value.player);
       if (response.ok) {
           value.snwData.player_id = response.playerId;
           value.tnwData.player_id = response.playerId;
           value.gsData.player_id = response.playerId;
           value.ebData.player_id = response.playerId;
           value.asData.player_id = response.playerId;
           value.bbData.player_id = response.playerId;
           yield put(actionSaveGS(value.gsData));
           yield put(actionSaveSNWPlayer(value.snwData));
           yield put(actionSaveTNWPlayer(value.tnwData));
           yield put(actionSaveEB(value.ebData));
           yield put(actionSaveAS(value.asData));
           yield put(actionSaveBB(value.bbData));
            showMessage({
                message: Dictionary.successSavePlayer[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetPlayers());
            NavigationService.goBack();
        } else {
            console.log('====================================');
            console.log('ok false file: sagaPlayers, line: 50');
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
        console.log(error + ' file: sagaPlayers, line: 63');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const selectPlayers = () => {

    return database.listPlayers().then(result => {
        if (result) {
            return {
                ok: true,
                result: result,
            };
        } else {
            console.log('====================================');
            console.log('no result file: sagaPlayers, line: 84');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaPlayers, line: 90');
        console.log('====================================');
        return { ok: false }
    });
}

export function* getPlayers(){
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(selectPlayers);
        if(response.ok){
            yield put(actionSetPlayers(response.result));
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaPlayers, line: 106');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const dbUpdatePlayer = (values) => {

    return database.updatePlayer(values).then(result => {
        if(result.rowsAffected){
            return {ok: true}
        }else{
            console.log('====================================');
            console.log('no rowsAffected file: sagaPlayers, line: 124');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaPlayers, line: 130');
        console.log('====================================');
        return {ok: false}
    });
}

export function* updatePlayer({values}){
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(dbUpdatePlayer, values);
        if(response.ok){
            yield put(actionGetPlayers());
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            if(values.editPlayer) NavigationService.navigate('PlayersView');
        }else{
            console.log('====================================');
            console.log('ok false file: sagaPlayers, line: 150');
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
        console.log(error + ' file: sagaPlayers, line: 161');
        console.log('====================================');
        yield put(actionProgress(false));
        showMessage({
            message: Dictionary.somethingWrong[language],
            type: 'danger',
            icon: 'danger'
        }); 
    }
}

const dbUpdatePlayerStrokes = (values) => {

    return database.updatePlayerStrokes(values).then(result => {
        if(result.rowsAffected){
            return {ok: true}
        }else{
            console.log('====================================');
            console.log('no rowsAffected file: sagaPlayers, line: 195');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaPlayers, line: 202');
        console.log('====================================');
        return {ok: false}
    });
}

export function* updatePlayerStrokes({values}){

    try {
        const response = yield call(dbUpdatePlayerStrokes, values);
        if(response.ok){
            yield put(actionGetPlayers());
        }else{
            console.log('====================================');
            console.log('ok false file: sagaPlayers, line: 217');
            console.log('====================================');
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaPlayers, line: 222');
        console.log('====================================');
    }
}

const dropPlayer = (id) => {

    database.deletePlayer(id);
}

export function* deletePlayer({value}){
    
    try {
        yield call(dropPlayer, value);
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaPlayers, line: 196');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            type: 'danger',
            icon: 'danger'
        }); 
    }
}