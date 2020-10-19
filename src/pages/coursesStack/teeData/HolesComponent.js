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

        const { item, changeValues, inputs } = this.props;

        return (
            <View style={styles.inputsView}>
                <View style={styles.rectangleElement}>
                    <Text style={styles.holeNumber}>{item.hole_number}</Text>
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        //ref={ref => inputs[`1:${item.index}`] = ref}
                        style={styles.input}
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.par.toString()}
                        onSubmitEditing={_ => this.focusNextInput(1)}
                        onChangeText={text => changeValues(item.index, 'par', text)}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        //ref={ref => inputs[`2:${item.index}`] = ref}
                        style={styles.input}
                        maxLength={2}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.adv.toString()}
                        onSubmitEditing={this.onSubmitAdv}
                        onChangeText={this.onChangeAdv}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.rectangleElement}>
                    <TextInput
                        //ref={ref => inputs[`3:${item.index}`] = ref}
                        style={styles.input}
                        maxLength={5}
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={item.yards.toString()}
                        onSubmitEditing={_ => {
                            if (item.index < 17) {
                                this.focusNextInput(3);
                            }
                        }}
                        onChangeText={text => changeValues(item.index, 'yards', text)}
                        blurOnSubmit={item.index === 17}
                    />
                </View>
            </View>
        );
    }

    onChangeAdv = (adv) => {
        this.props.changeValues(this.props.item.index, 'adv', adv <= 18 ? adv ? parseInt(adv) : adv : '18');
    }

    onSubmitAdv = () => {
        const { existAdv, item, inputs } = this.props;
        if (!existAdv(item.index, item.adv) || !item.adv) this.focusNextInput(2);
        else {
            showMessage({
                message: Dictionary.advRepeat[this.props.language],
                type: 'warning',
                icon: 'warning',
            });
            setTimeout(_ => inputs[`2:${item.index}`].focus(), 100);
        }
    }

    focusNextInput = (column) => {
        const { item, inputs } = this.props;
        if (item.index === 17) {
            inputs[`${column + 1}:0`].focus();
        } else {
            inputs[`${column}:${item.index + 1}`].focus();
        }
    }
}
