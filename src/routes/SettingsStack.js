import SettingsView from '../pages/settingsStack/settings/SettingsView';
import { createStackNavigator } from 'react-navigation-stack';
import EditUserView from '../pages/settingsStack/editUser/EditUserView';
import InfoScreen from '../pages/InfoScreen/InfoScreen';

const SettingsStack = createStackNavigator(
    {
        SettingsView,
        EditUserView,
        InfoScreen
    },
    {
        initialRouteName: "SettingsView",
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

export default SettingsStack;