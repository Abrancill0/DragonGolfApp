import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Animated
} from 'react-native';
import store from '../../../store/store';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { Dictionary } from '../../../utils/Dictionary';
import HeaderButton from '../../global/HeaderButton';
import PlayerComponent from './PlayerComponent';
import { actionGetPlayers, actionSetPlayers, actionDeletePlayer } from '../../../store/actions';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import { SwipeListView } from 'react-native-swipe-list-view';
import HideItem from '../../global/HideItem';
import { showMessage } from 'react-native-flash-message';
import Snackbar from 'react-native-snackbar';
import Colors from '../../../utils/Colors';

class PlayersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };

    props.getPlayers();

    this.isDeleting = false;
    this.isEditing = false;

    this.hideSnackbar = null;

    this.rowTranslateAnimatedValues = null;

    Dimensions.addEventListener('change', () => {
      this.setState({visible: false});
      let timeout = setTimeout(() => {
        this.setState({visible: true});
        clearTimeout(timeout);
      }, 50);
    })
  }

  static navigationOptions = ({ navigation }) => {
    const state = store.getState();
    const language = state.reducerLanguage;
    return {
      title: navigation.getParam('Title', Dictionary.players[language]),
      headerRight: (
        <HeaderButton
          iconName="ios-add"
          onPress={() => navigation.navigate('AddPlayerView')}
        />
      )
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.players !== this.props.players) {
      this.rowTranslateAnimatedValues = {}
      nextProps.players.map(item => {
        this.rowTranslateAnimatedValues[`${item.id}`] = new Animated.Value(1);
      });
    }
  }

  render() {

    const {
      visible
    } = this.state;

    const {
      language,
      players
    } = this.props;

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
        {this.rowTranslateAnimatedValues && visible && <SwipeListView
          data={players}
          extraData={players}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1, paddingVertical: 5 }}
          renderItem={({ item }) => (
            <PlayerComponent
              item={item}
              height={this.rowTranslateAnimatedValues[`${item.id}`].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 70],
              })}
              opacity={this.rowTranslateAnimatedValues[`${item.id}`]}
            />
          )}
          ListEmptyComponent={
            <ListEmptyComponent
              text={Dictionary.emptyPlayerList[language]}
              iconName="user-friends"
              iconFamily='font-awesome'
            />
          }
          renderHiddenItem={({ item }) => (
            <HideItem
              item={item}
              height={this.rowTranslateAnimatedValues[`${item.id}`].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 70],
              })}
              opacity={this.rowTranslateAnimatedValues[`${item.id}`]}
            />
          )
          }
          stopLeftSwipe={Dimensions.get('window').width * .5}
          stopRightSwipe={-(Dimensions.get('window').width * .5)}
          onSwipeValueChange={this.onSwipeValueChange}
        />}
      </View>
    );
  }

  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: Dictionary.players[this.props.language]
    });
  }

  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value > Dimensions.get('window').width * .5 - 50 && !this.isEditing) {
      this.editPlayer(key);
    }

    if (value < -(Dimensions.get('window').width * .5 - 1) && !this.isDeleting) {
      clearInterval(this.hideSnackbar);
      this.deletePlayer(key);
    }
  }

  editPlayer = (key) => {
    this.isEditing = true;
    const { players } = this.props;
    const index = players.findIndex(item => item.id == key);
    this.props.navigation.navigate('EditPlayerView', { item: players[index] });
    this.isEditing = false;
  }

  deletePlayer = (key) => {
    if (key != 1) {
      this.isDeleting = true;
      Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
        const { players } = this.props;
        const index = players.findIndex(item => item.id == key);
        this.hideSnackbar = setTimeout(() => {
          Snackbar.dismiss();
          players.splice(index, 1);
          this.props.deletePlayer(key);
          this.props.getPlayers();
          this.isDeleting = false;
          console.log('terminó');
        }, 5000);
        Snackbar.show({
          text: `1 ${Dictionary.removed[this.props.language]}`,
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            text: Dictionary.undo[this.props.language],
            textColor: Colors.Secondary,
            onPress: () => {
              Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 1, duration: 200 }).start();
              this.isDeleting = false;
              clearTimeout(this.hideSnackbar);
            },
          },
        });
      });
    }else{
      showMessage({
        message: Dictionary.cannotDelete[this.props.language],
        type: 'warning',
        icon: 'warning'
      });
    }

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
  },
  updatePlayers: (values) => {
    dispatch(actionSetPlayers(values));
  },
  deletePlayer: (value) => {
    dispatch(actionDeletePlayer(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersView);
