import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Dictionary } from '../../../utils/Dictionary';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../utils/Colors';
import ChangeStartingHole from '../../../utils/ChangeStartingHole';

export default class ScoreHorizontalComponent extends Component {
    constructor(props) {
        super(props);

        let holes = [];
        for (let index = 0; index < 18; index++) {
            holes.push(index);
        }
        const newHoles = ChangeStartingHole(props.initHole, holes);

        console.warn(this.props.holeInfo)

        let f9H = []
        let f9HA = []
        let b9H = []
        let b9HA = []
        let teesf9 = []
        let teesb9 = []
        let TotalScore = []
        let ScoreOut = []
        let TotalScoreGP = []
        let ScoreOutGP = []
        let f9GV = []
        let b9GV = []
        let TeeColor = []

        for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
            f9H.push([this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9]])
            f9HA.push([this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9']])
            b9H.push([this.props.holeInfo[i][10], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18]]   )
            TotalScore.push(this.props.holeInfo[i]['TotalScore'])
            ScoreOut.push(this.props.holeInfo[i]['ScoreOut'])
            TotalScoreGP.push(this.props.holeInfo[i]['TotalScoreGP'])
            ScoreOutGP.push(this.props.holeInfo[i]['ScoreOutGP'])
            b9HA.push([this.props.holeInfo[i]['Ho_Advantage10'], this.props.holeInfo[i]['Ho_Advantage11'], this.props.holeInfo[i]['Ho_Advantage12'], this.props.holeInfo[i]['Ho_Advantage13'], this.props.holeInfo[i]['Ho_Advantage14'], this.props.holeInfo[i]['Ho_Advantage15'], this.props.holeInfo[i]['Ho_Advantage16'], this.props.holeInfo[i]['Ho_Advantage17'], this.props.holeInfo[i]['Ho_Advantage18']])
            f9GV.push([this.props.holeInfo[i]['GolpesVentaja1'], this.props.holeInfo[i]['GolpesVentaja2'], this.props.holeInfo[i]['GolpesVentaja3'], this.props.holeInfo[i]['GolpesVentaja4'], this.props.holeInfo[i]['GolpesVentaja5'], this.props.holeInfo[i]['GolpesVentaja6'], this.props.holeInfo[i]['GolpesVentaja7'], this.props.holeInfo[i]['GolpesVentaja8'], this.props.holeInfo[i]['GolpesVentaja9']])
            b9GV.push([this.props.holeInfo[i]['GolpesVentaja10'], this.props.holeInfo[i]['GolpesVentaja11'], this.props.holeInfo[i]['GolpesVentaja12'], this.props.holeInfo[i]['GolpesVentaja13'], this.props.holeInfo[i]['GolpesVentaja14'], this.props.holeInfo[i]['GolpesVentaja15'], this.props.holeInfo[i]['GolpesVentaja16'], this.props.holeInfo[i]['GolpesVentaja17'], this.props.holeInfo[i]['GolpesVentaja18']]   )
        }

        for (var i = 0 ; i <= this.props.tees.length - 1; i++) {
            teesf9.push([this.props.tees[i]['Par_Hole1'], this.props.tees[i]['Par_Hole2'], this.props.tees[i]['Par_Hole3'], this.props.tees[i]['Par_Hole4'], this.props.tees[i]['Par_Hole5'], this.props.tees[i]['Par_Hole6'], this.props.tees[i]['Par_Hole7'], this.props.tees[i]['Par_Hole8'], this.props.tees[i]['Par_Hole9']])
            teesb9.push([this.props.tees[i]['Par_Hole10'], this.props.tees[i]['Par_Hole11'], this.props.tees[i]['Par_Hole12'], this.props.tees[i]['Par_Hole13'], this.props.tees[i]['Par_Hole14'], this.props.tees[i]['Par_Hole15'], this.props.tees[i]['Par_Hole16'], this.props.tees[i]['Par_Hole17'], this.props.tees[i]['Par_Hole18']])
            TeeColor.push(this.props.tees[i]['Te_TeeColor'])
        }

        console.warn(f9H[0][0])

