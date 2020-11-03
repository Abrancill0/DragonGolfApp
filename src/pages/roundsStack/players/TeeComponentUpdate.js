/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import Colors from '../../../utils/Colors';
import Database from '../../../database/database';
import { actionUpdatePlayerTee } from '../../../store/actions';
const database = new Database();

class TeeComponentUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yards: 0,
            par: 0,
            height: 70
        };
    }

    componentDidMount() {
        this.loadData();
    }

    render() {

        const { item } = this.props;
        const {
            yards,
            par
        } = this.state;

        return (
            <Ripple
                style={styles.teeView}
                rippleColor={Colors.Secondary}
                onPress={this.updatePlayerTee}
            >
                <View style={styles.teeNameView}>
                    <Text
                        style={styles.teeNameText}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >{item.name}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunity name="filter" size={23} color={Colors.Black} />
                        <View style={{ position: 'absolute' }}>
                            <MaterialCommunity name="filter" size={20} color={item.color} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={[styles.infoTeeView, { marginLeft: 25 }]}>
                            <Text style={styles.infoText}>Slope:</Text>
                            <Text style={styles.infoText}>Rating:</Text>
                            <Text style={styles.infoText}>Yards:</Text>
                        </View>
                        <View style={styles.infoTeeView}>
                            <Text style={styles.valueText}>{item.slope}</Text>
                            <Text style={styles.valueText}>{item.rating}</Text>
                            <Text style={styles.valueText}>{this.formatNumber(yards)}</Text>
                        </View>
                    </View>
                    <View style={styles.infoParView}>
                        <Text style={styles.infoParText}>{par}</Text>
                    </View>
                </View>
            </Ripple>
        );
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    loadData = async () => {
        const { item } = this.props;
        let yards = 0;
        const holes = await database.holesByTeeId(item.id);
        let par = 0;
        for (let index = 0; index < holes.length; index++) {
            if (holes[index].par) {
                par += holes[index].par;
            }
            if (holes[index].yards) {
                yards += holes[index].yards;
            }
        }

        this.setState({ yards, par });
    }

    updatePlayerTee = () => {
        this.props.updatePlayerTee({
            player_id: this.props.playerId,
            tee_id: this.props.item.id,
            round_id: this.props.roundId
        });
        this.props.hideModal();
    }
}

const mapStateToProps = state => ({
    roundId: state.reducerRoundId,
});

const mapDispatchToProps = dispatch => ({
    updatePlayerTee: (value) => {
        dispatch(actionUpdatePlayerTee(value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeeComponentUpdate);
