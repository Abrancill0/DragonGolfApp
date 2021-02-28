import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import styles from './styles';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import DragonButton from '../../global/DragonButton';
import styles2 from './styles2';
import { Dictionary } from '../../../utils/Dictionary';

class PlayerScoreComponent extends Component {
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
            buttonIndex: null,
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
        //console.warn(this.state.ScoreHole1)
        const { index, hole, holeInfo} = this.props;
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

    renderPar(){
        const {
            item,
            hole
        } = this.props;

        switch(hole){
            case '1': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par1}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage1}</Text>
                    </View>
                )
            break;
            case '2': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par2}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage2}</Text>
                    </View>
                )
            break;
            case '3': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par3}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage3}</Text>
                    </View>
                )
            break;
            case '4': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par4}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage4}</Text>
                    </View>
                )
            break;
            case '5': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par5}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage5}</Text>
                    </View>
                )
            break;
            case '6': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par6}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage6}</Text>
                    </View>
                )
            break;
            case '7': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par7}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage7}</Text>
                    </View>
                )
            break;
            case '8': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par8}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage8}</Text>
                    </View>
                )
            break;
            case '9': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par9}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage9}</Text>
                    </View>
                )
            break;
            case '10': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par10}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage10}</Text>
                    </View>
                )
            break;
            case '11': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par11}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage11}</Text>
                    </View>
                )
            break;
            case '12': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par12}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage12}</Text>
                    </View>
                )
            break;
            case '13': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par13}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage13}</Text>
                    </View>
                )
            break;
            case '14': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par14}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage14}</Text>
                    </View>
                )
            break;
            case '15': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par15}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage15}</Text>
                    </View>
                )
            break;
            case '16': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par16}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage16}</Text>
                    </View>
                )
            break;
            case '17': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par17}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage17}</Text>
                    </View>
                )
            break;
            case '18': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par18}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage18}</Text>
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
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole1.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,1)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '2': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole2.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,2)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '3': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole3.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,3)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '4': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole4.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,4)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '5': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole5.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,5)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '6': 
                return (
                    <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole6.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,6)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '7': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole7.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,7)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '8': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole8.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,8)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '9': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole9.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,9)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '10': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole10.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,10)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '11': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole11.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,11)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '12': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole12.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,12)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '13': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole13.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,13)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '14': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole14.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,14)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '15': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole15.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,15)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '16': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole16.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,16)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '17': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole17.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,17)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
            case '18': 
                return (
                     <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                selectTextOnFocus={true}
                                style={inputStyle}
                                maxLength={2}
                                value={ScoreHole18.toString()}
                                onChangeText={(score)=>this.onChangeScore(score,18)}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                )
            break;
        }
    }

    renderBotones(){
        const {
            item,
            hole
        } = this.props;

        switch(hole){
            case '1': 
                return (
                     item.ho_par1!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par1,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par1,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par1,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par1,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '2': 
                return (
                     item.ho_par2!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par2,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par2,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par2,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par2,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '3': 
                return (
                     item.ho_par3!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par3,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par3,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par3,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par3,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '4': 
                return (
                     item.ho_par4!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par4,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par4,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par4,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par4,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '5': 
                return (
                     item.ho_par5!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par5,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par5,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par5,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par5,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '6': 
                return (
                    item.ho_par6!=0&&<View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par6,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par6,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par6,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par6,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '7': 
                return (
                     item.ho_par7!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par7,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par7,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par7,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par7,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '8': 
                return (
                     item.ho_par8!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par8,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par8,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par8,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par8,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '9': 
                return (
                     item.ho_par9!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par9,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par9,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par9,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par9,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '10': 
                return (
                     item.ho_par10!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par10,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par10,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par10,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par10,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '11': 
                return (
                     item.ho_par11!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par11,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par11,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par11,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par11,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '12': 
                return (
                     item.ho_par12!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par12,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par12,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par12,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par12,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '13': 
                return (
                     item.ho_par13!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par13,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par13,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par13,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par13,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '14': 
                return (
                     item.ho_par14!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par14,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par14,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par14,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par14,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '15': 
                return (
                     item.ho_par15!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par15,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par15,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par15,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par15,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '16': 
                return (
                     item.ho_par16!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par16,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par16,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par16,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par16,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '17': 
                return (
                     item.ho_par17!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par17,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par17,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par17,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par17,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            break;
            case '18': 
                return (
                     item.ho_par18!=0&&<View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par18,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par18,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par18,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par18,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
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
            language
        } = this.props;

        return (
            <View>
                {
                    this.renderPar()
                }
                <View style={styles.playerScoreView}>
                    <View style={styles.playerScoreNameView}>
                        <Text style={styles.playerScoreNameText} numberOfLines={1} adjustsFontSizeToFit >{item.nickname}</Text>
                    </View>
                    {
                        this.renderTextInput()
                    }
                    {
                        this.renderBotones()
                    }
                </View>
                {/*<View style={[styles2.bottomButtom,{margin:20, flex:0.07}]}>
                  <DragonButton title={Dictionary.save[language]} onPress={this.submit} />
                </View>*/}
            </View>
        );
    }

    submit = () => {
        console.warn('Hola')
      }

    setHoleData = (holeInfo, switchAdv) => {
        const { index, hole } = this.props;

        try {
            const score = holeInfo[index].holes[hole - 1].strokes;
            const par = holeInfo[index].holes[hole - 1].par;
            let adv = holeInfo[index].holes[hole - 1].adv;
            const buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
            if (switchAdv) {
                if (adv % 2 === 0) adv--;
                else adv++;
            }
            const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
            const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
            this.setState({
                par,
                adv,
                buttonIndex,
                inputStyle,
                inputBorder
            });

        } catch (error) {
            console.log('====================================');
            console.log(error + ' file: PlayerScoreComponent, line: 30');
            console.log('====================================');
        }
    }

    onPressButtonGroup = (par, value) => {
        const { holeInfo, index, hole } = this.props;
        let bogy = 0;
        let score = 0;
        let buttonIndex = 0
        let inputStyle  = 0
        let inputBorder = 0
        console.warn(hole)
        switch(hole){
            case '1':
                const { ScoreHole1 } = this.state;
                console.warn('HEW')
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole1) <= (par - 1) && parseInt(ScoreHole1) > 1 ? parseInt(ScoreHole1) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole1) >= (bogy + 1) && parseInt(ScoreHole1) < 99 ? parseInt(ScoreHole1) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole1: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '2':
                const { ScoreHole2 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole2) <= (par - 1) && parseInt(ScoreHole2) > 1 ? parseInt(ScoreHole2) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole2) >= (bogy + 1) && parseInt(ScoreHole2) < 99 ? parseInt(ScoreHole2) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole2: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '3':
                const { ScoreHole3 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole3) <= (par - 1) && parseInt(ScoreHole3) > 1 ? parseInt(ScoreHole3) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole3) >= (bogy + 1) && parseInt(ScoreHole3) < 99 ? parseInt(ScoreHole3) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole3: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '4':
                const { ScoreHole4 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole4) <= (par - 1) && parseInt(ScoreHole4) > 1 ? parseInt(ScoreHole4) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole4) >= (bogy + 1) && parseInt(ScoreHole4) < 99 ? parseInt(ScoreHole4) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole4: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '5':
                const { ScoreHole5 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole5) <= (par - 1) && parseInt(ScoreHole5) > 1 ? parseInt(ScoreHole5) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole5) >= (bogy + 1) && parseInt(ScoreHole5) < 99 ? parseInt(ScoreHole5) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole5: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '6':
                const { ScoreHole6 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole6) <= (par - 1) && parseInt(ScoreHole6) > 1 ? parseInt(ScoreHole6) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole6) >= (bogy + 1) && parseInt(ScoreHole6) < 99 ? parseInt(ScoreHole6) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole6: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '7':
                const { ScoreHole7 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole7) <= (par - 1) && parseInt(ScoreHole7) > 1 ? parseInt(ScoreHole7) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole7) >= (bogy + 1) && parseInt(ScoreHole7) < 99 ? parseInt(ScoreHole7) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole7: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '8':
                const { ScoreHole8 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole8) <= (par - 1) && parseInt(ScoreHole8) > 1 ? parseInt(ScoreHole8) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole8) >= (bogy + 1) && parseInt(ScoreHole8) < 99 ? parseInt(ScoreHole8) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole8: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '9':
                const { ScoreHole9 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole9) <= (par - 1) && parseInt(ScoreHole9) > 1 ? parseInt(ScoreHole9) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole9) >= (bogy + 1) && parseInt(ScoreHole9) < 99 ? parseInt(ScoreHole9) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole9: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '10':
                const { ScoreHole10 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole10) <= (par - 1) && parseInt(ScoreHole10) > 1 ? parseInt(ScoreHole10) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole10) >= (bogy + 1) && parseInt(ScoreHole10) < 99 ? parseInt(ScoreHole10) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole10: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '11':
                const { ScoreHole11 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole11) <= (par - 1) && parseInt(ScoreHole11) > 1 ? parseInt(ScoreHole11) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole11) >= (bogy + 1) && parseInt(ScoreHole11) < 99 ? parseInt(ScoreHole11) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole11: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '12':
                const { ScoreHole12 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole12) <= (par - 1) && parseInt(ScoreHole12) > 1 ? parseInt(ScoreHole12) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole12) >= (bogy + 1) && parseInt(ScoreHole12) < 99 ? parseInt(ScoreHole12) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole12: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '13':
                const { ScoreHole13 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole13) <= (par - 1) && parseInt(ScoreHole13) > 1 ? parseInt(ScoreHole13) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole13) >= (bogy + 1) && parseInt(ScoreHole13) < 99 ? parseInt(ScoreHole13) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole13: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '14':
                const { ScoreHole14 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole14) <= (par - 1) && parseInt(ScoreHole14) > 1 ? parseInt(ScoreHole14) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole14) >= (bogy + 1) && parseInt(ScoreHole14) < 99 ? parseInt(ScoreHole14) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole14: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '15':
                const { ScoreHole15 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole15) <= (par - 1) && parseInt(ScoreHole15) > 1 ? parseInt(ScoreHole15) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole15) >= (bogy + 1) && parseInt(ScoreHole15) < 99 ? parseInt(ScoreHole15) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole15: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '16':
                const { ScoreHole16 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole16) <= (par - 1) && parseInt(ScoreHole16) > 1 ? parseInt(ScoreHole16) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole16) >= (bogy + 1) && parseInt(ScoreHole16) < 99 ? parseInt(ScoreHole16) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole16: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '17':
                const { ScoreHole17 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole17) <= (par - 1) && parseInt(ScoreHole17) > 1 ? parseInt(ScoreHole17) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole17) >= (bogy + 1) && parseInt(ScoreHole17) < 99 ? parseInt(ScoreHole17) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole17: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
            case '18':
                const { ScoreHole18 } = this.state;
                this.setState({ buttonIndex: value });
                if (holeInfo) {
                    if (holeInfo[index].holes[hole - 1].par)
                        par = parseInt(holeInfo[index].holes[hole - 1].par);
                }
                if (par) {
                    bogy = par + 1;
                }
                switch (value) {
                    case 0:
                        score = (parseInt(ScoreHole18) <= (par - 1) && parseInt(ScoreHole18) > 1 ? parseInt(ScoreHole18) - 1 : (par - 1));
                        break;
                    case 1:
                        score = par;
                        break;
                    case 2:
                        score = bogy;
                        break;
                    case 3:
                        score = (parseInt(ScoreHole18) >= (bogy + 1) && parseInt(ScoreHole18) < 99 ? parseInt(ScoreHole18) + 1 : (bogy + 1));
                        break;
                }
                buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ ScoreHole18: score.toString(), buttonIndex, inputStyle, inputBorder });
            break;
        }
        this.saveScore(score);
    }

    onChangeScore = async (score, value) => {
        console.warn(score)
        console.warn(value)
        switch (value) {
            case 1:
                this.setState({ ScoreHole1: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 2:
                this.setState({ ScoreHole2: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 3:
                this.setState({ ScoreHole3: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 4:
                this.setState({ ScoreHole4: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 5:
                this.setState({ ScoreHole5: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 6:
                this.setState({ ScoreHole6: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 7:
                this.setState({ ScoreHole7: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 8:
                this.setState({ ScoreHole8: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 9:
                this.setState({ ScoreHole9: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 10:
                this.setState({ ScoreHole10: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 11:
                this.setState({ ScoreHole11: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 12:
                this.setState({ ScoreHole12: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 13:
                this.setState({ ScoreHole13: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 14:
                this.setState({ ScoreHole14: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 15:
                this.setState({ ScoreHole15: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 16:
                this.setState({ ScoreHole16: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 17:
                this.setState({ ScoreHole17: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
                break;
            case 18:
                this.setState({ ScoreHole18: score.toString()});
                //AsyncStorage.setItem(value, score.toString());
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

    saveScore = async (score) => {
        let IDRound = await AsyncStorage.getItem('IDRound')
        /*console.warn(score)
        console.warn(this.props.item.id)
        console.warn(this.props.hole)
        console.warn(IDRound)*/
        this.props.clickHandler(parseInt(score),this.props.item.id,this.props.hole,IDRound)
        const member = {
            strokes: score,
            id_sync: '',
            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: this.props.item.id
        }
        //this.props.saveScore({ hole: parseInt(this.props.hole), member, roundId: this.props.roundId });
    }
}

export default PlayerScoreComponent;
