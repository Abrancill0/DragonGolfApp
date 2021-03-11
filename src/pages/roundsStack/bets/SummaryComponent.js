import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Colors from '../../../utils/Colors';
import Collapsible from 'react-native-collapsible';
import Ripple from 'react-native-material-ripple';

export default class SummaryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            totalProfit: 0,
            snProfit: 0,
            tnProfit: 0,
            medalProfit: 0,
        };
    }

    componentDidMount() {
        this.setState({
            totalProfit:this.props.item.MontoPerdidoGanado,
            snProfit: this.props.item.MontoPerdidoGanado,
            tnProfit: 0,
            medalProfit: 0
        });
    }

    render() {

        const { item } = this.props;
        const {
            collapsed,
            totalProfit,
            snProfit,
            tnProfit,
            medalProfit
        } = this.state;

        return (
            <View>
                <Ripple
                    style={styles.profitView}
                    rippleColor={Colors.Primary}
                    onPress={_ => this.setState({collapsed: !collapsed})}
                >
                    <Text style={styles.profitNameText}>{item.nickname}</Text>
                    <Text style={[styles.profitText, { color: totalProfit < 0 ? Colors.Primary : totalProfit > 0 ? 'green' : Colors.Black }]}>
                        ${totalProfit}
                    </Text>
                </Ripple>
                <Collapsible collapsed={collapsed}>
                    <View style={styles.resumeView}>
                        <View style={styles.betValueView}>
                            <Text style={{ fontSize: 14 }}>Single Nassau: </Text>
                            <Text style={{
                                fontWeight: 'bold',
                                color: snProfit < 0 ? Colors.Primary : snProfit > 0 ? 'green' : 'black'
                            }}>${snProfit}</Text>
                        </View>
                        <View style={styles.betValueView}>
                            <Text style={{ fontSize: 14 }}>Team Nassau: </Text>
                            <Text style={{
                                fontWeight: 'bold',
                                color: tnProfit < 0 ? Colors.Primary : tnProfit > 0 ? 'green' : 'black'
                            }}>${tnProfit}</Text>
                        </View>
                        <View style={[styles.betValueView, { marginBottom: 0 }]}>
                            <Text style={{ fontSize: 14 }}>Medal: </Text>
                            <Text style={{
                                fontWeight: 'bold',
                                color: medalProfit < 0 ? Colors.Primary : medalProfit > 0 ? 'green' : 'black'
                            }}>${medalProfit}</Text>
                        </View>
                    </View>
                </Collapsible>
            </View>
        );
    }
}
