import React, { Component } from 'react';
import { View } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import MoreOptionComponent from './MoreOptionComponent';

class MoreView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'es'
    };
  }

  render() {

    const { language } = this.state;
    const {
      earningDetails
    } = Dictionary;

    return (
      <View style={styles.container}>
        <MoreOptionComponent title='Score Card' onPress={() => this.props.navigation.navigate('ScoreCardView')} />
        <MoreOptionComponent
          title={earningDetails[language]}
          onPress={() => this.props.navigation.navigate('SummaryView')}
          iconName='ios-cash'
          iconFamily='Ionicons'
        />
      </View>
    );
  }
}

export default MoreView;