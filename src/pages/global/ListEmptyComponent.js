import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default class ListEmptyComponent extends Component {

  render() {

    const {
        text,
        iconName,
        iconFamily
    } = this.props;

    return (
      <View style={styles.emptyView}>
        {iconFamily === 'font-awesome' ?
          <FontAwesome name={iconName} size={50} color="red" /> :
          <MaterialCommunity name={iconName} size={50} color="red" />
        }
        <Text style={styles.emptyText}>{text}</Text>
      </View>
    );
  }
}
