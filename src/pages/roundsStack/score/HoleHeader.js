import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Dictionary } from '../../../utils/Dictionary';

class HoleHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {
      hole,
      language,
      course,
    } = this.props;

    return (
      <View style={styles.holeHeaderView}>
        <View style={styles.holeView}>
          <Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>
          <View style={styles.holeNumberView}>
            <Text style={styles.holeNumber}>{hole}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/*<Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.cityName}>{course.city}</Text>*/}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  course: state.reducerRoundCourse
});

const mapDispatchToProps = dispatch => ({
});

export default HoleHeader;

