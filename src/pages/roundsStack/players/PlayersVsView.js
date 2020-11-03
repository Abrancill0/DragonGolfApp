import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PlayerVsComponent from './PlayerVsComponent';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import { Dictionary } from '../../../utils/Dictionary';
import { actionGetStrokes, actionSetStrokes } from '../../../store/actions';

class PlayersVsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.player = props.navigation.getParam('item');
        if (this.player) {
            props.navigation.setParams({ Title: this.player.player.nick_name });
        } else {
            props.navigation.goBack();
        }

        this.players = [];
        props.players.forEach(item => this.players.push(item));
        const index = this.players.findIndex(item => item.id === this.player.id);
        this.players.splice(index, 1);

        props.getStrokes(this.player.id);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('Title'),
        }
    };

    componentWillUnmount(){
        this.props.resetStrokes();
    }

    render() {

        const {
            hcpAdj,
            language
        } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.players}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <PlayerVsComponent
                            player={this.player}
                            item={item}
                            hcpAdj={hcpAdj}
                        />
                    }
                    ListEmptyComponent={
                        <ListEmptyComponent
                            text={Dictionary.emptyRoundPlayerVs[language]}
                            iconName="user-friends"
                            iconFamily='font-awesome'
                        />
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    players: state.reducerRoundPlayers,
    hcpAdj: state.reducerHcpAdj,
});

const mapDispatchToProps = dispatch => ({
    getStrokes: (value) => {
        dispatch(actionGetStrokes(value));
    },
    resetStrokes: () => {
        dispatch(actionSetStrokes([]));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersVsView);
