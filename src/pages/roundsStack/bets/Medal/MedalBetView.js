import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    Switch,
    TouchableOpacity,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';
import Colors from '../../../../utils/Colors';
import { ButtonGroup } from 'react-native-elements';
import { Dictionary } from '../../../../utils/Dictionary';
import Collapsible from 'react-native-collapsible';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Details from '../../../../utils/Details';
import DragonButton from '../../../global/DragonButton';
import * as Validations from '../../../../utils/Validations';
import { actionSaveMedalBet } from '../../../../store/actions';
import HeaderButton from '../../../global/HeaderButton';
import moment from 'moment';

class MedalBetView extends Component {
    constructor(props) {
        super(props);

        const item = props.navigation.getParam('item');

        let wagerF9 = '';
        let wagerB9 = '';
        let wager18 = '';
        let split = true;
        let tieType = 0;
        let selectedPlayers = [];
        this.medalId = 0;

        try {
            if (item) {
                wagerF9 = item.wager_f9.toString();
                wagerB9 = item.wager_b9.toString();
                wager18 = item.wager_18.toString();
                split = !!item.split_in_tie;
                tieType = item.no_split_type;
                item.players.forEach(player => {
                    const idx = props.players.findIndex(item => item.id === player.member_id);
                    if(idx >= 0){
                        selectedPlayers.push(props.players[idx]);
                    }
                });
                this.medalId = item.id
            } else {
                const { preferences: { gsData } } = this.props;
                wagerF9 = parseFloat(gsData.medal_play_f9).toString();
                wagerB9 = parseFloat(gsData.medal_play_b9).toString();
                wager18 = parseFloat(gsData.medal_play_18).toString();
            }
        } catch (error) {
            console.log('====================================');
            console.log(error + ' file: MedalBetView, line: 58');
            console.log('====================================');
        }

        this.state = {
            wagerF9,
            wagerB9,
            wager18,
            split,
            tieType,
            selectedPlayers
        };

        props.navigation.setParams({
            setSelectedPlayers: this.setSelectedPlayers,
            selectedPlayers
        });
    }

    static navigationOptions = ({ navigation }) => {

        return {
            title: 'Medal',
            headerRight: (
                <HeaderButton
                    iconName="ios-add"
                    onPress={() => navigation.navigate('PlayersView', {
                        setSelectedPlayers: navigation.getParam('setSelectedPlayers'),
                        selectedPlayers: navigation.getParam('selectedPlayers')
                    })}
                />
            )
        }
    };

