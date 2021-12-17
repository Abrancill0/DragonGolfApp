import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import moment from 'moment';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

class HorizontalScoreComponent extends Component {
    constructor(props) {
        super(props);

        let holeScore = '';

        const { holeInfo, index, hole } = props;
        if (holeInfo) {
            if (holeInfo.length > 0) {
                try {
                    if (holeInfo[index].holes[hole - 1].strokes) {
                        holeScore = holeInfo[index].holes[hole - 1].strokes.toString();
                    }
                } catch (error) {

                }
            }
        }

        this.state = {
            idUsuCreo: 0,
            idUsuSistema: 0,
            holeScore,
            ScoreHole1: this.props.item.ScoreHole1,
            ScoreHole2: this.props.item.ScoreHole2,
            ScoreHole3: this.props.item.ScoreHole3,
            ScoreHole4: this.props.item.ScoreHole4,
            ScoreHole5: this.props.item.ScoreHole5,
            ScoreHole6: this.props.item.ScoreHole6,
            ScoreHole7: this.props.item.ScoreHole7,
            ScoreHole8: this.props.item.ScoreHole8,
            ScoreHole9: this.props.item.ScoreHole9,
            ScoreHole10: this.props.item.ScoreHole10,
            ScoreHole11: this.props.item.ScoreHole11,
            ScoreHole12: this.props.item.ScoreHole12,
            ScoreHole13: this.props.item.ScoreHole13,
            ScoreHole14: this.props.item.ScoreHole14,
            ScoreHole15: this.props.item.ScoreHole15,
            ScoreHole16: this.props.item.ScoreHole16,
            ScoreHole17: this.props.item.ScoreHole17,
            ScoreHole18: this.props.item.ScoreHole18,
            par: 0,
            adv: 0,
            inputStyle: styles.input,
            inputBorder: {},
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.holeInfo !== this.props.holeInfo) {
            const { index, hole } = this.props;
            const { holeInfo } = nextProps;
            if (holeInfo) {
                if (holeInfo.length > 0) {
                    this.setHoleData(holeInfo, this.props.switchAdv);
                    if (!this.state.holeScore) {
                        try {
                            if (holeInfo[index].holes[hole - 1].strokes) {
                                this.setState({ holeScore: holeInfo[index].holes[hole - 1].strokes.toString() });
                            }
                        } catch (error) {

                        }
                    }
                }
            }
        }

        if (nextProps.switchAdv !== this.props.switchAdv) {
            this.setHoleData(this.props.holeInfo, nextProps.switchAdv);
        }
    }

    componentDidMount = async () => {
        let idUsu = await AsyncStorage.getItem('IDUsuarioCreo');
        let idUsuSist = await AsyncStorage.getItem('usu_id');
        this.setState({
            idUsuCreo: idUsu,
            idUsuSistema: idUsuSist
        })
        /*let playerHole= await AsyncStorage.getItem(this.props.item.id.toString())
        var myArray = playerHole.split(',');
        this.setState({
            ScoreHole1: myArray[1],
            ScoreHole2: myArray[2],
            ScoreHole3: myArray[3],
            ScoreHole4: myArray[4],
            ScoreHole5: myArray[5],
            ScoreHole6: myArray[6],
            ScoreHole7: myArray[7],
            ScoreHole8: myArray[8],
            ScoreHole9: myArray[9],
            ScoreHole10: myArray[10],
            ScoreHole11: myArray[11],
            ScoreHole12: myArray[12],
            ScoreHole13: myArray[13],
            ScoreHole14: myArray[14],
            ScoreHole15: myArray[15],
            ScoreHole16: myArray[16],
            ScoreHole17: myArray[17],
            ScoreHole18: myArray[18]
        })*/
        const { index, hole, holeInfo } = this.props;
        if (holeInfo) {
            if (holeInfo.length > 0) {
                this.setHoleData(holeInfo, this.props.switchAdv);
                if (!this.state.holeScore) {
                    try {
                        if (holeInfo[index].holes[hole - 1].strokes) {
                            this.setState({ holeScore: holeInfo[index].holes[hole - 1].strokes.toString() });
                        }
                    } catch (error) {

                    }
                }
            }
        }
    }

