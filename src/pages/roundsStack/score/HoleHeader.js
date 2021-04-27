import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity onPress={()=> this.props.clickHandlerI2(hole-1)}><View style={[styles.holeView, {alignSelf:'center'}]}>
          <Text style={[styles.holeTitle,{opacity: 0.5}]}>{Dictionary.hole[language]}</Text>
          {hole-1>0?<View style={styles.holeNumberView}>
            <Text style={[styles.holeNumber,{opacity: 0.5}]}>{hole-1}</Text>
          </View>:
          <View style={styles.holeNumberView}>
            <Text style={[styles.holeNumber,{opacity: 0.5}]}>{18}</Text>
          </View>
        }
        </View></TouchableOpacity>
        <View style={[styles.holeView, {alignSelf:'center', marginHorizontal:80}]}>
          <Text style={styles.holeTitle}>{Dictionary.hole[language]}</Text>
          <View style={styles.holeNumberView}>
            <Text style={styles.holeNumber}>{hole}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=> this.props.clickHandlerD2(parseInt(hole,10))}><View style={[styles.holeView, {alignSelf:'center'}]}>
          <Text style={[styles.holeTitle,{opacity: 0.5}]}>{Dictionary.hole[language]}</Text>
          {hole<18?<View style={styles.holeNumberView}>
            <Text style={[styles.holeNumber,{opacity: 0.5}]}>{parseInt(hole,10)+1}</Text>
          </View>:
        <View style={styles.holeNumberView}>
            <Text style={[styles.holeNumber,{opacity: 0.5}]}>{1}</Text>
          </View>}
        </View></TouchableOpacity>
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

