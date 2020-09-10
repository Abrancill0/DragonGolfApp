import { createStackNavigator } from 'react-navigation-stack';
import PlayersView from '../pages/roundsStack/players/PlayersView';
import AddPlayersView from '../pages/roundsStack/players/AddPlayersView';
import PlayersVsView from '../pages/roundsStack/players/PlayersVsView';

const RoundPlayerStack = createStackNavigator(
    {
        PlayersView,
        AddPlayersView,
        PlayersVsView
    },
    {
        initialRouteName: "PlayersView",
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

export default RoundPlayerStack;