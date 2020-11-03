import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Dictionary } from '../../../../utils/Dictionary';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../../utils/Colors';
import ChangeStartingHole from '../../../../utils/ChangeStartingHole';

export default class ScoreVerticalComponent extends Component {
    constructor(props) {
        super(props);

        let holes = [];
        for (let index = 0; index < 18; index++) {
            holes.push(index);
        }
        const newHoles = ChangeStartingHole(props.initHole, holes);

        let f9H = newHoles.front9;
        let b9H = newHoles.back9;

        let holeInfo = [];
        props.holeInfo.forEach(item => {
            let newHoles = [];
            item.holes.forEach(hole => {
                const newHoleObj = {
                    adv: hole.adv,
                    hole_number: hole.hole_number,
                    par: hole.par,
                    strokes: hole.strokes
                };
                newHoles.push(newHoleObj);
            });
            const newHoleInfo = {
                handicap: item.handicap,
                holes: newHoles,
                id: item.id,
                id_sync: item.id_sync,
                nick_name: item.nick_name,
                photo: item.photo,
                player: item.player,
                round_id: item.round_id,
                tee: item.tee,
                ultimate_sync: item.ultimate_sync
            };
            holeInfo.push(newHoleInfo);
        });

        if (props.switchAdv) {
            let info = holeInfo;
            info.forEach((item, i) => {
                item.holes.forEach((hole, j) => {
                    if (hole.adv % 2 === 0) hole.adv = hole.adv - 1;
                    else hole.adv = hole.adv + 1;
                });
            });
        }

        this.state = {
            f9H,
            b9H,
            holeInfo,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.holeInfo !== this.props.holeInfo) {
            let holeInfo = [];
            nextProps.holeInfo.forEach(item => {
                let newHoles = [];
                item.holes.forEach(hole => {
                    const newHoleObj = {
                        adv: hole.adv,
                        hole_number: hole.hole_number,
                        par: hole.par,
                        strokes: hole.strokes
                    };
                    newHoles.push(newHoleObj);
                });
                const newHoleInfo = {
                    handicap: item.handicap,
                    holes: newHoles,
                    id: item.id,
                    id_sync: item.id_sync,
                    nick_name: item.nick_name,
                    photo: item.photo,
                    player: item.player,
                    round_id: item.round_id,
                    tee: item.tee,
                    ultimate_sync: item.ultimate_sync
                };
                holeInfo.push(newHoleInfo);
            });

            if (this.props.switchAdv) {
                holeInfo.forEach((item, i) => {
                    item.holes.forEach((hole, j) => {
                        if (hole.adv % 2 === 0) hole.adv = hole.adv - 1;
                        else hole.adv = hole.adv + 1;
                    });
                });
                this.setState({ holeInfo });
            }
            this.setState({ holeInfo })
        }

        if (nextProps.initHole !== this.props.initHole) {
            let holes = [];
            for (let index = 0; index < 18; index++) {
                holes.push(index);
            }
            const newHoles = ChangeStartingHole(nextProps.initHole, holes);
            this.setState({
                f9H: newHoles.front9,
                b9H: newHoles.back9
            });
        }
    }

    render() {

        const {
            f9H,
            b9H,
            holeInfo,
        } = this.state;

        const {
            language,
            tees,
            hcpAdj,
            totalScore,
            advStrokes,
            advTotalStrokes,
            pressesArray
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
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.holeNumber}>{item + 1}</Text>
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
                            <Text style={styles.nickName} numberOfLines={1} adjustsFontSizeToFit>{item.nick_name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name='square' size={13} color={Colors.Black} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={item.tee.color}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                                <Text style={styles.hcpNumber}>{((item.handicap * item.tee.slope / 113) * hcpAdj).toFixed(0)}</Text>
                            </View>
                        </View>
                        <View style={styles.holesView}>
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
                        </View>
                    </View>)
                }
                {this.renderPressTable(f9H, pressesArray.front9, 'f9')}
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
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.holeNumber}>{item + 1}</Text>
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
                            <Text style={styles.nickName} numberOfLines={1} adjustsFontSizeToFit>{item.nick_name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name='square' size={13} color={Colors.Black} />
                                    <FontAwesome
                                        name='square'
                                        size={12}
                                        color={item.tee.color}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                                <Text style={styles.hcpNumber}>{((item.handicap * item.tee.slope / 113) * hcpAdj).toFixed(0)}</Text>
                            </View>
                        </View>
                        <View style={styles.holesView}>
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
                        </View>
                    </View>)
                }
                {this.renderPressTable(b9H, pressesArray.back9, 'b9')}
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

    renderPressTable = (holes, pressesArray, type) => {

        const {
            advTotalStrokes,
        } = this.props;

        let totalStrokesMA = 0;
        let totalStrokesMB = 0;
        if (type === 'f9') {
            if (advTotalStrokes[0].totalStrokesf9) totalStrokesMA = advTotalStrokes[0].totalStrokesf9;
            if (advTotalStrokes[1].totalStrokesf9) totalStrokesMB = advTotalStrokes[1].totalStrokesf9;
        } else {
            if (advTotalStrokes[0].totalStrokesb9) totalStrokesMA = advTotalStrokes[0].totalStrokesb9;
            if (advTotalStrokes[1].totalStrokesb9) totalStrokesMB = advTotalStrokes[1].totalStrokesb9;
        }

        const havePress = pressesArray[0].filter(press => press === null).length !== 9;

        if (havePress)
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
                                if (press[i] !== null) {
                                    const indexPress = press.indexOf(0);
                                    if (indexPress === i && j > 0) return null;
                                    return (<Text key={j.toString()} style={{ fontSize: 12, color: press[i] < 0 ? Colors.Primary : Colors.Black }}>{press[i] === 0 ? '=' : press[i]}</Text>);
                                } else
                                    return null;
                            })}
                        </View>)}
                    </View>
                </View>
            );
        else return null;
    }
}
