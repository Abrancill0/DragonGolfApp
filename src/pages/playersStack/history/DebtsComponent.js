import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Colors from '../../../utils/Colors';
import styles from './styles';
import { actionUpdateBibleDebts } from '../../../store/actions';
import HeaderButton from '../../global/HeaderButton';

class DebtsComponent extends Component {
    constructor(props) {
        super(props);

        const debts = props.navigation.getParam('bible').debts;

        this.state = {
            height: '100%',
            debts,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('bible').nick_name,
            headerRight: (
                <HeaderButton
                    iconName="md-checkmark"
                    color={Colors.Primary}
                    onPress={_ => navigation.goBack()}
                />
            )
        }
    };

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
        this.keyboardDidShowListener.remove();
    }

    render() {

        const { height, debts } = this.state;

        return (
            <KeyboardAvoidingView style={{ width: '100%', height }}>
                <TextInput
                    style={styles.input}
                    textAlignVertical='top'
                    autoFocus={!debts}
                    selectionColor={Colors.Primary}
                    placeholder=""
                    keyboardType="decimal-pad"
                    maxLength={10}
                    value={debts?.toString()}
                    onChangeText={this.onChangeDebts}
                />
            </KeyboardAvoidingView>
        )
    }

    _keyboardDidShow = e => {
        let shortHeight = Dimensions.get('window').height - e.endCoordinates.height;
        if (Dimensions.get('window').width > Dimensions.get('window').height) {
            shortHeight -= 35
        } else {
            shortHeight -= 90
        }
        this.setState({ height: shortHeight });
    }

    _keyboardDidHide = e => {
        this.setState({ height: '100%' });
    }

    onChangeDebts = debts => {
        this.setState({ debts });
        if(parseFloat(debts)){
            const bible = this.props.navigation.getParam('bible');
            const newData = { ...bible, debts: parseFloat(debts) };
            this.props.updateBible(newData);
        }
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
    updateBible: (values) => {
        dispatch(actionUpdateBibleDebts(values));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DebtsComponent)

