import React, { Component } from 'react';
import {
    View,
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
    Text
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Colors from '../../../utils/Colors';

export default class HeaderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {
        title,
        onPress,
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
                        <Text style={styles.headerButtonText} numberOfLines={1} adjustsFontSizeToFit>{title}</Text>
                    </View>
                </TouchableNativeFeedback>
            ) : (
                <TouchableOpacity
                    onPress={onPress}
                >
                    <View style={styles.roundRipple}>
                        <Text style={styles.headerButtonText}>{title}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
      </View>
    );
  }
}
