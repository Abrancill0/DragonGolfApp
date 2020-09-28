import React, { Component } from 'react'
import { Text, Linking, ScrollView, View } from 'react-native'
import { Dictionary } from '../../utils/Dictionary';
import styles from './styles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class InfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: props.route.params.language
        };

        this.data = props.route.params.data
    }


    render() {

        const {language} = this.state;
        const {title, info, retrieved, url} = this.data;

        return (
            <View>
                <TouchableOpacity style={{padding:10}} onPress={()=> this.props.navigation.goBack()}>
                  <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
                </TouchableOpacity>
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
