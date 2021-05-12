import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles2';
import { Dictionary } from '../../../../utils/Dictionary';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../../utils/Colors';
import ChangeStartingHole from '../../../../utils/ChangeStartingHole';
import AsyncStorage from '@react-native-community/async-storage';

export default class ScoreHorizontalComponent extends Component {
    constructor(props) {
        super(props);

        let holes = [];
        for (let index = 0; index < 18; index++) {
            holes.push(index);
        }
        const newHoles = ChangeStartingHole(props.initHole, holes);

        console.warn(this.props.holeInfo)

        this.state = {
            language: 'es',
            f9H:[],
            f9HA:[],
            b9H:[],
            b9HA:[],
            f9GV:[],
            b9GV:[],
            teesf9:[],
            teesb9:[],
            Presionf9:[],
            Presionb9:[],
            teeParf9:[],
            teeParb9:[],
            ScoreIn:[],
            ScoreOut:[],
            ScoreInGP:[],
            ScoreOutGP:[],
            TeeColor:[],
            TeeNumberF:[],
            TeeNumberB:[]
        };

        /*
        let f9H = [this.props.holeInfo[0][1], this.props.holeInfo[0][2], this.props.holeInfo[0][3], this.props.holeInfo[0][4], this.props.holeInfo[0][5], this.props.holeInfo[0][6], this.props.holeInfo[0][7], this.props.holeInfo[0][8], this.props.holeInfo[0][9]]
        let f9HA = [this.props.holeInfo[0]['Ho_Advantage1'], this.props.holeInfo[0]['Ho_Advantage2'], this.props.holeInfo[0]['Ho_Advantage3'], this.props.holeInfo[0]['Ho_Advantage4'], this.props.holeInfo[0]['Ho_Advantage5'], this.props.holeInfo[0]['Ho_Advantage6'], this.props.holeInfo[0]['Ho_Advantage7'], this.props.holeInfo[0]['Ho_Advantage8'], this.props.holeInfo[0]['Ho_Advantage9']]
        let b9H = [this.props.holeInfo[0][10], this.props.holeInfo[0][11], this.props.holeInfo[0][12], this.props.holeInfo[0][13], this.props.holeInfo[0][14], this.props.holeInfo[0][15], this.props.holeInfo[0][16], this.props.holeInfo[0][17], this.props.holeInfo[0][18]]   
        let teesf9 = [this.props.holeInfo[0]['ho_par1'], this.props.holeInfo[0]['ho_par2'], this.props.holeInfo[0]['ho_par3'], this.props.holeInfo[0]['ho_par4'], this.props.holeInfo[0]['ho_par5'], this.props.holeInfo[0]['ho_par6'], this.props.holeInfo[0]['ho_par7'], this.props.holeInfo[0]['ho_par8'], this.props.holeInfo[0]['ho_par9']]
        let teesb9 = [this.props.holeInfo[0]['ho_par10'], this.props.holeInfo[0]['ho_par11'], this.props.holeInfo[0]['ho_par12'], this.props.holeInfo[0]['ho_par13'], this.props.holeInfo[0]['ho_par14'], this.props.holeInfo[0]['ho_par15'], this.props.holeInfo[0]['ho_par16'], this.props.holeInfo[0]['ho_par17'], this.props.holeInfo[0]['ho_par18']]*/
    }

