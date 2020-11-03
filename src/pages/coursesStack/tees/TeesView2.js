import React, { Component } from 'react';
import { View, Dimensions, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { Dictionary } from '../../../utils/Dictionary';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import TeeComponent from './TeeComponent';
import HeaderButton from '../../global/HeaderButton';
import { actionGetTees, actionSetTees, actionDeleteTee } from '../../../store/actions';
import { NavigationEvents } from 'react-navigation';
import HideItem from '../../global/HideItem';
import Snackbar from 'react-native-snackbar';
import Colors from '../../../utils/Colors';

class TeesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };

    this.getData();

    this.isDeleting = false;
    this.isEditing = false;
    this.hideSnackbar = null;

    this.rowTranslateAnimatedValues = null;

    Dimensions.addEventListener('change', () => {
      this.setState({visible: false});
      let timeout = setTimeout(() => {
        this.setState({visible: true});
        clearTimeout(timeout);
      }, 10);
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { state: { params: { courseId } } } = navigation;
    return {
      title: 'Tees: ' + navigation.getParam('Title'),
      headerRight: (
        <HeaderButton
          iconName="ios-add"
          onPress={() => navigation.navigate('AddTeeView', { courseId: courseId })}
        />
      )
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.tees !== this.props.tees) {
      this.rowTranslateAnimatedValues = {}
      nextProps.tees.map(item => {
        this.rowTranslateAnimatedValues[`${item.id}`] = new Animated.Value(1);
      });
    }
  }

  render() {

    const {
      language,
      tees,
      navigation
    } = this.props;

    const {
      visible
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={this.getData}
        />
        {this.rowTranslateAnimatedValues && visible &&
          <SwipeListView
            data={tees}
            extraData={tees}
            style={{ flex: 1, paddingVertical: 5 }}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TeeComponent
                item={item}
                getData={this.getData.bind(this)}
                title={navigation.getParam('Title')}
                height={this.rowTranslateAnimatedValues[`${item.id}`].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 70],
                })}
                opacity={this.rowTranslateAnimatedValues[`${item.id}`]}
              />
            )}
            ListEmptyComponent={
              <ListEmptyComponent
                text={Dictionary.emptyTeesList[language]}
                iconName="filter"
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
            stopLeftSwipe={Dimensions.get('screen').width * .5}
            stopRightSwipe={-(Dimensions.get('screen').width * .5)}
            onSwipeValueChange={this.onSwipeValueChange}
          />}
      </View>
    );
  }

  getData = () => {
    const { navigation: { state: { params: { courseId } } } } = this.props;
    if (courseId) {
      this.props.resetTees();
      this.props.getTees(courseId);
    }
  }

  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value > Dimensions.get('screen').width * .5 - 50 && !this.isEditing) {
      this.editTee(key);
    }

    if (value < -(Dimensions.get('screen').width * .5 - 1) && !this.isDeleting) {
      clearInterval(this.hideSnackbar);
      this.deleteTee(key);
    }
  }

  editTee = (key) => {
    this.isEditing = true;
    const { tees } = this.props;
    const index = tees.findIndex(item => item.id == key);
    this.props.navigation.navigate('AddTeeView', {tee: tees[index]});
    this.isEditing = false;
  }

  deleteTee = (key) => {
    this.isDeleting = true;
    Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
      let tees = this.props.tees;
      const index = tees.findIndex(item => item.id == key);
      this.hideSnackbar = setTimeout(() => {
        Snackbar.dismiss();
        tees.splice(index, 1);
        this.props.updateTees(tees);
        this.props.deleteTee(key);
        this.getData();
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
  tees: state.reducerTees,
});

const mapDispatchToProps = dispatch => ({
  getTees: (value) => {
    dispatch(actionGetTees(value));
  },
  updateTees: (values) => {
    dispatch(actionSetTees(values));
  },
  resetTees: () => {
    dispatch(actionSetTees([]));
  },
  deleteTee: (value) => {
    dispatch(actionDeleteTee(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeesView);
