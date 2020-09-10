/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Alert, Animated } from 'react-native';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import * as NavigationService from '../../../routes/NavigationService';
import Colors from '../../../utils/Colors';
import Database from '../../../database/database';
const database = new Database();

export default class TeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inYards: 0,
            outYards: 0,
            par: 0,
            height: 70
        };

        this.props.height.addListener(({ value }) => this.setState({ height: value }));
    }

    componentDidMount() {
        this.loadData();
    }

    render() {

        const { item, title, height, opacity } = this.props;
        const {
            inYards,
            outYards,
            par
        } = this.state;

        return (
            <Animated.View style={{ height, backgroundColor: Colors.White, opacity }}>
                <Ripple
                    style={styles.teeView}
                    rippleColor={Colors.Secondary}
                    onPress={() => NavigationService.navigate('TeeDataView', {
                        Title: title + ': ' + item.name,
                        tee: item,
                        holes: this.state.holes,
                        loadData: this.loadData
                    })}
                >
                    {this.state.height > 10 && <View style={styles.teeNameView}>
                        <Text
                            style={styles.teeNameText}
                            adjustsFontSizeToFit
                            numberOfLines={1}
                        >{item.name}</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunity name="filter" size={23} color={Colors.Black} />
                            <View style={{ position: 'absolute' }}>
                                <MaterialCommunity name="filter" size={20} color={item.color} />
                            </View>
                        </View>
                    </View>}
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <View style={[styles.infoView, { marginLeft: 25 }]}>
                                <Text style={styles.infoText}>Slope:</Text>
                                <Text style={styles.infoText}>Rating:</Text>
                                <Text style={styles.infoText}>Par:</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.valueText}>{item.slope}</Text>
                                <Text style={styles.valueText}>{item.rating}</Text>
                                <Text style={styles.valueText}>{par}</Text>
                            </View>
                        </View>
                        <View style={styles.infoParView}>
                            <Text style={styles.infoText}>In: <Text style={styles.valueText}>{this.formatNumber(inYards)}</Text></Text>
                            <Text style={styles.infoText}>Out: <Text style={styles.valueText}>{this.formatNumber(outYards)}</Text></Text>
                            <Text style={styles.infoText}>Total: <Text style={styles.valueText}>{this.formatNumber(inYards + outYards)}</Text></Text>
                        </View>
                    </View>
                    <View style={styles.arrowView}>
                        <Ionicon name="chevron-forward-sharp" size={25} color={Colors.Black} />
                    </View>
                </Ripple>
            </Animated.View>
        );
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    loadData = async () => {
        const { item } = this.props;
        let inYards = 0;
        let outYards = 0;
        const holes = await database.holesByTeeId(item.id);
        let par = 0;
        for (let index = 0; index < holes.length; index++) {
            if (holes[index].par) {
                par += holes[index].par;
            }
            if (holes[index].yards) {
                if(index < 9) outYards += holes[index].yards;
                else inYards += holes[index].yards;
            }
        }

        this.setState({ inYards, outYards, par });
    }
}
