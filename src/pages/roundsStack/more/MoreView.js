import React, { Component } from 'react';
import { View } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import store from '../../../store/store';
import { connect } from 'react-redux';
import styles from './styles';
import MoreOptionComponent from './MoreOptionComponent';
import { NavigationEvents } from 'react-navigation';

class MoreView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = ({ navigation }) => {
    const state = store.getState();
    const language = state.reducerLanguage;
    return {
      title: navigation.getParam('Title', Dictionary.more[language]),
    }
  }

  render() {

    const { navigation, language } = this.props;
    const {
      earningDetails
    } = Dictionary;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={this.changeTitleText}
        />
        <MoreOptionComponent title='Score Card' onPress={() => navigation.navigate('ScoreCardView')} />
        <MoreOptionComponent
          title={earningDetails[language]}
          onPress={() => navigation.navigate('SummaryView')}
          iconName='ios-cash'
          iconFamily='Ionicons'
        />
      </View>
    );
  }

  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: `${Dictionary.more[this.props.language]}`,
    });
  }
}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreView);