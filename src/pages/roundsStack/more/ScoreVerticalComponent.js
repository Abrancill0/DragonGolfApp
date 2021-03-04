import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Dictionary } from '../../../utils/Dictionary';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../utils/Colors';
import ChangeStartingHole from '../../../utils/ChangeStartingHole';

export default class ScoreVerticalComponent extends Component {
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
        let teesf9 = []
        let teesb9 = []

        for (var i = 0 ; i <= this.props.holeInfo.length - 1; i++) {
            f9H.push([this.props.holeInfo[i][1], this.props.holeInfo[i][2], this.props.holeInfo[i][3], this.props.holeInfo[i][4], this.props.holeInfo[i][5], this.props.holeInfo[i][6], this.props.holeInfo[i][7], this.props.holeInfo[i][8], this.props.holeInfo[i][9]])
            f9HA.push([this.props.holeInfo[i]['Ho_Advantage1'], this.props.holeInfo[i]['Ho_Advantage2'], this.props.holeInfo[i]['Ho_Advantage3'], this.props.holeInfo[i]['Ho_Advantage4'], this.props.holeInfo[i]['Ho_Advantage5'], this.props.holeInfo[i]['Ho_Advantage6'], this.props.holeInfo[i]['Ho_Advantage7'], this.props.holeInfo[i]['Ho_Advantage8'], this.props.holeInfo[i]['Ho_Advantage9']])
            b9H.push([this.props.holeInfo[i][this.props.holeInfo[i]], this.props.holeInfo[i][11], this.props.holeInfo[i][12], this.props.holeInfo[i][13], this.props.holeInfo[i][14], this.props.holeInfo[i][15], this.props.holeInfo[i][16], this.props.holeInfo[i][17], this.props.holeInfo[i][18]]   )
            teesf9.push([this.props.holeInfo[i]['ho_par1'], this.props.holeInfo[i]['ho_par2'], this.props.holeInfo[i]['ho_par3'], this.props.holeInfo[i]['ho_par4'], this.props.holeInfo[i]['ho_par5'], this.props.holeInfo[i]['ho_par6'], this.props.holeInfo[i]['ho_par7'], this.props.holeInfo[i]['ho_par8'], this.props.holeInfo[i]['ho_par9']])
            teesb9.push([this.props.holeInfo[i]['ho_par1this.props.holeInfo[i]'], this.props.holeInfo[i]['ho_par11'], this.props.holeInfo[i]['ho_par12'], this.props.holeInfo[i]['ho_par13'], this.props.holeInfo[i]['ho_par14'], this.props.holeInfo[i]['ho_par15'], this.props.holeInfo[i]['ho_par16'], this.props.holeInfo[i]['ho_par17'], this.props.holeInfo[i]['ho_par18']])
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
            teesf9,
            teesb9
        };
    }

    render() {

        const {
            language,
            f9H,
            f9HA,
            teesf9,
            teesb9,
            b9H,
        } = this.state;

        const {
            holeInfo,
            hcpAdj,
            totalScore,
            advStrokes,
            advTotalStrokes
        } = this.props;

        const {
            hole
        } = Dictionary;

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.holeHeader}>
                    <View style={styles.holeTextView}>
                        <Text style={styles.holeText}>{hole[language]}</Text>
                        <View  style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.parText}>PAR</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name='square' size={13} color={Colors.Black} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={Colors.Black}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                            </View>
                    </View>
                    <View style={styles.holesView}>
                        {teesf9.map((item,index) =>
                            <View key={index} style={styles.holeInfoView}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.holeNumber}>{index + 1}</Text>
                                <Text
                                        key={index}
                                        style={styles.parNumber}
                                    >
                                        {item[0]}
                                    </Text>
                            </View>)
                        }
                    </View>
                </View>

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
                            {f9H.map((holeIndex, i) =>
                                <View key={holeIndex}>
                                    <Text style={styles.advText}>{f9HA[i][index]}</Text>
                                    <View
                                        style={[styles.strokesView,
                                        {
                                            borderRightWidth: i < f9H.length - 1 ? 0 : 0.5,
                                            backgroundColor: this.scoreBackgroundColor(teesf9, item, holeIndex),
                                        }
                                        ]}
                                    >
                                        <Text style={[styles.holeNumber]}>{holeIndex[index]}</Text>
                                        <Text style={styles.advStrokes}>{item.strokes}</Text>
                                    </View>
                                </View>
                            )}
                            <View style={styles.strokesTotalView}>
                                <Text style={styles.strokesTotal}>{this.totalScore(index, 'f').subTotal}</Text>
                                <Text style={styles.strokesTotalAdv}>{this.totalScore(index, 'f').total}</Text>
                            </View>
                        </View>
                    </View>)
                }
                <View style={{ height: 15 }} />
                <View style={styles.holeHeader}>
                    <View style={styles.holeTextView}>
                        <Text style={styles.holeText}>{hole[language]}</Text>
                        <View  style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.parText}>PAR</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name='square' size={13} color={Colors.Black} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={Colors.Black}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                            </View>
                    </View>
                    <View style={styles.holesView}>
                        {teesb9.map((item,index) =>
                            <View key={item} style={styles.holeInfoView}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.holeNumber}>{index + 10}</Text>
                                <Text
                                        key={index}
                                        style={styles.parNumber}
                                    >
                                        {item}
                                    </Text>
                            </View>)
                        }
                    </View>
                </View>

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
                        {/*<View style={styles.holesView}>
                            {b9H.map((holeIndex, i) =>
                                <View key={holeIndex}>
                                    <Text style={styles.advText}>{item.holes[holeIndex].adv}</Text>
                                    <View style={[styles.strokesView,
                                    {
                                        borderRightWidth: i < b9H.length - 1 ? 0 : 0.5,
                                        backgroundColor: this.scoreBackgroundColor(tees, item, holeIndex),
                                    }
                                    ]}>
                                        <Text style={styles.holeNumber}>{item.holes[holeIndex].strokes}</Text>
                                        {advStrokes.length === holeInfo.length && <Text style={styles.advStrokes}>{advStrokes[index][item.holes[holeIndex].adv - 1] ? advStrokes[index][item.holes[holeIndex].adv - 1] : ''}</Text>}
                                    </View>
                                </View>
                            )}
                            <View style={styles.strokesTotalView}>
                                <Text style={styles.strokesTotal}>{this.totalScore(index, 'b').subTotal}</Text>
                                {advTotalStrokes.length === holeInfo.length && <Text style={styles.strokesTotalAdv}>{this.totalScore(index, 'b').total}</Text>}
                            </View>
                        </View>*/}
                    </View>)
                }
            </View>
        );
    }

    totalScore = (index, type) => {
        const { advStrokes } = this.props;
        const { holeInfo } = this.state;
        let subTotal = 0;
        let total = 0;
        try {
            if (type === 'f') {
                this.state.f9H.forEach(item => {
                    if (holeInfo[index].holes[item].strokes) {
                        //console.log('index: ' + index + ', item (index hoyo): ' + item + ' , Num Hoyo: ' + holeInfo[index].holes[item].hole_number + ', strokes: ' + holeInfo[index].holes[item].strokes + ', index (de ventaja): ' + (holeInfo[index].holes[item].adv) + ',ventaja: ' + advStrokes[index][holeInfo[index].holes[item].adv - 1]);
                        subTotal += holeInfo[index].holes[item].strokes;
                        total += holeInfo[index].holes[item].strokes - advStrokes[index][holeInfo[index].holes[item].adv - 1];
                    }
                });
            }
            if (type === 'b') {
                this.state.b9H.forEach(item => {
                    if (holeInfo[index].holes[item].strokes) {
                        subTotal += holeInfo[index].holes[item].strokes;
                        total += holeInfo[index].holes[item].strokes - advStrokes[index][holeInfo[index].holes[item].adv - 1];
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
        console.log('Total score: ', { subTotal, total });
        return { subTotal, total }
    }

    scoreBackgroundColor = (tee, player, hole) => {
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
        return null;
    }
}
