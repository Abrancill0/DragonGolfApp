import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './styles';
import Colors from '../../../utils/Colors';
import AsyncStorage from '@react-native-community/async-storage';

export default class HistoryComponent extends Component {
    constructor(props) {
        console.warn(props.language)
        super(props);
    }

    componentDidMount() {
        this.obtenHistorial()
    }

    obtenHistorial = async () => {
        const token = await AsyncStorage.getItem('usu_id')
        if(props.item.IDUsuarioGano.toString() == token && props.language=='en'){
            this.state = {
                resultado: 'W'
            };
        }
        else if(props.IDUsuarioGano.toString() != token && props.language=='en'){
            this.state = {
                resultado: 'L'
            };
        }
        else if(props.item.IDUsuarioGano.toString() == token && props.language=='es'){
            this.state = {
                resultado: 'G'
            };
        }
        else{
            this.state = {
                resultado: 'P'
            };
        }
    }


    render() {

        const {
            item,
            landscape,
            navigation,
            playerId
        } = this.props;

        return (
            <View>
                <View style={styles.rowView}>
                            <View style={styles.headers}>
                                <Text style={styles.rowText}>{item.date}</Text>
                            </View>
                            <View style={styles.headers}>
                                <Text style={styles.rowText}>{item.course_name}</Text>
                            </View>
                            {/* <TouchableOpacity style={styles.headers} onPress={_ => navigation.push('HistoryScreen', { playerId: item.player_id })} disabled={!!playerId}>
                                <Text style={styles.rowText}>{item.nick_name}</Text>
                            </TouchableOpacity> */}
                            <View style={[styles.headers, item.is_manual && { backgroundColor: Colors.PrimaryWithOpacity }]}>
                                <Text style={[styles.rowText, item.is_manual && { fontWeight: 'bold' }]}>{item.played_hp}</Text>
                            </View>
                            <View style={styles.headers}>
                                <Text style={styles.rowText}>{this.state.resultado}</Text>
                            </View>
                            <View style={styles.headers}>
                                <Text style={styles.rowText}>{item.next_hp}</Text>
                            </View>
                            <View style={styles.headers}>
                                <Text style={[styles.rowText, { color: item.money < 0 ? 'red' : item.money > 0 ? 'green' : Colors.Black }]}>{item.money}</Text>
                            </View>
                            {landscape && <View>
                                <TouchableOpacity style={styles.headers} onPress={_ => navigation.navigate('DebtsComponent', { playerId: item.player_id, bible: item })}>
                                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.rowText}>{item.debts}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.headers} onPress={_ => navigation.navigate('NoteComponent', { playerId: item.player_id, bible: item })}>
                                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.rowText}>{item.notes}</Text>
                                </TouchableOpacity>
                            </View>}
                        </View>
            </View>
        );
    }
}
