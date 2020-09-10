import store from '../store/store';
import { Dictionary } from './Dictionary';

export const emailValidation = (email) => {
    const state = store.getState();
    const language = state.reducerLanguage;

    let ok = true;
    let error = '';
    
    if(!email){
        ok = false;
        error = Dictionary.required[language];
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        ok = false;
        error = Dictionary.invalidEmail[language];
    }

    return {ok, error};
}

export const passwordValidation = (password) => {
    const state = store.getState();
    const language = state.reducerLanguage;

    let ok = true;
    let error = '';

    if(!password){
        ok = false;
        error = Dictionary.required[language];
    }else if(password.length < 8){
        ok = false;
        error = Dictionary.atLest8Chars[language];
    }

    return {ok, error};
}

export const nameValidation = (name) => {
    const state = store.getState();
    const language = state.reducerLanguage;

    let ok = true;
    let error = '';

    if(!name){
        ok = false;
        error = Dictionary.required[language];
    }else if(!/^[A-Za-zñÑáÁéÉíÍóÓúÚöÖüÜ ]+$/.test(name)){
        ok = false;
        error = Dictionary.invalidFormat[language];
    }

    return {ok, error};
}

export const nicknameValidation = (nickname) => {
    const state = store.getState();
    const language = state.reducerLanguage;

    let ok = true;
    let error = '';

    if(!nickname){
        ok = false;
        error = Dictionary.required[language];
    }else if(!/^[A-Za-z0-9]+$/.test(nickname)){
        ok = false;
        error = Dictionary.invalidFormat[language];
    }

    return {ok, error};
}

export const phoneValidation = (number) => {
    const state = store.getState();
    const language = state.reducerLanguage;

    let ok = true;
    let error = '';

    let cleaned = ('' + number).replace(/\D/g, '');
    
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if(match) number = match[1] + match[2] + match[3];

    if(!number){
        ok = false;
        error = Dictionary.required[language];
    }else if(!/^[0-9]+$/.test(number)){
        ok = false;
        error = Dictionary.invalidFormat[language];
    }

    return {ok, error};
}

export const intNumberValidation = (number) => {
    const state = store.getState();
    const language = state.reducerLanguage;

    let ok = true;
    let error = '';

    if(!number){
        ok = false;
        error = Dictionary.required[language];
    }else if(!/^[0-9]+$/.test(number)){
        ok = false;
        error = Dictionary.invalidFormat[language];
    }

    return {ok, error};
}

export const floatNumberValidation = (number) => {
    const state = store.getState();
    const language = state.reducerLanguage;

    let ok = true;
    let error = '';

    if(!number){
        ok = false;
        error = Dictionary.required[language];
    }else if(!/^[+-]?((\.\d+)|(\d+(\.\d+)?))$/.test(number)){
        ok = false;
        error = Dictionary.invalidFormat[language];
    }

    return {ok, error};
}