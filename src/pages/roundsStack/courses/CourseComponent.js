/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import {
    View,
    Text,
} from 'react-native'
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../utils/Colors';
import * as NavigationService from '../../../routes/NavigationService';

export default class CourseComponent extends Component {

    render() {

        const {
            item,
            setRoundCourse,
            setLoadingRound
        } = this.props;

        return (
            <Ripple
                style={styles.courseView}
                rippleColor={Colors.Primary}
                onPress={() => {
                    setRoundCourse(item);
                    const loadingRoundData = {
                        snBet: true,
                        tnBet: true,
                        roundPlayers: true,
                        tees: true,
                        hole: true,
                        medalBet: true
                    };
                    setLoadingRound(loadingRoundData);
                    NavigationService.navigate('RoundTab');
                }}
            >
               <View style={styles.flagView}>
                    <MaterialCommunity name='golf' size={25} color={Colors.Primary} />
                </View> 
                <View style={styles.infoView}>
                    <Text style={styles.shortNameText}>{item.short_name}</Text>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.placeText}>{item.city}, {item.country}</Text>
                </View>
                <View style={styles.flagView}>
                    <Text style={{fontSize: 30}}>{item.country === 'USA' ? '🇺🇸' : '🇲🇽'}</Text>
                </View>
            </Ripple>
        )
    }
}
