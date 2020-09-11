import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import * as NavigationService from '../../routes/NavigationService';
import moment from 'moment';
import { actionProgress, actionLoadingRound, actionSetMedalBets, actionGetMedalBets } from '../actions';

const database = new Database();

const insertMedalBet = (values) => {

    return database.insertMedalBet(values).then(result => {
        if (result.insertId) {
            return {
                ok: true,
                medalId: result.insertId
            }
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaMedalBet, line: 19');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaMedalBet, line: 26');
        console.log('====================================');
        return { ok: false }
    })
}

const insertMedalPlayers = (values) => {

    return database.insertMedalPlayer(values).then(result => {
        if (result.insertId) {
            return {
                ok: true,
                medalPlayerId: result.insertId
            }
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaMedalBet, line: 43');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaMedalBet, line: 48');
        console.log('====================================');
        return { ok: false }
    })
}

const updateMedalBet = (values) => {

    return database.updateMedalBet(values).then(result => {
        if (result.rowsAffected) {
            return {
                ok: true,
            }
        } else {
            console.log('====================================');
            console.log('no rowsAffected file: sagaMedalBet, line: 65');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaMedalBet, line: 72');
        console.log('====================================');
        return { ok: false }
    })
}

const deleteMedalPlayers = (medalId) => {

    return database.deleteMedalPlayers(medalId).then(result => {
        if (result.rowsAffected) {
            return {
                ok: true,
            }
        } else {
            console.log('====================================');
            console.log('no rowsAffected file: sagaMedalBet, line: 86');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaMedalBet, line: 72');
        console.log('====================================');
        return { ok: false }
    })
}

export function* saveMedalBet({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const roundId = yield select(state => state.reducerRoundId);
        values.round_id = roundId;
        const update = yield call(updateMedalBet, values);
        if (update.ok) {
            const deletePlayers = yield call(deleteMedalPlayers, values.medalId);
            if (deletePlayers.ok) {
                for (let idx = 0; idx < values.players.length; idx++) {
                    const medalPlayer = {
                        medalId: values.medalId,
                        memberId: values.players[idx].id,
                        nickname: values.players[idx].nick_name
                    };
                    yield call(insertMedalPlayers, medalPlayer);
                }
            }
        } else {
            const response = yield call(insertMedalBet, values);
            if (response.ok) {
                for (let idx = 0; idx < values.players.length; idx++) {
                    const medalPlayer = {
                        medalId: response.medalId,
                        memberId: values.players[idx].id,
                        nickname: values.players[idx].nick_name
                    };
                    yield call(insertMedalPlayers, medalPlayer);
                }
            }
        }
        yield put(actionGetMedalBets(roundId));
        NavigationService.goBack();
        yield put(actionProgress(false));
    } catch (error) {
        yield put(actionProgress(false));
        console.log('====================================');
        console.log(error + ' file: sagaMedalBet, line: 79');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const selectMedalBets = (id) => {

    return database.getMedalBets(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaMedalBets, line: 98');
        console.log('====================================');
        return { ok: false }
    })
}

export function* getMedalBet({ value }) {
    const language = yield select(state => state.reducerLanguage);
    const loadingRoundData = yield select(state => state.reducerLoadingRound);
    const loadingData = {
        ...loadingRoundData
    }
    loadingData.medalBet = false;

    try {
        const response = yield call(selectMedalBets, value);
        if (response.ok) {
            yield put(actionSetMedalBets(response.result));
        }
        yield put(actionLoadingRound(loadingData));
    } catch (error) {
        yield put(actionLoadingRound(loadingData));
        console.log('====================================');
        console.log(error + ' file: sagaSNBet, line: 110');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const deleteMedalBet = (medalId) => {

    return database.deleteMedalBet(medalId).then(result => {
        console.log(result)
        if (result.rowsAffected) {
            return {
                ok: true,
            }
        } else {
            console.log('====================================');
            console.log('no rowsAffected file: sagaMedalBet, line: 201');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaMedalBet, line: 207');
        console.log('====================================');
        return { ok: false }
    })
}

export function* removeMedalBet({ value }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        if (value.type === 'single') {
            yield call(deleteMedalBet, value.medalId);
            yield call(deleteMedalPlayers, value.medalId);
        } else {
            const bets = yield select(state => state.reducerMedalBets);
            for (let idx = 0; idx < bets.length; idx++) {
                yield call(deleteMedalBet, bets[idx].id);
                yield call(deleteMedalPlayers, bets[idx].id);
            }
        }
        const roundId = yield select(state => state.reducerRoundId);
        yield put(actionGetMedalBets(roundId));
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaSNBet, line: 223');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}