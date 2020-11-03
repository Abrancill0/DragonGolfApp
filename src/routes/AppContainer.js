import React from 'react';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {createAppContainer } from 'react-navigation';
import { Transition } from 'react-native-reanimated';
import IndexStack from './IndexStack';
import HomeTab from './HomeTab';
import RoundTab from './RoundTab';
import SplashScreen from '../pages/splashScreen/SplashScreen';

const AppContainer = createAppContainer(createAnimatedSwitchNavigator(
    {
        IndexStack,
        HomeTab,
        // RoundTab,
        SplashScreen
    },
    {
        initialRouteName: "SplashScreen",
        transition: (
            <Transition.Together>
              {/* <Transition.Out
                type="slide-bottom"
                durationMs={300}
                interpolation="easeIn"
              /> */}
              <Transition.In
                type="slide-bottom"
                durationMs={300}
                interpolation='easeOut'
              />
            </Transition.Together>
          ),
    }
));

export default AppContainer;