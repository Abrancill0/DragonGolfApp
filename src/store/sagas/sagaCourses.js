/* eslint-disable prettier/prettier */
import { call, select, put } from 'redux-saga/effects';
import * as NavigationService from '../../routes/NavigationService';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../utils/Dictionary';
import Database from '../../database/database';
import { actionSetCourses, actionGetCourses, actionProgress } from '../actions';

const database = new Database();

const insertCourse = (values) => {
    
    return database.addCourse(values).then(result => {
        if(result.insertId){
            return {
                ok: true,
                courseId: result.insertId,
            };
        }else{
            console.log('====================================');
            console.log('no insertId file: sagaCourses, line: 21');
            console.log('====================================');
            return {ok: false}
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaCourses, line: 24');
        console.log('====================================');
        return {ok: false}
    });
}

const updtCourse = (values) => {
    return database.updateCourse(values).then(result => {
        if (result) {
            return {
                ok: true,
            };
        } else {
            console.log('====================================');
            console.log('no result file: sagaCourses, line: 41');
            console.log('====================================');
            return { ok: false }
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaCourses, line: 47');
        console.log('====================================');
        return { ok: false }
    });
}

export function* updateCourse({values}) {
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(updtCourse, values);
        if (response.ok) {
            showMessage({
                message: Dictionary.successUpdateCourse[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetCourses());
            NavigationService.goBack();
        } else {
            console.log('====================================');
            console.log('ok false file: sagaCourses, line: 69');
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
        console.log(error + ' file: sagaCourses, line: 82');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

export function* saveCourse({ values }) {
    const language = yield select(state => state.reducerLanguage);

    try {
        yield put(actionProgress(true));
        const response = yield call(insertCourse, values);
        if(response.ok){
            showMessage({
                message: Dictionary.successSaveCourse[language],
                type: 'success',
                icon: 'success'
            });
            yield put(actionGetCourses());
            NavigationService.goBack();
        }else{
            console.log('====================================');
            console.log('ok false file: sagaCourses, line: 109');
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
        console.log(error + ' file: sagaCourses, line: 122');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const getCoursesFromDB = () => {

    return database.listCourse().then(result => {
        return {
            ok: true,
            result
        }
    }).catch(error => {
        console.log('====================================');
        console.log(error + ' file: sagaCourses, line: 142');
        console.log('====================================');
        return {ok: false}
    })
}

export function* getCourses(){
    const language = yield select(state => state.reducerLanguage);

    try {
        const response = yield call(getCoursesFromDB);
        if(response.ok){
            yield put(actionSetCourses(response.result));
        }else{
            console.log('====================================');
            console.log('ok false file: sagaCourses, line: 157');
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
        console.log(error + ' file: sagaCourses, line: 168');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}

const dropCourse = (id) => {

    database.listTeeByCourseId(id).then(result => {
        database.deleteAllHolesForTees(result).then(result => {
            database.deleteCourse(id).then(result => {
                console.log('COURSE DELETED')
            })
        })
    });
}

export function* deleteCourse({value}){
    
    try {
        yield call(dropCourse, value);
    } catch (error) {
        console.log('====================================');
        console.log(error + ' file: sagaCourses, line: 185');
        console.log('====================================');
        showMessage({
            message: Dictionary.somethingWrong[language],
            description: Dictionary.tryAgain[language],
            type: 'danger',
            icon: 'danger'
        });
    }
}