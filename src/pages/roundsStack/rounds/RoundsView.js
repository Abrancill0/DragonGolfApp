import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
  NativeModules
} from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import { NavigationEvents } from 'react-navigation';
import HeaderButton from '../../global/HeaderButton';
import RoundComponent from './RoundComponent';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import { SwipeListView } from 'react-native-swipe-list-view';
import HideItem from '../../global/HideItem';
import Snackbar from 'react-native-snackbar';
import Colors from '../../../utils/Colors';

class RoundsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };

    //props.setForceInset('always');

    //props.getRounds();
    this.isDeleting = false;
    this.isEditing = false;
    this.hideSnackbar = null;

    this.rowTranslateAnimatedValues = null;

    Dimensions.addEventListener('change', () => {
      this.setState({ visible: false });
      let timeout = setTimeout(() => {
        this.setState({ visible: true });
        clearTimeout(timeout);
      }, 50);
    });

  }

  static navigationOptions = ({ navigation }) => {
    const language = 'es';
    return {
      title: navigation.getParam('Title', Dictionary.rounds[language]),
      headerRight: (
        <HeaderButton
          iconName="ios-add"
          onPress={() => navigation.navigate('CoursesView')}
        />
      )
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.rounds !== this.props.rounds) {
      this.rowTranslateAnimatedValues = {}
      nextProps.rounds.map(item => {
        this.rowTranslateAnimatedValues[`${item.id}`] = new Animated.Value(1);
      });
    }
  }

  render() {

    const {
      visible
    } = this.state;

    const {
      rounds,
      language,
      courses,
      setRound,
      setCourse,
      getRounds,
      setLoadingRound
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />
        {this.rowTranslateAnimatedValues && visible &&
          <SwipeListView
            data={rounds}
            extraData={rounds}
            keyExtractor={item => item.id.toString()}
            style={{ flex: 1, paddingVertical: 5 }}
            renderItem={({ item }) => (
              <RoundComponent
                item={item}
                courses={courses}
                language={language}
                setRound={setRound}
                setCourse={setCourse}
                height={this.rowTranslateAnimatedValues[`${item.id}`].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 70],
                })}
                opacity={this.rowTranslateAnimatedValues[`${item.id}`]}
                setLoadingRound={setLoadingRound}
              />
            )}
            ListEmptyComponent={
              <ListEmptyComponent
                text={Dictionary.emptyRoundList[language]}
                iconName="golf-ball"
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
            )}
            disableRightSwipe
            stopRightSwipe={-(Dimensions.get('window').width * .5)}
            onSwipeValueChange={this.onSwipeValueChange}
          />}
      </View>
    );
  }

  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: Dictionary.rounds[this.props.language]
    });
  }

  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;

    if (value < -(Dimensions.get('window').width * .5 - 1) && !this.isDeleting) {
      clearInterval(this.hideSnackbar);
      this.deleteCourse(key);
    }
  }

  deleteCourse = (key) => {
    this.isDeleting = true;
    Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
      const { rounds } = this.props;
      const index = rounds.findIndex(item => item.id == key);
      this.hideSnackbar = setTimeout(() => {
        Snackbar.dismiss();
        rounds.splice(index, 1);
        this.props.updateRounds(rounds);
        this.props.deleteRound(key);
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
  rounds: state.reducerRounds,
  courses: state.reducerCourses
});

export default RoundsView;
