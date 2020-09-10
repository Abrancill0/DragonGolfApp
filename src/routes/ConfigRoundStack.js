import { createStackNavigator } from 'react-navigation-stack';
import ConfigRoundView from '../pages/roundsStack/configRound/ConfigRoundView';

const ConfigRoundStack = createStackNavigator(
    {
        ConfigRoundView
    },
    {
        initialRouteName: "ConfigRoundView",
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

export default ConfigRoundStack;