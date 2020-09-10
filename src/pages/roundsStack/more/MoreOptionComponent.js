import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import styles from './styles';
import Colors from '../../../utils/Colors';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ScoreCard from '../../../../assets/globals/scorecard.png';

export default class MoreOptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const {
            title,
            onPress,
            iconName,
            iconFamily
        } = this.props;

        return (
            <Ripple
                style={styles.optionButton}
                rippleColor={Colors.Primary}
                onPress={onPress}
            >
                <View style={styles.iconView}>
                    {title === 'Score Card' ? <Image
                        source={ScoreCard}
                        style={{
                            width: 25,
                        }}
                        resizeMode="contain"
                    /> : <Ionicon name={iconName} color={Colors.Primary} size={25} />}
                </View>
                <View style={styles.buttonNameView}>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </Ripple>
        );
    }
}
