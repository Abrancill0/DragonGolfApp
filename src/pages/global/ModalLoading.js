import React, { Component } from 'react'
import { Modal, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import styles from './styles';
import Colors from '../../utils/Colors';

class ModalLoading extends Component {
    render() {

        const { visible, loadingRound } = this.props;

        const loading = loadingRound.snBet && loadingRound.tnBet && loadingRound.medalBet && loadingRound.roundPlayers && loadingRound.tees
            && loadingRound.hole;
        
        return (
            <View>
                <Modal
                    visible={visible || loading}
                    transparent
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.circleLoading}>
                            <ActivityIndicator
                                size={40}
                                color={Colors.Primary}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    visible: state.reducerLoading,
    loadingRound: state.reducerLoadingRound
});
  
const mapDispatchToProps = dispatch => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalLoading);
