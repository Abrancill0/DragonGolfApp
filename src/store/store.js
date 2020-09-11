import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Constants from './Constants';
import sagaGenerator from './sagas/sagaGenerator';

const reducerLanguage = (state = 'en', action) => {
    switch (action.type) {
        case Constants.LANGUAGE:
            return action.value;
        default:
            return state;
    }
}

const reducerLoading = (state = false, action) => {
    switch (action.type) {
        case Constants.LOADING:
            return action.value;
        default:
            return state;
    }
}

const reducerProgress = (state = false, action) => {
    switch (action.type) {
        case Constants.PROGRESS:
            return action.value;
        default:
            return state;
    }
}

const reducerSignIn = (state=false, action) => {
    switch (action.type) {
        case Constants.SIGNINRESP:
            return action.value;
        default:
            return state;
    }
}

const reducerSignInError = (state=false, action) => {
    switch (action.type) {
        case Constants.SIGNINERROR:
            return action.value;
        default:
            return state;
    }
}

const reducerSignUpError = (state=false, action) => {
    switch (action.type) {
        case Constants.SIGNUPERROR:
            return action.values;
        default:
            return state;
    }
}

const reducerUserData = (state=null, action) => {
    switch (action.type) {
        case Constants.SETUSERDATA:
            return action.values;
        default:
            return state;
    }
}

const reducerCourses = (state=[], action) => {
    switch (action.type) {
        case Constants.SETCOURSES:
            return action.values;
        default:
            return state;
    }
}

const reducerTees = (state=[], action) => {
    switch (action.type) {
        case Constants.SETTEES:
            return action.values;
        default:
            return state;
    }
}

const reducerHoles = (state=[], action) => {
    switch (action.type) {
        case Constants.SETHOLES:
            return action.values;
        default:
            return state;
    }
}

const reducerPlayers = (state=null, action) => {
    switch (action.type) {
        case Constants.SETPLAYERS:
            return action.values;
        default:
            return state;
    }
}

const reducerSNWPlayer = (state=null, action) => {
    switch (action.type) {
        case Constants.SETSNWPLAYER:
            return action.values;
        default:
            return state;
    }
}

const reducerTNWPlayer = (state=null, action) => {
    switch (action.type) {
        case Constants.SETTNWPLAYER:
            return action.values;
        default:
            return state;
    }
}

const reducerPreferences = (state=null, action) => {
    switch (action.type) {
        case Constants.SETPREFERENCES:
            return action.values;
        default:
            return state;
    }
}

const reducerRoundCourse = (state=null, action) => {
    switch (action.type) {
        case Constants.SETROUNDCOURSE:
            return action.values;
        default:
            return state;
    }
}

const reducerGSData = (state = null, action) => {
    switch (action.type) {
        case Constants.SETGS:
            return action.values;
        default:
            return state;
    }
}

const reducerEBData = (state = null, action) => {
    switch (action.type) {
        case Constants.SETEB:
            return action.values;
        default:
            return state;
    }
}

const reducerASData = (state = null, action) => {
    switch (action.type) {
        case Constants.SETAS:
            return action.values;
        default:
            return state;
    }
}

const reducerBBData = (state = null, action) => {
    switch (action.type) {
        case Constants.SETBB:
            return action.values;
        default:
            return state;
    }
}

const reducerRoundId = (state = null, action) => {
    switch (action.type) {
        case Constants.SETROUNDID:
            return action.value;
        default:
            return state;
    }
}

const reducerRounds = (state = [], action) => {
    switch (action.type) {
        case Constants.SETROUNDS:
            return action.values;
        default:
            return state;
    }
}
const reducerRound = (state = null, action) => {
    switch (action.type) {
        case Constants.SETROUND:
            return action.values;
        default:
            return state;
    }
}

const reducerRoundPlayers = (state = [], action) => {
    switch (action.type) {
        case Constants.SETROUNDPLAYERS:
            return action.values;
        default:
            return state;
    }
}

const reducerHcpAdj = (state = 1, action) => {
    switch (action.type) {
        case Constants.SETHCPADJ:
            return action.value;
        default:
            return state;
    }
}

const reducerHole = (state = [], action) => {
    switch (action.type) {
        case Constants.SETHOLE:
            return action.values;
        default:
            return state;
    }
}

const reducerForceInset = (state = 'always', action) => {
    switch (action.type) {
        case Constants.SETFORCEINSET:
            return action.value;
        default:
            return state;
    }
}

const reducerInitHole = (state = 1, action) => {
    switch (action.type) {
        case Constants.SETINITHOLE:
            return action.value;
        default:
            return state;
    }
}

const reducerSwitchAdv = (state = false, action) => {
    switch (action.type) {
        case Constants.SETSWITCHADV:
            return action.value;
        default:
            return state;
    }
}

const reducerSNBet = (state = [], action) => {
    switch (action.type) {
        case Constants.SETSNBET:
            return action.values;
        default:
            return state;
    }
}

const reducerSNBetSummary = (state = [], action) => {
    switch (action.type) {
        case Constants.SNBETSUMMARY:
            return action.values;
        default:
            return state;
    }
}

const reducerTNBet = (state = [], action) => {
    switch (action.type) {
        case Constants.SETTNBET:
            return action.values;
        default:
            return state;
    }
}

const reducerTNBetSummary = (state = [], action) => {
    switch (action.type) {
        case Constants.TNBETSUMMARY:
            return action.values;
        default:
            return state;
    }
}

const reducerStrokes = (state = [], action) => {
    switch (action.type) {
        case Constants.SETSTROKES:
            return action.values;
        default:
            return state;
    }
}

const reducerBible = (state = [], action) => {
    switch (action.type) {
        case Constants.SETBIBLE:
            return action.values;
        default:
            return state;
    }
}

const reducerMedalBets = (state = [], action) => {
    switch (action.type) {
        case Constants.SETMEDALBETS:
            return action.values;
        default:
            return state;
    }
}

const reducerMedalBetSummary = (state = [], action) => {
    switch (action.type) {
        case Constants.MEDALBETSUMMARY:
            return action.value;
        default:
            return state;
    }
}

const loadingRoundData = {
    snBet: false,
    tnBet: false,
    roundPlayers: false,
    tees: false,
    hole: false,
    medalBet: false
}

const reducerLoadingRound = (state = loadingRoundData, action) => {
    switch (action.type) {
        case Constants.LOADINGROUND:
            return action.values;
        default:
            return state;
    }
}

const sagaMiddleware = createSagaMiddleware();//se genera el sagaMiddleware

const reducers = combineReducers({
    reducerLanguage,
    reducerSignUpError,
    reducerSignInError,
    reducerLoading,
    reducerSignIn,
    reducerUserData,
    reducerCourses,
    reducerProgress,
    reducerTees,
    reducerHoles,
    reducerPlayers,
    reducerSNWPlayer,
    reducerTNWPlayer,
    reducerPreferences,
    reducerRoundCourse,
    reducerGSData,
    reducerEBData,
    reducerASData,
    reducerBBData,
    reducerRoundId,
    reducerRounds,
    reducerRound,
    reducerRoundPlayers,
    reducerHcpAdj,
    reducerHole,
    reducerForceInset,
    reducerInitHole,
    reducerSwitchAdv,
    reducerSNBet,
    reducerSNBetSummary,
    reducerTNBet,
    reducerTNBetSummary,
    reducerStrokes,
    reducerLoadingRound,
    reducerBible,
    reducerMedalBets,
    reducerMedalBetSummary
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));//Se crea el Store

sagaMiddleware.run(sagaGenerator);//si no se ejecuta el run jamas funciona

export default store;