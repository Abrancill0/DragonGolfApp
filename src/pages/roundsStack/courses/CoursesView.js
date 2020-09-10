import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import store from '../../../store/store';
import { connect } from 'react-redux';
import { Dictionary } from '../../../utils/Dictionary';
import { NavigationEvents } from 'react-navigation';
import { actionGetCourses, actionSetRoundCourse, actionLoadingRound } from '../../../store/actions';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import CourseComponent from './CourseComponent';

class CoursesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = ({ navigation }) => {
        const state = store.getState();
        const language = state.reducerLanguage;
        return {
            title: navigation.getParam('Title', Dictionary.selectCourse[language]),
        }
    }

    render() {

        const {
            courses,
            language,
            setRoundCourse,
            setLoadingRound
        } = this.props;

        const {
            emptyCourseList
        } = Dictionary;

        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents
                    onWillFocus={this.changeTitleText}
                />
                <FlatList
                    data={courses}
                    extraData={courses}
                    style={{ flex: 1, paddingVertical: 5 }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <CourseComponent item={item} setRoundCourse={setRoundCourse} setLoadingRound={setLoadingRound} />
                    )}
                    ListEmptyComponent={
                        <ListEmptyComponent
                            text={emptyCourseList[language]}
                            iconName="golf"
                        />
                    }
                />
            </View>
        );
    }

    changeTitleText = () => {
        this.props.navigation.setParams({
            Title: Dictionary.selectCourse[this.props.language]
        });
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    userData: state.reducerUserData,
    courses: state.reducerCourses,
});

const mapDispatchToProps = dispatch => ({
    getCourses: () => {
        dispatch(actionGetCourses());
    },
    setRoundCourse: (values) => {
        dispatch(actionSetRoundCourse(values));
    },
    setLoadingRound: (value) => {
      dispatch(actionLoadingRound(value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesView);
