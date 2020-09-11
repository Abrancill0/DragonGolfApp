import { takeEvery } from 'redux-saga/effects';
import Constants from '../Constants';
import { signIn, signUp, signOut } from './sagaAuth';
import { saveCourse, getCourses, updateCourse, deleteCourse } from './sagaCourses';
import { getUserData, updateUserData } from './sagaUserData';
import { savePlayer, getPlayers, updatePlayer, deletePlayer, updatePlayerStrokes } from './sagaPlayers';
import { saveTee, getTees, saveYards, updateTee, deleteTee } from './sagaTees';
import { saveHoles } from './sagaHoles';
import { saveSNWPlayer, getSNWPlayer } from './sagaSNW';
import { saveTNWPlayer, getTNWPlayer } from './sagaTNW';
import { savePreferences, getPreferences } from './sagaPreferences';
import { saveGS, getGSPlayer } from './sagaGS';
import { saveEBData, getEBPlayer } from './sagaEB';
import { saveAS, getASPlayer } from './sagasAS';
import { saveBB, getBBPlayer } from './sagaBB';
import {
    saveRound,
    updateRound,
    getRounds,
    deleteRound,
    saveRoundPlayer,
    getRoundPlayers,
    deleteRoundPlayer,
    updatePlayerPosition,
    saveStrokes,
    getStrokes,
    updatePlayerTee,
    insertStrokesWithValidation
} from './sagaRounds';
import { getHole, saveScore } from './sagaScore';
import { saveSNBet, getSNBet, deleteSNBet, updatePress } from './sagaSNBet';
import { saveTNBet, getTNBet, updateTNPress, deleteTNBet } from './sagaTNBet';
import { saveBible, getBible, updateBible, updateBibleDebts } from './sagaBible';
import { saveMedalBet, getMedalBet, removeMedalBet } from './sagaMedalBet';

export default function* sagaGenerator(){
    yield takeEvery(Constants.SIGNIN, signIn);
    yield takeEvery(Constants.SIGNUP, signUp);
    yield takeEvery(Constants.GETUSERDATA, getUserData);
    yield takeEvery(Constants.SIGNOUT, signOut);
    yield takeEvery(Constants.SAVECOURSE, saveCourse);
    yield takeEvery(Constants.UPDATECOURSE, updateCourse);
    yield takeEvery(Constants.GETCOURSES, getCourses);
    yield takeEvery(Constants.SAVETEES, saveTee);
    yield takeEvery(Constants.UPDATETEE, updateTee);
    yield takeEvery(Constants.GETTEES, getTees);
    yield takeEvery(Constants.SAVEPLAYER, savePlayer);
    yield takeEvery(Constants.SAVEHOLES, saveHoles);
    yield takeEvery(Constants.SAVEYARDS, saveYards);
    yield takeEvery(Constants.GETPLAYERS, getPlayers);
    yield takeEvery(Constants.UPDATEUSERDATA, updateUserData);
    yield takeEvery(Constants.UPDATEPLAYER, updatePlayer);
    yield takeEvery(Constants.DELETEPLAYER, deletePlayer);
    yield takeEvery(Constants.SAVESNWPLAYER, saveSNWPlayer);
    yield takeEvery(Constants.SAVEPREFERENCES, savePreferences);
    yield takeEvery(Constants.GETPREFERENCES, getPreferences);
    yield takeEvery(Constants.SAVETNWPLAYER, saveTNWPlayer);
    yield takeEvery(Constants.GETSNWPLAYER, getSNWPlayer);
    yield takeEvery(Constants.GETTNWPLAYER, getTNWPlayer);
    yield takeEvery(Constants.DELETECOURSE, deleteCourse);
    yield takeEvery(Constants.DELETETEE, deleteTee);
    yield takeEvery(Constants.SAVEGS, saveGS);
    yield takeEvery(Constants.GETGS, getGSPlayer);
    yield takeEvery(Constants.SAVEEB, saveEBData);
    yield takeEvery(Constants.GETEB, getEBPlayer);
    yield takeEvery(Constants.SAVEAS, saveAS);
    yield takeEvery(Constants.GETAS, getASPlayer);
    yield takeEvery(Constants.SAVEBB, saveBB);
    yield takeEvery(Constants.GETBB, getBBPlayer);
    yield takeEvery(Constants.SAVEROUND, saveRound);
    yield takeEvery(Constants.UPDATEROUND, updateRound);
    yield takeEvery(Constants.GETROUNDS, getRounds);
    yield takeEvery(Constants.DELETEROUND, deleteRound);
    yield takeEvery(Constants.SAVEROUNDPLAYER, saveRoundPlayer);
    yield takeEvery(Constants.GETROUNDPLAYERS, getRoundPlayers);
    yield takeEvery(Constants.DELETEROUNDPLAYER, deleteRoundPlayer);
    yield takeEvery(Constants.GETHOLE, getHole);
    yield takeEvery(Constants.SAVESCORE, saveScore);
    yield takeEvery(Constants.SAVESNBET, saveSNBet);
    yield takeEvery(Constants.UPDATEPLAYERPOSITION, updatePlayerPosition);
    yield takeEvery(Constants.GETSNBET, getSNBet);
    yield takeEvery(Constants.DELETESNBET, deleteSNBet);
    yield takeEvery(Constants.UPDATEPRESS, updatePress);
    yield takeEvery(Constants.SAVETNBET, saveTNBet);
    yield takeEvery(Constants.GETTNBET, getTNBet);
    yield takeEvery(Constants.UPDATETNPRESS, updateTNPress);
    yield takeEvery(Constants.DELETETNBET, deleteTNBet);
    yield takeEvery(Constants.SAVESTROKES, saveStrokes);
    yield takeEvery(Constants.GETSTROKES, getStrokes);
    yield takeEvery(Constants.UPDATEPLAYERTEE, updatePlayerTee);
    yield takeEvery(Constants.SAVEBIBLE, saveBible);
    yield takeEvery(Constants.GETBIBLE, getBible);
    yield takeEvery(Constants.UPDATEBIBLE, updateBible);
    yield takeEvery(Constants.UPDATEPLAYERSTROKES, updatePlayerStrokes);
    yield takeEvery(Constants.SAVEMEDALBET, saveMedalBet);
    yield takeEvery(Constants.GETMEDALBETS, getMedalBet);
    yield takeEvery(Constants.DELETEMEDALBET, removeMedalBet);
    yield takeEvery(Constants.SAVESTROKESVALIDATION, insertStrokesWithValidation);
    yield takeEvery(Constants.UPDATEBIBLEDEBTS, updateBibleDebts);
}