import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionSetHole, actionGetHole, actionLoadingRound } from '../actions';

const database = new Database();

const selectHole = (roundId) => {

    return database.listMembersByRoundIdWithHoles(roundId).then(result => {
        if (result) {
            return {
                ok: true,
                result
            }
        } else {
            console.log('====================================');
            console.log('no result file: sagaScore, line: 19');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaScore, line: 25');
        console.log('====================================');
        return { ok: false }
    });
}

export function* getHole({ values }) {
    const loadingRoundData = yield select(state => state.reducerLoadingRound);
    const loadingData = {
        ...loadingRoundData
    }
    loadingData.hole = false;

    try {
        const response = yield call(selectHole, values.roundId);
        if (response.ok) {
            yield put(actionSetHole(response.result));
        } else {
            console.log('====================================');
            console.log('ok false file: sagaScore, line: 19');
            console.log('====================================');
            showMessage({
                message: Dictionary.somethingWrong[language],
                description: Dictionary.tryAgain[language],
                type: 'danger',
                icon: 'danger'
            });
        }
        yield put(actionLoadingRound(loadingData));
    } catch (error) {
        yield put(actionLoadingRound(loadingData));
        console.log('====================================');
        console.log(error + ' file: sagaScore, line: 38');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const updateScore = (values) => {

    return database.updateScoreMemberInHole(values.hole, values.member).then(result => {
        if (result.rowsAffected) {
            return { ok: true }
        } else {
            console.log('====================================');
            console.log('no rowsAffected file: sagaScore, line: 68');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaScore, line: 67');
        console.log('====================================');
        return { ok: false }
    });
}

export function* saveScore({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(updateScore, values);
        yield put(actionGetHole({roundId: values.roundId}));
        if (!response.ok) {
            console.log('====================================');
            console.log('ok false file: sagaScore, line: 86');
            console.log('====================================');
            showMessage({
                message: Dictionary.somethingWrong[language],
                description: Dictionary.tryAgain[language],
                type: 'danger',
                icon: 'danger'
            });
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaScore, line: 78');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}