import React, { Component } from 'react'
import { Text } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from './styles'

export default class DragonButton extends Component {
    render() {

        const {
            title,
            onPress
        } = this.props;

        return (
            <Ripple
                style={styles.dragonButton}
                onPress={onPress}
            >
                <Text style={styles.dragonButtonText}>{title}</Text>
            </Ripple>
        )
    }
}
