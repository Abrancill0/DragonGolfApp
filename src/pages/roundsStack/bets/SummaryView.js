import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store/store';
import { Dictionary } from '../../../utils/Dictionary';
import { NavigationEvents, FlatList } from 'react-navigation';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import SummaryComponent from './SummaryComponent';

class SummaryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerProfit: null,
        };
    }

    static navigationOptions = ({ navigation }) => {
        const state = store.getState();
        const language = state.reducerLanguage;
        return {
            title: navigation.getParam('Title', Dictionary.betSummary[language]),
        }
    };

    componentDidMount() {
        this.calculateProfits();
    }

    render() {

        const { playerProfit } = this.state;
        const { language, players } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents
                    onWillFocus={_ => {
                        this.changeTitleText();
                        this.calculateProfits();
                    }}
                />
                <FlatList
                    style={{ flex: 1, paddingVertical: 5 }}
                    data={players}
                    extraData={players}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <SummaryComponent item={item} index={index} playerProfit={playerProfit} />
                    )}
                    ListEmptyComponent={
                        <ListEmptyComponent
                            text={Dictionary.emptyBets[language]}
                            iconName="coin"
                        />
                    }
                />
            </View>
        );
    }

    changeTitleText = () => {
        this.props.navigation.setParams({
            Title: Dictionary.betSummary[this.props.language]
        });
    }

    calculateProfits = () => {
        let playerProfit = [];
        this.props.players.forEach(item => {
            let snProfit = 0;
            this.props.snBetSummary.forEach(bet => {
                if (bet.member_a === item.nick_name) snProfit += bet.profit;
                if (bet.member_b === item.nick_name) snProfit -= bet.profit;
            });
            let tnProfit = 0;
            this.props.tnBetSummary.forEach(bet => {
                if (bet.member_a === item.nick_name) tnProfit += bet.profit;
                if (bet.member_b === item.nick_name) tnProfit += bet.profit;
                if (bet.member_c === item.nick_name) tnProfit -= bet.profit;
                if (bet.member_d === item.nick_name) tnProfit -= bet.profit;
            });
            let medalProfit = 0;
            this.props.medalBetSummary.forEach(bet => {
                Object.keys(bet).forEach(player => {
                    if(player === item.nick_name) medalProfit += bet[player];
                });
            });
            playerProfit.push({ snBet: snProfit, tnBet: tnProfit, medal: medalProfit });
        });

        this.setState({ playerProfit });
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    snBetSummary: state.reducerSNBetSummary,
    players: state.reducerRoundPlayers,
    tnBetSummary: state.reducerTNBetSummary,
    medalBetSummary: state.reducerMedalBetSummary
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryView);
