import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ListEmptyComponent from '../../../global/ListEmptyComponent';
import { Dictionary } from '../../../../utils/Dictionary';
import PlayerComponent from './PlayerComponent';
import Colors from '../../../../utils/Colors';
import HeaderButton from '../../../global/HeaderButton';

class PlayersView extends Component {
    constructor(props) {
        super(props);

        const selectedPlayers = [];
        const {players} = this.props;
        const playersSelected = props.navigation.getParam('selectedPlayers');
        players.forEach(item => {
            const idx = playersSelected.findIndex(player => player.id === item.id);
            selectedPlayers.push(idx >= 0);
            
        });

        this.state = {
            selectedPlayers
        };
    }

    static navigationOptions = ({ navigation }) => {

        return {
            title: 'Medal Players',
            headerRight: (
                <HeaderButton
                    iconName="ios-save"
                    color={Colors.Primary}
                    onPress={() => navigation.goBack()}
                />
            )
        }
    };

    componentWillUnmount(){
        const setSelectedPlayers = this.props.navigation.getParam('setSelectedPlayers');
        const selectedPlayers = [];
        this.props.players.forEach((item, index) => {
            if(this.state.selectedPlayers[index]) selectedPlayers.push(item);
        });

        setSelectedPlayers(selectedPlayers);
    }

    render() {

        const {
            players,
            language
        } = this.props;

        const {selectedPlayers} = this.state;

        return (
            <FlatList
                data={players}
                extraData={players}
                keyExtractor={(item) => item.id.toString()}
                style={{ flex: 1, paddingVertical: 5 }}
                renderItem={({ item, index }) => (
                    <PlayerComponent
                        item={item}
                        index={index}
                        selected={selectedPlayers[index]}
                        selectPlayer={this.selectPlayer}
                    />
                )}
                ListEmptyComponent={
                    <ListEmptyComponent
                        text={Dictionary.emptyPlayerList[language]}
                        iconName="user-friends"
                        iconFamily='font-awesome'
                    />
                }
            />
        );
    }

    selectPlayer = (select, idx) => {
        const {selectedPlayers} = this.state;
        selectedPlayers[idx] = select;

        this.setState({selectedPlayers});
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    players: state.reducerRoundPlayers,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersView);