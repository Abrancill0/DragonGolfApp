import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetTNBet, actionGetTNBet, actionLoadingRound } from '../actions';
import * as NavigationService from '../../routes/NavigationService';

const database = new Database();

const updateTNBet = (values) => {

    return database.updateBetTeamNassau(values).then(result => {
        if (result.rowsAffected) {
            return { ok: true }
        } else {
            console.log('====================================');
            console.log('no rowsAffected file: sagaTNBet, line: 16');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTNBet, line: 22');
        console.log('====================================');
        return { ok: false }
    })
}

const insertTNBet = (values) => {

    return database.addBetTeamNassau(values).then(result => {
        if (result.insertId) {
            return {
                ok: true,
                snbId: result.insertId
            }
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaTNBet, line: 38');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTNBet, line: 44');
        console.log('====================================');
        return { ok: false }
    })
}

export function* saveTNBet({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(updateTNBet, values);
        if (response.ok) {
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetTNBet(values.round_id));
            NavigationService.goBack();
        } else {
            const response = yield call(insertTNBet, values);
            if (response.ok) {
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
                yield put(actionGetTNBet(values.round_id));
                NavigationService.goBack();
            } else {
                console.log('====================================');
                console.log('ok false file: sagaTNBet, line: 69');
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
        console.log(error + ' file: sagaTNBet, line: 82');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

export function* updateTNPress({ values }) {
    try {
        yield call(updateTNBet, values);
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaTNBet, line: 106');
        console.log('====================================');
    }
}

const selectTNBets = (id) => {

    return database.listBetsTeamNassau(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTNBet, line: 93');
        console.log('====================================');
        return { ok: false }
    })
}

export function* getTNBet({ value }) {
    const language = yield select(state => state.reducerLanguage);
    const loadingRoundData = yield select(state => state.reducerLoadingRound);
    const loadingData = {
        ...loadingRoundData
    }
    loadingData.tnBet = false;

    try {
        const response = yield call(selectTNBets, value);
        if (response.ok) {
            yield put(actionSetTNBet(response.result));
        }
        yield put(actionLoadingRound(loadingData));
    } catch (error) {
        yield put(actionLoadingRound(loadingData));
        console.log('====================================');
        console.log(error + ' file: sagaTNBet, line: 110');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const deleteTNBetDB = (id) => {

    return database.deleteBetTeamNassau(id).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
}

const deleteAllTNBetDB = (id) => {

    return database.deleteAllBetsTeamNassauInRound(id).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
}

export function* deleteTNBet({ value }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        if (value.type === 'all') {
            yield call(deleteAllTNBetDB, value.round_id);
        } else {
            yield call(deleteTNBetDB, value.id);
        }
        yield put(actionGetTNBet(value.round_id));
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaTNBet, line: 152');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}