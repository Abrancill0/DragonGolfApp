import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
  Easing
} from 'react-native';
import { connect } from 'react-redux';
import { Dictionary } from '../../../utils/Dictionary';
import HeaderButton from '../../global/HeaderButton';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import { SwipeListView } from 'react-native-swipe-list-view';
import DraggableFlatList from 'react-native-draggable-flatlist';
import HideItem from '../../global/HideItem';
import Snackbar from 'react-native-snackbar';
import Colors from '../../../utils/Colors';
import RoundPlayerComponent from './RoundPlayerComponent';
import moment from 'moment';
import { actionGetRoundPlayers, actionDeleteRoundPlayer, actionSetRoundPlayers, actionUpdatePlayerPosition, actionGetTees } from '../../../store/actions';
import ReorderButton from '../../global/ReorderButton';
import { Header } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';

class PlayersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      drag: false,
      dragArrows: new Animated.Value(0),
    };

    this.isDeleting = false;
    this.isEditing = false;

    this.hideSnackbar = null;

    this.rowTranslateAnimatedValues = null;

    Dimensions.addEventListener('change', () => {
      this.setState({ visible: false });
      let timeout = setTimeout(() => {
        this.setState({ visible: true });
        clearTimeout(timeout);
      }, 10);
    });

    const { language } = props;
    let numMonth = '';
    let day = '';
    let title = '';
    if (props.round) {
      title = props.round.name;
    } else {
      numMonth = moment().format('M');
      day = moment().format('DD');

      let month = '';
      switch (numMonth) {
        case '1':
          month = Dictionary.january[language];
          break;
        case '4':
          month = Dictionary.april[language];
          break;
        case '8':
          month = Dictionary.august[language];
          break;
        case '12':
          month = Dictionary.december[language];
          break;
        default:
          month = moment().format('MMM');
          break;
      }

      title = props.course.short_name + ` ${month} ${day}`;
    }

    props.navigation.setParams({
      Title: title,
    });

    props.getPlayers(props.roundId);
    props.getTees(props.course.id);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ drag: this.state.drag, changeDragState: this.changeDragState });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.players !== this.props.players) {
      this.props.navigation.setParams({ players: nextProps.players });
      this.rowTranslateAnimatedValues = {}
      nextProps.players.map(item => {
        this.rowTranslateAnimatedValues[`${item.id}`] = new Animated.Value(1);
      });
    }
  }

  render() {

    const {
      visible,
      drag,
      dragArrows
    } = this.state;

    const {
      language,
      players,
      hcpAdj,
      navigation
    } = this.props;

    this.rowTranslateAnimatedValues = {}
    players.map(item => {
      this.rowTranslateAnimatedValues[`${item.id}`] = new Animated.Value(1);
    });

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />
        <Header
          containerStyle={{ backgroundColor: 'white', height: Platform.OS === 'ios' ? 45 : 56, borderBottomWidth: Platform.OS === 'ios' ? 2 : 0, paddingTop: 0, elevation: 4 }}
          centerContainerStyle={{ height: Platform.OS === 'ios' ? 45 : 55, justifyContent: 'center', }}
          leftComponent={players.length > 1 && <ReorderButton
            iconName={drag ? 'playlist-check' : 'playlist-edit'}
            onPress={_ => this.changeDragState(!drag)}
          />}
          centerComponent={{ text: navigation.getParam('Title'), style: { fontSize: 20, fontWeight: 'bold' } }}
          rightComponent={<HeaderButton
            iconName="ios-add"
            onPress={() => navigation.navigate('AddPlayersView', { players: navigation.getParam('players', []) })}
          />}
        />
        {this.rowTranslateAnimatedValues && visible && !drag && <SwipeListView
          data={players}
          extraData={players}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1, paddingVertical: 5 }}
          renderItem={({ item }) => (
            <RoundPlayerComponent
              item={item}
              hcpAdj={hcpAdj}
              height={this.rowTranslateAnimatedValues[`${item.id}`].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 70],
              })}
              opacity={this.rowTranslateAnimatedValues[`${item.id}`]}
              drag={drag}
              changeDragState={this.changeDragState}
              dragArrows={dragArrows}
            />
          )}
          ListEmptyComponent={
            <ListEmptyComponent
              text={Dictionary.emptyRoundPlayerList[language]}
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
          disableRightSwipe
          stopRightSwipe={-(Dimensions.get('window').width * .5)}
          onSwipeValueChange={this.onSwipeValueChange}
        />}
        {
          this.rowTranslateAnimatedValues && visible && drag && <DraggableFlatList
            data={players}
            extraData={players}
            keyExtractor={(item) => item.id.toString()}
            style={{ flex: 1, paddingVertical: 5 }}
            renderItem={({ item, move, moveEnd }) => (
              <RoundPlayerComponent
                item={item}
                hcpAdj={hcpAdj}
                height={this.rowTranslateAnimatedValues[`${item.id}`].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 70],
                })}
                opacity={this.rowTranslateAnimatedValues[`${item.id}`]}
                drag={drag}
                move={move}
                moveEnd={moveEnd}
                changeDragState={this.changeDragState}
                dragArrows={dragArrows}
              />
            )}
            ListEmptyComponent={
              <ListEmptyComponent
                text={Dictionary.emptyRoundPlayerList[language]}
                iconName="user-friends"
                iconFamily='font-awesome'
              />
            }
            onMoveEnd={({ data: players }) => {
              this.props.updatePlayers(players);
              this.props.updatePlayerPosition({ players, roundId: this.props.roundId });
            }}
          />
        }
      </View>
    );
  }

  changeDragState = (drag) => {
    this.setState({ drag });
    Animated.timing(this.state.dragArrows, {
      toValue: drag ? 1 : 0,
      duration: 250
    }).start();
  }

  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: Dictionary.players[this.props.language]
    });
  }

  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;

    if (value < -(Dimensions.get('window').width * .5 - 1) && !this.isDeleting) {
      const snIndex = this.props.snBet.findIndex(item => item.member_a_id == key || item.member_b_id == key);
      const tnIndex = this.props.tnBet.findIndex(item => item.member_a_id == key || item.member_b_id == key || item.member_c_id == key || item.member_d_id == key);
      if (snIndex < 0 && tnIndex < 0) {
        clearInterval(this.hideSnackbar);
        this.deletePlayer(key);
      } else {
        showMessage({
          message: Dictionary.cannotDeleteWithBet[this.props.language],
          description: Dictionary.firstDelete[this.props.language],
          type: 'warning',
          icon: 'warning'
        });
      }
    }
  }

  deletePlayer = (key) => {
    this.isDeleting = true;
    Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
      let { players } = this.props;
      const index = players.findIndex(item => item.id == key);
      this.hideSnackbar = setTimeout(() => {
        Snackbar.dismiss();
        players.splice(index, 1);
        this.props.updatePlayerPosition({ players, roundId: this.props.roundId });
        this.props.updatePlayers(players);
        this.props.deletePlayer({ params: 1, memberId: key, roundId: this.props.roundId });
        this.isDeleting = false;
        console.log('terminó')
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

  }
}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  userData: state.reducerUserData,
  course: state.reducerRoundCourse,
  round: state.reducerRound,
  roundId: state.reducerRoundId,
  players: state.reducerRoundPlayers,
  hcpAdj: state.reducerHcpAdj,
  snBet: state.reducerSNBet,
  tnBet: state.reducerTNBet
});

const mapDispatchToProps = dispatch => ({
  getPlayers: (value) => {
    dispatch(actionGetRoundPlayers(value));
  },
  deletePlayer: (value) => {
    dispatch(actionDeleteRoundPlayer(value));
  },
  updatePlayers: (values) => {
    dispatch(actionSetRoundPlayers(values));
  },
  updatePlayerPosition: (values) => {
    dispatch(actionUpdatePlayerPosition(values));
  },
  getTees: (value) => {
    dispatch(actionGetTees(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersView);
