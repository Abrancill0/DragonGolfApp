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

        console.warn(this.props.holeInfo[0][1])

        let f9H = [this.props.holeInfo[0][1], this.props.holeInfo[0][2], this.props.holeInfo[0][3], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1]]
        let b9H = [this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1], this.props.holeInfo[0][1]]
        this.state = {
            language: 'es',
            f9H,
            b9H
        };
    }

    render() {

        const {
            language,
            f9H,
            b9H,
        } = this.state;

        const {
            holeInfo,
            tees,
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
                        {tees.map(item =>
                            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.parText}>PAR</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name='square' size={13} color={Colors.Black} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={item.color}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                            </View>)
                        }
                    </View>
                    <View style={styles.holesView}>
                        {f9H.map(item =>
                            <View key={item} style={styles.holeInfoView}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.holeNumber}>{item}</Text>
                                {tees.map(tee =>
                                    <Text
                                        key={tee.id}
                                        style={styles.parNumber}
                                    >
                                        {tee.holes[item].par}
                                    </Text>)
                                }
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
                                    <FontAwesome name='square' size={13} color={Colors.Black} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={'red'}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                                <Text style={styles.hcpNumber}>{(item.handicap).toFixed(0)}</Text>
                            </View>
                        </View>
                        {/*<View style={styles.holesView}>
                            {f9H.map((holeIndex, i) =>
                                <View key={holeIndex}>
                                    <Text style={styles.advText}>{item.holes[holeIndex].adv}</Text>
                                    <View
                                        style={[styles.strokesView,
                                        {
                                            borderRightWidth: i < f9H.length - 1 ? 0 : 0.5,
                                            backgroundColor: this.scoreBackgroundColor(tees, item, holeIndex),
                                        }
                                        ]}
                                    >
                                        <Text style={[styles.holeNumber]}>{item.holes[holeIndex].strokes}</Text>
                                        {advStrokes.length === holeInfo.length && <Text style={styles.advStrokes}>{advStrokes[index][item.holes[holeIndex].adv - 1] ? advStrokes[index][item.holes[holeIndex].adv - 1] : ''}</Text>}
                                    </View>
                                </View>
                            )}
                            <View style={styles.strokesTotalView}>
                                <Text style={styles.strokesTotal}>{this.totalScore(index, 'f').subTotal}</Text>
                                {advTotalStrokes.length === holeInfo.length && <Text style={styles.strokesTotalAdv}>{this.totalScore(index, 'f').total}</Text>}
                            </View>
                        </View>*/}
                    </View>)
                }
                <View style={{ height: 15 }} />
                <View style={styles.holeHeader}>
                    <View style={styles.holeTextView}>
                        <Text style={styles.holeText}>{hole[language]}</Text>
                        {tees.map(item =>
                            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.parText}>PAR</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name='square' size={13} color={Colors.Black} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={item.color}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                            </View>)
                        }
                    </View>
                    <View style={styles.holesView}>
                        {b9H.map(item =>
                            <View key={item} style={styles.holeInfoView}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.holeNumber}>{item}</Text>
                                {tees.map(tee =>
                                    <Text
                                        key={tee.id}
                                        style={styles.parNumber}
                                    >
                                        {tee.holes[item].par}
                                    </Text>)
                                }
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
                                    <FontAwesome name='square' size={13} color={Colors.Black} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={'blue'}
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
