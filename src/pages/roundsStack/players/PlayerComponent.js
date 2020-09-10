import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Modal,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../utils/Colors';
import { actionDeleteRoundPlayer, actionSaveRoundPlayer } from '../../../store/actions';
import TeeComponent from './TeeComponent';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import { Dictionary } from '../../../utils/Dictionary';
import { showMessage } from 'react-native-flash-message';
import Database from '../../../database/database';
import moment from 'moment';

const database = new Database();

const BlankProfile = require('../../../../assets/globals/blank-profile.png');

class PlayerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            teesModal: false,
        }
    }

    render() {

        const {
            selected,
            teesModal
        } = this.state;

        const {
            item,
            tees,
            language
        } = this.props;

        const {
            selectTee
        } = Dictionary;

        return (
            <Ripple
                style={[styles.playerView, {
                    backgroundColor: !selected ? Colors.Gray : Colors.White,
                    opacity: !selected ? 0.3 : 1
                }]}
                rippleColor={Colors.Secondary}
                onPress={_ => this.onPressPlayer('onPress')}
                onLongPress={_ => this.onPressPlayer('onLongPress')}
            >
                <View style={styles.imageView}>
                    <Image
                        source={item.photo ? { uri: item.photo } : BlankProfile}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 50
                        }}
                        resizeMode="cover"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>{item.name} </Text>
                        <Text style={styles.lastnameText}> {item.last_name}</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.shortName}>{item.nick_name}</Text>
                        <View style={styles.handicapView}>
                            <Text style={styles.handicapText}>Handicap Index:</Text>
                            <View style={{ width: 10 }} />
                            <Text style={styles.handicapNumber}>{item.handicap}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.arrowView}>
                    {selected && <Ionicon name="ios-checkmark-circle-outline" size={25} color={Colors.Secondary} />}
                </View>
                <Modal
                    animated
                    animationType='fade'
                    visible={teesModal}
                    transparent
                >
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.closeModalView}>
                                <Text style={styles.modalTitle}>{`${selectTee[language]} ${item.name}`}</Text>
                            </View>
                            <FlatList
                                data={tees}
                                extraData={tees}
                                style={{ flex: 1, paddingVertical: 5 }}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TeeComponent
                                        player={this.props.item}
                                        item={item}
                                        hideModal={() => this.setState({ teesModal: false })}
                                    />
                                )}
                                ListEmptyComponent={
                                    <ListEmptyComponent
                                        text={Dictionary.emptyTeesList[language]}
                                        iconName="filter"
                                    />
                                }
                            />
                        </View>
                    </View>
                </Modal>
            </Ripple>
        )
    }

    onPressPlayer = async (pressType) => {
        const { tees } = this.props;
        const { selected } = this.state;
        let holesOk = true;
        if (tees.length > 0) {
            if (selected) {
                this.setState({ selected: !selected });
                this.props.deletePlayer({ params: 2, playerId: this.props.item.id, roundId: this.props.roundId });
            } else {
                for (let i = 0; i < tees.length; i++) {
                    const holes = await database.holesByTeeId(tees[i].id);
                    if (holes.length > 0) {
                        for (let j = 0; j < holes.length; j++) {
                            if (!holes[j].adv || !holes[j].par) {
                                holesOk = false;
                                i = tees.length;
                                break;
                            }
                        }
                    } else {
                        holesOk = false;
                        break;
                    }
                }

                if (holesOk) {
                    if (pressType === 'onPress') this.savePlayer();
                    else this.setState({ teesModal: !selected });
                    this.setState({ selected: !selected });
                } else {
                    showMessage({
                        message: Dictionary.incompleteHoles[this.props.language],
                        type: 'warning',
                        icon: 'warning'
                    });
                }
            }
        } else {
            showMessage({
                message: Dictionary.emptyTeesList[this.props.language],
                type: 'warning',
                icon: 'warning'
            });
        }
    }

    loadPlayerSettings = async (id) => {
        const advantageSettings = await database.advantageSettingsByPlayerId(id);
        if (advantageSettings) return advantageSettings;

        return null;
    }

    savePlayer = async () => {
        const { selected } = this.state;
        const { players, item, tees, roundId } = this.props;

        const advantageSettings = await this.loadPlayerSettings(item.id);

        if (players.length) {
            let playerIdx = players.findIndex(item => item.player_id == 1);
            if (playerIdx < 0) playerIdx = 0;
            const teeIdx = tees.findIndex(item => item.id == players[playerIdx].tee.id);
            if (teeIdx >= 0) {
                const difTee = teeIdx - item.tee;
                let player = {
                    player_id: item.id,
                    nick_name: item.nick_name,
                    photo: item.photo,
                    tee_id: '',
                    handicap: item.handicap,
                    round_id: roundId,
                    adv_mov_if_only_9_holes: advantageSettings.adv_mov_if_only_9_holes,
                    advantage_move: advantageSettings.advantage_move,
                    does_the_carry_move: advantageSettings.does_the_carry_move,
                    strokes_moved_per_round: advantageSettings.strokes_moved_per_round,
                    id_sync: '',
                    ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
                }
                if (difTee >= 0 && difTee <= tees.length - 1) {
                    player.tee_id = tees[difTee].id;
                } else {
                    if (difTee < 0) player.tee_id = tees[0].id;
                    if (difTee > tees.length - 1) player.tee_id = tees[tees.length - 1].id;
                }
                this.props.savePlayer(player);
            } else {
                this.setState({ teesModal: !selected });
            }
        } else {
            this.setState({ teesModal: !selected });
        }
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    userData: state.reducerUserData,
    tees: state.reducerTees,
    course: state.reducerRoundCourse,
    roundId: state.reducerRoundId,
    players: state.reducerRoundPlayers,
});

const mapDispatchToProps = dispatch => ({
    deletePlayer: (value) => {
        dispatch(actionDeleteRoundPlayer(value));
    },
    getTeeData: (value) => {
        dispatch()
    },
    savePlayer: (values) => {
        dispatch(actionSaveRoundPlayer(values));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
