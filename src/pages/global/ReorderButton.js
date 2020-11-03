import React, { Component } from 'react';
import {
    View,
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import Colors from '../../utils/Colors';

export default class ReorderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {
        iconName,
        onPress,
        color
    } = this.props;

    return (
      <View style={styles.headerButton}>
        {
            Platform.OS === 'android' ? (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(Colors.Primary, true)}
                    onPress={onPress}
                >
                    <View style={styles.roundRipple}>
                        <MaterialCommunityIcons name={iconName} size={25} color={color ? color : Colors.Black} />
                    </View>
                </TouchableNativeFeedback>
            ) : (
                <TouchableOpacity
                    onPress={onPress}
                >
                    <View style={styles.roundRipple}>
                        <MaterialCommunityIcons name={iconName} size={25} color={color ? color : Colors.Black} />
                    </View>
                </TouchableOpacity>
            )
        }
      </View>
    );
  }
}
