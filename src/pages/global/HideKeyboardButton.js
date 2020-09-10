import React, { Component } from 'react';
import { View, Keyboard, TouchableOpacity, Animated, Dimensions } from 'react-native';
import styles from './styles';
import Octicon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';

export default class HideKeyboardButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bottom: new Animated.Value(-50),
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    render() {

        const {bottom} = this.state;

        return (
            <Animated.View style={[styles.hideKeyboardView, {bottom}]}>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={_ => Keyboard.dismiss()}>
                    <View style={styles.hideKeyboardButton}>
                        <MaterialIcon name='keyboard-hide' size={25} color={Colors.Primary} />
                    </View>
                    <View style={{elevation: 10}}><Octicon name='triangle-down' size={20} color={Colors.White} /></View>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    _keyboardDidShow = (e) => {
        Animated.timing(this.state.bottom, {
            toValue: e.endCoordinates.height,
            duration: 300
        }).start();
    }

    _keyboardDidHide = () => {
        Animated.timing(this.state.bottom, {
            toValue: -50,
            duration: 300
        }).start();
    }
}