    componentDidMount = async () => {

        let f9H = []
        let f9HA = []
        let b9H = []
        let b9HA = []
        let teesf9 = []
        let teesb9 = []
        let ScoreIn = []
        let ScoreOut = []
        let ScoreInGP = []
        let ScoreOutGP = []
        let f9GV = []
        let b9GV = []
        let TeeColor = []
        let TeeNumberF = []
        let TeeNumberB = []
        let teeParf9 = []
        let teeParb9 = []
        let Presionf9 = []
        let Presionb9 = []

        let hole = await AsyncStorage.getItem('hole');
        let language = await AsyncStorage.getItem('language')

        for (var j = 0 ; j <= this.props.holeInfo.length - 1; j++) {
            Presionf9.push([this.props.holeInfo[j]['Hoyo1Presion'], this.props.holeInfo[j]['Hoyo2Presion'], this.props.holeInfo[j]['Hoyo3Presion'], this.props.holeInfo[j]['Hoyo4Presion'], this.props.holeInfo[j]['Hoyo5Presion'], this.props.holeInfo[j]['Hoyo6Presion'], this.props.holeInfo[j]['Hoyo7Presion'], this.props.holeInfo[j]['Hoyo8Presion'], this.props.holeInfo[j]['Hoyo9Presion']])
            Presionb9.push([this.props.holeInfo[j]['Hoyo10Presion'], this.props.holeInfo[j]['Hoyo11Presion'], this.props.holeInfo[j]['Hoyo12Presion'], this.props.holeInfo[j]['Hoyo13Presion'], this.props.holeInfo[j]['Hoyo14Presion'], this.props.holeInfo[j]['Hoyo15Presion'], this.props.holeInfo[j]['Hoyo16Presion'], this.props.holeInfo[j]['Hoyo17Presion'], this.props.holeInfo[j]['Hoyo18Presion']]   )
        }

        switch(parseInt(hole)){
            case 1:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9']])
                    b9H.push([this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18']]   )
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9']])
                    teesb9.push([this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[1,2,3,4,5,6,7,8,9];
                TeeNumberB=[10,11,12,13,14,15,16,17,18];
            break;
            case 2:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10']])
                    b9H.push([this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10']])
                    teesb9.push([this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[2,3,4,5,6,7,8,9,10];
                TeeNumberB=[11,12,13,14,15,16,17,18,1];
            break;
            case 3:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11']])
                    b9H.push([this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11']])
                    teesb9.push([this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[3,4,5,6,7,8,9,10,11];
                TeeNumberB=[12,13,14,15,16,17,18,1,2];
            break;
            case 4:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12']])
                    b9H.push([this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12']])
                    teesb9.push([this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[4,5,6,7,8,9,10,11,12];
                TeeNumberB=[13,14,15,16,17,18,1,2,3];
            break;
            case 5:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13']])
                    b9H.push([this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13']])
                    teesb9.push([this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[5,6,7,8,9,10,11,12,13];
                TeeNumberB=[14,15,16,17,18,1,2,3,4];
            break;
            case 6:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14']])
                    b9H.push([this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14']])
                    teesb9.push([this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[6,7,8,9,10,11,12,13,14];
                TeeNumberB=[15,16,17,18,1,2,3,4,5];
            break;
            case 7:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14],this.props.holeInfo[i][15]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'],this.props.holeInfo[i]['Ho_Advantage15']])
                    b9H.push([this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5],this.props.holeInfo[i][6]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'],this.props.holeInfo[i]['Ho_Advantage6']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'],this.props.holeInfo[i]['GolpesVentaja15_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'],this.props.holeInfo[i]['GolpesVentaja6_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'],this.props.holeInfo[i]['ho_par15']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'],this.props.holeInfo[i]['ho_par6']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'],this.props.holeInfo[i]['Hoyo15Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'],this.props.holeInfo[i]['Hoyo6Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'],this.props.tees[i]['Par_Hole15']])
                    teesb9.push([this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'],this.props.tees[i]['Par_Hole6']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[7,8,9,10,11,12,13,14,15];
                TeeNumberB=[16,17,18,1,2,3,4,5,6];
            break;
            case 8:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14],this.props.holeInfo[i][15],this.props.holeInfo[i][16]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'],this.props.holeInfo[i]['Ho_Advantage15'],this.props.holeInfo[i]['Ho_Advantage16']])
                    b9H.push([this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5],this.props.holeInfo[i][6],this.props.holeInfo[i][7]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'],this.props.holeInfo[i]['Ho_Advantage6'],this.props.holeInfo[i]['Ho_Advantage7']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'],this.props.holeInfo[i]['GolpesVentaja15_tee'],this.props.holeInfo[i]['GolpesVentaja16_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'],this.props.holeInfo[i]['GolpesVentaja6_tee'],this.props.holeInfo[i]['GolpesVentaja7_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'],this.props.holeInfo[i]['ho_par15'],this.props.holeInfo[i]['ho_par16']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'],this.props.holeInfo[i]['ho_par6'],this.props.holeInfo[i]['ho_par7']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'],this.props.holeInfo[i]['Hoyo15Presion'],this.props.holeInfo[i]['Hoyo16Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'],this.props.holeInfo[i]['Hoyo6Presion'],this.props.holeInfo[i]['Hoyo7Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'],this.props.tees[i]['Par_Hole15'],this.props.tees[i]['Par_Hole16']])
                    teesb9.push([this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'],this.props.tees[i]['Par_Hole6'],this.props.tees[i]['Par_Hole7'],this.props.tees[i]['Par_Hole8']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[8,9,10,11,12,13,14,15,16];
                TeeNumberB=[17,18,1,2,3,4,5,6,7];
            break;
            case 9:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14],this.props.holeInfo[i][15],this.props.holeInfo[i][16],this.props.holeInfo[i][17]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'],this.props.holeInfo[i]['Ho_Advantage15'],this.props.holeInfo[i]['Ho_Advantage16'],this.props.holeInfo[i]['Ho_Advantage17']])
                    b9H.push([this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5],this.props.holeInfo[i][6],this.props.holeInfo[i][7],this.props.holeInfo[i][8]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'],this.props.holeInfo[i]['Ho_Advantage6'],this.props.holeInfo[i]['Ho_Advantage7'],this.props.holeInfo[i]['Ho_Advantage8']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'],this.props.holeInfo[i]['GolpesVentaja15_tee'],this.props.holeInfo[i]['GolpesVentaja16_tee'],this.props.holeInfo[i]['GolpesVentaja17_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'],this.props.holeInfo[i]['GolpesVentaja6_tee'],this.props.holeInfo[i]['GolpesVentaja7_tee'],this.props.holeInfo[i]['GolpesVentaja8_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'],this.props.holeInfo[i]['ho_par15'],this.props.holeInfo[i]['ho_par16'],this.props.holeInfo[i]['ho_par17']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'],this.props.holeInfo[i]['ho_par6'],this.props.holeInfo[i]['ho_par7'],this.props.holeInfo[i]['ho_par8']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'],this.props.holeInfo[i]['Hoyo15Presion'],this.props.holeInfo[i]['Hoyo16Presion'],this.props.holeInfo[i]['Hoyo17Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'],this.props.holeInfo[i]['Hoyo6Presion'],this.props.holeInfo[i]['Hoyo7Presion'],this.props.holeInfo[i]['Hoyo8Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'],this.props.tees[i]['Par_Hole15'],this.props.tees[i]['Par_Hole16'],this.props.tees[i]['Par_Hole17']])
                    teesb9.push([this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'],this.props.tees[i]['Par_Hole6'],this.props.tees[i]['Par_Hole7'],this.props.tees[i]['Par_Hole8'],this.props.tees[i]['Par_Hole8']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[9,10,11,12,13,14,15,16,17];
                TeeNumberB=[18,1,2,3,4,5,6,7,8];
            break;
            case 10:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    b9H.push([this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9]])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9']])
                    f9H.push([this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee']]   )
                    teeParb9.push([this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9']])
                    teeParf9.push([this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18']]   )
                    /*Presionb9.push([this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion']])
                    Presionf9.push([this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesb9.push([this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9']])
                    teesf9.push([this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberB=[1,2,3,4,5,6,7,8,9];
                TeeNumberF=[10,11,12,13,14,15,16,17,18];
            break;
            case 11:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    b9H.push([this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10]])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10']])
                    f9H.push([this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee']]   )
                    teeParb9.push([this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10']])
                    teeParf9.push([this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1']]   )
                    /*Presionb9.push([this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion']])
                    Presionf9.push([this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesb9.push([this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10']])
                    teesf9.push([this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberB=[2,3,4,5,6,7,8,9,10];
                TeeNumberF=[11,12,13,14,15,16,17,18,1];
            break;
            case 12:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    b9H.push([this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11']])
                    f9H.push([this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee']]   )
                    teeParb9.push([this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11']])
                    teeParf9.push([this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2']]   )
                    /*Presionb9.push([this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion']])
                    Presionf9.push([this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesb9.push([this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11']])
                    teesf9.push([this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberB=[3,4,5,6,7,8,9,10,11];
                TeeNumberF=[12,13,14,15,16,17,18,1,2];
            break;
            case 13:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    b9H.push([this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12]])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12']])
                    f9H.push([this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee']]   )
                    teeParb9.push([this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12']])
                    teeParf9.push([this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3']]   )
                    /*Presionb9.push([this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion']])
                    Presionf9.push([this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesb9.push([this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12']])
                    teesf9.push([this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberB=[4,5,6,7,8,9,10,11,12];
                TeeNumberF=[13,14,15,16,17,18,1,2,3];
            break;
            case 14:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    b9H.push([this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13]])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13']])
                    f9H.push([this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee']]   )
                    teeParb9.push([this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13']])
                    teeParf9.push([this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4']]   )
                    /*Presionb9.push([this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion']])
                    Presionf9.push([this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesb9.push([this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13']])
                    teesf9.push([this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberB=[5,6,7,8,9,10,11,12,13];
                TeeNumberF=[14,15,16,17,18,1,2,3,4];
            break;
            case 15:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    b9H.push([this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14]])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14']])
                    f9H.push([this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee']]   )
                    teeParb9.push([this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14']])
                    teeParf9.push([this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5']]   )
                    /*Presionb9.push([this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion']])
                    Presionf9.push([this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesb9.push([this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14']])
                    teesf9.push([this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberB=[6,7,8,9,10,11,12,13,14];
                TeeNumberF=[15,16,17,18,1,2,3,4,5];
            break;
            case 16:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6']])
                    b9H.push([this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage1']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6']])
                    teesb9.push([this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[16,17,18,1,2,3,4,5,6];
                TeeNumberB=[7,8,9,10,11,12,13,14,15];
            break;
            case 17:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][17], this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7']])
                    b9H.push([this.props.holeInfo[i][8], this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja17_tee'], this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja8_tee'], this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo17Presion'], this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo8Presion'], this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7']])
                    teesb9.push([this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[17,18,1,2,3,4,5,6,7];
                TeeNumberB=[8,9,10,11,12,13,14,15,16];
            break;
            case 18:
                for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
                    f9H.push([this.props.holeInfo[i][18], this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8]])
                    f9HA.push([this.props.holeInfo[i]['Ho_Advantage18'], this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8']])
                    b9H.push([this.props.holeInfo[i][9], this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17]]   )
                    ScoreIn.push(this.props.holeInfo[i]['ScoreIn'])
                    ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
                    ScoreInGP.push(this.props.holeInfo[i]['ScoreInGP'])
                    ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
                    b9HA.push([this.props.holeInfo[i]['Ho_Advantage9'], this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17']])
                    f9GV.push([this.props.holeInfo[i]['GolpesVentaja18_tee'], this.props.holeInfo[i]['GolpesVentaja1_tee'], this.props.holeInfo[i]['GolpesVentaja2_tee'], this.props.holeInfo[i]['GolpesVentaja3_tee'], this.props.holeInfo[i]['GolpesVentaja4_tee'], this.props.holeInfo[i]['GolpesVentaja5_tee'], this.props.holeInfo[i]['GolpesVentaja6_tee'], this.props.holeInfo[i]['GolpesVentaja7_tee'], this.props.holeInfo[i]['GolpesVentaja8_tee']])
                    b9GV.push([this.props.holeInfo[i]['GolpesVentaja9_tee'], this.props.holeInfo[i]['GolpesVentaja10_tee'], this.props.holeInfo[i]['GolpesVentaja11_tee'], this.props.holeInfo[i]['GolpesVentaja12_tee'], this.props.holeInfo[i]['GolpesVentaja13_tee'], this.props.holeInfo[i]['GolpesVentaja14_tee'], this.props.holeInfo[i]['GolpesVentaja15_tee'], this.props.holeInfo[i]['GolpesVentaja16_tee'], this.props.holeInfo[i]['GolpesVentaja17_tee']]   )
                    teeParf9.push([this.props.holeInfo[i]['ho_par18'], this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8']])
                    teeParb9.push([this.props.holeInfo[i]['ho_par9'], this.props.holeInfo[i]['ho_par10'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17']]   )
                    /*Presionf9.push([this.props.holeInfo[i]['Hoyo18Presion'], this.props.holeInfo[i]['Hoyo1Presion'], this.props.holeInfo[i]['Hoyo2Presion'], this.props.holeInfo[i]['Hoyo3Presion'], this.props.holeInfo[i]['Hoyo4Presion'], this.props.holeInfo[i]['Hoyo5Presion'], this.props.holeInfo[i]['Hoyo6Presion'], this.props.holeInfo[i]['Hoyo7Presion'], this.props.holeInfo[i]['Hoyo8Presion']])
                    Presionb9.push([this.props.holeInfo[i]['Hoyo9Presion'], this.props.holeInfo[i]['Hoyo10Presion'], this.props.holeInfo[i]['Hoyo11Presion'], this.props.holeInfo[i]['Hoyo12Presion'], this.props.holeInfo[i]['Hoyo13Presion'], this.props.holeInfo[i]['Hoyo14Presion'], this.props.holeInfo[i]['Hoyo15Presion'], this.props.holeInfo[i]['Hoyo16Presion'], this.props.holeInfo[i]['Hoyo7Presion']]   )*/
                }

                 for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
                    teesf9.push([this.props.tees[i]['Par_Hole18'], this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8']])
                    teesb9.push([this.props.tees[i]['Par_Hole9'], this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17']])
                    TeeColor.push(this.props.tees[i]['Te_TeeColor'])
                }
                TeeNumberF=[18,1,2,3,4,5,6,7,8];
                TeeNumberB=[9,10,11,12,13,14,15,16,17];
            break;
        }
        this.setState({
            language:language,
            f9H,
            f9HA,
            b9H,
            b9HA,
            f9GV,
            b9GV,
            teesf9,
            teesb9,
            Presionf9,
            Presionb9,
            teeParf9,
            teeParb9,
            ScoreIn,
            ScoreOut,
            ScoreInGP,
            ScoreOutGP,
            TeeColor,
            TeeNumberF,
            TeeNumberB
        })
    }

    render() {

        const {
            language,
            f9H,
            f9HA,
            f9GV,
            b9GV,
            teesf9,
            teesb9,
            teeParf9,
            teeParb9,
            Presionf9,
            Presionb9,
            TotalScore,
            ScoreOut,
            TotalScoreGP,
            ScoreOutGP,
            b9H,
            b9HA,
            TeeColor,
            TeeNumberF,
            TeeNumberB
        } = this.state;

        const {
            holeInfo,
            hcpAdj,
            advStrokes,
            advTotalStrokes,
            tees
        } = this.props;

        const {
            hole
        } = Dictionary;

        return (
            b9H.length!=0 &&
            <View style={{ flex: 1 }}>
                {teesf9.map((item,index) =>
                <View style={styles.holeHeader}>
                    <View style={styles.holeTextView}>
                        <Text style={styles.holeText}>{hole[language]}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.parText}>PAR</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name='square' size={13} color={TeeColor[index]} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={TeeColor[index]}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                            </View>
                    </View>
                    <View style={styles.holesView}>
                        {item.map((item2,index2) =>
                            <View key={index2} style={styles.holeInfoView}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.holeNumber}>{TeeNumberF[index2]}</Text>
                                <Text
                                        key={index2}
                                        style={styles.parNumber}
                                    >
                                        {item2.toString()}
                                    </Text>
                            </View>)
                        }
                        {item.map((item3,index3) =>
                            <View key={index3} style={styles.holeInfoView}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.holeNumber,{fontSize: 13}]}>{TeeNumberF[index3]}</Text>
                                <Text
                                        key={index3}
                                        style={styles.parNumber}
                                    >
                                        {item3.toString()}
                                    </Text>
                            </View>)
                        }
                    </View>
                </View>
                )}

                {holeInfo.map((item, index) =>
                    <View style={styles.scoreView} key={index}>
                        <View style={styles.holeTextView}>
                            <Text style={styles.nickName} numberOfLines={1} adjustsFontSizeToFit>{item.nickname}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name='square' size={13} color={item.Te_TeeColor} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={item.Te_TeeColor}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                                {item.handicap>0&&<Text style={styles.hcpNumber}>{(item.handicap).toFixed(0)}</Text>}
                            </View>
                        </View>
                        <View style={styles.holesView}>
                            {f9H[index].map((holeIndex, i) =>
                                <View key={i}>
                                    <Text style={styles.advText}>{f9HA[index][i]}</Text>
                                    <View
                                        style={[styles.strokesView,
                                        {
                                            borderRightWidth: 0,
                                            backgroundColor: this.scoreBackgroundColor(teeParf9, index, i, holeIndex),
                                        }
                                        ]}
                                    >
                                        {holeIndex!=0 &&<Text style={styles.holeNumber}>{holeIndex}</Text>}
                                        {f9GV[index][i] != 0 && item.ventaja==item.id &&<Text style={styles.advStrokes}>{f9GV[index][i]}</Text>}
                                    </View>
                                </View>
                            )}
                            {b9H[index].map((holeIndex, i) =>
                                <View key={i}>
                                    <Text style={styles.advText}>{b9HA[index][i]}</Text>
                                    <View style={[styles.strokesView,
                                    {
                                        borderRightWidth: i < b9H[index].length - 1 ? 0 : 0.5,
                                        backgroundColor: this.scoreBackgroundColor(teeParb9, index, i, holeIndex),
                                    }
                                    ]}>
                                        {holeIndex!=0 &&<Text style={styles.holeNumber}>{holeIndex}</Text>}
                                        {b9GV[index][i] != 0 && item.ventaja==item.id &&<Text style={styles.advStrokes}>{b9GV[index][i]}</Text>}
                                    </View>
                                </View>
                            )}
                            <View style={styles.strokesTotalView}>
                                <Text style={styles.strokesTotal}>{TotalScore[index]}</Text>
                                <Text style={styles.strokesTotalAdv}>{TotalScoreGP[index]}</Text>
                            </View>
                        </View>
                    </View>)
                }
                <View style={{ height: 15 }} />
                {this.renderPressTable(f9H[0], Presionf9, Presionb9, 'f9')}
            </View>
        );
    }

    renderPressTable = (holes, pressesArray, pressesArray2, type) => {
        console.warn('entró')
        console.warn(holes)
        console.warn(pressesArray)

        let totalStrokesMA = 0;
        let totalStrokesMB = 0;
        /*if (type === 'f9') {
            if (advTotalStrokes[0].totalStrokesf9) totalStrokesMA = advTotalStrokes[0].totalStrokesf9;
            if (advTotalStrokes[1].totalStrokesf9) totalStrokesMB = advTotalStrokes[1].totalStrokesf9;
        } else {
            if (advTotalStrokes[0].totalStrokesb9) totalStrokesMA = advTotalStrokes[0].totalStrokesb9;
            if (advTotalStrokes[1].totalStrokesb9) totalStrokesMB = advTotalStrokes[1].totalStrokesb9;
        }*/

        //const havePress = pressesArray[0].filter(press => press === null).length !== 9;

        if (pressesArray.length>0)
            return (
                <View style={styles.scoreView}>
                    <View style={[styles.holeTextView, { paddingRight: 5 }]}>
                        {totalStrokesMA ?
                            <Text>{totalStrokesMA}</Text>
                            : totalStrokesMB ?
                                <Text style={{ color: Colors.Primary }}>-{totalStrokesMB}</Text>
                                : null
                        }
                    </View>
                    <View style={styles.holesView}>
                        {holes.map((hole, i) => <View key={i.toString()} style={[styles.advView, {
                            borderRightWidth: i < holes.length - 1 ? 0 : 0.5,
                        }]}>
                            {pressesArray.map((press, j) => {
                                let array = []
                                if (press[i] !== null && j==0) {
                                    let arrayPress = press[i].split(',')
                                    for (var k = 0; k <= arrayPress.length - 1; k++) {
                                        array.push(<Text key={j.toString()} style={{ fontSize: 12, color: arrayPress[k] < 0 ? Colors.Primary : Colors.Black }}>{arrayPress[k].replace(' ','') === '0' ? '=' : arrayPress[k]}</Text>)
                                    }
                                    //const indexPress[i] = press[i].indexOf(0);
                                    //if (indexPress[i] === i && j > 0) return null;
                                    return (array);
                                } else
                                    return null;
                            })}
                        </View>)}
                        {holes.map((hole, i) => <View key={i.toString()} style={[styles.advView, {
                            borderRightWidth: i < holes.length - 1 ? 0 : 0.5,
                        }]}>
                            {pressesArray2.map((press, j) => {
                                let array = []
                                if (press[i] !== null && j==0) {
                                    let arrayPress = press[i].split(',')
                                    for (var k = 0; k <= arrayPress.length - 1; k++) {
                                        array.push(<Text key={j.toString()} style={{ fontSize: 12, color: arrayPress[k] < 0 ? Colors.Primary : Colors.Black }}>{arrayPress[k].replace(' ','') === '0' ? '=' : arrayPress[k]}</Text>)
                                    }
                                    //const indexPress[i] = press[i].indexOf(0);
                                    //if (indexPress[i] === i && j > 0) return null;
                                    return (array);
                                } else
                                    return null;
                            })}
                        </View>)}
                    </View>
                </View>
            );
        else return null;
    }

    totalScore = (index) => {
        const { advStrokes } = this.props;
        const { holeInfo } = this.state;
        let subTotal = 0;
        let total = 0;
        try {
            this.state.f9H.forEach(item => {
                if (holeInfo[index].holes[item].strokes) {
                    subTotal += holeInfo[index].holes[item].strokes;
                    total += holeInfo[index].holes[item].strokes - advStrokes[index][holeInfo[index].holes[item].adv - 1];
                }
            });

            this.state.b9H.forEach(item => {
                if (holeInfo[index].holes[item].strokes) {
                    subTotal += holeInfo[index].holes[item].strokes;
                    total += holeInfo[index].holes[item].strokes - advStrokes[index][holeInfo[index].holes[item].adv - 1];
                }
            });
        } catch (error) {
            console.log(error);
        }

        return { subTotal, total }
    }

    scoreBackgroundColor = (tee, index, i, strokes) => {
       console.warn(tee)
        try {
            //const index = tee.findIndex(item => item.id === player.tee.id);
            const par = tee[index][i];
            console.warn(par)
            console.warn(strokes)

            if (strokes) {
                if (strokes === par - 1) {
                    return Colors.Birdie;
                }
                if (strokes === par) {
                    return Colors.Par;
                }
                if (strokes === par + 1) {
                    return Colors.Bogey;
                }
                if (strokes >= par + 2) {
                    return Colors.DBL;
                }
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }
}
