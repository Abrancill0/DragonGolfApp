import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Animated,
  FlatList
} from 'react-native';
import store from '../../../store/store';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { Dictionary } from '../../../utils/Dictionary';
import PlayerComponent from './PlayerComponent';
import { actionGetPlayers } from '../../../store/actions';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import HeaderButton from '../../global/HeaderButton';
import Colors from '../../../utils/Colors';

class AddPlayersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
    
    props.getPlayers();
  }

  static navigationOptions = ({ navigation }) => {
    const state = store.getState();
    const language = state.reducerLanguage;
    return {
      title: navigation.getParam('Title', Dictionary.players[language]),
      headerRight: (
        <HeaderButton
          iconName="ios-save"
          color={Colors.Primary}
          onPress={() => navigation.goBack()}
        />
      )
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.players !== this.props.players){
      let players = [];
      const roundPlayers = this.props.navigation.getParam('players', []);
      nextProps.players.forEach(element => {
        const index = roundPlayers.findIndex(item => item.player_id == element.id);
        if(index < 0){
          players.push(element);
        }
      });
      this.setState({players: players});
    }
  }

  render() {

    const {
      language,
    } = this.props;

    const {players} = this.state;

    const roundPlayers = this.props.navigation.getParam('players', []);

    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={this.changeTitleText}
        />
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />
        <FlatList
          data={players}
          extraData={players}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1, paddingVertical: 5 }}
          renderItem={({ item }) => (
            <PlayerComponent
              item={item}
            />
          )}
          ListEmptyComponent={
            <ListEmptyComponent
              text={roundPlayers.length > 0 ? Dictionary.allPlayers[language] : Dictionary.emptyPlayerList[language]}
              iconName="user-friends"
              iconFamily='font-awesome'
            />
          }
        />
      </View>
    );
  }

  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: Dictionary.players[this.props.language]
    });
  }
}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  userData: state.reducerUserData,
  players: state.reducerPlayers
});

const mapDispatchToProps = dispatch => ({
  getPlayers: () => {
    dispatch(actionGetPlayers());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayersView);