        /*
        let f9H = [this.props.holeInfo[0][1], this.props.holeInfo[0][2], this.props.holeInfo[0][3], this.props.holeInfo[0][4], this.props.holeInfo[0][5], this.props.holeInfo[0][6], this.props.holeInfo[0][7], this.props.holeInfo[0][8], this.props.holeInfo[0][9]]
        let f9HA = [this.props.holeInfo[0]['Ho_Advantage1'], this.props.holeInfo[0]['Ho_Advantage2'], this.props.holeInfo[0]['Ho_Advantage3'], this.props.holeInfo[0]['Ho_Advantage4'], this.props.holeInfo[0]['Ho_Advantage5'], this.props.holeInfo[0]['Ho_Advantage6'], this.props.holeInfo[0]['Ho_Advantage7'], this.props.holeInfo[0]['Ho_Advantage8'], this.props.holeInfo[0]['Ho_Advantage9']]
        let b9H = [this.props.holeInfo[0][10], this.props.holeInfo[0][11], this.props.holeInfo[0][12], this.props.holeInfo[0][13], this.props.holeInfo[0][14], this.props.holeInfo[0][15], this.props.holeInfo[0][16], this.props.holeInfo[0][17], this.props.holeInfo[0][18]]   
        let teesf9 = [this.props.holeInfo[0]['ho_par1'], this.props.holeInfo[0]['ho_par2'], this.props.holeInfo[0]['ho_par3'], this.props.holeInfo[0]['ho_par4'], this.props.holeInfo[0]['ho_par5'], this.props.holeInfo[0]['ho_par6'], this.props.holeInfo[0]['ho_par7'], this.props.holeInfo[0]['ho_par8'], this.props.holeInfo[0]['ho_par9']]
        let teesb9 = [this.props.holeInfo[0]['ho_par10'], this.props.holeInfo[0]['ho_par11'], this.props.holeInfo[0]['ho_par12'], this.props.holeInfo[0]['ho_par13'], this.props.holeInfo[0]['ho_par14'], this.props.holeInfo[0]['ho_par15'], this.props.holeInfo[0]['ho_par16'], this.props.holeInfo[0]['ho_par17'], this.props.holeInfo[0]['ho_par18']]*/
        this.state = {
            language: 'es',
            f9H,
            f9HA,
            b9H,
            b9HA,
            f9GV,
            b9GV,
            teesf9,
            teesb9,
            TotalScore,
            ScoreOut,
            TotalScoreGP,
            ScoreOutGP,
            TeeColor
        };
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
            TotalScore,
            ScoreOut,
            TotalScoreGP,
            ScoreOutGP,
            b9H,
            b9HA,
            TeeColor
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
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.holeNumber}>{index2 + 1}</Text>
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
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.holeNumber}>{index3 + 10}</Text>
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
                                <Text style={styles.hcpNumber}>{(item.handicap).toFixed(0)}</Text>
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
                                            backgroundColor: this.scoreBackgroundColor(teesf9, item, holeIndex),
                                        }
                                        ]}
                                    >
                                        {holeIndex!=0 &&<Text style={styles.holeNumber}>{holeIndex}</Text>}
                                        <Text style={styles.advStrokes}>{f9GV[index][i]}</Text>
                                    </View>
                                </View>
                            )}
                            {b9H[index].map((holeIndex, i) =>
                                <View key={i}>
                                    <Text style={styles.advText}>{b9HA[index][i]}</Text>
                                    <View style={[styles.strokesView,
                                    {
                                        borderRightWidth: i < b9H[index].length - 1 ? 0 : 0.5,
                                        backgroundColor: this.scoreBackgroundColor(teesb9, item, holeIndex),
                                    }
                                    ]}>
                                        {holeIndex!=0 &&<Text style={styles.holeNumber}>{holeIndex}</Text>}
                                        <Text style={styles.advStrokes}>{b9GV[index][i]}</Text>
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
            </View>
        );
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

    scoreBackgroundColor = (tee, player, hole) => {
        /*
        try {
            const index = tee.findIndex(item => item.id === player.tee.id);
            const par = tee[index].holes[hole].par;
            const strokes = player.holes[hole].strokes;

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
        return null;*/
    }
}
