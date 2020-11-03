import LoginView from '../pages/indexStack/login/LoginView';
import RegisterView from '../pages/indexStack/register/RegisterView';
import { createStackNavigator } from 'react-navigation-stack';

const IndexStack = createStackNavigator(
    {
        LoginView,
        RegisterView,
    },
    {
        initialRouteName: "LoginView",
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerForceInset: {
                top: 'never',
                bottom: 'never'
            }
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
        }
    }
);

export default IndexStack;