import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import { showMessage } from 'react-native-flash-message';
import { Dictionary } from '../../../utils/Dictionary';

export default class HolesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const { item } = this.props;

        return (
            <View style={styles.inputsView}>
                <View style={styles.rectangleElement}>
                    <Text style={styles.holeNumber}>{item.hole_number}</Text>
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        editable={false}
                        color={'black'}
                        style={[styles.input,{marginTop:-5}]}
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.par.toString()}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        editable={false}
                        color={'black'}
                        style={[styles.input,{marginTop:-5}]}
                        maxLength={2}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.adv.toString()}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        editable={false}
                        color={'black'}
                        style={[styles.input,{marginTop:-5}]}
                        maxLength={5}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.yards.toString()}
                        blurOnSubmit={false}
                    />
                </View>
            </View>
        );
    }
}
