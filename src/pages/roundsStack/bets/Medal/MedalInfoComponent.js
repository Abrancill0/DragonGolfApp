import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Colors from '../../../../utils/Colors';
import { Dictionary } from '../../../../utils/Dictionary';

export default class MedalInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const { item, language } = this.props;
        
        const {winner} = Dictionary;

        return (
            <View style={styles.infoView}>
                <Text style={styles.nickname}>{item.nickname}</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.hcpText}>HCP</Text>
                    <Text style={styles.hcp}>{item.handicap}</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.typeText}>F9</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.strokes}>{item.strokesF9}</Text>
                            <Text style={[styles.advStrokes, { color: item.winnerF9 ? Colors.Secondary : Colors.Black }]}>{item.advStrokesF9}</Text>
                        </View>
                    </View>
                    <Text style={styles.winner}>{item.winnerF9 ? winner[language] : ''}</Text>
                </View>
                
                <View style={{alignItems: 'center'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.typeText}>B9</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.strokes}>{item.strokesB9}</Text>
                            <Text style={[styles.advStrokes, { color: item.winnerB9 ? Colors.Secondary : Colors.Black }]}>{item.advStrokesB9}</Text>
                        </View>
                    </View>
                    <Text style={styles.winner}>{item.winnerB9 ? winner[language] : ''}</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.typeText}>18</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.strokes}>{item.total18}</Text>
                            <Text style={[styles.advStrokes, { color: item.winner18 ? Colors.Secondary : Colors.Black }]}>{item.advTotal18}</Text>
                        </View>
                    </View>
                    <Text style={styles.winner}>{item.winner18 ? winner[language] : ''}</Text>
                </View>
            </View>
        );
    }
}
