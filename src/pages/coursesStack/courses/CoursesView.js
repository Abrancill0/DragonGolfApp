import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Animated,
  Dimensions,
  Alert
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Dictionary } from '../../../utils/Dictionary';
import HeaderButton from '../../global/HeaderButton';
//import CourseComponent from './CourseComponent';
import { NavigationEvents } from 'react-navigation';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import HideItem from '../../global/HideItem';
import Snackbar from 'react-native-snackbar';
import Colors from '../../../utils/Colors';

class RoundsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      language: 'es'
    };

    //props.getCourses();
    this.isDeleting = false;
    this.isEditing = false;
    this.hideSnackbar = null;

    this.rowTranslateAnimatedValues = true;

    Dimensions.addEventListener('change', () => {
      this.setState({ visible: false });
      let timeout = setTimeout(() => {
        this.setState({ visible: true });
        clearTimeout(timeout);
      }, 50);
    })
  }

  static navigationOptions = ({ navigation }) => {
    const state = store.getState();
    const language = state.reducerLanguage;
    return {
      title: navigation.getParam('Title', Dictionary.courses[language]),
      headerRight: (
        <HeaderButton
          iconName="ios-add"
          onPress={() => navigation.navigate('AddCourseView')}
        />
      )
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.courses !== this.props.courses) {
      this.rowTranslateAnimatedValues = {}
      nextProps.courses.map(item => {
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
      courses
    } = this.state;

    const {
      emptyCourseList
    } = Dictionary;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />
        {this.rowTranslateAnimatedValues && visible &&
          <SwipeListView
            data={courses}
            extraData={courses}
            style={{ flex: 1, paddingVertical: 5 }}
            keyExtractor={item => item.id.toString()}
            /*renderItem={({ item }) => (
              <CourseComponent
                item={item}
                height={this.rowTranslateAnimatedValues[`${item.id}`].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 70],
                })}
                opacity={this.rowTranslateAnimatedValues[`${item.id}`]}
              />
            )}*/
            ListEmptyComponent={
              <ListEmptyComponent
                text={emptyCourseList[language]}
                iconName="golf"
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
            stopLeftSwipe={Dimensions.get('window').width * .5}
            stopRightSwipe={-(Dimensions.get('window').width * .5)}
            onSwipeValueChange={this.onSwipeValueChange}
          />}
      </View>
    );
  }

  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: Dictionary.courses[this.props.language]
    });
  }

  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value > Dimensions.get('window').width * .5 - 50 && !this.isEditing) {
      this.editCourse(key);
    }

    if (value < -(Dimensions.get('window').width * .5 - 1) && !this.isDeleting) {
      clearInterval(this.hideSnackbar);
      this.deleteValidation(key);
    }
  }

  editCourse = (key) => {
    this.isEditing = true;
    const { courses } = this.props;
    const index = courses.findIndex(item => item.id == key);
    this.props.navigation.navigate('AddCourseView', { course: courses[index] });
    this.isEditing = false;
  }

  deleteValidation = (key) => {
    this.isDeleting = true;
    const courseidx = this.props.rounds.findIndex(item => item.course_id == key);
    if (courseidx < 0) {
      this.deleteCourse(key);
    } else {
      Alert.alert(
        Dictionary.alert[this.props.language],
        Dictionary.deleteCourseWithRound[this.props.language],
        [
          { text: Dictionary.cancel[this.props.language], style: 'cancel', onPress: _ => this.isDeleting = false },
          { text: Dictionary.deleteAnyway[this.props.language], style: 'destructive', onPress: _ => this.deleteCourse(key) }
        ],
        {cancelable: false}
      );
    }
  }

  deleteCourse = (key) => {
    this.isDeleting = true;
    Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
      const { courses } = this.props;
      const index = courses.findIndex(item => item.id == key);
      this.hideSnackbar = setTimeout(() => {
        Snackbar.dismiss();
        courses.splice(index, 1);
        this.props.updateCourses(courses);
        this.props.deleteCourse(key);
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

export default RoundsView;
