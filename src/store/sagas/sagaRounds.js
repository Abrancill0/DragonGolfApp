import { call, select, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import * as NavigationService from '../../routes/NavigationService';
import Database from '../../database/database';
import { actionSetRoundId, actionSetRounds, actionGetRounds, actionSetRoundPlayers, actionGetRoundPlayers, actionGetHole, actionSetStrokes, actionLoadingRound, actionSetRound } from '../actions';

const database = new Database();

const insertRound = (values) => {

    return database.addRound(values).then(result => {
        if (result.insertId) {
            return {
                ok: true,
                roundId: result.insertId,
            };
        } else {
            console.log('====================================');
            console.log('no insertId file: sagaRounds, line: 19');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 25');
        console.log('====================================');
        return { ok: false }
    });
}

export function* saveRound({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(insertRound, values);
        if (response.ok) {
            yield put(actionSetRoundId(response.roundId));
            yield put(actionSetRound(values));
        } else {
            console.log('====================================');
            console.log('no insert id file: sagaRounds, line: 41');
            console.log('====================================');
            showMessage({
                message: Dictionary.somethingWrong[language],
                description: Dictionary.tryAgain[language],
                type: 'danger',
                icon: 'danger'
            });
            NavigationService.navigate('HomeTab');
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 52');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
        NavigationService.navigate('HomeTab');
    }
}

const updateRoundDB = (values) => {

    return database.updateRound(values).then(result => {
        if (result.rowsAffected) {
            return { ok: true }
        } else {
            console.log('====================================');
            console.log('no rowsAffected file: sagaRounds, line: 72');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 78');
        console.log('====================================');
        return { ok: false }
    });
}

export function* updateRound({ values }) {

    try {
        yield call(updateRoundDB, values);
        yield put(actionSetRound(values));
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 84');
        console.log('====================================');
    }
}

const selectRounds = () => {

    return database.listRounds().then(result => {
        if (result) {
            return {
                ok: true,
                result
            }
        } else {
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 101');
        console.log('====================================');
        return { ok: false }
    });
}

export function* getRounds() {
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(selectRounds);
        if (response.ok) {
            yield put(actionSetRounds(response.result));
        } else {
            console.log('====================================');
            console.log('ok false file: sagaRounds, line: 123');
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
        console.log(error + ' file: sagaRounds, line: 134');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const dropRound = (id) => {

    return database.deleteRound(id);
}

export function* deleteRound({ value }) {

    try {
        yield call(dropRound, value);
        yield put(actionGetRounds());
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 156');
        console.log('====================================');
    }
}

const insertRoundPlayer = (values) => {

    return database.addMember(values).then(result => {
        if (result.insertId) {
            return { ok: true }
        } else {
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 168');
        console.log('====================================');
        return { ok: false }
    });
}

export function* saveRoundPlayer({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        let exists = false;
        const players = yield call(selectRoundPlayers, values.round_id);
        if (players.ok) {
            const { result } = players;
            for (let index = 0; index < result.length; index++) {
                if (result[index].player.id == values.player_id) {
                    exists = true;
                    break;
                }
            }
        }
        if (!exists) {
            values.position = players.result.length + 1;
            const response = yield call(insertRoundPlayer, values);
            if (response.ok) {
                yield put(actionGetRoundPlayers(values.round_id));
                yield put(actionGetHole({ roundId: values.round_id }));
            } else {
                console.log('====================================');
                console.log('ok false file: sagaRounds, line: 191');
                console.log('====================================');
                showMessage({
                    message: Dictionary.somethingWrong[language],
                    description: Dictionary.tryAgain[language],
                    type: 'danger',
                    icon: 'danger'
                });
            }
        } else {
            showMessage({
                message: `${values.nick_name} ${Dictionary.alredyAdded[language]}`,
                type: 'warning',
                icon: 'warning'
            });
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 209');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const selectRoundPlayers = (id) => {

    return database.listMembersByRoundId(id).then(result => {
        if (result) {
            return {
                ok: true,
                result
            }
        } else {
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 226');
        console.log('====================================');
        return { ok: false }
    });
}

export function* getRoundPlayers({ value }) {
    const language = yield select(state => state.reducerLanguage);
    const loadingRoundData = yield select(state => state.reducerLoadingRound);
    const loadingData = {
        ...loadingRoundData
    }
    loadingData.roundPlayers = false;

    try {
        const response = yield call(selectRoundPlayers, value);
        if (response.ok) {
            yield put(actionSetRoundPlayers(response.result));
        } else {
            console.log('====================================');
            console.log('ok false file: sagaRounds, line: 260');
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
        console.log(error + ' file: sagaRounds, line: 271');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const dropRoundPlayer = (playerId, roundId) => {
    return database.deleteMemberByPlayerAndRound(playerId, roundId).then(result => {
        console.log(result);
    });
}

const dropRoundMember = (id) => {
    return database.deleteMember(id).then(result => {
        console.log(result);
    });
}

export function* deleteRoundPlayer({ value }) {
    try {
        if (value.params == 2) {
            yield call(dropRoundPlayer, value.playerId, value.roundId);
            yield put(actionGetHole({ roundId: value.roundId }));
            yield put(actionGetRoundPlayers(value.roundId));
        } else {
            yield call(dropRoundMember, value.memberId);
            yield put(actionGetHole({ roundId: value.roundId }));
            yield put(actionGetRoundPlayers(value.roundId));
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 302');
        console.log('====================================');
    }
}

const updatePlayerPositionDB = (values) => {

    return database.updatePositionOfMembers(values).then(result => {
        console.log(result);
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 316');
        console.log('====================================');
    });
}

export function* updatePlayerPosition({ values }) {
    try {
        values.players.forEach((item, index) => {
            item.position = index + 1;
        });
        yield call(updatePlayerPositionDB, values.players);
        yield put(actionGetHole({ roundId: values.roundId }));
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 330');
        console.log('====================================');
    }
}

const updatePlayerTeeDB = (values) => {

    return database.updateTeeOfMember(values).then(result => {
        console.log(result);
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 316');
        console.log('====================================');
    });
}

export function* updatePlayerTee({ values }) {

    try {
        yield call(updatePlayerTeeDB, values);
        yield put(actionGetRoundPlayers(values.round_id));
        yield put(actionGetHole({ roundId: values.round_id }))
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 352');
        console.log('====================================');
    }
}

const insertStrokes = (strokes) => {

    return database.addPlayerConfrontation(strokes).then(result => {
        console.log(result);
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 341');
        console.log('====================================');
    });
}

const updateStrokes = (strokes) => {

    return database.updatePlayerConfrontation(strokes).then(result => {
        if (result.rowsAffected) {
            return { ok: true };
        } else {
            return { ok: false };
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 356');
        console.log('====================================');
        return { ok: false };
    });
}

export function* saveStrokes({ values }) {
    try {
        const response = yield call(updateStrokes, values);
        if (!response.ok) {
            yield call(insertStrokes, values);
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 370');
        console.log('====================================');
    }
}

const selectStrokes = (id) => {

    return database.listPlayersConfrontations(id).then(result => {
        if (result.length) {
            return { ok: true, result };
        } else {
            return { ok: false };
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 385');
        console.log('====================================');
        return { ok: false };
    })
}

export function* getStrokes({ value }) {

    try {
        const response = yield call(selectStrokes, value);
        if (response.ok) {
            yield put(actionSetStrokes(response.result));
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 397');
        console.log('====================================');
    }
}

export function* insertStrokesWithValidation({ value }) {
    try {
        const response = yield call(selectStrokes, value.member_a_id);
        if (response.ok) {
            const filterResult = response.result.filter(data => {
                return value.member_a_id == data.member_a_id && value.member_b_id == data.member_b_id;
            });
            if (!filterResult.length) {
                yield call(insertStrokes, value);
            }
        } else {
            yield call(insertStrokes, value);
        }
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaRounds, line: 453');
        console.log('====================================');
    }
}