import RegisterView from '../screen/indexStack/register/RegisterView';
import { createStackNavigator } from 'react-navigation-stack';
//import CoursesView from '../pages/roundsStack/courses/CoursesView';
//import RoundTab from './RoundTab';
//import InfoScreen from '../pages/InfoScreen/InfoScreen';

const RoundsStack = createStackNavigator(
    {
        RegisterView,
        /*CoursesView,
        RoundTab: {
            screen: RoundTab,
            navigationOptions: {
                header: null
            }
        },
        InfoScreen*/
    },
    {
        initialRouteName: "RegisterView",
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