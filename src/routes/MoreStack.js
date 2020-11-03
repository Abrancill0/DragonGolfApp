import { createStackNavigator } from 'react-navigation-stack';
import MoreView from '../pages/roundsStack/more/MoreView';
import ScoreCardView from '../pages/roundsStack/more/ScoreCardView';
import SummaryView from '../pages/roundsStack/bets/SummaryView';

const MoreStack = createStackNavigator(
    {
        MoreView,
        ScoreCardView,
        SummaryView
    },
    {
        initialRouteName: "MoreView",
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

export default MoreStack;