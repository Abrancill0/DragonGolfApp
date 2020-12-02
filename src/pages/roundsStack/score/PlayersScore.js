import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import { Dictionary } from '../../../utils/Dictionary';
import PlayerScoreComponent from './PlayerScoreComponent';
import styles from './styles';
import HoleHeader from './HoleHeader';

class PlayersScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {
      language,
      item: hole,
      players
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={<HoleHeader hole={hole} />}
          data={players}
          extraData={players}
          keyExtractor={item => item.id.toString()}
          style={{ flex: 1, paddingVertical: 5 }}
          renderItem={({ item, index }) => (
            <PlayerScoreComponent item={item} hole={hole} index={index} />
          )}
          ListEmptyComponent={
            <ListEmptyComponent
              text={Dictionary.emptyRoundPlayerList[language]}
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
  players: state.reducerRoundPlayers
});

const mapDispatchToProps = dispatch => ({
});

export default PlayersScore;
