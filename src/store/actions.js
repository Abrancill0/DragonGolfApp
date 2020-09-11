import Constants from "./Constants";

export const actionLanguage = (value) => ({
    type: Constants.LANGUAGE,
    value
});

export const actionLoading = (value) => ({
    type: Constants.LOADING,
    value,
});

export const actionSignIn = (values) => ({
    type: Constants.SIGNIN,
    values
});

export const actionSignInError = (value) => ({
    type: Constants.SIGNINERROR,
    value
});

export const actionSignUp = (values) => ({
    type: Constants.SIGNUP,
    values
});

export const actionSignUpError = (values) => ({
    type: Constants.SIGNUPERROR,
    values
});

export const actionGetUserData = (value) => ({
    type: Constants.GETUSERDATA,
    value
});

export const actionSetUserData = (values) => ({
    type: Constants.SETUSERDATA,
    values
});

export const actionSignOut = () => ({
    type: Constants.SIGNOUT
});

export const actionSaveCourse = (values) => ({
    type: Constants.SAVECOURSE,
    values
});

export const actionUpdateCourse = (values) => ({
    type: Constants.UPDATECOURSE,
    values
});

export const actionGetCourses = () => ({
    type: Constants.GETCOURSES
});

export const actionSetCourses = (values) => ({
    type: Constants.SETCOURSES,
    values
});

export const actionProgress = (value) => ({
    type: Constants.PROGRESS,
    value
});

export const actionSaveTees = (values) => ({
    type: Constants.SAVETEES,
    values
});

export const actionUpdateTee = (values) => ({
    type: Constants.UPDATETEE,
    values
});

export const actionGetTees = (value) => ({
    type: Constants.GETTEES,
    value
});

export const actionSetTees = (values) => ({
    type: Constants.SETTEES,
    values
});

export const actionSetHoles = (values) => ({
    type: Constants.SETHOLES,
    values
});

export const actionSaveHoles = (values) => ({
    type: Constants.SAVEHOLES,
    values
});

export const actionSaveYards = (values) => ({
    type: Constants.SAVEYARDS,
    values
});

export const actionSavePlayer = (value) => ({
    type: Constants.SAVEPLAYER,
    value
});

export const actionGetPlayers = () => ({
    type: Constants.GETPLAYERS
});

export const actionSetPlayers = (values) => ({
    type: Constants.SETPLAYERS,
    values
});

export const actionUpdateUserData = (values) => ({
    type: Constants.UPDATEUSERDATA,
    values
});

export const actionSaveSNWPlayer = (values) => ({
    type: Constants.SAVESNWPLAYER,
    values
});

export const actionGetSNWPlayer = (value) => ({
    type: Constants.GETSNWPLAYER,
    value
});

export const actionSetSNWPlayer = (values) => ({
    type: Constants.SETSNWPLAYER,
    values
});

export const actionSaveTNWPlayer = (values) => ({
    type: Constants.SAVETNWPLAYER,
    values
});

export const actionGetTNWPlayer = (value) => ({
    type: Constants.GETTNWPLAYER,
    value
});

export const actionSetTNWPlayer = (values) => ({
    type: Constants.SETTNWPLAYER,
    values
});

export const actionUpdatePlayer = (values) => ({
    type: Constants.UPDATEPLAYER,
    values
});

export const actionDeletePlayer = (value) => ({
    type: Constants.DELETEPLAYER,
    value
});

export const actionSavePreferences = (values) => ({
    type: Constants.SAVEPREFERENCES,
    values
});

export const actionGetPreferences = (value) => ({
    type: Constants.GETPREFERENCES,
    value
});

export const actionSetPreferences = (values) => ({
    type: Constants.SETPREFERENCES, 
    values
});

export const actionDeleteCourse = (value) => ({
    type: Constants.DELETECOURSE,
    value
});

export const actionDeleteTee = (value) => ({
    type: Constants.DELETETEE,
    value
});

export const actionSetRoundCourse = (values) => ({
    type: Constants.SETROUNDCOURSE,
    values
});

export const actionSaveGS = (values) => ({
    type: Constants.SAVEGS,
    values
});

export const actionGetGS = (value) => ({
    type: Constants.GETGS,
    value
});

export const actionSetGS = (values) => ({
    type: Constants.SETGS,
    values
});

export const actionSaveEB = (values) => ({
    type: Constants.SAVEEB,
    values
});

export const actionGetEB = (value) => ({
    type: Constants.GETEB,
    value
});

export const actionSetEB = (values) => ({
    type: Constants.SETEB,
    values
});

export const actionSaveAS = (values) => ({
    type: Constants.SAVEAS,
    values
});

export const actionGetAS = (value) => ({
    type: Constants.GETAS,
    value
});

export const actionSetAS = (values) => ({
    type: Constants.SETAS,
    values
});

export const actionSaveBB = (values) => ({
    type: Constants.SAVEBB,
    values
});

export const actionGetBB = (value) => ({
    type: Constants.GETBB,
    value
});

export const actionSetBB = (values) => ({
    type: Constants.SETBB,
    values
});

