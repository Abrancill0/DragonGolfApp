import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Dictionary } from '../../../utils/Dictionary';
import AsyncStorage from '@react-native-community/async-storage';

class HoleHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language:''
    };
  }

  componentDidMount = async () => {
    let language = await AsyncStorage.getItem('language')
    this.setState({
        language:language
    })
    }

  render() {

    const {
      hole,
      course,
    } = this.props;

    const {
      language
    } = this.state;

    return (
      <View style={{ flex: 1, flexDirection: 'row', alignSelf:'center' }}>
        <View style={[styles.holeView, {alignSelf:'center'}]}>
          <Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>
          <View style={styles.holeNumberView}>
            <Text style={styles.holeNumber}>{hole}</Text>
          </View>
        </View>
        <View>
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

