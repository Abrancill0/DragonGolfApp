import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './styles';
import Colors from '../../../utils/Colors';
import AsyncStorage from '@react-native-community/async-storage';

export default class HistoryComponent extends Component {
    constructor(props) {
        console.warn(props.language)
        super(props);
        this.state={
            resultado:''
        }
    }

    componentDidMount() {
        this.obtenHistorial()
    }

    obtenHistorial = async () => {
        let Carry = this.props.item.Carry;
        console.warn(this.props.item.IDUsuarioGano)
        console.warn(this.props.language)
        console.warn(Carry)
        const token = await AsyncStorage.getItem('usu_id')
        if(this.props.item.IDUsuarioGano == token && this.props.language=='en' && Carry==0){
            this.setState({
                resultado: 'W'
            })
        }
        else if(this.props.item.IDUsuarioGano != token && this.props.language=='en' && Carry==0){
            this.setState({
                resultado: 'L'
            })
        }
        else if(this.props.item.IDUsuarioGano == 0 && this.props.language=='en' && Carry==0){
            this.setState({
                resultado: 'D'
            })
        }
        else if(this.props.item.IDUsuarioGano == 0 && this.props.language=='es' && Carry==0){
            console.warn("Entró E")
            this.setState({
                resultado: 'E'
            })
        }
        else if(this.props.item.IDUsuarioGano == token && this.props.language=='es' && Carry==0){
            console.warn("Entró G")
            this.setState({
                resultado: 'G'
            })
        }
        else if(this.props.item.IDUsuarioGano != token && this.props.language=='es' && Carry==0){
            console.warn("Entró G")
            this.setState({
                resultado: 'P'
            })
        }
        if(this.props.item.IDUsuarioGano == token && this.props.language=='en' && Carry==1){
            this.setState({
                resultado: 'Carry, W'
            })
        }
        else if(this.props.item.IDUsuarioGano != token && this.props.language=='en' && Carry==1){
            this.setState({
                resultado: 'Carry, L'
            })
        }
        else if(this.props.item.IDUsuarioGano == 0 && this.props.language=='en' && Carry==1){
            this.setState({
                resultado: 'Carry, D'
            })
        }
        else if(this.props.item.IDUsuarioGano == 0 && this.props.language=='es' && Carry==1){
            this.setState({
                resultado: 'Carry, E'
            })
        }
        else if(this.props.item.IDUsuarioGano == token && this.props.language=='es' && Carry==1){
            this.setState({
                resultado: 'Carry, G'
            })
        }
        else if(this.props.item.IDUsuarioGano != token && this.props.language=='es' && Carry==1){
            this.setState({
                resultado: 'Carry, P'
            })
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
