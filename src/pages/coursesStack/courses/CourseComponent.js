/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import {
    View,
    Text,
    Animated
} from 'react-native'
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import Ionicon from 'react-native-vector-icons/Ionicons';
import * as NavigationService from '../../../routes/NavigationService';
import Colors from '../../../utils/Colors';
import Database from '../../../database/database';

export default class CourseComponent extends Component {

    render() {

        const {
            item,
            height,
            opacity
        } = this.props;

        return (
            <Animated.View style={{height, opacity}}>
                <Ripple
                    style={styles.courseView}
                    rippleColor={Colors.Primary}
                    onPress={() => NavigationService.navigate('TeesView', { Title: item.short_name, courseId: item.id })}
                >
                    <View style={styles.infoView}>
                        <Text style={styles.shortNameText}>{item.short_name}</Text>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.placeText}>{item.city}, {item.country}</Text>
                    </View>
                    <View style={styles.arrowView}>
                        <Ionicon name="chevron-forward-sharp" size={25} color={Colors.Black} />
                    </View>
                </Ripple>
            </Animated.View>
        )
    }
}
