import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Animated,
    FlatList,
    Modal,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../utils/Colors';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import * as NavigationService from '../../../routes/NavigationService';
import { Dictionary } from '../../../utils/Dictionary';
import TeeComponent from './TeeComponent';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import TeeComponentUpdate from './TeeComponentUpdate';
import { actionGetRoundPlayers } from '../../../store/actions';

const BlankProfile = require('../../../../assets/globals/blank-profile.png');

class RoundPlayerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 70,
            teesModal: false
        }

        this.props.height.addListener(({ value }) => this.setState({ height: value }));
    }

    render() {

        const { teesModal } = this.state;

        const {
            item,
            height,
            hcpAdj,
            drag,
            move,
            moveEnd,
            dragArrows,
            opacity,
            language,
            tees
        } = this.props;

        const {
            selectTee,
            emptyTeesList
        } = Dictionary;

        return (
            <Animated.View style={{ height, backgroundColor: Colors.White, opacity }}>
                {this.state.height > 10 && <Ripple
                    style={styles.playerView}
                    rippleColor={Colors.Secondary}
                    onPress={_ => {
                        if (!drag) {
                            NavigationService.navigate('PlayersVsView', { item });
                        }
                    }}
                    onPressIn={drag ? move : null}
                    onPressOut={drag ? moveEnd : null}
                    onLongPress={_ => {
                        if (!drag) {
                            this.setState({ teesModal: true });
                        }
                    }}
                >
                    <Animated.View style={[styles.dragView, {
                        width: dragArrows.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 30],
                        }),
                        opacity: dragArrows
                    }]}>
                        <Ionicon name='chevron-up' size={20} color={Colors.Black} />
                        <Ionicon name='chevron-down' size={20} color={Colors.Black} />
                    </Animated.View>
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
                        <View style={{ flex: 2 }}>
                            <View style={styles.roundPlayerNameView}>
                                <View style={styles.roundPlayerImageView}>
                                    <Image
                                        source={item.photo ? { uri: item.photo } : BlankProfile}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 15
                                        }}
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text style={styles.nameText}>{item.nick_name}</Text>
                            </View>
                            <View style={styles.roundPlayerNameView}>
                                <Text style={styles.handicapText}>Handicap Index: {item.handicap}</Text>
                            </View>
                        </View>
                        <View style={styles.hcpInfoView}>
                            <Text style={styles.handicapText}>Strokes: {`\n${((item.handicap * item.tee.slope / 113) * hcpAdj).toFixed(0)}`}</Text>
                        </View>
                    </View>
                </Ripple>}
                <Modal
                    animated
                    animationType='fade'
                    visible={teesModal}
                    transparent
                    onRequestClose={_ => this.setState({ teesModal: false })}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.closeModalView}>
                                <Text style={styles.modalTitle}>{`${selectTee[language]} ${item.nick_name}`}</Text>
                                <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 2.5 }} onPress={_ => this.setState({ teesModal: false })}>
                                    <Ionicon name='ios-close' size={30} color={Colors.Black} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={tees}
                                extraData={tees}
                                style={{ flex: 1, paddingVertical: 5 }}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item: tee }) => (
                                    <TeeComponentUpdate
                                        playerId={item.id}
                                        item={tee}
                                        hideModal={() => this.setState({ teesModal: false })}
                                    />
                                )}
                                ListEmptyComponent={
                                    <ListEmptyComponent
                                        text={emptyTeesList[language]}
                                        iconName="filter"
                                    />
                                }
                            />
                        </View>
                    </View>
                </Modal>
            </Animated.View>
        )
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    tees: state.reducerTees,
});

const mapDispatchToProps = dispatch => ({
    getPlayers: (value) => {
        dispatch(actionGetRoundPlayers(value));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RoundPlayerComponent);