    render() {

        const {
            wagerF9,
            wagerB9,
            wager18,
            split,
            tieType,
            selectedPlayers
        } = this.state;

        const {
            language,
            navigation
        } = this.props;

        const {
            save,
            players
        } = Dictionary;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={85} enabled={Platform.OS === 'ios'}>
                <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled" >
                    <View style={styles.betField}>
                        <View style={styles.betRow}>
                            <Text style={[styles.betText, { width: 80 }]}>F9 Wager</Text>
                            <View style={{ width: 10 }} />
                            <Text style={styles.dollarSym}>$ </Text>
                            <TextInput
                                style={styles.betInput}
                                selectionColor={Colors.Primary}
                                placeholder="0"
                                keyboardType="numeric"
                                returnKeyType='done'
                                maxLength={5}
                                onChangeText={(wagerF9) => this.setState({ wagerF9 })}
                                value={wagerF9}
                                onSubmitEditing={_ => this.wagerB9Input.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>

                    <View style={styles.betField}>
                        <View style={styles.betRow}>
                            <Text style={[styles.betText, { width: 80 }]}>B9 Wager</Text>
                            <View style={{ width: 10 }} />
                            <Text style={styles.dollarSym}>$ </Text>
                            <TextInput
                                ref={ref => this.wagerB9Input = ref}
                                style={styles.betInput}
                                selectionColor={Colors.Primary}
                                placeholder="0"
                                keyboardType="numeric"
                                returnKeyType='done'
                                maxLength={5}
                                onChangeText={(wagerB9) => this.setState({ wagerB9 })}
                                value={wagerB9}
                                onSubmitEditing={_ => this.wager18Input.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>

                    <View style={styles.betField}>
                        <View style={styles.betRow}>
                            <Text style={[styles.betText, { width: 80 }]}>18 Wager</Text>
                            <View style={{ width: 10 }} />
                            <Text style={styles.dollarSym}>$ </Text>
                            <TextInput
                                ref={ref => this.wager18Input = ref}
                                style={styles.betInput}
                                selectionColor={Colors.Primary}
                                placeholder="0"
                                keyboardType="numeric"
                                returnKeyType='done'
                                maxLength={5}
                                onChangeText={(wager18) => this.setState({ wager18 })}
                                value={wager18}
                            />
                        </View>
                    </View>

                    <View style={styles.betField}>
                        <View style={styles.useFactorView}>
                            <Text style={styles.dollarSym}>{'Split in Tie'}</Text>
                            <Switch
                                thumbColor={split ? Colors.Primary : Colors.Gray}
                                trackColor={{ true: Colors.PrimaryWithOpacity }}
                                onValueChange={split => this.setState({ split })} value={split}
                            />
                        </View>
                    </View>

                    <Collapsible collapsed={split}>
                        <View style={{ width: '100%', paddingVertical: 20, paddingHorizontal: 25, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <ButtonGroup
                                    onPress={this.onChangeButton}
                                    selectedIndex={tieType}
                                    buttons={['Lwr Hcp', 'Hi Hcp', 'By Adv', 'By Ord']}
                                    containerStyle={{ height: 30 }}
                                    textStyle={{ fontSize: 13 }}
                                    selectedButtonStyle={{ backgroundColor: Colors.Primary }}
                                />
                            </View>
                            <View style={{ height: '100%', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={_ => navigation.navigate('InfoScreen', { data: Details.splitOnTie })}>
                                    <Ionicon name='ios-information-circle-outline' size={25} color={Colors.Primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Collapsible>

                    <View style={{ width: '100%', paddingVertical: 20, paddingHorizontal: 25 }}>
                        <Text style={styles.dollarSym}>{players[language]}</Text>
                        <View style={{ height: 5 }} />
                        <Collapsible collapsed={selectedPlayers.length === 0}>
                            {selectedPlayers.map((item, idx) => <Text key={`${item.nick_name}${idx}`} >{item.nick_name}</Text>)}
                        </Collapsible>
                    </View>

                </ScrollView>

                <View style={styles.bottomButtom}>
                    <DragonButton title={save[language]} onPress={this.submit} />
                </View>
            </KeyboardAvoidingView>
        );
    }

    onChangeButton = (index) => {
        this.setState({ tieType: index });
    }

    setSelectedPlayers = (selectedPlayers) => {
        this.setState({ selectedPlayers });
        this.props.navigation.setParams({ selectedPlayers });
    }

    fieldValidations = () => {
        const {
            wagerF9,
            wagerB9,
            wager18,
            selectedPlayers
        } = this.state;

        const {
            language
        } = this.props;

        const { ok: wagerF9Ok } = Validations.floatNumberValidation(wagerF9);
        if (!wagerF9Ok) {
            Alert.alert(
                'Error',
                `${Dictionary.verifyField[language]} F9 Wager`
            );
            return false;
        }

        const { ok: wagerB9Ok } = Validations.floatNumberValidation(wagerB9);
        if (!wagerB9Ok) {
            Alert.alert(
                'Error',
                `${Dictionary.verifyField[language]} B9 Wager`
            );
            return false;
        }

        const { ok: wager18Ok } = Validations.floatNumberValidation(wager18);
        if (!wager18Ok) {
            Alert.alert(
                'Error',
                `${Dictionary.verifyField[language]} 18 Wager`
            );
            return false;
        }

        if (selectedPlayers.length < 2) {
            Alert.alert(
                'Error',
                `${Dictionary.needTwoPlayers[language]}`
            );
            return false;
        }

        return true;
    }

    submit = () => {
        if (this.fieldValidations()) {
            const {
                wagerF9,
                wagerB9,
                wager18,
                split,
                tieType,
                selectedPlayers
            } = this.state;

            const data = {
                medalId: this.medalId,
                wagerF9,
                wagerB9,
                wager18,
                split,
                tieType,
                players: selectedPlayers,
                id_sync: '',
                ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
            };

            this.props.saveMedalBet(data);
        }
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    preferences: state.reducerPreferences,
    players: state.reducerRoundPlayers,
});

const mapDispatchToProps = dispatch => ({
    saveMedalBet: (values) => {
        dispatch(actionSaveMedalBet(values));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MedalBetView);
