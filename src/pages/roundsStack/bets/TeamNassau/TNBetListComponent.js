import React, { Component } from 'react';
import { View, Text, ActionSheetIOS, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';
import Colors from '../../../../utils/Colors';
import Ripple from 'react-native-material-ripple';
import * as NavigationService from '../../../../routes/NavigationService';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import { Dictionary } from '../../../../utils/Dictionary';
import Icon from 'react-native-vector-icons';
import { actionDeleteTNBet, actionUpdateTNPress, actionTNBetSummary } from '../../../../store/actions';
import ChangeStartingHole from '../../../../utils/ChangeStartingHole';
import { NavigationEvents } from 'react-navigation';
import CalculatePressesTeam from '../../../../utils/CalculatePressesTeam';
import Database from '../../../../database/database';

const database = new Database();


class TNBetListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            f9Presses: [null, null, null, null, null, null, null, null, null],
            b9Presses: [null, null, null, null, null, null, null, null, null],
            match: null,
            medal: null,
            profit: 0,
            manualPress: props.item.manual_press ? props.item.manual_press : 0,
            carry: false,
        };
    }

    async componentDidMount() {
        try {
            this.destructureHoles(this.props.holeInfo);
            await this.calculateAdvStrokes();
            this.calculatePresses(this.props.switchAdv, this.state.manualPress);
        } catch (error) {
            console.log('====================================');
            console.log(error + ': TNBetListComponent, line: 38');
            console.log('====================================');
        }
    }

    render() {

        const { item, index } = this.props;
        const {
            f9Presses,
            b9Presses,
            match,
            medal,
            profit,
            manualPress,
            carry
        } = this.state;

        return (
            <View>
                <NavigationEvents
                    onWillFocus={_ => {
                        try {
                            this.destructureHoles(this.props.holeInfo);
                            this.calculateAdvStrokes();
                            this.calculatePresses(this.props.switchAdv, manualPress);
                        } catch (error) {
                            console.log('====================================');
                            console.log(error + ': TNBetListComponent, line: 66');
                            console.log('====================================');
                        }
                    }}
                />
                <Ripple
                    style={styles.betListView}
                    rippleColor={Colors.Secondary}
                    onPress={this.showSheetView}
                >
                    <View style={styles.betIndexView}>
                        <Text style={styles.betIndexText}>{index}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.betGeneralInfoView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.advInfo, { color: item.adv_strokes < 0 ? 'red' : Colors.Black }]}>[{item.adv_strokes.toFixed(1)}] </Text>
                                <Text style={[styles.vsInfo, { fontSize: 13, alignSelf: 'center' }]}> {item.member_a} {item.member_b} vs {item.member_c} {item.member_d}</Text>
                            </View>
                            <Text style={[styles.profitText, { color: profit < 0 ? Colors.Primary : profit > 0 ? 'green' : Colors.Black }]}>${profit}</Text>
                        </View>
                        <View style={styles.betInfoView}>
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Text style={{ marginRight: 10 }}>${item.front_9} <Text style={{ fontWeight: 'bold' }}>F9:</Text></Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                    {
                                        f9Presses.map((item, index) => {
                                            switch (item) {
                                                case null:
                                                    return <Text key={'tnf9' + index}>_</Text>;
                                                case 0:
                                                    return <Text key={'tnf9' + index}>=</Text>;
                                                default:
                                                    return <Text key={'tnf9' + index} style={{ color: item < 0 ? Colors.Primary : Colors.Black }}>{item}</Text>;
                                            }
                                        })
                                    }
                                </View>
                                <View style={{ width: 30 }} />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Text style={{ marginRight: 10 }}>${item.back_9} <Text style={{ fontWeight: 'bold' }}>B9:</Text></Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                    {
                                        b9Presses.map((item, index) => {
                                            switch (item) {
                                                case null:
                                                    return <Text key={'tnb9' + index}>_</Text>;
                                                case 0:
                                                    return <Text key={'tnb9' + index}>=</Text>;
                                                default:
                                                    return <Text key={'tnb9' + index} style={{ color: item < 0 ? Colors.Primary : Colors.Black }}>{item}</Text>;
                                            }
                                        })
                                    }
                                </View>
                                <View style={{ width: 30, alignItems: 'flex-end' }}>
                                    <Text style={{ color: Colors.Primary, fontWeight: 'bold', fontSize: 12 }}>{manualPress ? `${manualPress}P` : ''}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ textDecorationLine: carry ? 'line-through' : 'none' }}>${item.match} <Text
                                    style={{
                                        textDecorationLine: carry ? 'line-through' : 'none',
                                        fontWeight: 'bold',
                                        color: match && !carry < 0 ? Colors.Primary : Colors.Black
                                    }}>
                                    Match = {carry ? 0 : match}
                                </Text></Text>
                                {carry && <Text style={{ fontSize: 10, color: Colors.Primary, alignSelf: 'center' }}>Carry・ON</Text>}
                                <Text>${item.medal} <Text style={{ fontWeight: 'bold', color: medal < 0 ? Colors.Primary : Colors.Black }}>Medal = {medal}</Text></Text>
                            </View>
                        </View>
                    </View>
                </Ripple>
            </View>
        );
    }

    showSheetView = () => {

        const { language, item } = this.props;
        const {
            seeResults,
            editBet,
            addPress,
            removePress,
            removeBet,
            cancel
        } = Dictionary;

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: [
                        seeResults[language],
                        editBet[language],
                        addPress[language],
                        removePress[language],
                        removeBet[language],
                        cancel[language],
                    ],
                    destructiveButtonIndex: 4,
                    cancelButtonIndex: 5,
                },
                (index) => {
                    if (index !== 5) this.doAction(index);
                },
            );
        } else {
            const resultsIcon = <Icon name='counter' color={Colors.Primary} size={40} family={"MaterialCommunityIcons"} />;
            const editIcon = <Icon name='edit' color={Colors.Primary} size={40} family={"Entypo"} />;
            const addPressIcon = <Icon name='md-add-circle-outline' color={Colors.Primary} size={40} family={"Ionicons"} />;
            const removePressIcon = <Icon name='md-remove-circle-outline' color={Colors.Primary} size={40} family={"Ionicons"} />;
            const removeBetIcon = <Icon name='md-trash' color={Colors.Primary} size={40} family={"Ionicons"} />;

            RNBottomActionSheet.SheetView.Show({
                title: `${item.member_a} ${item.member_b} vs ${item.member_c} ${item.member_d}`,
                items: [
                    { title: seeResults[language], icon: resultsIcon },
                    { title: editBet[language], icon: editIcon },
                    { title: addPress[language], icon: addPressIcon },
                    { title: removePress[language], icon: removePressIcon },
                    { title: removeBet[language], icon: removeBetIcon },
                ],
                onSelection: (index) => {
                    this.doAction(index);
                },
            });
        }
    }

    doAction = (index) => {
        const { item } = this.props;
        const { manualPress } = this.state;
        switch (index) {
            case 0:
                NavigationService.navigate('TNScoreCardView', { item });
                break;
            case 1:
                NavigationService.navigate('TNBetView', { item });
                break;
            case 2:
                item.manual_press = manualPress + 1;
                this.props.updateTNPress(item);
                this.calculatePresses(this.props.switchAdv, manualPress + 1);
                this.setState({ manualPress: manualPress + 1 });
                break;
            case 3:
                if (manualPress > 0) {
                    item.manual_press = manualPress - 1;
                    this.props.updateTNPress(item);
                    this.calculatePresses(this.props.switchAdv, manualPress - 1);
                    this.setState({ manualPress: manualPress - 1 });
                }
                break;
            case 4:
                Alert.alert(
                    Dictionary.sureToDeleteBet[this.props.language],
                    '',
                    [
                        { text: Dictionary.cancel[this.props.language], style: 'cancel' },
                        { text: Dictionary.delete[this.props.language], onPress: _ => this.props.deleteTNBet({ id: item.id, round_id: this.props.roundId, type: 'single' }), style: 'destructive' }
                    ]
                )
                break;
            default:
                Alert.alert('Error', Dictionary.noFeature[this.props.language]);
        }
    }

    destructureHoles = (info) => {
        let diffTees = [];
        let totalScore = [];
        info.forEach(element => {
            let scoref9 = 0;
            let scoreb9 = 0;
            const index = diffTees.findIndex(item => item.id === element.tee.id);
            if (index < 0) {
                diffTees.push({ ...element.tee, holes: element.holes });
            }
            element.holes.forEach(hole => {
                if (hole.hole_number <= 9) {
                    scoref9 += hole.strokes;
                } else {
                    scoreb9 += hole.strokes;
                }
            });
            totalScore.push({ scoref9, scoreb9 });
        });
        let holeInfo = [];
        for (let index = 0; index < this.props.holeInfo.length; index++) {
            if (this.props.holeInfo[index].id === this.props.item.member_a_id) {
                holeInfo.push(this.props.holeInfo[index]);
                break;
            }
        }
        for (let index = 0; index < this.props.holeInfo.length; index++) {
            if (this.props.holeInfo[index].id === this.props.item.member_b_id) {
                holeInfo.push(this.props.holeInfo[index]);
                break;
            }
        }
        for (let index = 0; index < this.props.holeInfo.length; index++) {
            if (this.props.holeInfo[index].id === this.props.item.member_c_id) {
                holeInfo.push(this.props.holeInfo[index]);
                break;
            }
        }
        for (let index = 0; index < this.props.holeInfo.length; index++) {
            if (this.props.holeInfo[index].id === this.props.item.member_d_id) {
                holeInfo.push(this.props.holeInfo[index]);
                break;
            }
        }

        this.setState({ tees: diffTees, totalScore, holeInfo });
        this.holeInfo = holeInfo;
    }

    calculateAdvStrokes = async () => {
        const { item } = this.props;
        //console.log('============= ITEM TEAM NASSAU ===', item);
        let advStrokesArray = [];
        let advTotalStrokes = [];
        let strokes = item.adv_strokes;
        let totalStrokesf9 = 0;
        let totalStrokesb9 = 0;
        let advStrokes = [];
        let advStrokesToAssign = [];
        let absStrokes = 0;
        let team1 = {};
        let team2 = {}; 

        switch (item.who_gets_the_adv_strokes) {
            case 'automatic': 
                let maxStrokes = 0;
                let maxStrokesIdx = 0;
                let courseHcp = 0;
                const configureStrokes = await database.listTeamNassauPlayersConfrontations(item.member_a_id, item.member_b_id, item.member_c_id, item.member_d_id);
                this.holeInfo.forEach((item, index) => {
                    if(configureStrokes[item.id]) {
                        if (configureStrokes[item.id] > maxStrokes) {
                            maxStrokes = configureStrokes[item.id];
                            maxStrokesIdx = index;
                        }
                    } else {
                        courseHcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
                        if (courseHcp > maxStrokes) {
                            maxStrokes = courseHcp;
                            maxStrokesIdx = index;
                        }
                    }
                });
                advStrokes = [];
                for (let index = 0; index < 18; index++) {
                    advStrokes.push(0);
                }

                for (let index = 0; index < 4; index++) {
                    advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
                    advStrokesArray.push(advStrokes);
                }

                advStrokesToAssign = [];
                for (let index = 0; index < 18; index++) {
                    advStrokesToAssign.push(0);
                }

                absStrokes = Math.abs(strokes);
                while (absStrokes > 0) {
                    for (let index = 0; index < advStrokesToAssign.length; index++) {
                        if (absStrokes > 0) {
                            if (index < 9) totalStrokesf9++;
                            else totalStrokesb9++;
                            // advStrokesToAssign[index]++;
                            // absStrokes--;
                            if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
                            else advStrokesToAssign[index]++;
                            absStrokes -= 1;
                        } else {
                            break;
                        }
                    }
                }
                advTotalStrokes[maxStrokesIdx] = { totalStrokesf9, totalStrokesb9 };
                advStrokesArray[maxStrokesIdx] = advStrokesToAssign;
                break;
            case 'hihcp':
                let max = 0;
                let maxIdx = 0;
                this.holeInfo.forEach((item, index) => {
                    const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
                    if (strokes < 0) {
                        if (index >= 2) {
                            if (hcp > max) {
                                max = hcp;
                                maxIdx = index;
                            }
                        }
                    } else {
                        if (index < 2) {
                            if (hcp > max) {
                                max = hcp;
                                maxIdx = index;
                            }
                        }
                    }
                });

                advStrokes = [];
                for (let index = 0; index < 18; index++) {
                    advStrokes.push(0);
                }

                for (let index = 0; index < 4; index++) {
                    advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
                    advStrokesArray.push(advStrokes);
                }

                advStrokesToAssign = [];
                for (let index = 0; index < 18; index++) {
                    advStrokesToAssign.push(0);
                }

                absStrokes = Math.abs(strokes);
                while (absStrokes > 0) {
                    for (let index = 0; index < advStrokesToAssign.length; index++) {
                        if (absStrokes > 0) {
                            if (index < 9) totalStrokesf9++;
                            else totalStrokesb9++;
                            // advStrokesToAssign[index]++;
                            // absStrokes--;
                            if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
                            else advStrokesToAssign[index]++;
                            absStrokes -= 1;
                        } else {
                            break;
                        }
                    }
                }
                advTotalStrokes[maxIdx] = { totalStrokesf9, totalStrokesb9 };
                advStrokesArray[maxIdx] = advStrokesToAssign;
                break;
            case 'lowhcp':
                let min = Number.POSITIVE_INFINITY;
                let minIdx = 0;
                this.holeInfo.forEach((item, index) => {
                    const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
                    if (strokes < 0) {
                        if (index >= 2) {
                            if (hcp < min) {
                                min = hcp;
                                minIdx = index;
                            }
                        }
                    } else {
                        if (index < 2) {
                            if (hcp < min) {
                                min = hcp;
                                minIdx = index;
                            }
                        }
                    }
                });

                advStrokes = [];
                for (let index = 0; index < 18; index++) {
                    advStrokes.push(0);
                }

                for (let index = 0; index < 4; index++) {
                    advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
                    advStrokesArray.push(advStrokes);
                }

                advStrokesToAssign = [];
                for (let index = 0; index < 18; index++) {
                    advStrokesToAssign.push(0);
                }

                absStrokes = Math.abs(strokes);
                while (absStrokes > 0) {
                    for (let index = 0; index < advStrokesToAssign.length; index++) {
                        if (absStrokes > 0) {
                            if (index < 9) totalStrokesf9++;
                            else totalStrokesb9++;
                            // advStrokesToAssign[index]++;
                            // absStrokes--;
                            if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
                            else advStrokesToAssign[index]++;
                            absStrokes -= 1;
                        } else {
                            break;
                        }
                    }
                }
                advTotalStrokes[minIdx] = { totalStrokesf9, totalStrokesb9 };
                advStrokesArray[minIdx] = advStrokesToAssign;
                break;
            case 'each':
                let maxEach = 0;
                let eachMaxIdx = 0;
                let minEach = Number.POSITIVE_INFINITY;
                let eachMinIdx = 0;
                let idxEach = 0;
                team1 = { max: 0, maxIdx: 0, min: Number.POSITIVE_INFINITY, minIdx: 0 };
                team2 = { max: 0, maxIdx: 0, min: Number.POSITIVE_INFINITY, minIdx: 0 };
                this.holeInfo.forEach((item, index) => {
                    const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
                    if (hcp > maxEach) {
                        maxEach = hcp;
                        eachMaxIdx = index;
                    }
                    if (hcp < minEach) {
                        minEach = hcp;
                        eachMinIdx = index;
                    }
                    if (index < 2) {
                        if (hcp > team1.max) {
                            team1.max = hcp;
                            team1.maxIdx = index;
                        }
                        if (hcp < team1.min) {
                            team1.min = hcp;
                            team1.minIdx = index;
                        }
                    } else {
                        if (hcp > team2.max) {
                            team2.max = hcp;
                            team2.maxIdx = index;
                        }
                        if (hcp < team2.min) {
                            team2.min = hcp;
                            team2.minIdx = index;
                        }
                    }
                });

                advStrokes = [];
                for (let index = 0; index < 18; index++) {
                    advStrokes.push(0);
                }

                for (let index = 0; index < 4; index++) {
                    advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
                    advStrokesArray.push(advStrokes);
                }

                let advStrokesToAssign1 = [];
                let advStrokesToAssign2 = [];
                for (let index = 0; index < 18; index++) {
                    advStrokesToAssign1.push(0);
                    advStrokesToAssign2.push(0);
                }

                if (eachMinIdx < 2) {
                    strokes = team2.min - minEach;
                    idxEach = team2.minIdx;
                } else {
                    strokes = team1.min - minEach;
                    idxEach = team1.minIdx;
                }

                if (strokes !== Number.POSITIVE_INFINITY) {
                    while (strokes > 0) {
                        for (let index = 0; index < advStrokesToAssign2.length; index++) {
                            if (strokes > 0) {
                                if (index < 9) totalStrokesf9++;
                                else totalStrokesb9++;
                                advStrokesToAssign2[index]++;
                                strokes--;
                            } else {
                                break;
                            }
                        }
                    }
                } else {
                    console.warn('Bucle Infinito: TNBetListComponent 460');
                }
                advTotalStrokes[idxEach] = { totalStrokesf9, totalStrokesb9 };
                advStrokesArray[idxEach] = advStrokesToAssign2;

                idxEach = eachMaxIdx;
                if (eachMaxIdx < 2) {
                    strokes = maxEach - team2.max;
                } else {
                    strokes = maxEach - team1.max;
                }

                if (strokes !== Number.POSITIVE_INFINITY) {
                    while (strokes > 0) {
                        for (let index = 0; index < advStrokesToAssign1.length; index++) {
                            if (strokes > 0) {
                                if (index < 9) totalStrokesf9++;
                                else totalStrokesb9++;
                                advStrokesToAssign1[index]++;
                                strokes--;
                            } else {
                                break;
                            }
                        }
                    }
                } else {
                    console.warn('Bucle Infinito: TNBetListComponent 486');
                }
                advTotalStrokes[idxEach] = { totalStrokesf9, totalStrokesb9 };
                advStrokesArray[idxEach] = advStrokesToAssign1;
                break;
            case 'slidhi':
                let hiIdx = 0;
                team1 = { prom: 0, idx: 0, max: 0 };
                team2 = { prom: 0, idx: 0, max: 0 };
                this.holeInfo.forEach((item, index) => {
                    const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
                    if (index < 2) {
                        team1.prom += hcp;
                        if (hcp > team1.max) {
                            team1.max = hcp;
                            team1.idx = index;
                        }
                    }
                    else {
                        team2.prom += hcp;
                        if (hcp > team2.max) {
                            team2.max = hcp;
                            team2.idx = index;
                        }
                    }
                });
                team1.prom /= 2;
                team2.prom /= 2;
                if (team1.prom >= team2.prom) {
                    hiIdx = team1.idx;
                } else {
                    hiIdx = team2.idx;
                }

                advStrokes = [];
                for (let index = 0; index < 18; index++) {
                    advStrokes.push(0);
                }

                for (let index = 0; index < 4; index++) {
                    advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
                    advStrokesArray.push(advStrokes);
                }

                advStrokesToAssign = [];
                for (let index = 0; index < 18; index++) {
                    advStrokesToAssign.push(0);
                }

                if (strokes !== Number.POSITIVE_INFINITY) {
                    absStrokes = Math.abs(strokes);
                    while (absStrokes > 0) {
                        for (let index = 0; index < advStrokesToAssign.length; index++) {
                            if (absStrokes > 0) {
                                if (index < 9) totalStrokesf9++;
                                else totalStrokesb9++;
                                // advStrokesToAssign[index]++;
                                // absStrokes--;
                                if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
                                else advStrokesToAssign[index]++;
                                absStrokes -= 1;
                            } else {
                                break;
                            }
                        }
                    }
                } else {
                    console.warn('Bucle Infinito: TNBetListComponent 550');
                }
                advTotalStrokes[hiIdx] = { totalStrokesf9, totalStrokesb9 };
                advStrokesArray[hiIdx] = advStrokesToAssign;
                break;
            case 'slidlow':
                let lowIdx = 0;
                team1 = { prom: 0, idx: 0, min: Number.POSITIVE_INFINITY };
                team2 = { prom: 0, idx: 0, min: Number.POSITIVE_INFINITY };
                this.holeInfo.forEach((item, index) => {
                    const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
                    if (index < 2) {
                        team1.prom += hcp;
                        if (hcp < team1.min) {
                            team1.max = hcp;
                            team1.idx = index;
                        }
                    }
                    else {
                        team2.prom += hcp;
                        if (hcp < team2.min) {
                            team2.max = hcp;
                            team2.idx = index;
                        }
                    }
                });
                team1.prom /= 2;
                team2.prom /= 2;
                if (team1.prom <= team2.prom) {
                    lowIdx = team1.idx;
                } else {
                    lowIdx = team2.idx;
                }

                advStrokes = [];
                for (let index = 0; index < 18; index++) {
                    advStrokes.push(0);
                }

                for (let index = 0; index < 4; index++) {
                    advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
                    advStrokesArray.push(advStrokes);
                }

                advStrokesToAssign = [];
                for (let index = 0; index < 18; index++) {
                    advStrokesToAssign.push(0);
                }

                if (strokes !== Number.POSITIVE_INFINITY) {
                    absStrokes = Math.abs(strokes);
                    while (absStrokes > 0) {
                        for (let index = 0; index < advStrokesToAssign.length; index++) {
                            if (absStrokes > 0) {
                                if (index < 9) totalStrokesf9++;
                                else totalStrokesb9++;
                                // advStrokesToAssign[index]++;
                                // absStrokes--;
                                if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
                                else advStrokesToAssign[index]++;
                                absStrokes -= 1;
                            } else {
                                break;
                            }
                        }
                    }
                } else {
                    console.warn('Bucle Infinito: TNBetListComponent 614');
                }
                advTotalStrokes[lowIdx] = { totalStrokesf9, totalStrokesb9 };
                advStrokesArray[lowIdx] = advStrokesToAssign;
                break;
        }

        this.advStrokesArray = advStrokesArray;
        this.setState({ advStrokes: advStrokesArray, advTotalStrokes });
    }

    calculatePresses = (switchAdv, manualPress) => {
        const holesMA = ChangeStartingHole(this.props.initHole, this.holeInfo[0].holes);
        const holesMB = ChangeStartingHole(this.props.initHole, this.holeInfo[1].holes);
        const holesMC = ChangeStartingHole(this.props.initHole, this.holeInfo[2].holes);
        const holesMD = ChangeStartingHole(this.props.initHole, this.holeInfo[3].holes);

        const pressesF9 = CalculatePressesTeam(holesMA.front9, holesMB.front9, holesMC.front9, holesMD.front9, this.advStrokesArray, this.props.item.automatic_press_every, switchAdv);
        const pressesB9 = CalculatePressesTeam(holesMA.back9, holesMB.back9, holesMC.back9, holesMD.back9, this.advStrokesArray, this.props.item.automatic_press_every, switchAdv);

        const pressesArray = {
            front9: pressesF9.totalPresses,
            back9: pressesB9.totalPresses
        }

        const f9Presses = this.state.f9Presses;
        const b9Presses = this.state.b9Presses;
        pressesArray.front9.map((item, index) => {
            let auxIndex = 0;
            for (let i = item.length - 1; i >= 0; i--) {
                if (item[i] !== null) {
                    auxIndex = i;
                    break;
                }
            }
            if (item.indexOf(0) !== auxIndex || index === 0) {
                f9Presses[index] = item[auxIndex];
            }
        });

        pressesArray.back9.map((item, index) => {
            let auxIndex = 0;
            for (let i = item.length - 1; i >= 0; i--) {
                if (item[i] !== null) {
                    auxIndex = i;
                    break;
                }
            }
            if (item.indexOf(0) !== auxIndex || index === 0) {
                b9Presses[index] = item[auxIndex];
            }
        });
        const match = pressesF9.match + pressesB9.match;
        const medal = pressesF9.medal + pressesB9.medal;

        let totalF9Profit = 0;
        let totalB9Profit = 0;
        for (let i = 0; i < 9; i++) {
            if (f9Presses[i] > 0) totalF9Profit += this.props.item.front_9;
            if (f9Presses[i] < 0) totalF9Profit -= this.props.item.front_9;
            if (b9Presses[i] > 0) totalB9Profit += f9Presses[0] === 0 ? this.props.item.carry : this.props.item.back_9;
            if (b9Presses[i] < 0) totalB9Profit -= f9Presses[0] === 0 ? this.props.item.carry : this.props.item.back_9;
        }
        if (f9Presses[0] !== 0 && manualPress !== 0) {
            for (let i = 0; i < manualPress; i++) {
                for (let i = 0; i < 9; i++) {
                    if (b9Presses[i] > 0) totalB9Profit += this.props.item.back_9;
                    if (b9Presses[i] < 0) totalB9Profit -= this.props.item.back_9;
                }
            }
        }

        let matchProfit = 0;
        if (f9Presses[0] !== 0) {
            if (match < 0) matchProfit = -this.props.item.match;
            if (match > 0) matchProfit = this.props.item.match;
        } else {
            this.setState({ carry: true });
        }

        let medalProfit = 0;
        if (medal < 0) medalProfit = -this.props.item.medal;
        if (medal > 0) medalProfit = this.props.item.medal;

        const profit = totalF9Profit + totalB9Profit + matchProfit + medalProfit;

        if (this.props.tnBetProfits) {
            this.props.tnBetProfits[this.props.index - 1] = { member_a: this.props.item.member_a, member_b: this.props.item.member_b, member_c: this.props.item.member_c, member_d: this.props.item.member_d, profit };
            this.props.tnBetSummary(this.props.tnBetProfits);
        }

        this.setState({ f9Presses, b9Presses, match, medal, profit });
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    roundId: state.reducerRoundId,
    holeInfo: state.reducerHole,
    switchAdv: state.reducerSwitchAdv,
    initHole: state.reducerInitHole,
});

const mapDispatchToProps = dispatch => ({
    deleteTNBet: (value) => {
        dispatch(actionDeleteTNBet(value));
    },
    updateTNPress: (values) => {
        dispatch(actionUpdateTNPress(values));
    },
    tnBetSummary: (value) => {
        dispatch(actionTNBetSummary(value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TNBetListComponent);