export const actionSaveRound = (values) => ({
    type: Constants.SAVEROUND,
    values
});

export const actionSetRoundId = (value) => ({
    type: Constants.SETROUNDID,
    value
});

export const actionUpdateRound = (values) => ({
    type: Constants.UPDATEROUND,
    values
});

export const actionGetRounds = () => ({
    type: Constants.GETROUNDS
});

export const actionSetRounds = (values) => ({
    type: Constants.SETROUNDS,
    values
});

export const actionDeleteRound = (value) => ({
    type: Constants.DELETEROUND,
    value
});

export const actionSetRound = (values) => ({
    type: Constants.SETROUND,
    values
});

export const actionSaveRoundPlayer = (values) => ({
    type: Constants.SAVEROUNDPLAYER,
    values
});

export const actionGetRoundPlayers = (value) => ({
    type: Constants.GETROUNDPLAYERS,
    value
});

export const actionSetRoundPlayers = (values) => ({
    type: Constants.SETROUNDPLAYERS,
    values
});

export const actionDeleteRoundPlayer = (value) => ({
    type: Constants.DELETEROUNDPLAYER,
    value
});

export const actionSetHcpAdj = (value) => ({
    type: Constants.SETHCPADJ,
    value
});

export const actionGetHole = (values) => ({
    type: Constants.GETHOLE,
    values
});

export const actionSetHole = (values) => ({
    type: Constants.SETHOLE,
    values
});

export const actionSaveScore = (values) => ({
    type: Constants.SAVESCORE,
    values
});

export const actionSetForceInset = (value) => ({
    type: Constants.SETFORCEINSET,
    value
});

export const actionSetInitHole = (value) => ({
    type: Constants.SETINITHOLE,
    value
});

export const actionSetSwitchAdv = (value) => ({
    type: Constants.SETSWITCHADV,
    value
});

export const actionSaveSNBet = (values) => ({
    type: Constants.SAVESNBET,
    values
});

export const actionSetSNBet = (values) => ({
    type: Constants.SETSNBET,
    values
});

export const actionGetSNBet = (value) => ({
    type: Constants.GETSNBET,
    value
});

export const actionUpdatePlayerPosition = (values) => ({
    type: Constants.UPDATEPLAYERPOSITION,
    values
});

export const actionDeleteSNBet = (value) => ({
    type: Constants.DELETESNBET,
    value
});

export const actionUpdatePress = (values) => ({
    type: Constants.UPDATEPRESS,
    values
});

export const actionSNBetSummary = (values) => ({
    type: Constants.SNBETSUMMARY,
    values
});

export const actionSaveTNBet = (values) => ({
    type: Constants.SAVETNBET,
    values
});

export const actionSetTNBet = (values) => ({
    type: Constants.SETTNBET,
    values
});

export const actionGetTNBet = (value) => ({
    type: Constants.GETTNBET,
    value
});

export const actionDeleteTNBet = (value) => ({
    type: Constants.DELETETNBET,
    value
});

export const actionUpdateTNPress = (values) => ({
    type: Constants.UPDATETNPRESS,
    values
});

export const actionTNBetSummary = (values) => ({
    type: Constants.TNBETSUMMARY,
    values
});

export const actionSaveStrokes = (values) => ({
    type: Constants.SAVESTROKES,
    values
});

export const actionSetStrokes = (values) => ({
    type: Constants.SETSTROKES,
    values
});

export const actionGetStrokes = (value) => ({
    type: Constants.GETSTROKES,
    value
});

export const actionUpdatePlayerTee = (values) => ({
    type: Constants.UPDATEPLAYERTEE,
    values
});

export const actionLoadingRound = (values) => ({
    type: Constants.LOADINGROUND,
    values
});

export const actionSaveBible = (values) => ({
    type: Constants.SAVEBIBLE,
    values
});

export const actionUpdateBible = (values) => ({
    type: Constants.UPDATEBIBLE,
    values
});

export const actionSetBible = (values) => ({
    type: Constants.SETBIBLE,
    values
});

export const actionGetBible = (values) => ({
    type: Constants.GETBIBLE
});

export const actionUpdatePlayerStrokes = (values) => ({
    type: Constants.UPDATEPLAYERSTROKES,
    values
});

export const actionSaveMedalBet = (values) => ({
    type: Constants.SAVEMEDALBET,
    values
});

export const actionUpdateMedalBet = (values) => ({
    type: Constants.UPDATEMEDALBET,
    values
});

export const actionDeleteMedalBet = (value) => ({
    type: Constants.DELETEMEDALBET,
    value
});

export const actionGetMedalBets = (value) => ({
    type: Constants.GETMEDALBETS,
    value
});

export const actionSetMedalBets = (values) => ({
    type: Constants.SETMEDALBETS,
    values
});

export const actionMedalBetSummary = (value) => ({
    type: Constants.MEDALBETSUMMARY,
    value
});

export const actionSaveStrokesValidation = (value) => ({
    type: Constants.SAVESTROKESVALIDATION,
    value
});

export const actionUpdateBibleDebts = (values) => ({
    type: Constants.UPDATEBIBLEDEBTS,
    values
});