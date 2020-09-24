import React, { Component } from 'react'
import { Text, Linking, ScrollView, View } from 'react-native'
import { Dictionary } from '../../utils/Dictionary';
import styles from './styles';

class InfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'es'
        };

        this.data = props.navigation.getParam('data');
    }


    render() {

        const {language} = this.state;
        const {title, info, retrieved, url} = this.data;

        return (
            <View>
            <ScrollView
                style={{ paddingVertical: 15, paddingHorizontal: 20}}
                contentContainerStyle={{alignItems: 'center'}}
            >
                <Text style={styles.title}>{title[language]}</Text>
                <Text style={styles.info}>{info[language]}</Text>
                {retrieved && <Text style={styles.retrieved} onPress={_ => Linking.openURL(url)}>{retrieved[language]}</Text>}
            </ScrollView>
            </View>
        )
    }
}

export default InfoScreen
