import React, { Component } from 'react';
import { View, Text, Platform, ActionSheetIOS, Alert } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons';
import styles from '../styles';
import Colors from '../../../../utils/Colors';
import { Dictionary } from '../../../../utils/Dictionary';
//import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import * as NavigationService from '../../../../routes/NavigationService';
import ChangeStartingHole from '../../../../utils/ChangeStartingHole';
import CalculateAdvMedal from '../../../../utils/CalculateAdvMedal';

class MedalBetListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minF9Data: { nicknames: [], strokes: '' },
            minB9Data: { nicknames: [], strokes: '' },
            min18Data: { nicknames: [], strokes: '' }
        };
    }

    componentDidMount() {
        this.calculateStrokes();
    }

    render() {

        const { minF9Data, minB9Data, min18Data } = this.state
        const { item, index } = this.props;

        return (
            <Ripple
                style={styles.betListView}
                rippleColor={Colors.Secondary}
                onPress={this.showSheetView}
            >
                <View style={[styles.betIndexView, { marginRight: 10 }]}>
                    <Text style={styles.betIndexText}>{index}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {item.players.map((player, index) =>
                            <Text
                                key={player.member_id.toString()}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={[styles.vsInfo, { fontSize: 13, alignSelf: 'center' }]}
                            >
                                {`${player.nick_name}${index < item.players.length - 1 ? ', ' : ''}`}
                            </Text>
                        )}
                    </View>
                    <View style={{ flex: 1, paddingVertical: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>F9:</Text>
                            <Text>${item.wager_f9}</Text>
                            <Text style={{ fontWeight: 'bold' }}>B9:</Text>
                            <Text>${item.wager_b9}</Text>
                            <Text style={{ fontWeight: 'bold' }}>T18:</Text>
                            <Text>${item.wager_18}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: Colors.Primary }}>{minF9Data.nicknames.join("\n")}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{minF9Data.strokes}</Text>
                            <Text style={{ fontWeight: 'bold', color: Colors.Primary }}>{minB9Data.nicknames.join("\n")}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{minB9Data.strokes}</Text>
                            <Text style={{ fontWeight: 'bold', color: Colors.Primary }}>{min18Data.nicknames.join("\n")}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{min18Data.strokes}</Text>
                        </View>
                    </View>
                </View>
            </Ripple>
        );
    }

    showSheetView = () => {
        const { language, item } = this.props;
        const {
            seeResults,
            editBet,
            removeBet,
            cancel
        } = Dictionary;

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: [
                        seeResults[language],
                        editBet[language],
                        removeBet[language],
                        cancel[language],
                    ],
                    destructiveButtonIndex: 2,
                    cancelButtonIndex: 3,
                },
                (index) => {
                    if (index !== 3) this.doAction(index);
                },
            );
        } else {/*
            const resultsIcon = <Icon name='counter' color={Colors.Primary} size={40} family={"MaterialCommunityIcons"} />;
            const editIcon = <Icon name='edit' color={Colors.Primary} size={40} family={"Entypo"} />;
            const removeBetIcon = <Icon name='md-trash' color={Colors.Primary} size={40} family={"Ionicons"} />;
            let title = '';
            item.players.forEach((player, idx) => title += player.nick_name + (idx < item.players.length - 1 ? ', ' : ''));

            RNBottomActionSheet.SheetView.Show({
                title: title,
                items: [
                    { title: seeResults[language], icon: resultsIcon },
                    { title: editBet[language], icon: editIcon },
                    { title: removeBet[language], icon: removeBetIcon },
                ],
                onSelection: (index) => {
                    this.doAction(index);
                },
            });
        */}
    }

    doAction = (index) => {
        const { item } = this.props;

        switch (index) {
            case 0:
                NavigationService.navigate('MedalInfoView', { item });
                break;
            case 1:
                NavigationService.navigate('MedalBetView', { item });
                break;
            case 2:
                Alert.alert(
                    Dictionary.sureToDeleteBet[this.props.language],
                    '',
                    [
                        { text: Dictionary.cancel[this.props.language], style: 'cancel' },
                        { text: Dictionary.delete[this.props.language], onPress: _ => this.props.removeMedalBet({ medalId: item.id, type: 'single' }), style: 'destructive' }
                    ]
                )
                break;
            default:
                Alert.alert('Error', Dictionary.noFeature[this.props.language]);
        }
    }

    calculateStrokes = async () => {
        const { item, holeInfo, initHole, medalBetProfits, index, medalBetSummary } = this.props;

        let minF9 = Number.POSITIVE_INFINITY;
        let minB9 = Number.POSITIVE_INFINITY;
        let min18 = Number.POSITIVE_INFINITY;

        const minF9Data = {nicknames: [], strokes: ''};
        const minB9Data = {nicknames: [], strokes: ''};
        const min18Data = {nicknames: [], strokes: ''};

        const medalData = [];
        const advantages = await this.calculateAdvStrokes();
        item.players.forEach(player => {
            const data = { nickname: player.nick_name, handicap: advantages[player.nick_name].handicap };
            const idx = holeInfo.findIndex(item => item.id === player.member_id);
            if (idx >= 0) {
                const holes = ChangeStartingHole(initHole, holeInfo[idx].holes);
                let strokesF9 = 0;
                let strokesB9 = 0;
                holes.front9.forEach(hole => strokesF9 += hole.strokes);
                holes.back9.forEach(hole => strokesB9 += hole.strokes);
                data.strokesF9 = strokesF9;
                data.strokesB9 = strokesB9;
                data.total18 = strokesF9 + strokesB9;
                strokesF9 -= advantages[player.nick_name].totalStrokesf9;
                strokesB9 -= advantages[player.nick_name].totalStrokesb9;
                data.advStrokesF9 = strokesF9;
                data.advStrokesB9 = strokesB9;
                data.advTotal18 = strokesF9 + strokesB9;
                medalData.push(data);

                if (strokesF9 <= minF9) {
                    minF9 = strokesF9;
                }

                if (strokesB9 <= minB9) {
                    minB9 = strokesB9;
                }

                if (strokesF9 + strokesB9 <= min18) {
                    min18 = strokesF9 + strokesB9;
                }
            }
        });

        minF9Data.strokes = minF9;
        minB9Data.strokes = minB9;
        min18Data.strokes = min18;

        for (let idx = 0; idx < medalData.length; idx++) {
            if (medalData[idx].advStrokesF9 === minF9) minF9Data.nicknames.push(medalData[idx].nickname);
            if (medalData[idx].advStrokesB9 === minB9) minB9Data.nicknames.push(medalData[idx].nickname);
            if ((medalData[idx].advStrokesF9 + medalData[idx].advStrokesB9) === min18) min18Data.nicknames.push(medalData[idx].nickname);
        }


        const profits = {};
        item.players.forEach(player => profits[player.nick_name] = 0);
        Object.keys(profits).forEach(player => {
            if (minF9Data.nicknames.indexOf(player) >= 0) profits[player] += (item.wager_f9 * (item.players.length - minF9Data.nicknames.length) / minF9Data.nicknames.length);
            else profits[player] -= item.wager_f9;

            if (minB9Data.nicknames.indexOf(player) >= 0) profits[player] += (item.wager_b9 * (item.players.length - minB9Data.nicknames.length) / minB9Data.nicknames.length);
            else profits[player] -= item.wager_b9;

            if (min18Data.nicknames.indexOf(player) >= 0) profits[player] += (item.wager_18 * (item.players.length - min18Data.nicknames.length) / min18Data.nicknames.length);
            else profits[player] -= item.wager_18;
        });

        if (medalBetProfits) {
            medalBetProfits[index - 1] = profits;
            medalBetSummary(medalBetProfits);
        }

        this.setState({ minF9Data, minB9Data, min18Data });
    }

    calculateAdvStrokes = async () => {
        const { holeInfo: info, hcpAdj } = this.props;

        const advantages = {};
        for (let idx = 0; idx < info.length; idx++) {
            let totalStrokesf9 = 0;
            let totalStrokesb9 = 0;
            const handicap = parseInt(((info[idx].handicap * info[idx].tee.slope / 113) * hcpAdj).toFixed(0));
            const advStrokes = await CalculateAdvMedal(handicap, info[idx].tee.id);
            advStrokes.forEach((element, index) => {
                if (index < 9) {
                    totalStrokesf9 += element;
                } else {
                    totalStrokesb9 += element;
                }
            });
            advantages[info[idx].nick_name] = { totalStrokesf9, totalStrokesb9 };
        }

        return advantages;
    }
}

export default MedalBetListComponent;