import { createStackNavigator } from 'react-navigation-stack';
import PlayersView from '../pages/playersStack/players/PlayersView';
import AddPlayerView from '../pages/playersStack/addPlayer/AddPlayerView';
import EditPlayerView from '../pages/playersStack/editPlayer/EditPlayerView';
import PlayerInfoView from '../pages/playersStack/playerInfo/PlayerInfoView';
import InfoScreen from '../pages/InfoScreen/InfoScreen';
import HistoryScreen from '../pages/playersStack/history/HistoryScreen';
import NoteComponent from '../pages/playersStack/history/NoteComponent';
import DebtsComponent from '../pages/playersStack/history/DebtsComponent';

const PlayersStack = createStackNavigator(
    {
        PlayersView,
        AddPlayerView,
        EditPlayerView,
        PlayerInfoView,
        InfoScreen,
        HistoryScreen,
        NoteComponent,
        DebtsComponent
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

export default PlayersStack;