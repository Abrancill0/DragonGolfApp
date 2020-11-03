import React, { Component } from 'react';
import { View, Text, TextInput, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Colors from '../../../utils/Colors';
import { actionSaveStrokes, actionSaveStrokesValidation } from '../../../store/actions';
import * as Validations from '../../../utils/Validations';
import moment from 'moment';

class PlayerVsComponent extends Component {
    constructor(props) {
        super(props);

        const { item, hcpAdj, player, playersWithStrokes, saveStrokesValidation } = props;

        let strokes = '';
        const playerIdx = playersWithStrokes.findIndex(element => element.id === item.player_id);

        if (item.player_id === 1) {
            const playerSettingIdx = playersWithStrokes.findIndex(element => element.id === player.player_id);
            strokes = (playersWithStrokes[playerSettingIdx].strokes * -1).toString();

        } else if (playerIdx >= 0 && item.player_id !== 1 && player.player_id === 1) {
            strokes = playersWithStrokes[playerIdx].strokes.toString();
        } else {
            const ownStrokes = ((player.handicap * player.tee.slope / 113) * hcpAdj).toFixed(0);
            const playerStrokes = ((item.handicap * item.tee.slope / 113) * hcpAdj).toFixed(0);
            strokes = parseInt(ownStrokes - playerStrokes).toFixed(1);
        }

        const strokesDataA = {
            member_a_id: player.id,
            member_b_id: item.id,
            adv_strokes: parseFloat(strokes),
            id_sync: '',
            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
        };

        const strokesDataB = {
            member_a_id: item.id,
            member_b_id: player.id,
            adv_strokes: parseFloat(-strokes),
            id_sync: '',
            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
        };

        saveStrokesValidation(strokesDataA);
        saveStrokesValidation(strokesDataB);

        this.state = {
            strokes
        };

        this.setedStrokes = false;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.strokes !== this.props.strokes) {
            if (!this.setedStrokes) {
                const index = nextProps.strokes.findIndex(item => item.member_b_id === this.props.item.id);
                if (index >= 0) {
                    this.setState({ strokes: nextProps.strokes[index].adv_strokes.toFixed(1) });
                    this.setedStrokes = true;
                }
            }
        }
    }

    render() {

        const { item } = this.props;
        const { strokes } = this.state;

        return (
            <View style={styles.playerView} >
                <View style={styles.teeNameView}>
                    <Text
                        style={styles.teeNameText}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >{item.tee.name}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunity name="filter" size={23} color={Colors.Black} />
                        <View style={{ position: 'absolute' }}>
                            <MaterialCommunity name="filter" size={20} color={item.tee.color} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={[styles.roundPlayerNameView, { flex: 0 }]}>
                        <Text style={[styles.nameText, { width: 60 }]}>{item.nick_name}</Text>
                    </View>
                    <View style={styles.hcpInfoView}>
                        <TextInput
                            style={styles.input}
                            selectionColor={Colors.Primary}
                            placeholder="0"
                            keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                            returnKeyType='done'
                            maxLength={5}
                            value={strokes}
                            onChangeText={this.onChangeStrokes}
                        />
                        {Platform.OS === 'ios' ?
                            <TouchableOpacity
                                style={styles.operatorButton}
                                onPress={_ => this.onPressOperator('-')}
                                onPressIn={_ => this.startOperator('-')}
                                onPressOut={this.stopOperator}
                            >
                                <Ionicon name='ios-remove' size={22} color='#007AFF' />
                            </TouchableOpacity> :
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple(Colors.Primary, true)}
                                onPress={_ => this.onPressOperator('-')}
                                onPressIn={_ => this.startOperator('-')}
                                onPressOut={this.stopOperator}
                            >
                                <View style={styles.operatorButton}>
                                    <Ionicon name='ios-remove' size={22} color={Colors.Primary} />
                                </View>
                            </TouchableNativeFeedback>
                        }
                        {Platform.OS === 'ios' ?
                            <TouchableOpacity
                                style={styles.operatorButton}
                                onPress={_ => this.onPressOperator('+')}
                                onPressIn={_ => this.startOperator('+')}
                                onPressOut={this.stopOperator}
                            >
                                <Ionicon name='ios-add' size={22} color={Colors.Primary} />
                            </TouchableOpacity> :
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple(Colors.Primary, true)}
                                onPress={_ => this.onPressOperator('+')}
                                onPressIn={_ => this.startOperator('+')}
                                onPressOut={this.stopOperator}
                            >
                                <View style={styles.operatorButton}>
                                    <Ionicon name='ios-add' size={22} color={Colors.Primary} />
                                </View>
                            </TouchableNativeFeedback>
                        }
                    </View>
                </View>
            </View>
        );
    }

    onChangeStrokes = (strokes) => {
        this.setState({ strokes });
        const { ok } = Validations.floatNumberValidation(strokes);
        if (ok) this.saveStrokes(strokes);
    }

    onPressOperator = (operator) => {
        let strokes = this.state.strokes;
        if (!strokes) strokes = 0;
        switch (operator) {
            case '+':
                this.setState({ strokes: (parseFloat(strokes) + 0.5).toFixed(1) });
                this.saveStrokes(parseFloat(strokes) + 0.5);
                break;
            case '-':
                this.setState({ strokes: (parseFloat(strokes) - 0.5).toFixed(1) });
                this.saveStrokes(parseFloat(strokes) - 0.5);
                break;
        }
    }

    saveStrokes = (strokes) => {
        const { player, item } = this.props;
        const strokesDataA = {
            member_a_id: player.id,
            member_b_id: item.id,
            adv_strokes: parseFloat(strokes),
            id_sync: '',
            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
        };

        const strokesDataB = {
            member_a_id: item.id,
            member_b_id: player.id,
            adv_strokes: parseFloat(-strokes),
            id_sync: '',
            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
        };

        this.props.saveStrokes(strokesDataA);
        this.props.saveStrokes(strokesDataB);
    }

    startOperator = (operator) => {
        this.operating = setInterval(_ => this.onPressOperator(operator), 200);
    }

    stopOperator = () => {
        clearInterval(this.operating);
    }
}

const mapStateToProps = state => ({
    strokes: state.reducerStrokes,
    playersWithStrokes: state.reducerPlayers,
});

const mapDispatchToProps = dispatch => ({
    saveStrokes: (values) => {
        dispatch(actionSaveStrokes(values));
    },
    saveStrokesValidation: (values) => {
        dispatch(actionSaveStrokesValidation(values));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVsComponent);