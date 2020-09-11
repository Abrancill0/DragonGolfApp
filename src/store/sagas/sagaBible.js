import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionSetBible, actionGetBible } from '../actions';

const database = new Database();

const getBibleById = (id) => {

    return database.getTheBibleById(id).then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaBible, line: 24');
        console.log('====================================');
        return { ok: false }
    })
}

const insertBible = (data) => {

    return database.insertIntoBible(data).then(result => {
        if (result.insertId) {
            return {
                ok: true,
                insertId: result.insertId
            }
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaBible, line: 33');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaBible, line: 39');
        console.log('====================================');
        return { ok: false }
    })
}

const updateBibleDB = (data) => {

    return database.updateBible(data).then(result => {
        if (result.rowsAffected) {
            return {
                ok: true
            }
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaBible, line: 56');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaBible, line: 39');
        console.log('====================================');
        return { ok: false }
    })
}

export function* saveBible({ values }) {

    try {
        const bibleData = yield call(getBibleById, values.round_id);
        if (bibleData.result?.length) {
            const idx = bibleData.result.findIndex(item => item.player_id == values.player_id);
            if (idx >= 0) {
                const data = { ...bibleData.result[idx] };
                data.date = values.date;
                data.played_hp = values.played_hp;
                data.ultimate_sync = values.ultimate_sync;
                yield call(updateBibleDB, data);
            }else{
                yield call(insertBible, values);
            }
        } else {
            yield call(insertBible, values);
        }
        yield put(actionGetBible());
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaBible, line: 86');
        console.log('====================================');
    }
}

export function* updateBible({ values }) {

    try {
        yield call(updateBibleDB, values);
        yield put(actionGetBible());
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaBible, line: 90');
        console.log('====================================');
    }
}

const updateBibleDebtsDB = (data) => {

    return database.updateBibleDebts(data).then(result => {
        if (result.rowsAffected) {
            return {
                ok: true
            }
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaBible, line: 56');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaBible, line: 39');
        console.log('====================================');
        return { ok: false }
    })
}

export function* updateBibleDebts({ values }) {
    console.log(values);

    try {
        yield call(updateBibleDebtsDB, values);
        yield put(actionGetBible());
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaBible, line: 90');
        console.log('====================================');
    }
}

const selectBible = () => {

    return database.getTheBible().then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaBible, line: 93');
        console.log('====================================');
        return { ok: false }
    })
}

export function* getBible() {
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(selectBible);
        if(response.ok){
            response.result.sort((a, b) => {
                if(a.date < b.date) return 1;
                if(a.date > b.date) return -1;
                if(a.round_id < b.round_id) return 1;
                if(a.round_id > b.round_id) return -1;

                return 0;
            });
            yield put(actionSetBible(response.result));
        }else{
            console.log('====================================');
            console.log('ok false file: sagaBible, line: 127');
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
        console.log(error + ' file: sagaBible, line: 106');
        console.log('====================================');
    }
}