import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Colors from '../../../utils/Colors';
import styles from './styles';
import { actionUpdateBible } from '../../../store/actions';
import HeaderButton from '../../global/HeaderButton';

class NoteComponent extends Component {
    constructor(props) {
        super(props);

        const note = props.navigation.getParam('bible').notes;

        this.state = {
            height: '100%',
            note,
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

        const { height, note } = this.state;

        return (
            <KeyboardAvoidingView style={{ width: '100%', height }}>
                <TextInput
                    style={styles.input}
                    autoFocus={!note}
                    selectionColor={Colors.Primary}
                    placeholder=""
                    keyboardType="default"
                    multiline
                    maxLength={255}
                    value={note}
                    onChangeText={this.onChangeNote}
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

    onChangeNote = note => {
        this.setState({ note });
        const bible = this.props.navigation.getParam('bible');
        const newData = { ...bible, notes: note.trim() };
        this.props.updateBible(newData);
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
    updateBible: (values) => {
        dispatch(actionUpdateBible(values));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteComponent)

