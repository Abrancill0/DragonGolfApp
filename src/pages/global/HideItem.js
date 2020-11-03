import React, { Component } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Colors from '../../utils/Colors';
import * as NavigationService from '../../routes/NavigationService';

export default class HideItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const {
            item,
            height,
            opacity
        } = this.props;

        return (
            <Animated.View style={[styles.hideView, {height, opacity}]}>
                <Animated.View style={[styles.hideItemView, {backgroundColor: 'orange', height}]}>
                    <TouchableOpacity style={styles.hideItem} onPress={() => NavigationService.navigate('EditPlayerView', {item: item})}>
                        <Ionicons name='md-create' size={30} color={Colors.White} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.hideItemView, {alignItems: 'flex-end', backgroundColor: 'red', height}]}>
                    <TouchableOpacity style={styles.hideItem}>
                        <Ionicons name='md-trash' size={30} color={Colors.White} />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        );
    }
}
