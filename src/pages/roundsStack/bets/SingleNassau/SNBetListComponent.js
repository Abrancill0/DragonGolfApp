import React, { Component } from 'react';
import { View, Text, ActionSheetIOS, Platform, Alert, TouchableOpacity } from 'react-native';
import styles from '../styles';
import Colors from '../../../../utils/Colors';
import Ripple from 'react-native-material-ripple';
import * as NavigationService from '../../../../routes/NavigationService';
import { ListadoDetalleApuestaIndividual } from '../../../../Services/Services'
//import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import { Dictionary } from '../../../../utils/Dictionary';
import Icon from 'react-native-vector-icons';
import CalculatePresses from '../../../../utils/CalculatePresses';
import ChangeStartingHole from '../../../../utils/ChangeStartingHole';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DragonButton from '../../../global/DragonButton';

class SNBetListComponent extends Component {
    constructor(props) {
        super(props);
        console.warn(this.props.route.params.bets[0])
        this.state = {
            IDBetDetail:this.props.route.params.IDBetDetail,
            language:this.props.route.params.language,
            f9Presses: [this.props.route.params.bets[0].BetD_F9_1, this.props.route.params.bets[0].BetD_F9_2, this.props.route.params.bets[0].BetD_F9_3, this.props.route.params.bets[0].BetD_F9_4, this.props.route.params.bets[0].BetD_F9_5, this.props.route.params.bets[0].BetD_F9_6, this.props.route.params.bets[0].BetD_F9_7, this.props.route.params.bets[0].BetD_F9_8, this.props.route.params.bets[0].BetD_F9_9],
            b9Presses: [this.props.route.params.bets[0].BetD_B9_1, this.props.route.params.bets[0].BetD_B9_2, this.props.route.params.bets[0].BetD_B9_3, this.props.route.params.bets[0].BetD_B9_4, this.props.route.params.bets[0].BetD_B9_5, this.props.route.params.bets[0].BetD_B9_6, this.props.route.params.bets[0].BetD_B9_7, this.props.route.params.bets[0].BetD_B9_8, this.props.route.params.bets[0].BetD_B9_9],
            match: this.props.route.params.bets[0].BetD_Match,
            medal: this.props.route.params.bets[0].BetD_Medal,
            profit: 0,
            manualPress: this.props.route.params.bets[0].BetD_AutoPress ? this.props.route.params.bets[0].BetD_AutoPress : 0,
            carry: false,
            adv_strokes: this.props.route.params.bets[0].BetD_AdvStrokers,
            Player1: this.props.route.params.bets[0].Player1,
            Player2: this.props.route.params.bets[0].Player2,
            BetD_MontoF9: this.props.route.params.bets[0].BetD_MontoF9,
            BetD_MontoB9: this.props.route.params.bets[0].BetD_MontoB9,
            BetD_Medal: this.props.route.params.bets[0].BetD_Medal,
            BetD_MontoApuestaMedal: this.props.route.params.bets[0].BetD_MontoApuestaMedal,
            BetD_Match: this.props.route.params.bets[0].BetD_Match,
            BetD_MachMonto: this.props.route.params.bets[0].BetD_MachMonto,
            BetD_MontoPerdidoGanado: this.props.route.params.bets[0].BetD_MontoPerdidoGanado
        };
    }

    componentDidMount() {/*
        try {
            this.destructureHoles(this.props.holeInfo);
            this.calculateAdvStrokes();
            this.calculatePresses(this.props.switchAdv, this.state.manualPress);
        } catch (error) {
            console.log('====================================');
            console.log(error + ': SNBetListComponent, line: 38');
            console.log('====================================');
        }
    */}

    UNSAFE_componentWillReceiveProps(nextProps) {/*
        if (nextProps.holeInfo !== this.props.holeInfo) {
            this.destructureHoles(nextProps.holeInfo);
            this.calculateAdvStrokes();
            this.calculatePresses(this.props.switchAdv, this.state.manualPress);
        }

        if (nextProps.switchAdv !== this.props.switchAdv) {
            this.destructureHoles(this.props.holeInfo);
            this.calculateAdvStrokes();
            this.calculatePresses(nextProps.switchAdv, this.state.manualPress);
        }
    */}

