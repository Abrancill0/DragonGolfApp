import React, { Component } from 'react';
import { Text, Platform } from 'react-native';
import ConfigRoundStack from './ConfigRoundStack';
import RoundPlayerStack from './RoundPlayerStack';
//import ScoreStack from './ScoreStack';
//import BetsStack from './BetsStack';
//import MoreStack from './MoreStack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/Colors';
import { Dictionary } from '../utils/Dictionary';
import ConfigRoundView from '../pages/roundsStack/configRound/ConfigRoundView';

const RoundTab = createMaterialTopTabNavigator(
    {
        ConfigRoundStack: {
            screen: ConfigRoundView,
            navigationOptions: ({ navigation }) => {
                const language = 'es'
                return {
                    tabBarLabel: <Text style={{ fontSize: 12 }} numberOfLines={1} adjustsFontSizeToFit>{Dictionary.round[language]}</Text>,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name='golf-ball'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 15 : 10}
                        />
                    ),
                    header: null
                }
            }
        },
        RoundPlayerStack: {
            screen: RoundPlayerStack,
            navigationOptions: () => {
                const language = 'es'
                return {
                    tabBarLabel: <Text style={{ fontSize: 12 }} numberOfLines={1} adjustsFontSizeToFit>{Dictionary.players[language]}</Text>,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name='user-friends'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 15 : 10}
                        />
                    ),
                }
            }
        },
        /*ScoreStack: {
            screen: ScoreStack,
            navigationOptions: () => {
                return {
                    tabBarLabel: <Text style={{ fontSize: 12 }} numberOfLines={1} adjustsFontSizeToFit>Score</Text>,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name='star'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 20 : 15}
                        />
                    ),
                }
            }
        },
        BetsStack: {
            screen: BetsStack,
            navigationOptions: () => {
                const language = 'es'
                return {
                    tabBarLabel: <Text style={{ fontSize: 12 }} numberOfLines={1} adjustsFontSizeToFit>{Dictionary.bets[language]}</Text>,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name='coin'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 20 : 15}
                        />
                    ),
                }
            }
        },
        MoreStack: {
            screen: MoreStack,
            navigationOptions: () => {
                const language = 'es'
                return {
                    tabBarLabel: <Text style={{ fontSize: 12 }} numberOfLines={1} adjustsFontSizeToFit>{Dictionary.more[language]}</Text>,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name='ellipsis-h'
                            color={focused ? Colors.Primary : Colors.Dark}
                            size={focused ? 20 : 15}
                        />
                    ),
                }
            }
        }*/
    },
    {
        initialRouteName: "ConfigRoundStack",
        swipeEnabled: false,
        animationEnabled: false,
        tabBarPosition: "top",
        tabBarOptions: {
            style: {backgroundColor: Colors.White},
            activeTintColor: Colors.Primary,
            inactiveTintColor: Colors.Dark,
            showLabel: true,
            showIcon:false,
            upperCaseLabel: false,
            pressColor: Colors.Primary,
            iconStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center'
            },
            labelStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                fontSize: 11.5
            },
            indicatorStyle: {
                borderBottomColor: Colors.Primary,
                borderBottomWidth: 3,
            }
        }
    }
);

export default RoundTab;