import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dictionary } from '../../utils/Dictionary';

class TournamentsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FontAwesome name='trophy' size={50} color='lightgray' />
        <Text style={{
          fontSize: 16,
          color: 'lightgray',
          fontWeight: 'bold',
          marginTop: 10
        }}> {Dictionary.comingSoon[this.props.language]} </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsView);
