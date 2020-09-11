import { call, select, put, all } from 'redux-saga/effects';
import * as NavigationService from '../../routes/NavigationService';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionProgress, actionSetTees, actionGetTees, actionLoadingRound } from '../actions';

const database = new Database();

const insertTee = (values) => {

    return database.addTee(values).then(result => {
        if (result.insertId) {
            return {
                ok: true,
                teeId: result.insertId,
            };
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaTees, line: 20');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTees, line: 26');
        console.log('====================================');
        return { ok: false }
    });
}

const updtTee = (values) => {
    return database.updateTee(values).then(result => {
        console.log('============= ENTRA EN UPDATE TEE ============');
        if (result) {
            return {
                ok: true,
                teeId: result.insertId,
            };
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaTees, line: 41');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTees, line: 26');
        console.log('====================================');
        return { ok: false }
    });
}

export function* updateTee({ values }) {
    const language = yield select(state => state.reducerLanguage);
    try {
        yield put(actionProgress(true));
        const response = yield call(updtTee, values);
        if (response.ok) {
            showMessage({
                message: Dictionary.successUpdateTee[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetTees(values.course_id));
            NavigationService.goBack();
        } else {
            console.log('====================================');
            console.log('ok false file: sagaTees, line: 67');
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
        console.log(error + ' file: sagaTees, line: 50');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

export function* saveTee({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(insertTee, values);
        if (response.ok) {
            showMessage({
                message: Dictionary.successSaveTee[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetTees(values.course_id));
            NavigationService.goBack();
        } else {
            console.log('====================================');
            console.log('ok false file: sagaTees, line: 48');
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
        console.log(error + ' file: sagaTees, line: 61');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const getTeesFromDB = (value) => {

    return database.listTeeByCourseId(value).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTees, line: 81');
        console.log('====================================');
        return { ok: false }
    })
}

const getHoles = (id) => {

    return database.holesByTeeId(id).then(result => result);
}

export function* getTees({ value }) {
    const language = yield select(state => state.reducerLanguage);
    const loadingRoundData = yield select(state => state.reducerLoadingRound);
    const loadingData = {
        ...loadingRoundData
    }
    loadingData.tees = false;

    try {
        const response = yield call(getTeesFromDB, value);
        if (response.ok) {
            let tees = response.result;
            let noYards = false;
            for (let i = 0; i < tees.length; i++) {
                const holes = yield call(getHoles, tees[i].id);
                let yards = 0;
                if (holes.length > 0) {
                    for (let j = 0; j < holes.length; j++) {
                        if (holes[j].yards) yards += holes[j].yards;
                        else {
                            noYards = true;
                            break;
                        }
                    }
                }else{
                    noYards = true;
                }
                if (noYards) break;
                tees[i].yards = yards;
            }
            
            if (noYards) {
                tees.sort((a, b) => (a.slope < b.slope) ? 1 : (a.slope > b.slope) ? -1 : 0);
            } else {
                tees.sort((a, b) => (a.yards < b.yards) ? 1 : (a.yards > b.yards) ? -1 : 0);
            }
            yield put(actionSetTees(tees));
            yield put(actionLoadingRound(loadingData));
        } else {
            yield put(actionLoadingRound(loadingData));
            console.log('====================================');
            console.log('ok false file: sagaTees, line: 96');
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
        console.log(error + ' file: sagaTees, line: 107');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}


export function* saveYards({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(updateTee, values);
        if (response.ok) {
            yield put(actionGetTees(values.course_id));
        } else {
            console.log('====================================');
            console.log('ok false file: sagaTees, line: 142');
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
        console.log(error + ' file: sagaTees, line: 153');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const dropTee = (id) => {
    database.deleteTee(id).then(result => {
        console.log(result);
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaTees, line: 216');
        console.log('====================================');
    });
}

export function* deleteTee({ value }) {
    try {
        yield call(dropTee, value);
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaTees, line: 226');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}