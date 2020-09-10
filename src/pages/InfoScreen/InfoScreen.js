import React, { Component } from 'react'
import { Text, Linking } from 'react-native'
import { connect } from 'react-redux'
import store from '../../store/store';
import { Dictionary } from '../../utils/Dictionary';
import { NavigationEvents, ScrollView } from 'react-navigation';
import styles from './styles';

class InfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.data = props.navigation.getParam('data');
    }

    static navigationOptions = ({ navigation }) => {
        const state = store.getState();
        const language = state.reducerLanguage;
        return {
            title: navigation.getParam('Title', Dictionary.details[language])
        }
    };

    render() {

        const {language} = this.props;
        const {title, info, retrieved, url} = this.data;

        return (
            <ScrollView
                style={{flex: 1, paddingVertical: 15, paddingHorizontal: 20}}
                contentContainerStyle={{alignItems: 'center'}}
            >
                <NavigationEvents
                    onWillFocus={this.changeTitleText}
                />
                <Text style={styles.title}>{title[language]}</Text>
                <Text style={styles.info}>{info[language]}</Text>
                {retrieved && <Text style={styles.retrieved} onPress={_ => Linking.openURL(url)}>{retrieved[language]}</Text>}
            </ScrollView>
        )
    }

    changeTitleText = () => {
        this.props.navigation.setParams({
            Title: Dictionary.details[this.props.language]
        });
    }
}

const mapStateToProps = (state) => ({
    language: state.reducerLanguage
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen)
