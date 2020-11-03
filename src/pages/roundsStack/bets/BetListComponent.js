import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import Colors from '../../../utils/Colors';
import Ripple from 'react-native-material-ripple';

export default class BetListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Animatable.View animation='bounceInRight' duration={1200}>
                <Ripple style={styles.betListView} rippleColor={Colors.Secondary}>
                <View style={styles.betIndexView}>
                    <Text style={styles.betIndexText}>1</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.betGeneralInfoView}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.advInfo}>[1.0] </Text>
                            <Text style={styles.vsInfo}> BALTA vs SCRE</Text>
                        </View>
                        <Text style={[styles.profitText, { color: 'green' }]}>$600</Text>
                    </View>
                    <View style={styles.betInfoView}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={{ marginRight: 10 }}>$300 <Text style={{ fontWeight: 'bold' }}>F9:</Text></Text>
                            <Text style={{ letterSpacing: 4 }}>
                                _
                                _
                                _
                                _
                                _
                                _
                                _
                                _
                                _
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={{ marginRight: 10 }}>$600 <Text style={{ fontWeight: 'bold' }}>B9:</Text></Text>
                            <Text style={{ letterSpacing: 4 }}>
                                _
                                _
                                _
                                _
                                _
                                _
                                _
                                _
                                _
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>$600 <Text style={{ fontWeight: 'bold' }}>Match = $600</Text></Text>
                            <Text>$600 <Text style={{ fontWeight: 'bold' }}>Medal = 44</Text></Text>
                        </View>
                    </View>
                </View>
                </Ripple>
            </Animatable.View>
        );
    }
}