    render() {

        const { item, index } = this.props;
        const {
            f9Presses,
            b9Presses,
            match,
            medal,
            profit,
            manualPress,
            carry,
            adv_strokes,
            Player1,
            Player2,
            BetD_MontoF9,
            BetD_MontoB9,
            BetD_Medal,
            BetD_MontoApuestaMedal,
            BetD_Match,
            BetD_MachMonto,
            BetD_MontoPerdidoGanado,
            language
        } = this.state;

        return (
            <View  style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
                    <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.goBack()}>
                      <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
                  <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{Dictionary.result[language]}</Text>
                  </View>
                </View>
                    {/*<View style={styles.betIndexView}>
                        <Text style={styles.betIndexText}>{'*'}</Text>
                    </View>*/}
                    <View style={{ flex: 1, margin:10 }}>
                        <View style={styles.betGeneralInfoView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.advInfo, { color: adv_strokes < 0 ? 'red' : Colors.Black }]}>[{adv_strokes}] </Text>
                                <Text style={styles.vsInfo}> {Player1} vs {Player2}</Text>
                            </View>
                            <Text style={[styles.profitText, { color: profit < 0 ? Colors.Primary : profit > 1 ? 'green' : Colors.Black }]}>${BetD_MontoPerdidoGanado}</Text>
                        </View>
                        <View style={styles.betInfoView}>
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Text style={{ marginRight: 10, color: BetD_MontoF9 < 0 ? 'red' : Colors.Black }}>${BetD_MontoF9} <Text style={{ fontWeight: 'bold', color:Colors.Black }}>F9:</Text></Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                    {
                                        f9Presses.map((item, index) => {
                                            switch (item) {
                                                case null:
                                                    return <Text key={'snf9' + index}>_</Text>;
                                                case 0:
                                                    return <Text key={'snf9' + index}>=</Text>;
                                                default:
                                                    return <Text key={'snf9' + index} style={{ color: item < 0 ? Colors.Primary : Colors.Black }}>{item}</Text>;
                                            }
                                        })
                                    }
                                </View>
                                <View style={{ width: 30 }} />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Text style={{ marginRight: 10 }}>${BetD_MontoB9} <Text style={{ fontWeight: 'bold' }}>B9:</Text></Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                                    {
                                        b9Presses.map((item, index) => {
                                            switch (item) {
                                                case null:
                                                    return <Text key={'snb9' + index}>_</Text>;
                                                case 0:
                                                    return <Text key={'snb9' + index}>=</Text>;
                                                default:
                                                    return <Text key={'snb9' + index} style={{ color: item < 0 ? Colors.Primary : Colors.Black }}>{item}</Text>;
                                            }
                                        })
                                    }
                                </View>
                                <View style={{ width: 30, alignItems: 'flex-end' }}>
                                    <Text style={{ color: Colors.Primary, fontWeight: 'bold', fontSize: 12 }}>{manualPress ? `${manualPress}P` : ''}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ textDecorationLine: carry ? 'line-through' : 'none' }}>${BetD_MachMonto} <Text
                                    style={{
                                        textDecorationLine: carry ? 'line-through' : 'none',
                                        fontWeight: 'bold',
                                        color: match && !carry < 0 ? Colors.Primary : Colors.Black
                                    }}>
                                    Match = {carry ? 0 : match}
                                </Text></Text>
                                {carry && <Text style={{ fontSize: 10, color: Colors.Primary, alignSelf: 'center' }}>Carry・ON</Text>}
                                <Text>${BetD_MontoApuestaMedal} <Text style={{ fontWeight: 'bold', color: medal < 0 ? Colors.Primary : Colors.Black }}>Medal = {medal}</Text></Text>
                            </View>
                        </View>
                        <View style={[styles.bottomButtom,{flex:0.1, margin:10}]}>
                          <DragonButton title={Dictionary.update[language]} onPress={()=> this.finalizar()} />
                        </View>
                    </View>
            </View>
        );
    }

    finalizar = () => {

    console.warn("Hola")
      ListadoDetalleApuestaIndividual(this.state.IDBetDetail)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){      
              this.setState({
                f9Presses:[res.Result[0].BetD_F9_1,
                      res.Result[0].BetD_F9_2,
                      res.Result[0].BetD_F9_3,
                      res.Result[0].BetD_F9_4,
                      res.Result[0].BetD_F9_5,
                      res.Result[0].BetD_F9_6,
                      res.Result[0].BetD_F9_7,
                      res.Result[0].BetD_F9_8,
                      res.Result[0].BetD_F9_9],
                b9Presses:[res.Result[0].BetD_B9_1,
                      res.Result[0].BetD_B9_2,
                      res.Result[0].BetD_B9_3,
                      res.Result[0].BetD_B9_4,
                      res.Result[0].BetD_B9_5,
                      res.Result[0].BetD_B9_6,
                      res.Result[0].BetD_B9_7,
                      res.Result[0].BetD_B9_8,
                      res.Result[0].BetD_B9_9],
                BetD_MontoF9: res.Result[0].BetD_MontoCalculoF9,
                BetD_MontoB9: res.Result[0].BetD_MontoCalculoB9,
                BetD_Medal: res.Result[0].BetD_Medal,
                BetD_MontoApuestaMedal: res.Result[0].BetD_MontoApuestaMedal,
                BetD_Match: res.Result[0].BetD_Match,
                BetD_MachMonto: res.Result[0].BetD_MachMonto,
                BetD_MontoPerdidoGanado: res.Result[0].BetD_MontoPerdidoGanado,
                match: res.Result[0].BetD_Match,
                medal: res.Result[0].BetD_Medal,
                Player1: res.Result[0].Player1,
                Player2: res.Result[0].Player2,
                adv_strokes: res.Result[0].BetD_AdvStrokers
                })
            }
            else{
              showMessage({
                message: error[language],
                type:'danger',
              });
            }
        })
  }

    showSheetView = () => {

        const { language, item } = this.props;
        const {
            seeResults,
            editBet,
            addPress,
            removePress,
            removeBet,
            cancel
        } = Dictionary;

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: [
                        seeResults[language],
                        editBet[language],
                        addPress[language],
                        removePress[language],
                        removeBet[language],
                        cancel[language],
                    ],
                    destructiveButtonIndex: 4,
                    cancelButtonIndex: 5,
                },
                (index) => {
                    if (index !== 5) this.doAction(index);
                },
            );
        } else {/*
            const resultsIcon = <Icon name='counter' color={Colors.Primary} size={40} family={"MaterialCommunityIcons"} />;
            const editIcon = <Icon name='edit' color={Colors.Primary} size={40} family={"Entypo"} />;
            const addPressIcon = <Icon name='md-add-circle-outline' color={Colors.Primary} size={40} family={"Ionicons"} />;
            const removePressIcon = <Icon name='md-remove-circle-outline' color={Colors.Primary} size={40} family={"Ionicons"} />;
            const removeBetIcon = <Icon name='md-trash' color={Colors.Primary} size={40} family={"Ionicons"} />;

            RNBottomActionSheet.SheetView.Show({
                title: `${item.member_a} vs ${item.member_b}`,
                items: [
                    { title: seeResults[language], icon: resultsIcon },
                    { title: editBet[language], icon: editIcon },
                    { title: addPress[language], icon: addPressIcon },
                    { title: removePress[language], icon: removePressIcon },
                    { title: removeBet[language], icon: removeBetIcon },
                ],
                onSelection: (index) => {
                    this.doAction(index);
                },
            });
        */}
    }

    doAction = (index) => {
        const { item } = this.props;
        const { manualPress } = this.state;
        switch (index) {
            case 0:
                NavigationService.navigate('SNScoreCardView', { item });
                break;
            case 1:
                NavigationService.navigate('SNBetView', { item });
                break;
            case 2:
                item.manual_press = manualPress + 1;
                this.props.updatePress(item);
                this.calculatePresses(this.props.switchAdv, manualPress + 1);
                this.setState({ manualPress: manualPress + 1 });
                break;
            case 3:
                if (manualPress > 0) {
                    item.manual_press = manualPress - 1;
                    this.props.updatePress(item);
                    this.calculatePresses(this.props.switchAdv, manualPress - 1);
                    this.setState({ manualPress: manualPress - 1 });
                }
                break;
            case 4:
                Alert.alert(
                    Dictionary.sureToDeleteBet[this.props.language],
                    '',
                    [
                        { text: Dictionary.cancel[this.props.language], style: 'cancel' },
                        { text: Dictionary.delete[this.props.language], onPress: _ => this.props.deleteSNBet({ id: item.id, round_id: this.props.roundId, type: 'single' }), style: 'destructive' }
                    ]
                )
                break;
            default:
                Alert.alert('Error', Dictionary.noFeature[this.props.language]);
        }
    }

    destructureHoles = (info) => {
        let diffTees = [];
        let totalScore = [];
        info.forEach(element => {
            let scoref9 = 0;
            let scoreb9 = 0;
            const index = diffTees.findIndex(item => item.id === element.tee.id);
            if (index < 0) {
                diffTees.push({ ...element.tee, holes: element.holes });
            }
            element.holes.forEach(hole => {
                if (hole.hole_number <= 9) {
                    scoref9 += hole.strokes;
                } else {
                    scoreb9 += hole.strokes;
                }
            });
            totalScore.push({ scoref9, scoreb9 });
        });
        let holeInfo = [];
        for (let index = 0; index < this.props.holeInfo.length; index++) {
            if (this.props.holeInfo[index].id === this.props.item.member_a_id) {
                holeInfo.push(this.props.holeInfo[index]);
                break;
            }
        }
        for (let index = 0; index < this.props.holeInfo.length; index++) {
            if (this.props.holeInfo[index].id === this.props.item.member_b_id) {
                holeInfo.push(this.props.holeInfo[index]);
                break;
            }
        }

        this.setState({ tees: diffTees, totalScore, holeInfo });
        this.holeInfo = holeInfo;
    }

    calculateAdvStrokes = () => {
        let advStrokesArray = [];
        let advTotalStrokes = [];
        let strokes = this.props.item.adv_strokes;
        let totalStrokesf9 = 0;
        let totalStrokesb9 = 0;

        if (strokes > 0) {
            const advStrokes = [];
            for (let index = 0; index < 18; index++) {
                advStrokes.push(0);
            }

            while (strokes > 0) {
                for (let index = 0; index < advStrokes.length; index++) {
                    if (strokes > 0) {
                        if (index < 9) totalStrokesf9++;
                        else totalStrokesb9++;
                        // advStrokes[index]++;
                        // strokes--;
                        if (strokes == 0.5) advStrokes[index] += 0.5;
                        else advStrokes[index]++;
                        strokes -= 1;
                    } else {
                        break;
                    }
                }
            }
            advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
            advStrokesArray.push(advStrokes);
            totalStrokesf9 = 0;
            totalStrokesb9 = 0;
            const advStrokesP2 = [];
            for (let index = 0; index < 18; index++) {
                advStrokesP2.push(0);
            }
            advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
            advStrokesArray.push(advStrokesP2);
        } else {
            const advStrokes = [];
            for (let index = 0; index < 18; index++) {
                advStrokes.push(0);
            }
            advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
            advStrokesArray.push(advStrokes);

            const advStrokesP2 = [];
            for (let index = 0; index < 18; index++) {
                advStrokesP2.push(0);
            }

            while (strokes < 0) {
                for (let index = 0; index < advStrokesP2.length; index++) {
                    if (strokes < 0) {
                        if (index < 9) totalStrokesf9++;
                        else totalStrokesb9++;
                        // advStrokesP2[index]++;
                        // strokes++;
                        if (strokes == -0.5) advStrokesP2[index] += 0.5;
                        else advStrokesP2[index]++;
                        strokes += 1;
                    } else {
                        break;
                    }
                }
            }
            advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
            advStrokesArray.push(advStrokesP2);
        }

        this.advStrokesArray = advStrokesArray;
        this.setState({ advStrokes: advStrokesArray, advTotalStrokes });
    }

    calculatePresses = (switchAdv, manualPress) => {
        const holesMA = ChangeStartingHole(this.props.initHole, this.holeInfo[0].holes);
        const holesMB = ChangeStartingHole(this.props.initHole, this.holeInfo[1].holes);

        const pressesF9 = CalculatePresses(holesMA.front9, holesMB.front9, this.advStrokesArray, this.props.item.automatic_press_every, switchAdv);
        const pressesB9 = CalculatePresses(holesMA.back9, holesMB.back9, this.advStrokesArray, this.props.item.automatic_press_every, switchAdv);

        const pressesArray = {
            front9: pressesF9.totalPresses,
            back9: pressesB9.totalPresses
        }

        let f9Completed = true;
        let b9Completed = true;

        for (let i = 0; i < 9; i++) {
            if (!holesMA.front9[i].strokes || !holesMB.front9[i].strokes) {
                f9Completed = false;
                break;
            }
        }

        for (let i = 0; i < 9; i++) {
            if (!holesMA.back9[i].strokes || !holesMB.back9[i].strokes) {
                b9Completed = false;
                break;
            }
        }

        const f9Presses = this.state.f9Presses;
        const b9Presses = this.state.b9Presses;
        pressesArray.front9.map((item, index) => {
            let auxIndex = 0;
            for (let i = item.length - 1; i >= 0; i--) {
                if (item[i] !== null) {
                    auxIndex = i;
                    break;
                }
            }
            if (item.indexOf(0) !== auxIndex || index === 0) {
                f9Presses[index] = item[auxIndex];
            }
        });

        pressesArray.back9.map((item, index) => {
            let auxIndex = 0;
            for (let i = item.length - 1; i >= 0; i--) {
                if (item[i] !== null) {
                    auxIndex = i;
                    break;
                }
            }
            if (item.indexOf(0) !== auxIndex || index === 0) {
                b9Presses[index] = item[auxIndex];
            }
        });
        const match = pressesF9.match + pressesB9.match;
        const medal = pressesF9.medal + pressesB9.medal;

        let totalF9Profit = 0;
        let totalB9Profit = 0;
        for (let i = 0; i < 9; i++) {
            if (f9Presses[i] > 0) totalF9Profit += this.props.item.front_9;
            if (f9Presses[i] < 0) totalF9Profit -= this.props.item.front_9;
            if (b9Presses[i] > 0) totalB9Profit += f9Presses[0] === 0 ? this.props.item.carry : this.props.item.back_9;
            if (b9Presses[i] < 0) totalB9Profit -= f9Presses[0] === 0 ? this.props.item.carry : this.props.item.back_9;
        }
        if (f9Presses[0] !== 0 && manualPress !== 0) {
            for (let i = 0; i < manualPress; i++) {
                for (let i = 0; i < 9; i++) {
                    if (b9Presses[i] > 0) totalB9Profit += this.props.item.back_9;
                    if (b9Presses[i] < 0) totalB9Profit -= this.props.item.back_9;
                }
            }
        }

        let matchProfit = 0;
        if (f9Presses[0] !== 0) {
            if (match < 0) matchProfit = -this.props.item.match;
            if (match > 0) matchProfit = this.props.item.match;
        } else {
            this.setState({ carry: true });
        }

        let medalProfit = 0;
        if (medal < 0) medalProfit = -this.props.item.medal;
        if (medal > 0) medalProfit = this.props.item.medal;

        const profit = totalF9Profit + totalB9Profit + matchProfit + medalProfit;
        if (this.props.snBetProfits) {
            this.props.snBetProfits[this.props.index - 1] = { member_a: this.props.item.member_a, member_b: this.props.item.member_b, profit };
            this.props.snBetSummary(this.props.snBetProfits);
        }

        this.setState({ f9Presses, b9Presses, match, medal, profit });
        this.calcultateBibleMoney(totalF9Profit, totalB9Profit, matchProfit, medalProfit, f9Presses[0] === 0, match, f9Completed, b9Completed);
    }

    calcultateBibleMoney = (totalF9Profit, totalB9Profit, matchProfit, medalProfit, carry, match, f9Completed, b9Completed) => {
        const { roundId, round, item, updateBible, roundPlayers, updatePlayer } = this.props;
        let updateBibleFlag = true;
        let playerId = 0;
        let playerBId = 0;
        let playerIdx = roundPlayers.findIndex(player => player.id == item.member_b_id);
        let settingsPlayerIdx = 0;
        let memberAFlag = false;
        if (playerIdx >= 0) {
            playerId = roundPlayers[playerIdx].player_id;
            settingsPlayerIdx = playerIdx;
        }
        if (playerId == 1) {
            memberAFlag = true;
            playerIdx = roundPlayers.findIndex(player => player.id == item.member_a_id);
            if (playerIdx >= 0) {
                playerId = roundPlayers[playerIdx].player_id;
                settingsPlayerIdx = playerIdx;
            }
        } else {
            playerIdx = roundPlayers.findIndex(player => player.id == item.member_a_id);
            if (playerIdx >= 0) playerBId = roundPlayers[playerIdx].player_id;
            if (playerBId != 1) updateBibleFlag = false;
        }

        if (updateBibleFlag) {
            const {
                adv_mov_if_only_9_holes,
                advantage_move,
                does_the_carry_move,
                strokes_moved_per_round
            } = roundPlayers[settingsPlayerIdx];
            let calculate = false;
            if (adv_mov_if_only_9_holes == 1) {
                if (f9Completed) calculate = true;
            } else {
                if (b9Completed) calculate = true;
            }

            if (calculate) {
                let result = carry ? 'Carry, ' : '';
                let adv_strokes = memberAFlag ? -item.adv_strokes : item.adv_strokes;
                const total = totalF9Profit + totalB9Profit + matchProfit + medalProfit;
                if (advantage_move === 'match') {
                    if (!memberAFlag) {
                        if (match > 0) {
                            result += 'W';
                            if(carry && does_the_carry_move) adv_strokes -= strokes_moved_per_round;
                            else if(!carry){
                                adv_strokes -= strokes_moved_per_round;
                            }
                        } else if (match < 0) {
                            result += 'L'
                            if(carry && does_the_carry_move) adv_strokes += strokes_moved_per_round;
                            else if(!carry){
                                adv_strokes += strokes_moved_per_round;
                            }
                        } else {
                            result += 'T'
                        }
                    } else {
                        if (match < 0) {
                            result += 'W';
                            if(carry && does_the_carry_move) adv_strokes -= strokes_moved_per_round;
                            else if(!carry){
                                adv_strokes -= strokes_moved_per_round;
                            }
                        } else if (match > 0) {
                            result += 'L'
                            if(carry && does_the_carry_move) adv_strokes += strokes_moved_per_round;
                            else if(!carry){
                                adv_strokes += strokes_moved_per_round;
                            }
                        } else {
                            result += 'T'
                        }
                    }
                } else {
                    if (!memberAFlag) {
                        if (total > 0) {
                            result += 'W';
                            if(carry && does_the_carry_move) adv_strokes -= strokes_moved_per_round;
                            else if(!carry){
                                adv_strokes -= strokes_moved_per_round;
                            }
                        } else if (total < 0) {
                            result += 'L'
                            if(carry && does_the_carry_move) adv_strokes += strokes_moved_per_round;
                            else if(!carry){
                                adv_strokes += strokes_moved_per_round;
                            }
                        } else {
                            result += 'T'
                        }
                    } else {
                        if (total < 0) {
                            result += 'W';
                            if(carry && does_the_carry_move) adv_strokes -= strokes_moved_per_round;
                            else if(!carry){
                                adv_strokes -= strokes_moved_per_round;
                            }
                        } else if (total > 0) {
                            result += 'L'
                            if(carry && does_the_carry_move) adv_strokes += strokes_moved_per_round;
                            else if(!carry){
                                adv_strokes += strokes_moved_per_round;
                            }
                        } else {
                            result += 'T'
                        }
                    }
                }

                const bibleData = {
                    round_id: roundId,
                    player_id: playerId,
                    date: round.date,
                    played_hp: memberAFlag ? -item.adv_strokes : item.adv_strokes,
                    result,
                    next_hp: adv_strokes,
                    money: total,
                    notes: '',
                    is_manual: item.manually_override_adv,
                    id_sync: '',
                    ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss')
                };

                const newPlayer = {
                    id: playerId,
                    strokes: adv_strokes,
                    ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss')
                };

                updateBible(bibleData);
                updatePlayer(newPlayer);
            }
        }
    }
}

export default SNBetListComponent;