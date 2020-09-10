import { createStackNavigator } from 'react-navigation-stack';
import ScoreView from '../pages/roundsStack/score/ScoreView';

const ScoreStack = createStackNavigator(
    {
        ScoreView
    },
    {
        initialRouteName: "ScoreView",
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

export default ScoreStack;