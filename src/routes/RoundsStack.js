import RoundsView from '../pages/roundsStack/rounds/RoundsView';
import { createStackNavigator } from 'react-navigation-stack';
import CoursesView from '../pages/roundsStack/courses/CoursesView';
import RoundTab from './RoundTab';
import InfoScreen from '../pages/InfoScreen/InfoScreen';

const RoundsStack = createStackNavigator(
    {
        RoundsView,
        CoursesView,
        RoundTab: {
            screen: RoundTab,
            navigationOptions: {
                header: null
            }
        },
        InfoScreen
    },
    {
        initialRouteName: "RoundsView",
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

export default RoundsStack;