    renderAdv(){
        const {
            item,
            hole
        } = this.props;

        switch(hole){
            case '1': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage1}</Text>
                    </View>
                )
            break;
            case '2': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage2}</Text>
                    </View>
                )
            break;
            case '3': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage3}</Text>
                    </View>
                )
            break;
            case '4': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage4}</Text>
                    </View>
                )
            break;
            case '5': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage5}</Text>
                    </View>
                )
            break;
            case '6': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage6}</Text>
                    </View>
                )
            break;
            case '7': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage7}</Text>
                    </View>
                )
            break;
            case '8': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage8}</Text>
                    </View>
                )
            break;
            case '9': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage9}</Text>
                    </View>
                )
            break;
            case '10': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage10}</Text>
                    </View>
                )
            break;
            case '11': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage11}</Text>
                    </View>
                )
            break;
            case '12': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage12}</Text>
                    </View>
                )
            break;
            case '13': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage13}</Text>
                    </View>
                )
            break;
            case '14': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage14}</Text>
                    </View>
                )
            break;
            case '15': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage15}</Text>
                    </View>
                )
            break;
            case '16': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage16}</Text>
                    </View>
                )
            break;
            case '17': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage17}</Text>
                    </View>
                )
            break;
            case '18': 
                return (
                    <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                        <Text style={styles.advText}>{item.Ho_Advantage18}</Text>
                    </View>
                )
            break;
        }
    }

    renderTextInput(){
        const {
            item,
            hole
        } = this.props;

        const {
            inputStyle,
            inputBorder,
            ScoreHole1,
            ScoreHole2,
            ScoreHole3,
            ScoreHole4,
            ScoreHole5,
            ScoreHole6,
            ScoreHole7,
            ScoreHole8,
            ScoreHole9,
            ScoreHole10,
            ScoreHole11,
            ScoreHole12,
            ScoreHole13,
            ScoreHole14,
            ScoreHole15,
            ScoreHole16,
            ScoreHole17,
            ScoreHole18
        } = this.state;

        switch(hole){
            case '1': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole1.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,1)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '2': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole2.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,2)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '3': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole3.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,3)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '4': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole4.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,4)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '5': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole5.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,5)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '6': 
                return (
                    <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole6.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,6)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '7': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole7.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,7)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '8': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole8.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,8)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '9': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole9.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,9)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '10': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole10.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,10)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '11': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole11.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,11)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '12': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole12.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,12)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '13': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole13.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,13)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '14': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole14.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,14)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '15': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole15.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,15)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '16': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole16.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,16)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '17': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole17.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,17)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
            case '18': 
                return (
                     <View style={[styles.inputView, { height: 40 }]}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole18.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,18)}
                                keyboardType='number-pad'
                                editable={this.state.idUsuCreo.toString()==this.state.idUsuSistema.toString()?true:item.id.toString()==this.state.idUsuSistema.toString()?true:false}
                            />
                        </View>
                    </View>
                )
            break;
        }
    }

    render() {

        const {
            holeScore,
            par,
            adv,
            inputStyle,
            inputBorder
        } = this.state;

        const {
            item,
        } = this.props;

        return (
            <View>
                {
                    this.renderAdv()
                }
                {
                    this.renderTextInput()
                }
            </View>
        );
    }

    setHoleData = (holeInfo, switchAdv) => {
        const { index, hole } = this.props;

        try {
            const score = holeInfo[index].holes[hole - 1].strokes;
            const par = holeInfo[index].holes[hole - 1].par;
            let adv = holeInfo[index].holes[hole - 1].adv;
            if (switchAdv) {
                if (adv % 2 === 0) adv--;
                else adv++;
            }
            const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
            const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
            this.setState({
                par,
                adv,
                inputStyle,
                inputBorder
            });

        } catch (error) {
            console.log('====================================');
            console.log(error + ' file: PlayerScoreComponent, line: 30');
            console.log('====================================');
        }
    }

    onChangeScore = (score, value) => {
        if(score!=''){
        console.warn(score)
        console.warn(value)
        switch (value) {
            case 1:
                this.setState({ ScoreHole1: score.toString()});
                break;
            case 2:
                this.setState({ ScoreHole2: score.toString()});
                break;
            case 3:
                this.setState({ ScoreHole3: score.toString()});
                break;
            case 4:
                this.setState({ ScoreHole4: score.toString()});
                break;
            case 5:
                this.setState({ ScoreHole5: score.toString()});
                break;
            case 6:
                this.setState({ ScoreHole6: score.toString()});
                break;
            case 7:
                this.setState({ ScoreHole7: score.toString()});
                break;
            case 8:
                this.setState({ ScoreHole8: score.toString()});
                break;
            case 9:
                this.setState({ ScoreHole9: score.toString()});
                break;
            case 10:
                this.setState({ ScoreHole10: score.toString()});
                break;
            case 11:
                this.setState({ ScoreHole11: score.toString()});
                break;
            case 12:
                this.setState({ ScoreHole12: score.toString()});
                break;
            case 13:
                this.setState({ ScoreHole13: score.toString()});
                break;
            case 14:
                this.setState({ ScoreHole14: score.toString()});
                break;
            case 15:
                this.setState({ ScoreHole15: score.toString()});
                break;
            case 16:
                this.setState({ ScoreHole16: score.toString()});
                break;
            case 17:
                this.setState({ ScoreHole17: score.toString()});
                break;
            case 18:
                this.setState({ ScoreHole18: score.toString()});
                break;
        }
        this.saveScore(score);
            /*if (parseInt(score ? score : 1) > 0) {
                const { holeInfo, index, hole } = this.props;
                const par = holeInfo[index].holes[hole - 1].par;
                score = score ? parseInt(score) : '';
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ holeScore: score.toString(), buttonIndex, inputStyle, inputBorder });
                this.saveScore(score);
            }*/
        }
    }

    saveScore = async (score) => {
        let IDRound = await AsyncStorage.getItem('IDRound')
        console.warn(score)
        console.warn(this.props.item.id)
        console.warn(this.props.hole)
        console.warn(IDRound)
        this.props.clickHandler(score,this.props.item.id,this.props.hole,IDRound)
        const member = {
            strokes: score,
            id_sync: '',
            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: this.props.item.id
        }
        //this.props.saveScore({ hole: parseInt(this.props.hole), member, roundId: this.props.roundId });
    }
}

export default HorizontalScoreComponent;