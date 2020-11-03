import { createStackNavigator } from 'react-navigation-stack';
import CoursesView from '../pages/coursesStack/courses/CoursesView';
import AddCourseView from '../pages/coursesStack/addCourse/AddCourseView';
import AddTeeView from '../pages/coursesStack/addTee/AddTeeView';
import TeesView from '../pages/coursesStack/tees/TeesView';
import TeeDataView from '../pages/coursesStack/teeData/TeeDataView';

const CoursesStack = createStackNavigator(
    {
        CoursesView,
        AddCourseView,
        AddTeeView,
        TeesView,
        TeeDataView
    },
    {
        initialRouteName: "CoursesView",
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerForceInset: {
                top: 'never',
                bottom: 'never'
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20
            }
        }
    }
);

export default CoursesStack;