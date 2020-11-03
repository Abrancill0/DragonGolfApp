import React from 'react';
import { Text } from 'react-native';
import RoundsStack from './RoundsStack';
//import PlayersStack from './PlayersStack';
//import CoursesStack from './CoursesStack';
//import SettingsStack from './SettingsStack';
//import TournamentsView from '../pages/tournamentsStack/TournamentsView';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';
import { Dictionary } from '../utils/Dictionary';

const HomeTab = createMaterialTopTabNavigator(
    {
        RoundsStack: {
            screen: RoundsStack,
            navigationOptions: () => {
                const language = 'es'
                return {
                    tabBarLabel: <Text style={{fontSize: 12}} numberOfLines={1} adjustsFontSizeToFit>{Dictionary.rounds[language]}</Text>,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name='golf-ball'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 20 : 15}
                        />
                    ),
                }
            }
        },/*
        PlayersStack: {
            screen: PlayersStack,
            navigationOptions: ({ navigation }) => {
                const language = 'es'
                return {
                    tabBarLabel: <Text style={{fontSize: 12}} numberOfLines={1} adjustsFontSizeToFit>{Dictionary.players[language]}</Text>,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name='user-friends'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 20 : 15}
                        />
                    ),
                }
            }
        },
        CoursesStack: {
            screen: CoursesStack,
            navigationOptions: () => {
                const language = 'es'
                return {
                    tabBarLabel: <Text style={{fontSize: 12}} numberOfLines={1} adjustsFontSizeToFit>{Dictionary.courses[language]}</Text>,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name='golf'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 25 : 20}
                        />
                    ),
                }
            }
        },
        TournamentsView: {
            screen: TournamentsView,
            navigationOptions: () => {
                const language = 'es'
                return {
                    tabBarLabel: <Text style={{fontSize: 12}} numberOfLines={1} adjustsFontSizeToFit>{Dictionary.tournaments[language]}</Text>,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name='trophy'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 20 : 15}
                        />
                    ),
                }
            }
        },
        SettingsStack: {
            screen: SettingsStack,
            navigationOptions: () => {
                const language = 'es'
                return {
                    tabBarLabel: <Text style={{fontSize: 12}} numberOfLines={1} adjustsFontSizeToFit>{Dictionary.settings[language]}</Text>,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name='settings'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 25 : 20}
                        />
                    ),
                }
            }
        }*/
    },
    {
        initialRouteName: "RoundsStack",
        swipeEnabled: false,
        animationEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            contentContainerStyle: {
                backgroundColor: Colors.White,
                height: 60,
            },
            activeTintColor: Colors.Primary,
            inactiveTintColor: Colors.Dark,
            showLabel: false,
            showIcon: true,
            upperCaseLabel: false,
            pressColor: Colors.Primary,
            iconStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center'
            },
        }
    }
);

export default HomeTab;