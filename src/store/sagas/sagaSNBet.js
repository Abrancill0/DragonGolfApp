import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetSNBet, actionGetSNBet, actionLoadingRound, actionSaveBible } from '../actions';
import * as NavigationService from '../../routes/NavigationService';
import moment from 'moment';

const database = new Database();

const updateSNBet = (values) => {

    return database.updateBetSingleNassau(values).then(result => {
        if (result.rowsAffected) {
            return { ok: true }
        } else {
            console.log('====================================');
            console.log('no rowsAffected file: sagaSNBet, line: 16');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaSNBet, line: 22');
        console.log('====================================');
        return { ok: false }
    })
}

const insertSNBet = (values) => {

    return database.addBetSingleNassau(values).then(result => {
        if (result.insertId) {
            return {
                ok: true,
                snbId: result.insertId
            }
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaSNBet, line: 38');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaSNBet, line: 44');
        console.log('====================================');
        return { ok: false }
    })
}

export function* saveSNBet({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const round = yield select(state => state.reducerRound);
        const courses = yield select(state => state.reducerCourses);
        const idx = courses.findIndex(item => item.id == round.course_id);
        let courseName = 'Unknown';
        if (idx >= 0) courseName = courses[idx].name;
        const roundPlayers = yield select(state => state.reducerRoundPlayers);
        const playerIdx = roundPlayers.findIndex(item => item.id == values.member_a_id);
        const playerBIdx = roundPlayers.findIndex(item => item.id == values.member_b_id);
        if (playerIdx >= 0 && playerBIdx >= 0) {
            if (roundPlayers[playerIdx].player.id == 1 || roundPlayers[playerBIdx].player.id == 1) {
                const bibleData = {
                    round_id: values.round_id,
                    player_id: roundPlayers[roundPlayers[playerIdx].player.id == 1 ? playerBIdx : playerIdx].player.id,
                    nick_name: roundPlayers[playerIdx].player.id == 1 ? values.member_b : values.member_a,
                    date: round.date,
                    course_name: courseName,
                    played_hp: roundPlayers[playerIdx].player.id == 1 ? values.adv_strokes : -values.adv_strokes,
                    result: '',
                    next_hp: 0,
                    money: 0,
                    debts: 0,
                    notes: '',
                    is_manual: values.manually_override_adv,
                    id_sync: '',
                    ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss')
                };
                console.log(bibleData.is_manual);
                yield put(actionSaveBible(bibleData));
            }
        }
        const response = yield call(updateSNBet, values);
        if (response.ok) {
            showMessage({
                message: Dictionary.successSaveTeeData[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetSNBet(values.round_id));
            NavigationService.goBack();
        } else {
            const response = yield call(insertSNBet, values);
            if (response.ok) {
                showMessage({
                    message: Dictionary.successSaveTeeData[language],
                    type: 'success',
                    icon: 'success'
                });
                yield put(actionGetSNBet(values.round_id));
                NavigationService.goBack();
            } else {
                console.log('====================================');
                console.log('ok false file: sagaSNBet, line: 69');
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
        console.log(error + ' file: sagaSNBet, line: 82');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

export function* updatePress({ values }) {
    try {
        yield call(updateSNBet, values);
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaSNBet, line: 106');
        console.log('====================================');
    }
}

const selectSNBets = (id) => {

    return database.listBetsSingleNassau(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaSNBet, line: 93');
        console.log('====================================');
        return { ok: false }
    })
}

export function* getSNBet({ value }) {
    const language = yield select(state => state.reducerLanguage);
    const loadingRoundData = yield select(state => state.reducerLoadingRound);
    const loadingData = {
        ...loadingRoundData
    }
    loadingData.snBet = false;

    try {
        const response = yield call(selectSNBets, value);
        if (response.ok) {
            yield put(actionSetSNBet(response.result));
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

const deleteSNBetDB = (id) => {

    return database.deleteBetSingleNassau(id).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
}

const deleteAllSNBetDB = (id) => {

    return database.deleteAllBetsSingleNassauInRound(id).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
}

export function* deleteSNBet({ value }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        if (value.type === 'all') {
            yield call(deleteAllSNBetDB, value.round_id);
        } else {
            yield call(deleteSNBetDB, value.id);
        }
        yield put(actionGetSNBet(value.round_id));
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaSNBet, line: 152');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}