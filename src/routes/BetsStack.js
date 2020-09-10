import { createStackNavigator } from 'react-navigation-stack';
import BetsView from '../pages/roundsStack/bets/BetsView';
import SNBetView from '../pages/roundsStack/bets/SingleNassau/SNBetView';
import SNScoreCardView from '../pages/roundsStack/bets/SingleNassau/SNScoreCardView';
import SummaryView from '../pages/roundsStack/bets/SummaryView';
import TNBetView from '../pages/roundsStack/bets/TeamNassau/TNBetView';
import TNScoreCardView from '../pages/roundsStack/bets/TeamNassau/TNScoreCardView';
import MedalBetView from '../pages/roundsStack/bets/Medal/MedalBetView';
import PlayersView from '../pages/roundsStack/bets/Medal/PlayersView';
import MedalInfoView from '../pages/roundsStack/bets/Medal/MedalInfoView';

const BetsStack = createStackNavigator(
    {
        BetsView,
        SNBetView,
        SNScoreCardView,
        TNBetView,
        TNScoreCardView,
        MedalBetView,
        SummaryView,
        PlayersView,
        MedalInfoView
    },
    {
        initialRouteName: "BetsView",
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

export default BetsStack;