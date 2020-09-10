import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Bar } from 'react-native-progress';
import { connect } from 'react-redux';
import styles from './styles'
import Colors from '../../utils/Colors';

class TopProgressBar extends Component {
    render() {
        return (
            <View style={styles.topProgressView}>
                {this.props.visible &&
                    <Bar
                        width={Dimensions.get('window').width}
                        height={3}
                        indeterminate
                        indeterminateAnimationDuration={800}
                        color={Colors.Primary}
                        borderWidth={0}
                        borderRadius={0}
                    />
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    visible: state.reducerProgress,
});
  
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TopProgressBar);